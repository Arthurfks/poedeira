
import React, { useState } from 'react';

const ChatsTab: React.FC = () => {
  const [selectedChat, setSelectedChat] = useState<number | null>(null);

  const mockChats = [
    { 
      id: 1, 
      name: 'Ricardo Silva', 
      phone: '11988887777',
      lastMsg: 'Qual o valor do frete para MG?', 
      time: '10:45', 
      unread: true,
      messages: [
        { sender: 'user', text: 'Bom dia, vi o site de vocês.', time: '10:40' },
        { sender: 'ai', text: 'Bom dia Ricardo! Sou o consultor da SJM Betoneiras. Como posso te ajudar hoje?', time: '10:41' },
        { sender: 'user', text: 'Gostaria de saber o valor do frete de uma betoneira para Minas Gerais.', time: '10:43' },
        { sender: 'ai', text: 'Temos ótimas transportadoras parceiras para todo o Brasil. Para calcular exato, poderia me passar seu WhatsApp com DDD?', time: '10:44' },
        { sender: 'user', text: 'Meu whats é 11988887777. Qual o valor do frete para MG?', time: '10:45' },
      ]
    },
    { id: 2, name: 'Maria Oliveira', phone: '21977776666', lastMsg: 'Obrigada pelas fotos.', time: 'Ontem', unread: false, messages: [
       { sender: 'user', text: 'Quero ver fotos da máquina de 2 matrizes.', time: 'Ontem 14:00' },
       { sender: 'ai', text: 'Claro Maria! Vou te mandar no WhatsApp para facilitar. Qual seu número?', time: 'Ontem 14:01' },
       { sender: 'user', text: '21977776666', time: 'Ontem 14:05' },
       { sender: 'ai', text: 'Perfeito, acabei de enviar. Obrigada!', time: 'Ontem 14:06' },
       { sender: 'user', text: 'Obrigada pelas fotos.', time: 'Ontem 14:10' },
    ] },
    { id: 3, name: 'João Construtor', phone: '31966665555', lastMsg: 'Quero fechar o pedido.', time: '2 dias atrás', unread: false, messages: [
       { sender: 'user', text: 'Como faço para comprar?', time: 'Segunda 10:00' },
       { sender: 'ai', text: 'Olá! Sou da SJM Betoneiras. Aceitamos cartão em até 10x ou PIX com desconto. Qual seu WhatsApp para eu gerar seu link?', time: 'Segunda 10:01' },
       { sender: 'user', text: 'Pode ser aqui no 31966665555.', time: 'Segunda 10:02' },
       { sender: 'ai', text: 'Maravilha João. Vou te enviar o link de pagamento pela InfinitePay.', time: 'Segunda 10:03' },
       { sender: 'user', text: 'Quero fechar o pedido.', time: 'Segunda 10:10' },
    ] },
  ];

  const currentChat = mockChats.find(c => c.id === selectedChat);

  return (
    <div className="bg-white rounded-[2.5rem] shadow-sm border border-slate-200 overflow-hidden h-[calc(100vh-12rem)] flex">
      {/* Lista Lateral de Conversas */}
      <div className={`${selectedChat ? 'hidden md:block' : 'block'} w-full md:w-96 border-r overflow-y-auto bg-slate-50/10`}>
        <div className="p-6 border-b bg-white">
          <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4">Conversas Ativas</h3>
          <input className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl text-xs outline-none focus:ring-2 focus:ring-blue-600 font-bold" placeholder="Buscar por nome ou lead..." />
        </div>
        <div className="divide-y divide-slate-100">
          {mockChats.map(chat => (
            <div 
              key={chat.id} 
              onClick={() => setSelectedChat(chat.id)}
              className={`p-6 hover:bg-white cursor-pointer transition-all relative group ${selectedChat === chat.id ? 'bg-white shadow-xl z-10' : ''}`}
            >
              <div className="flex justify-between items-start mb-2">
                <h4 className="font-black text-slate-800 text-sm uppercase tracking-tight">{chat.name}</h4>
                <span className="text-[9px] text-slate-400 font-black">{chat.time}</span>
              </div>
              <p className="text-xs text-slate-500 truncate font-medium pr-4">{chat.lastMsg}</p>
              {chat.unread && <div className="absolute right-6 top-1/2 -translate-y-1/2 w-2 h-2 bg-blue-600 rounded-full shadow-lg shadow-blue-200" />}
            </div>
          ))}
        </div>
      </div>

      {/* Visualização de Mensagens (Auditoria) */}
      <div className={`${selectedChat ? 'flex' : 'hidden md:flex'} flex-1 flex-col bg-[#f8fafc]`}>
        {currentChat ? (
          <>
            <div className="p-6 bg-white border-b flex items-center justify-between">
              <div className="flex items-center gap-4">
                <button onClick={() => setSelectedChat(null)} className="md:hidden p-2 text-slate-400">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg>
                </button>
                <div className="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center font-black text-slate-400 uppercase text-lg border border-slate-200">
                   {currentChat.name.charAt(0)}
                </div>
                <div>
                  <h3 className="font-black text-slate-800 text-sm uppercase tracking-tight">{currentChat.name}</h3>
                  <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest">{currentChat.phone}</p>
                </div>
              </div>
              <div className="flex gap-2">
                 <button className="text-[10px] font-black text-blue-600 uppercase border border-blue-100 px-4 py-2.5 rounded-xl hover:bg-blue-50 transition-colors">Exportar Chat</button>
                 <button 
                   onClick={() => window.open(`https://wa.me/55${currentChat.phone}`, '_blank')}
                   className="text-[10px] font-black bg-[#25D366] text-white uppercase px-4 py-2.5 rounded-xl hover:bg-[#128C7E] transition-colors flex items-center gap-2"
                 >
                   Assumir no WhatsApp
                 </button>
              </div>
            </div>
            
            <div className="flex-1 overflow-y-auto p-8 space-y-6">
              {currentChat.messages.map((m, idx) => (
                <div key={idx} className={`flex flex-col ${m.sender === 'user' ? 'items-end' : 'items-start'}`}>
                  <div className={`max-w-[70%] p-5 rounded-3xl text-sm shadow-sm ${m.sender === 'user' ? 'bg-slate-200 rounded-tr-none text-slate-700' : 'bg-blue-600 rounded-tl-none text-white'}`}>
                    <p className="font-medium leading-relaxed">{m.text}</p>
                  </div>
                  <span className="text-[9px] mt-2 text-slate-400 font-black uppercase">{m.time}</span>
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-slate-300">
            <div className="w-24 h-24 bg-slate-100 rounded-[2rem] flex items-center justify-center mb-6">
               <svg className="w-10 h-10 opacity-20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
            </div>
            <p className="font-black italic uppercase text-xs tracking-widest animate-pulse">Selecione um histórico para auditar o atendimento</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatsTab;
