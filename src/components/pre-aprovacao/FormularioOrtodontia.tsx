'use client'

import { useState, useImperativeHandle, forwardRef, useEffect, useRef } from 'react'
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Check, ArrowLeft, Plus, Minus, Upload } from 'phosphor-react'
import Odontograma from './Odontograma'
import FormularioProrrogacao from './FormularioProrrogacao'

interface DadosOrtodontia {
  // ========================================
  // ETAPA 1: Fase do Tratamento
  // ========================================
  etapa1_faseTratamento: string // 'permanente' | 'mista' | 'decidua'
  
  // ========================================
  // ETAPA 2: Classificação de Angle e Padrão Facial  
  // ========================================
  etapa2_classificacaoAngle: string // 'classe_i' | 'classe_ii' | 'classe_iii'
  etapa2_padraoFacial: string // 'padrao_i' | 'padrao_ii' | 'padrao_iii' | 'face_longa' | 'face_curta'
  
  // ========================================
  // ETAPA 2.1: Especificação Classe II (SE classe_ii selecionada)
  // ========================================
  etapa2_1_classeIIDivisao?: string // 'divisao_1' | 'divisao_2'  
  etapa2_1_classeIISubdivisao?: string // 'direita' | 'esquerda' | 'bilateral'
  
  // ========================================
  // ETAPA 2.2: Especificação Classe III (SE classe_iii selecionada)
  // ========================================
  etapa2_2_classeIIISubdivisao?: string // 'direita' | 'esquerda' | 'bilateral'
  
  // ========================================
  // ETAPA 3: Linha Média e Mordida Cruzada
  // ========================================
  etapa3_linhaMediaCoincidente: string // 'sim' | 'nao'
  etapa3_mordidaCruzada: string // 'sim' | 'nao'
  
  // ========================================
  // ETAPA 3.1: Linha Média NÃO Coincidente (SE etapa3_linhaMediaCoincidente = 'nao')
  // ========================================
  etapa3_1_desvioSuperior?: string // 'direita' | 'esquerda' | 'ausente'
  etapa3_1_desvioInferior?: string // 'direita' | 'esquerda' | 'ausente'
  
  // ========================================
  // ETAPA 3.2: Mordida Cruzada SIM (SE etapa3_mordidaCruzada = 'sim')
  // ========================================
  etapa3_2_cruzadaAnterior?: string // 'sim' | 'nao'
  etapa3_2_cruzadaPosterior?: string // 'sim' | 'nao'
  
  // ========================================
  // ETAPA 3.2.1: Cruzada Posterior SIM (SE etapa3_2_cruzadaPosterior = 'sim')
  // ========================================
  etapa3_2_1_tipoMordidaCruzada?: string // 'unilateral_direita' | 'unilateral_esquerda' | 'bilateral'
  
  // ========================================
  // ETAPA 4: Trespasse Horizontal e Vertical
  // ========================================
  etapa4_trespasseHorizontal: string // 'adequado' | 'inadequado'  
  etapa4_trespasseVertical: string // 'adequado' | 'mordida_aberta' | 'sobremordida'
  
  // ========================================
  // ETAPA 4.1: Trespasse Horizontal INADEQUADO (SE etapa4_trespasseHorizontal = 'inadequado')
  // ========================================
  etapa4_1_medidaTrespasseHorizontal?: string // '0mm' | '1mm' | '2mm' | '3mm' | 'acima_4mm'
  
  // ========================================
  // ETAPA 4.2.1: Trespasse Vertical MORDIDA ABERTA (SE etapa4_trespasseVertical = 'mordida_aberta')
  // ========================================
  etapa4_2_1_medidaMordidaAberta?: string // '0mm' | '1mm' | '2mm' | '3mm' | 'acima_4mm'
  
  // ========================================
  // ETAPA 4.2.2: Trespasse Vertical SOBREMORDIDA (SE etapa4_trespasseVertical = 'sobremordida')
  // ========================================
  etapa4_2_2_medidaSobremordida?: string // '0mm' | '1mm' | '2mm' | '3mm' | 'acima_4mm'
  
  // ========================================
  // ETAPA 5: Diastemas, Apinhamento e Giroversões
  // ========================================
  etapa5_diastemas: string // 'presentes' | 'ausentes'
  etapa5_apinhamento: string // 'presentes' | 'ausentes'
  etapa5_giroversoes: string // 'presentes' | 'ausentes'
  
  // ========================================
  // ETAPA 5.1: Diastemas PRESENTES (SE etapa5_diastemas = 'presentes')
  // ========================================
  etapa5_1_dentesDiastemas?: string[] // Lista de dentes via odontograma
  
  // ========================================
  // ETAPA 5.2: Apinhamento PRESENTES (SE etapa5_apinhamento = 'presentes')
  // ========================================
  etapa5_2_dentesApinhamento?: string[] // Lista de dentes via odontograma
  
  // ========================================
  // ETAPA 5.3: Giroversões PRESENTES (SE etapa5_giroversoes = 'presentes')
  // ========================================
  etapa5_3_dentesGiroversoes?: string[] // Lista de dentes via odontograma
  
  // ========================================
  // ETAPA 6: Dor/Ruído Articular, Bruxismo e Apertamento
  // ========================================
  etapa6_dorRuidoArticular: string // 'sim' | 'nao'
  etapa6_bruxismo: string // 'sim' | 'nao'
  etapa6_apertamento: string // 'sim' | 'nao'
  
  // ========================================
  // ETAPA 6.1: Dor/Ruído Articular SIM (SE etapa6_dorRuidoArticular = 'sim')
  // ========================================
  etapa6_1_ladoDorRuido?: string // 'direita' | 'esquerda' | 'bilateral'
  
  // ========================================
  // ETAPA 7: Respiração e Doença Periodontal
  // ========================================
  etapa7_respiracao: string // 'bucal' | 'nasal' | 'buco_nasal'
  etapa7_doencaPeriodontal: string // 'ausente' | 'leve' | 'moderada' | 'grave'
  
  // ========================================
  // ETAPA 7.1: Doença Periodontal LEVE (SE etapa7_doencaPeriodontal = 'leve')
  // ========================================
  etapa7_1_tipoPerdaOsseaLeve?: string // 'generalizada' | 'localizada'
  
  // ========================================
  // ETAPA 7.1.1: Perda Óssea Leve LOCALIZADA (SE etapa7_1_tipoPerdaOsseaLeve = 'localizada')
  // ========================================
  etapa7_1_1_dentesPerdaOsseaLeve?: string[] // Lista de dentes via odontograma
  
  // ========================================
  // ETAPA 7.2: Doença Periodontal MODERADA (SE etapa7_doencaPeriodontal = 'moderada')
  // ========================================
  etapa7_2_tipoPerdaOsseaModerada?: string // 'generalizada' | 'localizada'
  
  // ========================================
  // ETAPA 7.2.1: Perda Óssea Moderada LOCALIZADA (SE etapa7_2_tipoPerdaOsseaModerada = 'localizada')
  // ========================================
  etapa7_2_1_dentesPerdaOsseaModerada?: string[] // Lista de dentes via odontograma
  
  // ========================================
  // ETAPA 7.3: Doença Periodontal GRAVE (SE etapa7_doencaPeriodontal = 'grave')
  // ========================================
  etapa7_3_tipoPerdaOsseaGrave?: string // 'generalizada' | 'localizada'
  
  // ========================================
  // ETAPA 7.3.1: Perda Óssea Grave LOCALIZADA (SE etapa7_3_tipoPerdaOsseaGrave = 'localizada')
  // ========================================
  etapa7_3_1_dentesPerdaOsseaGrave?: string[] // Lista de dentes via odontograma
  
  // ========================================
  // ETAPA 8: Necessidade de Tratamento Complementar
  // ========================================
  etapa8_necessidadeTratamentoComplementar: string // 'sim' | 'nao'
  etapa8_queixaPrincipal: string // Texto livre via textarea
  
  // ========================================
  // ETAPA 8.1: Tratamento Complementar SIM (SE etapa8_necessidadeTratamentoComplementar = 'sim')
  // ========================================
  etapa8_1_tiposTratamentoComplementar?: string[] // ['fonoaudiologia', 'pre_proteticas', 'otorrinolaringologia', 'cirurgia_ortognatica', 'implantes']
  
  // ========================================
  // ETAPA 9: Tipo de Tratamento
  // ========================================
  etapa9_tipoTratamento: string // 'preventivo_interceptativo' | 'ortopedico' | 'corretivo' | 'cirurgica'
  
  // ========================================
  // ETAPA 9.1.1: Tratamento PREVENTIVO/INTERCEPTATIVO (SE etapa9_tipoTratamento = 'preventivo_interceptativo')
  // ========================================
  etapa9_1_1_aparatologiaPreventivo?: string[] // ['intra_oral', 'extra_oral'] (checkbox)
  
  // ========================================
  // ETAPA 9.1.1.1: Preventivo INTRA ORAL (SE 'intra_oral' em etapa9_1_1_aparatologiaPreventivo)
  // ========================================
  etapa9_1_1_1_tipoIntraOralPreventivo?: string // 'convencional' | 'alinhador'
  etapa9_1_1_1_especificacaoConvencionalPreventivo?: string // Textarea (SE 'convencional' selecionado)
  
  // ========================================
  // ETAPA 9.1.1 EXTRA ORAL: Especificação (SE 'extra_oral' em etapa9_1_1_aparatologiaPreventivo)
  // ========================================
  etapa9_1_1_especificacaoExtraOralPreventivo?: string // Textarea
  
  // ========================================
  // ETAPA 9.1.2: Preventivo/Interceptativo EXODONTIA E PROGNÓSTICO
  // ========================================
  etapa9_1_2_exodontiasPreventivo: string // 'sim' | 'nao'
  etapa9_1_2_prognosticoPreventivo: string // 'favoravel' | 'desfavoravel' | 'duvidoso'
  
  // ========================================
  // ETAPA 9.1.2.1: Exodontias Preventivo SIM (SE etapa9_1_2_exodontiasPreventivo = 'sim')
  // ========================================
  etapa9_1_2_1_dentesExodontiaPreventivo?: string[] // Lista de dentes via odontograma
  
  // ========================================
  // ETAPA 9.2.1: Tratamento ORTOPÉDICO (SE etapa9_tipoTratamento = 'ortopedico')
  // ========================================
  etapa9_2_1_aparatologiaOrtopedico?: string[] // ['intra_oral', 'extra_oral'] (checkbox)
  
  // ========================================
  // ETAPA 9.2.1.1: Ortopédico INTRA ORAL (SE 'intra_oral' em etapa9_2_1_aparatologiaOrtopedico)
  // ========================================
  etapa9_2_1_1_tipoIntraOralOrtopedico?: string // 'convencional' | 'alinhador'
  etapa9_2_1_1_especificacaoConvencionalOrtopedico?: string // Textarea (SE 'convencional' selecionado)
  
  // ========================================
  // ETAPA 9.2.1 EXTRA ORAL: Especificação (SE 'extra_oral' em etapa9_2_1_aparatologiaOrtopedico)
  // ========================================
  etapa9_2_1_especificacaoExtraOralOrtopedico?: string // Textarea
  
  // ========================================
  // ETAPA 9.2.2: Ortopédico EXODONTIA E PROGNÓSTICO
  // ========================================
  etapa9_2_2_exodontiasOrtopedico: string // 'sim' | 'nao'
  etapa9_2_2_prognosticoOrtopedico: string // 'favoravel' | 'desfavoravel' | 'duvidoso'
  
  // ========================================
  // ETAPA 9.2.2.1: Exodontias Ortopédico SIM (SE etapa9_2_2_exodontiasOrtopedico = 'sim')
  // ========================================
  etapa9_2_2_1_dentesExodontiaOrtopedico?: string[] // Lista de dentes via odontograma
  
  // ========================================
  // ETAPA 9.3.1: Tratamento CORRETIVO (SE etapa9_tipoTratamento = 'corretivo')
  // ========================================
  etapa9_3_1_corretivoCombinado: string // 'sim' | 'nao' (É compositório?)
  
  // ========================================
  // ETAPA 9.3.1.1: Corretivo Combinado SIM (SE etapa9_3_1_corretivoCombinado = 'sim')
  // ========================================
  etapa9_3_1_1_tipoAparatologiaCorretivo?: string // 'fixa' | 'alinhador'
  
  // ========================================
  // ETAPA 9.3.1.2: Corretivo Aparatologia FIXA (SE etapa9_3_1_1_tipoAparatologiaCorretivo = 'fixa')
  // ========================================
  etapa9_3_1_2_formatoAparatologiaFixaCorretivo?: string // 'estetico' | 'metalico'
  
  // ========================================
  // ETAPA 9.3.2: Corretivo EXODONTIA, DESGASTE E PROGNÓSTICO
  // ========================================
  etapa9_3_2_exodontiasCorretivo: string // 'sim' | 'nao'
  etapa9_3_2_desgasteInterproximalCorretivo: string // 'sim' | 'nao'
  etapa9_3_2_prognosticoCorretivo: string // 'favoravel' | 'desfavoravel' | 'duvidoso'
  
  // ========================================
  // ETAPA 9.3.2.1: Exodontias Corretivo SIM (SE etapa9_3_2_exodontiasCorretivo = 'sim')
  // ========================================
  etapa9_3_2_1_dentesExodontiaCorretivo?: string[] // Lista de dentes via odontograma
  
  // ========================================
  // ETAPA 9.3.3.1: Desgaste Interproximal Corretivo SIM (SE etapa9_3_2_desgasteInterproximalCorretivo = 'sim')
  // ========================================
  etapa9_3_3_1_dentesDesgasteCorretivo?: string[] // Lista de dentes via odontograma
  
  // ========================================
  // ETAPA 9.4.1: Tratamento CIRÚRGICO (SE etapa9_tipoTratamento = 'cirurgica')
  // ========================================
  etapa9_4_1_aparatologiaCirurgico: string // 'fixa' | 'ortopedico' | 'alinhador'
  
  // ========================================
  // ETAPA 9.4.1.1: Cirúrgico Aparatologia FIXA (SE etapa9_4_1_aparatologiaCirurgico = 'fixa')
  // ========================================
  etapa9_4_1_1_formatoAparatologiaFixaCirurgico?: string // 'estetico' | 'metalico'
  
  // ========================================
  // ETAPA 9.4.1.2: Cirúrgico Aparatologia ORTOPÉDICO (SE etapa9_4_1_aparatologiaCirurgico = 'ortopedico')
  // ========================================
  etapa9_4_1_2_aparatologiaOrtopedicoCirurgico?: string[] // ['intra_oral', 'extra_oral'] (checkbox)
  etapa9_4_1_2_especificacaoIntraOralCirurgico?: string // Textarea (SE 'intra_oral' selecionado)
  etapa9_4_1_2_especificacaoExtraOralCirurgico?: string // Textarea (SE 'extra_oral' selecionado)
  
  // ========================================
  // ETAPA 9.4.2: Cirúrgico EXODONTIA, DESGASTE E PROGNÓSTICO
  // ========================================
  etapa9_4_2_exodontiasCirurgico: string // 'sim' | 'nao'
  etapa9_4_2_desgasteInterproximalCirurgico: string // 'sim' | 'nao'
  etapa9_4_2_prognosticoCirurgico: string // 'favoravel' | 'desfavoravel' | 'duvidoso'
  
  // ========================================
  // ETAPA 9.4.2.1: Exodontias Cirúrgico SIM (SE etapa9_4_2_exodontiasCirurgico = 'sim')
  // ========================================
  etapa9_4_2_1_dentesExodontiaCirurgico?: string[] // Lista de dentes via odontograma
  
  // ========================================
  // ETAPA 9.4.3.1: Desgaste Interproximal Cirúrgico SIM (SE etapa9_4_2_desgasteInterproximalCirurgico = 'sim')
  // ========================================
  etapa9_4_3_1_dentesDesgasteCirurgico?: string[] // Lista de dentes via odontograma
  
  // ========================================
  // ETAPA 10: Previsão para Finalização do Tratamento
  // ========================================
  etapa10_previsaoMeses: number // Contador de 1-24 meses
  etapa10_aparelhoPrevio: string // 'sim' | 'nao'
  
  // ========================================
  // ETAPA 10.1: Aparelho Prévio SIM (SE etapa10_aparelhoPrevio = 'sim')
  // ========================================
  etapa10_1_tempoAparelhoPrevio?: number // Contador de 1-24 meses
  
  // ========================================
  // ETAPA 11: Upload de Imagens do Início do Tratamento
  // ========================================
  etapa11_imagensInicio?: File[] // Upload múltiplo de imagens
}

interface FormularioOrtodontiaProps {
  onContinuar: (dados: any) => void
  onVoltar: () => void
  onStatusChange?: (podeAvancar: boolean, etapa: number) => void
  isProrrogacao?: boolean
}

export interface FormularioOrtodontiaRef {
  proximaEtapa: () => void
  podeContinuar: () => boolean
}

