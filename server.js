
import express from 'express';
import cors from 'cors';
import axios from 'axios';
import dotenv from 'dotenv';
// import { PrismaClient } from '@prisma/client'; // Descomente na sua VM se for usar o DB

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// const prisma = new PrismaClient(); // Instância do banco

const PORT = process.env.PORT || 3001;
const INFINITE_PAY_API_URL = 'https://api.cloudwalk.io/v1/checkout';
const API_KEY_INFINITE = process.env.INFINITE_PAY_TOKEN; // Defina no seu .env da VM

/**
 * Rota para Gerar Link de Checkout Real
 */
app.post('/api/checkout/generate-link', async (req, res) => {
  try {
    const { lead, product, paymentMethod, amountInCents, orderId } = req.body;

    // 1. Aqui você salvaria no Banco de Dados via Prisma
    // const order = await prisma.order.create({ data: { ... } });

    // 2. Montagem do Payload oficial da InfinitePay
    const payload = {
      amount: amountInCents,
      order_id: orderId,
      items: [
        {
          name: `Sinal 50% - ${product.name}`,
          amount: amountInCents,
          quantity: 1,
          description: `Pedido vinculado ao Lead: ${lead.name}`
        }
      ],
      customer: {
        name: lead.name,
        phone: lead.phone.replace(/\D/g, ''), // Limpa o telefone
        // email: lead.email (Opcional)
      },
      callback_url: "https://seu-dominio.com/api/webhooks/infinitepay", // Seu Webhook
      return_url: "https://seu-dominio.com/obrigado", // Página de sucesso
      metadata: {
        payment_type: "SINAL_50",
        lead_id: lead.id,
        condition: paymentMethod,
        product_id: product.id
      }
    };

    /**
     * IMPORTANTE: No ambiente de demonstração, simulamos a resposta da API.
     * Na sua VM, a requisição abaixo será executada com seu Token real.
     */
    
    /*
    const response = await axios.post(INFINITE_PAY_API_URL, payload, {
      headers: {
        'Authorization': `Bearer ${API_KEY_INFINITE}`,
        'Content-Type': 'application/json'
      }
    });
    return res.json({ link: response.data.payment_url });
    */

    // Simulação de retorno para não quebrar o frontend enquanto você não coloca o Token
    const simulatedLink = `https://pay.infinitepay.io/sjmbetoneiras/${amountInCents}?metadata=${encodeURIComponent(JSON.stringify(payload.metadata))}`;
    
    res.json({ 
      success: true, 
      link: simulatedLink, 
      orderId: orderId 
    });

  } catch (error) {
    console.error('Erro ao gerar checkout:', error);
    res.status(500).json({ error: 'Erro interno no servidor de pagamentos' });
  }
});

/**
 * Endpoint de Webhook para receber confirmação de pagamento
 */
app.post('/api/webhooks/infinitepay', async (req, res) => {
  const paymentNotification = req.body;
  
  // Lógica para atualizar o status no banco de dados
  // if (paymentNotification.status === 'approved') { ... }
  
  console.log('Webhook recebido:', paymentNotification);
  res.status(200).send('OK');
});

app.listen(PORT, () => {
  console.log(`Backend SJM rodando na porta ${PORT}`);
});
