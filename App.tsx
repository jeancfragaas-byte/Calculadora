
import React, { useState, useMemo, useEffect } from 'react';
import { 
  FormData, 
  CalculationResult
} from './types';
import { calculateIVC } from './logic/calculator';
import Layout from './components/Layout';
import FormStep from './components/FormStep';
import { 
  VINCOLO_SCORES, 
  BANCA_SCORES, 
  PROBABILIDADE_SCORES, 
  ESTRUTURA_SCORES, 
  COMPETITIVIDADE_SCORES,
  FAMILIARIDADE_SCORES,
  DOMINIO_SCORES,
  PREPARACAO_TEMPO_MATRIX,
  EXPERIENCIA_SCORES,
  INTERESSE_SCORES,
  DISTANCIA_SCORES,
  SITUACAO_SCORES,
  FINANCEIRA_SCORES,
  SOBRECARGA_PENALTY
} from './constants';

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

const App: React.FC = () => {
  const [view, setView] = useState<ViewState>('HOME');
  const [formData, setFormData] = useState<FormData>(INITIAL_FORM_DATA);
  const [result, setResult] = useState<CalculationResult | null>(null);
  const [loadingText, setLoadingText] = useState('Analisando dados do concurso...');

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  };

  const valorHora = useMemo(() => {
    const horas = parseInt(formData.cargaHoraria);
    const totalRemuneracao = (formData.salarioBruto || 0) + (formData.beneficiosFixos || 0);
    if (!totalRemuneracao || !horas) return 0;
    return totalRemuneracao / (horas * 4.33); 
  }, [formData.salarioBruto, formData.beneficiosFixos, formData.cargaHoraria]);

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

    // Sequence of loading messages for better feedback
    const sequence = [
      { time: 0, text: 'Cruzando dados do edital...' },
      { time: 600, text: 'Avaliando perfil profissional...' },
      { time: 1200, text: 'Calculando Índice de Vantagem...' },
      { time: 1800, text: 'Finalizando análise estratégica...' }
    ];

    sequence.forEach(step => {
      setTimeout(() => setLoadingText(step.text), step.time);
    });

    // Final result calculation after subtle delay
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
          <h2 className="text-4xl font-extrabold text-gray-900 mb-4 tracking-tight">SerSocial App - Calculadora de Vantagem</h2>
          <p className="text-xl text-gray-600 max-w-2xl mb-12 leading-relaxed font-medium">
            Equilibre suas expectativas e tome decisões estratégicas baseadas no real retorno de cada edital para sua carreira.
          </p>
          <button 
            onClick={() => setView('FORM')}
            className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-5 px-14 rounded-2xl shadow-xl transform transition hover:-translate-y-1 active:scale-95 text-xl mb-12"
          >
            Iniciar Análise
          </button>
          
          <div className="bg-blue-50 border border-blue-100 p-6 rounded-2xl max-w-2xl">
            <p className="text-blue-800 text-sm leading-relaxed italic">
              <strong>Importante lembrar:</strong> Cada trajetória é única. O resultado apresentado é apenas uma sugestão estratégica, não uma obrigação. Confie também na sua experiência, intuição e momento de vida.
            </p>
          </div>
        </div>
      )}

      {view === 'FORM' && (
        <form onSubmit={handleSubmit} className="animate-fade-in space-y-2 pb-10">
          <FormStep 
            stepNumber={1} 
            title="BLOCO A – DADOS DO CONCURSO" 
            icon={<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>}
          >
            <div className="flex flex-col gap-1">
              <label className="text-xs font-bold text-gray-500 uppercase flex justify-between items-center">
                <span>Salário Bruto (R$)</span>
                <span className="text-emerald-600 normal-case">{formatCurrency(formData.salarioBruto)}</span>
              </label>
              <input type="number" name="salarioBruto" value={formData.salarioBruto || ''} onChange={handleInputChange} required className="w-full border-2 border-gray-200 rounded-xl p-3 focus:border-emerald-500 outline-none transition" placeholder="0,00" />
            </div>
            
            <div className="flex flex-col gap-1">
              <label className="text-xs font-bold text-gray-500 uppercase flex justify-between items-center">
                <span>Benefícios Fixos (Opcional)</span>
                <span className="text-emerald-600 normal-case">{formatCurrency(formData.beneficiosFixos)}</span>
              </label>
              <div className="relative">
                <input type="number" name="beneficiosFixos" value={formData.beneficiosFixos || ''} onChange={handleInputChange} className="w-full border-2 border-gray-200 rounded-xl p-3 focus:border-emerald-500 outline-none transition" placeholder="Ex: 800,00" />
                {valorHora > 0 && (
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] font-bold bg-emerald-100 text-emerald-700 px-2 py-1 rounded">
                    ~ {formatCurrency(valorHora)}/h
                  </span>
                )}
              </div>
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
              <label className="text-xs font-bold text-gray-500 uppercase">Dificuldade da Banca</label>
              <select name="dificuldadeBanca" value={formData.dificuldadeBanca} onChange={handleInputChange} className="border-2 border-gray-200 rounded-xl p-3 bg-white outline-none focus:border-emerald-500 transition">
                <option value="Muito fácil">Muito fácil</option>
                <option value="Fácil">Fácil</option>
                <option value="Médio">Médio</option>
                <option value="Difícil">Difícil</option>
                <option value="Muito difícil">Muito difícil</option>
              </select>
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-xs font-bold text-gray-500 uppercase">Probabilidade de nomeação</label>
              <select name="probabilidadeNomeacao" value={formData.probabilidadeNomeacao} onChange={handleInputChange} className="border-2 border-gray-200 rounded-xl p-3 bg-white outline-none focus:border-emerald-500 transition">
                <option value="Baixa">Baixa</option>
                <option value="Média">Média</option>
                <option value="Alta">Alta</option>
              </select>
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-xs font-bold text-gray-500 uppercase">Estrutura de trabalho</label>
              <select name="estruturaTrabalho" value={formData.estruturaTrabalho} onChange={handleInputChange} className="border-2 border-gray-200 rounded-xl p-3 bg-white outline-none focus:border-emerald-500 transition">
                <option value="Boa">Boa</option>
                <option value="Regular">Regular</option>
                <option value="Precária">Precária</option>
              </select>
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-xs font-bold text-gray-500 uppercase">Competitividade</label>
              <select name="competitividade" value={formData.competitividade} onChange={handleInputChange} className="border-2 border-gray-200 rounded-xl p-3 bg-white outline-none focus:border-emerald-500 transition">
                <option value="Baixo">Baixa</option>
                <option value="Médio">Média</option>
                <option value="Alto">Alta</option>
              </select>
            </div>

            <div className="flex flex-col gap-1 md:col-span-2">
              <label className="text-xs font-bold text-gray-500 uppercase">Vagas e Cadastro Reserva</label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input type="number" name="numeroVagas" value={formData.numeroVagas} onChange={handleInputChange} required className="border-2 border-gray-200 rounded-xl p-3 outline-none focus:border-emerald-500 transition" placeholder="Nº de Vagas" />
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl border border-gray-200 h-[52px]">
                  <input type="checkbox" id="cadastroReserva" name="cadastroReserva" checked={formData.cadastroReserva} onChange={handleInputChange} className="w-5 h-5 accent-emerald-600 cursor-pointer" />
                  <label htmlFor="cadastroReserva" className="text-sm font-bold text-gray-700 cursor-pointer">Formação de CR?</label>
                </div>
              </div>
            </div>
          </FormStep>

          <FormStep 
            stepNumber={2} 
            title="BLOCO B – SEU PERFIL" 
            icon={<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>}
          >
            <div className="flex flex-col gap-1 md:col-span-2">
              <label className="text-xs font-bold text-gray-500 uppercase">Preparo e Tempo Disponível</label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <select name="nivelPreparacao" value={formData.nivelPreparacao} onChange={handleInputChange} className="border-2 border-gray-200 rounded-xl p-3 outline-none focus:border-emerald-500 transition">
                  <option value="Iniciante">Iniciante</option>
                  <option value="Intermediário">Intermediário</option>
                  <option value="Avançado">Avançado</option>
                </select>
                <select name="tempoDisponivel" value={formData.tempoDisponivel} onChange={handleInputChange} className="border-2 border-gray-200 rounded-xl p-3 outline-none focus:border-emerald-500 transition">
                  <option value="Baixo">Tempo Disponível: Baixo</option>
                  <option value="Médio">Tempo Disponível: Médio</option>
                  <option value="Alto">Tempo Disponível: Alto</option>
                </select>
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-xs font-bold text-gray-500 uppercase">Domínio do Conteúdo</label>
              <select name="dominioConteudo" value={formData.dominioConteudo} onChange={handleInputChange} className="border-2 border-gray-200 rounded-xl p-3 outline-none focus:border-emerald-500 transition">
                <option value="Baixo">Baixo</option>
                <option value="Médio">Médio</option>
                <option value="Alto">Alto</option>
              </select>
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-xs font-bold text-gray-500 uppercase">Distância geográfica</label>
              <select name="distancia" value={formData.distancia} onChange={handleInputChange} className="border-2 border-gray-200 rounded-xl p-3 outline-none focus:border-emerald-500 transition">
                <option value="Mesma cidade">Mesma cidade</option>
                <option value="Região próxima">Cidade vizinha</option>
                <option value="Outro estado">Outro estado</option>
              </select>
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-xs font-bold text-gray-500 uppercase">Interesse no cargo</label>
              <select name="interesse" value={formData.interesse} onChange={handleInputChange} className="border-2 border-gray-200 rounded-xl p-3 outline-none focus:border-emerald-500 transition">
                <option value="Baixo">Baixo</option>
                <option value="Médio">Médio</option>
                <option value="Alto">Alto</option>
              </select>
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-xs font-bold text-gray-500 uppercase">Familiaridade com a Banca</label>
              <select name="familiaridadeBanca" value={formData.familiaridadeBanca} onChange={handleInputChange} className="border-2 border-gray-200 rounded-xl p-3 outline-none focus:border-emerald-500 transition">
                <option value="Nenhuma">Nenhuma</option>
                <option value="Pouca">Pouca</option>
                <option value="Muita">Muita</option>
              </select>
            </div>
          </FormStep>

          <FormStep 
            stepNumber={3} 
            title="BLOCO C – CONTEXTO PESSOAL" 
            icon={<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>}
          >
            <div className="flex flex-col gap-1">
              <label className="text-xs font-bold text-gray-500 uppercase">Situação ocupacional</label>
              <select name="situacaoAtual" value={formData.situacaoAtual} onChange={handleInputChange} className="border-2 border-gray-200 rounded-xl p-3 outline-none focus:border-emerald-500 transition">
                <option value="Empregado">Empregado</option>
                <option value="Desempregado">Desempregado</option>
              </select>
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-xs font-bold text-gray-500 uppercase">Prioridade financeira</label>
              <select name="prioridadeFinanceira" value={formData.prioridadeFinanceira} onChange={handleInputChange} className="border-2 border-gray-200 rounded-xl p-3 outline-none focus:border-emerald-500 transition">
                <option value="Baixa">Baixa</option>
                <option value="Média">Média</option>
                <option value="Alta">Alta</option>
              </select>
            </div>

            <div className="flex flex-col gap-1 md:col-span-2">
              <label className="text-xs font-bold text-gray-500 uppercase">Tolerância à sobrecarga</label>
              <select name="toleranciaSobrecarga" value={formData.toleranciaSobrecarga} onChange={handleInputChange} className="border-2 border-gray-200 rounded-xl p-3 outline-none focus:border-emerald-500 transition">
                <option value="Baixa">Baixa</option>
                <option value="Média">Média</option>
                <option value="Alta">Alta</option>
              </select>
            </div>
          </FormStep>

          <div className="flex justify-center py-10">
            <button type="submit" className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-5 px-20 rounded-2xl shadow-2xl transition transform hover:-translate-y-1 active:scale-95 text-2xl flex items-center gap-3">
              Analisar Concurso
            </button>
          </div>
        </form>
      )}

      {view === 'LOADING' && (
        <div className="flex flex-col items-center justify-center py-32 text-center animate-fade-in">
          <div className="mb-12 relative">
             <div className="absolute inset-0 bg-emerald-500/20 blur-3xl rounded-full scale-150 animate-pulse"></div>
             <div className="relative transform hover:scale-105 transition duration-700">
               <LogoSerSocial size={180} animate={true} />
             </div>
          </div>
          <div className="space-y-4">
            <h3 className="text-3xl font-black text-gray-900 animate-bounce">
              {loadingText}
            </h3>
            <p className="text-gray-500 font-medium">Isso levará apenas um momento...</p>
          </div>
          <div className="mt-12 w-64 h-2 bg-gray-100 rounded-full overflow-hidden border border-gray-200">
            <div className="h-full bg-emerald-600 animate-[loading_2.4s_ease-in-out_infinite] origin-left"></div>
          </div>
          <style dangerouslySetInnerHTML={{ __html: `
            @keyframes loading {
              0% { transform: scaleX(0); }
              50% { transform: scaleX(0.7); }
              100% { transform: scaleX(1); }
            }
          `}} />
        </div>
      )}

      {view === 'RESULT' && result && (
        <div className="animate-fade-in space-y-8 pb-16">
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100">
            <div className={`py-14 text-center text-white ${
              result.classificacao === 'Alta vantagem' ? 'bg-emerald-600' : 
              result.classificacao === 'Vantagem moderada' ? 'bg-amber-500' : 'bg-rose-600'
            }`}>
              <span className="text-sm uppercase tracking-[0.3em] font-black opacity-75">Índice de Vantagem do Concurso</span>
              <h3 className="text-9xl font-black mt-4 mb-6 leading-none">{result.ivc}</h3>
              <div className="inline-flex items-center gap-3 bg-black/15 px-8 py-3 rounded-full text-2xl font-black uppercase tracking-widest border border-white/20">
                {result.classificacao}
              </div>
            </div>
            
            <div className="p-10">
              <div className="grid grid-cols-3 gap-6 mb-10 text-center bg-gray-50 rounded-2xl p-6 border border-gray-100">
                <div className="flex flex-col border-r border-gray-200">
                  <span className="text-[10px] text-gray-400 uppercase font-black tracking-widest mb-1">Bloco A</span>
                  <span className="text-3xl font-black text-gray-800">{result.scoreA}<span className="text-lg text-gray-300 font-normal">/60</span></span>
                </div>
                <div className="flex flex-col border-r border-gray-200">
                  <span className="text-[10px] text-gray-400 uppercase font-black tracking-widest mb-1">Bloco B</span>
                  <span className="text-3xl font-black text-gray-800">{result.scoreB}<span className="text-lg text-gray-300 font-normal">/50</span></span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] text-gray-400 uppercase font-black tracking-widest mb-1">Ajuste C</span>
                  <span className={`text-3xl font-black ${result.scoreC < 0 ? 'text-rose-500' : result.scoreC > 0 ? 'text-emerald-500' : 'text-gray-400'}`}>
                    {result.scoreC > 0 ? `+${result.scoreC}` : result.scoreC}
                  </span>
                </div>
              </div>

              <div className="mb-10">
                <h4 className="text-2xl font-black text-gray-900 mb-4 flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-emerald-600"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
                  Análise Estratégica
                </h4>
                <div className="bg-emerald-50 border-l-8 border-emerald-500 p-6 rounded-r-2xl">
                  <p className="text-emerald-900 text-lg font-medium leading-relaxed">
                    "{result.analiseEstrategica}"
                  </p>
                </div>
              </div>

              {result.alerts.length > 0 && (
                <div className="space-y-4 mb-10">
                  {result.alerts.map((alert, i) => (
                    <div key={i} className="flex items-center gap-5 bg-rose-50 border-2 border-rose-100 p-6 rounded-2xl shadow-sm">
                      <div className="bg-rose-500 text-white p-2 rounded-lg shadow-lg">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
                      </div>
                      <p className="font-black text-rose-800 text-sm md:text-base">{alert}</p>
                    </div>
                  ))}
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
                <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100 flex flex-col h-full shadow-inner">
                  <h5 className="font-black text-emerald-700 mb-5 uppercase text-[10px] tracking-[0.2em] flex items-center gap-2 border-b border-emerald-100 pb-2">
                    Pontos Fortes
                  </h5>
                  <ul className="space-y-4 flex-grow">
                    {result.pontosFortes.map((p, i) => (
                      <li key={i} className="text-xs font-bold text-gray-700 flex items-start gap-3"><span className="w-1.5 h-1.5 bg-emerald-500 rounded-full mt-1.5 shrink-0"></span> {p}</li>
                    ))}
                  </ul>
                </div>

                <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100 flex flex-col h-full shadow-inner">
                  <h5 className="font-black text-rose-700 mb-5 uppercase text-[10px] tracking-[0.2em] flex items-center gap-2 border-b border-rose-100 pb-2">
                    Pontos Negativos
                  </h5>
                  <ul className="space-y-4 flex-grow">
                    {result.pontosNegativos.map((p, i) => (
                      <li key={i} className="text-xs font-bold text-gray-700 flex items-start gap-3"><span className="w-1.5 h-1.5 bg-rose-500 rounded-full mt-1.5 shrink-0"></span> {p}</li>
                    ))}
                  </ul>
                </div>

                <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100 flex flex-col h-full shadow-inner">
                  <h5 className="font-black text-amber-700 mb-5 uppercase text-[10px] tracking-[0.2em] flex items-center gap-2 border-b border-amber-100 pb-2">
                    Pontos de Atenção
                  </h5>
                  <ul className="space-y-4 flex-grow">
                    {result.pontosAtencao.map((p, i) => (
                      <li key={i} className="text-xs font-bold text-gray-700 flex items-start gap-3"><span className="w-1.5 h-1.5 bg-amber-500 rounded-full mt-1.5 shrink-0"></span> {p}</li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Aviso Importante de Resultado */}
              <div className="bg-amber-50 border border-amber-200 p-6 rounded-2xl shadow-sm">
                <h5 className="text-amber-800 font-bold text-sm mb-2 uppercase tracking-wide">Aviso importante:</h5>
                <p className="text-amber-900 text-sm leading-relaxed">
                  Este resultado é apenas uma ferramenta de apoio à decisão. Ele não determina se você deve ou não se inscrever no concurso. A escolha final é sempre sua, considerando sua realidade, prioridades e contexto pessoal.
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-6 justify-center pt-6">
            <button onClick={() => setView('FORM')} className="px-12 py-5 bg-white border-2 border-gray-200 text-gray-600 hover:border-emerald-600 hover:text-emerald-700 font-black rounded-2xl transition shadow-sm hover:shadow-md">Revisar Análise</button>
            <button onClick={reset} className="px-12 py-5 bg-emerald-600 hover:bg-emerald-700 text-white font-black rounded-2xl shadow-xl transition transform hover:-translate-y-1 active:scale-95">Nova Consulta</button>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default App;
