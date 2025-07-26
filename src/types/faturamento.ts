export interface GTOData {
  id: string;
  data: string;
  numeroGuia: string;
  beneficiario: string;
  carteirinha: string;
  valor: number;
  status: GTOStatus;
  procedimentos: Procedimento[];
}

export interface Procedimento {
  id: string;
  nome: string;
  codigo: string;
  valor: number;
  status: PaymentStatus;
  dataExecucao?: string;
  observacoes?: string;
  documentos?: string[];
  motivoGlosa?: string;
  historico?: HistoricoEvento[];
}

export interface HistoricoEvento {
  id: string;
  data: string;
  tipo: 'solicitacao' | 'analise' | 'glosa' | 'recurso' | 'pagamento';
  descricao: string;
  status: string;
  motivo?: string;
}

export type PaymentStatus = 
  | "aguardando_pagamento"
  | "pagamento_realizado"
  | "glosado"
  | "auditado"
  | "recursado_1x"
  | "recursado_2x"
  | "prazo_expirado"
  | "cancelado"
  | "aguardando_analise_pagamento";

export type GTOStatus = 
  | "paga_totalmente"
  | "parcialmente_paga"
  | "glosada"
  | "em_analise"
  | "autorizada"
  | "aguardando_pagamento";

export interface PagamentoAgendado {
  id: string;
  gto: string;
  beneficiario: string;
  valor: number;
  dataVencimento: string;
  status: "pendente" | "vencido" | "pago" | "agendado";
  diasRestantes: number;
}

export interface DespesaDedutivel {
  id: string;
  categoria: string;
  valor: number;
  descricao: string;
  data: string;
}

export interface MetricaFiscal {
  receitaBruta: number;
  despesasDedutivas: number;
  lucroTributavel: number;
  impostoEstimado: number;
}

export type ViewState = 
  | 'list' 
  | 'gto-details' 
  | 'procedure-details' 
  | 'procedure-details-expired' 
  | 'glosa-recurso';