
import { Lead, Product, DashboardStats } from './types';

export const MOCK_LEADS: Lead[] = [
  { id: '1', name: 'Ricardo Silva', email: 'ricardo@email.com', phone: '11988887777', status: 'Novo', date: '2023-10-25' },
  { id: '2', name: 'Maria Oliveira', email: 'maria@empresa.br', phone: '21977776666', status: 'Em Atendimento', date: '2023-10-24' },
  { id: '3', name: 'João Construtor', email: 'joao@obras.com', phone: '31966665555', status: 'Vendido', date: '2023-10-23' },
];

export const MOCK_PRODUCTS: Product[] = [
  { 
    id: 'p1', 
    name: 'SJM Máquina 1 Matriz', 
    price: 8000, 
    image: 'https://images.unsplash.com/photo-1541888946425-d81bb19480c5?auto=format&fit=crop&q=80&w=800',
    description: 'Alta compactação com motor de 2CV. Ideal para pequenos e médios fabricantes de blocos.' 
  },
  { 
    id: 'p2', 
    name: 'SJM Máquina Duo Matriz', 
    price: 9500, 
    image: 'https://images.unsplash.com/photo-1504307651254-35680f3366d4?auto=format&fit=crop&q=80&w=800',
    description: 'Sistema reforçado para produção simultânea de dois blocos. Maior produtividade do mercado.' 
  },
  { 
    id: 'p3', 
    name: 'Betoneira SJM 400L', 
    price: 4500, 
    image: 'https://images.unsplash.com/photo-1534398079543-7ae6d016b86a?auto=format&fit=crop&q=80&w=800',
    description: 'Betoneira profissional de alta durabilidade com proteção de pinhão e motor.' 
  }
];

export const MOCK_CAROUSEL_IMAGES = [
  'https://images.unsplash.com/photo-1541888946425-d81bb19480c5?auto=format&fit=crop&q=80&w=1200',
  'https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&q=80&w=1200',
  'https://images.unsplash.com/photo-1517646281554-aa10dc95152a?auto=format&fit=crop&q=80&w=1200'
];

export const MOCK_STATS: DashboardStats = {
  totalLeads: 154,
  totalChats: 382,
  totalOrders: 12,
  revenue: 'R$ 485.000,00'
};
