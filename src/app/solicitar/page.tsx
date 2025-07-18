'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from "next/navigation"
import Link from "next/link"
import { usePathname } from "next/navigation"
import Header from "@/components/Header"
import Sidebar from "@/components/Sidebar"
import Footer from "@/components/Footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { WarningCircle, CheckCircle, House, FileText, Clock, Receipt, BookOpen, Shield, User, File, Lock, ClipboardText, Check, CreditCard, User as UserIcon, Trash, Plus, Info, ArrowLeft, ArrowSquareOut } from 'phosphor-react'
import { useProcedimentos, type Procedimento } from '@/hooks/useProcedimentos'
import { Alert, AlertDescription } from "@/components/ui/alert"
import FormularioOrtodontia, { FormularioOrtodontiaRef } from "@/components/pre-aprovacao/FormularioOrtodontia"
import { ConfirmacaoSaida } from "@/components/ConfirmacaoSaida"

interface User {
  id: string
  nome: string
  email: string
  cpf_cnpj: string
  codigo_identificacao: string
  tipo_documento: 'CPF' | 'CNPJ' | null
}

interface ProcedimentoSelecionado {
  id: string
  procedimento: Procedimento
  numeroDente?: string
  face?: string
  regiao?: string
  quantidade: number
  dadosOrtodontia?: {
    faseTratamento: string
    classificacaoAngle: string
    classeIIDivisao?: string
    classeIISubdivisao?: string
    classeIIISubdivisao?: string
    padraoFacial?: string
    linhaMediaCoincidente?: string
    mordidaCruzada?: string
    overjet?: string
    overbite?: string
  }
}

interface ConflitoProcedimento {
  tipo: 'excludente' | 'limite' | 'longevidade' | 'outlier'
  mensagem: string
  procedimentos: string[]
}

const mobileMenuItems = [
  { id: 'home', label: 'Painel', icon: House, href: '/dashboard' },
  { id: 'solicitar', label: 'Solicitar', icon: FileText, href: '/solicitar' },
  { id: 'historico', label: 'Histórico', icon: Clock, href: '/historico' },
  { id: 'faturamento', label: 'Faturamento', icon: Receipt, href: '/faturamento' },
  { id: 'material-apoio', label: 'Material', icon: BookOpen, href: '/material-apoio' }
]

// Base de dados de procedimentos odontológicos
// Array estático removido - agora usando dados dinâmicos do Supabase

const steps = [
  {
    id: 1,
    title: 'Elegibilidade',
    icon: Shield,
    status: 'active' // 'completed' | 'active' | 'future'
  },
  {
    id: 2,
    title: 'Dados do paciente',
    icon: User,
    status: 'future'
  },
  {
    id: 3,
    title: 'Procedimentos',
    icon: File,
    status: 'future'
  },
  {
    id: 4,
    title: 'Autenticação',
    icon: Lock,
    status: 'future'
  },
  {
    id: 5,
    title: 'Resumo',
    icon: ClipboardText,
    status: 'future'
  }
]

