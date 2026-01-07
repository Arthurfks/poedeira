
import express from 'express';
import cors from 'cors';
import axios from 'axios';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { PrismaClient } from '@prisma/client';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const prisma = new PrismaClient();

// Força 3005 se não estiver no ENV, garantindo compatibilidade com Nginx
const PORT = process.env.PORT || 3005;
const INFINITE_PAY_API_URL = 'https://api.cloudwalk.io/v1/checkout';

app.use(cors());
app.use(express.json());

// Servir arquivos estáticos (index.html, assets, etc)
app.use(express.static(__dirname));

/**
 * Health Check para o Nginx e PM2
 */
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'online', 
    timestamp: new Date().toISOString(),
    port: PORT
  });
});

/**
 * Rota para Gerar Link de Checkout Real via API InfinitePay
 */
app.post('/api/checkout/generate-link', async (req, res) => {
  try {
    const { lead, product, paymentMethod, amountInCents, orderId } = req.body;

    console.log(`[CHECKOUT] Iniciando pedido ${orderId} para ${lead.name}`);

    // 1. Persistência do Lead
    const dbLead = await prisma.lead.upsert({
      where: { phone: lead.phone },
      update: { name: lead.name },
      create: { 
        name: lead.name, 
        phone: lead.phone,
        status: 'Em Atendimento'
      }
    });

    // 2. Persistência da Ordem
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

    // 3. Integração InfinitePay
    const token = process.env.INFINITE_PAY_TOKEN;
    
    if (!token || token === "SEU_TOKEN_AQUI") {
      console.warn('⚠️ INFINITE_PAY_TOKEN não configurado. Gerando link de simulação.');
      const simulatedLink = `https://pay.infinitepay.io/sjmbetoneiras/${amountInCents}?metadata=${encodeURIComponent(JSON.stringify({order_id: order.id}))}`;
      return res.json({ success: true, link: simulatedLink, orderId });
    }

    const payload = {
      amount: amountInCents,
      order_id: orderId,
      items: [{
        name: `Sinal 50% - ${product.name}`,
        amount: amountInCents,
        quantity: 1,
        description: `Entrada Fabricação SJM`
      }],
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

    const response = await axios.post(INFINITE_PAY_API_URL, payload, {
      headers: { 
        'Authorization': `Bearer ${token}`, 
        'Content-Type': 'application/json' 
      }
    });

    const finalLink = response.data.payment_url || response.data.url;

    await prisma.order.update({
      where: { id: order.id },
      data: { paymentUrl: finalLink }
    });

    res.json({ success: true, link: finalLink, orderId });

  } catch (error) {
    console.error('❌ Erro no Servidor:', error.response?.data || error.message);
    res.status(500).json({ 
      error: 'Falha na comunicação com gateway de pagamento',
      details: error.response?.data || error.message 
    });
  }
});

/**
 * Webhook de Pagamento
 */
app.post('/api/webhooks/infinitepay', async (req, res) => {
  const data = req.body;
  try {
    console.log(`[WEBHOOK] Notificação recebida: ${data.order_id} -> ${data.status}`);

    if (data.status === 'approved' || data.status === 'confirmed') {
      await prisma.order.update({
        where: { externalId: data.order_id },
        data: { status: 'paid' }
      });

      const leadId = data.metadata?.lead_id;
      if (leadId) {
        await prisma.lead.update({
          where: { id: leadId },
          data: { status: 'Vendido' }
        });
      }
    }
    res.status(200).send('OK');
  } catch (error) {
    console.error('[WEBHOOK ERROR]', error.message);
    res.status(500).send('Error');
  }
});

/**
 * Captura de rotas do Frontend para SPA/Admin
 */
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`\n✅ SJM BACKEND OPERACIONAL`);
  console.log(`📍 Porta: ${PORT}`);
  console.log(`🔗 URL: https://poedeira.sjmbetoneiras.site\n`);
});
