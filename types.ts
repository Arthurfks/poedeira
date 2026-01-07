
export type Page = 'landing' | 'chat' | 'login' | 'admin';
export type AdminTab = 'Dashboard' | 'Leads' | 'Chats' | 'Produtos' | 'Pedidos' | 'Marketing' | 'Treinamento' | 'Configurações';

export interface Message {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: Date;
  type: 'text' | 'audio';
}

export interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  status: 'Novo' | 'Em Atendimento' | 'Vendido' | 'Perdido';
  date: string;
}

export interface Product {
  id: string;
  name: string;
  price: number; // Alterado para number para facilitar cálculos
  description: string;
  image: string;
}

export interface Order {
  id: string;
  leadId: string;
  productId: string;
  totalValue: number;
  depositValue: number; // Valor do sinal (50%)
  paymentMethod: 'vista' | 'parcelado';
  status: 'Pendente' | 'Pago';
  linkInfinite: string;
  createdAt: string;
}

export interface DashboardStats {
  totalLeads: number;
  totalChats: number;
  totalOrders: number;
  revenue: string;
}
