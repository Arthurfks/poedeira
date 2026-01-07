
import React, { useState, useMemo } from 'react';
import { MOCK_LEADS, MOCK_PRODUCTS } from '../../constants';

const OrdersTab: React.FC = () => {
  const [selectedLeadId, setSelectedLeadId] = useState('');
  const [selectedProductId, setSelectedProductId] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'vista' | 'parcelado'>('vista');
  const [generatedLink, setGeneratedLink] = useState('');
  const [loading, setLoading] = useState(false);

  const product = useMemo(() => 
    MOCK_PRODUCTS.find(p => p.id === selectedProductId), 
    [selectedProductId]
  );

  const lead = useMemo(() => 
    MOCK_LEADS.find(l => l.id === selectedLeadId), 
    [selectedLeadId]
  );

  const totalValue = useMemo(() => {
    if (!product) return 0;
    return paymentMethod === 'parcelado' ? product.price * 1.1 : product.price;
  }, [product, paymentMethod]);

  const depositValue = useMemo(() => totalValue / 2, [totalValue]);

  const handleGenerateLink = async () => {
    if (!lead || !product) {
      alert('Selecione os dados necessários.');
      return;
    }

    setLoading(true);
    setGeneratedLink('');

    try {
      const orderId = `SJM-${Math.random().toString(36).substr(2, 6).toUpperCase()}`;
      const amountInCents = Math.round(depositValue * 100);

      // CHAMADA AO BACKEND REAL
      const response = await fetch('http://localhost:3001/api/checkout/generate-link', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          lead,
          product,
          paymentMethod,
          amountInCents,
          orderId
        })
      });

      const data = await response.json();

      if (data.link) {
        setGeneratedLink(data.link);
      } else {
        throw new Error('Falha ao obter link');
      }
    } catch (error) {
      console.error(error);
      alert('Erro ao conectar com o servidor. Verifique se o backend está rodando.');
    } finally {
      setLoading(false);
    }
  };

  const copyLink = () => {
    navigator.clipboard.writeText(generatedLink);
    alert('Link copiado!');
  };

  return (
    <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 pb-20">
      <div className="xl:col-span-2 space-y-6">
        <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-200">
          <div className="flex items-center gap-4 mb-8 border-b pb-6">
            <div className="w-14 h-14 bg-black text-white rounded-2xl flex items-center justify-center font-black italic text-2xl">∞</div>
            <div>
              <h3 className="font-black text-slate-900 text-xl uppercase tracking-tighter">Checkout Integrado</h3>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mt-2">Geração via API Backend Segura</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Cliente</label>
              <select 
                value={selectedLeadId}
                onChange={e => setSelectedLeadId(e.target.value)}
                className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl font-bold text-sm outline-none focus:ring-4 focus:ring-blue-50"
              >
                <option value="">Escolha o Lead...</option>
                {MOCK_LEADS.map(l => (
                  <option key={l.id} value={l.id}>{l.name}</option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Equipamento</label>
              <select 
                value={selectedProductId}
                onChange={e => setSelectedProductId(e.target.value)}
                className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl font-bold text-sm outline-none focus:ring-4 focus:ring-blue-50"
              >
                <option value="">Selecione a Máquina...</option>
                {MOCK_PRODUCTS.map(p => (
                  <option key={p.id} value={p.id}>{p.name}</option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Modalidade</label>
              <div className="flex gap-2">
                <button 
                  onClick={() => setPaymentMethod('vista')}
                  className={`flex-1 py-4 rounded-xl font-black text-[9px] uppercase tracking-widest transition-all border-2 ${paymentMethod === 'vista' ? 'bg-slate-900 text-white border-slate-900' : 'bg-white text-slate-400 border-slate-100'}`}
                >
                  À Vista
                </button>
                <button 
                  onClick={() => setPaymentMethod('parcelado')}
                  className={`flex-1 py-4 rounded-xl font-black text-[9px] uppercase tracking-widest transition-all border-2 ${paymentMethod === 'parcelado' ? 'bg-slate-900 text-white border-slate-900' : 'bg-white text-slate-400 border-slate-100'}`}
                >
                  Parcelado
                </button>
              </div>
            </div>

            <div className="flex items-end">
              <button 
                onClick={handleGenerateLink}
                disabled={!selectedLeadId || !selectedProductId || loading}
                className="w-full py-4 bg-blue-600 text-white rounded-xl font-black uppercase tracking-[0.2em] text-[10px] hover:bg-blue-700 transition-all shadow-xl shadow-blue-100 disabled:opacity-20 flex items-center justify-center gap-2"
              >
                {loading ? (
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                ) : 'Gerar Checkout Real'}
              </button>
            </div>
          </div>
        </div>

        {/* Resumo Financeiro */}
        <div className="bg-slate-50 p-8 rounded-[2.5rem] border border-slate-200/50 flex flex-col md:flex-row gap-8 items-center justify-between">
           <div className="text-center md:text-left">
             <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Total Negociado</p>
             <p className="text-xl font-black text-slate-700 tracking-tighter">R$ {totalValue.toLocaleString('pt-BR', {minimumFractionDigits: 2})}</p>
           </div>
           <div className="bg-blue-600 text-white px-10 py-5 rounded-[2rem] shadow-2xl shadow-blue-200 text-center scale-110">
             <p className="text-[9px] font-black uppercase tracking-widest opacity-80 mb-1">Sinal de Entrada (50%)</p>
             <p className="text-3xl font-black tracking-tighter leading-none">R$ {depositValue.toLocaleString('pt-BR', {minimumFractionDigits: 2})}</p>
           </div>
           <div className="text-center md:text-right">
             <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Saldo na Entrega</p>
             <p className="text-xl font-black text-slate-400 tracking-tighter">R$ {depositValue.toLocaleString('pt-BR', {minimumFractionDigits: 2})}</p>
           </div>
        </div>

        {generatedLink && (
          <div className="bg-slate-900 p-8 rounded-[2.5rem] text-white shadow-2xl animate-in fade-in slide-in-from-bottom-4 overflow-hidden relative">
             <div className="relative z-10">
               <div className="flex justify-between items-center mb-6">
                  <h4 className="font-black uppercase tracking-tighter text-lg italic">Link Gerado pelo Servidor</h4>
                  <span className="bg-green-500 text-white text-[8px] font-black px-3 py-1 rounded-full uppercase">API Response OK</span>
               </div>
               <div className="flex gap-3">
                 <div className="flex-1 bg-white/5 border border-white/10 p-5 rounded-2xl text-[9px] font-mono break-all text-blue-200">
                    {generatedLink}
                 </div>
                 <button 
                   onClick={copyLink}
                   className="bg-blue-600 text-white p-5 rounded-2xl hover:bg-blue-500 active:scale-90 transition-all"
                 >
                   <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" /></svg>
                 </button>
               </div>
             </div>
             <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-blue-600/10 rounded-full blur-[100px]"></div>
          </div>
        )}
      </div>

      {/* Auditoria de Gateway */}
      <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm h-fit">
        <h3 className="font-black text-slate-800 uppercase text-xs mb-6 tracking-widest border-b pb-4">Log de Transações</h3>
        <div className="space-y-4">
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
            <p className="text-[8px] font-black text-slate-400 uppercase mb-1">Aguardando Webhook</p>
            <p className="text-[10px] text-slate-600 font-bold">Nenhum pagamento detectado nos últimos 5 min.</p>
          </div>
          <div className="p-4 bg-blue-50 rounded-2xl border border-blue-100">
            <p className="text-[8px] font-black text-blue-400 uppercase mb-1">Configuração Backend</p>
            <p className="text-[10px] text-blue-600 font-bold leading-relaxed">
              O backend está pronto para receber notificações de pagamento via POST /api/webhooks.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrdersTab;