export default function SolicitarPage() {
  const router = useRouter()
  const pathname = usePathname()
  const [user, setUser] = useState<User | null>(null)
  const [currentStep, setCurrentStep] = useState(1)
  
  // Elegibilidade states
  const [tipoValidacao, setTipoValidacao] = useState<'cpf' | 'carteirinha' | ''>('')
  const [valorInput, setValorInput] = useState('')
  const [inputValido, setInputValido] = useState(false)
  
  // Dados do paciente
  const [dadosPaciente, setDadosPaciente] = useState({
    nome: '',
    dataNascimento: '',
    carteirinha: '',
    cpf: ''
  })

  // Procedimentos states
  const [procedimentoBusca, setProcedimentoBusca] = useState('')
  const [procedimentoSelecionado, setProcedimentoSelecionado] = useState<Procedimento | null>(null)
  const [subProcedimento, setSubProcedimento] = useState('')
  const [fasesTratamento, setFasesTratamento] = useState('')
  const [showDropdown, setShowDropdown] = useState(false)
  
  // Estados para múltiplos procedimentos
  const [procedimentosSelecionados, setProcedimentosSelecionados] = useState<ProcedimentoSelecionado[]>([])
  const [procedimentoEmEdicao, setProcedimentoEmEdicao] = useState<{
    numeroDente: string
    face: string
    regiao: string
    quantidade: string
  }>({ numeroDente: '', face: '', regiao: '', quantidade: '1' })
  
  // Estados para validação de conflitos
  const [conflitos, setConflitos] = useState<ConflitoProcedimento[]>([])
  const [notificacoes, setNotificacoes] = useState<string[]>([])
  
  // Estado para controlar tela de sucesso
  const [solicitacaoEnviada, setSolicitacaoEnviada] = useState(false)
  const [numeroProtocolo, setNumeroProtocolo] = useState('')
  const [dataEnvio, setDataEnvio] = useState('')
  
  // Estado para controlar formulário de pré-aprovação de Ortodontia
  const [mostrarFormularioOrtodontia, setMostrarFormularioOrtodontia] = useState(false)
  const [etapaFormularioOrtodontia, setEtapaFormularioOrtodontia] = useState(1)
  const [podeAvancarOrtodontia, setPodeAvancarOrtodontia] = useState(false)
  const formularioOrtodontiaRef = useRef<FormularioOrtodontiaRef>(null)
  
  // Estado para controlar modal de confirmação de saída
  const [mostrarConfirmacaoSaida, setMostrarConfirmacaoSaida] = useState(false)
  const [dadosOrtodontia, setDadosOrtodontia] = useState({
    faseTratamento: '',
    classificacaoAngle: '',
    classeIIDivisao: '',
    classeIISubdivisao: '',
    classeIIISubdivisao: '',
    padraoFacial: '',
    linhaMediaCoincidente: '',
    mordidaCruzada: '',
    overjet: '',
    overbite: ''
  })
  
  // Hook para buscar procedimentos dinamicamente
  const { procedimentos, loading: loadingProcedimentos, error: errorProcedimentos, buscarProcedimentos, limparBusca } = useProcedimentos()

  // Token de autenticação
  const [token, setToken] = useState('')
  
  // Dados do prestador (simulados - normalmente viriam do contexto de autenticação)
  const [dadosPrestador] = useState({
    nome: 'Dr. João Silva',
    cro: '12345-SP',
    cnpj: '12.345.678/0001-90',
    especialidade: 'Clínica Geral',
    endereco: 'Rua das Flores, 123 - São Paulo/SP'
  })

  // Função para validar CPF
  const validarCPF = (cpf: string): boolean => {
    const cleaned = cpf.replace(/[^\d]/g, '')
    
    if (cleaned.length !== 11) return false
    if (/^(\d)\1{10}$/.test(cleaned)) return false
    
    let soma = 0
    for (let i = 0; i < 9; i++) {
      soma += parseInt(cleaned.charAt(i)) * (10 - i)
    }
    let resto = 11 - (soma % 11)
    let digito1 = resto === 10 || resto === 11 ? 0 : resto
    
    if (digito1 !== parseInt(cleaned.charAt(9))) return false
    
    soma = 0
    for (let i = 0; i < 10; i++) {
      soma += parseInt(cleaned.charAt(i)) * (11 - i)
    }
    resto = 11 - (soma % 11)
    let digito2 = resto === 10 || resto === 11 ? 0 : resto
    
    return digito2 === parseInt(cleaned.charAt(10))
  }

  // Função para formatar CPF
  const formatarCPF = (value: string): string => {
    const cleaned = value.replace(/[^\d]/g, '')
    const limited = cleaned.slice(0, 11)
    
    if (limited.length <= 3) return limited
    if (limited.length <= 6) return `${limited.slice(0, 3)}.${limited.slice(3)}`
    if (limited.length <= 9) return `${limited.slice(0, 3)}.${limited.slice(3, 6)}.${limited.slice(6)}`
    return `${limited.slice(0, 3)}.${limited.slice(3, 6)}.${limited.slice(6, 9)}-${limited.slice(9)}`
  }

  // Função para validar carteirinha
  const validarCarteirinha = (carteirinha: string): boolean => {
    const cleaned = carteirinha.replace(/[^\d]/g, '')
    return cleaned.length === 10
  }

  // Handler para mudança no input
  const handleInputChange = (value: string) => {
    if (tipoValidacao === 'cpf') {
      const formatted = formatarCPF(value)
      setValorInput(formatted)
      const cleaned = value.replace(/[^\d]/g, '')
      setInputValido(cleaned.length === 11 && validarCPF(cleaned))
    } else if (tipoValidacao === 'carteirinha') {
      const cleaned = value.replace(/[^\d]/g, '').slice(0, 10)
      setValorInput(cleaned)
      setInputValido(validarCarteirinha(cleaned))
    }
  }

  // Handler para mudança no tipo de validação
  const handleTipoChange = (tipo: 'cpf' | 'carteirinha') => {
    setTipoValidacao(tipo)
    setValorInput('')
    setInputValido(false)
  }

  // Handler para verificar elegibilidade
  const handleVerificarElegibilidade = () => {
    if (inputValido) {
      setCurrentStep(2)
    }
  }

  // Handler para voltar step
  const handleVoltarStep = () => {
    // Se estiver no formulário de ortodontia, mostrar modal de confirmação
    if (mostrarFormularioOrtodontia) {
      handleVoltarOrtodontia()
      return
    }
    
    // Navegação normal entre steps
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  // Handler para próximo step
  const handleProximoStep = () => {
    // Se estiver mostrando formulário de ortodontia, avança nas etapas internas
    if (mostrarFormularioOrtodontia && formularioOrtodontiaRef.current) {
      formularioOrtodontiaRef.current.proximaEtapa()
      return
    }
    
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1)
    }
  }

  // Handler para busca de procedimentos
  const handleProcedimentoBusca = async (value: string) => {
    setProcedimentoBusca(value)
    setShowDropdown(value.length > 0)
    
    if (value.length === 0) {
      setProcedimentoSelecionado(null)
      setSubProcedimento('')
      setFasesTratamento('')
      setMostrarFormularioOrtodontia(false)
      setProcedimentoEmEdicao({ numeroDente: '', face: '', regiao: '', quantidade: '1' })
      setConflitos([])
      setNotificacoes([])
      limparBusca()
    } else if (value.length >= 2) {
      // Se estiver digitando algo diferente do procedimento selecionado, limpar seleção
      if (procedimentoSelecionado && value !== procedimentoSelecionado.descricao) {
        setProcedimentoSelecionado(null)
        setMostrarFormularioOrtodontia(false)
        setProcedimentoEmEdicao({ numeroDente: '', face: '', regiao: '', quantidade: '1' })
        setConflitos([])
        setNotificacoes([])
      }
      await buscarProcedimentos(value)
    }
  }

  // Handler para seleção de procedimento
  const handleSelecionarProcedimento = (procedimento: Procedimento) => {
    // Verificar se é um procedimento de Ortodontia
    if (procedimento.especialidade?.toUpperCase().includes('ORTODONTIA') && procedimento.requer_pre_aprovacao) {
      // Abrir formulário de pré-aprovação de Ortodontia
      setProcedimentoSelecionado(procedimento)
      setMostrarFormularioOrtodontia(true)
      setEtapaFormularioOrtodontia(1)
      setPodeAvancarOrtodontia(false) // Inicialmente desabilitado
      setProcedimentoBusca(procedimento.descricao) // Manter procedimento no campo
      setShowDropdown(false)
      return
    }
    
    // Procedimento normal
    setProcedimentoSelecionado(procedimento)
    setProcedimentoBusca(procedimento.descricao) // Manter procedimento no campo
    setShowDropdown(false)
    setSubProcedimento('')
    setFasesTratamento('')
    setProcedimentoEmEdicao({ numeroDente: '', face: '', regiao: '', quantidade: '1' })
    setConflitos([])
    setNotificacoes([])
  }

  // Handler para seleção de sub-procedimento
  const handleSubProcedimento = (value: string) => {
    setSubProcedimento(value)
    setFasesTratamento('')
  }

  // Validações de conflitos
  const validarConflitos = (novoProcedimento: ProcedimentoSelecionado): ConflitoProcedimento[] => {
    const conflitosEncontrados: ConflitoProcedimento[] = []
    
    // Verificar procedimentos excludentes (baseado no banco de dados)
    const excludentes = [
      // Não pode fazer duas restaurações diferentes no mesmo dente
      { proc1: '85100196', proc2: '98241150', mensagem: 'Não pode fazer duas restaurações diferentes no mesmo dente' },
      // Não pode extrair dente que está sendo tratado canal
      { proc1: '82000875', proc2: '85200140', mensagem: 'Não pode extrair dente que está sendo tratado canal' }
    ]
    
    procedimentosSelecionados.forEach(procExistente => {
      const codigoNovo = novoProcedimento.procedimento.codigo_tuss
      const codigoExistente = procExistente.procedimento.codigo_tuss
      
      // Verificar se são excludentes
      const conflito = excludentes.find(ex => 
        (ex.proc1 === codigoNovo && ex.proc2 === codigoExistente) ||
        (ex.proc2 === codigoNovo && ex.proc1 === codigoExistente)
      )
      
      if (conflito && novoProcedimento.numeroDente === procExistente.numeroDente) {
        conflitosEncontrados.push({
          tipo: 'excludente',
          mensagem: conflito.mensagem,
          procedimentos: [codigoNovo, codigoExistente]
        })
      }
    })
    
    return conflitosEncontrados
  }

  // Validar limite de 8 procedimentos
  const validarLimite = (): boolean => {
    return procedimentosSelecionados.length < 8
  }

  // Adicionar procedimento à lista
  const handleAdicionarProcedimento = () => {
    if (!procedimentoSelecionado) return
    
    // Verificar limite de 8 procedimentos
    if (!validarLimite()) {
      setNotificacoes(['Máximo de 8 procedimentos por guia atingido'])
      return
    }
    
    // Validar campos obrigatórios
    if (procedimentoSelecionado.requer_dente && !procedimentoEmEdicao.numeroDente) {
      setNotificacoes(['Número do dente é obrigatório para este procedimento'])
      return
    }
    
    if (procedimentoSelecionado.requer_face && !procedimentoEmEdicao.face) {
      setNotificacoes(['Face do dente é obrigatória para este procedimento'])
      return
    }
    
    if (procedimentoSelecionado.requer_regiao && !procedimentoEmEdicao.regiao) {
      setNotificacoes(['Região é obrigatória para este procedimento'])
      return
    }
    
    const novoProcedimento: ProcedimentoSelecionado = {
      id: Date.now().toString(),
      procedimento: procedimentoSelecionado,
      numeroDente: procedimentoEmEdicao.numeroDente || undefined,
      face: procedimentoEmEdicao.face || undefined,
      regiao: procedimentoEmEdicao.regiao || undefined,
      quantidade: parseInt(procedimentoEmEdicao.quantidade) || 1,
      dadosOrtodontia: dadosOrtodontia.faseTratamento ? {
        faseTratamento: dadosOrtodontia.faseTratamento,
        classificacaoAngle: dadosOrtodontia.classificacaoAngle,
        classeIIDivisao: dadosOrtodontia.classeIIDivisao,
        classeIISubdivisao: dadosOrtodontia.classeIISubdivisao,
        classeIIISubdivisao: dadosOrtodontia.classeIIISubdivisao,
        padraoFacial: dadosOrtodontia.padraoFacial,
        linhaMediaCoincidente: dadosOrtodontia.linhaMediaCoincidente,
        mordidaCruzada: dadosOrtodontia.mordidaCruzada,
        overjet: dadosOrtodontia.overjet,
        overbite: dadosOrtodontia.overbite
      } : undefined
    }
    
    // Validar conflitos
    const conflitosEncontrados = validarConflitos(novoProcedimento)
    
    if (conflitosEncontrados.length > 0) {
      setConflitos(conflitosEncontrados)
      setNotificacoes(conflitosEncontrados.map(c => c.mensagem))
      return
    }
    
    // Adicionar procedimento
    setProcedimentosSelecionados([...procedimentosSelecionados, novoProcedimento])
    
    // Limpar seleção
    setProcedimentoSelecionado(null)
    setProcedimentoBusca('') // Limpar campo de busca ao adicionar
    setProcedimentoEmEdicao({ numeroDente: '', face: '', regiao: '', quantidade: '1' })
    setDadosOrtodontia({
      faseTratamento: '',
      classificacaoAngle: '',
      classeIIDivisao: '',
      classeIISubdivisao: '',
      classeIIISubdivisao: '',
      padraoFacial: '',
      linhaMediaCoincidente: '',
      mordidaCruzada: '',
      overjet: '',
      overbite: ''
    })
    setConflitos([])
    setNotificacoes([])
    setShowDropdown(false) // Fechar dropdown
    
    // Verificar notificações especiais
    const notificacoesEspeciais = []
    
    // Verificar múltiplas restaurações (>4)
    const restauracoes = [...procedimentosSelecionados, novoProcedimento].filter(p => 
      p.procedimento.codigo_tuss === '85100196'
    )
    if (restauracoes.length >= 4) {
      notificacoesEspeciais.push('Atenção: Múltiplas restaurações detectadas. Pode ser necessário SIC para justificativa.')
    }
    
    if (notificacoesEspeciais.length > 0) {
      setNotificacoes(notificacoesEspeciais)
    }
  }

  // Remover procedimento da lista
  const handleRemoverProcedimento = (id: string) => {
    setProcedimentosSelecionados(procedimentosSelecionados.filter(p => p.id !== id))
    setConflitos([])
    setNotificacoes([])
  }

  // Verificar se pode avançar no step 3
  const podeAvancarStep3 = () => {
    return procedimentosSelecionados.length > 0
  }

  // Handler para mudança no token
  const handleTokenChange = (value: string) => {
    // Permitir apenas números e limitar a 6 dígitos
    const cleaned = value.replace(/[^0-9]/g, '').slice(0, 6)
    setToken(cleaned)
  }
  
  // Verificar se pode avançar no step 4
  const podeAvancarStep4 = () => {
    return token.length === 6
  }
  
  
  // Função para gerar número de protocolo
  const gerarNumeroProtocolo = () => {
    const hoje = new Date()
    const ano = hoje.getFullYear()
    const mes = String(hoje.getMonth() + 1).padStart(2, '0')
    const dia = String(hoje.getDate()).padStart(2, '0')
    const sequencial = String(Math.floor(Math.random() * 999999) + 1).padStart(6, '0')
    return `ODO${ano}${mes}${dia}-${sequencial}`
  }
  
  // Handler para enviar solicitação
  const handleEnviarSolicitacao = () => {
    // Gerar dados de envio
    const protocolo = gerarNumeroProtocolo()
    const agora = new Date()
    
    setNumeroProtocolo(protocolo)
    setDataEnvio(agora.toLocaleString('pt-BR', {
      day: '2-digit',
      month: '2-digit', 
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }))
    
    // Aqui seria feita a integração com a API para enviar a solicitação
    console.log('Enviando solicitação...', {
      protocolo: protocolo,
      prestador: dadosPrestador,
      paciente: dadosPaciente,
      procedimentos: procedimentosSelecionados,
      token: token
    })
    
    // Exibir tela de sucesso
    setSolicitacaoEnviada(true)
  }
  
  // Handler para voltar ao dashboard
  const handleVoltarDashboard = () => {
    router.push('/dashboard')
  }
  
  // Handler para ir ao histórico
  const handleIrHistorico = () => {
    router.push('/historico')
  }
  
  // Handlers para formulário de Ortodontia
  const handleContinuarOrtodontia = (dados: any) => {
    setDadosOrtodontia(dados)
    setMostrarFormularioOrtodontia(false)
    
    // Adicionar automaticamente o procedimento de ortodontia
    if (procedimentoSelecionado) {
      const novoProcedimento: ProcedimentoSelecionado = {
        id: Date.now().toString(),
        procedimento: procedimentoSelecionado,
        quantidade: 1,
        dadosOrtodontia: dados
      }
      
      setProcedimentosSelecionados([...procedimentosSelecionados, novoProcedimento])
      
      // Limpar seleção
      setProcedimentoSelecionado(null)
      setProcedimentoBusca('')
      setDadosOrtodontia({
        faseTratamento: '',
        classificacaoAngle: '',
        classeIIDivisao: '',
        classeIISubdivisao: '',
        classeIIISubdivisao: '',
        padraoFacial: '',
        linhaMediaCoincidente: '',
        mordidaCruzada: '',
        overjet: '',
        overbite: ''
      })
      setShowDropdown(false)
    }
  }
  
  const handleVoltarOrtodontia = () => {
    // Mostrar modal de confirmação antes de sair do formulário de ortodontia
    setMostrarConfirmacaoSaida(true)
  }
  
  const confirmarSaidaOrtodontia = () => {
    setMostrarFormularioOrtodontia(false)
    setProcedimentoSelecionado(null)
    setProcedimentoBusca('') // Limpar campo de busca
    setDadosOrtodontia({
      faseTratamento: '',
      classificacaoAngle: '',
      classeIIDivisao: '',
      classeIISubdivisao: '',
      classeIIISubdivisao: '',
      padraoFacial: '',
      linhaMediaCoincidente: '',
      mordidaCruzada: '',
      overjet: '',
      overbite: ''
    })
    setShowDropdown(false) // Fechar dropdown
    setPodeAvancarOrtodontia(false)
    setEtapaFormularioOrtodontia(1)
    setMostrarConfirmacaoSaida(false) // Fechar modal
  }

  // Callback para receber atualizações do formulário de ortodontia
  const handleOrtodontiaStatusChange = (podeAvancar: boolean, etapa: number) => {
    setPodeAvancarOrtodontia(podeAvancar)
    setEtapaFormularioOrtodontia(etapa)
  }

  useEffect(() => {
    const userData = sessionStorage.getItem("user")
    if (!userData) {
      router.push("/")
    } else {
      setUser(JSON.parse(userData))
    }
  }, [router])

  if (!user) return null

  // Se a solicitação foi enviada, mostrar tela de sucesso
  if (solicitacaoEnviada) {
    return (
      <div className="min-h-screen bg-white grid grid-rows-[77px_auto_1fr_auto] desktop:grid-rows-[77px_1fr_auto] desktop:grid-cols-[256px_1fr]">
        <Header />
        
        {/* Mobile Navigation */}
        <nav className="bg-white border-b border-gray-200 p-2 desktop:hidden col-span-full">
          <div className="flex space-x-1 overflow-x-auto">
            {mobileMenuItems.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.id}
                  href={item.href}
                  className={`flex flex-col items-center justify-center p-2 rounded-lg min-w-[60px] transition-colors ${
                    isActive
                      ? 'bg-[#F05223] text-white'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <Icon className="h-5 w-5 mb-1" />
                  <span className="text-xs font-normal">{item.label}</span>
                </Link>
              )
            })}
          </div>
        </nav>

        <Sidebar />

        <main className="p-4 desktop:p-8 overflow-auto desktop:col-start-2">
          <div className="max-w-7xl mx-auto">
            <div className="mb-8">
              <h4 className="text-lg font-medium text-[#F05223] mb-1">Solicitar</h4>
              <h1 className="text-3xl font-bold text-gray-900">Solicitação Enviada com Sucesso!</h1>
            </div>

            {/* Tela de Sucesso */}
            <div className="bg-white border border-[#EAE7EC] rounded-xl p-8 mb-20">
              {/* Cabeçalho de Sucesso */}
              <div className="text-center mb-8">
                <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                  <CheckCircle className="h-8 w-8 text-green-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Guia Emitida com Sucesso!</h2>
                <p className="text-base text-gray-600">
                  Sua solicitação foi enviada e está sendo processada pelo nosso sistema.
                </p>
              </div>

              {/* Informações do Protocolo */}
              <div className="bg-green-50 border border-green-200 rounded-xl p-6 mb-8">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Dados da Solicitação</h3>
                  <div className="flex items-center">
                    <span className="bg-white border border-[#EAE7EC] rounded-[300px] text-sm font-bold text-[#323232] px-4 py-2 inline-flex items-center gap-2">
                      <span className="w-[22px] h-[22px] bg-[#04843F] rounded-full inline-flex items-center justify-center">
                        <Check className="h-3.5 w-3.5 text-white" />
                      </span>
                      Emitida
                    </span>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 tablet:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700">Número do Protocolo</label>
                    <div className="text-lg font-mono font-bold text-green-700">{numeroProtocolo}</div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">Data/Hora do Envio</label>
                    <div className="text-base text-gray-900">{dataEnvio}</div>
                  </div>
                </div>
              </div>

              {/* Dados do Prestador */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <User className="h-5 w-5 text-[#F05223]" />
                  Dados do Prestador
                </h3>
                
                <div className="grid grid-cols-1 tablet:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700">Nome</label>
                    <div className="text-base text-gray-900">{dadosPrestador.nome}</div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">CRO</label>
                    <div className="text-base text-gray-900">{dadosPrestador.cro}</div>
                  </div>
                </div>
              </div>

              {/* Dados do Paciente */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <UserIcon className="h-5 w-5 text-[#F05223]" />
                  Dados do Paciente
                </h3>
                
                <div className="grid grid-cols-1 tablet:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700">Identificação</label>
                    <div className="text-base text-gray-900">
                      {tipoValidacao === 'cpf' ? 'CPF' : 'Carteirinha'}: {valorInput}
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">Status</label>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span className="text-base text-green-600 font-medium">Elegibilidade verificada</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Procedimentos */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <File className="h-5 w-5 text-[#F05223]" />
                  Procedimentos Solicitados
                  <span className="text-sm font-normal text-gray-500">({procedimentosSelecionados.length} procedimento{procedimentosSelecionados.length !== 1 ? 's' : ''})</span>
                </h3>
                
                <div className="space-y-3 mb-4">
                  {procedimentosSelecionados.map((procSelecionado, index) => (
                    <div key={procSelecionado.id} className="border-b border-gray-200 pb-3 last:border-b-0">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="text-sm font-medium text-gray-500">#{index + 1}</span>
                            <h4 className="font-medium text-gray-900">
                              {procSelecionado.procedimento.descricao}
                            </h4>
                            {procSelecionado.procedimento.requer_pre_aprovacao && (
                              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                                Pré-aprovação
                              </span>
                            )}
                          </div>
                          
                          <div className="grid grid-cols-2 tablet:grid-cols-4 gap-2 text-sm text-gray-600">
                            <div>
                              <span className="font-medium">Código:</span> {procSelecionado.procedimento.codigo_tuss}
                            </div>
                            {procSelecionado.numeroDente && (
                              <div>
                                <span className="font-medium">Dente:</span> {procSelecionado.numeroDente}
                              </div>
                            )}
                            {procSelecionado.face && (
                              <div>
                                <span className="font-medium">Face:</span> {procSelecionado.face}
                              </div>
                            )}
                            {procSelecionado.regiao && (
                              <div>
                                <span className="font-medium">Região:</span> {procSelecionado.regiao}
                              </div>
                            )}
                            {procSelecionado.dadosOrtodontia?.faseTratamento && (
                              <div className="tablet:col-span-4">
                                <span className="font-medium">Ortodontia:</span> 
                                <span className="capitalize ml-1">
                                  {procSelecionado.dadosOrtodontia.faseTratamento}
                                  {procSelecionado.dadosOrtodontia.classificacaoAngle && ` • ${procSelecionado.dadosOrtodontia.classificacaoAngle.replace('_', ' ')}`}
                                  {procSelecionado.dadosOrtodontia.padraoFacial && ` • ${procSelecionado.dadosOrtodontia.padraoFacial.replace('_', ' ')}`}
                                  {procSelecionado.dadosOrtodontia.overjet && ` • Overjet ${procSelecionado.dadosOrtodontia.overjet}`}
                                  {procSelecionado.dadosOrtodontia.overbite && ` • Overbite ${procSelecionado.dadosOrtodontia.overbite}`}
                                </span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tooltip de Acompanhamento */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-8">
                <div className="flex items-start gap-3">
                  <Info className="h-5 w-5 text-blue-600 mt-0.5" />
                  <div className="flex-1">
                    <h4 className="text-sm font-medium text-blue-800 mb-1">Acompanhe sua solicitação</h4>
                    <p className="text-sm text-blue-700">
                      Você pode acompanhar o andamento desta guia na página de <strong>Histórico</strong>. 
                      Lá você encontrará todas as informações sobre o status da análise e aprovação.
                    </p>
                  </div>
                </div>
              </div>

              {/* Botões de Ação */}
              <div className="flex flex-col mobile:flex-row gap-4 justify-center">
                <Button 
                  type="button"
                  variant="outline"
                  onClick={handleIrHistorico}
                  className="px-8 h-[44px] text-base font-bold border border-[#F05223] text-[#F05223] hover:bg-[#F05223] hover:text-white transition-colors rounded-[300px] flex items-center gap-2"
                >
                  <ArrowSquareOut className="h-4 w-4" />
                  Ver no Histórico
                </Button>
                <Button 
                  type="button"
                  onClick={handleVoltarDashboard}
                  className="px-8 h-[44px] text-base font-bold bg-[#F05223] hover:bg-[#D94820] transition-all duration-200 rounded-[300px] flex items-center gap-2"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Voltar ao Dashboard
                </Button>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white grid grid-rows-[77px_auto_1fr_auto] desktop:grid-rows-[77px_1fr_auto] desktop:grid-cols-[256px_1fr]">
      <Header />
      
      {/* Mobile Navigation */}
      <nav className="bg-white border-b border-gray-200 p-2 desktop:hidden col-span-full">
        <div className="flex space-x-1 overflow-x-auto">
          {mobileMenuItems.map((item) => {
            const isActive = pathname === item.href
            const Icon = item.icon
            
            return (
              <Link
                key={item.id}
                href={item.href}
                className={`
                  flex flex-col items-center min-w-0 px-3 py-2 rounded-lg transition-all
                  ${isActive 
                    ? 'bg-orange-50 text-[#F05223]' 
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }
                `}
              >
                <Icon className={`h-4 w-4 ${isActive ? 'text-[#F05223]' : 'text-gray-500'}`} />
                <span className="text-xs mt-1 truncate">{item.label}</span>
              </Link>
            )
          })}
        </div>
      </nav>
      
      <Sidebar />
      <main className="p-4 desktop:p-8 overflow-auto desktop:col-start-2">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h4 className="text-lg font-medium text-[#F05223] mb-1">Solicitar</h4>
            <h1 className="text-3xl font-bold text-gray-900">Solicitar Tratamento</h1>
          </div>

          {/* Progress Stepper Section */}
          <div className="py-8 bg-white border border-[#EAE7EC] rounded-xl mb-8">
            <div className="px-8">
              <div className="relative">
                {/* Background Line */}
                <div className="absolute top-6 left-6 right-6 h-0.5 bg-gray-200"></div>
                <div className="absolute top-6 left-6 h-0.5 bg-[#F05223] transition-all duration-300" 
                     style={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}></div>
                
                <div className="flex items-center justify-between relative">
                  {steps.map((step, index) => {
                    const Icon = step.icon
                    const isActive = step.id === currentStep
                    const isCompleted = step.id < currentStep
                    const isFuture = step.id > currentStep
                    
                    return (
                      <div key={step.id} className="flex flex-col items-center relative">
                        {/* Step Circle */}
                        <div
                          className={`
                            relative w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all duration-300 z-10 shadow-sm
                            ${isCompleted 
                              ? 'border-[#F05223] bg-[#F05223] text-white' 
                              : isActive 
                                ? 'border-[#F05223] bg-[#F05223] text-white shadow-md' 
                                : 'border-gray-300 bg-white text-gray-400'
                            }
                          `}
                        >
                          {isCompleted ? (
                            <Check className="h-6 w-6" />
                          ) : (
                            <Icon className="h-6 w-6" />
                          )}
                        </div>
                        
                        <div className="mt-4 text-center min-w-20">
                          <p className={`text-sm font-medium transition-colors duration-300 ${
                            isActive || isCompleted 
                              ? 'text-[#F05223]' 
                              : 'text-gray-500'
                          }`}>
                            {step.title}
                          </p>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Content Section */}
          <div className="mb-20">
            {/* Conteúdo da Etapa Atual */}
            {currentStep === 1 && (
              <div className="bg-white border border-[#EAE7EC] rounded-xl p-8">
                  <div className="space-y-4 mb-8">
                    <h2 className="text-xl font-semibold text-gray-900">Validação de Elegibilidade</h2>
                    <p className="text-sm text-gray-600">
                      Informe o CPF ou número de carteirinha para verificar a elegibilidade do beneficiário
                    </p>
                  </div>

                  <div className="space-y-8">
                    {/* Tipo de Validação */}
                    <div className="space-y-4">
                      <Label className="text-sm font-medium text-gray-700">Selecione o tipo de validação</Label>
                      <div className="grid grid-cols-1 tablet:grid-cols-2 gap-4 max-w-2xl">
                        {/* Card CPF */}
                        <div 
                          className={`
                            relative bg-white border-2 rounded-xl p-4 cursor-pointer transition-all duration-300 hover:shadow-lg group
                            ${tipoValidacao === 'cpf' 
                              ? 'border-[#F05223] bg-[#F05223]/5 shadow-md transform scale-[1.02]' 
                              : 'border-[#EAE7EC] hover:border-[#F05223]'
                            }
                          `}
                          onClick={() => handleTipoChange('cpf')}
                        >
                          
                          <div className="flex items-center justify-between">
                            {/* Conteúdo à esquerda */}
                            <div className="flex-1">
                              <h3 className={`
                                text-lg font-semibold transition-colors duration-300
                                ${tipoValidacao === 'cpf' ? 'text-[#F05223]' : 'text-gray-900'}
                              `}>
                                Documento CPF
                              </h3>
                              <p className="text-sm text-gray-600 mt-1">
                                Validação através do CPF do beneficiário
                              </p>
                            </div>
                            
                            {/* Ícone à direita */}
                            <div className={`
                              w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ml-4
                              ${tipoValidacao === 'cpf' 
                                ? 'bg-[#F05223] text-white' 
                                : 'bg-[#F4F4F4] text-[#5C5C5C] group-hover:bg-[#E8E8E8]'
                              }
                            `}>
                              <UserIcon className="w-6 h-6" />
                            </div>
                          </div>
                          
                          {/* Input radio escondido para acessibilidade */}
                          <input
                            type="radio"
                            id="cpf"
                            name="tipoValidacao"
                            value="cpf"
                            checked={tipoValidacao === 'cpf'}
                            onChange={() => handleTipoChange('cpf')}
                            className="sr-only"
                          />
                        </div>

                        {/* Card Carteirinha */}
                        <div 
                          className={`
                            relative bg-white border-2 rounded-xl p-4 cursor-pointer transition-all duration-300 hover:shadow-lg group
                            ${tipoValidacao === 'carteirinha' 
                              ? 'border-[#F05223] bg-[#F05223]/5 shadow-md transform scale-[1.02]' 
                              : 'border-[#EAE7EC] hover:border-[#F05223]'
                            }
                          `}
                          onClick={() => handleTipoChange('carteirinha')}
                        >
                          
                          <div className="flex items-center justify-between">
                            {/* Conteúdo à esquerda */}
                            <div className="flex-1">
                              <h3 className={`
                                text-lg font-semibold transition-colors duration-300
                                ${tipoValidacao === 'carteirinha' ? 'text-[#F05223]' : 'text-gray-900'}
                              `}>
                                Número da Carteirinha
                              </h3>
                              <p className="text-sm text-gray-600 mt-1">
                                Validação através do número da carteirinha
                              </p>
                            </div>
                            
                            {/* Ícone à direita */}
                            <div className={`
                              w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ml-4
                              ${tipoValidacao === 'carteirinha' 
                                ? 'bg-[#F05223] text-white' 
                                : 'bg-[#F4F4F4] text-[#5C5C5C] group-hover:bg-[#E8E8E8]'
                              }
                            `}>
                              <CreditCard className="w-6 h-6" />
                            </div>
                          </div>
                          
                          {/* Input radio escondido para acessibilidade */}
                          <input
                            type="radio"
                            id="carteirinha"
                            name="tipoValidacao"
                            value="carteirinha"
                            checked={tipoValidacao === 'carteirinha'}
                            onChange={() => handleTipoChange('carteirinha')}
                            className="sr-only"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Input de Dados */}
                    {tipoValidacao && (
                      <div className="space-y-3">
                        <Label htmlFor="identificacao" className="text-sm font-medium text-gray-700">
                          {tipoValidacao === 'cpf' ? 'CPF do beneficiário' : 'Número da carteirinha do beneficiário'}
                        </Label>
                        <div className="max-w-md">
                          <Input
                            id="identificacao"
                            type="text"
                            value={valorInput}
                            onChange={(e) => handleInputChange(e.target.value)}
                            placeholder={tipoValidacao === 'cpf' ? '000.000.000-00' : '1234567890'}
                            className="h-[44px] text-base border border-[#EAE7EC] focus:border-[#EAE7EC] focus:ring-[#1355B4]"
                          />
                        </div>
                      </div>
                    )}

                    {/* Botão Verificar */}
                    {tipoValidacao && (
                      <div className="pt-4 flex justify-end">
                        <Button 
                          type="button"
                          disabled={!inputValido}
                          onClick={handleVerificarElegibilidade}
                          className="px-8 h-[44px] text-base font-bold bg-[#F05223] hover:bg-[#D94820] disabled:bg-gray-300 disabled:text-gray-500 transition-all duration-200 rounded-[300px]"
                        >
                          Verificar Elegibilidade
                        </Button>
                      </div>
                    )}
                  </div>
              </div>
            )}

            {/* Step 2 - Dados do Paciente */}
            {currentStep === 2 && (
              <div className="bg-white border border-[#EAE7EC] rounded-xl p-8">
                  <div className="space-y-4 mb-8">
                    <h2 className="text-xl font-semibold text-gray-900">Dados do Paciente</h2>
                    <p className="text-sm text-gray-600">
                      Confirme os dados do beneficiário encontrado
                    </p>
                  </div>

                  <div className="space-y-8">
                    {/* Dados Pessoais */}
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                        <UserIcon className="h-5 w-5 text-[#F05223]" />
                        Dados Pessoais
                      </h3>
                      
                      <div className="grid grid-cols-1 tablet:grid-cols-2 gap-6">
                        {/* Nome */}
                        <div className="tablet:col-span-2">
                          <Label className="text-sm font-medium text-gray-700">Nome Completo</Label>
                          <p className="mt-1 text-base text-gray-900 font-medium">Maria Silva Santos</p>
                        </div>

                        {/* CPF */}
                        <div>
                          <Label className="text-sm font-medium text-gray-700">CPF</Label>
                          <p className="mt-1 text-base text-gray-900 font-medium">123.456.789-01</p>
                        </div>

                        {/* Status */}
                        <div>
                          <Label className="text-sm font-medium text-gray-700">Status</Label>
                          <div className="mt-1">
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800 border border-green-200">
                              <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                              Ativo
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Dados do Plano */}
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                        <CreditCard className="h-5 w-5 text-[#F05223]" />
                        Dados do Plano
                      </h3>
                      
                      <div className="grid grid-cols-1 tablet:grid-cols-2 gap-6">
                        {/* Código de Carteirinha */}
                        <div>
                          <Label className="text-sm font-medium text-gray-700">Número da Carteirinha</Label>
                          <p className="mt-1 text-base text-gray-900 font-medium">0000000000</p>
                        </div>

                        {/* Carência */}
                        <div>
                          <Label className="text-sm font-medium text-gray-700">Carência</Label>
                          <p className="mt-1 text-base text-gray-900 font-medium">Sem carência</p>
                        </div>
                      </div>
                    </div>

                    {/* Botões de Navegação */}
                    <div className="flex justify-between pt-6 border-t border-gray-100">
                      <Button 
                        type="button"
                        variant="outline"
                        onClick={handleVoltarStep}
                        className="px-8 h-[44px] text-base font-bold border border-[#F05223] text-[#F05223] hover:bg-[#F05223] hover:text-white transition-colors rounded-[300px]"
                      >
                        Voltar
                      </Button>
                      <Button 
                        type="button"
                        onClick={handleProximoStep}
                        className="px-8 h-[44px] text-base font-bold bg-[#F05223] hover:bg-[#D94820] transition-all duration-200 rounded-[300px]"
                      >
                        Próximo
                      </Button>
                    </div>
                  </div>
              </div>
            )}

            {/* Step 3 - Procedimentos */}
            {currentStep === 3 && (
              <div className="bg-white border border-[#EAE7EC] rounded-xl p-8">
                  <div className="space-y-4 mb-8">
                    <h2 className="text-xl font-semibold text-gray-900">Seleção de Procedimentos</h2>
                    <p className="text-sm text-gray-600">
                      Busque e selecione até 8 procedimentos desejados
                    </p>
                  </div>

                  <div className="space-y-8">
                    {/* Busca de Procedimentos - SEMPRE NO TOPO */}
                    <div className="space-y-3 relative">
                      <Label htmlFor="procedimento-busca" className="text-sm font-medium text-gray-700">
                        Buscar procedimento
                      </Label>
                      <div className="max-w-md">
                        <Input
                          id="procedimento-busca"
                          type="text"
                          value={procedimentoBusca}
                          onChange={(e) => handleProcedimentoBusca(e.target.value)}
                          placeholder="Digite o código ou nome do procedimento"
                          className="h-[44px] text-sm border border-[#EAE7EC] focus:border-[#EAE7EC] focus:ring-[#1355B4]"
                        />
                      </div>
                      
                      {/* Dropdown de Procedimentos */}
                      {showDropdown && (
                        <div className="absolute z-10 max-w-md w-full mt-1 bg-white border border-[#EAE7EC] rounded-lg shadow-lg max-h-60 overflow-y-auto">
                          {loadingProcedimentos && (
                            <div className="p-3 text-center text-gray-500">
                              <div className="animate-spin inline-block w-4 h-4 border-2 border-gray-400 border-t-transparent rounded-full mr-2"></div>
                              Buscando procedimentos...
                            </div>
                          )}
                          
                          {errorProcedimentos && (
                            <div className="p-3 text-center text-red-500">
                              {errorProcedimentos}
                            </div>
                          )}
                          
                          {!loadingProcedimentos && !errorProcedimentos && procedimentos.length === 0 && procedimentoBusca.length >= 2 && (
                            <div className="p-3 text-center text-gray-500">
                              Nenhum procedimento encontrado
                            </div>
                          )}
                          
                          {!loadingProcedimentos && procedimentos.length > 0 && procedimentos.map((proc) => (
                            <div
                              key={proc.id}
                              onClick={() => handleSelecionarProcedimento(proc)}
                              className="p-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-b-0 hover:bg-[#F05223]/5 transition-colors"
                            >
                              <div className="flex justify-between items-start">
                                <div className="flex-1">
                                  <p className="font-medium text-gray-900">{proc.descricao}</p>
                                  <p className="text-sm text-gray-500">{proc.especialidade}</p>
                                  {proc.requer_pre_aprovacao && (
                                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 mt-1">
                                      Requer pré-aprovação
                                    </span>
                                  )}
                                </div>
                                <div className="text-right ml-4">
                                  <span className="text-sm text-gray-400">{proc.codigo_tuss}</span>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Lista de Procedimentos Selecionados */}
                    {procedimentosSelecionados.length > 0 && (
                      <div className="bg-gray-50 border border-[#EAE7EC] rounded-xl p-6">
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="text-lg font-semibold text-gray-900">Procedimentos Selecionados</h3>
                          <span className="text-sm text-gray-500">
                            {procedimentosSelecionados.length}/8
                          </span>
                        </div>
                        
                        <div className="space-y-3">
                          {procedimentosSelecionados.map((procSelecionado) => (
                            <div key={procSelecionado.id} className="bg-white border border-[#EAE7EC] rounded-lg p-4">
                              <div className="flex items-start justify-between">
                                <div className="flex-1">
                                  <div className="flex items-center gap-2 mb-2">
                                    <h4 className="font-medium text-gray-900">
                                      {procSelecionado.procedimento.descricao}
                                    </h4>
                                    {procSelecionado.procedimento.requer_pre_aprovacao && (
                                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                                        Pré-aprovação
                                      </span>
                                    )}
                                  </div>
                                  
                                  <div className="grid grid-cols-2 tablet:grid-cols-4 gap-2 text-sm text-gray-600">
                                    <div>
                                      <span className="font-medium">Código:</span> {procSelecionado.procedimento.codigo_tuss}
                                    </div>
                                    {procSelecionado.numeroDente && (
                                      <div>
                                        <span className="font-medium">Dente:</span> {procSelecionado.numeroDente}
                                      </div>
                                    )}
                                    {procSelecionado.face && (
                                      <div>
                                        <span className="font-medium">Face:</span> {procSelecionado.face}
                                      </div>
                                    )}
                                    {procSelecionado.regiao && (
                                      <div>
                                        <span className="font-medium">Região:</span> {procSelecionado.regiao}
                                      </div>
                                    )}
                                    {procSelecionado.dadosOrtodontia?.faseTratamento && (
                                      <div className="tablet:col-span-4">
                                        <span className="font-medium">Ortodontia:</span> 
                                        <span className="capitalize ml-1">
                                          {procSelecionado.dadosOrtodontia.faseTratamento}
                                          {procSelecionado.dadosOrtodontia.classificacaoAngle && ` • ${procSelecionado.dadosOrtodontia.classificacaoAngle.replace('_', ' ')}`}
                                          {procSelecionado.dadosOrtodontia.padraoFacial && ` • ${procSelecionado.dadosOrtodontia.padraoFacial.replace('_', ' ')}`}
                                          {procSelecionado.dadosOrtodontia.overjet && ` • Overjet ${procSelecionado.dadosOrtodontia.overjet}`}
                                          {procSelecionado.dadosOrtodontia.overbite && ` • Overbite ${procSelecionado.dadosOrtodontia.overbite}`}
                                        </span>
                                      </div>
                                    )}
                                  </div>
                                  
                                  <div className="mt-2 text-sm text-gray-500">
                                    {procSelecionado.procedimento.especialidade}
                                  </div>
                                </div>
                                
                                <Button
                                  type="button"
                                  variant="outline"
                                  size="sm"
                                  onClick={() => handleRemoverProcedimento(procSelecionado.id)}
                                  className="text-red-600 border-red-200 hover:bg-red-50"
                                >
                                  <Trash className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Notificações e Conflitos */}
                    {(notificacoes.length > 0 || conflitos.length > 0) && (
                      <div className="space-y-3">
                        {conflitos.map((conflito, index) => (
                          <Alert key={index} className="border-red-200 bg-red-50">
                            <WarningCircle className="h-4 w-4 text-red-600" />
                            <AlertDescription className="text-red-800">
                              <strong>Conflito detectado:</strong> {conflito.mensagem}
                            </AlertDescription>
                          </Alert>
                        ))}
                        
                        {notificacoes.map((notificacao, index) => (
                          <Alert key={index} className="border-blue-200 bg-blue-50">
                            <Info className="h-4 w-4 text-blue-600" />
                            <AlertDescription className="text-blue-800">
                              {notificacao}
                            </AlertDescription>
                          </Alert>
                        ))}
                      </div>
                    )}

                    {/* Formulário de Pré-Aprovação de Ortodontia */}
                    {mostrarFormularioOrtodontia && procedimentoSelecionado && (
                      <div className="border border-[#EAE7EC] rounded-xl p-6 bg-gray-50">
                        <FormularioOrtodontia 
                          ref={formularioOrtodontiaRef}
                          onContinuar={handleContinuarOrtodontia}
                          onVoltar={handleVoltarOrtodontia}
                          onStatusChange={handleOrtodontiaStatusChange}
                        />
                      </div>
                    )}

                    {/* Campos específicos do procedimento */}
                    {procedimentoSelecionado && !mostrarFormularioOrtodontia && (
                      <div className="space-y-4 border border-[#EAE7EC] rounded-xl p-6 bg-gray-50">
                        <h3 className="text-lg font-semibold text-gray-900">
                          Informações do Procedimento
                        </h3>
                        
                        <div className="grid grid-cols-1 tablet:grid-cols-2 gap-4">
                          <div>
                            <Label className="text-sm font-medium text-gray-700">Código TUSS</Label>
                            <div className="text-base font-medium text-gray-900">{procedimentoSelecionado.codigo_tuss}</div>
                          </div>
                          <div>
                            <Label className="text-sm font-medium text-gray-700">Especialidade</Label>
                            <div className="text-base font-medium text-gray-900">{procedimentoSelecionado.especialidade}</div>
                          </div>
                        </div>
                        
                        {/* Informações da Ortodontia se foi preenchido */}
                        {dadosOrtodontia.faseTratamento && procedimentoSelecionado.especialidade?.toUpperCase().includes('ORTODONTIA') && (
                          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                            <h4 className="text-sm font-medium text-blue-800 mb-2">Dados da Pré-Aprovação de Ortodontia</h4>
                            <div className="grid grid-cols-1 tablet:grid-cols-3 gap-4">
                              <div>
                                <Label className="text-sm font-medium text-blue-700">Fase</Label>
                                <div className="text-base font-medium text-blue-900 capitalize">{dadosOrtodontia.faseTratamento}</div>
                              </div>
                              {dadosOrtodontia.classificacaoAngle && (
                                <div>
                                  <Label className="text-sm font-medium text-blue-700">Classificação</Label>
                                  <div className="text-base font-medium text-blue-900 capitalize">{dadosOrtodontia.classificacaoAngle.replace('_', ' ')}</div>
                                </div>
                              )}
                              {dadosOrtodontia.padraoFacial && (
                                <div>
                                  <Label className="text-sm font-medium text-blue-700">Padrão Facial</Label>
                                  <div className="text-base font-medium text-blue-900 capitalize">{dadosOrtodontia.padraoFacial.replace('_', ' ')}</div>
                                </div>
                              )}
                              {dadosOrtodontia.classeIIDivisao && (
                                <div>
                                  <Label className="text-sm font-medium text-blue-700">Divisão</Label>
                                  <div className="text-base font-medium text-blue-900 capitalize">{dadosOrtodontia.classeIIDivisao.replace('_', ' ')}</div>
                                </div>
                              )}
                              {dadosOrtodontia.classeIISubdivisao && (
                                <div>
                                  <Label className="text-sm font-medium text-blue-700">Subdivisão II</Label>
                                  <div className="text-base font-medium text-blue-900 capitalize">{dadosOrtodontia.classeIISubdivisao}</div>
                                </div>
                              )}
                              {dadosOrtodontia.classeIIISubdivisao && (
                                <div>
                                  <Label className="text-sm font-medium text-blue-700">Subdivisão III</Label>
                                  <div className="text-base font-medium text-blue-900 capitalize">{dadosOrtodontia.classeIIISubdivisao}</div>
                                </div>
                              )}
                            </div>
                          </div>
                        )}
                        
                        {/* Campos condicionais baseados nas regras do procedimento */}
                        <div className="space-y-4">
                          {procedimentoSelecionado.requer_dente && (
                            <div>
                              <Label htmlFor="numero-dente" className="text-sm font-medium text-gray-700">
                                Número do Dente *
                              </Label>
                              <Input
                                id="numero-dente"
                                type="text"
                                value={procedimentoEmEdicao.numeroDente}
                                onChange={(e) => setProcedimentoEmEdicao({...procedimentoEmEdicao, numeroDente: e.target.value})}
                                placeholder="Ex: 11, 21, 31..."
                                className="h-[44px] text-base border border-[#EAE7EC] focus:border-[#EAE7EC] focus:ring-[#1355B4]"
                              />
                            </div>
                          )}
                          
                          {procedimentoSelecionado.requer_face && (
                            <div>
                              <Label htmlFor="face-dente" className="text-sm font-medium text-gray-700">
                                Face do Dente *
                              </Label>
                              <select 
                                value={procedimentoEmEdicao.face}
                                onChange={(e) => setProcedimentoEmEdicao({...procedimentoEmEdicao, face: e.target.value})}
                                className="w-full h-[44px] px-3 border border-[#EAE7EC] rounded-lg focus:border-[#EAE7EC] focus:ring-[#1355B4] text-base"
                              >
                                <option value="">Selecione a face</option>
                                <option value="mesial">Mesial</option>
                                <option value="distal">Distal</option>
                                <option value="vestibular">Vestibular</option>
                                <option value="lingual">Lingual</option>
                                <option value="oclusal">Oclusal</option>
                              </select>
                            </div>
                          )}
                          
                          {procedimentoSelecionado.requer_regiao && (
                            <div>
                              <Label htmlFor="regiao" className="text-sm font-medium text-gray-700">
                                Região *
                              </Label>
                              <Input
                                id="regiao"
                                type="text"
                                value={procedimentoEmEdicao.regiao}
                                onChange={(e) => setProcedimentoEmEdicao({...procedimentoEmEdicao, regiao: e.target.value})}
                                placeholder="Descreva a região"
                                className="h-[44px] text-base border border-[#EAE7EC] focus:border-[#EAE7EC] focus:ring-[#1355B4]"
                              />
                            </div>
                          )}
                        </div>
                        
                        {procedimentoSelecionado.requer_pre_aprovacao && (
                          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                            <div className="flex">
                              <WarningCircle className="h-5 w-5 text-yellow-400 mr-2 mt-0.5" />
                              <div>
                                <h4 className="text-sm font-medium text-yellow-800">Pré-aprovação Necessária</h4>
                                <p className="text-sm text-yellow-700 mt-1">
                                  Este procedimento requer pré-aprovação antes da execução.
                                </p>
                              </div>
                            </div>
                          </div>
                        )}
                        
                      </div>
                    )}

                    {/* Botão Adicionar Procedimento - Não mostrar para pré-aprovação de ortodontia */}
                    {procedimentoSelecionado && !mostrarFormularioOrtodontia && (
                      <div className="flex justify-end">
                        <Button 
                          type="button"
                          onClick={handleAdicionarProcedimento}
                          disabled={procedimentosSelecionados.length >= 8}
                          className="bg-[#F05223] hover:bg-[#D94820] text-white px-6 h-[44px] text-base font-bold rounded-[300px] flex items-center gap-2"
                        >
                          <Plus className="h-4 w-4" />
                          Adicionar Procedimento
                        </Button>
                      </div>
                    )}

                    {/* Botões de Navegação */}
                    <div className="flex justify-between pt-6 border-t border-gray-100">
                      <Button 
                        type="button"
                        variant="outline"
                        onClick={handleVoltarStep}
                        className="px-8 h-[44px] text-base font-bold border border-[#F05223] text-[#F05223] hover:bg-[#F05223] hover:text-white transition-colors rounded-[300px]"
                      >
                        Voltar
                      </Button>
                      <Button 
                        type="button"
                        disabled={
                          mostrarFormularioOrtodontia 
                            ? !podeAvancarOrtodontia
                            : !podeAvancarStep3()
                        }
                        onClick={handleProximoStep}
                        className="px-8 h-[44px] text-base font-bold bg-[#F05223] hover:bg-[#D94820] disabled:bg-gray-300 disabled:text-gray-500 transition-all duration-200 rounded-[300px]"
                      >
                        Próximo
                      </Button>
                    </div>
                  </div>
              </div>
            )}

            {/* Step 4 - Autenticação */}
            {currentStep === 4 && (
              <div className="bg-white border border-[#EAE7EC] rounded-xl p-8">
                  <div className="space-y-4 mb-8">
                    <h2 className="text-xl font-semibold text-gray-900">Autenticação</h2>
                    <p className="text-sm text-gray-600">
                      Solicite ao paciente o token que foi gerado e está dentro da carteirinha no Aplicativo Odonto
                    </p>
                  </div>

                  <div className="space-y-8">
                    {/* Input do Token */}
                    <div className="space-y-3">
                      <Label htmlFor="token" className="text-sm font-medium text-gray-700">
                        Token do aplicativo
                      </Label>
                      <div className="max-w-xs">
                        <Input
                          id="token"
                          type="text"
                          value={token}
                          onChange={(e) => handleTokenChange(e.target.value)}
                          placeholder="123456"
                          maxLength={6}
                          className="h-[44px] text-sm border border-[#EAE7EC] focus:border-[#EAE7EC] focus:ring-[#1355B4] text-center font-mono"
                        />
                      </div>
                      <p className="text-sm text-gray-500">
                        Digite o token de 6 números (para teste: 123456)
                      </p>
                    </div>

                    {/* Botões de Navegação */}
                    <div className="flex justify-between pt-6 border-t border-gray-100">
                      <Button 
                        type="button"
                        variant="outline"
                        onClick={handleVoltarStep}
                        className="px-8 h-[44px] text-base font-bold border border-[#F05223] text-[#F05223] hover:bg-[#F05223] hover:text-white transition-colors rounded-[300px]"
                      >
                        Voltar
                      </Button>
                      <Button 
                        type="button"
                        disabled={!podeAvancarStep4()}
                        onClick={handleProximoStep}
                        className="px-8 h-[44px] text-base font-bold bg-[#F05223] hover:bg-[#D94820] disabled:bg-gray-300 disabled:text-gray-500 transition-all duration-200 rounded-[300px]"
                      >
                        Próximo
                      </Button>
                    </div>
                  </div>
              </div>
            )}

            {/* Step 5 - Resumo */}
            {currentStep === 5 && (
              <div className="bg-white border border-[#EAE7EC] rounded-xl p-8">
                  <div className="space-y-4 mb-8">
                    <h2 className="text-xl font-semibold text-gray-900">Resumo da Solicitação</h2>
                    <p className="text-sm text-gray-600">
                      Revise todas as informações antes de enviar a solicitação para análise
                    </p>
                  </div>

                  <div className="space-y-8">
                    {/* Dados do Prestador */}
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                        <User className="h-5 w-5 text-[#F05223]" />
                        Dados do Prestador
                      </h3>
                      
                      <div className="grid grid-cols-1 tablet:grid-cols-2 gap-4">
                        <div>
                          <Label className="text-sm font-medium text-gray-700">Nome</Label>
                          <div className="text-base text-gray-900">{dadosPrestador.nome}</div>
                        </div>
                        <div>
                          <Label className="text-sm font-medium text-gray-700">CRO</Label>
                          <div className="text-base text-gray-900">{dadosPrestador.cro}</div>
                        </div>
                        <div>
                          <Label className="text-sm font-medium text-gray-700">CNPJ</Label>
                          <div className="text-base text-gray-900">{dadosPrestador.cnpj}</div>
                        </div>
                        <div>
                          <Label className="text-sm font-medium text-gray-700">Especialidade</Label>
                          <div className="text-base text-gray-900">{dadosPrestador.especialidade}</div>
                        </div>
                        <div className="tablet:col-span-2">
                          <Label className="text-sm font-medium text-gray-700">Endereço</Label>
                          <div className="text-base text-gray-900">{dadosPrestador.endereco}</div>
                        </div>
                      </div>
                    </div>

                    {/* Dados do Paciente */}
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                        <UserIcon className="h-5 w-5 text-[#F05223]" />
                        Dados do Paciente
                      </h3>
                      
                      <div className="grid grid-cols-1 tablet:grid-cols-2 gap-4">
                        <div>
                          <Label className="text-sm font-medium text-gray-700">Identificação</Label>
                          <div className="text-base text-gray-900">
                            {tipoValidacao === 'cpf' ? 'CPF' : 'Carteirinha'}: {valorInput}
                          </div>
                        </div>
                        <div>
                          <Label className="text-sm font-medium text-gray-700">Status</Label>
                          <div className="flex items-center gap-2">
                            <CheckCircle className="h-4 w-4 text-green-600" />
                            <span className="text-base text-green-600 font-medium">Elegibilidade verificada</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Procedimentos Selecionados */}
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                        <File className="h-5 w-5 text-[#F05223]" />
                        Procedimentos Solicitados
                        <span className="text-sm font-normal text-gray-500">({procedimentosSelecionados.length} procedimento{procedimentosSelecionados.length !== 1 ? 's' : ''})</span>
                      </h3>
                      
                      <div className="space-y-4">
                        {procedimentosSelecionados.map((procSelecionado, index) => (
                          <div key={procSelecionado.id} className="border-b border-gray-200 pb-4 last:border-b-0">
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-2">
                                  <span className="text-sm font-medium text-gray-500">#{index + 1}</span>
                                  <h4 className="font-medium text-gray-900">
                                    {procSelecionado.procedimento.descricao}
                                  </h4>
                                  {procSelecionado.procedimento.requer_pre_aprovacao && (
                                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                                      Pré-aprovação
                                    </span>
                                  )}
                                </div>
                                
                                <div className="grid grid-cols-2 tablet:grid-cols-4 gap-2 text-sm text-gray-600 mb-2">
                                  <div>
                                    <span className="font-medium">Código:</span> {procSelecionado.procedimento.codigo_tuss}
                                  </div>
                                  {procSelecionado.numeroDente && (
                                    <div>
                                      <span className="font-medium">Dente:</span> {procSelecionado.numeroDente}
                                    </div>
                                  )}
                                  {procSelecionado.face && (
                                    <div>
                                      <span className="font-medium">Face:</span> {procSelecionado.face}
                                    </div>
                                  )}
                                  {procSelecionado.regiao && (
                                    <div>
                                      <span className="font-medium">Região:</span> {procSelecionado.regiao}
                                    </div>
                                  )}
                                  {procSelecionado.dadosOrtodontia?.faseTratamento && (
                                    <div className="tablet:col-span-4">
                                      <span className="font-medium">Ortodontia:</span> 
                                      <span className="capitalize ml-1">
                                        {procSelecionado.dadosOrtodontia.faseTratamento}
                                        {procSelecionado.dadosOrtodontia.classificacaoAngle && ` • ${procSelecionado.dadosOrtodontia.classificacaoAngle.replace('_', ' ')}`}
                                        {procSelecionado.dadosOrtodontia.padraoFacial && ` • ${procSelecionado.dadosOrtodontia.padraoFacial.replace('_', ' ')}`}
                                        {procSelecionado.dadosOrtodontia.overjet && ` • Overjet ${procSelecionado.dadosOrtodontia.overjet}`}
                                        {procSelecionado.dadosOrtodontia.overbite && ` • Overbite ${procSelecionado.dadosOrtodontia.overbite}`}
                                      </span>
                                    </div>
                                  )}
                                </div>
                                
                                <div className="text-sm text-gray-500">
                                  {procSelecionado.procedimento.especialidade}
                                </div>
                              </div>
                              
                              <div className="text-right">
                                <div className="text-sm text-gray-500">
                                  Qtd: {procSelecionado.quantidade}
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Autenticação */}
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                        <Lock className="h-5 w-5 text-[#F05223]" />
                        Autenticação
                      </h3>
                      
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <span className="text-base text-green-600 font-medium">Token validado com sucesso</span>
                        <span className="text-sm text-gray-500 ml-2">({token})</span>
                      </div>
                    </div>

                    {/* Botões de Navegação */}
                    <div className="flex justify-between pt-6 border-t border-gray-100">
                      <Button 
                        type="button"
                        variant="outline"
                        onClick={handleVoltarStep}
                        className="px-8 h-[44px] text-base font-bold border border-[#F05223] text-[#F05223] hover:bg-[#F05223] hover:text-white transition-colors rounded-[300px]"
                      >
                        Voltar
                      </Button>
                      <Button 
                        type="button"
                        onClick={handleEnviarSolicitacao}
                        className="px-8 h-[44px] text-base font-bold bg-[#F05223] hover:bg-[#D94820] transition-all duration-200 rounded-[300px] flex items-center gap-2"
                      >
                        <CreditCard className="h-4 w-4" />
                        Enviar Solicitação
                      </Button>
                    </div>
                  </div>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
      
      {/* Modal de Confirmação de Saída do Formulário de Ortodontia */}
      {mostrarConfirmacaoSaida && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="fixed inset-0 bg-black/50" onClick={() => setMostrarConfirmacaoSaida(false)} />
          <div className="relative bg-white p-6 rounded-lg shadow-lg max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold mb-4">Sair do formulário de ortodontia</h3>
            <p className="text-gray-600 mb-6">
              Deseja sair do formulário de ortodontia? Os dados preenchidos serão perdidos.
            </p>
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setMostrarConfirmacaoSaida(false)}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Cancelar
              </button>
              <button
                onClick={confirmarSaidaOrtodontia}
                className="px-4 py-2 bg-[#F05223] text-white rounded-lg hover:bg-[#D94820]"
              >
                Sair do formulário
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}