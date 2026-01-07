
import React, { useState } from 'react';
import { Page } from '../types';

interface FloatingNavProps {
  onNavigate: (page: Page) => void;
  currentPage: Page;
}

const FloatingNav: React.FC<FloatingNavProps> = ({ onNavigate, currentPage }) => {
  const [isOpen, setIsOpen] = useState(true);

  const pages: { id: Page; label: string; icon: React.ReactNode }[] = [
    { 
      id: 'landing', 
      label: 'Site', 
      icon: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg> 
    },
    { 
      id: 'chat', 
      label: 'Chat', 
      icon: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg> 
    },
    { 
      id: 'login', 
      label: 'Admin', 
      icon: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg> 
    },
  ];

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[9999] flex flex-col items-center gap-2">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="bg-orange-600 text-white p-2 rounded-full shadow-lg hover:bg-orange-700 transition-colors"
      >
        {isOpen ? (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
        ) : (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 15l7-7 7 7" /></svg>
        )}
      </button>

      {isOpen && (
        <div className="flex gap-2 bg-gray-900/95 backdrop-blur-md p-2 rounded-full shadow-2xl border border-white/20">
          {pages.map((p) => (
            <button
              key={p.id}
              onClick={() => onNavigate(p.id)}
              className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all flex items-center gap-2 ${
                currentPage === p.id 
                  ? 'bg-orange-500 text-white' 
                  : 'text-gray-300 hover:bg-white/10'
              }`}
            >
              {p.icon}
              {p.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default FloatingNav;
