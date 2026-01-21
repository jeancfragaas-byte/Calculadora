
import { FormData, CalculationResult } from '../types';
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
} from '../constants';

export function calculateIVC(data: FormData): CalculationResult {
  // --- BLOCO A: DADOS DO CONCURSO (Peso total: 60 pontos) ---
  let a1 = 0;
  const cargaNum = parseInt(data.cargaHoraria);
  const remuneracaoTotal = data.salarioBruto + (data.beneficiosFixos || 0);
  const proporcional = remuneracaoTotal / cargaNum;

  // Pontuação baseada na remuneração por hora (proporcionalidade)
  if (proporcional < 80) a1 = 4;
  else if (proporcional < 120) a1 = 8;
  else if (proporcional < 160) a1 = 12;
  else if (proporcional < 220) a1 = 16;
  else a1 = 20;

  // Penalidade para carga horária pesada com salário baixo
  if (a1 <= 8 && cargaNum === 40) a1 -= 4;

  const a2 = VINCOLO_SCORES[data.tipoVinculo];
  
  let a3_base = 0;
  if (data.numeroVagas > 10) a3_base = 8;
  else if (data.numeroVagas >= 3) a3_base = 5;
  else a3_base = 2;
  let a3_final = Math.min(10, a3_base + (data.cadastroReserva ? 2 : 0));

  const a4 = BANCA_SCORES[data.dificuldadeBanca];
  const a5 = PROBABILIDADE_SCORES[data.probabilidadeNomeacao];
  const a6 = ESTRUTURA_SCORES[data.estruturaTrabalho];
  const a7 = COMPETITIVIDADE_SCORES[data.competitividade];

  const scoreA = a1 + a2 + a3_final + a4 + a5 + a6 + a7;

  // --- BLOCO B: PERFIL DO CANDIDATO (Peso total: 50 pontos) ---
  const b1 = PREPARACAO_TEMPO_MATRIX[data.nivelPreparacao][data.tempoDisponivel];
  const b2 = EXPERIENCIA_SCORES[data.experienciaPrevia];
  const b3 = INTERESSE_SCORES[data.interesse];
  const b4 = DISTANCIA_SCORES[data.distancia];
  const b5 = FAMILIARIDADE_SCORES[data.familiaridadeBanca];
  const b6 = DOMINIO_SCORES[data.dominioConteudo];

  const scoreB = b1 + b2 + b3 + b4 + b5 + b6;

  // --- BLOCO C: CONTEXTO PESSOAL (Ajuste até +10 / -5) ---
  const c1 = SITUACAO_SCORES[data.situacaoAtual];
  const c2 = FINANCEIRA_SCORES[data.prioridadeFinanceira];
  const c3_penalidade = SOBRECARGA_PENALTY[data.toleranciaSobrecarga];
  const scoreC = Math.max(-5, Math.min(10, c1 + c2 - c3_penalidade));

  // --- CÁLCULO FINAL ---
  const ivc = Math.max(0, Math.min(100, Math.round(scoreA + scoreB + scoreC)));

  let classificacao: CalculationResult['classificacao'] = 'Vantagem moderada';
  if (ivc <= 39) classificacao = 'Baixa vantagem';
  else if (ivc >= 70) classificacao = 'Alta vantagem';

  const alerts: string[] = [];
  if (scoreA < 32) alerts.push('Alerta Estrutural: As variáveis do concurso sugerem alto desafio objetivo.');
  if (scoreB < 25) alerts.push('Alerta de Perfil: Baixa aderência do edital ao seu momento de preparo.');
  if (scoreC < 0) alerts.push('Alerta de Sustentabilidade: Risco de burnout ou desequilíbrio pessoal.');

  // --- PONTOS DETALHADOS ---
  const pontosFortes: string[] = [];
  const pontosNegativos: string[] = [];
  const pontosAtencao: string[] = [];

  // PONTOS FORTES
  if (a1 >= 16) pontosFortes.push('Remuneração competitiva por hora trabalhada.');
  if (data.tipoVinculo === 'Estatutário') pontosFortes.push('Garantia de estabilidade e plano de carreira próprio.');
  if (data.probabilidadeNomeacao === 'Alta') pontosFortes.push('Alta perspectiva de convocação rápida.');
  if (data.dominioConteudo === 'Alto') pontosFortes.push('Excelente domínio dos temas previstos no edital.');
  if (data.interesse === 'Alto') pontosFortes.push('Alta afinidade com a área de atuação do cargo.');
  if (data.distancia === 'Mesma cidade') pontosFortes.push('Conforto logístico e economia com deslocamento.');

  // PONTOS NEGATIVOS (Incluindo novos elementos)
  if (a1 <= 4) pontosNegativos.push('Retorno financeiro desproporcional à complexidade do cargo.');
  if (data.tipoVinculo === 'Contrato temporário') pontosNegativos.push('Vínculo precário e sem garantia de continuidade.');
  if (data.estruturaTrabalho === 'Precária') pontosNegativos.push('Risco de precarização das condições ético-técnicas de trabalho.');
  if (data.competitividade === 'Alto') pontosNegativos.push('Concorrência estimada muito elevada (concurso de massa).');
  if (data.distancia === 'Outro estado' && data.prioridadeFinanceira === 'Alta') pontosNegativos.push('Alto custo de mudança incompatível com urgência financeira.');
  if (data.cargaHoraria === '40h' && data.toleranciaSobrecarga === 'Baixa') pontosNegativos.push('Jornada de 40h representa risco alto de esgotamento emocional.');
  if (data.interesse === 'Baixo') pontosNegativos.push('Baixo interesse na área pode gerar rápida desmotivação profissional.');
  if (data.nivelPreparacao === 'Iniciante' && data.dificuldadeBanca === 'Muito difícil') pontosNegativos.push('Grande distância entre nível de preparo e exigência da banca.');
  if (data.salarioBruto < 3500 && data.cargaHoraria === '40h') pontosNegativos.push('Remuneração base abaixo do piso sugerido pela categoria para 40h.');

  // PONTOS DE ATENÇÃO (Incluindo novos elementos)
  if (data.cadastroReserva && data.numeroVagas <= 1) pontosAtencao.push('Edital focado em Cadastro Reserva: risco de demora na nomeação.');
  if (data.dificuldadeBanca === 'Muito difícil') pontosAtencao.push('Banca examinadora com histórico de alto rigor técnico (ex: FGV/Cebraspe).');
  if (data.distancia === 'Região próxima') pontosAtencao.push('Necessidade de planejamento de deslocamento diário (transporte/custo).');
  if (data.tempoDisponivel === 'Baixo') pontosAtencao.push('Tempo reduzido de estudo exige foco extremo em temas prioritários.');
  if (data.experienciaPrevia === 'Nenhuma') pontosAtencao.push('Falta de experiência prática na área específica pode dificultar a prova de títulos ou a atuação.');
  if (data.familiaridadeBanca === 'Nenhuma') pontosAtencao.push('Desconhecimento do perfil da banca examinadora: resolva provas anteriores.');
  if (data.cargaHoraria === '30h' && a1 < 12) pontosAtencao.push('Jornada de 30h é positiva, mas o salário proporcional é um ponto de alerta.');
  if (data.probabilidadeNomeacao === 'Baixa') pontosAtencao.push('Órgão com histórico de convocar apenas o número exato de vagas.');
  if (data.competitividade === 'Médio' && data.numeroVagas < 3) pontosAtencao.push('Poucas vagas em um cenário de concorrência moderada exigem nota de corte alta.');

  // Fallbacks para garantir que as listas nunca fiquem vazias
  if (pontosNegativos.length === 0) pontosNegativos.push('Não foram identificados impedimentos críticos imediatos.');
  if (pontosAtencao.length === 0) pontosAtencao.push('Monitore o histórico de convocações do órgão para ajustar expectativas.');

  let analiseEstrategica = '';
  if (ivc >= 70) {
    analiseEstrategica = 'Análise altamente positiva. O cenário é fértil e seu perfil está alinhado. É o momento de investir seus melhores recursos.';
  } else if (ivc >= 40) {
    analiseEstrategica = 'Análise de vantagem moderada. O concurso é viável, mas requer uma gestão de expectativas e foco nos pontos de atenção.';
  } else {
    analiseEstrategica = 'Análise de baixa vantagem. Avalie se o investimento emocional e financeiro não seria melhor aplicado em outro edital mais aderente.';
  }

  return { scoreA, scoreB, scoreC, ivc, classificacao, alerts, pontosFortes, pontosNegativos, pontosAtencao, analiseEstrategica };
}
