// Dados estáticos dos usuários
const USUARIO_PF = {
  id: 1,
  nome: "Gustavo H. M. Freitas",
  email: "gustavo.freitas@exemplo.com",
  codigo_identificacao: "0123456789",
  cpf_cnpj: "123.456.789-00",
  tipo_documento: "CPF",
  tipo_pessoa: "PF",
  telefone: "(11) 99999-9999",
  especialidade: "Ortodontia",
  cro: "SP-12345",
  endereco: {
    rua: "Rua das Flores, 123",
    bairro: "Centro",
    cidade: "São Paulo",
    estado: "SP",
    cep: "01234-567"
  },
  data_cadastro: "2024-01-15",
  ativo: true,
  primeiro_acesso: false
}

const USUARIO_PJ = {
  id: 2,
  nome: "Clínica Odontológica Sorriso S/A",
  razao_social: "Clínica Odontológica Sorriso S/A",
  nome_fantasia: "Clínica Sorriso",
  email: "contato@clinicasorriso.com.br",
  codigo_identificacao: "9876543210",
  cpf_cnpj: "12.345.678/0001-99",
  tipo_documento: "CNPJ",
  tipo_pessoa: "PJ",
  telefone: "(11) 3333-4444",
  especialidade: "Clínica Geral",
  cro: "SP-98765",
  endereco: {
    rua: "Av. Paulista, 1000",
    bairro: "Bela Vista",
    cidade: "São Paulo",
    estado: "SP",
    cep: "01310-100"
  },
  data_cadastro: "2024-01-20",
  ativo: true,
  primeiro_acesso: false
}

function detectDocumentType(cpfCnpj: string): 'CPF' | 'CNPJ' | null {
  const clean = cpfCnpj.replace(/\D/g, '')
  if (clean.length === 11) return 'CPF'
  if (clean.length === 14) return 'CNPJ'
  return null
}

export async function authenticateUser(codigo: string, senha: string) {
  // Simular delay de rede
  await new Promise(resolve => setTimeout(resolve, 1000))
  
  try {
    // Verificar credenciais do usuário PF
    if (codigo === "0123456789" && senha === "admin123") {
      return { success: true, usuario: USUARIO_PF }
    }
    
    // Verificar credenciais do usuário PJ
    if (codigo === "9876543210" && senha === "admin123") {
      return { success: true, usuario: USUARIO_PJ }
    }
    
    return { success: false, error: 'Código de identificação ou senha inválidos' }
  } catch (error) {
    console.error('Erro na autenticação:', error)
    return { success: false, error: 'Erro ao processar autenticação' }
  }
}

// Função para obter dados do usuário (substituir chamadas de banco)
export function getUsuarioEstatico() {
  // Por padrão retorna o usuário PF, mas pode ser modificado conforme necessário
  return USUARIO_PF
}

// Função para obter dados do usuário por código
export function getUsuarioPorCodigo(codigo: string) {
  if (codigo === "0123456789") return USUARIO_PF
  if (codigo === "9876543210") return USUARIO_PJ
  return null
}

// Função para obter dados do prestador (substituir consultas)
export function getDadosPrestador() {
  return {
    ...USUARIO_PF,
    estatisticas: {
      total_pacientes: 1247,
      consultas_mes: 89,
      procedimentos_realizados: 523,
      faturamento_mes: 45680.50,
      avaliacoes: 4.8,
      tempo_medio_atendimento: "45 min"
    },
    historico_recente: [
      {
        id: 1,
        data: "2024-01-15",
        tipo: "Consulta",
        paciente: "Maria Silva",
        valor: 150.00,
        status: "Concluída"
      },
      {
        id: 2,
        data: "2024-01-14",
        tipo: "Limpeza",
        paciente: "João Santos",
        valor: 80.00,
        status: "Concluída"
      },
      {
        id: 3,
        data: "2024-01-13",
        tipo: "Ortodontia",
        paciente: "Ana Costa",
        valor: 320.00,
        status: "Em andamento"
      }
    ]
  }
}