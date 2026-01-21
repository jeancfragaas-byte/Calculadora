
import React from 'react';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-emerald-800 text-white py-6 shadow-md">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-3">
            <div className="bg-white/10 p-1.5 rounded-xl backdrop-blur-sm">
              <svg width="40" height="40" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Flame */}
                <path d="M50 15C55 25 62 30 62 40C62 50 55 55 50 55C45 55 38 50 38 40C38 30 45 25 50 15Z" fill="#F59E0B" />
                <path d="M50 25C53 30 56 35 56 40C56 45 53 48 50 48C47 48 44 45 44 40C44 35 47 30 50 25Z" fill="#FB1" />
                
                {/* Scale Structure */}
                <path d="M35 78H65" stroke="#134E4A" strokeWidth="4" strokeLinecap="round"/>
                <path d="M40 82H60" stroke="#134E4A" strokeWidth="4" strokeLinecap="round"/>
                <path d="M45 86H55" stroke="#134E4A" strokeWidth="4" strokeLinecap="round"/>
                
                {/* Central Pole */}
                <circle cx="50" cy="55" r="3" fill="#134E4A" />
                <circle cx="50" cy="63" r="3" fill="#134E4A" />
                <circle cx="50" cy="71" r="3" fill="#134E4A" />
                <line x1="50" y1="52" x2="50" y2="78" stroke="#134E4A" strokeWidth="4" strokeLinecap="round" />
                
                {/* Balance Beam */}
                <path d="M28 48C35 43 65 43 72 48" stroke="#134E4A" strokeWidth="4" strokeLinecap="round" />
                
                {/* Pans */}
                <path d="M28 48L24 55H32L28 48Z" fill="#134E4A" />
                <path d="M72 48L68 55H76L72 48Z" fill="#134E4A" />
                <path d="M18 55C18 62 38 62 38 55H18Z" fill="#134E4A" fillOpacity="0.8" />
                <path d="M62 55C62 62 82 62 82 55H62Z" fill="#134E4A" fillOpacity="0.8" />
              </svg>
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight">SerSocial App - Calculadora de Vantagem</h1>
              <p className="text-emerald-100 text-xs opacity-90 uppercase tracking-wider font-medium">Estratégia para Assistentes Sociais Concurseiros</p>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-grow container mx-auto px-4 py-8 max-w-4xl">
        {children}
      </main>

      <footer className="bg-gray-100 border-t border-gray-200 py-8">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-2xl mx-auto space-y-3">
            <p className="text-gray-600 text-[11px] leading-relaxed font-medium">
              Este aplicativo oferece uma análise estratégica orientativa, sem qualquer garantia de aprovação ou nomeação. O resultado não substitui sua avaliação pessoal nem outros fatores não mensurados.
            </p>
            <div className="h-px bg-gray-200 w-16 mx-auto"></div>
            <p className="text-gray-400 text-[10px] uppercase tracking-widest font-bold">
              © {new Date().getFullYear()} SerSocial • Decisão Consciente
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
