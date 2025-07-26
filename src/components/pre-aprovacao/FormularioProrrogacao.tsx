'use client'

import { useState, useImperativeHandle, forwardRef, useEffect } from 'react'
import { Label } from "@/components/ui/label"
import { ArrowLeft, Plus, Minus } from 'phosphor-react'
import { Checkbox } from "@/components/ui/checkbox"

interface DadosProrrogacao {
  // Etapa 1
  faseTratamento: string
  // Etapa 2
  tempoFinalizacao: number
  motivoProrrogacao: string
  // Etapa 3
  colaboracaoPaciente: string
  faltasConsultas: string
  usoElastico: string
  tracionamentoDentes: string
  alteracaoPlanejamento: string
  // Etapa 3.1
  quantidadeFaltas: number
  // Etapa 3.2
  dentesTracionamento: string[]
  // Etapa 3.3
  justificativaAlteracao: string
  // Etapa 4
  relacaoCaninoDireito: string
  relacaoCaninoEsquerdo: string
  relacaoMolarDireito: string
  relacaoMolarEsquerdo: string
  // Etapa 5
  linhaMedia: string
  trespasseHorizontal: string
  trespasseVertical: string
  // Etapa 5.1
  medidaTrespasseHorizontal: string
  // Etapa 5.2.1 e 5.2.2
  medidaTrespasseVertical: string
  // Etapa 6
  diastemas: string
  apinhamento: string
  giroversoes: string
  // Etapa 7
  objetivosProrrogacao: string[]
  outrosObjetivos: string
  // Etapa 8
  planoTratamento: string
  // Etapa 9
  imagens: File[]
}

interface FormularioProrrogacaoProps {
  onContinuar: (dados: DadosProrrogacao) => void
  onVoltar: () => void
  onStatusChange?: (podeAvancar: boolean, etapa: number) => void
}

export interface FormularioProrrogacaoRef {
  proximaEtapa: () => void
  podeContinuar: () => boolean
}

