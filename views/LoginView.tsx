
import React, { useState } from 'react';
import Button from '../components/Button';

interface LoginViewProps {
  onLogin: (success: boolean) => void;
}

const LoginView: React.FC<LoginViewProps> = ({ onLogin }) => {
  const [user, setUser] = useState('');
  const [pass, setPass] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (user === 'joao' && pass === 'joao123') {
      onLogin(true);
    } else {
      setError('Acesso negado. Verifique os dados de acesso.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
      <div className="bg-white p-8 md:p-10 rounded-3xl shadow-2xl w-full max-w-md border border-slate-200">
        <div className="text-center mb-10">
          <div className="w-16 h-16 bg-orange-600 text-white rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-orange-200">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
          </div>
          <h2 className="text-3xl font-black text-slate-900">ADMIN</h2>
          <p className="text-slate-500 mt-2 font-medium">Painel de Controle Restrito</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-xs font-black text-slate-500 uppercase tracking-widest mb-2">Usuário</label>
            <input 
              type="text" 
              value={user}
              onChange={(e) => setUser(e.target.value)}
              className="w-full p-4 bg-slate-100 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-orange-500 text-slate-900 font-bold transition-all placeholder:text-slate-400"
              placeholder="Digite seu usuário"
              autoComplete="username"
            />
          </div>
          <div>
            <label className="block text-xs font-black text-slate-500 uppercase tracking-widest mb-2">Senha</label>
            <input 
              type="password" 
              value={pass}
              onChange={(e) => setPass(e.target.value)}
              className="w-full p-4 bg-slate-100 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-orange-500 text-slate-900 font-bold transition-all placeholder:text-slate-400"
              placeholder="Digite sua senha"
              autoComplete="current-password"
            />
          </div>

          {error && (
            <div className="bg-red-50 text-red-600 p-4 rounded-xl text-sm font-bold text-center border border-red-200 animate-pulse">
              {error}
            </div>
          )}

          <Button type="submit" variant="primary" className="w-full py-4 text-lg">
            Entrar no Sistema
          </Button>
        </form>
        
        <div className="mt-8 pt-8 border-t border-slate-100 text-center">
          <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest">
            Acesso seguro via SSL
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginView;
