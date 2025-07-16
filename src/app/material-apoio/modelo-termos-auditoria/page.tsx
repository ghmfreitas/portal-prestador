"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { usePathname } from "next/navigation"
import Header from "@/components/Header"
import Sidebar from "@/components/Sidebar"
import Footer from "@/components/Footer"
import { ArrowLeft, BookOpen, DownloadSimple } from "phosphor-react"
import { Button } from "@/components/ui/button"

interface User {
  id: string
  nome: string
  email: string
  cpf_cnpj: string
  codigo_identificacao: string
  tipo_documento: 'CPF' | 'CNPJ' | null
}

const termosCards = [
  {
    id: 1,
    title: "Anexo GTO Situação Inicial - SulAmérica",
    description: "Formulário para documentação da situação inicial em tratamentos ortodônticos.",
    url: "https://testeprestadorodonto-h.sulamerica.br/docs/Anexo%20Guia%20Tratamento%20Odontol&#243;gico_Situa&#231;&#227;o%20Inicial_versao_02.pdf"
  },
  {
    id: 2,
    title: "Modelo de Termo de Responsabilidade Exodontia",
    description: "Termo específico para procedimentos de extração dentária com responsabilidades.",
    url: "https://testeprestadorodonto-h.sulamerica.br/docs/Termo%20de%20Responsabilidade%20-%20Exodontia%20-%20Atualizado.pdf"
  },
  {
    id: 3,
    title: "Relatório de Início de Tratamento Ortodôntico",
    description: "Documento para registro do início de tratamentos ortodônticos com planejamento.",
    url: "https://testeprestadorodonto-h.sulamerica.br/docs/Relatorio%20de%20Inicio%20de%20Tratamento%20Ortodontico.pdf"
  },
  {
    id: 4,
    title: "Relatório de Prorrogação do Tratamento Ortodôntico",
    description: "Formulário para justificar extensão de prazo em tratamentos ortodônticos.",
    url: "https://testeprestadorodonto-h.sulamerica.br/docs/Relatorio%20de%20Prorrogacao%20do%20Tratamento%20Ortodontico.pdf"
  },
  {
    id: 5,
    title: "TCI - Endodontia - Fratura de Instrumento",
    description: "Consentimento específico para riscos de fratura instrumental em endodontia.",
    url: "https://testeprestadorodonto-h.sulamerica.br/docs/TCI%20-%20Endodontia%20-%20Fratura%20de%20Instrumento%20-%20Atualizado.pdf"
  },
  {
    id: 6,
    title: "TCI - Endodontia-Intercorrência Obturação",
    description: "Termo para possíveis intercorrências durante procedimentos endodônticos.",
    url: "https://testeprestadorodonto-h.sulamerica.br/docs/TCI%20-%20Intercorrencia%20Obturacao%20-%20Atualizado.pdf"
  },
  {
    id: 7,
    title: "TCI -Termo de Consentimento Clareamento",
    description: "Consentimento informado específico para procedimentos de clareamento dental.",
    url: "https://testeprestadorodonto-h.sulamerica.br/docs/Termo%20de%20Consentimento%20Clareamento%20-%20Atualizado.pdf"
  },
  {
    id: 8,
    title: "Termo Avaliação da Articulação Temporo Mandibular",
    description: "Documento completo para avaliação, diagnóstico e plano de tratamento de disfunções da ATM e sintomas relacionados.",
    url: "https://testeprestadorodonto-h.sulamerica.br/docs/Avaliacao%20da%20Articulacao%20Temporo%20Mandibular%20-%20Atualizado.pdf"
  },
  {
    id: 9,
    title: "Termo de Entrega e Satisfação de Prótese",
    description: "Formulário de entrega e aceitação de trabalhos protéticos pelo paciente.",
    url: "https://testeprestadorodonto-h.sulamerica.br/docs/Termo%20de%20Entrega%20e%20Satisfacao%20de%20Protese%20-%20Atualizado.pdf"
  },
  {
    id: 10,
    title: "Termo de Revisão e Responsabilidade",
    description: "Documento para revisões periódicas e responsabilidades pós-tratamento.",
    url: "https://testeprestadorodonto-h.sulamerica.br/docs/Termo%20de%20Revisao%20e%20Responsabilidade%20-%20Atualizado.pdf"
  }
]

export default function ModeloTermosAuditoriaPage() {
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
    <div className="min-h-screen bg-white grid grid-rows-[77px_1fr_auto] lg:grid-cols-[256px_1fr]">
      <Header />
      <Sidebar />
      
      <main className="p-4 lg:p-8 overflow-auto lg:col-start-2">
        <div className="max-w-7xl mx-auto">
          {/* Cabeçalho */}
          <div className="mb-8">
            <h4 className="text-lg font-medium text-[#F05223] mb-1">Material de Apoio</h4>
            <h1 className="text-3xl font-bold text-gray-900">Modelo de Termos para Auditoria</h1>
          </div>

          {/* Grid de Cards em 2 colunas */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-20">
            {termosCards.map((card) => (
              <a
                key={card.id}
                href={card.url}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white border border-[#EAE7EC] rounded-xl cursor-pointer transition-all duration-300 group overflow-hidden flex"
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
                    
                    {/* Ícone de download para cards */}
                    <div className="ml-4 flex-shrink-0">
                      <div className="w-10 h-10 bg-[#F4F4F4] rounded-full flex items-center justify-center group-hover:bg-[#E8E8E8] transition-colors">
                        <DownloadSimple className="h-5 w-5 text-gray-600" />
                      </div>
                    </div>
                  </div>
                </div>
              </a>
            ))}
          </div>
          
          {/* Botão Voltar */}
          <div className="mt-12 mb-8">
            <Button
              onClick={() => router.push('/material-apoio')}
              variant="outline"
              className="border border-gray-300 text-gray-700 hover:bg-gray-50 hover:text-gray-900 rounded-full px-6 h-[44px] group"
            >
              <ArrowLeft className="h-4 w-4 mr-2 group-hover:transform group-hover:-translate-x-1 transition-transform" />
              Voltar para Material de Apoio
            </Button>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  )
}