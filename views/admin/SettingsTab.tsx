
import React from 'react';

const SettingsTab: React.FC = () => {
  return (
    <div className="max-w-4xl space-y-8">
      <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
        <h3 className="text-xl font-black mb-6 text-slate-800 uppercase tracking-tighter">Identidade Visual</h3>
        <div className="flex items-center gap-8">
          <div className="w-24 h-24 bg-slate-100 rounded-2xl border-2 border-dashed border-slate-200 flex items-center justify-center text-slate-400">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
          </div>
          <div className="flex-1">
            <p className="text-xs font-black text-slate-400 uppercase mb-2">Logo da Empresa</p>
            <button className="bg-slate-100 text-slate-600 px-6 py-2 rounded-lg text-xs font-bold hover:bg-slate-200 transition-colors">Fazer Upload</button>
            <p className="text-[10px] text-slate-400 mt-2 italic">Recomendado: 512x512px (PNG ou SVG)</p>
          </div>
        </div>
      </div>

      <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
        <h3 className="text-xl font-black mb-6 text-slate-800 uppercase tracking-tighter">Dados da Conta</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-xs font-black text-slate-400 uppercase mb-2">Nome do Usuário</label>
            <input type="text" defaultValue="João Silva" className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl font-bold" />
          </div>
          <div>
            <label className="block text-xs font-black text-slate-400 uppercase mb-2">E-mail de Notificação</label>
            <input type="email" defaultValue="joao@poedeiramaster.com.br" className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl font-bold" />
          </div>
          <div>
            <label className="block text-xs font-black text-slate-400 uppercase mb-2">Senha Atual</label>
            <input type="password" placeholder="••••••••" className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl font-bold" />
          </div>
          <div>
            <label className="block text-xs font-black text-slate-400 uppercase mb-2">Nova Senha</label>
            <input type="password" placeholder="Mínimo 8 caracteres" className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl font-bold" />
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <button className="bg-slate-900 text-white px-10 py-4 rounded-xl font-black uppercase tracking-widest hover:bg-black transition-colors">
          Salvar Alterações
        </button>
      </div>
    </div>
  );
};

export default SettingsTab;
