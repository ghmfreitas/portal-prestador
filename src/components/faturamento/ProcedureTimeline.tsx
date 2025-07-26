import React from 'react'
import { CheckCircle, Clock, XCircle, FileText, CaretRight, Warning } from 'phosphor-react'
import { HistoricoEvento } from '@/types/faturamento'

interface ProcedureTimelineProps {
  eventos: HistoricoEvento[]
  className?: string
}

export function ProcedureTimeline({ eventos, className = '' }: ProcedureTimelineProps) {
  const getEventIcon = (tipo: HistoricoEvento['tipo'], status: string) => {
    if (status.includes('aprovado') || status.includes('realizado')) {
      return <CheckCircle className="h-5 w-5 text-green-600" weight="fill" />
    }
    if (status.includes('glosado') || status.includes('negado')) {
      return <XCircle className="h-5 w-5 text-red-600" weight="fill" />
    }
    if (status.includes('pendente') || status.includes('analise')) {
      return <Clock className="h-5 w-5 text-yellow-600" weight="fill" />
    }
    
    switch (tipo) {
      case 'solicitacao':
        return <FileText className="h-5 w-5 text-blue-600" weight="fill" />
      case 'recurso':
        return <CaretRight className="h-5 w-5 text-purple-600" weight="fill" />
      default:
        return <Warning className="h-5 w-5 text-gray-600" weight="fill" />
    }
  }

  const getEventColor = (tipo: HistoricoEvento['tipo'], status: string) => {
    if (status.includes('aprovado') || status.includes('realizado')) return 'border-green-600'
    if (status.includes('glosado') || status.includes('negado')) return 'border-red-600'
    if (status.includes('pendente') || status.includes('analise')) return 'border-yellow-600'
    
    switch (tipo) {
      case 'solicitacao': return 'border-blue-600'
      case 'recurso': return 'border-purple-600'
      default: return 'border-gray-400'
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date)
  }

  return (
    <div className={`relative ${className}`}>
      {eventos.map((evento, index) => (
        <div key={evento.id} className="flex gap-4 pb-8 last:pb-0">
          {/* Linha vertical */}
          <div className="relative flex flex-col items-center">
            <div className={`
              flex items-center justify-center w-10 h-10 rounded-full border-2 bg-white z-10
              ${getEventColor(evento.tipo, evento.status)}
            `}>
              {getEventIcon(evento.tipo, evento.status)}
            </div>
            {index < eventos.length - 1 && (
              <div className="absolute top-10 w-0.5 h-full bg-gray-300" />
            )}
          </div>

          {/* Conteúdo do evento */}
          <div className="flex-1 pt-1">
            <div className="flex items-start justify-between">
              <div>
                <h4 className="font-semibold text-gray-900">{evento.descricao}</h4>
                <p className="text-sm text-gray-600 mt-1">
                  Status: <span className="font-medium">{evento.status}</span>
                </p>
                {evento.motivo && (
                  <p className="text-sm text-gray-600 mt-1">
                    Motivo: {evento.motivo}
                  </p>
                )}
              </div>
              <span className="text-xs text-gray-500 whitespace-nowrap ml-4">
                {formatDate(evento.data)}
              </span>
            </div>
          </div>
        </div>
      ))}

      {eventos.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          <Warning className="h-12 w-12 mx-auto mb-2 text-gray-400" />
          <p>Nenhum evento registrado</p>
        </div>
      )}
    </div>
  )
}