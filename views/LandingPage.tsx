
import React from 'react';
import Button from '../components/Button';
import Carousel from '../components/Carousel';
import { MOCK_CAROUSEL_IMAGES } from '../constants';

interface LandingPageProps {
  onStartChat: () => void;
  onGoToLogin: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onStartChat, onGoToLogin }) => {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <header className="relative pt-12 pb-20 px-4 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-8 text-center lg:text-left">
          <div className="inline-block px-4 py-1.5 bg-slate-900 text-white rounded-full text-[10px] font-black uppercase tracking-[0.2em]">
            SJM Betoneiras • Qualidade Industrial
          </div>
          <h1 className="text-5xl md:text-8xl font-black text-slate-900 leading-[0.9] tracking-tighter">
            EQUIPAMENTOS QUE <span className="text-blue-600">ACELERAM</span> SUA OBRA.
          </h1>
          <p className="text-lg md:text-xl text-slate-500 leading-relaxed max-w-xl font-medium">
            Robustez bruta e tecnologia de ponta na fabricação de betoneiras e máquinas poedeiras. Feito para durar gerações.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-4">
            <Button onClick={onStartChat} variant="primary" className="bg-blue-600 hover:bg-blue-700 text-lg py-6 px-12 rounded-2xl shadow-2xl shadow-blue-200">
              Solicitar Orçamento
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
            </Button>
            <Button variant="ghost" className="text-lg py-6 px-12 border-slate-200 hover:bg-slate-50 rounded-2xl">
              Nossa História
            </Button>
          </div>
        </div>
        
        <div className="relative">
          <div className="absolute -inset-4 bg-blue-100 rounded-[3rem] -rotate-2"></div>
          <Carousel images={MOCK_CAROUSEL_IMAGES} />
        </div>
      </header>

      {/* Info Section - Informações Técnicas */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tighter">A ENGENHARIA POR TRÁS DA SJM.</h2>
              <div className="space-y-4">
                <div className="flex gap-4 p-6 bg-white rounded-3xl shadow-sm border border-slate-100">
                  <div className="shrink-0 w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center font-black">01</div>
                  <div>
                    <h4 className="font-black text-slate-800 uppercase text-sm mb-1">Aço de Alta Resistência</h4>
                    <p className="text-sm text-slate-500 leading-relaxed">Nossas cubas e estruturas são feitas com chapas de aço carbono certificadas, garantindo que não amassem ou oxidem precocemente.</p>
                  </div>
                </div>
                <div className="flex gap-4 p-6 bg-white rounded-3xl shadow-sm border border-slate-100">
                  <div className="shrink-0 w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center font-black">02</div>
                  <div>
                    <h4 className="font-black text-slate-800 uppercase text-sm mb-1">Soldagem Robotizada</h4>
                    <p className="text-sm text-slate-500 leading-relaxed">Precisão milimétrica em cada ponto de solda, eliminando falhas estruturais e aumentando a vida útil do equipamento em 40%.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative h-[500px] rounded-[3rem] overflow-hidden shadow-2xl">
              <img src="https://images.unsplash.com/photo-1504307651254-35680f3366d4?auto=format&fit=crop&q=80&w=1000" className="w-full h-full object-cover" alt="Obra" />
              <div className="absolute inset-0 bg-blue-900/20"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-24 text-center px-4 max-w-4xl mx-auto">
        <span className="text-blue-600 font-black text-xs uppercase tracking-widest mb-4 block">Confiança e Credibilidade</span>
        <h3 className="text-4xl font-black text-slate-900 mb-8 tracking-tighter uppercase italic">SJM Betoneiras: A parceira número 1 de quem constrói o Brasil.</h3>
        <p className="text-slate-500 text-lg leading-relaxed">
          Há mais de uma década no mercado, a SJM consolidou-se como sinônimo de força. Nossas máquinas poedeiras e betoneiras são desenvolvidas ouvindo quem está no canteiro de obras todos os dias.
        </p>
      </section>

      {/* Final Call */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto bg-slate-900 rounded-[3rem] p-12 md:p-24 text-center text-white relative overflow-hidden shadow-2xl">
          <div className="relative z-10">
            <h2 className="text-4xl md:text-6xl font-black mb-8 italic tracking-tighter uppercase">Pronto para subir o nível?</h2>
            <button 
              onClick={onStartChat} 
              className="bg-blue-600 text-white hover:bg-blue-500 px-16 py-6 text-xl font-black rounded-2xl transition-all shadow-2xl inline-flex items-center gap-4 active:scale-95 group"
            >
              Falar com Consultor Agora
              <svg className="w-6 h-6 group-hover:translate-x-1 transition-transform" fill="currentColor" viewBox="0 0 24 24"><path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766 0-3.18-2.587-5.766-5.764-5.766zm3.392 8.221c-.142-.072-.844-.417-.975-.463-.129-.047-.224-.072-.319.072-.094.144-.367.463-.448.555-.084.094-.165.105-.306.035-.143-.072-.601-.221-1.146-.706-.423-.377-.709-.844-.792-.987-.083-.142-.009-.22.063-.291.063-.064.142-.165.214-.247.071-.083.094-.143.142-.238.047-.095.023-.178-.011-.25-.034-.072-.319-.77-.437-1.055-.116-.282-.234-.244-.319-.248-.083-.004-.177-.004-.271-.004-.095 0-.25.035-.38.178-.132.143-.501.488-.501 1.192 0 .703.512 1.383.583 1.477.072.094 1.008 1.539 2.441 2.159.341.148.607.236.814.302.343.11.655.093.902.057.275-.04.844-.344 1.033-.678.189-.333.189-.619.133-.678-.057-.058-.201-.093-.343-.165z"/></svg>
            </button>
          </div>
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/20 blur-[120px] rounded-full"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-600/10 blur-[100px] rounded-full"></div>
        </div>
      </section>

      <footer className="py-12 border-t border-slate-100 text-center">
        <div className="max-w-7xl mx-auto px-4 flex flex-col items-center gap-6">
          <h2 className="text-xl font-black italic tracking-tighter">SJM <span className="text-blue-600 uppercase">Betoneiras</span></h2>
          <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest">&copy; 2023 SJM Indústria de Máquinas. Direitos Reservados.</p>
          <button onClick={onGoToLogin} className="text-slate-300 hover:text-blue-600 text-[10px] font-black uppercase tracking-widest transition-colors">Acesso Restrito</button>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
