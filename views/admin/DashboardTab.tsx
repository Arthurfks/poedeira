
import React from 'react';
import { MOCK_STATS } from '../../constants';

const DashboardTab: React.FC = () => {
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card value={MOCK_STATS.totalLeads} label="Total Leads" color="blue" />
        <Card value={MOCK_STATS.totalChats} label="Conversas IA" color="orange" />
        <Card value={MOCK_STATS.totalOrders} label="Vendas" color="green" />
        <Card value={MOCK_STATS.revenue} label="Faturamento" color="slate" />
      </div>
      
      <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm h-64 flex items-center justify-center text-slate-300 font-black italic">
        Gráfico de Performance em Breve
      </div>
    </div>
  );
};

const Card = ({ value, label, color }: any) => (
  <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{label}</p>
    <p className={`text-2xl font-black text-slate-800`}>{value}</p>
  </div>
);

export default DashboardTab;
