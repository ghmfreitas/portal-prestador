"use client"

import { useEffect, useState, Suspense, lazy } from "react"
import { useRouter } from "next/navigation"
import dynamic from 'next/dynamic'
import Header from "@/components/Header"
import Sidebar from "@/components/Sidebar"
import Footer from "@/components/Footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'

// Lazy load heavy components
const LineChart = dynamic(() => import('recharts').then(mod => mod.LineChart), { ssr: false })
const BarChart = dynamic(() => import('recharts').then(mod => mod.BarChart), { ssr: false })
const PieChart = dynamic(() => import('recharts').then(mod => mod.PieChart), { ssr: false })
const ResponsiveContainer = dynamic(() => import('recharts').then(mod => mod.ResponsiveContainer), { ssr: false })
const XAxis = dynamic(() => import('recharts').then(mod => mod.XAxis), { ssr: false })
const YAxis = dynamic(() => import('recharts').then(mod => mod.YAxis), { ssr: false })
const CartesianGrid = dynamic(() => import('recharts').then(mod => mod.CartesianGrid), { ssr: false })
const Tooltip = dynamic(() => import('recharts').then(mod => mod.Tooltip), { ssr: false })
const Legend = dynamic(() => import('recharts').then(mod => mod.Legend), { ssr: false })
const Line = dynamic(() => import('recharts').then(mod => mod.Line), { ssr: false })
const Bar = dynamic(() => import('recharts').then(mod => mod.Bar), { ssr: false })
const Pie = dynamic(() => import('recharts').then(mod => mod.Pie), { ssr: false })
const Cell = dynamic(() => import('recharts').then(mod => mod.Cell), { ssr: false })

// Componentes de faturamento
import { StatusBadge } from '@/components/faturamento/StatusBadge'
import { GTODetailsPage } from '@/components/faturamento/GTODetailsPage'
import { ProcedureDetailsPage } from '@/components/faturamento/ProcedureDetailsPage'
import { ProcedureDetailsExpiredPage } from '@/components/faturamento/ProcedureDetailsExpiredPage'
import { GlosaRecursoPage } from '@/components/faturamento/GlosaRecursoPage'
import { MetricsCard, MetricsGrid } from '@/components/faturamento/MetricsCard'

// Tipos
import { GTOData, Procedimento, PaymentStatus, GTOStatus, ViewState, PagamentoAgendado, DespesaDedutivel } from '@/types/faturamento'

import { 
  MagnifyingGlass, 
  CreditCard, 
  X, 
  Eye, 
  CurrencyDollar,
  FileText,
  Users,
  TrendUp,
  Calendar,
  Clock,
  Warning,
  CheckCircle,
  House, 
  Receipt, 
  BookOpen,
  Download,
  CaretDown,
  CaretUp
} from "phosphor-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

interface User {
  id: string
  nome: string
  email: string
  cpf_cnpj: string
  codigo_identificacao: string
  tipo_documento: 'CPF' | 'CNPJ' | null
}

const mobileMenuItems = [
  { id: 'home', label: 'Painel', icon: House, href: '/dashboard' },
  { id: 'solicitar', label: 'Solicitar', icon: FileText, href: '/solicitar' },
  { id: 'acompanhar', label: 'Acompanhar', icon: Clock, href: '/acompanhar' },
  { id: 'faturamento', label: 'Faturamento', icon: Receipt, href: '/faturamento' },
  { id: 'material-apoio', label: 'Material', icon: BookOpen, href: '/material-apoio' }
]

// Função para calcular status da GTO baseado nos procedimentos
const calculateGTOStatus = (procedimentos: Procedimento[]): GTOStatus => {
  const allPaid = procedimentos.every(p => p.status === "pagamento_realizado");
  const allGlosa = procedimentos.every(p => p.status === "glosado");
  const somePaid = procedimentos.some(p => p.status === "pagamento_realizado");
  
  if (allPaid) return "paga_totalmente";
  if (allGlosa) return "glosada";
  if (somePaid) return "parcialmente_paga";
  return "aguardando_pagamento";
};

