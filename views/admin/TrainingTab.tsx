
import React from 'react';

const TrainingTab: React.FC = () => {
  return (
    <div className="space-y-8 max-w-5xl">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Roteiro Ativo */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
          <h3 className="font-black text-lg mb-4 text-slate-800">ROTEIRO ATIVO (AUTO-MSG)</h3>
          <p className="text-xs text-slate-400 mb-4 font-bold uppercase">A IA usará isso se a pessoa parar de responder</p>
          <textarea 
            className="w-full h-40 p-4 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-orange-500 font-medium"
            placeholder="Ex: Oi, ainda está por aí? Ficou alguma dúvida sobre o frete para sua região?"
          ></textarea>
        </div>

        {/* Tópicos de Conhecimento */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
          <h3 className="font-black text-lg mb-4 text-slate-800">TÓPICOS E REGRAS</h3>
          <div className="space-y-3">
            <TopicItem title="Valor 1 Matriz" content="R$ 8.000 à vista ou R$ 8.500 10x" />
            <TopicItem title="Endereço Fábrica" content="Rua das Máquinas, 100 - Distrito Industrial" />
            <TopicItem title="Garantia" content="12 meses contra defeitos de fabricação" />
            <button className="w-full py-2 border-2 border-dashed border-slate-200 rounded-xl text-xs font-black text-slate-400 hover:bg-slate-50">+ NOVO TÓPICO</button>
          </div>
        </div>
      </div>

      {/* Mídias para IA */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
        <h3 className="font-black text-lg mb-4 text-slate-800">FOTOS E VÍDEOS DE APOIO</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-4">
          <div className="aspect-square bg-slate-100 rounded-xl flex items-center justify-center border-2 border-dashed border-slate-300 text-slate-400 cursor-pointer hover:bg-slate-50">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" /></svg>
          </div>
          {[1,2,3].map(i => (
            <div key={i} className="aspect-square bg-slate-200 rounded-xl relative group overflow-hidden">
               <img src={`https://picsum.photos/200/200?sig=${i}`} className="w-full h-full object-cover group-hover:scale-110 transition-transform" />
               <button className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
               </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const TopicItem = ({ title, content }: { title: string, content: string }) => (
  <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 group">
    <div className="flex justify-between">
      <p className="text-[10px] font-black text-orange-600 uppercase mb-1">{title}</p>
      <button className="text-[9px] text-slate-300 hover:text-red-500 font-bold opacity-0 group-hover:opacity-100">Excluir</button>
    </div>
    <p className="text-sm font-bold text-slate-700">{content}</p>
  </div>
);

export default TrainingTab;
