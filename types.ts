export type CargaHoraria = '20h' | '30h' | '40h';
export type TipoVinculo = 'Estatutário' | 'CLT' | 'Contrato temporário';
export type DificuldadeBanca = 'Muito fácil' | 'Fácil' | 'Médio' | 'Difícil' | 'Muito difícil';
export type NivelPreparacao = 'Iniciante' | 'Intermediário' | 'Avançado';
export type TempoDisponivel = 'Baixo' | 'Médio' | 'Alto';
export type ExperienciaPrevia = 'Nenhuma' | 'Alguma' | 'Ampla';
export type Distancia = 'Mesma cidade' | 'Região próxima' | 'Outro estado';
export type Interesse = 'Baixo' | 'Médio' | 'Alto';
export type SituacaoAtual = 'Empregado' | 'Desempregado';
export type PrioridadeFinanceira = 'Baixa' | 'Média' | 'Alta';
export type ToleranciaSobrecarga = 'Baixa' | 'Média' | 'Alta';
export type ProbabilidadeNomeacao = 'Baixa' | 'Média' | 'Alta';
export type EstruturaTrabalho = 'Boa' | 'Regular' | 'Precária';
export type FamiliaridadeBanca = 'Nenhuma' | 'Pouca' | 'Muita';
export type DominioConteudo = 'Baixo' | 'Médio' | 'Alto';
export type Competitividade = 'Baixo' | 'Médio' | 'Alto';

export interface FormData {
  // Bloco A
  salarioBruto: number;
  beneficiosFixos: number;
  cargaHoraria: CargaHoraria;
  tipoVinculo: TipoVinculo;
  numeroVagas: number;
  cadastroReserva: boolean;
  dificuldadeBanca: DificuldadeBanca;
  probabilidadeNomeacao: ProbabilidadeNomeacao;
  estruturaTrabalho: EstruturaTrabalho;
  competitividade: Competitividade; // Novo campo
  // Bloco B
  nivelPreparacao: NivelPreparacao;
  tempoDisponivel: TempoDisponivel;
  experienciaPrevia: ExperienciaPrevia;
  distancia: Distancia;
  interesse: Interesse;
  familiaridadeBanca: FamiliaridadeBanca;
  dominioConteudo: DominioConteudo;
  // Bloco C
  situacaoAtual: SituacaoAtual;
  prioridadeFinanceira: PrioridadeFinanceira;
  toleranciaSobrecarga: ToleranciaSobrecarga;
}

export interface CalculationResult {
  scoreA: number;
  scoreB: number;
  scoreC: number;
  ivc: number;
  classificacao: 'Baixa vantagem' | 'Vantagem moderada' | 'Alta vantagem';
  alerts: string[];
  pontosFortes: string[];
  pontosNegativos: string[];
  pontosAtencao: string[];
  analiseEstrategica: string;
}