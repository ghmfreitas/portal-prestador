'use client'

import { useState, useImperativeHandle, forwardRef, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Check, ArrowLeft } from 'phosphor-react'
import Odontograma from './Odontograma'

interface DadosOrtodontia {
  faseTratamento: string
  classificacaoAngle: string
  classeIIDivisao?: string
  classeIISubdivisao?: string
  classeIIISubdivisao?: string
  padraoFacial?: string
  linhaMediaCoincidente?: string
  desvioSuperior?: string
  desvioInferior?: string
  mordidaCruzada?: string
  cruzadaAnterior?: string
  cruzadaPosterior?: string
  tipoMordidaCruzada?: string
  overjet?: string
  medidaOverjet?: string
  overbite?: string
  medidaOverbite?: string
  diastemas?: string
  dentesDiastemas?: string[]
  apinhamento?: string
  dentesApinhamento?: string[]
  giroversoes?: string
  dentesGiroversoes?: string[]
  dorRuidoArticular?: string
  ladoDorRuido?: string
  bruxismo?: string
  apertamento?: string
  respiracao?: string
  doencaPeriodontal?: string
}

interface FormularioOrtodontiaProps {
  onContinuar: (dados: DadosOrtodontia) => void
  onVoltar: () => void
  onStatusChange?: (podeAvancar: boolean, etapa: number) => void
}

export interface FormularioOrtodontiaRef {
  proximaEtapa: () => void
  podeContinuar: () => boolean
}

