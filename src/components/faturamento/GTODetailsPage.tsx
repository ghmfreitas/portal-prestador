"use client"

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { ArrowLeft, Upload, FileText, Calendar, Info } from 'phosphor-react';
import { GTOData, Procedimento } from '@/types/faturamento';
import { StatusBadge } from './StatusBadge';
import { FileUpload } from './FileUpload';

interface GTODetailsPageProps {
  gto: GTOData;
  onBack: () => void;
  onViewProcedure: (procedure: Procedimento) => void;
}

export const GTODetailsPage: React.FC<GTODetailsPageProps> = ({ 
  gto, 
  onBack, 
  onViewProcedure 
}) => {
  const [gtoFiles, setGtoFiles] = useState<File[]>([]);
  const [procedureData, setProcedureData] = useState<Record<string, {
    dataExecucao: string;
    observacoes: string;
    documentos: File[];
  }>>({});

  const handleGTOFileUpload = (files: File[]) => {
    setGtoFiles(files);
  };

  const handleProcedureFileUpload = (procedureId: string, files: File[]) => {
    const currentData = procedureData[procedureId] || { dataExecucao: '', observacoes: '', documentos: [] };
    setProcedureData({
      ...procedureData,
      [procedureId]: {
        ...currentData,
        documentos: files
      }
    });
  };

  const handleProcedureDataChange = (procedureId: string, field: 'dataExecucao' | 'observacoes', value: string) => {
    const currentData = procedureData[procedureId] || { dataExecucao: '', observacoes: '', documentos: [] };
    setProcedureData({
      ...procedureData,
      [procedureId]: {
        ...currentData,
        [field]: value
      }
    });
  };

  const handleSave = () => {
    // Simular salvamento
    alert('Informações salvas com sucesso!');
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
            <h2 className="text-2xl font-bold">Informações do protocolo</h2>
            <p className="text-sm text-gray-500">Protocolo #{gto.numeroGuia}</p>
          </div>
        </div>
      </div>

      {/* Informações Gerais */}
      <Card>
        <CardHeader>
          <CardTitle>Informações Gerais</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label className="text-sm text-gray-600">Data da Solicitação</Label>
              <p className="font-medium">{gto.data}</p>
            </div>
            <div>
              <Label className="text-sm text-gray-600">Profissional Responsável</Label>
              <p className="font-medium">Dr. Carlos Eduardo Silva</p>
            </div>
            <div>
              <Label className="text-sm text-gray-600">Nome do Beneficiário</Label>
              <p className="font-medium">{gto.beneficiario}</p>
            </div>
            <div>
              <Label className="text-sm text-gray-600">Carteirinha</Label>
              <p className="font-medium">{gto.carteirinha}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Upload GTO */}
      <Card>
        <CardHeader>
          <CardTitle>Anexar GTO assinada</CardTitle>
          <CardDescription>
            Faça upload da GTO assinada para processamento
          </CardDescription>
        </CardHeader>
        <CardContent>
          <FileUpload
            onUpload={handleGTOFileUpload}
            existingFiles={gtoFiles}
            maxFiles={1}
            maxSize={10}
            acceptedFormats={['image/jpeg', 'image/png', 'application/pdf']}
            label="Arraste a GTO assinada ou clique para selecionar"
            description="Faça upload da GTO assinada para processamento"
          />
        </CardContent>
      </Card>

      {/* Lista de Procedimentos */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Procedimentos</h3>
        {gto.procedimentos.map((procedimento) => (
          <Card key={procedimento.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-base">{procedimento.nome}</CardTitle>
                  <CardDescription>
                    Código: {procedimento.codigo} • Valor: R$ {procedimento.valor.toFixed(2)}
                  </CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <StatusBadge status={procedimento.status} />
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onViewProcedure(procedimento)}
                  >
                    Ver detalhes
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor={`data-${procedimento.id}`}>
                    Data de execução
                  </Label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id={`data-${procedimento.id}`}
                      type="date"
                      className="pl-10"
                      value={procedureData[procedimento.id]?.dataExecucao || ''}
                      onChange={(e) => handleProcedureDataChange(procedimento.id, 'dataExecucao', e.target.value)}
                    />
                  </div>
                </div>
                <div className="md:col-span-2">
                  <Label>
                    Documentos do procedimento
                  </Label>
                  <div className="mt-2">
                    <FileUpload
                      onUpload={(files) => handleProcedureFileUpload(procedimento.id, files)}
                      existingFiles={procedureData[procedimento.id]?.documentos || []}
                      maxFiles={5}
                      maxSize={5}
                      acceptedFormats={['image/jpeg', 'image/png', 'application/pdf']}
                      label="Adicionar documentos do procedimento"
                      description="Radiografias, exames, fotos clínicas, etc."
                    />
                  </div>
                </div>
              </div>
              <div>
                <Label htmlFor={`obs-${procedimento.id}`}>
                  Observações (opcional)
                </Label>
                <Textarea
                  id={`obs-${procedimento.id}`}
                  placeholder="Adicione observações sobre o procedimento..."
                  rows={3}
                  value={procedureData[procedimento.id]?.observacoes || ''}
                  onChange={(e) => handleProcedureDataChange(procedimento.id, 'observacoes', e.target.value)}
                />
              </div>
              {procedureData[procedimento.id]?.documentos.length > 0 && (
                <div>
                  <p className="text-sm text-gray-600 mb-2">Arquivos anexados:</p>
                  <ul className="text-sm text-gray-500">
                    {procedureData[procedimento.id].documentos.map((doc, index) => (
                      <li key={index}>• {doc.name}</li>
                    ))}
                  </ul>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Alerta */}
      <Alert>
        <Info className="h-4 w-4" />
        <AlertDescription>
          Para agilizar o pagamento, lembre-se de manter a sua conta bancária sempre atualizada.
        </AlertDescription>
      </Alert>

      {/* Botão Salvar */}
      <div className="flex justify-end">
        <Button 
          onClick={handleSave}
          className="bg-[#F05223] hover:bg-[#D94820]"
        >
          Salvar
        </Button>
      </div>
    </div>
  );
};