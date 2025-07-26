"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Header from "@/components/Header"
import Sidebar from "@/components/Sidebar"
import Footer from "@/components/Footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { 
  MagnifyingGlass, 
  Printer, 
  X, 
  Eye, 
  House, 
  FileText, 
  Clock, 
  Receipt, 
  BookOpen 
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

interface TableRow {
  id: string
  data: string
  numeroGuia: string
  beneficiario: string
  codigo: string
  valor: string
  status: string
}

interface Procedimento {
  id: string
  nome: string
  codigo: string
  status: string
}

const mobileMenuItems = [
  { id: 'home', label: 'Painel', icon: House, href: '/dashboard' },
  { id: 'solicitar', label: 'Solicitar', icon: FileText, href: '/solicitar' },
  { id: 'acompanhar', label: 'Acompanhar', icon: Clock, href: '/acompanhar' },
  { id: 'faturamento', label: 'Faturamento', icon: Receipt, href: '/faturamento' },
  { id: 'material-apoio', label: 'Material', icon: BookOpen, href: '/material-apoio' }
]

const allTableData: TableRow[] = [
  {
    id: "1",
    data: "20 Out 2025",
    numeroGuia: "12345678",
    beneficiario: "Maria Silva",
    codigo: "12345",
    valor: "R$180,00",
    status: "aprovada",
  },
  {
    id: "2",
    data: "20 Out 2025",
    numeroGuia: "12345679",
    beneficiario: "João Oliveira",
    codigo: "12346",
    valor: "R$180,00",
    status: "em análise",
  },
  {
    id: "3",
    data: "20 Out 2025",
    numeroGuia: "12345680",
    beneficiario: "Pedro Santos",
    codigo: "12347",
    valor: "R$180,00",
    status: "aprovada",
  },
  {
    id: "4",
    data: "20 Out 2025",
    numeroGuia: "12345681",
    beneficiario: "Ana Luiza",
    codigo: "12348",
    valor: "R$180,00",
    status: "parc. aprovada",
  },
  {
    id: "5",
    data: "20 Out 2025",
    numeroGuia: "12345682",
    beneficiario: "Carla Ferreira",
    codigo: "12349",
    valor: "R$180,00",
    status: "em análise",
  },
  {
    id: "6",
    data: "20 Out 2025",
    numeroGuia: "12345683",
    beneficiario: "Roberto Almeida",
    codigo: "12350",
    valor: "R$180,00",
    status: "aprovada",
  },
  {
    id: "7",
    data: "20 Out 2025",
    numeroGuia: "12345684",
    beneficiario: "Gustavo Freitas",
    codigo: "12351",
    valor: "R$180,00",
    status: "em análise",
  },
  {
    id: "8",
    data: "20 Out 2025",
    numeroGuia: "12345685",
    beneficiario: "Kariny Andrade",
    codigo: "12352",
    valor: "R$180,00",
    status: "parc. aprovada",
  },
  {
    id: "9",
    data: "20 Out 2025",
    numeroGuia: "12345686",
    beneficiario: "Lucas Araújo",
    codigo: "12353",
    valor: "R$180,00",
    status: "negada/cancelada",
  }
]

const procedimentosPadrao: Procedimento[] = [
  {
    id: "1",
    nome: "Limpeza e Profilaxia Dental",
    codigo: "01.01.01.01",
    status: "concluído"
  },
  {
    id: "2",
    nome: "Restauração de Amálgama - 1 Face",
    codigo: "02.02.01.01",
    status: "em andamento"
  },
  {
    id: "3",
    nome: "Aplicação de Flúor",
    codigo: "01.01.02.01",
    status: "concluído"
  },
  {
    id: "4",
    nome: "Radiografia Periapical",
    codigo: "04.01.01.01",
    status: "aguardando"
  },
  {
    id: "5",
    nome: "Consulta Odontológica",
    codigo: "01.01.01.02",
    status: "concluído"
  }
]

