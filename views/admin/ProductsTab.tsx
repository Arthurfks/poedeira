
import React from 'react';
import { MOCK_PRODUCTS } from '../../constants';

const ProductsTab: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-black text-slate-800">CATÁLOGO PARA IA</h3>
        <button className="bg-orange-600 text-white px-4 py-2 rounded-lg text-xs font-black uppercase tracking-widest hover:bg-orange-700 transition-colors">
          + Adicionar Produto
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {MOCK_PRODUCTS.map(product => (
          <div key={product.id} className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm group">
            <div className="h-40 bg-slate-100 relative overflow-hidden">
              <img src={product.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
              <div className="absolute top-2 right-2 flex gap-2">
                <button className="bg-white/90 p-2 rounded-lg text-slate-600 shadow-sm hover:text-orange-600"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg></button>
              </div>
            </div>
            <div className="p-6">
              <h4 className="font-black text-slate-800 mb-2 uppercase tracking-tighter">{product.name}</h4>
              <p className="text-xs text-slate-500 line-clamp-2 mb-4 font-medium">{product.description}</p>
              <div className="flex justify-between items-center pt-4 border-t border-slate-50">
                <span className="text-lg font-black text-orange-600">Sob Consulta</span>
                <span className="text-[10px] font-black bg-green-100 text-green-700 px-2 py-0.5 rounded">ATIVO</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductsTab;
