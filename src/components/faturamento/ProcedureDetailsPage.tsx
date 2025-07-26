"use client"

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Upload, X, FileText } from 'phosphor-react';
import { Procedimento, HistoricoEvento } from '@/types/faturamento';
import { StatusBadge } from './StatusBadge';
import { ProcedureTimeline } from './ProcedureTimeline';
import { FileUpload } from './FileUpload';

interface ProcedureDetailsPageProps {
  procedure: Procedimento;
  gtoNumber: string;
  onBack: () => void;
  onOpenGlosaRecurso: () => void;
}

export const ProcedureDetailsPage: React.FC<ProcedureDetailsPageProps> = ({ 
  procedure, 
  gtoNumber,
  onBack, 
  onOpenGlosaRecurso 
}) => {
  const [attachedFiles, setAttachedFiles] = useState<File[]>([]);

  const canSendRecurso = procedure.status === 'glosado' && 
    !['recursado_2x', 'prazo_expirado'].includes(procedure.status);

  // Mock de histórico - em produção viria do backend
  const historico: HistoricoEvento[] = procedure.historico || [
    {
      id: '1',
      data: '2024-03-01T10:00:00',
      tipo: 'solicitacao',
      descricao: 'Solicitação Inicial',
      status: 'Enviado para análise'
    },
    {
      id: '2',
      data: '2024-03-05T14:30:00',
      tipo: 'analise',
      descricao: 'Análise da Auditoria',
      status: 'Glosado',
      motivo: procedure.motivoGlosa || 'Documentação incompleta'
    },
    {
      id: '3',
      data: '2024-03-10T09:15:00',
      tipo: 'recurso',
      descricao: 'Aguardando Recurso',
      status: 'Pendente de ação'
    }
  ];

  const handleFileUpload = (files: File[]) => {
    setAttachedFiles(files);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={onBack}
            className="p-2"
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h2 className="text-2xl font-bold">Detalhes do Procedimento</h2>
            <p className="text-sm text-gray-500">GTO #{gtoNumber}</p>
          </div>
        </div>
      </div>

      {/* Informações do Procedimento */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>{procedure.nome}</CardTitle>
              <CardDescription>
                Código: {procedure.codigo} • Valor: R$ {procedure.valor.toFixed(2)}
              </CardDescription>
            </div>
            <StatusBadge status={procedure.status} />
          </div>
        </CardHeader>
      </Card>

      {/* Timeline */}
      <Card>
        <CardHeader>
          <CardTitle>Histórico do Procedimento</CardTitle>
        </CardHeader>
        <CardContent>
          <ProcedureTimeline eventos={historico} />
        </CardContent>
      </Card>

      {/* Anexos */}
      <Card>
        <CardHeader>
          <CardTitle>Documentos Anexados</CardTitle>
          <CardDescription>
            Documentos relacionados a este procedimento
          </CardDescription>
        </CardHeader>
        <CardContent>
          <FileUpload
            onUpload={handleFileUpload}
            existingFiles={attachedFiles}
            maxFiles={10}
            maxSize={5}
            acceptedFormats={['image/jpeg', 'image/png', 'application/pdf']}
            label="Arrastar arquivos ou clique para selecionar"
            description="Anexe documentos relevantes para o procedimento (radiografias, exames, etc.)"
          />
        </CardContent>
      </Card>

      {/* Botão de Recurso */}
      {canSendRecurso && (
        <div className="flex justify-end">
          <Button 
            onClick={onOpenGlosaRecurso}
            className="bg-[#F05223] hover:bg-[#D94820]"
          >
            Enviar Recurso de Glosa
          </Button>
        </div>
      )}

      {/* Mensagem de prazo expirado */}
      {procedure.status === 'prazo_expirado' && (
        <Card className="border-red-200 bg-red-50">
          <CardContent className="pt-6">
            <div className="flex items-center gap-2 text-red-600">
              <XCircle className="h-5 w-5" />
              <p className="font-medium">Prazo para recurso expirado</p>
            </div>
            <p className="text-sm text-red-600 mt-1">
              Este procedimento não pode mais receber recursos
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};