const FormularioOrtodontia = forwardRef<FormularioOrtodontiaRef, FormularioOrtodontiaProps>(
  ({ onContinuar, onVoltar, onStatusChange }, ref) => {
  const [etapaAtual, setEtapaAtual] = useState(1)
  const [dados, setDados] = useState<DadosOrtodontia>({
    faseTratamento: '',
    classificacaoAngle: ''
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

  const medidasTrespasse = [
    { id: '0mm', titulo: '0 mm', descricao: '' },
    { id: '1mm', titulo: '1 mm', descricao: '' },
    { id: '2mm', titulo: '2 mm', descricao: '' },
    { id: '3mm', titulo: '3 mm', descricao: '' },
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

  // Handlers para cada etapa
  const handleSelecionarFase = (fase: string) => {
    setDados({ ...dados, faseTratamento: fase })
  }

  const handleSelecionarClassificacao = (classificacao: string) => {
    setDados({ ...dados, classificacaoAngle: classificacao })
  }

  const handleSelecionarDivisaoII = (divisao: string) => {
    setDados({ ...dados, classeIIDivisao: divisao })
  }

  const handleSelecionarSubdivisaoII = (subdivisao: string) => {
    setDados({ ...dados, classeIISubdivisao: subdivisao })
  }

  const handleSelecionarSubdivisaoIII = (subdivisao: string) => {
    setDados({ ...dados, classeIIISubdivisao: subdivisao })
  }

  const handleSelecionarPadraoFacial = (padrao: string) => {
    setDados({ ...dados, padraoFacial: padrao })
  }

  const handleSelecionarLinhaMedia = (opcao: string) => {
    setDados({ ...dados, linhaMediaCoincidente: opcao })
  }

  const handleSelecionarMordida = (opcao: string) => {
    setDados({ ...dados, mordidaCruzada: opcao })
  }

  const handleSelecionarOverjet = (opcao: string) => {
    setDados({ ...dados, overjet: opcao })
  }

  const handleSelecionarOverbite = (opcao: string) => {
    setDados({ ...dados, overbite: opcao })
  }

  const handleSelecionarDesvioSuperior = (opcao: string) => {
    setDados({ ...dados, desvioSuperior: opcao })
  }

  const handleSelecionarDesvioInferior = (opcao: string) => {
    setDados({ ...dados, desvioInferior: opcao })
  }

  const handleSelecionarCruzadaAnterior = (opcao: string) => {
    setDados({ ...dados, cruzadaAnterior: opcao })
  }

  const handleSelecionarCruzadaPosterior = (opcao: string) => {
    setDados({ ...dados, cruzadaPosterior: opcao })
  }

  const handleSelecionarTipoMordidaCruzada = (tipo: string) => {
    setDados({ ...dados, tipoMordidaCruzada: tipo })
  }

  const handleSelecionarMedidaOverjet = (medida: string) => {
    setDados({ ...dados, medidaOverjet: medida })
  }

  const handleSelecionarMedidaOverbite = (medida: string) => {
    setDados({ ...dados, medidaOverbite: medida })
  }

  const handleSelecionarDiastemas = (opcao: string) => {
    setDados({ ...dados, diastemas: opcao })
  }

  const handleSelecionarApinhamento = (opcao: string) => {
    setDados({ ...dados, apinhamento: opcao })
  }

  const handleSelecionarGiroversoes = (opcao: string) => {
    setDados({ ...dados, giroversoes: opcao })
  }

  const handleSelecionarDorRuido = (opcao: string) => {
    setDados({ ...dados, dorRuidoArticular: opcao })
  }

  const handleSelecionarLadoDor = (lado: string) => {
    setDados({ ...dados, ladoDorRuido: lado })
  }

  const handleSelecionarBruxismo = (opcao: string) => {
    setDados({ ...dados, bruxismo: opcao })
  }

  const handleSelecionarApertamento = (opcao: string) => {
    setDados({ ...dados, apertamento: opcao })
  }

  const handleSelecionarRespiracao = (tipo: string) => {
    setDados({ ...dados, respiracao: tipo })
  }

  const handleSelecionarDoencaPeriodontal = (grau: string) => {
    setDados({ ...dados, doencaPeriodontal: grau })
  }

  // Handlers para seleção de dentes no odontograma
  const handleToggleDenteDiastema = (dente: string) => {
    const dentesAtuais = dados.dentesDiastemas || []
    const novosDentes = dentesAtuais.includes(dente)
      ? dentesAtuais.filter(d => d !== dente)
      : [...dentesAtuais, dente]
    setDados({ ...dados, dentesDiastemas: novosDentes })
  }

  const handleToggleDenteApinhamento = (dente: string) => {
    const dentesAtuais = dados.dentesApinhamento || []
    const novosDentes = dentesAtuais.includes(dente)
      ? dentesAtuais.filter(d => d !== dente)
      : [...dentesAtuais, dente]
    setDados({ ...dados, dentesApinhamento: novosDentes })
  }

  const handleToggleDenteGiroversao = (dente: string) => {
    const dentesAtuais = dados.dentesGiroversoes || []
    const novosDentes = dentesAtuais.includes(dente)
      ? dentesAtuais.filter(d => d !== dente)
      : [...dentesAtuais, dente]
    setDados({ ...dados, dentesGiroversoes: novosDentes })
  }

  // Navegação entre etapas
  const proximaEtapa = () => {
    if (etapaAtual === 1 && dados.faseTratamento) {
      setEtapaAtual(2)
    } else if (etapaAtual === 2 && dados.classificacaoAngle && dados.padraoFacial) {
      if (dados.classificacaoAngle === 'classe_i') {
        setEtapaAtual(3)
      } else if (dados.classificacaoAngle === 'classe_ii') {
        setEtapaAtual(2.1)
      } else if (dados.classificacaoAngle === 'classe_iii') {
        setEtapaAtual(2.2)
      }
    } else if (etapaAtual === 2.1 && dados.classeIIDivisao && dados.classeIISubdivisao) {
      setEtapaAtual(3)
    } else if (etapaAtual === 2.2 && dados.classeIIISubdivisao) {
      setEtapaAtual(3)
    } else if (etapaAtual === 3 && dados.linhaMediaCoincidente && dados.mordidaCruzada) {
      // Verifica se precisa de sub-etapas
      if (dados.linhaMediaCoincidente === 'nao' && (!dados.desvioSuperior || !dados.desvioInferior)) {
        setEtapaAtual(3.1)
      } else if (dados.mordidaCruzada === 'sim' && (!dados.cruzadaAnterior || !dados.cruzadaPosterior)) {
        setEtapaAtual(3.2)
      } else {
        setEtapaAtual(4)
      }
    } else if (etapaAtual === 3.1 && dados.desvioSuperior && dados.desvioInferior) {
      if (dados.mordidaCruzada === 'sim' && (!dados.cruzadaAnterior || !dados.cruzadaPosterior)) {
        setEtapaAtual(3.2)
      } else {
        setEtapaAtual(4)
      }
    } else if (etapaAtual === 3.2 && dados.cruzadaAnterior && dados.cruzadaPosterior) {
      if (dados.cruzadaPosterior === 'sim' && !dados.tipoMordidaCruzada) {
        setEtapaAtual(3.21)
      } else {
        setEtapaAtual(4)
      }
    } else if (etapaAtual === 3.21 && dados.tipoMordidaCruzada) {
      setEtapaAtual(4)
    } else if (etapaAtual === 4 && dados.overjet && dados.overbite) {
      // Verifica se precisa de sub-etapas para medidas
      if (dados.overjet === 'inadequado' && !dados.medidaOverjet) {
        setEtapaAtual(4.1)
      } else if ((dados.overbite === 'mordida_aberta' || dados.overbite === 'sobremordida') && !dados.medidaOverbite) {
        setEtapaAtual(4.2)
      } else {
        setEtapaAtual(5)
      }
    } else if (etapaAtual === 4.1 && dados.medidaOverjet) {
      if ((dados.overbite === 'mordida_aberta' || dados.overbite === 'sobremordida') && !dados.medidaOverbite) {
        setEtapaAtual(4.2)
      } else {
        setEtapaAtual(5)
      }
    } else if (etapaAtual === 4.2 && dados.medidaOverbite) {
      setEtapaAtual(5)
    } else if (etapaAtual === 5 && dados.diastemas && dados.apinhamento && dados.giroversoes) {
      // Se algum item for "presentes" e não tiver seleção de dentes, vai para sub-etapa
      if (dados.diastemas === 'presentes' && (!dados.dentesDiastemas || dados.dentesDiastemas.length === 0)) {
        setEtapaAtual(5.1)
      } else if (dados.apinhamento === 'presentes' && (!dados.dentesApinhamento || dados.dentesApinhamento.length === 0)) {
        setEtapaAtual(5.2)
      } else if (dados.giroversoes === 'presentes' && (!dados.dentesGiroversoes || dados.dentesGiroversoes.length === 0)) {
        setEtapaAtual(5.3)
      } else {
        setEtapaAtual(6)
      }
    } else if (etapaAtual === 5.1 && dados.dentesDiastemas && dados.dentesDiastemas.length > 0) {
      if (dados.apinhamento === 'presentes' && (!dados.dentesApinhamento || dados.dentesApinhamento.length === 0)) {
        setEtapaAtual(5.2)
      } else if (dados.giroversoes === 'presentes' && (!dados.dentesGiroversoes || dados.dentesGiroversoes.length === 0)) {
        setEtapaAtual(5.3)
      } else {
        setEtapaAtual(6)
      }
    } else if (etapaAtual === 5.2 && dados.dentesApinhamento && dados.dentesApinhamento.length > 0) {
      if (dados.giroversoes === 'presentes' && (!dados.dentesGiroversoes || dados.dentesGiroversoes.length === 0)) {
        setEtapaAtual(5.3)
      } else {
        setEtapaAtual(6)
      }
    } else if (etapaAtual === 5.3 && dados.dentesGiroversoes && dados.dentesGiroversoes.length > 0) {
      setEtapaAtual(6)
    } else if (etapaAtual === 6 && dados.dorRuidoArticular && dados.bruxismo && dados.apertamento) {
      if (dados.dorRuidoArticular === 'sim' && !dados.ladoDorRuido) {
        setEtapaAtual(6.1)
      } else {
        setEtapaAtual(7)
      }
    } else if (etapaAtual === 6.1 && dados.ladoDorRuido) {
      setEtapaAtual(7)
    } else if (etapaAtual === 7 && dados.respiracao && dados.doencaPeriodontal) {
      onContinuar(dados)
    }
  }

  // Exposição das funções via ref
  useImperativeHandle(ref, () => ({
    proximaEtapa,
    podeContinuar
  }))

  // Notificar mudanças de estado para o componente pai
  useEffect(() => {
    if (onStatusChange) {
      onStatusChange(podeContinuar(), etapaAtual)
    }
  }, [dados, etapaAtual, onStatusChange])

  const etapaAnterior = () => {
    if (etapaAtual === 2) {
      setEtapaAtual(1)
    } else if (etapaAtual === 2.1 || etapaAtual === 2.2) {
      setEtapaAtual(2)
    } else if (etapaAtual === 3) {
      if (dados.classificacaoAngle === 'classe_i') {
        setEtapaAtual(2)
      } else if (dados.classificacaoAngle === 'classe_ii') {
        setEtapaAtual(2.1)
      } else if (dados.classificacaoAngle === 'classe_iii') {
        setEtapaAtual(2.2)
      }
    } else if (etapaAtual === 3.1) {
      setEtapaAtual(3)
    } else if (etapaAtual === 3.2) {
      if (dados.linhaMediaCoincidente === 'nao' && dados.desvioSuperior && dados.desvioInferior) {
        setEtapaAtual(3.1)
      } else {
        setEtapaAtual(3)
      }
    } else if (etapaAtual === 3.21) {
      setEtapaAtual(3.2)
    } else if (etapaAtual === 4) {
      if (dados.mordidaCruzada === 'sim' && dados.cruzadaPosterior === 'sim' && dados.tipoMordidaCruzada) {
        setEtapaAtual(3.21)
      } else if (dados.mordidaCruzada === 'sim' && dados.cruzadaAnterior && dados.cruzadaPosterior) {
        setEtapaAtual(3.2)
      } else if (dados.linhaMediaCoincidente === 'nao' && dados.desvioSuperior && dados.desvioInferior) {
        setEtapaAtual(3.1)
      } else {
        setEtapaAtual(3)
      }
    } else if (etapaAtual === 4.1) {
      setEtapaAtual(4)
    } else if (etapaAtual === 4.2) {
      if (dados.overjet === 'inadequado' && dados.medidaOverjet) {
        setEtapaAtual(4.1)
      } else {
        setEtapaAtual(4)
      }
    } else if (etapaAtual === 5) {
      if ((dados.overbite === 'mordida_aberta' || dados.overbite === 'sobremordida') && dados.medidaOverbite) {
        setEtapaAtual(4.2)
      } else if (dados.overjet === 'inadequado' && dados.medidaOverjet) {
        setEtapaAtual(4.1)
      } else {
        setEtapaAtual(4)
      }
    } else if (etapaAtual === 5.1 || etapaAtual === 5.2 || etapaAtual === 5.3) {
      setEtapaAtual(5)
    } else if (etapaAtual === 6) {
      if (dados.giroversoes === 'presentes' && dados.dentesGiroversoes) {
        setEtapaAtual(5.3)
      } else if (dados.apinhamento === 'presentes' && dados.dentesApinhamento) {
        setEtapaAtual(5.2)
      } else if (dados.diastemas === 'presentes' && dados.dentesDiastemas) {
        setEtapaAtual(5.1)
      } else {
        setEtapaAtual(5)
      }
    } else if (etapaAtual === 6.1) {
      setEtapaAtual(6)
    } else if (etapaAtual === 7) {
      if (dados.dorRuidoArticular === 'sim' && dados.ladoDorRuido) {
        setEtapaAtual(6.1)
      } else {
        setEtapaAtual(6)
      }
    } else {
      onVoltar()
    }
  }

  // Função para renderizar cards de opção
  const renderCard = (opcao: any, valorSelecionado: string, onSelecionar: (valor: string) => void) => (
    <div
      key={opcao.id}
      className={`
        relative bg-white border-2 rounded-xl px-4 py-4 cursor-pointer transition-all duration-300 hover:shadow-lg flex items-center justify-center
        flex-1 min-w-[140px] max-w-[200px]
        ${valorSelecionado === opcao.id
          ? 'border-[#F05223] bg-[#F05223]/5 shadow-md transform scale-[1.02]'
          : 'border-[#EAE7EC] hover:border-[#F05223] hover:bg-[#F05223]/5'
        }
      `}
      onClick={() => onSelecionar(opcao.id)}
    >
      <h4 className={`
        text-base font-medium transition-colors duration-300 text-center whitespace-nowrap
        ${valorSelecionado === opcao.id ? 'text-[#F05223]' : 'text-gray-900'}
      `}>
        {opcao.titulo}
      </h4>
    </div>
  )

  // Função para verificar se pode continuar
  const podeContinuar = () => {
    if (etapaAtual === 1) return dados.faseTratamento !== ''
    if (etapaAtual === 2) return dados.classificacaoAngle !== '' && dados.padraoFacial !== ''
    if (etapaAtual === 2.1) return dados.classeIIDivisao !== '' && dados.classeIISubdivisao !== ''
    if (etapaAtual === 2.2) return dados.classeIIISubdivisao !== ''
    if (etapaAtual === 3) return dados.linhaMediaCoincidente !== '' && dados.mordidaCruzada !== ''
    if (etapaAtual === 3.1) return dados.desvioSuperior !== '' && dados.desvioInferior !== ''
    if (etapaAtual === 3.2) return dados.cruzadaAnterior !== '' && dados.cruzadaPosterior !== ''
    if (etapaAtual === 3.21) return dados.tipoMordidaCruzada !== ''
    if (etapaAtual === 4) return dados.overjet !== '' && dados.overbite !== ''
    if (etapaAtual === 4.1) return dados.medidaOverjet !== ''
    if (etapaAtual === 4.2) return dados.medidaOverbite !== ''
    if (etapaAtual === 5) return dados.diastemas !== '' && dados.apinhamento !== '' && dados.giroversoes !== ''
    if (etapaAtual === 5.1) return !!(dados.dentesDiastemas && dados.dentesDiastemas.length > 0)
    if (etapaAtual === 5.2) return !!(dados.dentesApinhamento && dados.dentesApinhamento.length > 0)
    if (etapaAtual === 5.3) return !!(dados.dentesGiroversoes && dados.dentesGiroversoes.length > 0)
    if (etapaAtual === 6) return dados.dorRuidoArticular !== '' && dados.bruxismo !== '' && dados.apertamento !== ''
    if (etapaAtual === 6.1) return dados.ladoDorRuido !== ''
    if (etapaAtual === 7) return dados.respiracao !== '' && dados.doencaPeriodontal !== ''
    return false
  }

  return (
    <div className="space-y-8">
      {/* Cabeçalho dinâmico */}
      <div>
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
        </p>
      </div>

      {/* Breadcrumb de progresso */}
      <div className="flex items-center space-x-2 text-xs desktop:text-sm flex-wrap">
        <span className={etapaAtual >= 1 ? "text-[#F05223] font-medium" : "text-gray-400"}>
          1. Fase
        </span>
        <span className="text-gray-300">→</span>
        <span className={etapaAtual >= 2 ? "text-[#F05223] font-medium" : "text-gray-400"}>
          2. Classificação
        </span>
        <span className="text-gray-300">→</span>
        <span className={etapaAtual >= 3 ? "text-[#F05223] font-medium" : "text-gray-400"}>
          3. Linha/Mordida
        </span>
        <span className="text-gray-300">→</span>
        <span className={etapaAtual >= 4 ? "text-[#F05223] font-medium" : "text-gray-400"}>
          4. Trespasse
        </span>
        <span className="text-gray-300">→</span>
        <span className={etapaAtual >= 5 ? "text-[#F05223] font-medium" : "text-gray-400"}>
          5. Diastemas
        </span>
        <span className="text-gray-300">→</span>
        <span className={etapaAtual >= 6 ? "text-[#F05223] font-medium" : "text-gray-400"}>
          6. Dor/Bruxismo
        </span>
        <span className="text-gray-300">→</span>
        <span className={etapaAtual >= 7 ? "text-[#F05223] font-medium" : "text-gray-400"}>
          7. Respiração
        </span>
      </div>

      {/* Conteúdo das etapas */}
      <div className="space-y-4">
        {/* Etapa 1: Fase do Tratamento */}
        {etapaAtual === 1 && (
          <>
            <Label className="text-sm font-medium text-gray-700">
              Selecione a fase do tratamento
            </Label>
            <div className="flex flex-wrap gap-4 max-w-4xl">
              {fasesTratamento.map((fase) => 
                renderCard(fase, dados.faseTratamento, handleSelecionarFase)
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
                    renderCard(classificacao, dados.classificacaoAngle, handleSelecionarClassificacao)
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
                    renderCard(padrao, dados.padraoFacial || '', handleSelecionarPadraoFacial)
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
                    renderCard(divisao, dados.classeIIDivisao || '', handleSelecionarDivisaoII)
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
                    renderCard(subdivisao, dados.classeIISubdivisao || '', handleSelecionarSubdivisaoII)
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
                  renderCard(subdivisao, dados.classeIIISubdivisao || '', handleSelecionarSubdivisaoIII)
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
                    renderCard(opcao, dados.linhaMediaCoincidente || '', handleSelecionarLinhaMedia)
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
                    renderCard(opcao, dados.mordidaCruzada || '', handleSelecionarMordida)
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
                <div className="flex flex-wrap gap-3 max-w-lg mt-3">
                  {opcoesDesvio.map((opcao) => 
                    renderCard(opcao, dados.desvioSuperior || '', handleSelecionarDesvioSuperior)
                  )}
                </div>
              </div>

              {/* Desvio Inferior */}
              <div>
                <Label className="text-sm font-medium text-gray-700">
                  Desvio inferior
                </Label>
                <div className="flex flex-wrap gap-3 max-w-lg mt-3">
                  {opcoesDesvio.map((opcao) => 
                    renderCard(opcao, dados.desvioInferior || '', handleSelecionarDesvioInferior)
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
                    renderCard(opcao, dados.cruzadaAnterior || '', handleSelecionarCruzadaAnterior)
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
                    renderCard(opcao, dados.cruzadaPosterior || '', handleSelecionarCruzadaPosterior)
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
                  renderCard(tipo, dados.tipoMordidaCruzada || '', handleSelecionarTipoMordidaCruzada)
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
                    renderCard(opcao, dados.overjet || '', handleSelecionarOverjet)
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
                    renderCard(opcao, dados.overbite || '', handleSelecionarOverbite)
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
              <div className="flex flex-wrap gap-4 max-w-5xl mt-3">
                {medidasTrespasse.map((medida) => 
                  renderCard(medida, dados.medidaOverjet || '', handleSelecionarMedidaOverjet)
                )}
              </div>
            </div>
          </>
        )}

        {/* Etapa 4.2: Medida do Trespasse Vertical */}
        {etapaAtual === 4.2 && (
          <>
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
              <h4 className="text-sm font-medium text-yellow-800 mb-1">
                {dados.overbite === 'mordida_aberta' ? 'Mordida Aberta' : 'Sobremordida'}
              </h4>
              <p className="text-sm text-yellow-700">Assinale a medida do trespasse vertical</p>
            </div>

            <div>
              <Label className="text-sm font-medium text-gray-700">
                Assinale a medida do trespasse vertical
              </Label>
              <div className="flex flex-wrap gap-4 max-w-5xl mt-3">
                {medidasTrespasse.map((medida) => 
                  renderCard(medida, dados.medidaOverbite || '', handleSelecionarMedidaOverbite)
                )}
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
                    renderCard(opcao, dados.diastemas || '', handleSelecionarDiastemas)
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
                    renderCard(opcao, dados.apinhamento || '', handleSelecionarApinhamento)
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
                    renderCard(opcao, dados.giroversoes || '', handleSelecionarGiroversoes)
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
              selectedTeeth={dados.dentesDiastemas || []}
              onToothToggle={handleToggleDenteDiastema}
              showDeciduous={dados.faseTratamento !== 'permanente'}
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
              selectedTeeth={dados.dentesApinhamento || []}
              onToothToggle={handleToggleDenteApinhamento}
              showDeciduous={dados.faseTratamento !== 'permanente'}
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
              selectedTeeth={dados.dentesGiroversoes || []}
              onToothToggle={handleToggleDenteGiroversao}
              showDeciduous={dados.faseTratamento !== 'permanente'}
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
                    renderCard(opcao, dados.dorRuidoArticular || '', handleSelecionarDorRuido)
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
                    renderCard(opcao, dados.bruxismo || '', handleSelecionarBruxismo)
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
                    renderCard(opcao, dados.apertamento || '', handleSelecionarApertamento)
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
                  renderCard(lado, dados.ladoDorRuido || '', handleSelecionarLadoDor)
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
                    renderCard(tipo, dados.respiracao || '', handleSelecionarRespiracao)
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
                    renderCard(grau, dados.doencaPeriodontal || '', handleSelecionarDoencaPeriodontal)
                  )}
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Link de Voltar - só mostra a partir da etapa 2 */}
      {etapaAtual > 1 && (
        <div className="mt-4">
          <button 
            type="button"
            onClick={etapaAnterior}
            className="text-sm text-gray-600 hover:text-[#F05223] transition-colors flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Etapa anterior
          </button>
        </div>
      )}
    </div>
  )
})

FormularioOrtodontia.displayName = 'FormularioOrtodontia'

export default FormularioOrtodontia