const FormularioOrtodontia = forwardRef<FormularioOrtodontiaRef, FormularioOrtodontiaProps>(
  ({ onContinuar, onVoltar, onStatusChange, isProrrogacao = false }, ref) => {
  const [etapaAtual, setEtapaAtual] = useState(1)
  
  // Ref interno para o FormularioProrrogacao
  const prorrogacaoRef = useRef<any>(null)
  
  const [dados, setDados] = useState<DadosOrtodontia>({
    // ========================================
    // ETAPA 1: Fase do Tratamento
    // ========================================
    etapa1_faseTratamento: '',
    
    // ========================================
    // ETAPA 2: Classificação de Angle e Padrão Facial  
    // ========================================
    etapa2_classificacaoAngle: '',
    etapa2_padraoFacial: '',
    
    // ========================================
    // ETAPA 3: Linha Média e Mordida Cruzada
    // ========================================
    etapa3_linhaMediaCoincidente: '',
    etapa3_mordidaCruzada: '',
    
    // ========================================
    // ETAPA 4: Trespasse Horizontal e Vertical
    // ========================================
    etapa4_trespasseHorizontal: '',
    etapa4_trespasseVertical: '',
    
    // ========================================
    // ETAPA 5: Diastemas, Apinhamento e Giroversões
    // ========================================
    etapa5_diastemas: '',
    etapa5_apinhamento: '',
    etapa5_giroversoes: '',
    
    // ========================================
    // ETAPA 6: Dor/Ruído Articular, Bruxismo e Apertamento
    // ========================================
    etapa6_dorRuidoArticular: '',
    etapa6_bruxismo: '',
    etapa6_apertamento: '',
    
    // ========================================
    // ETAPA 7: Respiração e Doença Periodontal
    // ========================================
    etapa7_respiracao: '',
    etapa7_doencaPeriodontal: '',
    
    // ========================================
    // ETAPA 8: Necessidade de Tratamento Complementar
    // ========================================
    etapa8_necessidadeTratamentoComplementar: '',
    etapa8_queixaPrincipal: '',
    
    // ========================================
    // ETAPA 9: Tipo de Tratamento
    // ========================================
    etapa9_tipoTratamento: '',
    etapa9_1_2_exodontiasPreventivo: '',
    etapa9_1_2_prognosticoPreventivo: '',
    etapa9_2_2_exodontiasOrtopedico: '',
    etapa9_2_2_prognosticoOrtopedico: '',
    etapa9_3_1_corretivoCombinado: '',
    etapa9_3_2_exodontiasCorretivo: '',
    etapa9_3_2_desgasteInterproximalCorretivo: '',
    etapa9_3_2_prognosticoCorretivo: '',
    etapa9_4_1_aparatologiaCirurgico: '',
    etapa9_4_2_exodontiasCirurgico: '',
    etapa9_4_2_desgasteInterproximalCirurgico: '',
    etapa9_4_2_prognosticoCirurgico: '',
    
    // ========================================
    // ETAPA 10: Previsão para Finalização do Tratamento
    // ========================================
    etapa10_previsaoMeses: 1,
    etapa10_aparelhoPrevio: '',
    
    // ========================================
    // Arrays inicializados vazios (condicionais)
    // ========================================
    etapa5_1_dentesDiastemas: [],
    etapa5_2_dentesApinhamento: [],
    etapa5_3_dentesGiroversoes: [],
    etapa7_1_1_dentesPerdaOsseaLeve: [],
    etapa7_2_1_dentesPerdaOsseaModerada: [],
    etapa7_3_1_dentesPerdaOsseaGrave: [],
    etapa8_1_tiposTratamentoComplementar: [],
    etapa9_1_1_aparatologiaPreventivo: [],
    etapa9_1_2_1_dentesExodontiaPreventivo: [],
    etapa9_2_1_aparatologiaOrtopedico: [],
    etapa9_2_2_1_dentesExodontiaOrtopedico: [],
    etapa9_3_2_1_dentesExodontiaCorretivo: [],
    etapa9_3_3_1_dentesDesgasteCorretivo: [],
    etapa9_4_1_2_aparatologiaOrtopedicoCirurgico: [],
    etapa9_4_2_1_dentesExodontiaCirurgico: [],
    etapa9_4_3_1_dentesDesgasteCirurgico: [],
    etapa11_imagensInicio: []
  })

  // Dados das opções
  const fasesTratamento = [
    { id: 'permanente', titulo: 'Permanente', descricao: 'Tratamento ortodôntico em dentição permanente' },
    { id: 'mista', titulo: 'Mista', descricao: 'Tratamento ortodôntico em dentição mista' },
    { id: 'decidua', titulo: 'Decídua', descricao: 'Tratamento ortodôntico em dentição decídua' }
  ]

  const classificacoesAngle = [
    { id: 'classe_i', titulo: 'Classe I', descricao: 'Relação molar normal' },
    { id: 'classe_ii', titulo: 'Classe II', descricao: 'Molar inferior distalizado' },
    { id: 'classe_iii', titulo: 'Classe III', descricao: 'Molar inferior mesializado' }
  ]

  const divisoesClasseII = [
    { id: 'divisao_1', titulo: 'Divisão 1ª', descricao: 'Incisivos superiores protruídos' },
    { id: 'divisao_2', titulo: 'Divisão 2ª', descricao: 'Incisivos superiores retroinclinados' }
  ]

  const subdivisoes = [
    { id: 'direita', titulo: 'Subdivisão direita', descricao: 'Assimetria do lado direito' },
    { id: 'esquerda', titulo: 'Subdivisão esquerda', descricao: 'Assimetria do lado esquerdo' },
    { id: 'bilateral', titulo: 'Subdivisão bilateral', descricao: 'Bilateral simétrica' }
  ]

  const padroesFaciais = [
    { id: 'padrao_i', titulo: 'Padrão I', descricao: 'Perfil equilibrado' },
    { id: 'padrao_ii', titulo: 'Padrão II', descricao: 'Perfil convexo' },
    { id: 'padrao_iii', titulo: 'Padrão III', descricao: 'Perfil côncavo' },
    { id: 'face_longa', titulo: 'Face longa', descricao: 'Aumento da altura facial inferior' },
    { id: 'face_curta', titulo: 'Face curta', descricao: 'Diminuição da altura facial inferior' }
  ]

  const opcoesSimNao = [
    { id: 'sim', titulo: 'Sim', descricao: '' },
    { id: 'nao', titulo: 'Não', descricao: '' }
  ]

  const opcoesTrespasseHorizontal = [
    { id: 'adequado', titulo: 'Adequado', descricao: '' },
    { id: 'inadequado', titulo: 'Inadequado', descricao: '' }
  ]

  const opcoesTrespasseVertical = [
    { id: 'adequado', titulo: 'Adequado', descricao: '' },
    { id: 'mordida_aberta', titulo: 'Mordida aberta', descricao: '' },
    { id: 'sobremordida', titulo: 'Sobremordida', descricao: '' }
  ]

  const medidasTrespasseHorizontal = [
    { id: '-4mm', titulo: '-4 mm', descricao: '' },
    { id: '-3mm', titulo: '-3 mm', descricao: '' },
    { id: '-2mm', titulo: '-2 mm', descricao: '' },
    { id: '-1mm', titulo: '-1 mm', descricao: '' },
    { id: '0mm', titulo: '0 mm', descricao: '' },
    { id: '1mm', titulo: '1 mm', descricao: '' },
    { id: '2mm', titulo: '2 mm', descricao: '' },
    { id: '3mm', titulo: '3 mm', descricao: '' },
    { id: '4mm', titulo: '4 mm', descricao: '' },
    { id: 'acima4mm', titulo: 'Acima de 4 mm', descricao: '' }
  ]

  // Arrays organizados para layout em 2 colunas (negativos à esquerda, positivos à direita)
  const medidasTrespasseEsquerda = [
    { id: '-4mm', titulo: '-4 mm', descricao: '' },
    { id: '-3mm', titulo: '-3 mm', descricao: '' },
    { id: '-2mm', titulo: '-2 mm', descricao: '' },
    { id: '-1mm', titulo: '-1 mm', descricao: '' },
    { id: '0mm', titulo: '0 mm', descricao: '' }
  ]

  const medidasTrespasseDireita = [
    { id: '1mm', titulo: '1 mm', descricao: '' },
    { id: '2mm', titulo: '2 mm', descricao: '' },
    { id: '3mm', titulo: '3 mm', descricao: '' },
    { id: '4mm', titulo: '4 mm', descricao: '' },
    { id: 'acima4mm', titulo: 'Acima de 4 mm', descricao: '' }
  ]

  const medidasTrespasseVertical = [
    { id: '0mm', titulo: '0 mm', descricao: '' },
    { id: '1mm', titulo: '1 mm', descricao: '' },
    { id: '2mm', titulo: '2 mm', descricao: '' },
    { id: '3mm', titulo: '3 mm', descricao: '' },
    { id: '4mm', titulo: '4 mm', descricao: '' },
    { id: 'acima4mm', titulo: 'Acima de 4 mm', descricao: '' }
  ]

  // Arrays organizados para layout em 2 colunas (valores menores à esquerda, maiores à direita)
  const medidasVerticalEsquerda = [
    { id: '0mm', titulo: '0 mm', descricao: '' },
    { id: '1mm', titulo: '1 mm', descricao: '' },
    { id: '2mm', titulo: '2 mm', descricao: '' }
  ]

  const medidasVerticalDireita = [
    { id: '3mm', titulo: '3 mm', descricao: '' },
    { id: '4mm', titulo: '4 mm', descricao: '' },
    { id: 'acima4mm', titulo: 'Acima de 4 mm', descricao: '' }
  ]

  const opcoesDesvio = [
    { id: 'direita', titulo: 'Direita', descricao: '' },
    { id: 'esquerda', titulo: 'Esquerda', descricao: '' },
    { id: 'ausente', titulo: 'Ausente', descricao: '' }
  ]

  const tiposMordidaCruzada = [
    { id: 'unilateral_direita', titulo: 'Unilateral direita', descricao: '' },
    { id: 'unilateral_esquerda', titulo: 'Unilateral esquerda', descricao: '' },
    { id: 'bilateral', titulo: 'Bilateral', descricao: '' }
  ]

  const opcoesPresencaAusencia = [
    { id: 'presentes', titulo: 'Presentes', descricao: '' },
    { id: 'ausentes', titulo: 'Ausentes', descricao: '' }
  ]

  const ladosDor = [
    { id: 'direita', titulo: 'Direita', descricao: '' },
    { id: 'esquerda', titulo: 'Esquerda', descricao: '' },
    { id: 'bilateral', titulo: 'Bilateral', descricao: '' }
  ]

  const tiposRespiracao = [
    { id: 'bucal', titulo: 'Bucal', descricao: '' },
    { id: 'nasal', titulo: 'Nasal', descricao: '' },
    { id: 'buco_nasal', titulo: 'Buco-nasal', descricao: '' }
  ]

  const grausDoencaPeriodontal = [
    { id: 'ausente', titulo: 'Ausente', descricao: '' },
    { id: 'leve', titulo: 'Leve', descricao: '' },
    { id: 'moderada', titulo: 'Moderada', descricao: '' },
    { id: 'grave', titulo: 'Grave', descricao: '' }
  ]

  const tiposPerdaOssea = [
    { id: 'generalizada', titulo: 'Generalizada', descricao: '' },
    { id: 'localizada', titulo: 'Localizada', descricao: '' }
  ]

  const tiposTratamentoComplementar = [
    { id: 'fonoaudiologia', titulo: 'Fonoaudiologia' },
    { id: 'pre_proteticas', titulo: 'Pré-protéticas' },
    { id: 'otorrinolaringologia', titulo: 'Otorrinolaringologia' },
    { id: 'cirurgia_ortognatica', titulo: 'Cirurgia ortognática' },
    { id: 'implantes', titulo: 'Implantes' }
  ]

  const tiposTratamento = [
    { id: 'preventivo_interceptativo', titulo: 'Preventivo / Interceptativo', descricao: '' },
    { id: 'ortopedico', titulo: 'Ortopédico', descricao: '' },
    { id: 'corretivo', titulo: 'Corretivo', descricao: '' },
    { id: 'cirurgico', titulo: 'Cirúrgico', descricao: '' }
  ]

  const tiposAparatologia = [
    { id: 'intra_oral', titulo: 'Intra oral' },
    { id: 'extra_oral', titulo: 'Extra oral' }
  ]

  const tiposAparatologiaIntraOral = [
    { id: 'convencional', titulo: 'Convencional', descricao: '' },
    { id: 'alinhador', titulo: 'Alinhador', descricao: '' }
  ]

  const formatosAparatologia = [
    { id: 'estetico', titulo: 'Estético', descricao: '' },
    { id: 'metalico', titulo: 'Metálico', descricao: '' }
  ]

  const tiposAparatologiaCirurgico = [
    { id: 'fixa', titulo: 'Fixa', descricao: '' },
    { id: 'ortopedico', titulo: 'Ortopédico', descricao: '' },
    { id: 'alinhador', titulo: 'Alinhador', descricao: '' }
  ]

  const opcoesPrognostico = [
    { id: 'favoravel', titulo: 'Favorável', descricao: '' },
    { id: 'desfavoravel', titulo: 'Desfavorável', descricao: '' },
    { id: 'duvidoso', titulo: 'Duvidoso', descricao: '' }
  ]

  // Handlers para cada etapa
  const handleSelecionarFase = (fase: string) => {
    setDados({ ...dados, etapa1_faseTratamento: fase })
  }

  const handleSelecionarClassificacao = (classificacao: string) => {
    setDados({ ...dados, etapa2_classificacaoAngle: classificacao })
  }

  const handleSelecionarDivisaoII = (divisao: string) => {
    setDados({ ...dados, etapa2_1_classeIIDivisao: divisao })
  }

  const handleSelecionarSubdivisaoII = (subdivisao: string) => {
    setDados({ ...dados, etapa2_1_classeIISubdivisao: subdivisao })
  }

  const handleSelecionarSubdivisaoIII = (subdivisao: string) => {
    setDados({ ...dados, etapa2_2_classeIIISubdivisao: subdivisao })
  }

  const handleSelecionarPadraoFacial = (padrao: string) => {
    setDados({ ...dados, etapa2_padraoFacial: padrao })
  }

  const handleSelecionarLinhaMedia = (opcao: string) => {
    setDados({ ...dados, etapa3_linhaMediaCoincidente: opcao })
  }

  const handleSelecionarMordida = (opcao: string) => {
    setDados({ ...dados, etapa3_mordidaCruzada: opcao })
  }

  const handleSelecionarOverjet = (opcao: string) => {
    setDados({ ...dados, etapa4_trespasseHorizontal: opcao })
  }

  const handleSelecionarOverbite = (opcao: string) => {
    setDados({ ...dados, etapa4_trespasseVertical: opcao })
  }

  const handleSelecionarDesvioSuperior = (opcao: string) => {
    setDados({ ...dados, etapa3_1_desvioSuperior: opcao })
  }

  const handleSelecionarDesvioInferior = (opcao: string) => {
    setDados({ ...dados, etapa3_1_desvioInferior: opcao })
  }

  const handleSelecionarCruzadaAnterior = (opcao: string) => {
    setDados({ ...dados, etapa3_2_cruzadaAnterior: opcao })
  }

  const handleSelecionarCruzadaPosterior = (opcao: string) => {
    setDados({ ...dados, etapa3_2_cruzadaPosterior: opcao })
  }

  const handleSelecionarTipoMordidaCruzada = (tipo: string) => {
    setDados({ ...dados, etapa3_2_1_tipoMordidaCruzada: tipo })
  }

  const handleSelecionarMedidaOverjet = (medida: string) => {
    setDados({ ...dados, etapa4_1_medidaTrespasseHorizontal: medida })
  }

  const handleSelecionarMedidaOverbite = (medida: string) => {
    setDados({ ...dados, etapa4_2_2_medidaSobremordida: medida })
  }

  const handleSelecionarMedidaMordidaAberta = (medida: string) => {
    setDados({ ...dados, etapa4_2_1_medidaMordidaAberta: medida })
  }

  const handleSelecionarMedidaSobremordida = (medida: string) => {
    setDados({ ...dados, etapa4_2_2_medidaSobremordida: medida })
  }

  const handleSelecionarDiastemas = (opcao: string) => {
    setDados({ ...dados, etapa5_diastemas: opcao })
  }

  const handleSelecionarApinhamento = (opcao: string) => {
    setDados({ ...dados, etapa5_apinhamento: opcao })
  }

  const handleSelecionarGiroversoes = (opcao: string) => {
    setDados({ ...dados, etapa5_giroversoes: opcao })
  }

  const handleSelecionarDorRuido = (opcao: string) => {
    setDados({ ...dados, etapa6_dorRuidoArticular: opcao })
  }

  const handleSelecionarLadoDor = (lado: string) => {
    setDados({ ...dados, etapa6_1_ladoDorRuido: lado })
  }

  const handleSelecionarBruxismo = (opcao: string) => {
    setDados({ ...dados, etapa6_bruxismo: opcao })
  }

  const handleSelecionarApertamento = (opcao: string) => {
    setDados({ ...dados, etapa6_apertamento: opcao })
  }

  const handleSelecionarRespiracao = (tipo: string) => {
    setDados({ ...dados, etapa7_respiracao: tipo })
  }

  const handleSelecionarDoencaPeriodontal = (grau: string) => {
    setDados({ ...dados, etapa7_doencaPeriodontal: grau })
  }

  // Novos handlers para etapas 7.1-11
  const handleSelecionarTipoPerdaOssea = (tipo: string) => {
    if (etapaAtual === 7.1) {
      setDados({ ...dados, etapa7_1_tipoPerdaOsseaLeve: tipo })
    } else if (etapaAtual === 7.2) {
      setDados({ ...dados, etapa7_2_tipoPerdaOsseaModerada: tipo })
    } else if (etapaAtual === 7.3) {
      setDados({ ...dados, etapa7_3_tipoPerdaOsseaGrave: tipo })
    }
  }

  const handleToggleDentePerdaOssea = (dente: string) => {
    if (etapaAtual === 7.11) {
      const dentesAtuais = dados.etapa7_1_1_dentesPerdaOsseaLeve || []
      const novosDentes = dentesAtuais.includes(dente)
        ? dentesAtuais.filter(d => d !== dente)
        : [...dentesAtuais, dente]
      setDados({ ...dados, etapa7_1_1_dentesPerdaOsseaLeve: novosDentes })
    } else if (etapaAtual === 7.21) {
      const dentesAtuais = dados.etapa7_2_1_dentesPerdaOsseaModerada || []
      const novosDentes = dentesAtuais.includes(dente)
        ? dentesAtuais.filter(d => d !== dente)
        : [...dentesAtuais, dente]
      setDados({ ...dados, etapa7_2_1_dentesPerdaOsseaModerada: novosDentes })
    } else if (etapaAtual === 7.31) {
      const dentesAtuais = dados.etapa7_3_1_dentesPerdaOsseaGrave || []
      const novosDentes = dentesAtuais.includes(dente)
        ? dentesAtuais.filter(d => d !== dente)
        : [...dentesAtuais, dente]
      setDados({ ...dados, etapa7_3_1_dentesPerdaOsseaGrave: novosDentes })
    }
  }

  const handleSelecionarNecessidadeTratamento = (opcao: string) => {
    setDados({ ...dados, etapa8_necessidadeTratamentoComplementar: opcao })
  }

  const handleQueixaPrincipal = (texto: string) => {
    setDados({ ...dados, etapa8_queixaPrincipal: texto })
  }

  const handleToggleTratamentoComplementar = (tipo: string) => {
    const tiposAtuais = dados.etapa8_1_tiposTratamentoComplementar || []
    const novosTipos = tiposAtuais.includes(tipo)
      ? tiposAtuais.filter(t => t !== tipo)
      : [...tiposAtuais, tipo]
    setDados({ ...dados, etapa8_1_tiposTratamentoComplementar: novosTipos })
  }

  const handleSelecionarTipoTratamento = (tipo: string) => {
    setDados({ ...dados, etapa9_tipoTratamento: tipo })
  }

  const handleToggleAparatologiaPreventivo = (tipo: string) => {
    const tiposAtuais = dados.etapa9_1_1_aparatologiaPreventivo || []
    const novosTipos = tiposAtuais.includes(tipo)
      ? tiposAtuais.filter(t => t !== tipo)
      : [...tiposAtuais, tipo]
    setDados({ ...dados, etapa9_1_1_aparatologiaPreventivo: novosTipos })
  }

  const handleSelecionarAparelhoIntraOralPreventivo = (tipo: string) => {
    setDados({ ...dados, etapa9_1_1_1_tipoIntraOralPreventivo: tipo })
  }

  const handleEspecificarAparelhoPreventivo = (local: string, especificacao: string) => {
    if (local === 'intra') {
      setDados({ ...dados, etapa9_1_1_1_especificacaoConvencionalPreventivo: especificacao })
    } else {
      setDados({ ...dados, etapa9_1_1_especificacaoExtraOralPreventivo: especificacao })
    }
  }

  // Handlers para Ortopédico (9.2x)
  const handleToggleAparatologiaOrtopedico = (tipo: string) => {
    const tiposAtuais = dados.etapa9_2_1_aparatologiaOrtopedico || []
    const novosTipos = tiposAtuais.includes(tipo)
      ? tiposAtuais.filter(t => t !== tipo)
      : [...tiposAtuais, tipo]
    setDados({ ...dados, etapa9_2_1_aparatologiaOrtopedico: novosTipos })
  }

  const handleSelecionarAparelhoIntraOralOrtopedico = (tipo: string) => {
    setDados({ ...dados, etapa9_2_1_1_tipoIntraOralOrtopedico: tipo })
  }

  const handleEspecificarAparelhoOrtopedico = (local: string, especificacao: string) => {
    if (local === 'intra') {
      setDados({ ...dados, etapa9_2_1_1_especificacaoConvencionalOrtopedico: especificacao })
    } else {
      setDados({ ...dados, etapa9_2_1_especificacaoExtraOralOrtopedico: especificacao })
    }
  }

  const handleSelecionarExodontiasOrtopedico = (opcao: string) => {
    setDados({ ...dados, etapa9_2_2_exodontiasOrtopedico: opcao })
  }

  const handleSelecionarPrognosticoOrtopedico = (opcao: string) => {
    setDados({ ...dados, etapa9_2_2_prognosticoOrtopedico: opcao })
  }

  const handleToggleDentesExodontiaOrtopedico = (dente: string) => {
    const dentesAtuais = dados.etapa9_2_2_1_dentesExodontiaOrtopedico || []
    const novosDentes = dentesAtuais.includes(dente)
      ? dentesAtuais.filter(d => d !== dente)
      : [...dentesAtuais, dente]
    setDados({ ...dados, etapa9_2_2_1_dentesExodontiaOrtopedico: novosDentes })
  }

  // Handlers para Corretivo (9.3x)
  const handleSelecionarCorretivoCombinado = (opcao: string) => {
    setDados({ ...dados, etapa9_3_1_corretivoCombinado: opcao })
  }

  const handleSelecionarTipoAparatologiaCorretivo = (tipo: string) => {
    setDados({ ...dados, etapa9_3_1_1_tipoAparatologiaCorretivo: tipo })
  }

  const handleSelecionarFormatoAparatologiaCorretivo = (formato: string) => {
    setDados({ ...dados, etapa9_3_1_2_formatoAparatologiaFixaCorretivo: formato })
  }

  const handleSelecionarExodontiasCorretivo = (opcao: string) => {
    setDados({ ...dados, etapa9_3_2_exodontiasCorretivo: opcao })
  }

  const handleSelecionarDesgasteCorretivo = (opcao: string) => {
    setDados({ ...dados, etapa9_3_2_desgasteInterproximalCorretivo: opcao })
  }

  const handleSelecionarPrognosticoCorretivo = (opcao: string) => {
    setDados({ ...dados, etapa9_3_2_prognosticoCorretivo: opcao })
  }

  const handleToggleDentesExodontiaCorretivo = (dente: string) => {
    const dentesAtuais = dados.etapa9_3_2_1_dentesExodontiaCorretivo || []
    const novosDentes = dentesAtuais.includes(dente)
      ? dentesAtuais.filter(d => d !== dente)
      : [...dentesAtuais, dente]
    setDados({ ...dados, etapa9_3_2_1_dentesExodontiaCorretivo: novosDentes })
  }

  const handleToggleDentesDesgasteCorretivo = (dente: string) => {
    const dentesAtuais = dados.etapa9_3_3_1_dentesDesgasteCorretivo || []
    const novosDentes = dentesAtuais.includes(dente)
      ? dentesAtuais.filter(d => d !== dente)
      : [...dentesAtuais, dente]
    setDados({ ...dados, etapa9_3_3_1_dentesDesgasteCorretivo: novosDentes })
  }

  // Handlers para Cirúrgico (9.4x)
  const handleSelecionarAparatologiaCirurgico = (tipo: string) => {
    setDados({ ...dados, etapa9_4_1_aparatologiaCirurgico: tipo })
  }

  const handleSelecionarFormatoAparatologiaCirurgico = (formato: string) => {
    setDados({ ...dados, etapa9_4_1_1_formatoAparatologiaFixaCirurgico: formato })
  }

  const handleToggleAparatologiaOrtopedicoCirurgico = (tipo: string) => {
    const tiposAtuais = dados.etapa9_4_1_2_aparatologiaOrtopedicoCirurgico || []
    const novosTipos = tiposAtuais.includes(tipo)
      ? tiposAtuais.filter(t => t !== tipo)
      : [...tiposAtuais, tipo]
    setDados({ ...dados, etapa9_4_1_2_aparatologiaOrtopedicoCirurgico: novosTipos })
  }

  const handleEspecificarAparelhoCirurgico = (local: string, especificacao: string) => {
    if (local === 'intra') {
      setDados({ ...dados, etapa9_4_1_2_especificacaoIntraOralCirurgico: especificacao })
    } else {
      setDados({ ...dados, etapa9_4_1_2_especificacaoExtraOralCirurgico: especificacao })
    }
  }

  const handleSelecionarExodontiasCirurgico = (opcao: string) => {
    setDados({ ...dados, etapa9_4_2_exodontiasCirurgico: opcao })
  }

  const handleSelecionarDesgasteCirurgico = (opcao: string) => {
    setDados({ ...dados, etapa9_4_2_desgasteInterproximalCirurgico: opcao })
  }

  const handleSelecionarPrognosticoCirurgico = (opcao: string) => {
    setDados({ ...dados, etapa9_4_2_prognosticoCirurgico: opcao })
  }

  const handleToggleDentesExodontiaCirurgico = (dente: string) => {
    const dentesAtuais = dados.etapa9_4_2_1_dentesExodontiaCirurgico || []
    const novosDentes = dentesAtuais.includes(dente)
      ? dentesAtuais.filter(d => d !== dente)
      : [...dentesAtuais, dente]
    setDados({ ...dados, etapa9_4_2_1_dentesExodontiaCirurgico: novosDentes })
  }

  const handleToggleDentesDesgasteCirurgico = (dente: string) => {
    const dentesAtuais = dados.etapa9_4_3_1_dentesDesgasteCirurgico || []
    const novosDentes = dentesAtuais.includes(dente)
      ? dentesAtuais.filter(d => d !== dente)
      : [...dentesAtuais, dente]
    setDados({ ...dados, etapa9_4_3_1_dentesDesgasteCirurgico: novosDentes })
  }

  const handleSelecionarExodontiasPreventivo = (opcao: string) => {
    setDados({ ...dados, etapa9_1_2_exodontiasPreventivo: opcao })
  }

  const handleSelecionarPrognosticoPreventivo = (opcao: string) => {
    setDados({ ...dados, etapa9_1_2_prognosticoPreventivo: opcao })
  }

  const handleToggleDentesExodontiaPreventivo = (dente: string) => {
    const dentesAtuais = dados.etapa9_1_2_1_dentesExodontiaPreventivo || []
    const novosDentes = dentesAtuais.includes(dente)
      ? dentesAtuais.filter(d => d !== dente)
      : [...dentesAtuais, dente]
    setDados({ ...dados, etapa9_1_2_1_dentesExodontiaPreventivo: novosDentes })
  }

  const handleSelecionarComposicao = (opcao: string) => {
    setDados({ ...dados, tratamentoComposicao: opcao })
  }

  const handleSelecionarTipoAparatologia = (tipo: string) => {
    setDados({ ...dados, tipoAparatologia: tipo })
  }

  const handleSelecionarFormatoAparatologia = (formato: string) => {
    setDados({ ...dados, formatoAparatologia: formato })
  }

  const handleSelecionarAparelhoIntraOral = (tipo: string) => {
    setDados({ ...dados, aparelhoIntraOralTipo: tipo })
  }

  const handleEspecificarAparelho = (campo: 'intra' | 'extra', texto: string) => {
    if (campo === 'intra') {
      setDados({ ...dados, aparelhoIntraOralEspecificacao: texto })
    } else {
      setDados({ ...dados, aparelhoExtraOralEspecificacao: texto })
    }
  }

  const handleSelecionarExodontias = (opcao: string) => {
    setDados({ ...dados, exodontias: opcao })
  }

  const handleSelecionarDesgaste = (opcao: string) => {
    setDados({ ...dados, desgasteInterproximal: opcao })
  }

  const handleToggleDenteExodontia = (dente: string) => {
    const dentesAtuais = dados.dentesExodontia || []
    const novosDentes = dentesAtuais.includes(dente)
      ? dentesAtuais.filter(d => d !== dente)
      : [...dentesAtuais, dente]
    setDados({ ...dados, dentesExodontia: novosDentes })
  }

  const handleToggleDenteDesgaste = (dente: string) => {
    const dentesAtuais = dados.dentesDesgaste || []
    const novosDentes = dentesAtuais.includes(dente)
      ? dentesAtuais.filter(d => d !== dente)
      : [...dentesAtuais, dente]
    setDados({ ...dados, dentesDesgaste: novosDentes })
  }

  const handleSelecionarPrognostico = (opcao: string) => {
    setDados({ ...dados, prognostico: opcao })
  }

  const handlePrevisaoMeses = (meses: number) => {
    setDados({ ...dados, etapa10_previsaoMeses: meses })
  }

  const handleAparelhoPrevio = (opcao: string) => {
    setDados({ ...dados, etapa10_aparelhoPrevio: opcao })
  }

  const handleTempoAparelhoPrevio = (meses: number) => {
    setDados({ ...dados, tempoAparelhoPrevio: meses })
  }

  const handleUploadImagens = (files: FileList | null) => {
    if (files) {
      const arquivos = Array.from(files)
      setDados({ ...dados, etapa11_imagensInicio: arquivos })
    }
  }

  // Handlers para seleção de dentes no odontograma
  const handleToggleDenteDiastema = (dente: string) => {
    const dentesAtuais = dados.etapa5_1_dentesDiastemas || []
    const novosDentes = dentesAtuais.includes(dente)
      ? dentesAtuais.filter(d => d !== dente)
      : [...dentesAtuais, dente]
    setDados({ ...dados, etapa5_1_dentesDiastemas: novosDentes })
  }

  const handleToggleDenteApinhamento = (dente: string) => {
    const dentesAtuais = dados.etapa5_2_dentesApinhamento || []
    const novosDentes = dentesAtuais.includes(dente)
      ? dentesAtuais.filter(d => d !== dente)
      : [...dentesAtuais, dente]
    setDados({ ...dados, etapa5_2_dentesApinhamento: novosDentes })
  }

  const handleToggleDenteGiroversao = (dente: string) => {
    const dentesAtuais = dados.etapa5_3_dentesGiroversoes || []
    const novosDentes = dentesAtuais.includes(dente)
      ? dentesAtuais.filter(d => d !== dente)
      : [...dentesAtuais, dente]
    setDados({ ...dados, etapa5_3_dentesGiroversoes: novosDentes })
  }

  // Navegação entre etapas
  const proximaEtapa = () => {
    if (etapaAtual === 1 && !!dados.etapa1_faseTratamento) {
      setEtapaAtual(2)
    } else if (etapaAtual === 2 && !!dados.etapa2_classificacaoAngle && !!dados.etapa2_padraoFacial) {
      if (dados.etapa2_classificacaoAngle === 'classe_i') {
        setEtapaAtual(3)
      } else if (dados.etapa2_classificacaoAngle === 'classe_ii') {
        setEtapaAtual(2.1)
      } else if (dados.etapa2_classificacaoAngle === 'classe_iii') {
        setEtapaAtual(2.2)
      }
    } else if (etapaAtual === 2.1 && !!dados.etapa2_1_classeIIDivisao && !!dados.etapa2_1_classeIISubdivisao) {
      setEtapaAtual(3)
    } else if (etapaAtual === 2.2 && !!dados.etapa2_2_classeIIISubdivisao) {
      setEtapaAtual(3)
    } else if (etapaAtual === 3 && !!dados.etapa3_linhaMediaCoincidente && !!dados.etapa3_mordidaCruzada) {
      // Sempre seguir sequência das sub-etapas
      if (dados.etapa3_linhaMediaCoincidente === 'nao') {
        setEtapaAtual(3.1)
      } else if (dados.etapa3_mordidaCruzada === 'sim') {
        setEtapaAtual(3.2)
      } else {
        setEtapaAtual(4)
      }
    } else if (etapaAtual === 3.1 && !!dados.etapa3_1_desvioSuperior && !!dados.etapa3_1_desvioInferior) {
      if (dados.etapa3_mordidaCruzada === 'sim') {
        setEtapaAtual(3.2)
      } else {
        setEtapaAtual(4)
      }
    } else if (etapaAtual === 3.2 && !!dados.etapa3_2_cruzadaAnterior && !!dados.etapa3_2_cruzadaPosterior) {
      if (dados.etapa3_2_cruzadaPosterior === 'sim') {
        setEtapaAtual(3.21)
      } else {
        setEtapaAtual(4)
      }
    } else if (etapaAtual === 3.21 && !!dados.etapa3_2_1_tipoMordidaCruzada) {
      setEtapaAtual(4)
    } else if (etapaAtual === 4 && !!dados.etapa4_trespasseHorizontal && !!dados.etapa4_trespasseVertical) {
      // Sempre seguir sequência: se overjet inadequado, vai para 4.1
      if (dados.etapa4_trespasseHorizontal === 'inadequado') {
        setEtapaAtual(4.1)
      } else if (dados.etapa4_trespasseVertical === 'mordida_aberta') {
        setEtapaAtual(4.2)
      } else if (dados.etapa4_trespasseVertical === 'sobremordida') {
        setEtapaAtual(4.3)
      } else {
        setEtapaAtual(5)
      }
    } else if (etapaAtual === 4.1 && !!dados.etapa4_1_medidaTrespasseHorizontal) {
      // Sempre verificar se precisa ir para 4.2 ou 4.3
      if (dados.etapa4_trespasseVertical === 'mordida_aberta') {
        setEtapaAtual(4.2)
      } else if (dados.etapa4_trespasseVertical === 'sobremordida') {
        setEtapaAtual(4.3)
      } else {
        setEtapaAtual(5)
      }
    } else if (etapaAtual === 4.2 && !!dados.etapa4_2_1_medidaMordidaAberta) {
      setEtapaAtual(5)
    } else if (etapaAtual === 4.3 && !!dados.etapa4_2_2_medidaSobremordida) {
      setEtapaAtual(5)
    } else if (etapaAtual === 5 && !!dados.etapa5_diastemas && !!dados.etapa5_apinhamento && !!dados.etapa5_giroversoes) {
      // Sempre seguir sequência das sub-etapas
      if (dados.etapa5_diastemas === 'presentes') {
        setEtapaAtual(5.1)
      } else if (dados.etapa5_apinhamento === 'presentes') {
        setEtapaAtual(5.2)
      } else if (dados.etapa5_giroversoes === 'presentes') {
        setEtapaAtual(5.3)
      } else {
        setEtapaAtual(6)
      }
    } else if (etapaAtual === 5.1 && dados.etapa5_1_dentesDiastemas && dados.etapa5_1_dentesDiastemas.length > 0) {
      if (dados.etapa5_apinhamento === 'presentes') {
        setEtapaAtual(5.2)
      } else if (dados.etapa5_giroversoes === 'presentes') {
        setEtapaAtual(5.3)
      } else {
        setEtapaAtual(6)
      }
    } else if (etapaAtual === 5.2 && dados.etapa5_2_dentesApinhamento && dados.etapa5_2_dentesApinhamento.length > 0) {
      if (dados.etapa5_giroversoes === 'presentes') {
        setEtapaAtual(5.3)
      } else {
        setEtapaAtual(6)
      }
    } else if (etapaAtual === 5.3 && dados.etapa5_3_dentesGiroversoes && dados.etapa5_3_dentesGiroversoes.length > 0) {
      setEtapaAtual(6)
    } else if (etapaAtual === 6 && !!dados.etapa6_dorRuidoArticular && !!dados.etapa6_bruxismo && !!dados.etapa6_apertamento) {
      if (dados.etapa6_dorRuidoArticular === 'sim') {
        setEtapaAtual(6.1)
      } else {
        setEtapaAtual(7)
      }
    } else if (etapaAtual === 6.1 && !!dados.etapa6_1_ladoDorRuido) {
      setEtapaAtual(7)
    } else if (etapaAtual === 7 && !!dados.etapa7_respiracao && !!dados.etapa7_doencaPeriodontal) {
      // Sempre seguir sequência das sub-etapas
      if (dados.etapa7_doencaPeriodontal === 'leve') {
        setEtapaAtual(7.1)
      } else if (dados.etapa7_doencaPeriodontal === 'moderada') {
        setEtapaAtual(7.2)
      } else if (dados.etapa7_doencaPeriodontal === 'grave') {
        setEtapaAtual(7.3)
      } else {
        setEtapaAtual(8)
      }
    } else if (etapaAtual === 7.1 && !!dados.etapa7_1_tipoPerdaOsseaLeve) {
      if (dados.etapa7_1_tipoPerdaOsseaLeve === 'localizada') {
        setEtapaAtual(7.11)
      } else {
        setEtapaAtual(8)
      }
    } else if (etapaAtual === 7.2 && !!dados.etapa7_2_tipoPerdaOsseaModerada) {
      if (dados.etapa7_2_tipoPerdaOsseaModerada === 'localizada') {
        setEtapaAtual(7.21)
      } else {
        setEtapaAtual(8)
      }
    } else if (etapaAtual === 7.3 && !!dados.etapa7_3_tipoPerdaOsseaGrave) {
      if (dados.etapa7_3_tipoPerdaOsseaGrave === 'localizada') {
        setEtapaAtual(7.31)
      } else {
        setEtapaAtual(8)
      }
    } else if (etapaAtual === 7.11 && dados.etapa7_1_1_dentesPerdaOsseaLeve && dados.etapa7_1_1_dentesPerdaOsseaLeve.length > 0) {
      setEtapaAtual(8)
    } else if (etapaAtual === 7.21 && dados.etapa7_2_1_dentesPerdaOsseaModerada && dados.etapa7_2_1_dentesPerdaOsseaModerada.length > 0) {
      setEtapaAtual(8)
    } else if (etapaAtual === 7.31 && dados.etapa7_3_1_dentesPerdaOsseaGrave && dados.etapa7_3_1_dentesPerdaOsseaGrave.length > 0) {
      setEtapaAtual(8)
    } else if (etapaAtual === 8 && !!dados.etapa8_necessidadeTratamentoComplementar && !!dados.etapa8_queixaPrincipal) {
      if (dados.etapa8_necessidadeTratamentoComplementar === 'sim') {
        setEtapaAtual(8.1)
      } else {
        setEtapaAtual(9)
      }
    } else if (etapaAtual === 8.1 && dados.etapa8_1_tiposTratamentoComplementar && dados.etapa8_1_tiposTratamentoComplementar.length > 0) {
      setEtapaAtual(9)
    } else if (etapaAtual === 9 && !!dados.etapa9_tipoTratamento) {
      // Navegação complexa baseada no tipo de tratamento
      if (dados.etapa9_tipoTratamento === 'preventivo_interceptativo') {
        setEtapaAtual(9.1)
      } else if (dados.etapa9_tipoTratamento === 'ortopedico') {
        setEtapaAtual(9.2)
      } else if (dados.etapa9_tipoTratamento === 'corretivo') {
        setEtapaAtual(9.3)
      } else if (dados.etapa9_tipoTratamento === 'cirurgico') {
        setEtapaAtual(9.4)
      }
    } else if (etapaAtual === 9.1) {
      // Lógica para tratamento preventivo/interceptativo
      if (!dados.etapa9_1_1_aparatologiaPreventivo || dados.etapa9_1_1_aparatologiaPreventivo.length === 0) {
        return // Aguarda seleção
      }
      if (dados.etapa9_1_1_aparatologiaPreventivo.includes('intra_oral') && !dados.etapa9_1_1_1_tipoIntraOralPreventivo) {
        setEtapaAtual(9.11)
      } else if ((dados.etapa9_1_1_aparatologiaPreventivo.includes('extra_oral') && !dados.etapa9_1_1_especificacaoExtraOralPreventivo) ||
                 (dados.etapa9_1_1_1_tipoIntraOralPreventivo === 'convencional' && !dados.etapa9_1_1_1_especificacaoConvencionalPreventivo)) {
        // Aguarda especificação
        return
      } else {
        setEtapaAtual(9.12) // Exodontia
      }
    } else if (etapaAtual === 9.11 && !!dados.etapa9_1_1_1_tipoIntraOralPreventivo) {
      if (dados.etapa9_1_1_1_tipoIntraOralPreventivo === 'convencional' && !dados.etapa9_1_1_1_especificacaoConvencionalPreventivo) {
        return // Aguarda especificação
      }
      setEtapaAtual(9.12)
    } else if (etapaAtual === 9.12 && !!dados.etapa9_1_2_exodontiasPreventivo && !!dados.etapa9_1_2_prognosticoPreventivo) {
      if (dados.etapa9_1_2_exodontiasPreventivo === 'sim' && (!dados.etapa9_1_2_1_dentesExodontiaPreventivo || dados.etapa9_1_2_1_dentesExodontiaPreventivo.length === 0)) {
        setEtapaAtual(9.121)
      } else {
        setEtapaAtual(10)
      }
    } else if (etapaAtual === 9.121 && dados.etapa9_1_2_1_dentesExodontiaPreventivo && dados.etapa9_1_2_1_dentesExodontiaPreventivo.length > 0) {
      setEtapaAtual(10)
    } else if (etapaAtual === 9.2) {
      // Lógica para tratamento ortopédico
      if (!dados.etapa9_2_1_aparatologiaOrtopedico || dados.etapa9_2_1_aparatologiaOrtopedico.length === 0) {
        return
      }
      if (dados.etapa9_2_1_aparatologiaOrtopedico.includes('intra_oral') && !dados.etapa9_2_1_1_tipoIntraOralOrtopedico) {
        setEtapaAtual(9.21)
      } else if ((dados.etapa9_2_1_aparatologiaOrtopedico.includes('extra_oral') && !dados.etapa9_2_1_especificacaoExtraOralOrtopedico) ||
                 (dados.etapa9_2_1_1_tipoIntraOralOrtopedico === 'convencional' && !dados.etapa9_2_1_1_especificacaoConvencionalOrtopedico)) {
        return
      } else {
        setEtapaAtual(9.22) // Exodontia
      }
    } else if (etapaAtual === 9.21 && !!dados.etapa9_2_1_1_tipoIntraOralOrtopedico) {
      if (dados.etapa9_2_1_1_tipoIntraOralOrtopedico === 'convencional' && !dados.etapa9_2_1_1_especificacaoConvencionalOrtopedico) {
        return
      }
      setEtapaAtual(9.22)
    } else if (etapaAtual === 9.22 && !!dados.etapa9_2_2_exodontiasOrtopedico && !!dados.etapa9_2_2_prognosticoOrtopedico) {
      if (dados.etapa9_2_2_exodontiasOrtopedico === 'sim' && (!dados.etapa9_2_2_1_dentesExodontiaOrtopedico || dados.etapa9_2_2_1_dentesExodontiaOrtopedico.length === 0)) {
        setEtapaAtual(9.221)
      } else {
        setEtapaAtual(10)
      }
    } else if (etapaAtual === 9.221 && dados.etapa9_2_2_1_dentesExodontiaOrtopedico && dados.etapa9_2_2_1_dentesExodontiaOrtopedico.length > 0) {
      setEtapaAtual(10)
    } else if (etapaAtual === 9.3 && !!dados.etapa9_3_1_corretivoCombinado) {
      // Lógica para tratamento corretivo
      if (dados.etapa9_3_1_corretivoCombinado === 'sim') {
        setEtapaAtual(9.31)
      } else {
        setEtapaAtual(9.32) // Direto para exodontia
      }
    } else if (etapaAtual === 9.31 && !!dados.etapa9_3_1_1_tipoAparatologiaCorretivo) {
      if (dados.etapa9_3_1_1_tipoAparatologiaCorretivo === 'fixa') {
        setEtapaAtual(9.312)
      } else {
        setEtapaAtual(9.32)
      }
    } else if (etapaAtual === 9.312 && !!dados.etapa9_3_1_2_formatoAparatologiaFixaCorretivo) {
      setEtapaAtual(9.32)
    } else if (etapaAtual === 9.32 && !!dados.etapa9_3_2_exodontiasCorretivo && !!dados.etapa9_3_2_desgasteInterproximalCorretivo && !!dados.etapa9_3_2_prognosticoCorretivo) {
      if (dados.etapa9_3_2_exodontiasCorretivo === 'sim' && (!dados.etapa9_3_2_1_dentesExodontiaCorretivo || dados.etapa9_3_2_1_dentesExodontiaCorretivo.length === 0)) {
        setEtapaAtual(9.321)
      } else if (dados.etapa9_3_2_desgasteInterproximalCorretivo === 'sim' && (!dados.etapa9_3_3_1_dentesDesgasteCorretivo || dados.etapa9_3_3_1_dentesDesgasteCorretivo.length === 0)) {
        setEtapaAtual(9.331)
      } else {
        setEtapaAtual(10)
      }
    } else if (etapaAtual === 9.321 && dados.etapa9_3_2_1_dentesExodontiaCorretivo && dados.etapa9_3_2_1_dentesExodontiaCorretivo.length > 0) {
      if (dados.etapa9_3_2_desgasteInterproximalCorretivo === 'sim' && (!dados.etapa9_3_3_1_dentesDesgasteCorretivo || dados.etapa9_3_3_1_dentesDesgasteCorretivo.length === 0)) {
        setEtapaAtual(9.331)
      } else {
        setEtapaAtual(10)
      }
    } else if (etapaAtual === 9.331 && dados.etapa9_3_3_1_dentesDesgasteCorretivo && dados.etapa9_3_3_1_dentesDesgasteCorretivo.length > 0) {
      setEtapaAtual(10)
    } else if (etapaAtual === 9.4 && !!dados.etapa9_4_1_aparatologiaCirurgico) {
      // Lógica para tratamento cirúrgico
      if (dados.etapa9_4_1_aparatologiaCirurgico === 'fixa') {
        setEtapaAtual(9.41)
      } else if (dados.etapa9_4_1_aparatologiaCirurgico === 'ortopedico') {
        setEtapaAtual(9.412)
      } else {
        setEtapaAtual(9.42) // Alinhador vai direto
      }
    } else if (etapaAtual === 9.41 && !!dados.etapa9_4_1_1_formatoAparatologiaFixaCirurgico) {
      setEtapaAtual(9.42)
    } else if (etapaAtual === 9.412) {
      if (!dados.etapa9_4_1_2_aparatologiaOrtopedicoCirurgico || dados.etapa9_4_1_2_aparatologiaOrtopedicoCirurgico.length === 0) {
        return
      }
      if ((dados.etapa9_4_1_2_aparatologiaOrtopedicoCirurgico.includes('intra_oral') && !dados.etapa9_4_1_2_especificacaoIntraOralCirurgico) ||
          (dados.etapa9_4_1_2_aparatologiaOrtopedicoCirurgico.includes('extra_oral') && !dados.etapa9_4_1_2_especificacaoExtraOralCirurgico)) {
        return
      }
      setEtapaAtual(9.42)
    } else if (etapaAtual === 9.42 && !!dados.etapa9_4_2_exodontiasCirurgico && !!dados.etapa9_4_2_desgasteInterproximalCirurgico && !!dados.etapa9_4_2_prognosticoCirurgico) {
      if (dados.etapa9_4_2_exodontiasCirurgico === 'sim' && (!dados.etapa9_4_2_1_dentesExodontiaCirurgico || dados.etapa9_4_2_1_dentesExodontiaCirurgico.length === 0)) {
        setEtapaAtual(9.421)
      } else if (dados.etapa9_4_2_desgasteInterproximalCirurgico === 'sim' && (!dados.etapa9_4_3_1_dentesDesgasteCirurgico || dados.etapa9_4_3_1_dentesDesgasteCirurgico.length === 0)) {
        setEtapaAtual(9.431)
      } else {
        setEtapaAtual(10)
      }
    } else if (etapaAtual === 9.421 && dados.etapa9_4_2_1_dentesExodontiaCirurgico && dados.etapa9_4_2_1_dentesExodontiaCirurgico.length > 0) {
      if (dados.etapa9_4_2_desgasteInterproximalCirurgico === 'sim' && (!dados.etapa9_4_3_1_dentesDesgasteCirurgico || dados.etapa9_4_3_1_dentesDesgasteCirurgico.length === 0)) {
        setEtapaAtual(9.431)
      } else {
        setEtapaAtual(10)
      }
    } else if (etapaAtual === 9.431 && dados.etapa9_4_3_1_dentesDesgasteCirurgico && dados.etapa9_4_3_1_dentesDesgasteCirurgico.length > 0) {
      setEtapaAtual(10)
    } else if (etapaAtual === 10 && !!dados.etapa10_previsaoMeses && !!dados.etapa10_aparelhoPrevio) {
      if (dados.etapa10_aparelhoPrevio === 'sim' && !dados.etapa10_1_tempoAparelhoPrevio) {
        setEtapaAtual(10.1)
      } else {
        setEtapaAtual(11)
      }
    } else if (etapaAtual === 10.1 && !!dados.tempoAparelhoPrevio) {
      setEtapaAtual(11)
    } else if (etapaAtual === 11 && dados.etapa11_imagensInicio && dados.etapa11_imagensInicio.length > 0) {
      onContinuar(dados)
    }
  }

  // Exposição das funções via ref com forwarding para prorrogação
  useImperativeHandle(ref, () => {
    // Se for prorrogação, faz forwarding para o FormularioProrrogacao
    if (isProrrogacao && prorrogacaoRef.current) {
      return {
        proximaEtapa: () => {
          prorrogacaoRef.current.proximaEtapa()
        },
        podeContinuar: () => {
          return prorrogacaoRef.current.podeContinuar()
        }
      }
    }
    // Se não for prorrogação, usa as funções próprias
    return {
      proximaEtapa,
      podeContinuar
    }
  }, [isProrrogacao])

  // Notificar mudanças de estado para o componente pai
  useEffect(() => {
    // IMPORTANTE: Só chamar onStatusChange se NÃO for prorrogação
    // Em modo prorrogação, o FormularioProrrogacao é responsável por chamar onStatusChange
    if (onStatusChange && !isProrrogacao) {
      onStatusChange(podeContinuar(), etapaAtual)
    }
  }, [dados, etapaAtual, onStatusChange, isProrrogacao])

  const etapaAnterior = () => {
    if (etapaAtual === 2) {
      setEtapaAtual(1)
    } else if (etapaAtual === 2.1 || etapaAtual === 2.2) {
      setEtapaAtual(2)
    } else if (etapaAtual === 3) {
      if (dados.etapa2_classificacaoAngle === 'classe_i') {
        setEtapaAtual(2)
      } else if (dados.etapa2_classificacaoAngle === 'classe_ii') {
        setEtapaAtual(2.1)
      } else if (dados.etapa2_classificacaoAngle === 'classe_iii') {
        setEtapaAtual(2.2)
      }
    } else if (etapaAtual === 3.1) {
      setEtapaAtual(3)
    } else if (etapaAtual === 3.2) {
      if (dados.etapa3_linhaMediaCoincidente === 'nao' && dados.etapa3_1_desvioSuperior && dados.etapa3_1_desvioInferior) {
        setEtapaAtual(3.1)
      } else {
        setEtapaAtual(3)
      }
    } else if (etapaAtual === 3.21) {
      setEtapaAtual(3.2)
    } else if (etapaAtual === 4) {
      if (dados.etapa3_mordidaCruzada === 'sim' && dados.etapa3_2_cruzadaPosterior === 'sim' && dados.etapa3_2_1_tipoMordidaCruzada) {
        setEtapaAtual(3.21)
      } else if (dados.etapa3_mordidaCruzada === 'sim' && dados.etapa3_2_cruzadaAnterior && dados.etapa3_2_cruzadaPosterior) {
        setEtapaAtual(3.2)
      } else if (dados.etapa3_linhaMediaCoincidente === 'nao' && dados.etapa3_1_desvioSuperior && dados.etapa3_1_desvioInferior) {
        setEtapaAtual(3.1)
      } else {
        setEtapaAtual(3)
      }
    } else if (etapaAtual === 4.1) {
      setEtapaAtual(4)
    } else if (etapaAtual === 4.2) {
      if (dados.etapa4_trespasseHorizontal === 'inadequado' && dados.etapa4_1_medidaTrespasseHorizontal) {
        setEtapaAtual(4.1)
      } else {
        setEtapaAtual(4)
      }
    } else if (etapaAtual === 4.3) {
      if (dados.etapa4_trespasseHorizontal === 'inadequado' && dados.etapa4_1_medidaTrespasseHorizontal) {
        setEtapaAtual(4.1)
      } else {
        setEtapaAtual(4)
      }
    } else if (etapaAtual === 5) {
      if (dados.etapa4_trespasseVertical === 'mordida_aberta' && dados.etapa4_2_1_medidaMordidaAberta) {
        setEtapaAtual(4.2)
      } else if (dados.etapa4_trespasseVertical === 'sobremordida' && dados.etapa4_2_2_medidaSobremordida) {
        setEtapaAtual(4.3)
      } else if (dados.etapa4_trespasseHorizontal === 'inadequado' && dados.etapa4_1_medidaTrespasseHorizontal) {
        setEtapaAtual(4.1)
      } else {
        setEtapaAtual(4)
      }
    } else if (etapaAtual === 5.1 || etapaAtual === 5.2 || etapaAtual === 5.3) {
      setEtapaAtual(5)
    } else if (etapaAtual === 6) {
      if (dados.etapa5_giroversoes === 'presentes' && dados.etapa5_3_dentesGiroversoes && dados.etapa5_3_dentesGiroversoes.length > 0) {
        setEtapaAtual(5.3)
      } else if (dados.etapa5_apinhamento === 'presentes' && dados.etapa5_2_dentesApinhamento && dados.etapa5_2_dentesApinhamento.length > 0) {
        setEtapaAtual(5.2)
      } else if (dados.etapa5_diastemas === 'presentes' && dados.etapa5_1_dentesDiastemas && dados.etapa5_1_dentesDiastemas.length > 0) {
        setEtapaAtual(5.1)
      } else {
        setEtapaAtual(5)
      }
    } else if (etapaAtual === 6.1) {
      setEtapaAtual(6)
    } else if (etapaAtual === 7) {
      if (dados.etapa6_dorRuidoArticular === 'sim' && dados.etapa6_1_ladoDorRuido) {
        setEtapaAtual(6.1)
      } else {
        setEtapaAtual(6)
      }
    } else if (etapaAtual === 7.1 || etapaAtual === 7.2 || etapaAtual === 7.3) {
      setEtapaAtual(7)
    } else if (etapaAtual === 7.11 || etapaAtual === 7.21 || etapaAtual === 7.31) {
      if (etapaAtual === 7.11) {
        setEtapaAtual(7.1)
      } else if (etapaAtual === 7.21) {
        setEtapaAtual(7.2)
      } else {
        setEtapaAtual(7.3)
      }
    } else if (etapaAtual === 8) {
      // Voltar para a sub-etapa correta de doença periodontal ou etapa 7
      if (dados.etapa7_doencaPeriodontal === 'leve' && dados.etapa7_1_tipoPerdaOsseaLeve === 'localizada' && dados.etapa7_1_1_dentesPerdaOsseaLeve && dados.etapa7_1_1_dentesPerdaOsseaLeve.length > 0) {
        setEtapaAtual(7.11)
      } else if (dados.etapa7_doencaPeriodontal === 'moderada' && dados.etapa7_2_tipoPerdaOsseaModerada === 'localizada' && dados.etapa7_2_1_dentesPerdaOsseaModerada && dados.etapa7_2_1_dentesPerdaOsseaModerada.length > 0) {
        setEtapaAtual(7.21)
      } else if (dados.etapa7_doencaPeriodontal === 'grave' && dados.etapa7_3_tipoPerdaOsseaGrave === 'localizada' && dados.etapa7_3_1_dentesPerdaOsseaGrave && dados.etapa7_3_1_dentesPerdaOsseaGrave.length > 0) {
        setEtapaAtual(7.31)
      } else if (dados.etapa7_doencaPeriodontal === 'leve' && dados.etapa7_1_tipoPerdaOsseaLeve) {
        setEtapaAtual(7.1)
      } else if (dados.etapa7_doencaPeriodontal === 'moderada' && dados.etapa7_2_tipoPerdaOsseaModerada) {
        setEtapaAtual(7.2)
      } else if (dados.etapa7_doencaPeriodontal === 'grave' && dados.etapa7_3_tipoPerdaOsseaGrave) {
        setEtapaAtual(7.3)
      } else {
        setEtapaAtual(7)
      }
    } else if (etapaAtual === 8.1) {
      setEtapaAtual(8)
    } else if (etapaAtual === 9) {
      if (dados.etapa8_necessidadeTratamentoComplementar === 'sim' && dados.etapa8_1_tiposTratamentoComplementar) {
        setEtapaAtual(8.1)
      } else {
        setEtapaAtual(8)
      }
    } else if (etapaAtual === 9.1 || etapaAtual === 9.2 || etapaAtual === 9.3 || etapaAtual === 9.4) {
      setEtapaAtual(9)
    } else if (etapaAtual === 9.11 || etapaAtual === 9.21) {
      if (dados.etapa9_tipoTratamento === 'preventivo_interceptativo') {
        setEtapaAtual(9.1)
      } else {
        setEtapaAtual(9.2)
      }
    } else if (etapaAtual === 9.12 || etapaAtual === 9.22) {
      if (dados.etapa9_tipoTratamento === 'preventivo_interceptativo') {
        setEtapaAtual(9.11)
      } else {
        setEtapaAtual(9.21)
      }
    } else if (etapaAtual === 9.121 || etapaAtual === 9.221) {
      if (dados.etapa9_tipoTratamento === 'preventivo_interceptativo') {
        setEtapaAtual(9.12)
      } else {
        setEtapaAtual(9.22)
      }
    } else if (etapaAtual === 9.31) {
      setEtapaAtual(9.3)
    } else if (etapaAtual === 9.312) {
      setEtapaAtual(9.31)
    } else if (etapaAtual === 9.32) {
      if (dados.tipoAparatologia === 'fixa') {
        setEtapaAtual(9.312)
      } else {
        setEtapaAtual(9.31)
      }
    } else if (etapaAtual === 9.321 || etapaAtual === 9.331) {
      setEtapaAtual(9.32)
    } else if (etapaAtual === 9.41 || etapaAtual === 9.412) {
      setEtapaAtual(9.4)
    } else if (etapaAtual === 9.42) {
      if (dados.tipoAparatologia === 'fixa') {
        setEtapaAtual(9.41)
      } else if (dados.tipoAparatologia === 'ortopedico') {
        setEtapaAtual(9.412)
      } else {
        setEtapaAtual(9.4)
      }
    } else if (etapaAtual === 9.421 || etapaAtual === 9.431) {
      setEtapaAtual(9.42)
    } else if (etapaAtual === 10) {
      setEtapaAtual(9)
    } else if (etapaAtual === 10.1) {
      setEtapaAtual(10)
    } else if (etapaAtual === 11) {
      if (dados.aparelhoPrevio === 'sim' && dados.tempoAparelhoPrevio) {
        setEtapaAtual(10.1)
      } else {
        setEtapaAtual(10)
      }
    }
    // Navegação interna - não chama onVoltar() que é para o botão externo
  }

  // Função para renderizar cards de opção
  const renderCard = (opcao: any, valorSelecionado: string, onSelecionar: (valor: string) => void) => (
    <div
      key={opcao.id}
      className={`
        relative bg-white border-2 rounded-xl px-4 py-4 cursor-pointer transition-all duration-300 hover:shadow-lg flex items-center justify-center
        w-[180px] h-[60px]
        ${valorSelecionado === opcao.id
          ? 'border-[#F05223] bg-[#F05223]/5 shadow-md transform scale-[1.02]'
          : 'border-[#EAE7EC] hover:border-[#F05223] hover:bg-[#F05223]/5'
        }
      `}
      onClick={() => onSelecionar(opcao.id)}
    >
      <h4 className={`
        text-base font-medium transition-colors duration-300 text-center
        ${valorSelecionado === opcao.id ? 'text-[#F05223]' : 'text-gray-900'}
      `}>
        {opcao.titulo}
      </h4>
    </div>
  )



  // Função para verificar se pode continuar

  const podeContinuar = () => {
    // ========================================
    // ETAPA 1: Fase do Tratamento
    // ========================================
    if (etapaAtual === 1) return !!dados.etapa1_faseTratamento
    
    // ========================================
    // ETAPA 2: Classificação de Angle e Padrão Facial
    // ========================================
    if (etapaAtual === 2) return !!dados.etapa2_classificacaoAngle && !!dados.etapa2_padraoFacial
    
    // ========================================
    // ETAPA 2.1: Especificação Classe II
    // ========================================
    if (etapaAtual === 2.1) return !!dados.etapa2_1_classeIIDivisao && !!dados.etapa2_1_classeIISubdivisao
    
    // ========================================
    // ETAPA 2.2: Especificação Classe III
    // ========================================
    if (etapaAtual === 2.2) return !!dados.etapa2_2_classeIIISubdivisao
    
    // ========================================
    // ETAPA 3: Linha Média e Mordida Cruzada
    // ========================================
    if (etapaAtual === 3) return !!dados.etapa3_linhaMediaCoincidente && !!dados.etapa3_mordidaCruzada
    
    // ========================================
    // ETAPA 3.1: Linha Média NÃO Coincidente
    // ========================================
    if (etapaAtual === 3.1) return !!dados.etapa3_1_desvioSuperior && !!dados.etapa3_1_desvioInferior
    
    // ========================================
    // ETAPA 3.2: Mordida Cruzada SIM
    // ========================================
    if (etapaAtual === 3.2) return !!dados.etapa3_2_cruzadaAnterior && !!dados.etapa3_2_cruzadaPosterior
    
    // ========================================
    // ETAPA 3.2.1: Cruzada Posterior SIM
    // ========================================
    if (etapaAtual === 3.21) return !!dados.etapa3_2_1_tipoMordidaCruzada
    
    // ========================================
    // ETAPA 4: Trespasse Horizontal e Vertical
    // ========================================
    if (etapaAtual === 4) return !!dados.etapa4_trespasseHorizontal && !!dados.etapa4_trespasseVertical
    
    // ========================================
    // ETAPA 4.1: Trespasse Horizontal INADEQUADO
    // ========================================
    if (etapaAtual === 4.1) return !!dados.etapa4_1_medidaTrespasseHorizontal
    
    // ========================================
    // ETAPA 4.2.1: Trespasse Vertical MORDIDA ABERTA
    // ========================================
    if (etapaAtual === 4.2) return !!dados.etapa4_2_1_medidaMordidaAberta
    
    // ========================================
    // ETAPA 4.2.2: Trespasse Vertical SOBREMORDIDA
    // ========================================
    if (etapaAtual === 4.3) return !!dados.etapa4_2_2_medidaSobremordida
    
    // ========================================
    // ETAPA 5: Diastemas, Apinhamento e Giroversões
    // ========================================
    if (etapaAtual === 5) return !!dados.etapa5_diastemas && !!dados.etapa5_apinhamento && !!dados.etapa5_giroversoes
    
    // ========================================
    // ETAPA 5.1: Diastemas PRESENTES
    // ========================================
    if (etapaAtual === 5.1) return !!(dados.etapa5_1_dentesDiastemas && dados.etapa5_1_dentesDiastemas.length > 0)
    
    // ========================================
    // ETAPA 5.2: Apinhamento PRESENTES
    // ========================================
    if (etapaAtual === 5.2) return !!(dados.etapa5_2_dentesApinhamento && dados.etapa5_2_dentesApinhamento.length > 0)
    
    // ========================================
    // ETAPA 5.3: Giroversões PRESENTES
    // ========================================
    if (etapaAtual === 5.3) return !!(dados.etapa5_3_dentesGiroversoes && dados.etapa5_3_dentesGiroversoes.length > 0)
    
    // ========================================
    // ETAPA 6: Dor/Ruído Articular, Bruxismo e Apertamento
    // ========================================
    if (etapaAtual === 6) return !!dados.etapa6_dorRuidoArticular && !!dados.etapa6_bruxismo && !!dados.etapa6_apertamento
    
    // ========================================
    // ETAPA 6.1: Dor/Ruído Articular SIM
    // ========================================
    if (etapaAtual === 6.1) return !!dados.etapa6_1_ladoDorRuido
    
    // ========================================
    // ETAPA 7: Respiração e Doença Periodontal
    // ========================================
    if (etapaAtual === 7) return !!dados.etapa7_respiracao && !!dados.etapa7_doencaPeriodontal
    
    // ========================================
    // ETAPA 7.1: Doença Periodontal LEVE
    // ========================================
    if (etapaAtual === 7.1) return !!dados.etapa7_1_tipoPerdaOsseaLeve
    
    // ========================================
    // ETAPA 7.1.1: Perda Óssea Leve LOCALIZADA
    // ========================================
    if (etapaAtual === 7.11) return !!(dados.etapa7_1_1_dentesPerdaOsseaLeve && dados.etapa7_1_1_dentesPerdaOsseaLeve.length > 0)
    
    // ========================================
    // ETAPA 7.2: Doença Periodontal MODERADA
    // ========================================
    if (etapaAtual === 7.2) return !!dados.etapa7_2_tipoPerdaOsseaModerada
    
    // ========================================
    // ETAPA 7.2.1: Perda Óssea Moderada LOCALIZADA
    // ========================================
    if (etapaAtual === 7.21) return !!(dados.etapa7_2_1_dentesPerdaOsseaModerada && dados.etapa7_2_1_dentesPerdaOsseaModerada.length > 0)
    
    // ========================================
    // ETAPA 7.3: Doença Periodontal GRAVE
    // ========================================
    if (etapaAtual === 7.3) return !!dados.etapa7_3_tipoPerdaOsseaGrave
    
    // ========================================
    // ETAPA 7.3.1: Perda Óssea Grave LOCALIZADA
    // ========================================
    if (etapaAtual === 7.31) return !!(dados.etapa7_3_1_dentesPerdaOsseaGrave && dados.etapa7_3_1_dentesPerdaOsseaGrave.length > 0)
    
    // ========================================
    // ETAPA 8: Necessidade de Tratamento Complementar
    // ========================================
    if (etapaAtual === 8) return !!dados.etapa8_necessidadeTratamentoComplementar && !!dados.etapa8_queixaPrincipal && dados.etapa8_queixaPrincipal.trim().length > 0
    
    // ========================================
    // ETAPA 8.1: Tratamento Complementar SIM
    // ========================================
    if (etapaAtual === 8.1) return !!(dados.etapa8_1_tiposTratamentoComplementar && dados.etapa8_1_tiposTratamentoComplementar.length > 0)
    
    // ========================================
    // ETAPA 9: Tipo de Tratamento
    // ========================================
    if (etapaAtual === 9) return !!dados.etapa9_tipoTratamento
    
    // ========================================
    // ETAPA 9.1: Tratamento PREVENTIVO/INTERCEPTATIVO - Aparatologia
    // ========================================
    if (etapaAtual === 9.1) return !!(dados.etapa9_1_1_aparatologiaPreventivo && dados.etapa9_1_1_aparatologiaPreventivo.length > 0)
    
    // ========================================
    // ETAPA 9.1.1: Preventivo INTRA ORAL (9.11)
    // ========================================
    if (etapaAtual === 9.11) return !!dados.etapa9_1_1_1_tipoIntraOralPreventivo
    
    // ========================================
    // ETAPA 9.1.2: Preventivo EXODONTIA E PROGNÓSTICO (9.12)
    // ========================================
    if (etapaAtual === 9.12) return !!dados.etapa9_1_2_exodontiasPreventivo && !!dados.etapa9_1_2_prognosticoPreventivo
    
    // ========================================
    // ETAPA 9.1.2.1: Exodontias Preventivo SIM (9.121)
    // ========================================
    if (etapaAtual === 9.121) return !!(dados.etapa9_1_2_1_dentesExodontiaPreventivo && dados.etapa9_1_2_1_dentesExodontiaPreventivo.length > 0)
    
    // ========================================
    // ETAPA 9.2: Tratamento ORTOPÉDICO - Aparatologia
    // ========================================
    if (etapaAtual === 9.2) return !!(dados.etapa9_2_1_aparatologiaOrtopedico && dados.etapa9_2_1_aparatologiaOrtopedico.length > 0)
    
    // ========================================
    // ETAPA 9.2.1: Ortopédico INTRA ORAL (9.21)
    // ========================================
    if (etapaAtual === 9.21) return !!dados.etapa9_2_1_1_tipoIntraOralOrtopedico
    
    // ========================================
    // ETAPA 9.2.2: Ortopédico EXODONTIA E PROGNÓSTICO (9.22)
    // ========================================
    if (etapaAtual === 9.22) return !!dados.etapa9_2_2_exodontiasOrtopedico && !!dados.etapa9_2_2_prognosticoOrtopedico
    
    // ========================================
    // ETAPA 9.2.2.1: Exodontias Ortopédico SIM (9.221)
    // ========================================
    if (etapaAtual === 9.221) return !!(dados.etapa9_2_2_1_dentesExodontiaOrtopedico && dados.etapa9_2_2_1_dentesExodontiaOrtopedico.length > 0)
    
    // ========================================
    // ETAPA 9.3: Tratamento CORRETIVO - É compositório?
    // ========================================
    if (etapaAtual === 9.3) return !!dados.etapa9_3_1_corretivoCombinado
    
    // ========================================
    // ETAPA 9.3.1: Corretivo TIPO DE APARATOLOGIA (9.31)
    // ========================================
    if (etapaAtual === 9.31) return !!dados.etapa9_3_1_1_tipoAparatologiaCorretivo
    
    // ========================================
    // ETAPA 9.3.1.2: Corretivo Aparatologia FIXA (9.312)
    // ========================================
    if (etapaAtual === 9.312) return !!dados.etapa9_3_1_2_formatoAparatologiaFixaCorretivo
    
    // ========================================
    // ETAPA 9.3.2: Corretivo EXODONTIA, DESGASTE E PROGNÓSTICO
    // ========================================
    if (etapaAtual === 9.32) return !!dados.etapa9_3_2_exodontiasCorretivo && !!dados.etapa9_3_2_desgasteInterproximalCorretivo && !!dados.etapa9_3_2_prognosticoCorretivo
    
    // ========================================
    // ETAPA 9.3.2.1: Exodontias Corretivo SIM
    // ========================================
    if (etapaAtual === 9.321) return !!(dados.etapa9_3_2_1_dentesExodontiaCorretivo && dados.etapa9_3_2_1_dentesExodontiaCorretivo.length > 0)
    
    // ========================================
    // ETAPA 9.3.3.1: Desgaste Interproximal Corretivo SIM
    // ========================================
    if (etapaAtual === 9.331) return !!(dados.etapa9_3_3_1_dentesDesgasteCorretivo && dados.etapa9_3_3_1_dentesDesgasteCorretivo.length > 0)
    
    // ========================================
    // ETAPA 9.4: Tratamento CIRÚRGICO - Aparatologia
    // ========================================
    if (etapaAtual === 9.4) return !!dados.etapa9_4_1_aparatologiaCirurgico
    
    // ========================================
    // ETAPA 9.4.1: Cirúrgico FORMATO APARATOLOGIA FIXA (9.41)
    // ========================================
    if (etapaAtual === 9.41) return !!dados.etapa9_4_1_1_formatoAparatologiaFixaCirurgico
    
    
    // ========================================
    // ETAPA 9.4.1.2: Cirúrgico Aparatologia ORTOPÉDICO
    // ========================================
    if (etapaAtual === 9.412) return !!(dados.etapa9_4_1_2_aparatologiaOrtopedicoCirurgico && dados.etapa9_4_1_2_aparatologiaOrtopedicoCirurgico.length > 0)
    
    // ========================================
    // ETAPA 9.4.2: Cirúrgico EXODONTIA, DESGASTE E PROGNÓSTICO
    // ========================================
    if (etapaAtual === 9.42) return !!dados.etapa9_4_2_exodontiasCirurgico && !!dados.etapa9_4_2_desgasteInterproximalCirurgico && !!dados.etapa9_4_2_prognosticoCirurgico
    
    // ========================================
    // ETAPA 9.4.2.1: Exodontias Cirúrgico SIM
    // ========================================
    if (etapaAtual === 9.421) return !!(dados.etapa9_4_2_1_dentesExodontiaCirurgico && dados.etapa9_4_2_1_dentesExodontiaCirurgico.length > 0)
    
    // ========================================
    // ETAPA 9.4.3.1: Desgaste Interproximal Cirúrgico SIM
    // ========================================
    if (etapaAtual === 9.431) return !!(dados.etapa9_4_3_1_dentesDesgasteCirurgico && dados.etapa9_4_3_1_dentesDesgasteCirurgico.length > 0)
    
    // ========================================
    // ETAPA 10: Previsão para Finalização do Tratamento
    // ========================================
    if (etapaAtual === 10) return !!dados.etapa10_previsaoMeses && !!dados.etapa10_aparelhoPrevio
    
    // ========================================
    // ETAPA 10.1: Aparelho Prévio SIM
    // ========================================
    if (etapaAtual === 10.1) return !!dados.etapa10_1_tempoAparelhoPrevio
    
    // ========================================
    // ETAPA 11: Upload de Imagens
    // ========================================
    if (etapaAtual === 11) return !!(dados.etapa11_imagensInicio && dados.etapa11_imagensInicio.length > 0)
    
    return false
  }

  
  // Função para calcular progresso
  const calcularProgresso = () => {
    const etapasCompletas = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].filter(etapa => etapaAtual >= etapa).length
    const totalEtapas = 11
    return { etapasCompletas, totalEtapas, percentual: Math.round((etapasCompletas / totalEtapas) * 100) }
  }

  const progresso = calcularProgresso()

  // If it's a prorogation request, render the specific prorogation form
  if (isProrrogacao) {
    return (
      <FormularioProrrogacao
        onContinuar={onContinuar}
        onVoltar={onVoltar}
        onStatusChange={onStatusChange}
        ref={prorrogacaoRef}
      />
    )
  }

  return (
    <div className="space-y-8">
      {/* Cabeçalho dinâmico com barra de progresso */}
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Pré-Aprovação de Ortodontia
          </h3>
        <p className="text-sm text-gray-600">
          {etapaAtual === 1 && "Selecione a fase do tratamento ortodôntico"}
          {etapaAtual === 2 && "Selecione a classificação de Angle e o padrão facial"}
          {etapaAtual === 2.1 && "Configuração da Classe II"}
          {etapaAtual === 2.2 && "Configuração da Classe III"}
          {etapaAtual === 3 && "Informações sobre linha média e mordida"}
          {etapaAtual === 3.1 && "Especifique os desvios de linha média"}
          {etapaAtual === 3.2 && "Especifique o tipo de mordida cruzada"}
          {etapaAtual === 3.21 && "Selecione o tipo de mordida cruzada posterior"}
          {etapaAtual === 4 && "Informações sobre trespasse horizontal e vertical"}
          {etapaAtual === 4.1 && "Assinale a medida do trespasse horizontal"}
          {etapaAtual === 4.2 && "Assinale a medida do trespasse vertical"}
          {etapaAtual === 5 && "Presença de diastemas, apinhamento e giroversões"}
          {etapaAtual === 5.1 && "Selecione os dentes com diastemas"}
          {etapaAtual === 5.2 && "Selecione os dentes com apinhamento"}
          {etapaAtual === 5.3 && "Selecione os dentes com giroversões"}
          {etapaAtual === 6 && "Informações sobre dor articular, bruxismo e apertamento"}
          {etapaAtual === 6.1 && "Selecione o lado da dor ou ruído"}
          {etapaAtual === 7 && "Informações sobre respiração e doença periodontal"}
          {(etapaAtual === 7.1 || etapaAtual === 7.2 || etapaAtual === 7.3) && "Tipo de perda óssea"}
          {(etapaAtual === 7.11 || etapaAtual === 7.21 || etapaAtual === 7.31) && "Selecione os dentes com perda óssea"}
          {etapaAtual === 8 && "Necessidade de tratamento complementar"}
          {etapaAtual === 8.1 && "Tipos de tratamento complementar"}
          {etapaAtual === 9 && "Selecione o tipo de tratamento"}
          {etapaAtual === 9.1 && "Tratamento Preventivo/Interceptativo - Aparatologia"}
          {etapaAtual === 9.11 && "Tipo de aparelho intra oral"}
          {etapaAtual === 9.12 && "Exodontias e prognóstico"}
          {etapaAtual === 9.121 && "Selecione os dentes para exodontia"}
          {etapaAtual === 9.2 && "Tratamento Ortopédico - Aparatologia"}
          {etapaAtual === 9.21 && "Tipo de aparelho intra oral"}
          {etapaAtual === 9.22 && "Exodontias e prognóstico"}
          {etapaAtual === 9.221 && "Selecione os dentes para exodontia"}
          {etapaAtual === 9.3 && "Tratamento Corretivo - É compositório?"}
          {etapaAtual === 9.31 && "Tipo de aparatologia"}
          {etapaAtual === 9.312 && "Formato da aparatologia fixa"}
          {etapaAtual === 9.32 && "Exodontias, desgaste e prognóstico"}
          {etapaAtual === 9.321 && "Selecione os dentes para exodontia"}
          {etapaAtual === 9.331 && "Selecione os dentes para desgaste"}
          {etapaAtual === 9.4 && "Tratamento Cirúrgico - Aparatologia"}
          {etapaAtual === 9.41 && "Formato da aparatologia fixa"}
          {etapaAtual === 9.412 && "Tratamento ortopédico - Especificações"}
          {etapaAtual === 9.42 && "Exodontias, desgaste e prognóstico"}
          {etapaAtual === 9.421 && "Selecione os dentes para exodontia"}
          {etapaAtual === 9.431 && "Selecione os dentes para desgaste"}
          {etapaAtual === 10 && "Previsão para finalização do tratamento"}
          {etapaAtual === 10.1 && "Tempo com aparelho instalado"}
          {etapaAtual === 11 && "Envie as imagens do início do tratamento"}
        </p>
        </div>
        
        {/* Barra de progresso compacta */}
        <div className="flex flex-col items-end gap-1">
          <div className="text-xs text-gray-500 font-medium">
            {progresso.etapasCompletas}/{progresso.totalEtapas} etapas
          </div>
          <div className="w-32 bg-gray-200 rounded-full h-2">
            <div 
              className="bg-[#F05223] h-2 rounded-full transition-all duration-300 ease-out"
              style={{ width: `${progresso.percentual}%` }}
            />
          </div>
        </div>
      </div>

      {/* Conteúdo das etapas */}
      <div className="space-y-4">
        {/* Placeholder para Prorrogação */}
        {isProrrogacao ? (
          <div className="flex flex-col items-center justify-center py-16 px-8 text-center">
            <div className="bg-blue-50 rounded-full p-4 mb-6">
              <div className="bg-blue-100 rounded-full p-3">
                <div className="text-blue-600 text-2xl">🔧</div>
              </div>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              Formulário em Desenvolvimento
            </h3>
            <p className="text-gray-600 mb-4 max-w-md">
              O formulário específico para <strong>Prorrogação de Ortodontia</strong> está sendo desenvolvido e será implementado em breve.
            </p>
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 text-sm text-gray-700">
              <strong>Aguardando formulário</strong> personalizado para este procedimento
            </div>
          </div>
        ) : (
          <>
            {/* Etapa 1: Fase do Tratamento */}
            {etapaAtual === 1 && (
          <>
            <Label className="text-sm font-medium text-gray-700">
              Selecione a fase do tratamento
            </Label>
            <div className="flex flex-wrap gap-4 max-w-4xl">
              {fasesTratamento.map((fase) => 
                renderCard(fase, dados.etapa1_faseTratamento, handleSelecionarFase)
              )}
            </div>
          </>
        )}

        {/* Etapa 2: Classificação de Angle e Padrão Facial */}
        {etapaAtual === 2 && (
          <>
            <div className="space-y-6">
              {/* Classificação de Angle */}
              <div>
                <Label className="text-sm font-medium text-gray-700">
                  Classificação de Angle
                </Label>
                <div className="flex flex-wrap gap-4 max-w-4xl mt-3">
                  {classificacoesAngle.map((classificacao) => 
                    renderCard(classificacao, dados.etapa2_classificacaoAngle, handleSelecionarClassificacao)
                  )}
                </div>
              </div>

              {/* Padrão Facial */}
              <div>
                <Label className="text-sm font-medium text-gray-700">
                  Padrão facial
                </Label>
                <div className="flex flex-wrap gap-4 max-w-5xl mt-3">
                  {padroesFaciais.map((padrao) => 
                    renderCard(padrao, dados.etapa2_padraoFacial || '', handleSelecionarPadraoFacial)
                  )}
                </div>
              </div>
            </div>
          </>
        )}

        {/* Etapa 2.1: Classe II Específica */}
        {etapaAtual === 2.1 && (
          <>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
              <h4 className="text-sm font-medium text-blue-800 mb-1">Classe II Selecionada</h4>
              <p className="text-sm text-blue-700">Configure as especificações da Classe II</p>
            </div>

            <div className="space-y-6">
              {/* Divisão da Classe II */}
              <div>
                <Label className="text-sm font-medium text-gray-700">
                  Selecione a divisão da classe
                </Label>
                <div className="flex flex-wrap gap-4 max-w-4xl mt-3">
                  {divisoesClasseII.map((divisao) => 
                    renderCard(divisao, dados.etapa2_1_classeIIDivisao || '', handleSelecionarDivisaoII)
                  )}
                </div>
              </div>

              {/* Subdivisão da Classe II */}
              <div>
                <Label className="text-sm font-medium text-gray-700">
                  Escolha a subdivisão
                </Label>
                <div className="flex flex-wrap gap-4 max-w-4xl mt-3">
                  {subdivisoes.map((subdivisao) => 
                    renderCard(subdivisao, dados.etapa2_1_classeIISubdivisao || '', handleSelecionarSubdivisaoII)
                  )}
                </div>
              </div>
            </div>
          </>
        )}

        {/* Etapa 2.2: Classe III Específica */}
        {etapaAtual === 2.2 && (
          <>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
              <h4 className="text-sm font-medium text-blue-800 mb-1">Classe III Selecionada</h4>
              <p className="text-sm text-blue-700">Configure as especificações da Classe III</p>
            </div>

            <div>
              <Label className="text-sm font-medium text-gray-700">
                Escolha a subdivisão
              </Label>
              <div className="flex flex-wrap gap-4 max-w-4xl mt-3">
                {subdivisoes.map((subdivisao) => 
                  renderCard(subdivisao, dados.etapa2_2_classeIIISubdivisao || '', handleSelecionarSubdivisaoIII)
                )}
              </div>
            </div>
          </>
        )}

        {/* Etapa 3: Linha Média e Mordida */}
        {etapaAtual === 3 && (
          <>
            <div className="space-y-6">
              {/* Linha Média Coincidente */}
              <div>
                <Label className="text-sm font-medium text-gray-700">
                  Linha Média Coincidente
                </Label>
                <div className="flex flex-wrap gap-3 max-w-lg mt-3">
                  {opcoesSimNao.map((opcao) => 
                    renderCard(opcao, dados.etapa3_linhaMediaCoincidente || '', handleSelecionarLinhaMedia)
                  )}
                </div>
              </div>

              {/* Mordida Cruzada */}
              <div>
                <Label className="text-sm font-medium text-gray-700">
                  Mordida Cruzada
                </Label>
                <div className="flex flex-wrap gap-3 max-w-lg mt-3">
                  {opcoesSimNao.map((opcao) => 
                    renderCard(opcao, dados.etapa3_mordidaCruzada || '', handleSelecionarMordida)
                  )}
                </div>
              </div>
            </div>
          </>
        )}

        {/* Etapa 3.1: Desvios de Linha Média */}
        {etapaAtual === 3.1 && (
          <>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
              <h4 className="text-sm font-medium text-blue-800 mb-1">Linha Média Não Coincidente</h4>
              <p className="text-sm text-blue-700">Especifique os desvios superior e inferior</p>
            </div>

            <div className="space-y-6">
              {/* Desvio Superior */}
              <div>
                <Label className="text-sm font-medium text-gray-700">
                  Desvio superior
                </Label>
                <div className="flex flex-wrap gap-3 mt-3">
                  {opcoesDesvio.map((opcao) => 
                    renderCard(opcao, dados.etapa3_1_desvioSuperior || '', handleSelecionarDesvioSuperior)
                  )}
                </div>
              </div>

              {/* Desvio Inferior */}
              <div>
                <Label className="text-sm font-medium text-gray-700">
                  Desvio inferior
                </Label>
                <div className="flex flex-wrap gap-3 mt-3">
                  {opcoesDesvio.map((opcao) => 
                    renderCard(opcao, dados.etapa3_1_desvioInferior || '', handleSelecionarDesvioInferior)
                  )}
                </div>
              </div>
            </div>
          </>
        )}

        {/* Etapa 3.2: Mordida Cruzada Específica */}
        {etapaAtual === 3.2 && (
          <>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
              <h4 className="text-sm font-medium text-blue-800 mb-1">Mordida Cruzada Presente</h4>
              <p className="text-sm text-blue-700">Especifique o tipo de mordida cruzada</p>
            </div>

            <div className="space-y-6">
              {/* Cruzada Anterior */}
              <div>
                <Label className="text-sm font-medium text-gray-700">
                  Cruzada anterior
                </Label>
                <div className="flex flex-wrap gap-3 max-w-lg mt-3">
                  {opcoesSimNao.map((opcao) => 
                    renderCard(opcao, dados.etapa3_2_cruzadaAnterior || '', handleSelecionarCruzadaAnterior)
                  )}
                </div>
              </div>

              {/* Cruzada Posterior */}
              <div>
                <Label className="text-sm font-medium text-gray-700">
                  Cruzada posterior
                </Label>
                <div className="flex flex-wrap gap-3 max-w-lg mt-3">
                  {opcoesSimNao.map((opcao) => 
                    renderCard(opcao, dados.etapa3_2_cruzadaPosterior || '', handleSelecionarCruzadaPosterior)
                  )}
                </div>
              </div>
            </div>
          </>
        )}

        {/* Etapa 3.2.1: Tipo de Mordida Cruzada Posterior */}
        {etapaAtual === 3.21 && (
          <>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
              <h4 className="text-sm font-medium text-blue-800 mb-1">Mordida Cruzada Posterior</h4>
              <p className="text-sm text-blue-700">Selecione o tipo de mordida</p>
            </div>

            <div>
              <Label className="text-sm font-medium text-gray-700">
                Selecione o tipo de mordida
              </Label>
              <div className="flex flex-wrap gap-4 max-w-4xl mt-3">
                {tiposMordidaCruzada.map((tipo) => 
                  renderCard(tipo, dados.etapa3_2_1_tipoMordidaCruzada || '', handleSelecionarTipoMordidaCruzada)
                )}
              </div>
            </div>
          </>
        )}

        {/* Etapa 4: Trespasse */}
        {etapaAtual === 4 && (
          <>
            <div className="space-y-6">
              {/* Trespasse horizontal (overjet) */}
              <div>
                <Label className="text-sm font-medium text-gray-700">
                  Trespasse horizontal (sobressaliência/overjet)
                </Label>
                <div className="flex flex-wrap gap-3 max-w-lg mt-3">
                  {opcoesTrespasseHorizontal.map((opcao) => 
                    renderCard(opcao, dados.etapa4_trespasseHorizontal || '', handleSelecionarOverjet)
                  )}
                </div>
              </div>

              {/* Trespasse vertical (overbite) */}
              <div>
                <Label className="text-sm font-medium text-gray-700">
                  Trespasse vertical (sobremordida/overbite)
                </Label>
                <div className="flex flex-wrap gap-4 max-w-4xl mt-3">
                  {opcoesTrespasseVertical.map((opcao) => 
                    renderCard(opcao, dados.etapa4_trespasseVertical || '', handleSelecionarOverbite)
                  )}
                </div>
              </div>
            </div>
          </>
        )}

        {/* Etapa 4.1: Medida do Trespasse Horizontal Inadequado */}
        {etapaAtual === 4.1 && (
          <>
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
              <h4 className="text-sm font-medium text-yellow-800 mb-1">Trespasse Horizontal Inadequado</h4>
              <p className="text-sm text-yellow-700">Assinale a medida do trespasse horizontal</p>
            </div>

            <div>
              <Label className="text-sm font-medium text-gray-700">
                Assinale a medida do trespasse horizontal
              </Label>
              <div className="flex gap-px max-w-lg mt-3">
                <div className="flex flex-col gap-2 flex-1">
                  {medidasTrespasseEsquerda.map((medida) => 
                    renderCard(medida, dados.etapa4_1_medidaTrespasseHorizontal || '', handleSelecionarMedidaOverjet)
                  )}
                </div>
                <div className="flex flex-col gap-2 flex-1">
                  {medidasTrespasseDireita.map((medida) => 
                    renderCard(medida, dados.etapa4_1_medidaTrespasseHorizontal || '', handleSelecionarMedidaOverjet)
                  )}
                </div>
              </div>
            </div>
          </>
        )}

        {/* Etapa 4.2: Medida da Mordida Aberta */}
        {etapaAtual === 4.2 && (
          <>
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
              <h4 className="text-sm font-medium text-yellow-800 mb-1">Mordida Aberta</h4>
              <p className="text-sm text-yellow-700">Assinale a medida da mordida aberta</p>
            </div>

            <div>
              <Label className="text-sm font-medium text-gray-700">
                Assinale a medida da mordida aberta
              </Label>
              <div className="flex gap-px max-w-lg mt-3">
                <div className="flex flex-col gap-2 flex-1">
                  {medidasVerticalEsquerda.map((medida) => 
                    renderCard(medida, dados.etapa4_2_1_medidaMordidaAberta || '', handleSelecionarMedidaMordidaAberta)
                  )}
                </div>
                <div className="flex flex-col gap-2 flex-1">
                  {medidasVerticalDireita.map((medida) => 
                    renderCard(medida, dados.etapa4_2_1_medidaMordidaAberta || '', handleSelecionarMedidaMordidaAberta)
                  )}
                </div>
              </div>
            </div>
          </>
        )}

        {/* Etapa 4.3: Medida da Sobremordida */}
        {etapaAtual === 4.3 && (
          <>
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
              <h4 className="text-sm font-medium text-yellow-800 mb-1">Sobremordida</h4>
              <p className="text-sm text-yellow-700">Assinale a medida da sobremordida</p>
            </div>

            <div>
              <Label className="text-sm font-medium text-gray-700">
                Assinale a medida da sobremordida
              </Label>
              <div className="flex gap-px max-w-lg mt-3">
                <div className="flex flex-col gap-2 flex-1">
                  {medidasVerticalEsquerda.map((medida) => 
                    renderCard(medida, dados.etapa4_2_2_medidaSobremordida || '', handleSelecionarMedidaSobremordida)
                  )}
                </div>
                <div className="flex flex-col gap-2 flex-1">
                  {medidasVerticalDireita.map((medida) => 
                    renderCard(medida, dados.etapa4_2_2_medidaSobremordida || '', handleSelecionarMedidaSobremordida)
                  )}
                </div>
              </div>
            </div>
          </>
        )}

        {/* Etapa 5: Diastemas, Apinhamento e Giroversões */}
        {etapaAtual === 5 && (
          <>
            <div className="space-y-6">
              {/* Diastemas */}
              <div>
                <Label className="text-sm font-medium text-gray-700">
                  Diastemas
                </Label>
                <div className="flex flex-wrap gap-3 max-w-lg mt-3">
                  {opcoesPresencaAusencia.map((opcao) => 
                    renderCard(opcao, dados.etapa5_diastemas || '', handleSelecionarDiastemas)
                  )}
                </div>
              </div>

              {/* Apinhamento */}
              <div>
                <Label className="text-sm font-medium text-gray-700">
                  Apinhamento
                </Label>
                <div className="flex flex-wrap gap-3 max-w-lg mt-3">
                  {opcoesPresencaAusencia.map((opcao) => 
                    renderCard(opcao, dados.etapa5_apinhamento || '', handleSelecionarApinhamento)
                  )}
                </div>
              </div>

              {/* Giroversões */}
              <div>
                <Label className="text-sm font-medium text-gray-700">
                  Giroversões
                </Label>
                <div className="flex flex-wrap gap-3 max-w-lg mt-3">
                  {opcoesPresencaAusencia.map((opcao) => 
                    renderCard(opcao, dados.etapa5_giroversoes || '', handleSelecionarGiroversoes)
                  )}
                </div>
              </div>
            </div>
          </>
        )}

        {/* Etapa 5.1: Seleção de Dentes com Diastemas */}
        {etapaAtual === 5.1 && (
          <>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
              <h4 className="text-sm font-medium text-blue-800 mb-1">Diastemas Presentes</h4>
              <p className="text-sm text-blue-700">Selecione os dentes com diastemas</p>
            </div>

            <Odontograma
              selectedTeeth={dados.etapa5_1_dentesDiastemas || []}
              onToothToggle={handleToggleDenteDiastema}
              showDeciduous={dados.etapa1_faseTratamento !== 'permanente'}
            />
          </>
        )}

        {/* Etapa 5.2: Seleção de Dentes com Apinhamento */}
        {etapaAtual === 5.2 && (
          <>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
              <h4 className="text-sm font-medium text-blue-800 mb-1">Apinhamento Presente</h4>
              <p className="text-sm text-blue-700">Selecione os dentes com apinhamento</p>
            </div>

            <Odontograma
              selectedTeeth={dados.etapa5_2_dentesApinhamento || []}
              onToothToggle={handleToggleDenteApinhamento}
              showDeciduous={dados.etapa1_faseTratamento !== 'permanente'}
            />
          </>
        )}

        {/* Etapa 5.3: Seleção de Dentes com Giroversões */}
        {etapaAtual === 5.3 && (
          <>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
              <h4 className="text-sm font-medium text-blue-800 mb-1">Giroversões Presentes</h4>
              <p className="text-sm text-blue-700">Selecione os dentes com giroversões</p>
            </div>

            <Odontograma
              selectedTeeth={dados.etapa5_3_dentesGiroversoes || []}
              onToothToggle={handleToggleDenteGiroversao}
              showDeciduous={dados.etapa1_faseTratamento !== 'permanente'}
            />
          </>
        )}

        {/* Etapa 6: Dor/Ruído Articular, Bruxismo e Apertamento */}
        {etapaAtual === 6 && (
          <>
            <div className="space-y-6">
              {/* Dor ou Ruído Articular */}
              <div>
                <Label className="text-sm font-medium text-gray-700">
                  Dor ou ruído articular
                </Label>
                <div className="flex flex-wrap gap-3 max-w-lg mt-3">
                  {opcoesSimNao.map((opcao) => 
                    renderCard(opcao, dados.etapa6_dorRuidoArticular || '', handleSelecionarDorRuido)
                  )}
                </div>
              </div>

              {/* Bruxismo */}
              <div>
                <Label className="text-sm font-medium text-gray-700">
                  Bruxismo
                </Label>
                <div className="flex flex-wrap gap-3 max-w-lg mt-3">
                  {opcoesSimNao.map((opcao) => 
                    renderCard(opcao, dados.etapa6_bruxismo || '', handleSelecionarBruxismo)
                  )}
                </div>
              </div>

              {/* Apertamento */}
              <div>
                <Label className="text-sm font-medium text-gray-700">
                  Apertamento
                </Label>
                <div className="flex flex-wrap gap-3 max-w-lg mt-3">
                  {opcoesSimNao.map((opcao) => 
                    renderCard(opcao, dados.etapa6_apertamento || '', handleSelecionarApertamento)
                  )}
                </div>
              </div>
            </div>
          </>
        )}

        {/* Etapa 6.1: Lado da Dor/Ruído */}
        {etapaAtual === 6.1 && (
          <>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
              <h4 className="text-sm font-medium text-blue-800 mb-1">Dor ou Ruído Articular Presente</h4>
              <p className="text-sm text-blue-700">Selecione o lado da dor/ruído</p>
            </div>

            <div>
              <Label className="text-sm font-medium text-gray-700">
                Selecione o lado da dor/ruído
              </Label>
              <div className="flex flex-wrap gap-4 max-w-4xl mt-3">
                {ladosDor.map((lado) => 
                  renderCard(lado, dados.etapa6_1_ladoDorRuido || '', handleSelecionarLadoDor)
                )}
              </div>
            </div>
          </>
        )}

        {/* Etapa 7: Respiração e Doença Periodontal */}
        {etapaAtual === 7 && (
          <>
            <div className="space-y-6">
              {/* Respiração */}
              <div>
                <Label className="text-sm font-medium text-gray-700">
                  Respiração
                </Label>
                <div className="flex flex-wrap gap-4 max-w-4xl mt-3">
                  {tiposRespiracao.map((tipo) => 
                    renderCard(tipo, dados.etapa7_respiracao || '', handleSelecionarRespiracao)
                  )}
                </div>
              </div>

              {/* Doença Periodontal */}
              <div>
                <Label className="text-sm font-medium text-gray-700">
                  Doença Periodontal
                </Label>
                <div className="flex flex-wrap gap-4 max-w-4xl mt-3">
                  {grausDoencaPeriodontal.map((grau) => 
                    renderCard(grau, dados.etapa7_doencaPeriodontal || '', handleSelecionarDoencaPeriodontal)
                  )}
                </div>
              </div>
            </div>
          </>
        )}

        {/* Etapa 7.1, 7.2, 7.3: Tipo de Perda Óssea */}
        {(etapaAtual === 7.1 || etapaAtual === 7.2 || etapaAtual === 7.3) && (
          <>
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
              <h4 className="text-sm font-medium text-yellow-800 mb-1">
                Doença Periodontal {etapaAtual === 7.1 ? 'Leve' : etapaAtual === 7.2 ? 'Moderada' : 'Grave'}
              </h4>
              <p className="text-sm text-yellow-700">Selecione o tipo de perda óssea</p>
            </div>

            <div>
              <Label className="text-sm font-medium text-gray-700">
                Selecione o tipo de perda óssea
              </Label>
              <div className="flex flex-wrap gap-3 max-w-lg mt-3">
                {tiposPerdaOssea.map((tipo) => 
                  renderCard(tipo, 
                    etapaAtual === 7.1 ? (dados.etapa7_1_tipoPerdaOsseaLeve || '') :
                    etapaAtual === 7.2 ? (dados.etapa7_2_tipoPerdaOsseaModerada || '') :
                    etapaAtual === 7.3 ? (dados.etapa7_3_tipoPerdaOsseaGrave || '') : '', 
                    handleSelecionarTipoPerdaOssea)
                )}
              </div>
            </div>
          </>
        )}

        {/* Etapa 7.11, 7.21, 7.31: Seleção de Dentes com Perda Óssea */}
        {(etapaAtual === 7.11 || etapaAtual === 7.21 || etapaAtual === 7.31) && (
          <>
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
              <h4 className="text-sm font-medium text-yellow-800 mb-1">Perda Óssea Localizada</h4>
              <p className="text-sm text-yellow-700">Selecione os dentes com perda óssea</p>
            </div>

            <Odontograma
              selectedTeeth={
                etapaAtual === 7.11 ? (dados.etapa7_1_1_dentesPerdaOsseaLeve || []) :
                etapaAtual === 7.21 ? (dados.etapa7_2_1_dentesPerdaOsseaModerada || []) :
                etapaAtual === 7.31 ? (dados.etapa7_3_1_dentesPerdaOsseaGrave || []) : []
              }
              onToothToggle={handleToggleDentePerdaOssea}
              showDeciduous={dados.etapa1_faseTratamento !== 'permanente'}
            />
          </>
        )}

        {/* Etapa 8: Necessidade de Tratamento Complementar */}
        {etapaAtual === 8 && (
          <>
            <div className="space-y-6">
              {/* Necessidade de tratamento */}
              <div>
                <Label className="text-sm font-medium text-gray-700">
                  Tem necessidade de tratamento complementar?
                </Label>
                <div className="flex flex-wrap gap-3 max-w-lg mt-3">
                  {opcoesSimNao.map((opcao) => 
                    renderCard(opcao, dados.etapa8_necessidadeTratamentoComplementar || '', handleSelecionarNecessidadeTratamento)
                  )}
                </div>
              </div>

              {/* Queixa principal */}
              <div>
                <Label className="text-sm font-medium text-gray-700">
                  Qual a queixa principal do paciente?
                </Label>
                <Textarea
                  className="mt-3"
                  placeholder="Descreva nesse campo a queixa relatada do paciente"
                  value={dados.etapa8_queixaPrincipal || ''}
                  onChange={(e) => handleQueixaPrincipal(e.target.value)}
                  rows={4}
                />
              </div>
            </div>
          </>
        )}

        {/* Etapa 8.1: Tipos de Tratamento Complementar */}
        {etapaAtual === 8.1 && (
          <>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
              <h4 className="text-sm font-medium text-blue-800 mb-1">Tratamento Complementar Necessário</h4>
              <p className="text-sm text-blue-700">Escolha o tipo de tratamento complementar</p>
            </div>

            <div>
              <Label className="text-sm font-medium text-gray-700">
                Escolha o tipo de tratamento complementar:
              </Label>
              <div className="space-y-3 mt-3">
                {tiposTratamentoComplementar.map((tipo) => (
                  <div key={tipo.id} className="flex items-center space-x-3">
                    <Checkbox
                      id={tipo.id}
                      checked={dados.etapa8_1_tiposTratamentoComplementar?.includes(tipo.id) || false}
                      onCheckedChange={() => handleToggleTratamentoComplementar(tipo.id)}
                    />
                    <label
                      htmlFor={tipo.id}
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                    >
                      {tipo.titulo}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {/* Etapa 9: Tipo de Tratamento */}
        {etapaAtual === 9 && (
          <>
            <div>
              <Label className="text-sm font-medium text-gray-700">
                Selecione o tipo de tratamento:
              </Label>
              <div className="flex flex-wrap gap-4 max-w-5xl mt-3">
                {tiposTratamento.map((tipo) => 
                  renderCard(tipo, dados.etapa9_tipoTratamento || '', handleSelecionarTipoTratamento)
                )}
              </div>
            </div>
          </>
        )}

        {/* Etapa 9.1: Tratamento Preventivo/Interceptativo */}
        {etapaAtual === 9.1 && (
          <>
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
              <h4 className="text-sm font-medium text-green-800 mb-1">Tratamento Preventivo / Interceptativo</h4>
              <p className="text-sm text-green-700">Escolha o tipo de aparatologia</p>
            </div>

            <div>
              <Label className="text-sm font-medium text-gray-700">
                Escolha o tipo de aparatologia:
              </Label>
              <div className="space-y-3 mt-3">
                {tiposAparatologia.map((tipo) => (
                  <div key={tipo.id} className="flex items-center space-x-3">
                    <Checkbox
                      id={tipo.id}
                      checked={dados.etapa9_1_1_aparatologiaPreventivo?.includes(tipo.id) || false}
                      onCheckedChange={() => handleToggleAparatologiaPreventivo(tipo.id)}
                    />
                    <label
                      htmlFor={tipo.id}
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                    >
                      {tipo.titulo}
                    </label>
                  </div>
                ))}
              </div>

              {/* Textarea para Extra oral */}
              {dados.etapa9_1_1_aparatologiaPreventivo?.includes('extra_oral') && (
                <div className="mt-4">
                  <Label className="text-sm font-medium text-gray-700">
                    Especifique o tipo de aparelho extra oral
                  </Label>
                  <Textarea
                    className="mt-2"
                    placeholder="Especifique o tipo de aparelho"
                    value={dados.etapa9_1_1_especificacaoExtraOralPreventivo || ''}
                    onChange={(e) => handleEspecificarAparelhoPreventivo('extra', e.target.value)}
                    rows={3}
                  />
                </div>
              )}
            </div>
          </>
        )}

        {/* Etapa 9.11: Tipo de Aparelho Intra Oral */}
        {etapaAtual === 9.11 && (
          <>
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
              <h4 className="text-sm font-medium text-green-800 mb-1">Aparelho Intra Oral</h4>
              <p className="text-sm text-green-700">Escolha o tipo de aparelho</p>
            </div>

            <div>
              <Label className="text-sm font-medium text-gray-700">
                Escolha o tipo de aparelho:
              </Label>
              <div className="flex flex-wrap gap-3 max-w-lg mt-3">
                {tiposAparatologiaIntraOral.map((tipo) => 
                  renderCard(tipo, dados.etapa9_1_1_1_tipoIntraOralPreventivo || '', handleSelecionarAparelhoIntraOralPreventivo)
                )}
              </div>

              {/* Textarea para Convencional */}
              {dados.etapa9_1_1_1_tipoIntraOralPreventivo === 'convencional' && (
                <div className="mt-4">
                  <Label className="text-sm font-medium text-gray-700">
                    Especifique o tipo de aparelho convencional
                  </Label>
                  <Textarea
                    className="mt-2"
                    placeholder="Especifique o tipo de aparelho"
                    value={dados.etapa9_1_1_1_especificacaoConvencionalPreventivo || ''}
                    onChange={(e) => handleEspecificarAparelhoPreventivo('intra', e.target.value)}
                    rows={3}
                  />
                </div>
              )}
            </div>
          </>
        )}

        {/* Etapa 9.12 e 9.22: Exodontias e Prognóstico */}
        {(etapaAtual === 9.12 || etapaAtual === 9.22) && (
          <>
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
              <h4 className="text-sm font-medium text-green-800 mb-1">
                Tratamento {etapaAtual === 9.12 ? 'Preventivo/Interceptativo' : 'Ortopédico'}
              </h4>
              <p className="text-sm text-green-700">Informações sobre exodontias e prognóstico</p>
            </div>

            <div className="space-y-6">
              {/* Exodontias */}
              <div>
                <Label className="text-sm font-medium text-gray-700">
                  Exodontias
                </Label>
                <div className="flex flex-wrap gap-3 max-w-lg mt-3">
                  {opcoesSimNao.map((opcao) => 
                    renderCard(opcao, 
                      etapaAtual === 9.12 ? (dados.etapa9_1_2_exodontiasPreventivo || '') : (dados.etapa9_2_2_exodontiasOrtopedico || ''), 
                      etapaAtual === 9.12 ? handleSelecionarExodontiasPreventivo : handleSelecionarExodontiasOrtopedico)
                  )}
                </div>
              </div>

              {/* Prognóstico */}
              <div>
                <Label className="text-sm font-medium text-gray-700">
                  Prognóstico
                </Label>
                <div className="flex flex-wrap gap-4 max-w-4xl mt-3">
                  {opcoesPrognostico.map((opcao) => 
                    renderCard(opcao, 
                      etapaAtual === 9.12 ? (dados.etapa9_1_2_prognosticoPreventivo || '') : (dados.etapa9_2_2_prognosticoOrtopedico || ''), 
                      etapaAtual === 9.12 ? handleSelecionarPrognosticoPreventivo : handleSelecionarPrognosticoOrtopedico)
                  )}
                </div>
              </div>
            </div>
          </>
        )}

        {/* Etapa 9.121 e 9.221: Seleção de Dentes para Exodontia */}
        {(etapaAtual === 9.121 || etapaAtual === 9.221) && (
          <>
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
              <h4 className="text-sm font-medium text-red-800 mb-1">Exodontias Necessárias</h4>
              <p className="text-sm text-red-700">Selecione os dentes para exodontia</p>
            </div>

            <Odontograma
              selectedTeeth={
                etapaAtual === 9.121 
                  ? (dados.etapa9_1_2_1_dentesExodontiaPreventivo || [])
                  : (dados.etapa9_2_2_1_dentesExodontiaOrtopedico || [])
              }
              onToothToggle={
                etapaAtual === 9.121 
                  ? handleToggleDentesExodontiaPreventivo
                  : handleToggleDentesExodontiaOrtopedico
              }
              showDeciduous={dados.etapa1_faseTratamento !== 'permanente'}
            />
          </>
        )}

        {/* Etapa 9.2: Tratamento Ortopédico (similar ao 9.1) */}
        {etapaAtual === 9.2 && (
          <>
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
              <h4 className="text-sm font-medium text-green-800 mb-1">Tratamento Ortopédico</h4>
              <p className="text-sm text-green-700">Escolha o tipo de aparatologia</p>
            </div>

            <div>
              <Label className="text-sm font-medium text-gray-700">
                Escolha o tipo de aparatologia:
              </Label>
              <div className="space-y-3 mt-3">
                {tiposAparatologia.map((tipo) => (
                  <div key={tipo.id} className="flex items-center space-x-3">
                    <Checkbox
                      id={tipo.id}
                      checked={dados.etapa9_2_1_aparatologiaOrtopedico?.includes(tipo.id) || false}
                      onCheckedChange={() => handleToggleAparatologiaOrtopedico(tipo.id)}
                    />
                    <label
                      htmlFor={tipo.id}
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                    >
                      {tipo.titulo}
                    </label>
                  </div>
                ))}
              </div>

              {/* Textarea para Extra oral */}
              {dados.etapa9_2_1_aparatologiaOrtopedico?.includes('extra_oral') && (
                <div className="mt-4">
                  <Label className="text-sm font-medium text-gray-700">
                    Especifique o tipo de aparelho extra oral
                  </Label>
                  <Textarea
                    className="mt-2"
                    placeholder="Especifique o tipo de aparelho"
                    value={dados.etapa9_2_1_especificacaoExtraOralOrtopedico || ''}
                    onChange={(e) => handleEspecificarAparelhoOrtopedico('extra', e.target.value)}
                    rows={3}
                  />
                </div>
              )}
            </div>
          </>
        )}

        {/* Etapa 9.21: Tipo de Aparelho Intra Oral (Ortopédico) */}
        {etapaAtual === 9.21 && (
          <>
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
              <h4 className="text-sm font-medium text-green-800 mb-1">Aparelho Intra Oral - Ortopédico</h4>
              <p className="text-sm text-green-700">Escolha o tipo de aparelho</p>
            </div>

            <div>
              <Label className="text-sm font-medium text-gray-700">
                Escolha o tipo de aparelho:
              </Label>
              <div className="flex flex-wrap gap-3 max-w-lg mt-3">
                {tiposAparatologiaIntraOral.map((tipo) => 
                  renderCard(tipo, dados.etapa9_2_1_1_tipoIntraOralOrtopedico || '', handleSelecionarAparelhoIntraOralOrtopedico)
                )}
              </div>

              {/* Textarea para Convencional */}
              {dados.etapa9_2_1_1_tipoIntraOralOrtopedico === 'convencional' && (
                <div className="mt-4">
                  <Label className="text-sm font-medium text-gray-700">
                    Especifique o tipo de aparelho convencional
                  </Label>
                  <Textarea
                    className="mt-2"
                    placeholder="Especifique o tipo de aparelho"
                    value={dados.etapa9_2_1_1_especificacaoConvencionalOrtopedico || ''}
                    onChange={(e) => handleEspecificarAparelhoOrtopedico('intra', e.target.value)}
                    rows={3}
                  />
                </div>
              )}
            </div>
          </>
        )}

        {/* Etapa 9.3: Tratamento Corretivo - É compositório? */}
        {etapaAtual === 9.3 && (
          <>
            <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 mb-6">
              <h4 className="text-sm font-medium text-purple-800 mb-1">Tratamento Corretivo</h4>
              <p className="text-sm text-purple-700">Configuração do tratamento</p>
            </div>

            <div>
              <Label className="text-sm font-medium text-gray-700">
                É compositório?
              </Label>
              <div className="flex flex-wrap gap-3 max-w-lg mt-3">
                {opcoesSimNao.map((opcao) => 
                  renderCard(opcao, dados.etapa9_3_1_corretivoCombinado || '', handleSelecionarCorretivoCombinado)
                )}
              </div>
            </div>
          </>
        )}

        {/* Etapa 9.31: Tipo de Aparatologia (Corretivo) */}
        {etapaAtual === 9.31 && (
          <>
            <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 mb-6">
              <h4 className="text-sm font-medium text-purple-800 mb-1">Tratamento Corretivo Compositório</h4>
              <p className="text-sm text-purple-700">Qual o tipo de aparatologia?</p>
            </div>

            <div>
              <Label className="text-sm font-medium text-gray-700">
                Qual o tipo de aparatologia?
              </Label>
              <div className="flex flex-wrap gap-3 max-w-lg mt-3">
                <div
                  className={`
                    relative bg-white border-2 rounded-xl px-4 py-4 cursor-pointer transition-all duration-300 hover:shadow-lg flex items-center justify-center
                    w-[180px] h-[60px]
                    ${dados.etapa9_3_1_1_tipoAparatologiaCorretivo === 'fixa'
                      ? 'border-[#F05223] bg-[#F05223]/5 shadow-md transform scale-[1.02]'
                      : 'border-[#EAE7EC] hover:border-[#F05223] hover:bg-[#F05223]/5'
                    }
                  `}
                  onClick={() => handleSelecionarTipoAparatologiaCorretivo('fixa')}
                >
                  <h4 className={`
                    text-base font-medium transition-colors duration-300 text-center
                    ${dados.etapa9_3_1_1_tipoAparatologiaCorretivo === 'fixa' ? 'text-[#F05223]' : 'text-gray-900'}
                  `}>
                    Fixa
                  </h4>
                </div>
                <div
                  className={`
                    relative bg-white border-2 rounded-xl px-4 py-4 cursor-pointer transition-all duration-300 hover:shadow-lg flex items-center justify-center
                    w-[180px] h-[60px]
                    ${dados.etapa9_3_1_1_tipoAparatologiaCorretivo === 'alinhador'
                      ? 'border-[#F05223] bg-[#F05223]/5 shadow-md transform scale-[1.02]'
                      : 'border-[#EAE7EC] hover:border-[#F05223] hover:bg-[#F05223]/5'
                    }
                  `}
                  onClick={() => handleSelecionarTipoAparatologiaCorretivo('alinhador')}
                >
                  <h4 className={`
                    text-base font-medium transition-colors duration-300 text-center
                    ${dados.etapa9_3_1_1_tipoAparatologiaCorretivo === 'alinhador' ? 'text-[#F05223]' : 'text-gray-900'}
                  `}>
                    Alinhador
                  </h4>
                </div>
              </div>
            </div>
          </>
        )}

        {/* Etapa 9.312: Formato da Aparatologia Fixa */}
        {etapaAtual === 9.312 && (
          <>
            <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 mb-6">
              <h4 className="text-sm font-medium text-purple-800 mb-1">Aparatologia Fixa</h4>
              <p className="text-sm text-purple-700">Escolha qual o formato</p>
            </div>

            <div>
              <Label className="text-sm font-medium text-gray-700">
                Escolha qual o formato:
              </Label>
              <div className="flex flex-wrap gap-3 max-w-lg mt-3">
                {formatosAparatologia.map((formato) => 
                  renderCard(formato, dados.etapa9_3_1_2_formatoAparatologiaFixaCorretivo || '', handleSelecionarFormatoAparatologiaCorretivo)
                )}
              </div>
            </div>
          </>
        )}

        {/* Etapa 9.32: Exodontias, Desgaste e Prognóstico (Corretivo) */}
        {etapaAtual === 9.32 && (
          <>
            <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 mb-6">
              <h4 className="text-sm font-medium text-purple-800 mb-1">Tratamento Corretivo</h4>
              <p className="text-sm text-purple-700">Procedimentos adicionais e prognóstico</p>
            </div>

            <div className="space-y-6">
              {/* Exodontias */}
              <div>
                <Label className="text-sm font-medium text-gray-700">
                  Exodontias
                </Label>
                <div className="flex flex-wrap gap-3 max-w-lg mt-3">
                  {opcoesSimNao.map((opcao) => 
                    renderCard(opcao, dados.etapa9_3_2_exodontiasCorretivo || '', handleSelecionarExodontiasCorretivo)
                  )}
                </div>
              </div>

              {/* Desgaste Interproximal */}
              <div>
                <Label className="text-sm font-medium text-gray-700">
                  Desgaste Interproximal
                </Label>
                <div className="flex flex-wrap gap-3 max-w-lg mt-3">
                  {opcoesSimNao.map((opcao) => 
                    renderCard(opcao, dados.etapa9_3_2_desgasteInterproximalCorretivo || '', handleSelecionarDesgasteCorretivo)
                  )}
                </div>
              </div>

              {/* Prognóstico */}
              <div>
                <Label className="text-sm font-medium text-gray-700">
                  Prognóstico
                </Label>
                <div className="flex flex-wrap gap-4 max-w-4xl mt-3">
                  {opcoesPrognostico.map((opcao) => 
                    renderCard(opcao, dados.etapa9_3_2_prognosticoCorretivo || '', handleSelecionarPrognosticoCorretivo)
                  )}
                </div>
              </div>
            </div>
          </>
        )}

        {/* Etapa 9.321 e 9.421: Seleção de Dentes para Exodontia (Corretivo/Cirúrgico) */}
        {(etapaAtual === 9.321 || etapaAtual === 9.421) && (
          <>
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
              <h4 className="text-sm font-medium text-red-800 mb-1">Exodontias Necessárias</h4>
              <p className="text-sm text-red-700">Selecione os dentes para exodontia</p>
            </div>

            <Odontograma
              selectedTeeth={
                etapaAtual === 9.321 
                  ? (dados.etapa9_3_2_1_dentesExodontiaCorretivo || [])
                  : (dados.etapa9_4_2_1_dentesExodontiaCirurgico || [])
              }
              onToothToggle={
                etapaAtual === 9.321 
                  ? handleToggleDentesExodontiaCorretivo
                  : handleToggleDentesExodontiaCirurgico
              }
              showDeciduous={dados.etapa1_faseTratamento !== 'permanente'}
            />
          </>
        )}

        {/* Etapa 9.331 e 9.431: Seleção de Dentes para Desgaste */}
        {(etapaAtual === 9.331 || etapaAtual === 9.431) && (
          <>
            <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 mb-6">
              <h4 className="text-sm font-medium text-orange-800 mb-1">Desgaste Interproximal</h4>
              <p className="text-sm text-orange-700">Selecione os dentes para desgaste</p>
            </div>

            <Odontograma
              selectedTeeth={
                etapaAtual === 9.331 
                  ? (dados.etapa9_3_3_1_dentesDesgasteCorretivo || [])
                  : (dados.etapa9_4_3_1_dentesDesgasteCirurgico || [])
              }
              onToothToggle={
                etapaAtual === 9.331 
                  ? handleToggleDentesDesgasteCorretivo
                  : handleToggleDentesDesgasteCirurgico
              }
              showDeciduous={dados.etapa1_faseTratamento !== 'permanente'}
            />
          </>
        )}

        {/* Etapa 9.4: Tratamento Cirúrgico */}
        {etapaAtual === 9.4 && (
          <>
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
              <h4 className="text-sm font-medium text-red-800 mb-1">Tratamento Cirúrgico</h4>
              <p className="text-sm text-red-700">Escolha o tipo de aparatologia</p>
            </div>

            <div>
              <Label className="text-sm font-medium text-gray-700">
                Escolha o tipo de aparatologia:
              </Label>
              <div className="flex flex-wrap gap-4 max-w-4xl mt-3">
                {tiposAparatologiaCirurgico.map((tipo) => 
                  renderCard(tipo, dados.etapa9_4_1_aparatologiaCirurgico || '', handleSelecionarAparatologiaCirurgico)
                )}
              </div>
            </div>
          </>
        )}

        {/* Etapa 9.41: Formato da Aparatologia Fixa (Cirúrgico) */}
        {etapaAtual === 9.41 && (
          <>
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
              <h4 className="text-sm font-medium text-red-800 mb-1">Aparatologia Fixa - Cirúrgico</h4>
              <p className="text-sm text-red-700">Escolha qual o formato</p>
            </div>

            <div>
              <Label className="text-sm font-medium text-gray-700">
                Escolha qual o formato:
              </Label>
              <div className="flex flex-wrap gap-3 max-w-lg mt-3">
                {formatosAparatologia.map((formato) => 
                  renderCard(formato, dados.etapa9_4_1_1_formatoAparatologiaFixaCirurgico || '', handleSelecionarFormatoAparatologiaCirurgico)
                )}
              </div>
            </div>
          </>
        )}

        {/* Etapa 9.412: Tratamento Ortopédico - Especificações (Cirúrgico) */}
        {etapaAtual === 9.412 && (
          <>
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
              <h4 className="text-sm font-medium text-red-800 mb-1">Tratamento Ortopédico - Cirúrgico</h4>
              <p className="text-sm text-red-700">Escolha o tipo de aparatologia</p>
            </div>

            <div>
              <Label className="text-sm font-medium text-gray-700">
                Escolha o tipo de aparatologia:
              </Label>
              <div className="space-y-3 mt-3">
                {tiposAparatologia.map((tipo) => (
                  <div key={tipo.id} className="flex items-center space-x-3">
                    <Checkbox
                      id={tipo.id}
                      checked={dados.etapa9_4_1_2_aparatologiaOrtopedicoCirurgico?.includes(tipo.id) || false}
                      onCheckedChange={() => handleToggleAparatologiaOrtopedicoCirurgico(tipo.id)}
                    />
                    <label
                      htmlFor={tipo.id}
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                    >
                      {tipo.titulo}
                    </label>
                  </div>
                ))}
              </div>

              {/* Textareas para especificações */}
              {dados.etapa9_4_1_2_aparatologiaOrtopedicoCirurgico?.includes('intra_oral') && (
                <div className="mt-4">
                  <Label className="text-sm font-medium text-gray-700">
                    Especifique o tipo de aparelho intra oral
                  </Label>
                  <Textarea
                    className="mt-2"
                    placeholder="Especifique o tipo de aparelho"
                    value={dados.etapa9_4_1_2_especificacaoIntraOralCirurgico || ''}
                    onChange={(e) => handleEspecificarAparelhoCirurgico('intra', e.target.value)}
                    rows={3}
                  />
                </div>
              )}

              {dados.etapa9_4_1_2_aparatologiaOrtopedicoCirurgico?.includes('extra_oral') && (
                <div className="mt-4">
                  <Label className="text-sm font-medium text-gray-700">
                    Especifique o tipo de aparelho extra oral
                  </Label>
                  <Textarea
                    className="mt-2"
                    placeholder="Especifique o tipo de aparelho"
                    value={dados.etapa9_4_1_2_especificacaoExtraOralCirurgico || ''}
                    onChange={(e) => handleEspecificarAparelhoCirurgico('extra', e.target.value)}
                    rows={3}
                  />
                </div>
              )}
            </div>
          </>
        )}

        {/* Etapa 9.42: Exodontias, Desgaste e Prognóstico (Cirúrgico) */}
        {etapaAtual === 9.42 && (
          <>
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
              <h4 className="text-sm font-medium text-red-800 mb-1">Tratamento Cirúrgico</h4>
              <p className="text-sm text-red-700">Procedimentos adicionais e prognóstico</p>
            </div>

            <div className="space-y-6">
              {/* Exodontias */}
              <div>
                <Label className="text-sm font-medium text-gray-700">
                  Exodontias
                </Label>
                <div className="flex flex-wrap gap-3 max-w-lg mt-3">
                  {opcoesSimNao.map((opcao) => 
                    renderCard(opcao, dados.etapa9_4_2_exodontiasCirurgico || '', handleSelecionarExodontiasCirurgico)
                  )}
                </div>
              </div>

              {/* Desgaste Interproximal */}
              <div>
                <Label className="text-sm font-medium text-gray-700">
                  Desgaste Interproximal
                </Label>
                <div className="flex flex-wrap gap-3 max-w-lg mt-3">
                  {opcoesSimNao.map((opcao) => 
                    renderCard(opcao, dados.etapa9_4_2_desgasteInterproximalCirurgico || '', handleSelecionarDesgasteCirurgico)
                  )}
                </div>
              </div>

              {/* Prognóstico */}
              <div>
                <Label className="text-sm font-medium text-gray-700">
                  Prognóstico
                </Label>
                <div className="flex flex-wrap gap-4 max-w-4xl mt-3">
                  {opcoesPrognostico.map((opcao) => 
                    renderCard(opcao, dados.etapa9_4_2_prognosticoCirurgico || '', handleSelecionarPrognosticoCirurgico)
                  )}
                </div>
              </div>
            </div>
          </>
        )}

        {/* Etapa 10: Previsão para Finalização */}
        {etapaAtual === 10 && (
          <>
            <div className="space-y-6">
              {/* Contador de meses */}
              <div>
                <Label className="text-sm font-medium text-gray-700">
                  Informe a quantidade de meses abaixo
                </Label>
                <div className="flex items-center gap-4 mt-3">
                  <button
                    type="button"
                    className="w-10 h-10 rounded-lg border-2 border-gray-300 flex items-center justify-center hover:border-[#F05223] transition-colors"
                    onClick={() => {
                      const atual = dados.etapa10_previsaoMeses || 1
                      if (atual > 1) setDados({ ...dados, etapa10_previsaoMeses: atual - 1 })
                    }}
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <div className="w-20 text-center">
                    <span className="text-2xl font-semibold text-gray-900">
                      {dados.etapa10_previsaoMeses || 1}
                    </span>
                    <p className="text-xs text-gray-500">
                      {(dados.etapa10_previsaoMeses || 1) === 1 ? 'mês' : 'meses'}
                    </p>
                  </div>
                  <button
                    type="button"
                    className="w-10 h-10 rounded-lg border-2 border-gray-300 flex items-center justify-center hover:border-[#F05223] transition-colors"
                    onClick={() => {
                      const atual = dados.etapa10_previsaoMeses || 1
                      if (atual < 24) setDados({ ...dados, etapa10_previsaoMeses: atual + 1 })
                    }}
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* Aparelho prévio */}
              <div>
                <Label className="text-sm font-medium text-gray-700">
                  Paciente possui aparelho instalado previamente?
                </Label>
                <div className="flex flex-wrap gap-3 max-w-lg mt-3">
                  {opcoesSimNao.map((opcao) => 
                    renderCard(opcao, dados.etapa10_aparelhoPrevio || '', handleAparelhoPrevio)
                  )}
                </div>
              </div>
            </div>
          </>
        )}

        {/* Etapa 10.1: Tempo com Aparelho */}
        {etapaAtual === 10.1 && (
          <>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
              <h4 className="text-sm font-medium text-blue-800 mb-1">Aparelho Instalado Previamente</h4>
              <p className="text-sm text-blue-700">Informe há quanto tempo</p>
            </div>

            <div>
              <Label className="text-sm font-medium text-gray-700">
                Há quanto tempo o paciente possui aparelho?
              </Label>
              <div className="flex items-center gap-4 mt-3">
                <button
                  type="button"
                  className="w-10 h-10 rounded-lg border-2 border-gray-300 flex items-center justify-center hover:border-[#F05223] transition-colors"
                  onClick={() => {
                    const atual = dados.tempoAparelhoPrevio || 1
                    if (atual > 1) setDados({ ...dados, tempoAparelhoPrevio: atual - 1 })
                  }}
                >
                  <Minus className="h-4 w-4" />
                </button>
                <div className="w-20 text-center">
                  <span className="text-2xl font-semibold text-gray-900">
                    {dados.tempoAparelhoPrevio || 1}
                  </span>
                  <p className="text-xs text-gray-500">
                    {(dados.tempoAparelhoPrevio || 1) === 1 ? 'mês' : 'meses'}
                  </p>
                </div>
                <button
                  type="button"
                  className="w-10 h-10 rounded-lg border-2 border-gray-300 flex items-center justify-center hover:border-[#F05223] transition-colors"
                  onClick={() => {
                    const atual = dados.tempoAparelhoPrevio || 1
                    if (atual < 24) setDados({ ...dados, tempoAparelhoPrevio: atual + 1 })
                  }}
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
            </div>
          </>
        )}

        {/* Etapa 11: Upload de Imagens */}
        {etapaAtual === 11 && (
          <>
            <div>
              <Label className="text-sm font-medium text-gray-700">
                Nos envie as imagens que comprovem o estado inicial do paciente para esse tratamento
              </Label>
              <div className="mt-4">
                <div className="flex items-center justify-center w-full">
                  <label
                    htmlFor="upload-imagens"
                    className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
                  >
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <Upload className="w-10 h-10 mb-3 text-gray-400" />
                      <p className="mb-2 text-sm text-gray-700">
                        <span className="font-semibold">Clique para fazer upload</span> ou arraste e solte
                      </p>
                      <p className="text-xs text-gray-500">PNG, JPG ou JPEG</p>
                    </div>
                    <input
                      id="upload-imagens"
                      type="file"
                      className="hidden"
                      multiple
                      accept="image/*"
                      onChange={(e) => handleUploadImagens(e.target.files)}
                    />
                  </label>
                </div>

                {/* Preview das imagens */}
                {dados.etapa11_imagensInicio && dados.etapa11_imagensInicio.length > 0 && (
                  <div className="mt-4">
                    <p className="text-sm font-medium text-gray-700 mb-2">
                      Imagens selecionadas: {dados.etapa11_imagensInicio.length}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {dados.etapa11_imagensInicio.map((file, index) => (
                        <div key={index} className="text-xs text-gray-600 bg-gray-100 px-2 py-1 rounded">
                          {file.name}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </>
        )}
        </>
        )}
      </div>

      {/* Navegação interna do formulário */}
      <div className="mt-8 pt-6 border-t border-gray-200">
        <div className="flex items-center justify-between gap-4">
          {/* Botão Voltar - só mostra a partir da etapa 2 */}
          {etapaAtual > 1 && (
            <Button
              type="button"
              variant="ghost"
              onClick={etapaAnterior}
              className="text-[#F05223] hover:text-[#D94820] hover:bg-[#F05223]/5 transition-all duration-300 flex items-center gap-2 font-semibold px-4 py-2 rounded-xl"
            >
              <ArrowLeft className="h-4 w-4" />
              Etapa anterior
            </Button>
          )}
          
          {/* Espaçador quando não há botão voltar */}
          {etapaAtual === 1 && <div></div>}
          
          {/* Botão Próximo - sempre visível */}
          <Button
            type="button"
            disabled={!podeContinuar()}
            onClick={proximaEtapa}
            size="lg"
            className={`
              px-8 py-3 font-semibold rounded-full transition-all duration-300
              focus-visible:ring-2 focus-visible:ring-[#F05223] focus-visible:ring-offset-2
              ${!podeContinuar() 
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
                : 'bg-[#F05223] hover:bg-[#D94820] text-white shadow-md hover:shadow-lg'
              }
            `}
          >
            {etapaAtual === 11 ? 'Finalizar' : 'Próximo'}
          </Button>
        </div>
      </div>
    </div>
  )
})

FormularioOrtodontia.displayName = 'FormularioOrtodontia'

export default FormularioOrtodontia
