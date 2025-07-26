"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { usePathname } from "next/navigation"
import Image from "next/image"
import Header from "@/components/Header"
import Sidebar from "@/components/Sidebar"
import Footer from "@/components/Footer"
import { House, FileText, Clock, Receipt, BookOpen, ArrowLineUpRight, ArrowRight } from "phosphor-react"

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
  { id: 'historico', label: 'Histórico', icon: Clock, href: '/historico' },
  { id: 'faturamento', label: 'Faturamento', icon: Receipt, href: '/faturamento' },
  { id: 'material-apoio', label: 'Material', icon: BookOpen, href: '/material-apoio' }
]

const materialCards = [
  {
    id: 1,
    title: "Guia de Recurso de Glosa Odontológica",
    description: "Como elaborar e apresentar recursos administrativos contra glosas odontológicas.",
    isExternal: true,
    externalUrl: "https://testeprestadorodonto-h.sulamerica.br/docs/Guia%20de%20Recurso%20Glosa%20Odontol&#243;gica_versao_02.pdf"
  },
  {
    id: 2,
    title: "Guia de Tratamento Odontológico",
    description: "Protocolos clínicos e diretrizes técnicas para os principais tratamentos odontológicos cobertos.",
    isExternal: true,
    externalUrl: "https://prestadorodontop.sulamerica.com.br/docs/gto-sas.pdf"
  },
  {
    id: 3,
    title: "Manual do credenciado",
    description: "Direitos, deveres e normas para prestadores credenciados da rede SulAmérica.",
    isExternal: true,
    externalUrl: "https://testeprestadorodonto-h.sulamerica.br/docs/Manual%20do%20Credenciado%20SulAmerica%20Odonto.pdf"
  },
  {
    id: 4,
    title: "Modelo de Termos para Auditoria",
    description: "Modelos de documentos e termos para processos de auditoria odontológica.",
    href: "/material-apoio/modelo-termos-auditoria",
    isExternal: false
  },
  {
    id: 5,
    title: "Tabela de Procedimentos",
    description: "Lista completa com códigos TUSS e valores dos procedimentos odontológicos.",
    href: "/material-apoio/tabela-procedimentos",
    isExternal: false
  }
]

export default function MaterialApoioPage() {
  const router = useRouter()
  const pathname = usePathname()
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const userData = sessionStorage.getItem("user")
    if (!userData) {
      router.push("/")
    } else {
      setUser(JSON.parse(userData))
    }
  }, [router])

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
          <div className="mb-8">
            <h4 className="text-lg font-medium text-[#F05223] mb-1">Material</h4>
            <h1 className="text-3xl font-bold text-gray-900">Material de Apoio</h1>
          </div>

          {/* Grid de Cards em 2 colunas */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-20">
            {materialCards.map((card) => {
              if (card.isExternal) {
                return (
                  <a
                    key={card.id}
                    href={card.externalUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-white border border-[#EAE7EC] rounded-xl cursor-pointer hover:border-[#F05223] transition-all duration-300 group overflow-hidden flex"
                  >
                    {/* Container lateral com 20% */}
                    <div className="w-[20%] bg-[#E7F0F4] flex items-center justify-center">
                      <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center">
                        <BookOpen className="h-8 w-8 text-gray-600" />
                      </div>
                    </div>
                    
                    {/* Conteúdo do card com 80% */}
                    <div className="flex-1 p-6">
                      <div className="mb-2">
                        <h3 className="text-lg font-semibold text-gray-900 transition-colors">
                          {card.title}
                        </h3>
                      </div>
                      
                      <div className="flex items-end justify-between">
                        <p className="text-sm text-gray-600 leading-relaxed flex-1">
                          {card.description}
                        </p>
                        
                        {/* Ícone de seta para cards externos */}
                        <div className="ml-4 flex-shrink-0">
                          <div className="w-10 h-10 bg-[#F4F4F4] rounded-full flex items-center justify-center group-hover:bg-[#E8E8E8] transition-colors">
                            <ArrowLineUpRight className="h-5 w-5 text-gray-600" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </a>
                )
              } else {
                return (
                  <Link
                    key={card.id}
                    href={card.href!}
                    className="bg-white border border-[#EAE7EC] rounded-xl cursor-pointer hover:border-[#F05223] transition-all duration-300 group block overflow-hidden"
                  >
                    <div className="flex h-full">
                      {/* Container lateral com 20% */}
                      <div className="w-[20%] bg-[#E7F0F4] flex items-center justify-center">
                        <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center">
                          <BookOpen className="h-8 w-8 text-gray-600" />
                        </div>
                      </div>
                      
                      {/* Conteúdo do card com 80% */}
                      <div className="flex-1 p-6">
                        <div className="mb-2">
                          <h3 className="text-lg font-semibold text-gray-900 transition-colors">
                            {card.title}
                          </h3>
                        </div>
                        
                        <div className="flex items-end justify-between">
                          <p className="text-sm text-gray-600 leading-relaxed flex-1">
                            {card.description}
                          </p>
                          
                          {/* Ícone de seta para cards com navegação interna */}
                          <div className="ml-4 flex-shrink-0">
                            <div className="w-10 h-10 bg-[#F4F4F4] rounded-full flex items-center justify-center group-hover:bg-[#E8E8E8] transition-colors">
                              <ArrowRight className="h-5 w-5 text-gray-600" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                )
              }
            })}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}