"use client"

import { useEffect, useState, useCallback } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { usePathname } from "next/navigation"
import Image from "next/image"
import Header from "@/components/Header"
import Sidebar from "@/components/Sidebar"
import Footer from "@/components/Footer"
import { Check, Warning, TrendUp, CurrencyDollar, FileText, House, Clock, Receipt, BookOpen, Info, WarningCircle } from "phosphor-react"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel"

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

// Array de planos para facilitar adição de novos planos
const planosDisponiveis = [
  {
    id: 1,
    titulo: "SulAmérica Profissões",
    descricao: "Cobertura completa para tratamentos odontológicos com os melhores profissionais da rede credenciada.",
    imagem: "/images/cross-sell/cross-sell-sula-profissoes.png",
    link: "https://cloud.marketing.sulamerica.com.br/profissoes",
    alt: "Plano Odonto Premium"
  },
  {
    id: 2,
    titulo: "SulAmérica Seguro de Vida",
    descricao: "Cobertura completa para tratamentos odontológicos com os melhores profissionais da rede credenciada.",
    imagem: "/images/cross-sell/cross-sell-sula-seguro-vida.png",
    link: "https://encr.pw/66Cgm",
    alt: "Plano Seguro Vida"
  },
  {
    id: 3,
    titulo: "SulAmérica Seguro Dentista",
    descricao: "Cobertura completa para tratamentos odontológicos com os melhores profissionais da rede credenciada.",
    imagem: "/images/cross-sell/cross-sell-sula-dentista.png",
    link: "https://dentistasula.plataformadeseguros.com.br/",
    alt: "Plano Dentista"
  },
  {
    id: 4,
    titulo: "SulAmérica Profissões",
    descricao: "Cobertura completa para tratamentos odontológicos com os melhores profissionais da rede credenciada.",
    imagem: "/images/cross-sell/cross-sell-sula-profissoes.png",
    link: "https://cloud.marketing.sulamerica.com.br/profissoes",
    alt: "Plano Odonto Premium"
  },
  {
    id: 5,
    titulo: "SulAmérica Seguro de Vida",
    descricao: "Cobertura completa para tratamentos odontológicos com os melhores profissionais da rede credenciada.",
    imagem: "/images/cross-sell/cross-sell-sula-seguro-vida.png",
    link: "https://encr.pw/66Cgm",
    alt: "Plano Seguro Vida"
  },
  {
    id: 6,
    titulo: "SulAmérica Seguro Dentista",
    descricao: "Cobertura completa para tratamentos odontológicos com os melhores profissionais da rede credenciada.",
    imagem: "/images/cross-sell/cross-sell-sula-dentista.png",
    link: "https://dentistasula.plataformadeseguros.com.br/",
    alt: "Plano Dentista"
  }
]

