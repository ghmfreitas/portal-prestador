export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      usuarios: {
        Row: {
          id: string
          codigo_identificacao: string
          cpf_cnpj: string
          email: string
          nome: string
          senha_hash: string
          tipo: 'prestador'
          ativo: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          codigo_identificacao: string
          cpf_cnpj: string
          email: string
          nome: string
          senha_hash: string
          tipo?: 'prestador' | 'admin'
          ativo?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          codigo_identificacao?: string
          cpf_cnpj?: string
          email?: string
          nome?: string
          senha_hash?: string
          tipo?: 'prestador' | 'admin'
          ativo?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      recuperacao_senha: {
        Row: {
          id: string
          usuario_id: string
          token: string
          expires_at: string
          used: boolean
          created_at: string
        }
        Insert: {
          id?: string
          usuario_id: string
          token: string
          expires_at: string
          used?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          usuario_id?: string
          token?: string
          expires_at?: string
          used?: boolean
          created_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
  odonto: {
    Tables: {
      procedimentos: {
        Row: {
          id: number
          codigo_tuss: string
          descricao: string
          especialidade_id: number
          ativo: boolean
          requer_pre_aprovacao: boolean
          requer_dente: boolean
          requer_face: boolean
          requer_regiao: boolean
          requer_rx_inicial: boolean
          requer_rx_final: boolean
          nivel_complexidade_id: number | null
          prazo_longevidade_meses: number | null
          idade_minima: number | null
          idade_maxima: number | null
          created_at: string
          updated_at: string
        }
      }
      especialidades: {
        Row: {
          id: number
          codigo: string
          descricao: string
          extra_rol: boolean
          ativa: boolean
          created_at: string
          updated_at: string
        }
      }
      niveis_complexidade: {
        Row: {
          id: number
          nivel: number
          descricao: string
          cor_hex: string
          prazo_analise_horas: number
          descricao_completa: string | null
        }
      }
    }
    Views: {
      vw_procedimentos_completo: {
        Row: {
          id: number
          codigo_tuss: string
          descricao: string
          especialidade: string
          extra_rol: boolean
          requer_pre_aprovacao: boolean
          requer_dente: boolean
          requer_face: boolean
          requer_regiao: boolean
          requer_rx_inicial: boolean
          requer_rx_final: boolean
          nivel: number | null
          complexidade: string | null
          prazo_analise_horas: number | null
          prazo_longevidade_meses: number | null
        }
      }
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}