// Mock data expandido com novos tipos
const expandedMockData: GTOData[] = [
  {
    id: "1",
    data: "20 Out 2025",
    numeroGuia: "GTO-2024-0001",
    beneficiario: "Maria Silva",
    carteirinha: "123456789",
    valor: 1250.00,
    status: "parcialmente_paga",
    procedimentos: [
      {
        id: "1-1",
        nome: "Limpeza e Profilaxia Dental",
        codigo: "01.01.01.01",
        valor: 250,
        status: "pagamento_realizado" as PaymentStatus,
      },
      {
        id: "1-2",
        nome: "Restauração de Amálgama - 1 Face",
        codigo: "02.02.01.01",
        valor: 1000,
        status: "glosado" as PaymentStatus,
        motivoGlosa: "Documentação incompleta - RX inicial não anexado",
      },
    ],
  },
  {
    id: "2",
    data: "20 Out 2025",
    numeroGuia: "GTO-2024-0002",
    beneficiario: "João Oliveira",
    carteirinha: "987654321",
    valor: 180.0,
    status: "paga_totalmente",
    procedimentos: [
      {
        id: "2-1",
        nome: "Consulta Odontológica",
        codigo: "01.01.01.03",
        valor: 180,
        status: "pagamento_realizado" as PaymentStatus,
      },
    ],
  },
  {
    id: "3",
    data: "20 Out 2025",
    numeroGuia: "GTO-2024-0003",
    beneficiario: "Pedro Santos",
    carteirinha: "456789123",
    valor: 450.0,
    status: "em_analise",
    procedimentos: [
      {
        id: "3-1",
        nome: "Radiografia Periapical",
        codigo: "04.01.01.01",
        valor: 150,
        status: "auditado" as PaymentStatus,
      },
      {
        id: "3-2",
        nome: "Extração Simples",
        codigo: "05.01.01.01",
        valor: 300,
        status: "auditado" as PaymentStatus,
      },
    ],
  },
  {
    id: "4",
    data: "05 Jan 2025",
    numeroGuia: "GTO-2024-0004",
    beneficiario: "Carlos Mendes",
    carteirinha: "789123456",
    valor: 850.00,
    status: "glosada",
    procedimentos: [
      {
        id: "4-1",
        nome: "Prótese Parcial Removível",
        codigo: "07.01.02.01",
        valor: 850,
        status: "prazo_expirado" as PaymentStatus,
        motivoGlosa: "Ausência de modelos de estudo",
        dataExecucao: "05/01/2025",
        observacoes: "Prazo para recurso expirou em 20/01/2025",
      },
    ],
  },
];

const procedimentosPopulares = [
  { nome: "Limpeza e Profilaxia", quantidade: 245, valor: 14700 },
  { nome: "Restauração", quantidade: 189, valor: 22680 },
  { nome: "Consulta Odontológica", quantidade: 167, valor: 30060 },
  { nome: "Radiografia", quantidade: 134, valor: 8040 },
  { nome: "Aplicação de Flúor", quantidade: 98, valor: 3920 }
]

const pagamentosAgendados: PagamentoAgendado[] = [
  {
    id: "1",
    gto: "GTO-2024-0001",
    beneficiario: "Maria Silva",
    valor: 180.00,
    dataVencimento: "25 Jul 2025",
    status: "pendente",
    diasRestantes: 3
  },
  {
    id: "2",
    gto: "GTO-2024-0002",
    beneficiario: "João Oliveira",
    valor: 320.00,
    dataVencimento: "22 Jul 2025",
    status: "vencido",
    diasRestantes: 0
  },
];

// Dados para gráficos
const dadosEvolucaoFaturamento = [
  { mes: 'Jan', valor: 25000 },
  { mes: 'Fev', valor: 28000 },
  { mes: 'Mar', valor: 32000 },
  { mes: 'Abr', valor: 29000 },
  { mes: 'Mai', valor: 35000 },
  { mes: 'Jun', valor: 38000 },
];

const dadosDistribuicaoStatus = [
  { name: 'Pagamento Realizado', value: 75, color: '#10B981' },
  { name: 'Aguardando', value: 15, color: '#F59E0B' },
  { name: 'Glosado', value: 10, color: '#EF4444' },
];

const despesasDedutivas: DespesaDedutivel[] = [
  { id: '1', categoria: 'Material de Consumo', valor: 25000, descricao: 'Materiais odontológicos', data: '2024-12-31' },
  { id: '2', categoria: 'Aluguel', valor: 48000, descricao: 'Aluguel do consultório', data: '2024-12-31' },
  { id: '3', categoria: 'Funcionários', valor: 35768, descricao: 'Salários e encargos', data: '2024-12-31' },
];

// Loading component
const LoadingSpinner = () => (
  <div className="flex items-center justify-center p-8">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#F05223]"></div>
  </div>
);

