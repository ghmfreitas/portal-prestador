'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Clock, Check, Warning, X, Eye, FileText, Calendar, ArrowLeft } from 'phosphor-react'
import Link from 'next/link'
import Header from '@/components/Header'
import Sidebar from '@/components/Sidebar'
import Footer from '@/components/Footer'

interface Solicitacao {
  id: string
  data: string
  tipo: string
  status: 'Em análise' | 'Aprovada' | 'Rejeitada' | 'Concluída'
  alteracoes: {
    dadosPessoais?: any
    endereco?: any
    contato?: any
    horarios?: any
    areasAtuacao?: any
  }
}

const statusConfig = {
  'Em análise': {
    icon: Clock,
    bgColor: 'status-icon-info',
    textColor: 'text-[#145ABF]'
  },
  'Aprovada': {
    icon: Check,
    bgColor: 'status-icon-success',
    textColor: 'text-[#04843F]'
  },
  'Rejeitada': {
    icon: X,
    bgColor: 'status-icon-error',
    textColor: 'text-[#C80505]'
  },
  'Concluída': {
    icon: Check,
    bgColor: 'status-icon-success',
    textColor: 'text-[#04843F]'
  }
}

export default function SolicitacoesAlteracaoPage() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [solicitacoes, setSolicitacoes] = useState<Solicitacao[]>([])
  const [solicitacaoSelecionada, setSolicitacaoSelecionada] = useState<Solicitacao | null>(null)

  useEffect(() => {
    const userData = sessionStorage.getItem("user")
    if (!userData) {
      router.push("/")
    } else {
      setUser(JSON.parse(userData))
    }
    
    // Carregar solicitações do localStorage
    const solicitacoesData = localStorage.getItem('solicitacoesAlteracao')
    if (solicitacoesData) {
      setSolicitacoes(JSON.parse(solicitacoesData))
    }
  }, [router])

  if (!user) return null

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const getAlteracoesDescricao = (alteracoes: any) => {
    const tipos = []
    if (alteracoes.dadosPessoais) tipos.push('Dados Pessoais')
    if (alteracoes.endereco) tipos.push('Endereço')
    if (alteracoes.contato) tipos.push('Contato')
    if (alteracoes.horarios) tipos.push('Horários')
    if (alteracoes.areasAtuacao) tipos.push('Áreas de Atuação')
    return tipos.join(', ')
  }

  return (
    <div className="min-h-screen bg-white grid grid-rows-[77px_auto_1fr_auto] lg:grid-rows-[77px_1fr_auto] lg:grid-cols-[256px_1fr]">
      <Header />
      <Sidebar />
      <main className="p-4 lg:p-8 overflow-auto lg:col-start-2">
        <div className="max-w-7xl mx-auto">
          {/* Cabeçalho */}
          <div className="mb-8">
            <h4 className="text-lg font-medium text-[#F05223] mb-1">
              Configurações
            </h4>
            <h1 className="text-3xl font-bold text-gray-900">
              Solicitações de Alteração
            </h1>
          </div>

          {/* Botão Voltar */}
          <div className="mb-6">
            <Link
              href="/configuracoes"
              className="inline-flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft className="h-5 w-5" />
              <span>Voltar para Configurações</span>
            </Link>
          </div>

          {solicitacoes.length === 0 ? (
            <div className="bg-white border border-[#EAE7EC] rounded-xl p-8 text-center">
              <FileText className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Nenhuma solicitação encontrada
              </h3>
              <p className="text-gray-600">
                Suas solicitações de alteração aparecerão aqui quando você solicitar mudanças em seus dados.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Lista de Solicitações */}
              <div className="lg:col-span-2 space-y-4">
                {solicitacoes.sort((a, b) => new Date(b.data).getTime() - new Date(a.data).getTime()).map((solicitacao) => {
                  const StatusIcon = statusConfig[solicitacao.status].icon
                  return (
                    <div
                      key={solicitacao.id}
                      onClick={() => setSolicitacaoSelecionada(solicitacao)}
                      className={`
                        bg-white border border-[#EAE7EC] rounded-xl p-6 cursor-pointer 
                        transition-all hover:border-[#F05223] hover:shadow-lg
                        ${solicitacaoSelecionada?.id === solicitacao.id ? 'border-[#F05223] shadow-lg' : ''}
                      `}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <h3 className="text-lg font-semibold text-gray-900">
                              {solicitacao.tipo}
                            </h3>
                            <span className="status-tag">
                              <span className={`status-icon ${statusConfig[solicitacao.status].bgColor}`}>
                                <StatusIcon className="h-3.5 w-3.5 text-white" />
                              </span>
                              {solicitacao.status}
                            </span>
                          </div>
                          
                          <p className="text-sm text-gray-600 mb-3">
                            Alterações solicitadas: {getAlteracoesDescricao(solicitacao.alteracoes)}
                          </p>
                          
                          <div className="flex items-center space-x-4 text-xs text-gray-500">
                            <div className="flex items-center space-x-1">
                              <Calendar className="h-4 w-4" />
                              <span>{formatDate(solicitacao.data)}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <FileText className="h-4 w-4" />
                              <span>ID: #{solicitacao.id.slice(-6)}</span>
                            </div>
                          </div>
                        </div>
                        
                        <Eye className="h-5 w-5 text-gray-400 ml-4" />
                      </div>
                    </div>
                  )
                })}
              </div>

              {/* Detalhes da Solicitação */}
              <div className="lg:col-span-1">
                {solicitacaoSelecionada ? (
                  <div className="bg-white border border-[#EAE7EC] rounded-xl p-6 sticky top-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                      Detalhes da Solicitação
                    </h3>
                    
                    <div className="space-y-4">
                      <div>
                        <p className="text-sm font-medium text-gray-700">Status</p>
                        <div className="mt-1">
                          <span className="status-tag">
                            <span className={`status-icon ${statusConfig[solicitacaoSelecionada.status].bgColor}`}>
                              {(() => {
                                const StatusIcon = statusConfig[solicitacaoSelecionada.status].icon
                                return <StatusIcon className="h-3.5 w-3.5 text-white" />
                              })()}
                            </span>
                            {solicitacaoSelecionada.status}
                          </span>
                        </div>
                      </div>
                      
                      <div>
                        <p className="text-sm font-medium text-gray-700">Data da Solicitação</p>
                        <p className="text-sm text-gray-900 mt-1">
                          {formatDate(solicitacaoSelecionada.data)}
                        </p>
                      </div>
                      
                      <div>
                        <p className="text-sm font-medium text-gray-700">ID da Solicitação</p>
                        <p className="text-sm text-gray-900 mt-1">
                          #{solicitacaoSelecionada.id.slice(-6)}
                        </p>
                      </div>
                      
                      <div>
                        <p className="text-sm font-medium text-gray-700 mb-2">Alterações Solicitadas</p>
                        <div className="space-y-2">
                          {solicitacaoSelecionada.alteracoes.dadosPessoais && (
                            <div className="bg-gray-50 p-3 rounded-lg">
                              <p className="text-sm font-medium text-gray-900">Dados Pessoais</p>
                              <p className="text-xs text-gray-600 mt-1">
                                Nome, E-mail, CRO
                              </p>
                            </div>
                          )}
                          {solicitacaoSelecionada.alteracoes.endereco && (
                            <div className="bg-gray-50 p-3 rounded-lg">
                              <p className="text-sm font-medium text-gray-900">Endereço</p>
                              <p className="text-xs text-gray-600 mt-1">
                                Endereço completo
                              </p>
                            </div>
                          )}
                          {solicitacaoSelecionada.alteracoes.contato && (
                            <div className="bg-gray-50 p-3 rounded-lg">
                              <p className="text-sm font-medium text-gray-900">Contato</p>
                              <p className="text-xs text-gray-600 mt-1">
                                Telefone, WhatsApp
                              </p>
                            </div>
                          )}
                          {solicitacaoSelecionada.alteracoes.horarios && (
                            <div className="bg-gray-50 p-3 rounded-lg">
                              <p className="text-sm font-medium text-gray-900">Horários</p>
                              <p className="text-xs text-gray-600 mt-1">
                                Horários de atendimento
                              </p>
                            </div>
                          )}
                          {solicitacaoSelecionada.alteracoes.areasAtuacao && (
                            <div className="bg-gray-50 p-3 rounded-lg">
                              <p className="text-sm font-medium text-gray-900">Áreas de Atuação</p>
                              <p className="text-xs text-gray-600 mt-1">
                                {solicitacaoSelecionada.alteracoes.areasAtuacao.length} especialidades
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                      
                      {solicitacaoSelecionada.status === 'Em análise' && (
                        <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                          <div className="flex items-start space-x-2">
                            <Warning className="h-5 w-5 text-[#145ABF] flex-shrink-0 mt-0.5" />
                            <div>
                              <p className="text-sm font-medium text-[#145ABF]">
                                Solicitação em análise
                              </p>
                              <p className="text-xs text-gray-600 mt-1">
                                Sua solicitação está sendo analisada pela equipe. O prazo médio de resposta é de 2 dias úteis.
                              </p>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="bg-white border border-[#EAE7EC] rounded-xl p-6 text-center">
                    <Eye className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                    <p className="text-sm text-gray-600">
                      Selecione uma solicitação para ver os detalhes
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Espaçamento inferior */}
          <div className="mb-20"></div>
        </div>
      </main>
      <Footer />
    </div>
  )
}