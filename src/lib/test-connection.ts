import { supabase } from './supabaseClient'

export async function testSupabaseConnection() {
  try {
    console.log('🔄 Testando conexão com Supabase...')
    
    // Teste 1: Verificar beneficiários
    const { data: beneficiarios, error: errorBeneficiarios } = await supabase
      .from('beneficiarios')
      .select('id, nome, cpf')
      .limit(3)
    
    if (errorBeneficiarios) {
      console.error('❌ Erro ao acessar beneficiários:', errorBeneficiarios)
      return false
    }
    
    console.log('✅ Beneficiários encontrados:', beneficiarios?.length || 0)
    
    // Teste 2: Verificar especialidades
    const { data: especialidades, error: errorEspecialidades } = await supabase
      .from('especialidades')
      .select('id, descricao')
      .limit(3)
    
    if (errorEspecialidades) {
      console.error('❌ Erro ao acessar especialidades:', errorEspecialidades)
      return false
    }
    
    console.log('✅ Especialidades encontradas:', especialidades?.length || 0)
    
    // Teste 3: Verificar procedimentos
    const { data: procedimentos, error: errorProcedimentos } = await supabase
      .from('procedimentos')
      .select('id, descricao, codigo_tuss')
      .limit(3)
    
    if (errorProcedimentos) {
      console.error('❌ Erro ao acessar procedimentos:', errorProcedimentos)
      return false
    }
    
    console.log('✅ Procedimentos encontrados:', procedimentos?.length || 0)
    
    console.log('🎉 Conexão com Supabase estabelecida com sucesso!')
    console.log('📊 Dados de teste:', {
      beneficiarios: beneficiarios?.slice(0, 2),
      especialidades: especialidades?.slice(0, 2),
      procedimentos: procedimentos?.slice(0, 2)
    })
    
    return true
  } catch (error) {
    console.error('💥 Erro inesperado:', error)
    return false
  }
}