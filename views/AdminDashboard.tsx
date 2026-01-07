
import React, { useState } from 'react';
import { AdminTab } from '../types.ts';
import Sidebar from '../components/admin/Sidebar.tsx';
import DashboardTab from './admin/DashboardTab.tsx';
import LeadsTab from './admin/LeadsTab.tsx';
import ChatsTab from './admin/ChatsTab.tsx';
import ProductsTab from './admin/ProductsTab.tsx';
import OrdersTab from './admin/OrdersTab.tsx';
import MarketingTab from './admin/MarketingTab.tsx';
import TrainingTab from './admin/TrainingTab.tsx';
import SettingsTab from './admin/SettingsTab.tsx';

const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<AdminTab>('Dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const renderContent = () => {
    switch (activeTab) {
      case 'Dashboard': return <DashboardTab />;
      case 'Leads': return <LeadsTab />;
      case 'Chats': return <ChatsTab />;
      case 'Produtos': return <ProductsTab />;
      case 'Pedidos': return <OrdersTab />;
      case 'Marketing': return <MarketingTab />;
      case 'Treinamento': return <TrainingTab />;
      case 'Configurações': return <SettingsTab />;
      default: return <DashboardTab />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex overflow-hidden">
      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        isOpen={isSidebarOpen} 
        setIsOpen={setIsSidebarOpen} 
      />
      
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        <header className="h-16 bg-white border-b flex items-center justify-between px-6 shrink-0">
          <button onClick={() => setIsSidebarOpen(true)} className="lg:hidden p-2 text-slate-500">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" /></svg>
          </button>
          <h1 className="text-lg font-black text-slate-800 uppercase tracking-tighter">{activeTab}</h1>
          <div className="flex items-center gap-3">
            <span className="text-xs font-bold text-slate-400 hidden sm:block">Logado como João Silva</span>
            <div className="w-8 h-8 rounded-full bg-orange-600 flex items-center justify-center text-white font-bold text-xs">JS</div>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-4 md:p-8">
          {renderContent()}
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
