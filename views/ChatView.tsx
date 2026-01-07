
import React, { useState, useRef, useEffect } from 'react';
import { Message } from '../types';
import { getAIResponse, FALLBACK_TRIGGER, getProactiveMessage } from '../services/aiService';

const ChatView: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', sender: 'ai', text: 'Olá! Sou o consultor da Poedeira Master. Qual máquina você busca hoje para sua fábrica?', timestamp: new Date(), type: 'text' }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [hasWhatsApp, setHasWhatsApp] = useState(false);
  const [sessionId] = useState(`LEAD-${Math.random().toString(36).substr(2, 9).toUpperCase()}`);
  
  const scrollRef = useRef<HTMLDivElement>(null);
  // Fix: Alterado o tipo de NodeJS.Timeout para any para evitar erro de namespace no ambiente browser
  const idleTimerRef = useRef<any>(null);

  // Auto-scroll ao chegar nova mensagem
  useEffect(() => {
    scrollRef.current?.scrollTo(0, scrollRef.current.scrollHeight);
  }, [messages, isTyping]);

  // Lógica de Mensagem Proativa (30s de inatividade)
  const resetIdleTimer = () => {
    if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
    idleTimerRef.current = setTimeout(() => {
      const proactive = getProactiveMessage();
      setMessages(prev => [...prev, { 
        id: Date.now().toString(), 
        sender: 'ai', 
        text: proactive, 
        timestamp: new Date(), 
        type: 'text' 
      }]);
    }, 30000); 
  };

  useEffect(() => {
    resetIdleTimer();
    return () => { if (idleTimerRef.current) clearTimeout(idleTimerRef.current); };
  }, [messages]);

  const handleSend = async (textOverride?: string) => {
    const text = textOverride || inputText;
    if (!text.trim()) return;

    if (!textOverride) {
      const userMsg: Message = { id: Date.now().toString(), sender: 'user', text, timestamp: new Date(), type: 'text' };
      setMessages(prev => [...prev, userMsg]);
      setInputText('');
    }

    setIsTyping(true);

    // Verifica se o texto parece um WhatsApp (simples regex para exemplo)
    if (!hasWhatsApp && /\d{8,}/.test(text.replace(/\D/g, ''))) {
      setHasWhatsApp(true);
      console.log("Lead identificado como quente (WhatsApp capturado)");
    }
    
    const response = await getAIResponse(text, hasWhatsApp);
    
    setTimeout(() => {
      setIsTyping(false);
      
      // Verifica Trigger de Redirecionamento
      if (response.includes(FALLBACK_TRIGGER)) {
        const cleanMessage = response.replace(`${FALLBACK_TRIGGER}:`, '').trim();
        setMessages(prev => [...prev, { id: (Date.now()+1).toString(), sender: 'ai', text: cleanMessage, timestamp: new Date(), type: 'text' }]);
        
        // Redirecionamento automático após 4 segundos
        setTimeout(() => {
          const waNumber = "5511999999999"; // Número do seu primo
          const waMsg = encodeURIComponent(`Olá, vim do site. Meu ID é ${sessionId}. Tenho uma dúvida específica.`);
          window.location.href = `https://wa.me/${waNumber}?text=${waMsg}`;
        }, 4000);
      } else {
        setMessages(prev => [...prev, { id: (Date.now()+1).toString(), sender: 'ai', text: response, timestamp: new Date(), type: 'text' }]);
      }
    }, 1500);
  };

  return (
    <div className="h-screen flex flex-col bg-[#e5ddd5] font-sans overflow-hidden">
      {/* Header Estilo WhatsApp */}
      <div className="bg-[#075e54] text-white p-4 flex items-center justify-between shadow-lg shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-slate-300 flex items-center justify-center text-slate-600 font-bold">
             PM
          </div>
          <div>
            <h2 className="font-bold text-sm">Suporte Poedeira Master</h2>
            <div className="flex items-center gap-1">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
              <p className="text-[10px] text-green-300 font-bold uppercase">Online agora</p>
            </div>
          </div>
        </div>
        <div className="text-[10px] bg-white/10 px-2 py-1 rounded font-mono">
          Ref: {sessionId}
        </div>
      </div>

      {/* Área de Mensagens */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 pb-28">
        {messages.map(m => (
          <div key={m.id} className={`max-w-[85%] p-3 rounded-xl shadow-sm relative group ${m.sender === 'user' ? 'bg-[#dcf8c6] self-end rounded-tr-none ml-auto' : 'bg-white self-start rounded-tl-none mr-auto'}`}>
            <p className="text-sm text-slate-800 whitespace-pre-wrap leading-relaxed">{m.text}</p>
            <div className="flex justify-end items-center gap-1 mt-1">
              <p className="text-[9px] text-slate-400">{m.timestamp.toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'})}</p>
              {m.sender === 'user' && (
                <svg className="w-3 h-3 text-blue-500" fill="currentColor" viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>
              )}
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="bg-white p-3 px-5 rounded-full self-start text-xs text-slate-400 animate-bounce flex items-center gap-2 border border-white/50">
            <span className="w-1 h-1 bg-slate-400 rounded-full animate-pulse"></span>
            <span className="w-1 h-1 bg-slate-400 rounded-full animate-pulse delay-75"></span>
            <span className="w-1 h-1 bg-slate-400 rounded-full animate-pulse delay-150"></span>
          </div>
        )}
      </div>

      {/* Input */}
      <div className="p-3 bg-[#f0f0f0] flex items-center gap-2 fixed bottom-0 w-full lg:max-w-4xl lg:left-1/2 lg:-translate-x-1/2">
        <div className="flex-1 bg-white rounded-full px-5 py-3 border border-slate-200 shadow-sm flex items-center">
          <input 
            className="w-full outline-none text-sm bg-transparent placeholder:text-slate-400" 
            placeholder="Digite sua dúvida ou mande seu WhatsApp"
            value={inputText}
            onChange={e => setInputText(e.target.value)}
            onKeyPress={e => e.key === 'Enter' && handleSend()}
            onFocus={resetIdleTimer}
          />
        </div>
        
        <button 
          onClick={() => handleSend()}
          className="bg-[#075e54] text-white p-4 rounded-full shadow-md active:scale-90 transition-transform hover:bg-[#064e46]"
        >
          <svg className="w-5 h-5 rotate-90" fill="currentColor" viewBox="0 0 24 24"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/></svg>
        </button>
      </div>

      {/* Barra de Lead Status (DEBUG Visual para você ver funcionando) */}
      <div className="fixed bottom-20 left-4 right-4 pointer-events-none">
        <div className={`transition-all duration-500 p-2 rounded-lg text-[10px] font-black uppercase tracking-widest text-center shadow-xl border ${hasWhatsApp ? 'bg-green-500 text-white border-green-400 translate-y-0 opacity-100' : 'bg-slate-800 text-slate-400 border-slate-700 translate-y-4 opacity-0'}`}>
           Lead Identificado: WhatsApp Capturado ✓
        </div>
      </div>
    </div>
  );
};

export default ChatView;
