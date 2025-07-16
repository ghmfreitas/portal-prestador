// Dados estáticos do usuário
const USUARIO_ESTATICO = {
  id: 1,
  nome: "Gustavo H. M. Freitas",
  email: "gustavo.freitas@exemplo.com",
  codigo_identificacao: "0123456789",
  cpf_cnpj: "123.456.789-00",
  tipo_documento: "CPF",
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
    // Verificar credenciais estáticas
    if (codigo === "0123456789" && senha === "admin123") {
      return { success: true, usuario: USUARIO_ESTATICO }
    }
    
    return { success: false, error: 'Código de identificação ou senha inválidos' }
  } catch (error) {
    console.error('Erro na autenticação:', error)
    return { success: false, error: 'Erro ao processar autenticação' }
  }
}

// Função para obter dados do usuário (substituir chamadas de banco)
export function getUsuarioEstatico() {
  return USUARIO_ESTATICO
}

// Função para obter dados do prestador (substituir consultas)
export function getDadosPrestador() {
  return {
    ...USUARIO_ESTATICO,
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