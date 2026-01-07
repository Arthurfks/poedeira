
import React, { useState, useEffect } from 'react';
import { Page } from './types';
import LandingPage from './views/LandingPage';
import ChatView from './views/ChatView';
import LoginView from './views/LoginView';
import AdminDashboard from './views/AdminDashboard';
import FloatingNav from './components/FloatingNav';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>('landing');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  const handleLogin = (success: boolean) => {
    if (success) {
      setIsLoggedIn(true);
      setCurrentPage('admin');
    }
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'landing':
        return <LandingPage 
          onStartChat={() => setCurrentPage('chat')} 
          onGoToLogin={() => setCurrentPage('login')}
        />;
      case 'chat':
        return <ChatView />;
      case 'login':
        // Permite visualizar a tela de login mesmo se já estiver logado (para testes de UI)
        return <LoginView onLogin={handleLogin} />;
      case 'admin':
        // Para fins de teste/visualização do front, permitimos ver o admin. 
        // Em produção, isso seria protegido pelo estado isLoggedIn.
        return <AdminDashboard />;
      default:
        return <LandingPage 
          onStartChat={() => setCurrentPage('chat')} 
          onGoToLogin={() => setCurrentPage('login')}
        />;
    }
  };

  return (
    <div className="min-h-screen relative font-sans antialiased text-gray-900 overflow-x-hidden">
      {/* Botão flutuante restaurado para navegação rápida entre telas durante o desenvolvimento */}
      <FloatingNav 
        currentPage={currentPage} 
        onNavigate={(page) => setCurrentPage(page)} 
      />

      <main className="transition-opacity duration-300">
        {renderPage()}
      </main>
    </div>
  );
};

export default App;
