
import React from 'react';
import { MOCK_LEADS } from '../../constants';

const LeadsTab: React.FC = () => {
  const handleWhatsApp = (phone: string) => {
    const clean = phone.replace(/\D/g, '');
    window.open(`https://wa.me/${clean.startsWith('55') ? clean : '55' + clean}`, '_blank');
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
      <div className="p-6 border-b flex justify-between items-center bg-slate-50/30">
        <h3 className="font-black text-slate-800 uppercase tracking-tighter">Gestão de Leads</h3>
        <button className="text-[10px] bg-white border px-3 py-1.5 rounded-lg font-black text-slate-400 uppercase tracking-widest hover:bg-slate-50 transition-colors">Exportar para Excel</button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-slate-50 text-[10px] uppercase font-black text-slate-400 border-b">
            <tr>
              <th className="px-6 py-4">Lead</th>
              <th className="px-6 py-4">WhatsApp</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">Ações</th>
            </tr>
          </thead>
          <tbody className="divide-y text-sm">
            {MOCK_LEADS.map(lead => (
              <tr key={lead.id} className="hover:bg-slate-50/50 transition-colors group">
                <td className="px-6 py-4">
                  <div className="font-black text-slate-700 uppercase tracking-tight">{lead.name}</div>
                  <div className="text-[10px] text-slate-400 font-bold">{lead.email}</div>
                </td>
                <td className="px-6 py-4 text-slate-500 font-mono text-xs">{lead.phone}</td>
                <td className="px-6 py-4">
                  <span className={`px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest ${lead.status === 'Vendido' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'}`}>
                    {lead.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <button 
                    onClick={() => handleWhatsApp(lead.phone)}
                    className="bg-[#25D366] text-white px-4 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest flex items-center gap-2 hover:bg-[#128C7E] shadow-sm active:scale-95 transition-all"
                  >
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.438 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413z"/></svg>
                    WhatsApp
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LeadsTab;
