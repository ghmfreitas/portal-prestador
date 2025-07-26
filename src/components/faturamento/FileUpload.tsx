import React, { useCallback, useState } from 'react'
import { Upload, X, FileText, Image, FilePdf, File, CheckCircle } from 'phosphor-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'

interface FileUploadProps {
  onUpload: (files: File[]) => void
  existingFiles?: File[]
  maxFiles?: number
  maxSize?: number // em MB
  acceptedFormats?: string[]
  label?: string
  description?: string
  className?: string
}

export function FileUpload({
  onUpload,
  existingFiles = [],
  maxFiles = 5,
  maxSize = 10,
  acceptedFormats = ['image/jpeg', 'image/png', 'application/pdf'],
  label = 'Arrastar arquivos ou clique para selecionar',
  description,
  className = ''
}: FileUploadProps) {
  const [files, setFiles] = useState<File[]>(existingFiles)
  const [isDragging, setIsDragging] = useState(false)
  const [errors, setErrors] = useState<string[]>([])

  const getFileIcon = (fileType: string) => {
    if (fileType.startsWith('image/')) return <Image className="h-5 w-5" />
    if (fileType === 'application/pdf') return <FilePdf className="h-5 w-5" />
    if (fileType.includes('text')) return <FileText className="h-5 w-5" />
    return <File className="h-5 w-5" />
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  const validateFiles = (filesToValidate: File[]) => {
    const newErrors: string[] = []
    const validFiles: File[] = []

    filesToValidate.forEach(file => {
      // Validar formato
      if (acceptedFormats.length > 0 && !acceptedFormats.includes(file.type)) {
        newErrors.push(`${file.name}: Formato não aceito`)
        return
      }

      // Validar tamanho
      if (file.size > maxSize * 1024 * 1024) {
        newErrors.push(`${file.name}: Arquivo muito grande (máx: ${maxSize}MB)`)
        return
      }

      // Verificar duplicatas
      if (files.some(f => f.name === file.name && f.size === file.size)) {
        newErrors.push(`${file.name}: Arquivo já adicionado`)
        return
      }

      validFiles.push(file)
    })

    // Validar número máximo de arquivos
    if (files.length + validFiles.length > maxFiles) {
      newErrors.push(`Número máximo de arquivos excedido (máx: ${maxFiles})`)
      return { validFiles: [], errors: newErrors }
    }

    return { validFiles, errors: newErrors }
  }

  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragging(false)

    const droppedFiles = Array.from(e.dataTransfer.files)
    const { validFiles, errors } = validateFiles(droppedFiles)

    if (validFiles.length > 0) {
      const newFiles = [...files, ...validFiles]
      setFiles(newFiles)
      onUpload(newFiles)
    }

    setErrors(errors)
    if (errors.length > 0) {
      setTimeout(() => setErrors([]), 5000)
    }
  }, [files, onUpload])

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files)
      const { validFiles, errors } = validateFiles(selectedFiles)

      if (validFiles.length > 0) {
        const newFiles = [...files, ...validFiles]
        setFiles(newFiles)
        onUpload(newFiles)
      }

      setErrors(errors)
      if (errors.length > 0) {
        setTimeout(() => setErrors([]), 5000)
      }
    }
  }

  const removeFile = (index: number) => {
    const newFiles = files.filter((_, i) => i !== index)
    setFiles(newFiles)
    onUpload(newFiles)
  }

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragging(false)
  }

  return (
    <div className={className}>
      {/* Área de upload */}
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        className={`
          relative border-2 border-dashed rounded-lg p-8 text-center transition-all
          ${isDragging 
            ? 'border-[#F05223] bg-orange-50' 
            : 'border-gray-300 hover:border-gray-400'
          }
        `}
      >
        <input
          type="file"
          multiple
          accept={acceptedFormats.join(',')}
          onChange={handleFileSelect}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />
        
        <Upload className={`
          h-12 w-12 mx-auto mb-4 transition-colors
          ${isDragging ? 'text-[#F05223]' : 'text-gray-400'}
        `} />
        
        <p className="text-sm font-medium text-gray-700">{label}</p>
        
        {description && (
          <p className="text-xs text-gray-500 mt-2">{description}</p>
        )}
        
        <p className="text-xs text-gray-400 mt-2">
          Formatos aceitos: {acceptedFormats.map(f => f.split('/')[1]).join(', ')} • 
          Tamanho máx: {maxSize}MB
        </p>
      </div>

      {/* Lista de erros */}
      {errors.length > 0 && (
        <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
          {errors.map((error, index) => (
            <p key={index} className="text-sm text-red-600">{error}</p>
          ))}
        </div>
      )}

      {/* Lista de arquivos */}
      {files.length > 0 && (
        <div className="mt-4 space-y-2">
          <p className="text-sm font-medium text-gray-700 mb-2">
            Arquivos selecionados ({files.length}/{maxFiles})
          </p>
          {files.map((file, index) => (
            <Card key={index} className="p-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="text-gray-500">
                    {getFileIcon(file.type)}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">{file.name}</p>
                    <p className="text-xs text-gray-500">{formatFileSize(file.size)}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600" weight="fill" />
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeFile(index)}
                    className="p-1 h-auto hover:bg-red-50"
                  >
                    <X className="h-4 w-4 text-red-600" />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}