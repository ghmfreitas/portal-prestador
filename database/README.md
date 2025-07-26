# 🗄️ Database Schema - Portal Prestador Odonto

## 📁 Arquivos Disponíveis

### ✅ **odonto-database.sql** (PRINCIPAL)
- **Schema v2.1** atualizado e funcional
- ✅ **Sem campo valor_referencia** na tabela procedimentos
- ✅ **Com dados de exemplo** para desenvolvimento
- ✅ **View atualizada** sem campos financeiros
- ✅ **Compatível com execução múltipla** (IF NOT EXISTS)
- ✅ **Pronto para execução** no Supabase

## 🚀 Como Executar o Banco

### **1. Executar Script Principal**
```sql
-- No Supabase SQL Editor:
-- Cole todo o conteúdo de odonto-database.sql
-- Tempo estimado: 1-2 minutos
```

### **2. Resultado Esperado**
✅ Schema `odonto` criado  
✅ 13 tabelas com estrutura completa  
✅ 3 views principais funcionando  
✅ Índices otimizados  
✅ **Dados de exemplo** inseridos para desenvolvimento  
✅ **Sem campos financeiros** na tabela procedimentos

## 📊 Estrutura das Tabelas

### **📋 Tabelas Principais**
- `procedimentos` - Procedimentos odontológicos (sem valores)
- `especialidades` - Especialidades médicas
- `beneficiarios` - Cadastro de beneficiários
- `solicitacoes` - Solicitações de pré-aprovação

### **🔧 Tabelas de Configuração**
- `niveis_complexidade` - Níveis de complexidade documental
- `tipos_documento` - Tipos de documentos aceitos
- `status_solicitacao` - Status das solicitações
- `formularios_template` - Templates de formulários dinâmicos

### **🔗 Tabelas de Relacionamento**
- `procedimento_documentos` - Documentos por procedimento
- `solicitacao_procedimentos` - Procedimentos por solicitação
- `solicitacao_anexos` - Arquivos anexados

## 👁️ Views Disponíveis

### **`vw_procedimentos_completo`**
- Procedimentos com especialidades e complexidade
- **Sem campo valor_referencia** (atualizada v2.1)
- Pronta para o hook `useProcedimentos`

### **`vw_documentos_obrigatorios`**
- Documentos necessários por procedimento
- Para sistema de upload

### **`vw_formularios_dinamicos`**
- Formulários dinâmicos por especialidade
- Para pré-aprovações condicionais

## 🎯 Próximos Passos

Após executar o schema limpo:

1. **Inserir Especialidades** da planilha Results.xlsx
2. **Inserir Procedimentos** da planilha Results.xlsx  
3. **Configurar Níveis de Complexidade**
4. **Testar Views** no frontend
5. **Implementar Formulários** de pré-aprovação

## ⚠️ Importante

- **Use odonto-database.sql** para criar o banco completo
- **Schema v2.1** sem campos financeiros
- **Dados de exemplo** incluídos para desenvolvimento
- **Views atualizadas** e funcionais
- ✅ **Pode ser executado múltiplas vezes** sem erros

---

📅 **Última atualização**: 2025-07-01  
🏗️ **Versão**: v2.1 (Sem Valores)  
✅ **Status**: Pronto para execução