export default function DashboardPage() {
  const router = useRouter()
  const pathname = usePathname()
  const [user, setUser] = useState<User | null>(null)
  const [carouselApi, setCarouselApi] = useState<CarouselApi>()
  const [currentSlide, setCurrentSlide] = useState(0)
  const [totalSlides, setTotalSlides] = useState(0)
  
  // Configuração dos indicadores
  useEffect(() => {
    if (!carouselApi) {
      return
    }

    // Configurar total de slides
    setTotalSlides(carouselApi.scrollSnapList().length)
    setCurrentSlide(carouselApi.selectedScrollSnap())

    // Listener para mudança de slide
    const onSelect = () => {
      setCurrentSlide(carouselApi.selectedScrollSnap())
    }

    carouselApi.on("select", onSelect)
    return () => {
      carouselApi.off("select", onSelect)
    }
  }, [carouselApi])

  // Auto-scroll do carrossel a cada 5 segundos
  useEffect(() => {
    if (!carouselApi) {
      return
    }

    const timer = setInterval(() => {
      carouselApi.scrollNext()
    }, 5000)

    return () => clearInterval(timer)
  }, [carouselApi])

  // Função para navegar para slide específico
  const goToSlide = useCallback((index: number) => {
    if (!carouselApi) return
    carouselApi.scrollTo(index)
  }, [carouselApi])


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
            <h4 className="text-lg font-medium text-[#F05223] mb-1">Home</h4>
            <h1 className="text-3xl font-bold text-gray-900">Painel de Controle</h1>
          </div>

          {/* Grid de Cards */}
          <div className="grid grid-cols-1 tablet:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {/* Card 1 - Faturamento em Análise */}
            <div className="bg-white border border-[#EAE7EC] rounded-xl p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="text-base font-normal text-gray-700 mb-2">Faturamento em Análise</h3>
                  <p className="text-3xl font-semibold text-gray-900">1.112</p>
                </div>
                <div className="w-12 h-12 bg-[#F4F4F4] rounded-full flex items-center justify-center ml-4">
                  <FileText className="h-6 w-6 text-[#5C5C5C]" />
                </div>
              </div>
            </div>

            {/* Card 2 - Tratamentos pendentes */}
            <div className="bg-white border border-[#EAE7EC] rounded-xl p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="text-base font-normal text-gray-700 mb-2">Tratamentos pendentes</h3>
                  <p className="text-3xl font-semibold text-gray-900">15</p>
                </div>
                <div className="w-12 h-12 bg-[#F4F4F4] rounded-full flex items-center justify-center ml-4">
                  <Clock className="h-6 w-6 text-[#5C5C5C]" />
                </div>
              </div>
            </div>

            {/* Card 3 - Glosas pendentes */}
            <div className="bg-white border border-[#EAE7EC] rounded-xl p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="text-base font-normal text-gray-700 mb-2">Glosas pendentes</h3>
                  <p className="text-3xl font-semibold text-gray-900">25</p>
                </div>
                <div className="w-12 h-12 bg-[#F4F4F4] rounded-full flex items-center justify-center ml-4">
                  <Warning className="h-6 w-6 text-[#5C5C5C]" />
                </div>
              </div>
            </div>
          </div>

          {/* Grid de 2 colunas */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Coluna Esquerda - Solicitações Recentes */}
            <div className="bg-white border border-[#EAE7EC] rounded-xl p-6 flex flex-col h-[600px]">
              <div className="mb-6">
                <h2 className="text-xl font-semibold text-gray-900">Solicitações Recentes</h2>
              </div>

              <div className="space-y-4 flex-1 overflow-y-auto pr-2">
                {/* Solicitação 1 - Pendente */}
                <div className="bg-white border border-[#EAE7EC] rounded-xl p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="text-base font-medium text-gray-900">João Carlos</h3>
                      <p className="text-sm text-gray-600 mt-1">Tratamento Endodôntico - Molar</p>
                      <div className="flex items-center gap-4 mt-2">
                        <span className="text-xs text-gray-500">2 horas atrás</span>
                        <span className="text-sm font-medium text-gray-900">R$ 480,00</span>
                      </div>
                    </div>
                    <span className="status-tag ml-4">
                      <span className="status-icon status-icon-info">
                        <Info className="h-3.5 w-3.5 text-white" />
                      </span>
                      Aguardando análise
                    </span>
                  </div>
                </div>

                {/* Solicitação 2 - Aprovado */}
                <div className="bg-white border border-[#EAE7EC] rounded-xl p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="text-base font-medium text-gray-900">Maria Silva</h3>
                      <p className="text-sm text-gray-600 mt-1">Restauração Classe II - Pré-molar</p>
                      <div className="flex items-center gap-4 mt-2">
                        <span className="text-xs text-gray-500">5 horas atrás</span>
                        <span className="text-sm font-medium text-gray-900">R$ 250,00</span>
                      </div>
                    </div>
                    <span className="status-tag ml-4">
                      <span className="status-icon status-icon-success">
                        <Check className="h-3.5 w-3.5 text-white" />
                      </span>
                      Aprovada
                    </span>
                  </div>
                </div>

                {/* Solicitação 3 - Negado */}
                <div className="bg-white border border-[#EAE7EC] rounded-xl p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="text-base font-medium text-gray-900">Pedro Santos</h3>
                      <p className="text-sm text-gray-600 mt-1">Prótese Fixa - Coroa Metalocerâmica</p>
                      <div className="flex items-center gap-4 mt-2">
                        <span className="text-xs text-gray-500">1 dia atrás</span>
                        <span className="text-sm font-medium text-gray-900">R$ 1.200,00</span>
                      </div>
                    </div>
                    <span className="status-tag ml-4">
                      <span className="status-icon status-icon-error">
                        <WarningCircle className="h-3.5 w-3.5 text-white" />
                      </span>
                      Cancelado
                    </span>
                  </div>
                </div>

                {/* Solicitação 4 - Em análise */}
                <div className="bg-white border border-[#EAE7EC] rounded-xl p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="text-base font-medium text-gray-900">Ana Costa</h3>
                      <p className="text-sm text-gray-600 mt-1">Cirurgia Periodontal - Gengivectomia</p>
                      <div className="flex items-center gap-4 mt-2">
                        <span className="text-xs text-gray-500">3 dias atrás</span>
                        <span className="text-sm font-medium text-gray-900">R$ 850,00</span>
                      </div>
                    </div>
                    <span className="status-tag ml-4">
                      <span className="status-icon status-icon-info">
                        <Info className="h-3.5 w-3.5 text-white" />
                      </span>
                      Em análise
                    </span>
                  </div>
                </div>

                {/* Solicitação 5 - Glosado */}
                <div className="bg-white border border-[#EAE7EC] rounded-xl p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="text-base font-medium text-gray-900">Roberto Lima</h3>
                      <p className="text-sm text-gray-600 mt-1">Ortodontia - Manutenção Aparelho</p>
                      <div className="flex items-center gap-4 mt-2">
                        <span className="text-xs text-gray-500">1 semana atrás</span>
                        <span className="text-sm font-medium text-gray-900">R$ 180,00</span>
                      </div>
                    </div>
                    <span className="status-tag ml-4">
                      <span className="status-icon status-icon-alert">
                        <WarningCircle className="h-3.5 w-3.5 text-white" />
                      </span>
                      Glosada
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 pt-4 border-t border-gray-100">
                <button className="w-full bg-white border border-[#F05223] text-[#F05223] font-bold h-[44px] px-4 rounded-[300px] hover:bg-[#F05223] hover:text-white transition-colors">
                  Ver todas as consultas
                </button>
              </div>
            </div>

            {/* Coluna Direita - Notificações */}
            <div className="bg-white border border-[#EAE7EC] rounded-xl p-6 flex flex-col h-[600px]">
              <div className="mb-6">
                <h2 className="text-xl font-semibold text-gray-900">Notificações</h2>
              </div>

              <div className="space-y-4 flex-1 overflow-y-auto pr-2">
                {/* Notificação 1 - Novo comunicado */}
                <div className="bg-white border border-[#EAE7EC] rounded-xl p-4 cursor-pointer transition-all hover:border-[#F05223]">
                  <div>
                    <h3 className="text-base font-medium text-gray-900">Novo comunicado da operadora</h3>
                    <p className="text-sm text-gray-600 mt-1">Atualização nas regras de autorização prévia para procedimentos</p>
                    <span className="text-xs text-gray-500 mt-1">Há 30 minutos</span>
                  </div>
                </div>

                {/* Notificação 2 - Documento disponível */}
                <div className="bg-white border border-[#EAE7EC] rounded-xl p-4 cursor-pointer transition-all hover:border-[#F05223]">
                  <div>
                    <h3 className="text-base font-medium text-gray-900">Relatório mensal disponível</h3>
                    <p className="text-sm text-gray-600 mt-1">Seu relatório de faturamento de outubro está pronto para download</p>
                    <span className="text-xs text-gray-500 mt-1">Há 2 horas</span>
                  </div>
                </div>

                {/* Notificação 3 - Prazo importante */}
                <div className="bg-white border border-[#EAE7EC] rounded-xl p-4 cursor-pointer transition-all hover:border-[#F05223]">
                  <div>
                    <h3 className="text-base font-medium text-gray-900">Prazo para envio de documentos</h3>
                    <p className="text-sm text-gray-600 mt-1">Envie os documentos pendentes até 15/11 para evitar bloqueios</p>
                    <span className="text-xs text-gray-500 mt-1">Há 5 horas</span>
                  </div>
                </div>

                {/* Notificação 4 - Alerta */}
                <div className="bg-white border border-[#EAE7EC] rounded-xl p-4 cursor-pointer transition-all hover:border-[#F05223]">
                  <div>
                    <h3 className="text-base font-medium text-gray-900">Glosa requer atenção</h3>
                    <p className="text-sm text-gray-600 mt-1">Você tem 3 glosas pendentes que precisam de justificativa</p>
                    <span className="text-xs text-gray-500 mt-1">Há 1 dia</span>
                  </div>
                </div>

                {/* Notificação 5 - Confirmação */}
                <div className="bg-white border border-[#EAE7EC] rounded-xl p-4 cursor-pointer transition-all hover:border-[#F05223]">
                  <div>
                    <h3 className="text-base font-medium text-gray-900">Pagamento confirmado</h3>
                    <p className="text-sm text-gray-600 mt-1">O valor de R$ 15.420,00 foi creditado em sua conta</p>
                    <span className="text-xs text-gray-500 mt-1">Há 2 dias</span>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 pt-4 border-t border-gray-100">
                <button className="w-full bg-white border border-[#F05223] text-[#F05223] font-bold h-[44px] px-4 rounded-[300px] hover:bg-[#F05223] hover:text-white transition-colors">
                  Ver todas as notificações
                </button>
              </div>
            </div>
          </div>

          {/* Cards de Planos */}
          <div className="mt-8 mb-20">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Nossos Planos</h2>
            <div className="relative px-12">
              <Carousel
                setApi={setCarouselApi}
                opts={{
                  align: "start",
                  loop: true,
                  slidesToScroll: 1
                }}
                className="w-full"
              >
                <CarouselContent className="-ml-6">
                  {planosDisponiveis.map((plano) => (
                    <CarouselItem key={plano.id} className="pl-6 basis-1/3">
                      <div className="bg-white border border-[#EAE7EC] rounded-xl overflow-hidden flex flex-col h-full">
                        <div className="h-48 relative">
                          <Image
                            src={plano.imagem}
                            alt={plano.alt}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="p-6 flex flex-col flex-grow">
                          <h3 className="text-lg font-semibold text-gray-900 mb-2">{plano.titulo}</h3>
                          <p className="text-sm text-gray-600 mb-4 flex-grow">
                            {plano.descricao}
                          </p>
                          <a 
                            href={plano.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block w-full"
                          >
                            <button className="w-full bg-[#F05223] text-white h-[44px] px-4 rounded-[300px] hover:bg-[#D94820] transition-colors font-medium">
                              Saiba Mais
                            </button>
                          </a>
                        </div>
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
              </Carousel>
              
              {/* Indicadores de página */}
              <div className="flex justify-center space-x-2 mt-6">
                {Array.from({ length: totalSlides }).map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToSlide(index)}
                    className={`w-2 h-2 rounded-full transition-all duration-200 ${
                      index === currentSlide
                        ? 'bg-[#F05223] w-6'
                        : 'bg-gray-300 hover:bg-gray-400'
                    }`}
                    aria-label={`Ir para slide ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
        </main>
        <Footer />
      </div>
  )
}