export default function FaturamentoPage() {
  console.log("Faturamento: Component mounting")
  
  const router = useRouter()
  const pathname = usePathname()
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  
  // Estados principais
  const [currentView, setCurrentView] = useState<ViewState>('list')
  const [gtoData, setGtoData] = useState<GTOData[]>(expandedMockData)
  const [selectedGTO, setSelectedGTO] = useState<GTOData | null>(null)
  const [selectedProcedure, setSelectedProcedure] = useState<Procedimento | null>(null)
  const [showGlosaModal, setShowGlosaModal] = useState(false)
  
  // Estados de filtro e busca
  const [statusFilter, setStatusFilter] = useState<string>("todos")
  const [searchTerm, setSearchTerm] = useState<string>("")
  const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set())
  const [filtroStatus, setFiltroStatus] = useState<string>("todos")
  const [anoFiscal, setAnoFiscal] = useState<string>("2024")

  useEffect(() => {
    const loadUserData = async () => {
      try {
        console.log("Faturamento: Starting to load user data")
        const userData = sessionStorage.getItem("user")
        console.log("Faturamento: User data from session:", userData ? "Found" : "Not found")
        
        if (!userData) {
          console.log("Faturamento: No user data, redirecting to login")
          router.push("/")
        } else {
          const parsedUser = JSON.parse(userData)
          console.log("Faturamento: User parsed successfully:", parsedUser.nome)
          setUser(parsedUser)
          // Add a small delay to ensure components are ready
          setTimeout(() => {
            console.log("Faturamento: Setting loading to false")
            setIsLoading(false)
          }, 100)
        }
      } catch (error) {
        console.error("Faturamento: Error loading user data:", error)
        setError("Erro ao carregar dados do usuário")
        setIsLoading(false)
      }
    }
    
    loadUserData()
  }, [router])

  const filteredRecords = gtoData.filter(record => {
    const matchesStatus = statusFilter === "todos" || record.status === statusFilter
    const matchesSearch = searchTerm === "" || 
      record.numeroGuia.toLowerCase().includes(searchTerm.toLowerCase()) || 
      record.carteirinha.includes(searchTerm) ||
      record.beneficiario.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesStatus && matchesSearch
  })

  const toggleRowExpansion = (rowId: string) => {
    const newExpanded = new Set(expandedRows)
    if (newExpanded.has(rowId)) {
      newExpanded.delete(rowId)
    } else {
      newExpanded.add(rowId)
    }
    setExpandedRows(newExpanded)
  }

  const getStatusConfig = (status: string) => {
    switch (status) {
      case "pendente":
        return { label: "Pendente", color: "bg-yellow-100 text-yellow-800", icon: Clock };
      case "vencido":
        return { label: "Vencido", color: "bg-red-100 text-red-800", icon: Warning };
      case "pago":
        return { label: "Pago", color: "bg-green-100 text-green-800", icon: CheckCircle };
      case "agendado":
        return { label: "Agendado", color: "bg-blue-100 text-blue-800", icon: Calendar };
      default:
        return { label: "Pendente", color: "bg-gray-100 text-gray-800", icon: Clock };
    }
  }

  const handleViewGTO = (gto: GTOData) => {
    setSelectedGTO(gto)
    setCurrentView('gto-details')
  }

  const handleViewProcedure = (procedure: Procedimento) => {
    console.log('handleViewProcedure called with:', procedure)
    setSelectedProcedure(procedure)
    if (procedure.status === 'prazo_expirado') {
      console.log('Setting view to: procedure-details-expired')
      setCurrentView('procedure-details-expired')
    } else {
      console.log('Setting view to: procedure-details')
      setCurrentView('procedure-details')
    }
  }

  const handleOpenGlosaRecurso = () => {
    setShowGlosaModal(true)
  }

  const handleOpenManifestacao = () => {
    console.log('Abrir formulário de manifestação')
    // TODO: Implementar modal ou navegação para manifestação
    alert('Funcionalidade de manifestação será implementada em breve')
  }

  const handleFaturar = (recordId: string) => {
    setGtoData(prev => 
      prev.map(record => 
        record.id === recordId 
          ? { ...record, status: "paga_totalmente" }
          : record
      )
    )
  }

  const handleFaturarProcedimento = (recordId: string, procedimentoId: string) => {
    setGtoData(prev => 
      prev.map(record => {
        if (record.id === recordId) {
          const updatedProcedimentos = record.procedimentos.map(proc =>
            proc.id === procedimentoId 
              ? { ...proc, status: "pagamento_realizado" as PaymentStatus }
              : proc
          )
          return { 
            ...record, 
            procedimentos: updatedProcedimentos,
            status: calculateGTOStatus(updatedProcedimentos)
          }
        }
        return record
      })
    )
  }

  const pagamentosFiltrados = pagamentosAgendados.filter(pagamento => {
    if (filtroStatus !== "todos" && pagamento.status !== filtroStatus) {
      return false;
    }
    return true;
  })

  const totalPendente = pagamentosAgendados
    .filter(p => p.status === "pendente" || p.status === "agendado")
    .reduce((sum, p) => sum + p.valor, 0)

  const totalVencido = pagamentosAgendados
    .filter(p => p.status === "vencido")
    .reduce((sum, p) => sum + p.valor, 0)

  const totalPago = pagamentosAgendados
    .filter(p => p.status === "pago")
    .reduce((sum, p) => sum + p.valor, 0)

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="max-w-md">
          <CardHeader>
            <CardTitle className="text-red-600">Erro</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{error}</p>
            <Button 
              onClick={() => window.location.reload()} 
              className="mt-4"
            >
              Recarregar página
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white grid grid-rows-[77px_auto_1fr_auto] lg:grid-rows-[77px_1fr_auto] lg:grid-cols-[256px_1fr]">
        <Header />
        <Sidebar />
        <main className="p-4 lg:p-8 overflow-auto lg:col-start-2 flex items-center justify-center">
          <LoadingSpinner />
        </main>
        <Footer />
      </div>
    )
  }

  if (!user) {
    return null
  }

  return (
    <div className="min-h-screen bg-white grid grid-rows-[77px_auto_1fr_auto] lg:grid-rows-[77px_1fr_auto] lg:grid-cols-[256px_1fr]">
      <Header />
      
      {/* Mobile Navigation */}
      <nav className="bg-white border-b border-gray-200 p-2 lg:hidden col-span-full">
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
      
      <main className="p-4 lg:p-8 overflow-auto lg:col-start-2">
        <div className="max-w-7xl mx-auto">
          {/* Breadcrumb */}
          <div className="mb-8">
            <h4 className="text-lg font-medium text-[#F05223] mb-1">Home</h4>
            <h1 className="text-3xl font-bold text-gray-900">Faturamento</h1>
          </div>

          {/* Tabs System */}
          <Tabs defaultValue="acompanhamento" className="w-full">
            <TabsList className="grid w-full grid-cols-4 mb-8 bg-gray-100">
              <TabsTrigger 
                value="acompanhamento" 
                className="data-[state=active]:bg-[#F05223] data-[state=active]:text-white"
              >
                Acompanhamento
              </TabsTrigger>
              <TabsTrigger 
                value="demonstrativo"
                className="data-[state=active]:bg-[#F05223] data-[state=active]:text-white"
              >
                Demonstrativo
              </TabsTrigger>
              <TabsTrigger 
                value="cronograma"
                className="data-[state=active]:bg-[#F05223] data-[state=active]:text-white"
              >
                Cronograma
              </TabsTrigger>
              <TabsTrigger 
                value="imposto"
                className="data-[state=active]:bg-[#F05223] data-[state=active]:text-white"
              >
                Imposto de Renda
              </TabsTrigger>
            </TabsList>

            {/* Tab 1: Acompanhamento */}
            <TabsContent value="acompanhamento" className="mt-0">
              {currentView === 'list' && (
                <Card>
                  <CardHeader>
                    <CardTitle>Histórico de GTOs</CardTitle>
                    <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
                      <div className="relative flex-1 max-w-md w-full">
                        <MagnifyingGlass className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-5 w-5" />
                        <input
                          type="text"
                          placeholder="Busque número da guia ou carteirinha"
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          className="w-full pl-10 pr-4 h-[44px] bg-[#F4F4F4] border border-[#EAE7EC] rounded-full focus:outline-none focus:ring-2 focus:ring-[#1355B4] focus:border-[#EAE7EC] text-gray-500 placeholder:text-gray-500"
                        />
                      </div>
                      <Select value={statusFilter} onValueChange={setStatusFilter}>
                        <SelectTrigger className="w-full lg:w-48">
                          <SelectValue placeholder="Filtrar por status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="todos">Todos os status</SelectItem>
                          <SelectItem value="paga_totalmente">Paga Totalmente</SelectItem>
                          <SelectItem value="parcialmente_paga">Parcialmente Paga</SelectItem>
                          <SelectItem value="glosada">Glosada</SelectItem>
                          <SelectItem value="em_analise">Em Análise</SelectItem>
                          <SelectItem value="autorizada">Autorizada</SelectItem>
                          <SelectItem value="aguardando_pagamento">Aguardando Pagamento</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {filteredRecords.map((record) => (
                        <Card key={record.id} className="border border-gray-200">
                          <CardContent className="p-0">
                            <div 
                              className="p-6 cursor-pointer hover:bg-gray-50 transition-colors"
                              onClick={() => toggleRowExpansion(record.id)}
                            >
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-6">
                                  <div className="flex items-center gap-2 text-gray-600">
                                    <Calendar className="w-4 h-4" />
                                    <span className="text-sm">{record.data}</span>
                                  </div>
                                  <div className="flex items-center gap-2 text-gray-600">
                                    <FileText className="w-4 h-4" />
                                    <span className="text-sm">{record.numeroGuia}</span>
                                  </div>
                                  <div className="flex items-center gap-2 text-gray-600">
                                    <Users className="w-4 h-4" />
                                    <div className="text-left">
                                      <div className="text-sm text-gray-900">{record.beneficiario}</div>
                                      <div className="text-xs text-gray-500">Carteirinha: {record.carteirinha}</div>
                                    </div>
                                  </div>
                                  <div className="flex items-center gap-2 text-gray-600">
                                    <CurrencyDollar className="w-4 h-4" />
                                    <span className="text-sm">R$ {record.valor.toFixed(2)}</span>
                                  </div>
                                </div>
                                <div className="flex items-center gap-3">
                                  <StatusBadge status={record.status} />
                                  <div className="flex items-center gap-2">
                                    <Button
                                      size="sm"
                                      variant="ghost"
                                      className="p-2 h-auto bg-gray-100 hover:bg-gray-200"
                                      onClick={(e) => {
                                        e.stopPropagation()
                                        handleViewGTO(record)
                                      }}
                                    >
                                      <Eye className="w-4 h-4" />
                                    </Button>
                                    {record.status === "autorizada" && (
                                      <Button
                                        size="sm"
                                        variant="ghost"
                                        className="p-2 h-auto bg-green-100 hover:bg-green-200 text-green-700"
                                        onClick={(e) => {
                                          e.stopPropagation()
                                          handleFaturar(record.id)
                                        }}
                                      >
                                        <CreditCard className="w-4 h-4" />
                                      </Button>
                                    )}
                                    <Button
                                      size="sm"
                                      variant="ghost"
                                      className="p-2 h-auto bg-gray-100 hover:bg-gray-200"
                                      onClick={(e) => e.stopPropagation()}
                                    >
                                      <X className="w-4 h-4" />
                                    </Button>
                                  </div>
                                  <div className="cursor-pointer">
                                    {expandedRows.has(record.id) ? (
                                      <CaretUp className="w-4 h-4 text-gray-400" />
                                    ) : (
                                      <CaretDown className="w-4 h-4 text-gray-400" />
                                    )}
                                  </div>
                                </div>
                              </div>
                            </div>

                            {/* Expanded Content */}
                            {expandedRows.has(record.id) && (
                              <div className="px-6 pb-6 border-t bg-gray-50">
                                <div className="pt-4">
                                  <h4 className="text-sm mb-4 text-gray-600">
                                    Procedimentos Odontológicos Realizados:
                                  </h4>
                                  <div className="space-y-3">
                                    {record.procedimentos.map((procedimento) => (
                                      <div key={procedimento.id} className="bg-white rounded-lg p-4 border border-gray-100">
                                        <div className="flex items-center justify-between">
                                          <div className="flex-1">
                                            <div className="flex items-center gap-3 mb-2">
                                              <span className="text-sm">{procedimento.nome}</span>
                                              <StatusBadge status={procedimento.status} />
                                            </div>
                                            <div className="text-xs text-gray-500 mb-1">
                                              Código: {procedimento.codigo}
                                            </div>
                                            <div className="text-sm">
                                              Valor: R$ {procedimento.valor.toFixed(2)}
                                            </div>
                                            {procedimento.motivoGlosa && (
                                              <div className="text-xs text-red-600 mt-1">
                                                Motivo: {procedimento.motivoGlosa}
                                              </div>
                                            )}
                                          </div>
                                          <div className="flex items-center gap-2 ml-4">
                                            <Button
                                              size="sm"
                                              variant="ghost"
                                              className="p-2 h-auto bg-white hover:bg-gray-100"
                                              onClick={() => {
                                                setSelectedGTO(record)
                                                handleViewProcedure(procedimento)
                                              }}
                                            >
                                              <Eye className="w-4 h-4" />
                                            </Button>
                                            {procedimento.status === "aguardando_pagamento" && (
                                              <Button
                                                size="sm"
                                                variant="ghost"
                                                className="p-2 h-auto bg-green-100 hover:bg-green-200 text-green-700"
                                                onClick={() => handleFaturarProcedimento(record.id, procedimento.id)}
                                              >
                                                <CreditCard className="w-4 h-4" />
                                              </Button>
                                            )}
                                            <Button
                                              size="sm"
                                              variant="ghost"
                                              className="p-2 h-auto bg-white hover:bg-gray-100"
                                            >
                                              <X className="w-4 h-4" />
                                            </Button>
                                          </div>
                                        </div>
                                      </div>
                                    ))}
                                  </div>
                                  <div className="mt-4 pt-4 border-t bg-gray-100 rounded-lg p-4">
                                    <div className="flex justify-between items-center">
                                      <span className="text-sm text-gray-600">Total da GTO:</span>
                                      <span className="text-lg font-bold text-gray-900">R$ {record.valor.toFixed(2)}</span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            )}
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {currentView === 'gto-details' && selectedGTO && (
                <GTODetailsPage
                  gto={selectedGTO}
                  onBack={() => setCurrentView('list')}
                  onViewProcedure={handleViewProcedure}
                />
              )}

              {currentView === 'procedure-details' && selectedProcedure && selectedGTO && (
                <ProcedureDetailsPage
                  procedure={selectedProcedure}
                  gtoNumber={selectedGTO.numeroGuia}
                  onBack={() => setCurrentView('gto-details')}
                  onOpenGlosaRecurso={handleOpenGlosaRecurso}
                />
              )}

              {currentView === 'procedure-details-expired' && selectedProcedure && selectedGTO && (
                <ProcedureDetailsExpiredPage
                  procedure={selectedProcedure}
                  gto={selectedGTO}
                  onBack={() => setCurrentView('gto-details')}
                  onOpenManifestacao={handleOpenManifestacao}
                />
              )}
            </TabsContent>

            {/* Tab 2: Demonstrativo */}
            <TabsContent value="demonstrativo" className="mt-0">
              <div className="space-y-6">
                {/* Métricas principais */}
                <MetricsGrid columns={4}>
                  <MetricsCard
                    title="Faturamento Mensal"
                    value={45320}
                    icon={<CurrencyDollar className="h-4 w-4" />}
                    trend={{ value: 22, isPositive: true }}
                    description="em relação ao mês anterior"
                  />
                  
                  <MetricsCard
                    title="GTOs Emitidas"
                    value={127}
                    icon={<FileText className="h-4 w-4" />}
                    trend={{ value: 18, isPositive: true }}
                    description="em relação ao mês anterior"
                  />
                  
                  <MetricsCard
                    title="Pacientes Atendidos"
                    value={89}
                    icon={<Users className="h-4 w-4" />}
                    trend={{ value: 12, isPositive: true }}
                    description="em relação ao mês anterior"
                  />
                  
                  <MetricsCard
                    title="Taxa de Aprovação"
                    value={92.5}
                    icon={<TrendUp className="h-4 w-4" />}
                    trend={{ value: 4.5, isPositive: true }}
                    description="em relação ao mês anterior"
                  />
                </MetricsGrid>

                {/* Resumo financeiro */}
                <Card>
                  <CardHeader>
                    <CardTitle>Resumo Financeiro - Julho 2025</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                      <div className="space-y-2">
                        <div className="text-sm text-gray-600">Total Aprovado</div>
                        <div className="text-2xl text-blue-600 font-bold">R$ 298.450,00</div>
                      </div>
                      <div className="space-y-2">
                        <div className="text-sm text-gray-600">Total Faturado</div>
                        <div className="text-2xl text-green-600 font-bold">R$ 271.920,00</div>
                      </div>
                      <div className="space-y-2">
                        <div className="text-sm text-gray-600">Pendente de Análise</div>
                        <div className="text-2xl text-yellow-600 font-bold">R$ 15.890,00</div>
                      </div>
                      <div className="space-y-2">
                        <div className="text-sm text-gray-600">Glosado</div>
                        <div className="text-2xl text-red-600 font-bold">R$ 10.640,00</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Gráficos */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Gráfico de Evolução do Faturamento */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Evolução do Faturamento</CardTitle>
                      <CardDescription>Últimos 6 meses</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="h-80">
                        <ResponsiveContainer width="100%" height="100%">
                          <LineChart data={dadosEvolucaoFaturamento}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="mes" />
                            <YAxis />
                            <Tooltip formatter={(value) => `R$ ${value.toLocaleString('pt-BR')}`} />
                            <Legend />
                            <Line 
                              type="monotone" 
                              dataKey="valor" 
                              stroke="#F05223" 
                              strokeWidth={2}
                              name="Faturamento"
                            />
                          </LineChart>
                        </ResponsiveContainer>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Gráfico de Pizza - Distribuição por Status */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Distribuição por Status</CardTitle>
                      <CardDescription>Procedimentos do mês</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="h-80">
                        <ResponsiveContainer width="100%" height="100%">
                          <PieChart>
                            <Pie
                              data={dadosDistribuicaoStatus}
                              cx="50%"
                              cy="50%"
                              labelLine={false}
                              label={({ percent }) => `${(percent * 100).toFixed(0)}%`}
                              outerRadius={80}
                              fill="#8884d8"
                              dataKey="value"
                            >
                              {dadosDistribuicaoStatus.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} />
                              ))}
                            </Pie>
                            <Tooltip />
                            <Legend />
                          </PieChart>
                        </ResponsiveContainer>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Tabela de Procedimentos Populares */}
                <Card>
                  <CardHeader>
                    <CardTitle>Procedimentos Mais Realizados</CardTitle>
                    <CardDescription>Top 5 procedimentos do mês</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={procedimentosPopulares}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="nome" angle={-45} textAnchor="end" height={100} />
                          <YAxis />
                          <Tooltip formatter={(value) => `R$ ${value.toLocaleString('pt-BR')}`} />
                          <Legend />
                          <Bar dataKey="valor" fill="#F05223" name="Valor Total" />
                          <Bar dataKey="quantidade" fill="#1355B4" name="Quantidade" />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Tab 3: Cronograma */}
            <TabsContent value="cronograma" className="mt-0">
              <div className="space-y-6">
                {/* Resumo do cronograma */}
                <MetricsGrid columns={3}>
                  <MetricsCard
                    title="Pagamentos Pendentes"
                    value={totalPendente}
                    icon={<Clock className="h-4 w-4 text-yellow-600" />}
                    description={`${pagamentosAgendados.filter(p => p.status === "pendente" || p.status === "agendado").length} GTOs`}
                    valueClassName="text-yellow-600"
                  />
                  
                  <MetricsCard
                    title="Pagamentos Vencidos"
                    value={totalVencido}
                    icon={<Warning className="h-4 w-4 text-red-600" />}
                    description={`${pagamentosAgendados.filter(p => p.status === "vencido").length} GTOs`}
                    valueClassName="text-red-600"
                  />
                  
                  <MetricsCard
                    title="Pagamentos Realizados"
                    value={totalPago}
                    icon={<CheckCircle className="h-4 w-4 text-green-600" />}
                    description={`${pagamentosAgendados.filter(p => p.status === "pago").length} GTOs`}
                    valueClassName="text-green-600"
                  />
                </MetricsGrid>

                {/* Grid de Cronogramas por Trimestre */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">1º Trimestre 2025</CardTitle>
                      <CardDescription>Janeiro a Março</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Button className="w-full bg-[#F05223] hover:bg-[#D94820]">
                        <Download className="h-4 w-4 mr-2" />
                        Baixar Cronograma
                      </Button>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">2º Trimestre 2025</CardTitle>
                      <CardDescription>Abril a Junho</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Button className="w-full bg-[#F05223] hover:bg-[#D94820]">
                        <Download className="h-4 w-4 mr-2" />
                        Baixar Cronograma
                      </Button>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">3º Trimestre 2025</CardTitle>
                      <CardDescription>Julho a Setembro</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Button className="w-full bg-[#F05223] hover:bg-[#D94820]">
                        <Download className="h-4 w-4 mr-2" />
                        Baixar Cronograma
                      </Button>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">4º Trimestre 2025</CardTitle>
                      <CardDescription>Outubro a Dezembro</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Button className="w-full bg-[#F05223] hover:bg-[#D94820]">
                        <Download className="h-4 w-4 mr-2" />
                        Baixar Cronograma
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>

            {/* Tab 4: Imposto de Renda */}
            <TabsContent value="imposto" className="mt-0">
              <div className="space-y-6">
                {/* Seletor de Ano */}
                <Card>
                  <CardHeader>
                    <CardTitle>Relatório de Imposto de Renda</CardTitle>
                    <CardDescription>Informações fiscais e relatórios para declaração</CardDescription>
                    <div className="mt-4">
                      <Select value={anoFiscal} onValueChange={setAnoFiscal}>
                        <SelectTrigger className="w-48">
                          <SelectValue placeholder="Selecione o ano" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="2025">2025</SelectItem>
                          <SelectItem value="2024">2024</SelectItem>
                          <SelectItem value="2023">2023</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </CardHeader>
                </Card>

                {/* Métricas Fiscais */}
                <MetricsGrid columns={4}>
                  <MetricsCard
                    title="Receita Bruta Anual"
                    value={543840}
                    icon={<CurrencyDollar className="h-4 w-4" />}
                  />
                  
                  <MetricsCard
                    title="Despesas Dedutíveis"
                    value={108768}
                    icon={<FileText className="h-4 w-4" />}
                  />
                  
                  <MetricsCard
                    title="Lucro Tributável"
                    value={435072}
                    icon={<TrendUp className="h-4 w-4" />}
                  />
                  
                  <MetricsCard
                    title="Imposto Estimado"
                    value={65260.80}
                    icon={<Warning className="h-4 w-4" />}
                    valueClassName="text-red-600"
                  />
                </MetricsGrid>

                {/* Tabela de Despesas */}
                <Card>
                  <CardHeader>
                    <CardTitle>Despesas Dedutíveis</CardTitle>
                    <CardDescription>Detalhamento das despesas do ano fiscal {anoFiscal}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b">
                            <th className="text-left p-4">Categoria</th>
                            <th className="text-right p-4">Valor</th>
                            <th className="text-left p-4">Descrição</th>
                          </tr>
                        </thead>
                        <tbody>
                          {despesasDedutivas.map((despesa) => (
                            <tr key={despesa.id} className="border-b">
                              <td className="p-4">{despesa.categoria}</td>
                              <td className="p-4 text-right">R$ {despesa.valor.toLocaleString('pt-BR')}</td>
                              <td className="p-4 text-gray-600">{despesa.descricao}</td>
                            </tr>
                          ))}
                        </tbody>
                        <tfoot>
                          <tr className="font-bold">
                            <td className="p-4">Total</td>
                            <td className="p-4 text-right">
                              R$ {despesasDedutivas.reduce((sum, d) => sum + d.valor, 0).toLocaleString('pt-BR')}
                            </td>
                            <td></td>
                          </tr>
                        </tfoot>
                      </table>
                    </div>
                  </CardContent>
                </Card>

                {/* Área de Downloads */}
                <Card>
                  <CardHeader>
                    <CardTitle>Documentos Disponíveis</CardTitle>
                    <CardDescription>
                      Faça o download dos documentos necessários para sua declaração
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2">
                        <FileText className="h-8 w-8 text-[#F05223]" />
                        <span>Baixar Comprovantes</span>
                      </Button>
                      <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2">
                        <Download className="h-8 w-8 text-[#F05223]" />
                        <span>Exportar Relatório</span>
                      </Button>
                      <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2">
                        <FileText className="h-8 w-8 text-[#F05223]" />
                        <span>Gerar Declaração</span>
                      </Button>
                    </div>
                    <div className="mt-4 p-4 bg-yellow-50 rounded-lg">
                      <p className="text-sm text-yellow-800">
                        <strong>Observação:</strong> Este é um cálculo aproximado. Consulte seu contador para valores definitivos.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
          
          {/* Espaçamento para o footer */}
          <div className="mb-20"></div>
        </div>
      </main>
      
      <Footer />

      {/* Modal de Glosa Recurso */}
      {showGlosaModal && selectedProcedure && selectedGTO && (
        <GlosaRecursoPage
          procedure={selectedProcedure}
          gtoNumber={selectedGTO.numeroGuia}
          open={showGlosaModal}
          onClose={() => setShowGlosaModal(false)}
        />
      )}
    </div>
  )
}