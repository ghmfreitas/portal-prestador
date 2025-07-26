"use client"

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Upload, FileText, X, Warning } from 'phosphor-react';
import { Procedimento } from '@/types/faturamento';

interface GlosaRecursoPageProps {
  procedure: Procedimento;
  gtoNumber: string;
  open: boolean;
  onClose: () => void;
}

interface UploadedFiles {
  rxInicial: File | null;
  rxFinal: File | null;
  termoConsentimento: File | null;
  outros: File[];
}

export const GlosaRecursoPage: React.FC<GlosaRecursoPageProps> = ({ 
  procedure, 
  gtoNumber,
  open,
  onClose 
}) => {
  const [observacoes, setObservacoes] = useState('');
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFiles>({
    rxInicial: null,
    rxFinal: null,
    termoConsentimento: null,
    outros: []
  });

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>, type: keyof UploadedFiles) => {
    const files = event.target.files;
    if (!files) return;

    if (type === 'outros') {
      setUploadedFiles({
        ...uploadedFiles,
        outros: [...uploadedFiles.outros, ...Array.from(files)]
      });
    } else {
      setUploadedFiles({
        ...uploadedFiles,
        [type]: files[0]
      });
    }
  };

  const removeFile = (type: keyof UploadedFiles, index?: number) => {
    if (type === 'outros' && index !== undefined) {
      setUploadedFiles({
        ...uploadedFiles,
        outros: uploadedFiles.outros.filter((_, i) => i !== index)
      });
    } else if (type !== 'outros') {
      setUploadedFiles({
        ...uploadedFiles,
        [type]: null
      });
    }
  };

  const handleSubmit = () => {
    // Simular envio do recurso
    alert('Recurso enviado com sucesso!');
    onClose();
  };

  const FileUploadCard = ({ 
    title, 
    type, 
    file 
  }: { 
    title: string; 
    type: 'rxInicial' | 'rxFinal' | 'termoConsentimento';
    file: File | null;
  }) => (
    <div className="space-y-2">
      <Label>{title}</Label>
      <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
        {file ? (
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FileText className="h-4 w-4 text-gray-400" />
              <span className="text-sm">{file.name}</span>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => removeFile(type)}
              className="p-1"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        ) : (
          <div className="text-center">
            <Upload className="mx-auto h-8 w-8 text-gray-400" />
            <input
              type="file"
              id={`upload-${type}`}
              accept=".png,.jpg,.jpeg,.pdf"
              className="hidden"
              onChange={(e) => handleFileUpload(e, type)}
            />
            <label htmlFor={`upload-${type}`}>
              <Button variant="outline" size="sm" className="mt-2" asChild>
                <span>Selecionar arquivo</span>
              </Button>
            </label>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Enviar Recurso de Glosa</DialogTitle>
          <DialogDescription>
            GTO #{gtoNumber} - {procedure.nome}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Parecer da Auditoria */}
          <Card className="border-red-200 bg-red-50">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Warning className="h-5 w-5 text-red-600" />
                <CardTitle className="text-red-900">Parecer da auditoria</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-red-800">
                {procedure.motivoGlosa || 'Documentação incompleta - RX inicial não anexado'}
              </p>
            </CardContent>
          </Card>

          {/* Upload de Documentos */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Anexar documentos para recurso</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FileUploadCard 
                title="RX Inicial" 
                type="rxInicial" 
                file={uploadedFiles.rxInicial}
              />
              <FileUploadCard 
                title="RX Final" 
                type="rxFinal" 
                file={uploadedFiles.rxFinal}
              />
              <FileUploadCard 
                title="Termo de Consentimento" 
                type="termoConsentimento" 
                file={uploadedFiles.termoConsentimento}
              />
              
              {/* Outros Documentos */}
              <div className="space-y-2">
                <Label>Outros Documentos</Label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
                  {uploadedFiles.outros.length > 0 ? (
                    <div className="space-y-2">
                      {uploadedFiles.outros.map((file, index) => (
                        <div key={index} className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <FileText className="h-4 w-4 text-gray-400" />
                            <span className="text-sm">{file.name}</span>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeFile('outros', index)}
                            className="p-1"
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                      <input
                        type="file"
                        id="upload-outros"
                        multiple
                        accept=".png,.jpg,.jpeg,.pdf"
                        className="hidden"
                        onChange={(e) => handleFileUpload(e, 'outros')}
                      />
                      <label htmlFor="upload-outros">
                        <Button variant="outline" size="sm" className="w-full mt-2" asChild>
                          <span>Adicionar mais</span>
                        </Button>
                      </label>
                    </div>
                  ) : (
                    <div className="text-center">
                      <Upload className="mx-auto h-8 w-8 text-gray-400" />
                      <input
                        type="file"
                        id="upload-outros"
                        multiple
                        accept=".png,.jpg,.jpeg,.pdf"
                        className="hidden"
                        onChange={(e) => handleFileUpload(e, 'outros')}
                      />
                      <label htmlFor="upload-outros">
                        <Button variant="outline" size="sm" className="mt-2" asChild>
                          <span>Selecionar arquivos</span>
                        </Button>
                      </label>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Observações */}
          <div className="space-y-2">
            <Label htmlFor="observacoes">Observações adicionais</Label>
            <Textarea
              id="observacoes"
              placeholder="Descreva as razões do recurso..."
              rows={4}
              value={observacoes}
              onChange={(e) => setObservacoes(e.target.value)}
              maxLength={500}
            />
            <p className="text-xs text-gray-500 text-right">
              {observacoes.length}/500 caracteres
            </p>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancelar
          </Button>
          <Button 
            onClick={handleSubmit}
            className="bg-[#F05223] hover:bg-[#D94820]"
          >
            Enviar Recurso
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};