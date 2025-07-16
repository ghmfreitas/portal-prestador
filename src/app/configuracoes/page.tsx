'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { User, MapPin, Phone, Clock, Briefcase, Check, Info, Bank, Key, Upload, FileText, Eye, EyeSlash, X } from 'phosphor-react'
import Link from 'next/link'
import Header from '@/components/Header'
import Sidebar from '@/components/Sidebar'
import Footer from '@/components/Footer'

interface HorarioAtendimento {
  dia: string
  abertura: string
  fechamento: string
  fechado: boolean
}

interface AreaAtuacao {
  id: string
  nome: string
  especialista: boolean
}

export default function ConfiguracoesPage() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [activeTab, setActiveTab] = useState('dados-pessoais')
  const [showSuccessMessage, setShowSuccessMessage] = useState(false)

  // Estados para dados pessoais
  const [dadosPessoais, setDadosPessoais] = useState({
    nome: 'Gustavo H. M. Freitas',
    email: 'gustavo.freitas@exemplo.com',
    cro: 'SP-12345'
  })

  useEffect(() => {
    const userData = sessionStorage.getItem("user")
    if (!userData) {
      router.push("/")
    } else {
      const parsedUser = JSON.parse(userData)
      setUser(parsedUser)
      // Atualizar dados pessoais com os dados do usuário
      setDadosPessoais({
        nome: parsedUser.nome || 'Gustavo H. M. Freitas',
        email: parsedUser.email || 'gustavo.freitas@exemplo.com',
        cro: parsedUser.cro || 'SP-12345'
      })
    }
  }, [router])

  // Estados para endereço
  const [endereco, setEndereco] = useState({
    endereco: 'Rua das Flores',
    numero: '123',
    bairro: 'Jardim Paulista',
    cep: '01234-567',
    cidade: 'São Paulo',
    uf: 'SP',
    complemento: 'Sala 201'
  })

  // Estados para contato
  const [contato, setContato] = useState({
    telefone: '(11) 3333-4444',
    whatsapp: '(11) 98765-4321'
  })

  // Estados para horários
  const [horarios, setHorarios] = useState<HorarioAtendimento[]>([
    { dia: 'Segunda', abertura: '08:00', fechamento: '18:00', fechado: false },
    { dia: 'Terça', abertura: '08:00', fechamento: '18:00', fechado: false },
    { dia: 'Quarta', abertura: '08:00', fechamento: '18:00', fechado: false },
    { dia: 'Quinta', abertura: '08:00', fechamento: '18:00', fechado: false },
    { dia: 'Sexta', abertura: '08:00', fechamento: '18:00', fechado: false },
    { dia: 'Sábado', abertura: '08:00', fechamento: '12:00', fechado: false }
  ])

  // Estados para dados bancários
  const [dadosBancarios, setDadosBancarios] = useState({
    banco: '341',
    agencia: '1234',
    conta: '56789-0',
    tipoConta: 'corrente' as 'corrente' | 'poupanca',
    documentoNome: 'comprovante-conta.pdf'
  })
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)
  const [dragActive, setDragActive] = useState(false)

  // Estados para alteração de senha
  const [senhaAtual, setSenhaAtual] = useState('')
  const [novaSenha, setNovaSenha] = useState('')
  const [confirmarSenha, setConfirmarSenha] = useState('')
  const [showSenhaAtual, setShowSenhaAtual] = useState(false)
  const [showNovaSenha, setShowNovaSenha] = useState(false)
  const [showConfirmarSenha, setShowConfirmarSenha] = useState(false)
  const [showError, setShowError] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  // Estados para áreas de atuação
  const [areasAtuacao, setAreasAtuacao] = useState<AreaAtuacao[]>([
    { id: '1', nome: 'Buco Maxilo-Facial', especialista: false },
    { id: '2', nome: 'Cirurgia', especialista: false },
    { id: '3', nome: 'Clínica Geral', especialista: true },
    { id: '4', nome: 'Consultor Odontológico', especialista: false },
    { id: '5', nome: 'Dentística', especialista: false },
    { id: '6', nome: 'Diagnóstico', especialista: false },
    { id: '7', nome: 'DTM', especialista: false },
    { id: '8', nome: 'Endodontia', especialista: true },
    { id: '9', nome: 'Estomatologia', especialista: false },
    { id: '10', nome: 'Implantes', especialista: false },
    { id: '11', nome: 'Laboratório Protético', especialista: false },
    { id: '12', nome: 'Não Informado', especialista: false },
    { id: '13', nome: 'Odontogeriatria', especialista: false },
    { id: '14', nome: 'Odontologia Estética', especialista: false },
    { id: '15', nome: 'Odontologia Legal', especialista: false },
    { id: '16', nome: 'Odontopediatria', especialista: false },
    { id: '17', nome: 'Ortodontia', especialista: true },
    { id: '18', nome: 'Ortodontia - Alinhador Invisível', especialista: false },
    { id: '19', nome: 'Pacientes Especiais', especialista: false },
    { id: '20', nome: 'Perícia', especialista: false },
    { id: '21', nome: 'Periodontia', especialista: false },
    { id: '22', nome: 'Prevenção', especialista: false },
    { id: '23', nome: 'Prótese', especialista: false },
    { id: '24', nome: 'Radiologia', especialista: false },
    { id: '25', nome: 'Radiologia com escaneamento', especialista: false },
    { id: '26', nome: 'Radiologia com Tomografia', especialista: false },
    { id: '27', nome: 'SPA Odontológico', especialista: false },
    { id: '28', nome: 'Urgência 24h - Móvel', especialista: false },
    { id: '29', nome: 'Urgência 24h - Plantonista', especialista: false },
    { id: '30', nome: 'Urgência 24 - Sobreaviso', especialista: false },
    { id: '31', nome: 'Urgência Diurna', especialista: false },
    { id: '32', nome: 'Urgência Noturna / Feriados / Sábado e Dom.', especialista: false }
  ])

  // Lista de bancos
  const bancos = [
    { codigo: '001', nome: 'Banco do Brasil' },
    { codigo: '237', nome: 'Bradesco' },
    { codigo: '341', nome: 'Itaú' },
    { codigo: '033', nome: 'Santander' },
    { codigo: '104', nome: 'Caixa Econômica Federal' },
    { codigo: '260', nome: 'Nubank' },
    { codigo: '077', nome: 'Banco Inter' },
    { codigo: '336', nome: 'C6 Bank' }
  ]

  // Requisitos de senha
  const passwordRequirements = [
    { label: 'Mínimo de 8 caracteres', regex: /.{8,}/, met: /.{8,}/.test(novaSenha) },
    { label: 'Pelo menos uma letra maiúscula', regex: /[A-Z]/, met: /[A-Z]/.test(novaSenha) },
    { label: 'Pelo menos uma letra minúscula', regex: /[a-z]/, met: /[a-z]/.test(novaSenha) },
    { label: 'Pelo menos um número', regex: /[0-9]/, met: /[0-9]/.test(novaSenha) },
    { label: 'Pelo menos um caractere especial', regex: /[!@#$%^&*]/, met: /[!@#$%^&*]/.test(novaSenha) }
  ]

  const handleSave = () => {
    if (activeTab === 'alterar-senha') {
      // Validações para senha
      if (!senhaAtual) {
        setErrorMessage('Por favor, informe sua senha atual')
        setShowError(true)
        return
      }
      
      if (!novaSenha) {
        setErrorMessage('Por favor, informe a nova senha')
        setShowError(true)
        return
      }
      
      if (novaSenha === senhaAtual) {
        setErrorMessage('A nova senha não pode ser igual à senha atual')
        setShowError(true)
        return
      }
      
      if (novaSenha !== confirmarSenha) {
        setErrorMessage('As senhas não conferem')
        setShowError(true)
        return
      }
      
      const allRequirementsMet = passwordRequirements.every(req => req.met)
      if (!allRequirementsMet) {
        setErrorMessage('A senha não atende a todos os requisitos')
        setShowError(true)
        return
      }
      
      // Alteração automática da senha
      setShowSuccessMessage(true)
      setSenhaAtual('')
      setNovaSenha('')
      setConfirmarSenha('')
      
      setTimeout(() => {
        setShowSuccessMessage(false)
        setActiveTab('dados-pessoais')
      }, 2000)
      return
    }

    // Para outras abas, criar solicitação de alteração
    const tipoSolicitacao = activeTab === 'dados-bancarios' ? 'Alteração de Dados Bancários' : 'Alteração de Dados Cadastrais'
    
    const solicitacao = {
      id: Date.now().toString(),
      data: new Date(),
      tipo: tipoSolicitacao,
      status: 'Em análise',
      alteracoes: {
        dadosPessoais: activeTab === 'dados-pessoais' ? dadosPessoais : null,
        endereco: activeTab === 'endereco' ? endereco : null,
        contato: activeTab === 'contato' ? contato : null,
        horarios: activeTab === 'horarios' ? horarios : null,
        areasAtuacao: activeTab === 'areas-atuacao' ? areasAtuacao.filter(a => a.especialista) : null,
        dadosBancarios: activeTab === 'dados-bancarios' ? {
          ...dadosBancarios,
          documento: uploadedFile ? uploadedFile.name : dadosBancarios.documentoNome
        } : null
      }
    }
    
    // Salvar no localStorage para demo
    const solicitacoes = JSON.parse(localStorage.getItem('solicitacoesAlteracao') || '[]')
    solicitacoes.push(solicitacao)
    localStorage.setItem('solicitacoesAlteracao', JSON.stringify(solicitacoes))
    
    setShowSuccessMessage(true)
    setTimeout(() => {
      setShowSuccessMessage(false)
      router.push('/solicitacoes-alteracao')
    }, 2000)
  }

  const toggleAreaAtuacao = (areaId: string) => {
    setAreasAtuacao(prev => prev.map(area =>
      area.id === areaId ? { ...area, especialista: !area.especialista } : area
    ))
  }

  const toggleHorarioFechado = (index: number) => {
    setHorarios(prev => prev.map((horario, i) =>
      i === index ? { ...horario, fechado: !horario.fechado } : horario
    ))
  }

  // Funções para upload de arquivo
  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0])
    }
  }

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0])
    }
  }

  const handleFile = (file: File) => {
    const validTypes = ['application/pdf', 'image/jpeg', 'image/jpg', 'image/png']
    if (!validTypes.includes(file.type)) {
      alert('Por favor, envie apenas arquivos PDF, JPG ou PNG')
      return
    }
    
    if (file.size > 5 * 1024 * 1024) {
      alert('O arquivo deve ter no máximo 5MB')
      return
    }
    
    setUploadedFile(file)
    setDadosBancarios({ ...dadosBancarios, documentoNome: file.name })
  }

  const tabs = [
    { id: 'dados-pessoais', label: 'Dados Pessoais', icon: User },
    { id: 'endereco', label: 'Endereço', icon: MapPin },
    { id: 'contato', label: 'Contato', icon: Phone },
    { id: 'horarios', label: 'Horários', icon: Clock },
    { id: 'areas-atuacao', label: 'Áreas de Atuação', icon: Briefcase },
    { id: 'dados-bancarios', label: 'Dados Bancários', icon: Bank },
    { id: 'alterar-senha', label: 'Alterar Senha', icon: Key }
  ]

  if (!user) return null

  return (
    <div className="min-h-screen bg-white grid grid-rows-[77px_auto_1fr_auto] lg:grid-rows-[77px_1fr_auto] lg:grid-cols-[256px_1fr]">
      <Header />
      <Sidebar />
      <main className="p-4 lg:p-8 overflow-auto lg:col-start-2">
        <div className="max-w-7xl mx-auto">
        {/* Cabeçalho */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-lg font-medium text-[#F05223] mb-1">
                Configurações
              </h4>
              <h1 className="text-3xl font-bold text-gray-900">
                Meu Perfil
              </h1>
            </div>
            <Link
              href="/solicitacoes-alteracao"
              className="h-[44px] px-6 border border-[#F05223] text-[#F05223] rounded-full hover:bg-[#F05223] hover:text-white transition-colors flex items-center justify-center font-semibold"
            >
              Minhas Solicitações
            </Link>
          </div>
        </div>

        {/* Card Principal */}
        <div className="bg-white border border-[#EAE7EC] rounded-xl">
          {/* Tabs */}
          <div className="border-b border-[#EAE7EC]">
            <div className="flex overflow-x-auto">
              {tabs.map((tab) => {
                const Icon = tab.icon
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center space-x-2 px-6 py-4 border-b-2 transition-colors whitespace-nowrap ${
                      activeTab === tab.id
                        ? 'border-[#F05223] text-[#F05223]'
                        : 'border-transparent text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                    <span className="font-medium">{tab.label}</span>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Conteúdo */}
          <div className="p-6">
            {/* Dados Pessoais */}
            {activeTab === 'dados-pessoais' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Nome Completo
                    </label>
                    <input
                      type="text"
                      value={dadosPessoais.nome}
                      onChange={(e) => setDadosPessoais({ ...dadosPessoais, nome: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F05223] focus:border-transparent"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      CRO
                    </label>
                    <input
                      type="text"
                      value={dadosPessoais.cro}
                      onChange={(e) => setDadosPessoais({ ...dadosPessoais, cro: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F05223] focus:border-transparent"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    E-mail
                  </label>
                  <input
                    type="email"
                    value={dadosPessoais.email}
                    onChange={(e) => setDadosPessoais({ ...dadosPessoais, email: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F05223] focus:border-transparent"
                  />
                </div>
              </div>
            )}

            {/* Endereço */}
            {activeTab === 'endereco' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Endereço
                    </label>
                    <input
                      type="text"
                      value={endereco.endereco}
                      onChange={(e) => setEndereco({ ...endereco, endereco: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F05223] focus:border-transparent"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Número
                    </label>
                    <input
                      type="text"
                      value={endereco.numero}
                      onChange={(e) => setEndereco({ ...endereco, numero: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F05223] focus:border-transparent"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Bairro
                    </label>
                    <input
                      type="text"
                      value={endereco.bairro}
                      onChange={(e) => setEndereco({ ...endereco, bairro: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F05223] focus:border-transparent"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      CEP
                    </label>
                    <input
                      type="text"
                      value={endereco.cep}
                      onChange={(e) => setEndereco({ ...endereco, cep: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F05223] focus:border-transparent"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Cidade
                    </label>
                    <input
                      type="text"
                      value={endereco.cidade}
                      onChange={(e) => setEndereco({ ...endereco, cidade: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F05223] focus:border-transparent"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      UF
                    </label>
                    <select
                      value={endereco.uf}
                      onChange={(e) => setEndereco({ ...endereco, uf: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F05223] focus:border-transparent"
                    >
                      <option value="SP">SP</option>
                      <option value="RJ">RJ</option>
                      <option value="MG">MG</option>
                      <option value="ES">ES</option>
                      <option value="PR">PR</option>
                      <option value="SC">SC</option>
                      <option value="RS">RS</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Complemento
                  </label>
                  <input
                    type="text"
                    value={endereco.complemento}
                    onChange={(e) => setEndereco({ ...endereco, complemento: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F05223] focus:border-transparent"
                  />
                </div>
              </div>
            )}

            {/* Contato */}
            {activeTab === 'contato' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Telefone
                    </label>
                    <input
                      type="tel"
                      value={contato.telefone}
                      onChange={(e) => setContato({ ...contato, telefone: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F05223] focus:border-transparent"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      WhatsApp
                    </label>
                    <input
                      type="tel"
                      value={contato.whatsapp}
                      onChange={(e) => setContato({ ...contato, whatsapp: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F05223] focus:border-transparent"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Horários */}
            {activeTab === 'horarios' && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Horário de Atendimento</h3>
                {horarios.map((horario, index) => (
                  <div key={horario.dia} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                    <div className="w-24 font-medium text-gray-700">{horario.dia}</div>
                    
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={horario.fechado}
                        onChange={() => toggleHorarioFechado(index)}
                        className="h-4 w-4 text-[#F05223] focus:ring-[#F05223] border-gray-300 rounded"
                      />
                      <label className="text-sm text-gray-600">Fechado</label>
                    </div>

                    <div className="flex items-center space-x-2 flex-1">
                      <input
                        type="time"
                        value={horario.abertura}
                        disabled={horario.fechado}
                        onChange={(e) => {
                          const newHorarios = [...horarios]
                          newHorarios[index].abertura = e.target.value
                          setHorarios(newHorarios)
                        }}
                        className={`px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F05223] focus:border-transparent ${
                          horario.fechado ? 'bg-gray-100 text-gray-400' : ''
                        }`}
                      />
                      <span className="text-gray-500">até</span>
                      <input
                        type="time"
                        value={horario.fechamento}
                        disabled={horario.fechado}
                        onChange={(e) => {
                          const newHorarios = [...horarios]
                          newHorarios[index].fechamento = e.target.value
                          setHorarios(newHorarios)
                        }}
                        className={`px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F05223] focus:border-transparent ${
                          horario.fechado ? 'bg-gray-100 text-gray-400' : ''
                        }`}
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Áreas de Atuação */}
            {activeTab === 'areas-atuacao' && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Selecione suas áreas de atuação e especialidades</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {areasAtuacao.map((area) => (
                    <div
                      key={area.id}
                      onClick={() => toggleAreaAtuacao(area.id)}
                      className={`
                        relative bg-white border-2 rounded-xl p-4 cursor-pointer 
                        transition-all duration-300 hover:shadow-lg
                        ${area.especialista 
                          ? 'border-[#F05223] bg-[#F05223]/5 shadow-md' 
                          : 'border-[#EAE7EC] hover:border-[#F05223] hover:bg-[#F05223]/5'
                        }
                      `}
                    >
                      {area.especialista && (
                        <div className="absolute top-3 right-3 w-6 h-6 bg-[#F05223] rounded-full flex items-center justify-center">
                          <Check className="w-4 h-4 text-white" />
                        </div>
                      )}
                      
                      <div className="flex items-center space-x-3">
                        <div className={`
                          w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all duration-300
                          ${area.especialista ? 'border-[#F05223] bg-[#F05223]' : 'border-[#EAE7EC]'}
                        `}>
                          {area.especialista && <div className="w-2.5 h-2.5 bg-white rounded-full"></div>}
                        </div>
                        
                        <div className="flex-1">
                          <h4 className={`text-sm font-medium transition-colors duration-300 ${
                            area.especialista ? 'text-[#F05223]' : 'text-gray-900'
                          }`}>
                            {area.nome}
                          </h4>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Dados Bancários */}
            {activeTab === 'dados-bancarios' && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Informações Bancárias</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Banco
                    </label>
                    <select
                      value={dadosBancarios.banco}
                      onChange={(e) => setDadosBancarios({ ...dadosBancarios, banco: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F05223] focus:border-transparent"
                    >
                      {bancos.map((banco) => (
                        <option key={banco.codigo} value={banco.codigo}>
                          {banco.codigo} - {banco.nome}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Tipo de Conta
                    </label>
                    <select
                      value={dadosBancarios.tipoConta}
                      onChange={(e) => setDadosBancarios({ ...dadosBancarios, tipoConta: e.target.value as 'corrente' | 'poupanca' })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F05223] focus:border-transparent"
                    >
                      <option value="corrente">Conta Corrente</option>
                      <option value="poupanca">Conta Poupança</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Agência
                    </label>
                    <input
                      type="text"
                      value={dadosBancarios.agencia}
                      onChange={(e) => setDadosBancarios({ ...dadosBancarios, agencia: e.target.value })}
                      placeholder="0000"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F05223] focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Conta
                    </label>
                    <input
                      type="text"
                      value={dadosBancarios.conta}
                      onChange={(e) => setDadosBancarios({ ...dadosBancarios, conta: e.target.value })}
                      placeholder="00000-0"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F05223] focus:border-transparent"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Comprovante de Conta Bancária
                  </label>
                  
                  <div
                    className={`
                      relative border-2 border-dashed rounded-lg p-6 text-center
                      ${dragActive ? 'border-[#F05223] bg-[#F05223]/5' : 'border-gray-300'}
                    `}
                    onDragEnter={handleDrag}
                    onDragLeave={handleDrag}
                    onDragOver={handleDrag}
                    onDrop={handleDrop}
                  >
                    <input
                      type="file"
                      id="file-upload"
                      className="hidden"
                      onChange={handleFileInput}
                      accept=".pdf,.jpg,.jpeg,.png"
                    />
                    
                    {uploadedFile || dadosBancarios.documentoNome ? (
                      <div className="flex items-center justify-center space-x-4">
                        <FileText className="h-10 w-10 text-[#F05223]" />
                        <div className="text-left">
                          <p className="text-sm font-medium text-gray-900">
                            {uploadedFile ? uploadedFile.name : dadosBancarios.documentoNome}
                          </p>
                          <p className="text-xs text-gray-500">
                            {uploadedFile && `${(uploadedFile.size / 1024 / 1024).toFixed(2)} MB`}
                          </p>
                        </div>
                        <button
                          onClick={() => {
                            setUploadedFile(null)
                            setDadosBancarios({ ...dadosBancarios, documentoNome: '' })
                          }}
                          className="p-2 text-gray-400 hover:text-gray-600"
                        >
                          <X className="h-5 w-5" />
                        </button>
                      </div>
                    ) : (
                      <label htmlFor="file-upload" className="cursor-pointer">
                        <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                        <p className="text-sm text-gray-600">
                          Arraste e solte o arquivo aqui ou{' '}
                          <span className="text-[#F05223] font-medium">clique para selecionar</span>
                        </p>
                        <p className="text-xs text-gray-500 mt-2">
                          PDF, JPG ou PNG (máx. 5MB)
                        </p>
                      </label>
                    )}
                  </div>
                </div>

                <div className="p-4 bg-blue-50 rounded-lg">
                  <div className="flex items-start space-x-2">
                    <Info className="h-5 w-5 text-[#145ABF] flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-[#145ABF]">
                        Importante
                      </p>
                      <p className="text-xs text-gray-600 mt-1">
                        As alterações nos dados bancários passarão por análise antes de serem efetivadas.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Alterar Senha */}
            {activeTab === 'alterar-senha' && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Alterar Senha</h3>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Senha Atual
                  </label>
                  <div className="relative">
                    <input
                      type={showSenhaAtual ? 'text' : 'password'}
                      value={senhaAtual}
                      onChange={(e) => {
                        setSenhaAtual(e.target.value)
                        setShowError(false)
                      }}
                      className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F05223] focus:border-transparent"
                      placeholder="Digite sua senha atual"
                    />
                    <button
                      type="button"
                      onClick={() => setShowSenhaAtual(!showSenhaAtual)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 p-2 text-gray-400 hover:text-gray-600"
                    >
                      {showSenhaAtual ? <EyeSlash className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nova Senha
                  </label>
                  <div className="relative">
                    <input
                      type={showNovaSenha ? 'text' : 'password'}
                      value={novaSenha}
                      onChange={(e) => {
                        setNovaSenha(e.target.value)
                        setShowError(false)
                      }}
                      className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F05223] focus:border-transparent"
                      placeholder="Digite sua nova senha"
                    />
                    <button
                      type="button"
                      onClick={() => setShowNovaSenha(!showNovaSenha)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 p-2 text-gray-400 hover:text-gray-600"
                    >
                      {showNovaSenha ? <EyeSlash className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>
                  
                  {novaSenha && (
                    <div className="mt-3 space-y-2">
                      {passwordRequirements.map((req, index) => (
                        <div key={index} className="flex items-center space-x-2">
                          {req.met ? (
                            <Check className="h-4 w-4 text-green-600" />
                          ) : (
                            <X className="h-4 w-4 text-gray-400" />
                          )}
                          <span className={`text-sm ${req.met ? 'text-green-600' : 'text-gray-500'}`}>
                            {req.label}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Confirmar Nova Senha
                  </label>
                  <div className="relative">
                    <input
                      type={showConfirmarSenha ? 'text' : 'password'}
                      value={confirmarSenha}
                      onChange={(e) => {
                        setConfirmarSenha(e.target.value)
                        setShowError(false)
                      }}
                      className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F05223] focus:border-transparent"
                      placeholder="Confirme sua nova senha"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmarSenha(!showConfirmarSenha)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 p-2 text-gray-400 hover:text-gray-600"
                    >
                      {showConfirmarSenha ? <EyeSlash className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>
                  
                  {confirmarSenha && novaSenha && (
                    <div className="mt-2">
                      {confirmarSenha === novaSenha ? (
                        <div className="flex items-center space-x-1 text-green-600">
                          <Check className="h-4 w-4" />
                          <span className="text-sm">As senhas conferem</span>
                        </div>
                      ) : (
                        <div className="flex items-center space-x-1 text-red-600">
                          <X className="h-4 w-4" />
                          <span className="text-sm">As senhas não conferem</span>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {showError && (
                  <div className="p-4 bg-red-50 rounded-lg">
                    <div className="flex items-start space-x-2">
                      <X className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-red-600">
                          Erro ao alterar senha
                        </p>
                        <p className="text-xs text-red-600 mt-1">
                          {errorMessage}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                <div className="p-4 bg-blue-50 rounded-lg">
                  <div className="flex items-start space-x-2">
                    <Info className="h-5 w-5 text-[#145ABF] flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-[#145ABF]">
                        Alteração Automática
                      </p>
                      <p className="text-xs text-gray-600 mt-1">
                        Ao clicar em "Salvar Alterações", sua senha será alterada imediatamente.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Rodapé com botões */}
          <div className="px-6 py-4 bg-gray-50 border-t border-[#EAE7EC] rounded-b-xl flex items-center justify-end">
            <button
              onClick={handleSave}
              className="h-[44px] px-6 bg-[#F05223] text-white rounded-full hover:bg-[#D94820] transition-colors font-semibold"
            >
              {activeTab === 'alterar-senha' ? 'Alterar Senha' : 'Solicitar Alteração'}
            </button>
          </div>
        </div>

        {/* Mensagem de sucesso */}
        {showSuccessMessage && (
          <div className={`fixed bottom-4 right-4 text-white px-6 py-4 rounded-lg shadow-lg flex items-center space-x-3 max-w-md ${
            activeTab === 'alterar-senha' ? 'bg-green-600' : 'bg-[#145ABF]'
          }`}>
            {activeTab === 'alterar-senha' ? (
              <Check className="h-6 w-6 flex-shrink-0" />
            ) : (
              <Info className="h-6 w-6 flex-shrink-0" />
            )}
            <div>
              <p className="font-semibold">
                {activeTab === 'alterar-senha' ? 'Senha alterada!' : 'Solicitação enviada!'}
              </p>
              <p className="text-sm mt-1">
                {activeTab === 'alterar-senha' 
                  ? 'Sua senha foi alterada com sucesso.' 
                  : 'Sua solicitação de alteração foi enviada para análise. Você será redirecionado para acompanhar o status.'
                }
              </p>
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