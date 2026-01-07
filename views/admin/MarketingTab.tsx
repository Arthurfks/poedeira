
import React, { useState } from 'react';

const MarketingTab: React.FC = () => {
  const [pixels, setPixels] = useState({
    fbPixel: '',
    googleTag: 'AW-123456789',
    googleLead: 'AW-123456/LEAD_789',
    googlePurchase: 'AW-123456/PURCHASE_999'
  });

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
        <h3 className="text-xl font-black mb-6 flex items-center gap-2">
          <span className="w-2 h-8 bg-blue-600 rounded-full"></span>
          FACEBOOK ADS
        </h3>
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-black text-slate-400 uppercase mb-2">Pixel ID</label>
            <input 
              type="text" 
              value={pixels.fbPixel}
              onChange={e => setPixels({...pixels, fbPixel: e.target.value})}
              placeholder="Ex: 123456789012345"
              className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 font-bold"
            />
          </div>
        </div>
      </div>

      <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
        <h3 className="text-xl font-black mb-6 flex items-center gap-2">
          <span className="w-2 h-8 bg-orange-500 rounded-full"></span>
          GOOGLE ADS (TAGS)
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="md:col-span-2">
            <label className="block text-xs font-black text-slate-400 uppercase mb-2">Tag Global da Conta (G- / AW-)</label>
            <input 
              type="text" 
              value={pixels.googleTag}
              className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl font-bold"
            />
          </div>
          <div>
            <label className="block text-xs font-black text-slate-400 uppercase mb-2">Snippet Conversão: LEAD</label>
            <input 
              type="text" 
              value={pixels.googleLead}
              className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl font-bold"
            />
          </div>
          <div>
            <label className="block text-xs font-black text-slate-400 uppercase mb-2">Snippet Conversão: COMPRA</label>
            <input 
              type="text" 
              value={pixels.googlePurchase}
              className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl font-bold"
            />
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <button className="bg-slate-900 text-white px-10 py-4 rounded-xl font-black uppercase tracking-widest hover:bg-black transition-colors">
          Salvar Configurações
        </button>
      </div>
    </div>
  );
};

export default MarketingTab;
