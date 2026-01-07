
import React, { useState, useEffect } from 'react';
import { Page } from './types.ts';
import LandingPage from './views/LandingPage.tsx';
import ChatView from './views/ChatView.tsx';
import LoginView from './views/LoginView.tsx';
import AdminDashboard from './views/AdminDashboard.tsx';
import FloatingNav from './components/FloatingNav.tsx';

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
        return <LoginView onLogin={handleLogin} />;
      case 'admin':
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