const FormularioProrrogacao = forwardRef<FormularioProrrogacaoRef, FormularioProrrogacaoProps>(
  ({ onContinuar, onVoltar, onStatusChange }, ref) => {
  const [etapaAtual, setEtapaAtual] = useState(1)
  const [dados, setDados] = useState<DadosProrrogacao>({
    faseTratamento: '',
    tempoFinalizacao: 1,
    motivoProrrogacao: '',
    colaboracaoPaciente: '',
    faltasConsultas: '',
    usoElastico: '',
    tracionamentoDentes: '',
    alteracaoPlanejamento: '',
    quantidadeFaltas: 1,
    dentesTracionamento: [],
    justificativaAlteracao: '',
    relacaoCaninoDireito: '',
    relacaoCaninoEsquerdo: '',
    relacaoMolarDireito: '',
    relacaoMolarEsquerdo: '',
    linhaMedia: '',
    trespasseHorizontal: '',
    trespasseVertical: '',
    medidaTrespasseHorizontal: '',
    medidaTrespasseVertical: '',
    diastemas: '',
    apinhamento: '',
    giroversoes: '',
    objetivosProrrogacao: [],
    outrosObjetivos: '',
    planoTratamento: '',
    imagens: []
  })

  const fasesTratamento = [
    { id: 'preventivo_interceptativo', titulo: 'Preventivo / Interceptativo' },
    { id: 'ortopedico', titulo: 'Ortopédico' },
    { id: 'corretivo', titulo: 'Corretivo' },
    { id: 'cirurgico', titulo: 'Cirúrgico' }
  ]

  const opcoesSimNao = [
    { id: 'sim', titulo: 'Sim', descricao: '' },
    { id: 'nao', titulo: 'Não', descricao: '' }
  ]

  const opcoesRelacao = [
    { id: 'classe_i', titulo: 'Classe I' },
    { id: 'classe_ii', titulo: 'Classe II' },
    { id: 'classe_iii', titulo: 'Classe III' },
    { id: 'ausente', titulo: 'Ausente' }
  ]

  const medidasTrespasseHorizontalEsquerda = [
    { id: '-4mm', titulo: '-4 mm' },
    { id: '-3mm', titulo: '-3 mm' },
    { id: '-2mm', titulo: '-2 mm' },
    { id: '-1mm', titulo: '-1 mm' },
    { id: '0mm', titulo: '0 mm' }
  ]
  
  const medidasTrespasseHorizontalDireita = [
    { id: '1mm', titulo: '1 mm' },
    { id: '2mm', titulo: '2 mm' },
    { id: '3mm', titulo: '3 mm' },
    { id: '4mm', titulo: '4 mm' },
    { id: 'acima_4mm', titulo: 'Acima de 4 mm' }
  ]

  const medidasTrespasseVerticalEsquerda = [
    { id: '0mm', titulo: '0 mm' },
    { id: '1mm', titulo: '1 mm' },
    { id: '2mm', titulo: '2 mm' }
  ]
  
  const medidasTrespasseVerticalDireita = [
    { id: '3mm', titulo: '3 mm' },
    { id: '4mm', titulo: '4 mm' },
    { id: 'acima_4mm', titulo: 'Acima de 4 mm' }
  ]

  const objetivosOpcoes = [
    { id: 'selamento_labial', titulo: 'Normalização do selamento labial' },
    { id: 'trespasse_horizontal', titulo: 'Obtenção de trespasse horizontal adequado' },
    { id: 'trespasse_vertical', titulo: 'Obtenção do trespasse vertical adequado' },
    { id: 'guias_funcionais', titulo: 'Obtenção de guias funcionais adequadas' },
    { id: 'sem_interferencias', titulo: 'Sem interferências oclusais' },
    { id: 'classe_i_caninos', titulo: 'Obtenção de Classe I em caninos' },
    { id: 'melhorar_intercuspidacao', titulo: 'Melhorar intercuspidação' },
    { id: 'outro', titulo: 'Outro' }
  ]

  const podeContinuar = (): boolean => {
    switch (etapaAtual) {
      case 1: return !!dados.faseTratamento
      case 2: return dados.tempoFinalizacao > 0 && !!dados.motivoProrrogacao.trim()
      case 3: 
        return !!(dados.colaboracaoPaciente && 
          dados.faltasConsultas && 
          dados.usoElastico && 
          dados.tracionamentoDentes && 
          dados.alteracaoPlanejamento)
      case 3.1: return dados.quantidadeFaltas > 0
      case 3.2: return dados.dentesTracionamento && dados.dentesTracionamento.length > 0
      case 3.3: return !!dados.justificativaAlteracao.trim()
      case 4: 
        return !!(dados.relacaoCaninoDireito && 
          dados.relacaoCaninoEsquerdo && 
          dados.relacaoMolarDireito && 
          dados.relacaoMolarEsquerdo)
      case 5: 
        return !!(dados.linhaMedia && 
          dados.trespasseHorizontal && 
          dados.trespasseVertical)
      case 5.1: return !!dados.medidaTrespasseHorizontal
      case 5.21: 
      case 5.22: return !!dados.medidaTrespasseVertical
      case 6: 
        return !!(dados.diastemas && 
          dados.apinhamento && 
          dados.giroversoes)
      case 7: return dados.objetivosProrrogacao && dados.objetivosProrrogacao.length > 0
      case 8: return !!dados.planoTratamento.trim()
      case 9: return dados.imagens && dados.imagens.length > 0
      default: return false
    }
  }

  const proximaEtapa = () => {
    if (etapaAtual === 1 && !!dados.faseTratamento) {
      setEtapaAtual(2)
    } else if (etapaAtual === 2 && dados.tempoFinalizacao > 0 && !!dados.motivoProrrogacao.trim()) {
      setEtapaAtual(3)
    } else if (etapaAtual === 3 && !!dados.colaboracaoPaciente && !!dados.faltasConsultas && 
               !!dados.usoElastico && !!dados.tracionamentoDentes && !!dados.alteracaoPlanejamento) {
      // Navegação condicional seguindo padrão MASTER
      if (dados.faltasConsultas === 'sim' && dados.quantidadeFaltas === 1) {
        setEtapaAtual(3.1)
      } else if (dados.tracionamentoDentes === 'sim' && (!dados.dentesTracionamento || dados.dentesTracionamento.length === 0)) {
        setEtapaAtual(3.2)
      } else if (dados.alteracaoPlanejamento === 'sim' && !dados.justificativaAlteracao.trim()) {
        setEtapaAtual(3.3)
      } else {
        setEtapaAtual(4)
      }
    } else if (etapaAtual === 3.1 && dados.quantidadeFaltas > 0) {
      if (dados.tracionamentoDentes === 'sim' && (!dados.dentesTracionamento || dados.dentesTracionamento.length === 0)) {
        setEtapaAtual(3.2)
      } else if (dados.alteracaoPlanejamento === 'sim' && !dados.justificativaAlteracao.trim()) {
        setEtapaAtual(3.3)
      } else {
        setEtapaAtual(4)
      }
    } else if (etapaAtual === 3.2 && dados.dentesTracionamento && dados.dentesTracionamento.length > 0) {
      if (dados.alteracaoPlanejamento === 'sim' && !dados.justificativaAlteracao.trim()) {
        setEtapaAtual(3.3)
      } else {
        setEtapaAtual(4)
      }
    } else if (etapaAtual === 3.3 && !!dados.justificativaAlteracao.trim()) {
      setEtapaAtual(4)
    } else if (etapaAtual === 4 && !!dados.relacaoCaninoDireito && !!dados.relacaoCaninoEsquerdo && 
               !!dados.relacaoMolarDireito && !!dados.relacaoMolarEsquerdo) {
      setEtapaAtual(5)
    } else if (etapaAtual === 5 && !!dados.linhaMedia && !!dados.trespasseHorizontal && !!dados.trespasseVertical) {
      // Navegação condicional seguindo padrão MASTER
      if (dados.trespasseHorizontal === 'inadequado' && !dados.medidaTrespasseHorizontal) {
        setEtapaAtual(5.1)
      } else if (dados.trespasseVertical === 'mordida_aberta' && !dados.medidaTrespasseVertical) {
        setEtapaAtual(5.21)
      } else if (dados.trespasseVertical === 'sobremordida' && !dados.medidaTrespasseVertical) {
        setEtapaAtual(5.22)
      } else {
        setEtapaAtual(6)
      }
    } else if (etapaAtual === 5.1 && !!dados.medidaTrespasseHorizontal) {
      if (dados.trespasseVertical === 'mordida_aberta' && !dados.medidaTrespasseVertical) {
        setEtapaAtual(5.21)
      } else if (dados.trespasseVertical === 'sobremordida' && !dados.medidaTrespasseVertical) {
        setEtapaAtual(5.22)
      } else {
        setEtapaAtual(6)
      }
    } else if ((etapaAtual === 5.21 || etapaAtual === 5.22) && !!dados.medidaTrespasseVertical) {
      setEtapaAtual(6)
    } else if (etapaAtual === 6 && !!dados.diastemas && !!dados.apinhamento && !!dados.giroversoes) {
      setEtapaAtual(7)
    } else if (etapaAtual === 7 && dados.objetivosProrrogacao && dados.objetivosProrrogacao.length > 0) {
      setEtapaAtual(8)
    } else if (etapaAtual === 8 && !!dados.planoTratamento.trim()) {
      setEtapaAtual(9)
    } else if (etapaAtual === 9 && dados.imagens && dados.imagens.length > 0) {
      onContinuar(dados)
    }
  }

  const etapaAnterior = () => {
    if (etapaAtual === 2) {
      setEtapaAtual(1)
    } else if (etapaAtual === 3) {
      setEtapaAtual(2)
    } else if (etapaAtual === 3.1 || etapaAtual === 3.2 || etapaAtual === 3.3) {
      setEtapaAtual(3)
    } else if (etapaAtual === 4) {
      // Navegação reversa inteligente - reconstrói caminho baseado nos dados
      if (dados.alteracaoPlanejamento === 'sim' && dados.justificativaAlteracao) {
        setEtapaAtual(3.3)
      } else if (dados.tracionamentoDentes === 'sim' && dados.dentesTracionamento && dados.dentesTracionamento.length > 0) {
        setEtapaAtual(3.2)
      } else if (dados.faltasConsultas === 'sim' && dados.quantidadeFaltas > 1) {
        setEtapaAtual(3.1)
      } else {
        setEtapaAtual(3)
      }
    } else if (etapaAtual === 5) {
      setEtapaAtual(4)
    } else if (etapaAtual === 5.1 || etapaAtual === 5.21 || etapaAtual === 5.22) {
      setEtapaAtual(5)
    } else if (etapaAtual === 6) {
      // Navegação reversa inteligente - reconstrói caminho correto
      if (dados.trespasseVertical === 'sobremordida' && dados.medidaTrespasseVertical) {
        setEtapaAtual(5.22)
      } else if (dados.trespasseVertical === 'mordida_aberta' && dados.medidaTrespasseVertical) {
        setEtapaAtual(5.21)
      } else if (dados.trespasseHorizontal === 'inadequado' && dados.medidaTrespasseHorizontal) {
        setEtapaAtual(5.1)
      } else {
        setEtapaAtual(5)
      }
    } else if (etapaAtual === 7) {
      setEtapaAtual(6)
    } else if (etapaAtual === 8) {
      setEtapaAtual(7)
    } else if (etapaAtual === 9) {
      setEtapaAtual(8)
    }
  }

  // Renderizar card
  const renderCard = (opcao: any, valorSelecionado: string, onSelecionar: (valor: string) => void) => (
    <div
      key={opcao.id}
      className={`
        relative bg-white border-2 rounded-xl px-4 py-4 cursor-pointer transition-all duration-300 hover:shadow-lg flex items-center justify-center
        w-[180px] h-[60px]
        ${valorSelecionado === opcao.id
          ? 'border-[#F05223] bg-[#F05223]/5 shadow-md transform scale-[1.02]'
          : 'border-[#EAE7EC] hover:border-[#F05223] hover:bg-[#F05223]/5'
        }
      `}
      onClick={() => onSelecionar(opcao.id)}
    >
      <h4 className={`
        text-base font-medium transition-colors duration-300 text-center
        ${valorSelecionado === opcao.id ? 'text-[#F05223]' : 'text-gray-900'}
      `}>
        {opcao.titulo}
      </h4>
    </div>
  )


  // Renderizar contador
  const renderContador = (valor: number, onChange: (valor: number) => void, min: number, max: number, label: string) => (
    <div className="bg-gray-50 rounded-xl p-4 max-w-xs">
      <Label className="text-sm font-medium text-gray-700 mb-3 block">{label}</Label>
      <div className="flex items-center gap-4">
        <button
          type="button"
          onClick={() => onChange(Math.max(min, valor - 1))}
          className="w-10 h-10 rounded-lg bg-white border-2 border-gray-200 flex items-center justify-center hover:border-[#F05223] transition-colors"
          disabled={valor <= min}
        >
          <Minus className="w-4 h-4 text-gray-600" />
        </button>
        
        <div className="w-20 text-center">
          <span className="text-2xl font-bold text-gray-900">{valor}</span>
          <span className="text-sm text-gray-500 ml-1">{valor === 1 ? 'mês' : 'meses'}</span>
        </div>
        
        <button
          type="button"
          onClick={() => onChange(Math.min(max, valor + 1))}
          className="w-10 h-10 rounded-lg bg-white border-2 border-gray-200 flex items-center justify-center hover:border-[#F05223] transition-colors"
          disabled={valor >= max}
        >
          <Plus className="w-4 h-4 text-gray-600" />
        </button>
      </div>
    </div>
  )

  // Renderizar textarea
  const renderTextarea = (value: string, onChange: (value: string) => void, placeholder: string, rows = 4) => (
    <textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      rows={rows}
      className="w-full p-3 border-2 border-gray-200 rounded-xl resize-none focus:border-[#F05223] focus:outline-none transition-colors"
    />
  )

  // Renderizar checkbox
  const renderCheckbox = (opcao: any, valoresSelecionados: string[], onToggle: (valor: string) => void) => (
    <div key={opcao.id} className="flex items-start gap-3">
      <Checkbox
        id={opcao.id}
        checked={valoresSelecionados.includes(opcao.id)}
        onCheckedChange={(checked) => {
          if (checked) {
            onToggle(opcao.id)
          } else {
            onToggle(opcao.id)
          }
        }}
        className="mt-0.5"
      />
      <div className="flex-1">
        <label
          htmlFor={opcao.id}
          className="text-sm font-medium text-gray-700 cursor-pointer"
        >
          {opcao.titulo}
        </label>
        {opcao.id === 'outro' && valoresSelecionados.includes('outro') && (
          <div className="mt-2">
            {renderTextarea(
              dados.outrosObjetivos,
              (value) => setDados({ ...dados, outrosObjetivos: value }),
              'Descreva os outros objetivos que serão alcançados',
              3
            )}
          </div>
        )}
      </div>
    </div>
  )

  // Expor funções via ref
  useImperativeHandle(ref, () => ({
    proximaEtapa,
    podeContinuar
  }))

  // Notificar mudanças de estado para o componente pai (padrão MASTER)
  useEffect(() => {
    if (onStatusChange) {
      onStatusChange(podeContinuar(), etapaAtual)
    }
  }, [dados, etapaAtual, onStatusChange])

  const renderEtapaContent = () => {
    switch (etapaAtual) {
      case 1:
        return (
          <div>
            <Label className="text-sm font-medium text-gray-700">
              Selecione a fase do tratamento
            </Label>
            <div className="flex flex-wrap gap-3 max-w-4xl mt-3">
              {fasesTratamento.map((fase) => 
                renderCard(fase, dados.faseTratamento, (valor) => {
                  setDados({ ...dados, faseTratamento: valor })
                })
              )}
            </div>
          </div>
        )
      
      case 2:
        return (
          <div className="space-y-6">
            <div>
              {renderContador(
                dados.tempoFinalizacao,
                (valor) => {
                  setDados({ ...dados, tempoFinalizacao: valor })
                },
                1,
                24,
                'Qual o tempo em meses está previsto para finalizar?'
              )}
            </div>
            
            <div>
              <Label className="text-sm font-medium text-gray-700">
                Qual o motivo da prorrogação do tratamento?
              </Label>
              <div className="mt-3">
                {renderTextarea(
                  dados.motivoProrrogacao,
                  (value) => {
                    setDados({ ...dados, motivoProrrogacao: value })
                  },
                  'Descreva nesse campo o motivo da prorrogação',
                  4
                )}
              </div>
            </div>
          </div>
        )
      
      case 3:
        return (
          <div className="space-y-6">
            <div>
              <Label className="text-sm font-medium text-gray-700">
                Colaboração do paciente
              </Label>
              <div className="flex flex-wrap gap-3 max-w-lg mt-3">
                {opcoesSimNao.map((opcao) => 
                  renderCard(opcao, dados.colaboracaoPaciente, (valor) => {
                    setDados({ ...dados, colaboracaoPaciente: valor })
                  })
                )}
              </div>
            </div>

            <div>
              <Label className="text-sm font-medium text-gray-700">
                Falta às consultas por parte do paciente
              </Label>
              <div className="flex flex-wrap gap-3 max-w-lg mt-3">
                {opcoesSimNao.map((opcao) => 
                  renderCard(opcao, dados.faltasConsultas, (valor) => {
                    setDados({ ...dados, faltasConsultas: valor })
                  })
                )}
              </div>
            </div>

            <div>
              <Label className="text-sm font-medium text-gray-700">
                Uso de elástico
              </Label>
              <div className="flex flex-wrap gap-3 max-w-lg mt-3">
                {opcoesSimNao.map((opcao) => 
                  renderCard(opcao, dados.usoElastico, (valor) => {
                    setDados({ ...dados, usoElastico: valor })
                  })
                )}
              </div>
            </div>

            <div>
              <Label className="text-sm font-medium text-gray-700">
                Tracionamento de dentes
              </Label>
              <div className="flex flex-wrap gap-3 max-w-lg mt-3">
                {opcoesSimNao.map((opcao) => 
                  renderCard(opcao, dados.tracionamentoDentes, (valor) => {
                    setDados({ ...dados, tracionamentoDentes: valor })
                  })
                )}
              </div>
            </div>

            <div>
              <Label className="text-sm font-medium text-gray-700">
                Houve alteração no planejamento inicial?
              </Label>
              <div className="flex flex-wrap gap-3 max-w-lg mt-3">
                {opcoesSimNao.map((opcao) => 
                  renderCard(opcao, dados.alteracaoPlanejamento, (valor) => {
                    setDados({ ...dados, alteracaoPlanejamento: valor })
                  })
                )}
              </div>
            </div>
          </div>
        )
      
      case 3.1:
        return (
          <div>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
              <h4 className="text-sm font-medium text-blue-800 mb-1">Falta às consultas</h4>
              <p className="text-sm text-blue-700">Especifique a quantidade de faltas</p>
            </div>
            
            {renderContador(
              dados.quantidadeFaltas,
              (valor) => {
                setDados({ ...dados, quantidadeFaltas: valor })
              },
              1,
              99,
              'Quantas faltas?'
            )}
          </div>
        )
      
      case 3.2:
        return (
          <div>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
              <h4 className="text-sm font-medium text-blue-800 mb-1">Tracionamento de dentes</h4>
              <p className="text-sm text-blue-700">Especifique os dentes com tracionamento</p>
            </div>
            
            <Label className="text-sm font-medium text-gray-700">
              Selecione os dentes com tracionamento:
            </Label>
            <div className="mt-3">
              <div className="bg-gray-50 rounded-xl p-4">
                <div className="grid grid-cols-4 gap-2 max-w-lg">
                  {Array.from({ length: 32 }, (_, i) => i + 1).map((dente) => (
                    <button
                      key={dente}
                      type="button"
                      onClick={() => {
                        const denteStr = dente.toString()
                        const novosDentes = dados.dentesTracionamento.includes(denteStr)
                          ? dados.dentesTracionamento.filter(d => d !== denteStr)
                          : [...dados.dentesTracionamento, denteStr]
                        setDados({ ...dados, dentesTracionamento: novosDentes })
                      }}
                      className={`
                        w-10 h-10 rounded-lg border-2 flex items-center justify-center text-xs font-medium transition-all
                        ${dados.dentesTracionamento.includes(dente.toString())
                          ? 'border-[#F05223] bg-[#F05223] text-white'
                          : 'border-gray-300 bg-white text-gray-700 hover:border-[#F05223]'
                        }
                      `}
                    >
                      {dente}
                    </button>
                  ))}
                </div>
                <p className="text-xs text-gray-600 mt-2">
                  Clique nos números dos dentes para selecioná-los
                </p>
                {dados.dentesTracionamento.length > 0 && (
                  <p className="text-sm text-[#F05223] mt-2 font-medium">
                    Selecionados: {dados.dentesTracionamento.join(', ')}
                  </p>
                )}
              </div>
            </div>
          </div>
        )
      
      case 3.3:
        return (
          <div>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
              <h4 className="text-sm font-medium text-blue-800 mb-1">Alteração no planejamento</h4>
              <p className="text-sm text-blue-700">Justifique a alteração</p>
            </div>
            
            <Label className="text-sm font-medium text-gray-700">
              Justifique:
            </Label>
            <div className="mt-3">
              {renderTextarea(
                dados.justificativaAlteracao,
                (value) => {
                  setDados({ ...dados, justificativaAlteracao: value })
                },
                'Descreva o motivo da alteração do planejamento inicial',
                4
              )}
            </div>
          </div>
        )
      
      case 4:
        return (
          <div className="space-y-6">
            <div>
              <Label className="text-sm font-medium text-gray-700">
                Relação dos caninos direitos
              </Label>
              <div className="flex flex-wrap gap-3 max-w-4xl mt-3">
                {opcoesRelacao.map((opcao) => 
                  renderCard(opcao, dados.relacaoCaninoDireito, (valor) => {
                    setDados({ ...dados, relacaoCaninoDireito: valor })
                  })
                )}
              </div>
            </div>

            <div>
              <Label className="text-sm font-medium text-gray-700">
                Relação dos caninos esquerdos
              </Label>
              <div className="flex flex-wrap gap-3 max-w-4xl mt-3">
                {opcoesRelacao.map((opcao) => 
                  renderCard(opcao, dados.relacaoCaninoEsquerdo, (valor) => {
                    setDados({ ...dados, relacaoCaninoEsquerdo: valor })
                  })
                )}
              </div>
            </div>

            <div>
              <Label className="text-sm font-medium text-gray-700">
                Relação dos molares direitos
              </Label>
              <div className="flex flex-wrap gap-3 max-w-4xl mt-3">
                {opcoesRelacao.map((opcao) => 
                  renderCard(opcao, dados.relacaoMolarDireito, (valor) => {
                    setDados({ ...dados, relacaoMolarDireito: valor })
                  })
                )}
              </div>
            </div>

            <div>
              <Label className="text-sm font-medium text-gray-700">
                Relação dos molares esquerdos
              </Label>
              <div className="flex flex-wrap gap-3 max-w-4xl mt-3">
                {opcoesRelacao.map((opcao) => 
                  renderCard(opcao, dados.relacaoMolarEsquerdo, (valor) => {
                    setDados({ ...dados, relacaoMolarEsquerdo: valor })
                  })
                )}
              </div>
            </div>
          </div>
        )
      
      case 5:
        return (
          <div className="space-y-6">
            <div>
              <Label className="text-sm font-medium text-gray-700">
                Linha média
              </Label>
              <div className="flex gap-3 mt-3">
                {renderCard(
                  { id: 'coincidente', titulo: 'Coincidente' },
                  dados.linhaMedia,
                  (valor) => {
                    setDados({ ...dados, linhaMedia: valor })
                  }
                )}
                {renderCard(
                  { id: 'desviada', titulo: 'Desviada' },
                  dados.linhaMedia,
                  (valor) => {
                    setDados({ ...dados, linhaMedia: valor })
                  }
                )}
              </div>
            </div>

            <div>
              <Label className="text-sm font-medium text-gray-700">
                Trespasse horizontal (sobressaliência/overjet)
              </Label>
              <div className="flex gap-3 mt-3">
                {renderCard(
                  { id: 'adequado', titulo: 'Adequado' },
                  dados.trespasseHorizontal,
                  (valor) => {
                    setDados({ ...dados, trespasseHorizontal: valor })
                  }
                )}
                {renderCard(
                  { id: 'inadequado', titulo: 'Inadequado' },
                  dados.trespasseHorizontal,
                  (valor) => {
                    setDados({ ...dados, trespasseHorizontal: valor })
                  }
                )}
              </div>
            </div>

            <div>
              <Label className="text-sm font-medium text-gray-700">
                Trespasse vertical (sobremordida/overbite)?
              </Label>
              <div className="flex flex-wrap gap-3 mt-3">
                {renderCard(
                  { id: 'adequado', titulo: 'Adequado' },
                  dados.trespasseVertical,
                  (valor) => {
                    setDados({ ...dados, trespasseVertical: valor })
                  }
                )}
                {renderCard(
                  { id: 'mordida_aberta', titulo: 'Mordida aberta' },
                  dados.trespasseVertical,
                  (valor) => {
                    setDados({ ...dados, trespasseVertical: valor })
                  }
                )}
                {renderCard(
                  { id: 'sobremordida', titulo: 'Sobremordida' },
                  dados.trespasseVertical,
                  (valor) => {
                    setDados({ ...dados, trespasseVertical: valor })
                  }
                )}
              </div>
            </div>
          </div>
        )
      
      case 5.1:
        return (
          <div>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
              <h4 className="text-sm font-medium text-blue-800 mb-1">Trespasse horizontal inadequado</h4>
              <p className="text-sm text-blue-700">Especifique a medida</p>
            </div>
            
            <Label className="text-sm font-medium text-gray-700">
              Assinale a medida do trespasse horizontal
            </Label>
            <div className="flex gap-px max-w-lg mt-3">
              <div className="flex flex-col gap-2 flex-1">
                {medidasTrespasseHorizontalEsquerda.map((medida) => 
                  renderCard(medida, dados.medidaTrespasseHorizontal, (valor) => {
                    setDados({ ...dados, medidaTrespasseHorizontal: valor })
                  })
                )}
              </div>
              <div className="flex flex-col gap-2 flex-1">
                {medidasTrespasseHorizontalDireita.map((medida) => 
                  renderCard(medida, dados.medidaTrespasseHorizontal, (valor) => {
                    setDados({ ...dados, medidaTrespasseHorizontal: valor })
                  })
                )}
              </div>
            </div>
          </div>
        )
      
      case 5.21:
        return (
          <div>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
              <h4 className="text-sm font-medium text-blue-800 mb-1">Mordida aberta</h4>
              <p className="text-sm text-blue-700">Especifique a medida</p>
            </div>
            
            <Label className="text-sm font-medium text-gray-700">
              Assinale a medida do trespasse vertical
            </Label>
            <div className="flex gap-px max-w-lg mt-3">
              <div className="flex flex-col gap-2 flex-1">
                {medidasTrespasseVerticalEsquerda.map((medida) => 
                  renderCard(medida, dados.medidaTrespasseVertical, (valor) => {
                    setDados({ ...dados, medidaTrespasseVertical: valor })
                  })
                )}
              </div>
              <div className="flex flex-col gap-2 flex-1">
                {medidasTrespasseVerticalDireita.map((medida) => 
                  renderCard(medida, dados.medidaTrespasseVertical, (valor) => {
                    setDados({ ...dados, medidaTrespasseVertical: valor })
                  })
                )}
              </div>
            </div>
          </div>
        )
      
      case 5.22:
        return (
          <div>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
              <h4 className="text-sm font-medium text-blue-800 mb-1">Sobremordida</h4>
              <p className="text-sm text-blue-700">Especifique a medida</p>
            </div>
            
            <Label className="text-sm font-medium text-gray-700">
              Assinale a medida do trespasse vertical
            </Label>
            <div className="flex gap-px max-w-lg mt-3">
              <div className="flex flex-col gap-2 flex-1">
                {medidasTrespasseVerticalEsquerda.map((medida) => 
                  renderCard(medida, dados.medidaTrespasseVertical, (valor) => {
                    setDados({ ...dados, medidaTrespasseVertical: valor })
                  })
                )}
              </div>
              <div className="flex flex-col gap-2 flex-1">
                {medidasTrespasseVerticalDireita.map((medida) => 
                  renderCard(medida, dados.medidaTrespasseVertical, (valor) => {
                    setDados({ ...dados, medidaTrespasseVertical: valor })
                  })
                )}
              </div>
            </div>
          </div>
        )
      
      case 6:
        return (
          <div className="space-y-6">
            <div>
              <Label className="text-sm font-medium text-gray-700">
                Diastemas
              </Label>
              <div className="flex gap-3 mt-3">
                {renderCard(
                  { id: 'presentes', titulo: 'Presentes' },
                  dados.diastemas,
                  (valor) => {
                    setDados({ ...dados, diastemas: valor })
                  }
                )}
                {renderCard(
                  { id: 'ausentes', titulo: 'Ausentes' },
                  dados.diastemas,
                  (valor) => {
                    setDados({ ...dados, diastemas: valor })
                  }
                )}
              </div>
            </div>

            <div>
              <Label className="text-sm font-medium text-gray-700">
                Apinhamento
              </Label>
              <div className="flex gap-3 mt-3">
                {renderCard(
                  { id: 'presentes', titulo: 'Presentes' },
                  dados.apinhamento,
                  (valor) => {
                    setDados({ ...dados, apinhamento: valor })
                  }
                )}
                {renderCard(
                  { id: 'ausentes', titulo: 'Ausentes' },
                  dados.apinhamento,
                  (valor) => {
                    setDados({ ...dados, apinhamento: valor })
                  }
                )}
              </div>
            </div>

            <div>
              <Label className="text-sm font-medium text-gray-700">
                Giroversões
              </Label>
              <div className="flex gap-3 mt-3">
                {renderCard(
                  { id: 'presentes', titulo: 'Presentes' },
                  dados.giroversoes,
                  (valor) => {
                    setDados({ ...dados, giroversoes: valor })
                  }
                )}
                {renderCard(
                  { id: 'ausentes', titulo: 'Ausentes' },
                  dados.giroversoes,
                  (valor) => {
                    setDados({ ...dados, giroversoes: valor })
                  }
                )}
              </div>
            </div>
          </div>
        )
      
      case 7:
        return (
          <div>
            <Label className="text-sm font-medium text-gray-700">
              Objetivos a serem alcançados com a Prorrogação do Tratamento
            </Label>
            <div className="space-y-3 mt-3">
              {objetivosOpcoes.map((objetivo) => 
                renderCheckbox(objetivo, dados.objetivosProrrogacao, (valor) => {
                  const novosObjetivos = dados.objetivosProrrogacao.includes(valor)
                    ? dados.objetivosProrrogacao.filter(o => o !== valor)
                    : [...dados.objetivosProrrogacao, valor]
                  setDados({ ...dados, objetivosProrrogacao: novosObjetivos })
                })
              )}
            </div>
          </div>
        )
      
      case 8:
        return (
          <div>
            <Label className="text-sm font-medium text-gray-700">
              Descreva o plano de tratamento e mecânica a ser utilizada para finalização do caso
            </Label>
            <div className="mt-3">
              {renderTextarea(
                dados.planoTratamento,
                (value) => {
                  setDados({ ...dados, planoTratamento: value })
                },
                'Descreva mais sobre o plano de tratamento',
                5
              )}
            </div>
          </div>
        )
      
      case 9:
        return (
          <div>
            <Label className="text-sm font-medium text-gray-700">
              Nos envie as imagens que comprovem o estado atual do paciente para esse tratamento
            </Label>
            <div className="mt-3">
              <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center">
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={(e) => {
                    const files = Array.from(e.target.files || [])
                    setDados({ ...dados, imagens: files })
                  }}
                  className="hidden"
                  id="upload-images"
                />
                <label
                  htmlFor="upload-images"
                  className="cursor-pointer inline-flex items-center px-6 py-3 bg-[#F05223] text-white rounded-xl hover:bg-[#D94820] transition-colors"
                >
                  Selecionar Imagens
                </label>
                {dados.imagens.length > 0 && (
                  <p className="mt-4 text-sm text-gray-600">
                    {dados.imagens.length} {dados.imagens.length === 1 ? 'imagem selecionada' : 'imagens selecionadas'}
                  </p>
                )}
              </div>
            </div>
          </div>
        )
      
      default:
        return null
    }
  }


  const getTotalEtapas = () => {
    // Conta apenas as etapas principais (1-9)
    return 9
  }

  const getEtapaNumero = () => {
    // Converte sub-etapas para etapa principal para contagem
    if (etapaAtual >= 1 && etapaAtual < 2) return 1
    if (etapaAtual >= 2 && etapaAtual < 3) return 2
    if (etapaAtual >= 3 && etapaAtual < 4) return 3
    if (etapaAtual >= 4 && etapaAtual < 5) return 4
    if (etapaAtual >= 5 && etapaAtual < 6) return 5
    if (etapaAtual >= 6 && etapaAtual < 7) return 6
    if (etapaAtual >= 7 && etapaAtual < 8) return 7
    if (etapaAtual >= 8 && etapaAtual < 9) return 8
    if (etapaAtual >= 9) return 9
    return Math.floor(etapaAtual)
  }

  return (
    <div className="space-y-8">
      {/* Cabeçalho dinâmico com barra de progresso */}
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Pré-Aprovação de Prorrogação de Ortodontia
          </h3>
          <p className="text-sm text-gray-600">
            {etapaAtual === 1 && "Selecione a fase do tratamento ortodôntico"}
            {etapaAtual === 2 && "Informe o tempo previsto para finalização"}
            {etapaAtual === 3 && "Situação atual do tratamento ortodôntico"}
            {etapaAtual === 3.1 && "Especifique a quantidade de faltas"}
            {etapaAtual === 3.2 && "Selecione os dentes com tracionamento"}
            {etapaAtual === 3.3 && "Justifique a alteração do planejamento"}
            {etapaAtual === 4 && "Análise da relação dos caninos e molares"}
            {etapaAtual === 5 && "Informações sobre linha média e trespasses"}
            {etapaAtual === 5.1 && "Assinale a medida do trespasse horizontal"}
            {etapaAtual === 5.21 && "Assinale a medida do trespasse vertical"}
            {etapaAtual === 5.22 && "Assinale a medida do trespasse vertical"}
            {etapaAtual === 6 && "Presença de diastemas, apinhamento e giroversões"}
            {etapaAtual === 7 && "Objetivos a serem alcançados com a prorrogação"}
            {etapaAtual === 8 && "Descreva o plano de tratamento e mecânica"}
            {etapaAtual === 9 && "Envie as imagens atuais do tratamento"}
          </p>
        </div>
        
        {/* Barra de progresso compacta */}
        <div className="flex flex-col items-end gap-1">
          <div className="text-xs text-gray-500 font-medium">
            {getEtapaNumero()}/{getTotalEtapas()} etapas
          </div>
          <div className="w-32 bg-gray-200 rounded-full h-2">
            <div 
              className="bg-[#F05223] h-2 rounded-full transition-all duration-300 ease-out"
              style={{ width: `${(getEtapaNumero() / getTotalEtapas()) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* Conteúdo das etapas */}
      <div className="space-y-4">
        {renderEtapaContent()}
      </div>

      {/* Navegação interna do formulário */}
      <div className="mt-8 pt-6 border-t border-gray-200">
        <div className="flex items-center justify-between gap-4">
          {/* Botão Voltar - só mostra a partir da etapa 2 */}
          {etapaAtual > 1 && (
            <button 
              type="button"
              onClick={etapaAnterior}
              className="text-[#F05223] hover:text-[#D94820] hover:bg-[#F05223]/5 transition-all duration-300 flex items-center gap-2 font-semibold px-4 py-2 rounded-xl"
            >
              <ArrowLeft className="h-4 w-4" />
              Etapa anterior
            </button>
          )}
          
          {/* Espaçador quando não há botão voltar */}
          {etapaAtual === 1 && <div></div>}
          
          {/* Botão Próximo - sempre visível */}
          <button
            type="button"
            disabled={!podeContinuar()}
            onClick={proximaEtapa}
            className={`
              px-8 py-3 font-semibold rounded-full transition-all duration-300
              focus-visible:ring-2 focus-visible:ring-[#F05223] focus-visible:ring-offset-2
              ${!podeContinuar() 
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
                : 'bg-[#F05223] hover:bg-[#D94820] text-white shadow-md hover:shadow-lg'
              }
            `}
          >
            Próximo
          </button>
        </div>
      </div>

    </div>
  )
})

FormularioProrrogacao.displayName = 'FormularioProrrogacao'

export default FormularioProrrogacao