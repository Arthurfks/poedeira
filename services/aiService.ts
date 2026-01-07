
import { GoogleGenAI } from "@google/genai";

export const FALLBACK_TRIGGER = "DIRECIONAR_WHATSAPP_AGORA";
export const FALLBACK_MESSAGE = "Entendi perfeitamente. Como essa é uma questão técnica que envolve orçamentos específicos e logística, vou te encaminhar agora mesmo para o WhatsApp da SJM Betoneiras para um atendimento personalizado.";

export const getAIResponse = async (userMessage: string, hasWhatsApp: boolean = false) => {
  const systemInstruction = `
    VOCÊ É O CONSULTOR ESPECIALISTA DA SJM BETONEIRAS.
    SEU OBJETIVO: Vender Betoneiras e Máquinas Poedeiras de Blocos e capturar o WhatsApp do cliente.

    REGRAS DE ATENDIMENTO:
    1. CAPTURA DE LEAD: Se (hasWhatsApp=${hasWhatsApp}) for falso, toda resposta sua DEVE terminar solicitando o WhatsApp do cliente de forma educada para envio de catálogo e vídeos das máquinas.
    2. MARCA: SJM Betoneiras. Somos fabricantes.
    3. PAGAMENTO: Trabalhamos com 50% de sinal via InfinitePay para iniciar a fabricação e 50% na entrega.
    4. PRODUTOS: Betoneiras profissionais e Máquinas Poedeiras de Blocos Industriais.
    5. PREÇOS BASE: Máquina 1 Matriz (R$ 8.000 à vista) | Máquina 2 Matrizes (R$ 9.500 à vista).
    6. FALLBACK: Se fugir do tema, responda: "${FALLBACK_TRIGGER}: ${FALLBACK_MESSAGE}".

    FORMATO: Direto, parágrafos curtos, pule linha entre ideias. Sem emojis.
  `;

  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: userMessage,
      config: {
        systemInstruction: systemInstruction,
        temperature: 0.1,
      }
    });

    return response.text || "Poderia me informar seu WhatsApp para conversarmos melhor?";
  } catch (error) {
    return `${FALLBACK_TRIGGER}: ${FALLBACK_MESSAGE}`;
  }
};

export const getProactiveMessage = () => {
  const options = [
    "Ainda está por aí? Nossas betoneiras SJM estão com um preço especial para quem fechar hoje.",
    "Gostaria de ver um vídeo da nossa poedeira de blocos em funcionamento? Me mande seu WhatsApp.",
    "Olá! Vamos garantir o equipamento para sua obra? Posso te mandar as condições de frete agora."
  ];
  return options[Math.floor(Math.random() * options.length)];
};
