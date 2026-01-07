
import express from 'express';
import cors from 'cors';
import axios from 'axios';
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';

dotenv.config();

const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3001;
const INFINITE_PAY_API_URL = 'https://api.cloudwalk.io/v1/checkout';

/**
 * Rota para Gerar Link de Checkout Real via API InfinitePay
 * Seguindo: https://www.infinitepay.io/checkout#codeSetupBlock
 */
app.post('/api/checkout/generate-link', async (req, res) => {
  try {
    const { lead, product, paymentMethod, amountInCents, orderId } = req.body;

    // 1. Criar ou Atualizar o Lead no Banco
    const dbLead = await prisma.lead.upsert({
      where: { phone: lead.phone },
      update: { name: lead.name },
      create: { 
        name: lead.name, 
        phone: lead.phone,
        status: 'Em Atendimento'
      }
    });

    // 2. Salvar a Ordem no Banco antes de enviar para InfinitePay
    const order = await prisma.order.create({
      data: {
        externalId: orderId,
        leadId: dbLead.id,
        amount: amountInCents,
        status: 'pending',
        metadata: JSON.stringify({
          product_name: product.name,
          payment_method: paymentMethod
        })
      }
    });

    // 3. Montagem do Payload conforme documentação InfinitePay
    const payload = {
      amount: amountInCents,
      order_id: orderId,
      items: [
        {
          name: `Sinal 50% - ${product.name}`,
          amount: amountInCents,
          quantity: 1,
          description: `Pedido SJM - Condição: ${paymentMethod}`
        }
      ],
      customer: {
        name: lead.name,
        phone: lead.phone.replace(/\D/g, ''),
      },
      callback_url: process.env.WEBHOOK_URL,
      return_url: process.env.SUCCESS_URL,
      metadata: {
        origin: "SJM_POEDEIRA_V3",
        order_internal_id: order.id,
        lead_id: dbLead.id
      }
    };

    const token = process.env.INFINITE_PAY_TOKEN;
    
    // Fallback para simulação se o token não existir
    if (!token || token === "SEU_TOKEN_AQUI") {
      console.warn('⚠️ INFINITE_PAY_TOKEN não configurado. Gerando link de simulação.');
      const simulatedLink = `https://pay.infinitepay.io/sjmbetoneiras/${amountInCents}?metadata=${encodeURIComponent(JSON.stringify(payload.metadata))}`;
      return res.json({ success: true, link: simulatedLink, orderId });
    }

    // Chamada REAL para a API CloudWalk/InfinitePay
    const response = await axios.post(INFINITE_PAY_API_URL, payload, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    const finalLink = response.data.payment_url || response.data.url;

    // Atualizar ordem com o link gerado
    await prisma.order.update({
      where: { id: order.id },
      data: { paymentUrl: finalLink }
    });

    res.json({ 
      success: true, 
      link: finalLink, 
      orderId: orderId 
    });

  } catch (error) {
    console.error('❌ Erro InfinitePay:', error.response?.data || error.message);
    res.status(500).json({ 
      error: 'Erro ao processar checkout na InfinitePay',
      details: error.response?.data || error.message 
    });
  }
});

/**
 * Endpoint de Webhook para confirmação de pagamento
 */
app.post('/api/webhooks/infinitepay', async (req, res) => {
  const data = req.body;
  
  try {
    console.log('📬 Webhook recebido:', data.status, 'Order:', data.order_id);

    if (data.status === 'approved' || data.status === 'confirmed') {
      // Atualizar status da ordem
      await prisma.order.update({
        where: { externalId: data.order_id },
        data: { status: 'paid' }
      });

      // Se houver lead_id no metadata, atualizar o status do lead
      const leadId = data.metadata?.lead_id;
      if (leadId) {
        await prisma.lead.update({
          where: { id: leadId },
          data: { status: 'Vendido' }
        });
        console.log(`✅ Lead ${leadId} convertido com sucesso!`);
      }
    }

    res.status(200).send('OK');
  } catch (error) {
    console.error('❌ Erro no Webhook:', error.message);
    res.status(500).send('Error');
  }
});

app.listen(PORT, () => {
  console.log(`🚀 SJM Backend pronto na porta ${PORT}`);
});