export default function AcompanharPage() {
  const router = useRouter()
  const pathname = usePathname()
  const [user, setUser] = useState<User | null>(null)
  const [statusFilter, setStatusFilter] = useState<string>("todos")
  const [searchTerm, setSearchTerm] = useState<string>("")
  const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set())

  useEffect(() => {
    const userData = sessionStorage.getItem("user")
    if (!userData) {
      router.push("/")
    } else {
      setUser(JSON.parse(userData))
    }
  }, [router])

  const filteredData = allTableData.filter(row => {
    const matchesStatus = statusFilter === "todos" || row.status === statusFilter
    const matchesSearch = searchTerm === "" || 
      row.numeroGuia.includes(searchTerm) || 
      row.codigo.includes(searchTerm) ||
      row.beneficiario.toLowerCase().includes(searchTerm.toLowerCase())
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

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      "aprovada": { bg: "bg-green-100", text: "text-green-800", label: "Aprovada" },
      "em análise": { bg: "bg-blue-100", text: "text-blue-800", label: "Em Análise" },
      "parc. aprovada": { bg: "bg-yellow-100", text: "text-yellow-800", label: "Parc. Aprovada" },
      "negada/cancelada": { bg: "bg-red-100", text: "text-red-800", label: "Negada/Cancelada" }
    }
    
    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig["em análise"]
    
    return (
      <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${config.bg} ${config.text}`}>
        {config.label}
      </span>
    )
  }

  const getProcedureStatusBadge = (status: string) => {
    const statusConfig = {
      "concluído": { bg: "bg-green-100", text: "text-green-800", label: "Concluído" },
      "em andamento": { bg: "bg-blue-100", text: "text-blue-800", label: "Em andamento" },
      "aguardando": { bg: "bg-yellow-100", text: "text-yellow-800", label: "Aguardando" }
    }
    
    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig["aguardando"]
    
    return (
      <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${config.bg} ${config.text}`}>
        {config.label}
      </span>
    )
  }

  if (!user) return null

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
          {/* Header da página */}
          <div className="mb-8">
            <h4 className="text-lg font-medium text-[#F05223] mb-1">Painel de Controle</h4>
            <h1 className="text-3xl font-bold text-gray-900">Acompanhamento</h1>
            <p className="mt-2 text-gray-600">
              Acompanhe o status das suas solicitações e procedimentos
            </p>
          </div>

          {/* Search and Filter */}
          <Card className="p-6 mb-6">
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
                {searchTerm && (
                  <Button 
                    variant="ghost" 
                    size="sm"
                    className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0"
                    onClick={() => setSearchTerm("")}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                )}
              </div>

              <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
                {/* Status Filter */}
                <select 
                  className="flex h-[48px] w-full sm:w-48 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  value={statusFilter} 
                  onChange={(e) => setStatusFilter(e.target.value)}
                >
                  <option value="todos">Todos os status</option>
                  <option value="aprovada">Aprovada</option>
                  <option value="parc. aprovada">Parc. Aprovada</option>
                  <option value="em análise">Em Análise</option>
                  <option value="negada/cancelada">Negada/Cancelada</option>
                </select>

                {/* Date Filter */}
                <select className="flex h-[48px] w-full sm:w-48 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
                  <option value="recent">Data (mais recente)</option>
                  <option value="oldest">Data (mais antiga)</option>
                  <option value="value">Valor</option>
                </select>
              </div>
            </div>
          </Card>

          {/* Data Table */}
          <Card className="overflow-hidden">
            {/* Table Header */}
            <div className="grid grid-cols-6 gap-4 p-4 border-b border-gray-200 bg-gray-50 text-sm font-medium text-gray-700">
              <div>Ações</div>
              <div>Data</div>
              <div>Número de Guia</div>
              <div>Beneficiário</div>
              <div>Valor</div>
              <div>Status</div>
            </div>

            {/* Table Rows */}
            <div className="divide-y divide-gray-200">
              {filteredData.map((row) => (
                <div key={row.id}>
                  {/* Main Row */}
                  <div 
                    className="grid grid-cols-6 gap-4 p-4 hover:bg-gray-50 cursor-pointer transition-colors"
                    onClick={() => toggleRowExpansion(row.id)}
                  >
                    <div className="flex space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="w-8 h-8 p-0 rounded-full bg-gray-100 hover:bg-red-100 border-0"
                        onClick={(e) => {
                          e.stopPropagation()
                          if (confirm(`Tem certeza que deseja cancelar a guia ${row.numeroGuia}?`)) {
                            console.log(`Cancel guide ${row.numeroGuia}`)
                          }
                        }}
                      >
                        <X className="w-4 h-4 text-gray-600 hover:text-red-600" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="w-8 h-8 p-0 rounded-full bg-gray-100 hover:bg-gray-200 border-0"
                        onClick={(e) => {
                          e.stopPropagation()
                          console.log(`Print guide ${row.numeroGuia}`)
                        }}
                      >
                        <Printer className="w-4 h-4 text-gray-600" />
                      </Button>
                    </div>
                    <div className="text-sm text-gray-900">{row.data}</div>
                    <div className="text-sm text-gray-900">{row.numeroGuia}</div>
                    <div className="text-sm">
                      <span className="text-gray-900">{row.beneficiario}</span>
                      <span className="text-gray-500 ml-2">{row.codigo}</span>
                    </div>
                    <div className="text-sm text-gray-900">{row.valor}</div>
                    <div className="text-sm">
                      {getStatusBadge(row.status)}
                    </div>
                  </div>

                  {/* Expanded Content */}
                  {expandedRows.has(row.id) && (
                    <div className="px-4 pb-4 bg-gray-50">
                      <div className="bg-white rounded-lg p-4 border border-gray-200">
                        <h4 className="text-sm font-medium text-gray-700 mb-3">
                          Procedimentos Odontológicos Realizados:
                        </h4>

                        {/* Procedures Header */}
                        <div className="grid grid-cols-4 gap-4 p-2 text-xs font-medium text-gray-700 border-b border-gray-300 mb-2">
                          <div>Procedimento</div>
                          <div>Código</div>
                          <div>Status</div>
                          <div>Ações</div>
                        </div>

                        {/* Procedures List */}
                        <div className="space-y-2">
                          {procedimentosPadrao.map((procedimento) => (
                            <div key={procedimento.id} className="grid grid-cols-4 gap-4 items-center p-3 bg-gray-50 rounded-lg border border-gray-100">
                              <div>
                                <p className="text-sm font-medium text-gray-900">{procedimento.nome}</p>
                              </div>
                              <div>
                                <p className="text-xs text-gray-500">{procedimento.codigo}</p>
                              </div>
                              <div>
                                {getProcedureStatusBadge(procedimento.status)}
                              </div>
                              <div>
                                <Button variant="ghost" size="sm" className="p-1">
                                  <Eye className="w-4 h-4 text-gray-500" />
                                </Button>
                              </div>
                            </div>
                          ))}
                        </div>

                        <div className="mt-4 pt-3 border-t border-gray-200 flex justify-between items-center">
                          <span className="text-sm font-medium text-gray-700">Total da Guia:</span>
                          <span className="text-lg font-semibold text-gray-900">{row.valor}</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {filteredData.length === 0 && (
              <div className="p-8 text-center text-gray-500">
                <p>Nenhum resultado encontrado para os filtros selecionados.</p>
              </div>
            )}
          </Card>

          {/* Pagination */}
          <div className="mt-6 flex justify-center mb-20">
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm" disabled>
                Anterior
              </Button>
              <Button variant="outline" size="sm" className="bg-[#F05223] text-white border-[#F05223]">
                1
              </Button>
              <Button variant="outline" size="sm">
                2
              </Button>
              <Button variant="outline" size="sm">
                3
              </Button>
              <Button variant="outline" size="sm">
                Próximo
              </Button>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  )
}