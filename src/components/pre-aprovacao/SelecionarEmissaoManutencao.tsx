'use client'

import React, { useState } from 'react'
import { Label } from '@/components/ui/label'
import { Calendar, Eye, ArrowRight, ArrowLeft } from 'lucide-react'

interface EmissaoManutencao {
  numero: number
  codigo: string
  selecionada: boolean
}

interface SelecionarEmissaoManutencaoProps {
  onSelecionarEmissao: (emissao: EmissaoManutencao) => void
}

const SelecionarEmissaoManutencao: React.FC<SelecionarEmissaoManutencaoProps> = ({
  onSelecionarEmissao
}) => {
  // Gerar códigos aleatórios de 10 dígitos para cada emissão
  const gerarCodigo = (): string => {
    return Math.floor(Math.random() * 10000000000).toString().padStart(10, '0')
  }

  // Gerar emissões dinamicamente a cada renderização
  const emissoes: EmissaoManutencao[] = Array.from({ length: 12 }, (_, index) => ({
    numero: index + 1,
    codigo: gerarCodigo(),
    selecionada: false
  }))

  const [emissaoSelecionada, setEmissaoSelecionada] = useState<number | null>(null)

  const handleSelecionarEmissao = (numero: number) => {
    const emissao = emissoes.find(e => e.numero === numero)
    if (emissao) {
      setEmissaoSelecionada(numero)
      onSelecionarEmissao({ ...emissao, selecionada: true })
    }
  }

  return (
    <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#F05223] to-[#D94820] text-white p-6">
        <div className="flex items-center gap-3">
          <Calendar className="h-6 w-6" />
          <div>
            <h3 className="text-xl font-semibold">
              Seleção de Emissão - Manutenção Ortodôntica
            </h3>
            <p className="text-sm text-orange-100">
              Selecione uma das 12 emissões disponíveis para prorrogação
            </p>
          </div>
        </div>
      </div>

      {/* Conteúdo */}
      <div className="p-6">
        <div className="mb-6">
          <Label className="text-sm font-medium text-gray-700">
            Emissões disponíveis para Manutenção de Aparelho Ortodôntico
          </Label>
          <p className="text-sm text-gray-500 mt-1">
            Selecione a emissão correspondente ao período de manutenção desejado
          </p>
        </div>

        {/* Grid de emissões - layout vertical ocupando todo o espaço */}
        <div className="space-y-3 max-h-96 overflow-y-auto pr-2">
          {emissoes.map((emissao) => (
            <div
              key={emissao.numero}
              className={`
                group w-full p-4 rounded-xl border-2 transition-all duration-300
                ${emissaoSelecionada === emissao.numero
                  ? 'border-[#F05223] bg-[#F05223]/5 shadow-md transform scale-[1.02]'
                  : 'border-gray-200'
                }
              `}
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <h4 className={`
                    text-base font-semibold transition-colors duration-300
                    ${emissaoSelecionada === emissao.numero ? 'text-[#F05223]' : 'text-gray-900'}
                  `}>
                    Emissão {emissao.numero} de 12
                  </h4>
                  <p className="text-sm text-gray-600 mt-1">
                    Código: <span className="font-mono font-medium">{emissao.codigo}</span>
                  </p>
                </div>
                
                <div className="flex items-center gap-3 ml-4">
                  {/* Ícone Eye para emissões de 1 a 9 */}
                  {emissao.numero >= 1 && emissao.numero <= 9 && (
                    <div className={`
                      w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-300
                      ${emissaoSelecionada === emissao.numero 
                        ? 'bg-[#F05223]/10 text-[#F05223]' 
                        : 'bg-gray-100 text-gray-500'
                      }
                    `}>
                      <Eye className="h-4 w-4" />
                    </div>
                  )}
                  
                  {/* Ícone ArrowRight para emissões 10, 11 e 12 */}
                  {emissao.numero >= 10 && emissao.numero <= 12 && (
                    <div className={`
                      w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-300
                      ${emissaoSelecionada === emissao.numero 
                        ? 'bg-[#F05223]/10 text-[#F05223]' 
                        : 'bg-gray-100 text-gray-500'
                      }
                    `}>
                      <ArrowRight className="h-4 w-4" />
                    </div>
                  )}
                  
                  {/* Check icon quando selecionado */}
                  {emissaoSelecionada === emissao.numero && (
                    <div className="w-6 h-6 bg-[#F05223] rounded-full flex items-center justify-center">
                      <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>


      </div>
    </div>
  )
}

export default SelecionarEmissaoManutencao