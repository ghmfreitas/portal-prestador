"use client"

import { ArrowLeft, FileText, Eye, X, Clock, Warning, CheckCircle, XCircle } from "phosphor-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import { Procedimento, GTOData } from "@/types/faturamento"

interface ProcedureDetailsExpiredPageProps {
  procedure: Procedimento
  gto: GTOData
  onBack: () => void
  onOpenManifestacao?: () => void
}

interface TimelineEvent {
  id: string
  title: string
  date: string
  description: string
  status: 'current' | 'warning' | 'completed' | 'expired'
  isLast?: boolean
}

function ProtocolInfo({ gto, procedure }: { gto: GTOData; procedure: Procedimento }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Informações do protocolo</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Identificação da Solicitação */}
        <div>
          <h3 className="text-sm text-gray-500 uppercase tracking-wide mb-3">
            Identificação da Solicitação
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-1">
              <label className="text-sm text-gray-600">Data da Solicitação</label>
              <p className="text-base text-gray-900">{gto.data}</p>
            </div>
            <div className="space-y-1">
              <label className="text-sm text-gray-600">Número da Guia</label>
              <p className="text-base text-gray-900">{gto.numeroGuia}</p>
            </div>
          </div>
        </div>

        {/* Profissional */}
        <div>
          <h3 className="text-sm text-gray-500 uppercase tracking-wide mb-3">
            Profissional Responsável
          </h3>
          <div className="space-y-1">
            <label className="text-sm text-gray-600">Nome e Registro</label>
            <p className="text-base text-gray-900">Dr. João Silva - CRO/SP 12345</p>
          </div>
        </div>

        {/* Beneficiário */}
        <div>
          <h3 className="text-sm text-gray-500 uppercase tracking-wide mb-3">
            Dados do Beneficiário
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-1">
              <label className="text-sm text-gray-600">Nome do Beneficiário</label>
              <p className="text-base text-gray-900">{gto.beneficiario}</p>
            </div>
            <div className="space-y-1">
              <label className="text-sm text-gray-600">Carteirinha</label>
              <p className="text-base text-gray-900">{gto.carteirinha}</p>
            </div>
          </div>
        </div>

        {/* Procedimento */}
        <div>
          <h3 className="text-sm text-gray-500 uppercase tracking-wide mb-3">
            Procedimento
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-1">
              <label className="text-sm text-gray-600">Nome</label>
              <p className="text-base text-gray-900">{procedure.nome}</p>
            </div>
            <div className="space-y-1">
              <label className="text-sm text-gray-600">Código</label>
              <p className="text-base text-gray-900">{procedure.codigo}</p>
            </div>
            <div className="space-y-1">
              <label className="text-sm text-gray-600">Valor</label>
              <p className="text-base text-gray-900">R$ {procedure.valor.toFixed(2)}</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function DocumentCard({ 
  fileName, 
  onView, 
  onRemove 
}: { 
  fileName: string
  onView: () => void
  onRemove: () => void 
}) {
  return (
    <div className="bg-gray-50 rounded-lg border border-gray-200 p-3 flex items-center justify-between">
      <div className="flex items-center gap-2 min-w-0 flex-1">
        <FileText className="w-4 h-4 text-gray-500 flex-shrink-0" />
        <span className="text-xs text-gray-900 truncate">{fileName}</span>
      </div>
      
      <div className="flex items-center gap-1 flex-shrink-0">
        <Button
          size="sm"
          variant="ghost"
          onClick={onView}
          className="w-6 h-6 p-0 bg-white hover:bg-gray-100 rounded-full"
        >
          <Eye className="w-3 h-3 text-gray-600" />
        </Button>
        <Button
          size="sm"
          variant="ghost"
          onClick={onRemove}
          className="w-6 h-6 p-0 bg-white hover:bg-gray-100 rounded-full"
        >
          <X className="w-3 h-3 text-gray-600" />
        </Button>
      </div>
    </div>
  )
}

