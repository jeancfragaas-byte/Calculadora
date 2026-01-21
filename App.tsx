
import React, { useState } from 'react';
import { 
  FormData, 
  CalculationResult
} from './types';
import { calculateIVC } from './logic/calculator';
import Layout from './components/Layout';
import FormStep from './components/FormStep';

type ViewState = 'HOME' | 'FORM' | 'LOADING' | 'RESULT';

const INITIAL_FORM_DATA: FormData = {
  salarioBruto: 0,
  beneficiosFixos: 0,
  cargaHoraria: '30h',
  tipoVinculo: 'Estatutário',
  numeroVagas: 1,
  cadastroReserva: false,
  dificuldadeBanca: 'Médio',
  probabilidadeNomeacao: 'Média',
  estruturaTrabalho: 'Regular',
  competitividade: 'Médio',
  nivelPreparacao: 'Intermediário',
  tempoDisponivel: 'Médio',
  experienciaPrevia: 'Nenhuma',
  distancia: 'Mesma cidade',
  interesse: 'Médio',
  familiaridadeBanca: 'Pouca',
  dominioConteudo: 'Médio',
  situacaoAtual: 'Empregado',
  prioridadeFinanceira: 'Média',
  toleranciaSobrecarga: 'Média'
};

const Tooltip = ({ text }: { text: string }) => (
  <div className="group relative inline-block ml-1.5 align-middle">
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-emerald-400 cursor-help"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block w-48 p-2 bg-gray-800 text-white text-[10px] rounded shadow-xl z-50 leading-tight">
      {text}
      <div className="absolute top-full left-1/2 -translate-x-1/2 border-8 border-transparent border-t-gray-800"></div>
    </div>
  </div>
);

