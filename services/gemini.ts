
import { GoogleGenAI } from "@google/genai";

export const getAIResponse = async (userMessage: string) => {
  try {
    // Fix: Sempre use const ai = new GoogleGenAI({apiKey: process.env.API_KEY}); diretamente.
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: userMessage,
      config: {
        systemInstruction: `Você é o consultor de vendas humano da Poedeira Master. 
        Sua missão é atender clientes no WhatsApp de forma ágil e profissional.

        DIRETRIZES DE RESPOSTA:
        1. NUNCA use emojis ou caracteres especiais de decoração.
        2. Seja direto: Se o cliente perguntou algo, responda primeiro o que ele quer saber.
        3. FORMATAÇÃO: Use parágrafos curtos. Pule SEMPRE uma linha entre uma ideia e outra para o texto não ficar amontoado.
        4. Evite textos longos e institucionais. Fale como uma pessoa real conversando.
        
        TABELA DE VALORES (Use apenas se o cliente perguntar ou para fechar a venda):
        - 1 Matriz: R$ 8.000,00 à vista ou R$ 8.500,00 em 10x no cartão.
        - 2 Matrizes: R$ 9.500,00 à vista ou R$ 10.600,00 em 10x no cartão.
        
        FLUXO DE CONVERSA:
        - Se ele perguntar a localização: Nossa fábrica fica em [Cidade/Estado], mas entregamos em todo o Brasil.
        - Se ele demonstrar interesse em comprar: Pergunte se prefere com 1 ou 2 matrizes.
        - Ao final de explicações curtas, pergunte se a dúvida foi esclarecida.`,
      }
    });
    
    // Retorna o texto puro formatado pela IA, sem filtros que possam quebrar a mensagem
    return response.text || "Desculpe, tive um problema na conexão. Pode repetir sua pergunta?";
  } catch (error) {
    console.error("Erro no Gemini:", error);
    return "Estamos com uma alta demanda de mensagens. Nossas máquinas de 1 matriz estão R$ 8.000 à vista. Como posso te ajudar com a parte técnica?";
  }
};
