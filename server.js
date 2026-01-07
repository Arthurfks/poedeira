
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

const PORT = process.env.PORT || 3005;
const INFINITE_PAY_API_URL = 'https://api.cloudwalk.io/v1/checkout';

app.use(cors());
app.use(express.json());

// 1. SERVIR ARQUIVOS ESTÁTICOS PRIMEIRO
// Isso garante que index.tsx, App.tsx, etc., sejam encontrados
app.use(express.static(__dirname));

/**
 * Health Check
 */
app.get('/api/health', (req, res) => {
  res.json({ status: 'online', port: PORT });
});

/**
 * Rota para Gerar Link de Checkout
 */
app.post('/api/checkout/generate-link', async (req, res) => {
  try {
    const { lead, product, paymentMethod, amountInCents, orderId } = req.body;

    const dbLead = await prisma.lead.upsert({
      where: { phone: lead.phone },
      update: { name: lead.name },
      create: { name: lead.name, phone: lead.phone, status: 'Em Atendimento' }
    });

    const order = await prisma.order.create({
      data: {
        externalId: orderId,
        leadId: dbLead.id,
        amount: amountInCents,
        status: 'pending',
        metadata: JSON.stringify({ product_name: product.name, payment_method: paymentMethod })
      }
    });

    const token = process.env.INFINITE_PAY_TOKEN;
    
    if (!token || token === "SEU_TOKEN_AQUI") {
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
      metadata: { origin: "SJM_POEDEIRA_V3", order_internal_id: order.id, lead_id: dbLead.id }
    };

    const response = await axios.post(INFINITE_PAY_API_URL, payload, {
      headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' }
    });

    const finalLink = response.data.payment_url || response.data.url;

    await prisma.order.update({
      where: { id: order.id },
      data: { paymentUrl: finalLink }
    });

    res.json({ success: true, link: finalLink, orderId });

  } catch (error) {
    console.error('❌ Erro Checkout:', error.message);
    res.status(500).json({ error: 'Erro no gateway' });
  }
});

/**
 * 2. CAPTURA DE ROTAS DO REACT (Deve ser a ÚLTIMA coisa)
 */
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 SJM RODANDO NA PORTA ${PORT}`);
});