const App: React.FC = () => {
  const [view, setView] = useState<ViewState>('HOME');
  const [formData, setFormData] = useState<FormData>(INITIAL_FORM_DATA);
  const [result, setResult] = useState<CalculationResult | null>(null);
  const [loadingText, setLoadingText] = useState('Analisando edital...');

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const finalValue = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'number' ? parseFloat(value as string) || 0 : finalValue
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setView('LOADING');
    window.scrollTo({ top: 0, behavior: 'smooth' });

    const steps = [
      "Processando dados do edital...",
      "Cruzando com seu perfil profissional...",
      "Avaliando viabilidade logística e financeira...",
      "Gerando diagnóstico estratégico final..."
    ];

    steps.forEach((text, i) => {
      setTimeout(() => setLoadingText(text), i * 600);
    });

    setTimeout(() => {
      const res = calculateIVC(formData);
      setResult(res);
      setView('RESULT');
    }, 2400);
  };

  const reset = () => {
    setFormData(INITIAL_FORM_DATA);
    setResult(null);
    setView('HOME');
  };

  const LogoSerSocial = ({ size = 120, animate = false }: { size?: number, animate?: boolean }) => (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 100 100" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={animate ? "animate-pulse" : ""}
    >
      <path d="M50 15C55 25 62 30 62 40C62 50 55 55 50 55C45 55 38 50 38 40C38 30 45 25 50 15Z" fill="#F59E0B" />
      <path d="M50 25C53 30 56 35 56 40C56 45 53 48 50 48C47 48 44 45 44 40C44 35 47 30 50 25Z" fill="#FB1" />
      <path d="M35 78H65" stroke="#134E4A" strokeWidth="4" strokeLinecap="round"/>
      <path d="M40 82H60" stroke="#134E4A" strokeWidth="4" strokeLinecap="round"/>
      <circle cx="50" cy="55" r="3" fill="#134E4A" />
      <line x1="50" y1="52" x2="50" y2="78" stroke="#134E4A" strokeWidth="4" strokeLinecap="round" />
      <path d="M28 48C35 43 65 43 72 48" stroke="#134E4A" strokeWidth="4" strokeLinecap="round" />
      <path d="M18 55C18 62 38 62 38 55H18Z" fill="#134E4A" />
      <path d="M62 55C62 62 82 62 82 55H62Z" fill="#134E4A" />
    </svg>
  );

  return (
    <Layout>
      {view === 'HOME' && (
        <div className="flex flex-col items-center text-center py-16 animate-fade-in">
          <div className="bg-emerald-50 p-12 rounded-full mb-10 shadow-inner relative group transition-all duration-500">
            <div className="transform transition-transform group-hover:scale-110 duration-500 drop-shadow-lg">
              <LogoSerSocial size={160} />
            </div>
          </div>
          <h2 className="text-4xl font-extrabold text-gray-900 mb-4 tracking-tight">SerSocial - Calculadora de Vantagem</h2>
          <p className="text-xl text-gray-600 max-w-2xl mb-12 leading-relaxed">
            A ferramenta estratégica para assistentes sociais decidirem o próximo passo da carreira com base em critérios técnicos e pessoais.
          </p>
          <button 
            onClick={() => setView('FORM')}
            className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-5 px-14 rounded-2xl shadow-xl transform transition hover:-translate-y-1 active:scale-95 text-xl"
          >
            Começar Análise
          </button>
        </div>
      )}

      {view === 'FORM' && (
        <form onSubmit={handleSubmit} className="animate-fade-in space-y-4 pb-16">
          <FormStep 
            stepNumber={1} 
            title="DADOS DO EDITAL (BLOCO A)" 
            icon={<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="3" y1="10" x2="21" y2="10"/></svg>}
          >
            <div className="flex flex-col gap-1">
              <label className="text-xs font-bold text-gray-500 uppercase flex justify-between">
                Salário Bruto <span className="text-emerald-600 normal-case">{formatCurrency(formData.salarioBruto)}</span>
              </label>
              <input type="number" name="salarioBruto" value={formData.salarioBruto || ''} onChange={handleInputChange} required className="w-full border-2 border-gray-200 rounded-xl p-3 focus:border-emerald-500 outline-none transition" />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs font-bold text-gray-500 uppercase flex justify-between">
                Benefícios <span className="text-emerald-600 normal-case">{formatCurrency(formData.beneficiosFixos)}</span>
              </label>
              <input type="number" name="beneficiosFixos" value={formData.beneficiosFixos || ''} onChange={handleInputChange} className="w-full border-2 border-gray-200 rounded-xl p-3 focus:border-emerald-500 outline-none transition" />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs font-bold text-gray-500 uppercase">Carga Horária</label>
              <select name="cargaHoraria" value={formData.cargaHoraria} onChange={handleInputChange} className="border-2 border-gray-200 rounded-xl p-3 bg-white outline-none focus:border-emerald-500 transition">
                <option value="20h">20h Semanais</option>
                <option value="30h">30h Semanais</option>
                <option value="40h">40h Semanais</option>
              </select>
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs font-bold text-gray-500 uppercase">Tipo de Vínculo</label>
              <select name="tipoVinculo" value={formData.tipoVinculo} onChange={handleInputChange} className="border-2 border-gray-200 rounded-xl p-3 bg-white outline-none focus:border-emerald-500 transition">
                <option value="Estatutário">Estatutário</option>
                <option value="CLT">CLT</option>
                <option value="Contrato temporário">Contrato temporário</option>
              </select>
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs font-bold text-gray-500 uppercase">Número de Vagas</label>
              <input type="number" name="numeroVagas" value={formData.numeroVagas} onChange={handleInputChange} className="border-2 border-gray-200 rounded-xl p-3 focus:border-emerald-500 outline-none transition" />
            </div>
            <div className="flex items-center gap-2 pt-6">
              <input type="checkbox" name="cadastroReserva" checked={formData.cadastroReserva} onChange={handleInputChange} id="cr" className="w-5 h-5 accent-emerald-600" />
              <label htmlFor="cr" className="text-sm font-bold text-gray-600 uppercase">Cadastro Reserva?</label>
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs font-bold text-gray-500 uppercase">Dificuldade da Banca</label>
              <select name="dificuldadeBanca" value={formData.dificuldadeBanca} onChange={handleInputChange} className="border-2 border-gray-200 rounded-xl p-3 bg-white outline-none focus:border-emerald-500 transition">
                <option value="Muito fácil">Muito fácil</option>
                <option value="Fácil">Fácil</option>
                <option value="Médio">Médio</option>
                <option value="Difícil">Difícil</option>
                <option value="Muito difícil">Muito difícil (FGV/CESPE)</option>
              </select>
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs font-bold text-gray-500 uppercase">Probabilidade Nomeação</label>
              <select name="probabilidadeNomeacao" value={formData.probabilidadeNomeacao} onChange={handleInputChange} className="border-2 border-gray-200 rounded-xl p-3 bg-white outline-none focus:border-emerald-500 transition">
                <option value="Baixa">Baixa</option>
                <option value="Média">Média</option>
                <option value="Alta">Alta</option>
              </select>
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs font-bold text-gray-500 uppercase">Estrutura de Trabalho</label>
              <select name="estruturaTrabalho" value={formData.estruturaTrabalho} onChange={handleInputChange} className="border-2 border-gray-200 rounded-xl p-3 bg-white outline-none focus:border-emerald-500 transition">
                <option value="Boa">Boa (Órgão estruturado)</option>
                <option value="Regular">Regular</option>
                <option value="Precária">Precária</option>
              </select>
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs font-bold text-gray-500 uppercase">Competitividade</label>
              <select name="competitividade" value={formData.competitividade} onChange={handleInputChange} className="border-2 border-gray-200 rounded-xl p-3 bg-white outline-none focus:border-emerald-500 transition">
                <option value="Baixo">Baixo (Regional)</option>
                <option value="Médio">Médio</option>
                <option value="Alto">Alto (Nacional)</option>
              </select>
            </div>
          </FormStep>

          <FormStep 
            stepNumber={2} 
            title="SEU PERFIL (BLOCO B)" 
            icon={<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>}
          >
            <div className="flex flex-col gap-1">
              <label className="text-xs font-bold text-gray-500 uppercase flex items-center">
                Nível de Preparação <Tooltip text="Avançado: Domina a base e foca em simulados." />
              </label>
              <select name="nivelPreparacao" value={formData.nivelPreparacao} onChange={handleInputChange} className="border-2 border-gray-200 rounded-xl p-3 bg-white outline-none focus:border-emerald-500 transition">
                <option value="Iniciante">Iniciante</option>
                <option value="Intermediário">Intermediário</option>
                <option value="Avançado">Avançado</option>
              </select>
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs font-bold text-gray-500 uppercase flex items-center">
                Tempo Disponível <Tooltip text="Alto: +4h/dia. Médio: 2-4h. Baixo: -2h." />
              </label>
              <select name="tempoDisponivel" value={formData.tempoDisponivel} onChange={handleInputChange} className="border-2 border-gray-200 rounded-xl p-3 bg-white outline-none focus:border-emerald-500 transition">
                <option value="Baixo">Baixo</option>
                <option value="Médio">Médio</option>
                <option value="Alto">Alto</option>
              </select>
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs font-bold text-gray-500 uppercase">Experiência Prévia</label>
              <select name="experienciaPrevia" value={formData.experienciaPrevia} onChange={handleInputChange} className="border-2 border-gray-200 rounded-xl p-3 bg-white outline-none focus:border-emerald-500 transition">
                <option value="Nenhuma">Nenhuma</option>
                <option value="Alguma">Alguma</option>
                <option value="Ampla">Ampla</option>
              </select>
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs font-bold text-gray-500 uppercase">Distância</label>
              <select name="distancia" value={formData.distancia} onChange={handleInputChange} className="border-2 border-gray-200 rounded-xl p-3 bg-white outline-none focus:border-emerald-500 transition">
                <option value="Mesma cidade">Mesma cidade</option>
                <option value="Região próxima">Região próxima</option>
                <option value="Outro estado">Outro estado</option>
              </select>
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs font-bold text-gray-500 uppercase">Interesse na Área</label>
              <select name="interesse" value={formData.interesse} onChange={handleInputChange} className="border-2 border-gray-200 rounded-xl p-3 bg-white outline-none focus:border-emerald-500 transition">
                <option value="Baixo">Baixo</option>
                <option value="Médio">Médio</option>
                <option value="Alto">Alto</option>
              </select>
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs font-bold text-gray-500 uppercase">Familiaridade Banca</label>
              <select name="familiaridadeBanca" value={formData.familiaridadeBanca} onChange={handleInputChange} className="border-2 border-gray-200 rounded-xl p-3 bg-white outline-none focus:border-emerald-500 transition">
                <option value="Nenhuma">Nenhuma</option>
                <option value="Pouca">Pouca</option>
                <option value="Muita">Muita</option>
              </select>
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs font-bold text-gray-500 uppercase">Domínio Conteúdo</label>
              <select name="dominioConteudo" value={formData.dominioConteudo} onChange={handleInputChange} className="border-2 border-gray-200 rounded-xl p-3 bg-white outline-none focus:border-emerald-500 transition">
                <option value="Baixo">Baixo</option>
                <option value="Médio">Médio</option>
                <option value="Alto">Alto</option>
              </select>
            </div>
          </FormStep>

          <FormStep 
            stepNumber={3} 
            title="CONTEXTO PESSOAL (BLOCO C)" 
            icon={<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>}
          >
            <div className="flex flex-col gap-1">
              <label className="text-xs font-bold text-gray-500 uppercase">Situação Atual</label>
              <select name="situacaoAtual" value={formData.situacaoAtual} onChange={handleInputChange} className="border-2 border-gray-200 rounded-xl p-3 bg-white outline-none focus:border-emerald-500 transition">
                <option value="Empregado">Empregado</option>
                <option value="Desempregado">Desempregado</option>
              </select>
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs font-bold text-gray-500 uppercase">Prioridade Financeira</label>
              <select name="prioridadeFinanceira" value={formData.prioridadeFinanceira} onChange={handleInputChange} className="border-2 border-gray-200 rounded-xl p-3 bg-white outline-none focus:border-emerald-500 transition">
                <option value="Baixa">Baixa</option>
                <option value="Média">Média</option>
                <option value="Alta">Alta</option>
              </select>
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs font-bold text-gray-500 uppercase">Tolerância Sobrecarga</label>
              <select name="toleranciaSobrecarga" value={formData.toleranciaSobrecarga} onChange={handleInputChange} className="border-2 border-gray-200 rounded-xl p-3 bg-white outline-none focus:border-emerald-500 transition">
                <option value="Baixa">Baixa</option>
                <option value="Média">Média</option>
                <option value="Alta">Alta</option>
              </select>
            </div>
          </FormStep>

          <div className="flex justify-center py-8">
            <button type="submit" className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-5 px-16 rounded-2xl shadow-xl transform transition hover:-translate-y-1 active:scale-95 text-xl">
              Calcular Vantagem
            </button>
          </div>
        </form>
      )}

      {view === 'LOADING' && (
        <div className="flex flex-col items-center justify-center py-32 text-center animate-fade-in">
          <LogoSerSocial size={180} animate={true} />
          <h3 className="text-3xl font-black text-gray-900 mt-8 mb-4">{loadingText}</h3>
          <div className="w-64 h-2 bg-gray-100 rounded-full mx-auto overflow-hidden">
            <div className="h-full bg-emerald-600 animate-[loading_2.4s_ease-in-out_forwards] origin-left"></div>
          </div>
          <style dangerouslySetInnerHTML={{ __html: `@keyframes loading { 0% { transform: scaleX(0); } 100% { transform: scaleX(1); } }` }} />
        </div>
      )}

      {view === 'RESULT' && result && (
        <div className="animate-fade-in space-y-8 pb-16">
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100">
            <div className={`py-14 text-center text-white ${
              result.classificacao === 'Alta vantagem' ? 'bg-emerald-600' : 
              result.classificacao === 'Vantagem moderada' ? 'bg-amber-500' : 'bg-rose-600'
            }`}>
              <span className="text-sm uppercase tracking-widest font-black opacity-80">Índice SerSocial</span>
              <h3 className="text-9xl font-black mt-4 mb-6 leading-none">{result.ivc}</h3>
              <div className="inline-block bg-black/10 px-8 py-3 rounded-full text-2xl font-black uppercase">
                {result.classificacao}
              </div>
            </div>
            
            <div className="p-10">
              <div className="mb-10 bg-emerald-50 border-l-8 border-emerald-500 p-8 rounded-r-2xl">
                <p className="text-emerald-900 text-lg leading-relaxed italic">"{result.analiseEstrategica}"</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
                  <h5 className="font-black text-emerald-700 mb-4 uppercase text-xs border-b border-emerald-100 pb-2">Fortalezas</h5>
                  <ul className="space-y-2">
                    {result.pontosFortes.map((p, i) => <li key={i} className="text-xs font-bold text-gray-700 flex gap-2">🟢 {p}</li>)}
                  </ul>
                </div>
                <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
                  <h5 className="font-black text-rose-700 mb-4 uppercase text-xs border-b border-rose-100 pb-2">Fragilidades</h5>
                  <ul className="space-y-2">
                    {result.pontosNegativos.map((p, i) => <li key={i} className="text-xs font-bold text-gray-700 flex gap-2">🔴 {p}</li>)}
                  </ul>
                </div>
                <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
                  <h5 className="font-black text-amber-700 mb-4 uppercase text-xs border-b border-amber-100 pb-2">Atenção</h5>
                  <ul className="space-y-2">
                    {result.pontosAtencao.map((p, i) => <li key={i} className="text-xs font-bold text-gray-700 flex gap-2">🟡 {p}</li>)}
                  </ul>
                </div>
              </div>

              <div className="mt-12 flex flex-col md:flex-row gap-4 justify-center">
                <button onClick={reset} className="px-10 py-5 bg-emerald-600 hover:bg-emerald-700 text-white font-black rounded-2xl shadow-xl transition transform hover:-translate-y-1">Nova Análise</button>
                <button onClick={() => setView('FORM')} className="px-10 py-5 bg-white border-2 border-gray-200 text-gray-600 font-black rounded-2xl hover:border-emerald-600 transition">Ajustar Dados</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default App;