function TimelineItem({ 
  event,
  onOpenManifestacao
}: { 
  event: TimelineEvent
  onOpenManifestacao?: () => void
}) {
  const getStatusIcon = () => {
    switch (event.status) {
      case 'current':
        return (
          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
            <Clock className="w-5 h-5 text-blue-600" />
          </div>
        )
      case 'warning':
        return (
          <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
            <Warning className="w-5 h-5 text-orange-600" />
          </div>
        )
      case 'completed':
        return (
          <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
            <CheckCircle className="w-5 h-5 text-green-600" />
          </div>
        )
      case 'expired':
        return (
          <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
            <XCircle className="w-5 h-5 text-red-600" />
          </div>
        )
    }
  }

  return (
    <div className="relative">
      <div className="flex items-start gap-4">
        <div className="relative">
          {getStatusIcon()}
          {!event.isLast && (
            <div className="absolute top-10 left-1/2 transform -translate-x-1/2 w-px h-16 bg-gray-200"></div>
          )}
        </div>
        
        <div className="flex-1 bg-gray-50 rounded-lg p-4">
          <div className="space-y-3">
            <div className="space-y-1">
              <h3 className="text-sm font-medium text-gray-900">{event.title}</h3>
              <p className="text-xs text-gray-500">
                {format(new Date(event.date), "dd/MM/yyyy HH:mm:ss", { locale: ptBR })}
              </p>
              {event.status === 'expired' && onOpenManifestacao ? (
                <p className="text-sm text-gray-700">
                  O prazo para envio do recurso expirou.{' '}
                  <button
                    onClick={onOpenManifestacao}
                    className="text-[#145ABF] font-bold underline hover:text-blue-700"
                  >
                    Clique aqui para abrir uma manifestação.
                  </button>
                </p>
              ) : (
                <p className="text-sm text-gray-700">{event.description}</p>
              )}
            </div>
            
            {event.status === 'current' && event.title === 'Pronto para recurso' && onOpenManifestacao && (
              <div className="pt-2">
                <Button
                  onClick={onOpenManifestacao}
                  className="bg-[#F05223] hover:bg-[#D94820] text-white text-sm px-4 py-2 rounded-full"
                >
                  Enviar Recurso
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export function ProcedureDetailsExpiredPage({ 
  procedure, 
  gto, 
  onBack, 
  onOpenManifestacao 
}: ProcedureDetailsExpiredPageProps) {
  // Mock de documentos
  const documents = [
    { id: 1, name: "Raio x inicial.pdf" },
    { id: 2, name: "Laudo/Termo.pdf" },
    { id: 3, name: "Opcionais.jpg" },
    { id: 4, name: "Receituario.pdf" },
    { id: 5, name: "Exame complementar.jpg" },
    { id: 6, name: "Formulario preenchido.pdf" }
  ]

  // Mock de timeline
  const timeline: TimelineEvent[] = [
    {
      id: '1',
      title: 'Prazo expirado',
      date: new Date().toISOString(),
      description: 'O prazo para envio do recurso expirou.',
      status: 'expired'
    },
    {
      id: '2',
      title: 'Pronto para recurso',
      date: new Date(Date.now() - 16 * 24 * 60 * 60 * 1000).toISOString(),
      description: 'Sua solicitação já estava pronta para ser recursada. Fique atento pois esta solicitação tinha um prazo de atendimento.',
      status: 'completed'
    },
    {
      id: '3',
      title: 'Glosado',
      date: new Date(Date.now() - 17 * 24 * 60 * 60 * 1000).toISOString(),
      description: 'Sua solicitação recebeu uma glosa e em breve estaria disponível para recurso. Por hora você poderia providenciar o que foi solicitado.',
      status: 'warning'
    },
    {
      id: '4',
      title: 'Aguardando análise pagamento',
      date: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000).toISOString(),
      description: 'Data de atendimento informada',
      status: 'completed',
      isLast: true
    }
  ]

  const handleViewDocument = (docName: string) => {
    console.log("Visualizando documento:", docName)
  }

  const handleRemoveDocument = (docName: string) => {
    console.log("Removendo documento:", docName)
  }

  return (
    <div className="space-y-6">
      {/* Botão Voltar */}
      <div>
        <Button
          variant="ghost"
          onClick={onBack}
          className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-full"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Voltar</span>
        </Button>
      </div>

      {/* Informações do Protocolo */}
      <ProtocolInfo gto={gto} procedure={procedure} />

      {/* Histórico de Faturamento */}
      <Card>
        <CardHeader>
          <CardTitle>Histórico de faturamento</CardTitle>
        </CardHeader>
        <CardContent className="space-y-8">
          {/* Timeline */}
          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-4">Timeline</h3>
            <div className="space-y-6">
              {timeline.map((event) => (
                <TimelineItem
                  key={event.id}
                  event={event}
                  onOpenManifestacao={event.status === 'expired' ? onOpenManifestacao : undefined}
                />
              ))}
            </div>
          </div>

          {/* Documentos */}
          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-4">Anexos</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {documents.map((doc) => (
                <DocumentCard
                  key={doc.id}
                  fileName={doc.name}
                  onView={() => handleViewDocument(doc.name)}
                  onRemove={() => handleRemoveDocument(doc.name)}
                />
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}