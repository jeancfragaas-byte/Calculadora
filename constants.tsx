import { 
  TipoVinculo, 
  DificuldadeBanca, 
  NivelPreparacao, 
  TempoDisponivel, 
  ExperienciaPrevia, 
  Distancia, 
  Interesse,
  SituacaoAtual,
  PrioridadeFinanceira,
  ToleranciaSobrecarga,
  ProbabilidadeNomeacao,
  EstruturaTrabalho,
  FamiliaridadeBanca,
  DominioConteudo,
  Competitividade
} from './types';

export const VINCOLO_SCORES: Record<TipoVinculo, number> = {
  'Estatutário': 10,
  'CLT': 6,
  'Contrato temporário': 3
};

export const BANCA_SCORES: Record<DificuldadeBanca, number> = {
  'Muito fácil': 5,
  'Fácil': 4,
  'Médio': 3,
  'Difícil': 2,
  'Muito difícil': 1
};

export const PROBABILIDADE_SCORES: Record<ProbabilidadeNomeacao, number> = {
  'Alta': 5,
  'Média': 3,
  'Baixa': 1
};

export const ESTRUTURA_SCORES: Record<EstruturaTrabalho, number> = {
  'Boa': 5,
  'Regular': 3,
  'Precária': 1
};

export const COMPETITIVIDADE_SCORES: Record<Competitividade, number> = {
  'Baixo': 5,
  'Médio': 3,
  'Alto': 1
};

export const FAMILIARIDADE_SCORES: Record<FamiliaridadeBanca, number> = {
  'Muita': 5,
  'Pouca': 3,
  'Nenhuma': 1
};

export const DOMINIO_SCORES: Record<DominioConteudo, number> = {
  'Alto': 5,
  'Médio': 3,
  'Baixo': 1
};

export const PREPARACAO_TEMPO_MATRIX: Record<NivelPreparacao, Record<TempoDisponivel, number>> = {
  'Avançado': { 'Alto': 15, 'Médio': 12, 'Baixo': 4 },
  'Intermediário': { 'Alto': 12, 'Médio': 9, 'Baixo': 4 },
  'Iniciante': { 'Alto': 8, 'Médio': 6, 'Baixo': 4 }
};

export const EXPERIENCIA_SCORES: Record<ExperienciaPrevia, number> = {
  'Ampla': 10,
  'Alguma': 6,
  'Nenhuma': 3
};

export const INTERESSE_SCORES: Record<Interesse, number> = {
  'Alto': 10,
  'Médio': 6,
  'Baixo': 3
};

export const DISTANCIA_SCORES: Record<Distancia, number> = {
  'Mesma cidade': 5,
  'Região próxima': 3,
  'Outro estado': 1
};

export const SITUACAO_SCORES: Record<SituacaoAtual, number> = {
  'Desempregado': 5,
  'Empregado': 2
};

export const FINANCEIRA_SCORES: Record<PrioridadeFinanceira, number> = {
  'Alta': 5,
  'Média': 3,
  'Baixa': 1
};

export const SOBRECARGA_PENALTY: Record<ToleranciaSobrecarga, number> = {
  'Alta': 0,
  'Média': 3,
  'Baixa': 6
};