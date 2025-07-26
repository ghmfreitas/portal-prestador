# 🔧 CORREÇÃO: Erro de Dependência - Remoção de Valores

## ❌ ERRO ENCONTRADO

### **Mensagem de Erro:**
```
ERROR: 2BP01: cannot drop column valor_referencia of table odonto.procedimentos because other objects depend on it
DETAIL: view odonto.vw_procedimentos_completo depends on column valor_referencia of table odonto.procedimentos
HINT: Use DROP ... CASCADE to drop the dependent objects too.
```

### **Causa do Problema:**
- A view `odonto.vw_procedimentos_completo` usa o campo `valor_referencia`
- PostgreSQL não permite remover uma coluna que tem dependências
- O script original tentou remover a coluna antes de tratar as dependências

---

## ✅ SOLUÇÃO IMPLEMENTADA

### **Arquivo de Correção:** `database/fix-remove-valores-procedimentos.sql`

### **Estratégia de Correção:**
1. **📦 Backup Primeiro**: Salvar dados antes de qualquer remoção
2. **🔍 Identificar Dependências**: Listar todas as views que usam o campo
3. **🗑️ Remover Views**: Dropar views dependentes primeiro
4. **🔧 Remover Constraints**: Eliminar constraint de valor positivo
5. **❌ Remover Coluna**: Agora sem dependências
6. **🔄 Recriar View**: Nova versão sem valor_referencia
7. **✅ Validar**: Verificar se tudo funcionou

---

## 📋 ETAPAS DA CORREÇÃO

### **1. Backup de Segurança**
```sql
CREATE TABLE odonto.backup_valores_procedimentos (
    codigo_tuss VARCHAR(20),
    descricao VARCHAR(255),
    valor_referencia_removido DECIMAL(10,2),
    data_remocao TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### **2. Identificação de Dependências**
```sql
-- Listar views que dependem do campo
SELECT schemaname, viewname, definition
FROM pg_views 
WHERE schemaname = 'odonto' 
AND definition ILIKE '%valor_referencia%';
```

### **3. Remoção Sequencial**
```sql
-- 1. Dropar view primeiro
DROP VIEW IF EXISTS odonto.vw_procedimentos_completo CASCADE;

-- 2. Remover constraint
ALTER TABLE odonto.procedimentos DROP CONSTRAINT valor_positivo;

-- 3. Remover coluna (agora sem dependências)
ALTER TABLE odonto.procedimentos DROP COLUMN valor_referencia;
```

### **4. Recriação da View**
```sql
CREATE OR REPLACE VIEW odonto.vw_procedimentos_completo AS
SELECT 
    p.id,
    p.codigo_tuss,
    p.descricao,
    e.descricao as especialidade,
    -- valor_referencia REMOVIDO
    p.requer_pre_aprovacao,
    -- ... outros campos
FROM odonto.procedimentos p
JOIN odonto.especialidades e ON p.especialidade_id = e.id
LEFT JOIN odonto.niveis_complexidade nc ON p.nivel_complexidade_id = nc.id
WHERE p.ativo = TRUE;
```

---

## 🎯 MELHORIAS NO SCRIPT CORRIGIDO

### **🔒 Segurança Aprimorada**
- Verificações antes de cada operação
- Backup automático dos dados
- Logs detalhados de execução
- Relatório final de validação

### **🧠 Inteligência de Dependência**
- Identificação automática de views dependentes
- Remoção dinâmica de dependências
- Tratamento de múltiplas views se existirem

### **📊 Validação Completa**
- Contagem de registros em backup
- Verificação de existência da coluna
- Teste da view recriada
- Relatório final de status

### **🔄 Reversibilidade**
- Instruções completas para reverter
- Dados preservados em backup
- Estrutura de rollback documentada

---

## 🚀 INSTRUÇÕES DE EXECUÇÃO

### **1. Executar o Script Corrigido:**
```sql
-- No Supabase SQL Editor, executar:
-- database/fix-remove-valores-procedimentos.sql
```

### **2. Verificar Resultados:**
```sql
-- Testar a view
SELECT COUNT(*) FROM odonto.vw_procedimentos_completo;

-- Verificar backup
SELECT COUNT(*) FROM odonto.backup_valores_procedimentos;

-- Confirmar remoção da coluna
\d odonto.procedimentos;
```

### **3. Validar Frontend:**
- Verificar se a API ainda funciona
- Confirmar que não há erros no console
- Testar busca de procedimentos

---

## 📊 IMPACTO DA CORREÇÃO

### **✅ Benefícios:**
1. **Remoção segura** da coluna valor_referencia
2. **Backup completo** dos dados removidos
3. **View funcional** sem valores financeiros
4. **Frontend compatível** com nova estrutura

### **🔍 Verificações Necessárias:**
1. **API funcionando** normalmente
2. **Busca de procedimentos** operacional
3. **Formulário de ortodontia** intacto
4. **Build da aplicação** sem erros

### **📝 Documentação Atualizada:**
- Estrutura do banco documentada
- Processo de remoção registrado
- Instruções de reversão disponíveis
- Log de execução mantido

---

## 🛡️ PREVENÇÃO DE FUTUROS ERROS

### **📋 Checklist para Remoção de Colunas:**
1. ✅ Identificar todas as dependências
2. ✅ Criar backup dos dados
3. ✅ Remover dependências primeiro
4. ✅ Remover constraints relacionadas
5. ✅ Remover a coluna
6. ✅ Recriar objetos necessários
7. ✅ Validar funcionamento

### **🔧 Comandos Úteis para Análise:**
```sql
-- Verificar dependências de uma coluna
SELECT * FROM information_schema.view_column_usage 
WHERE column_name = 'nome_da_coluna';

-- Listar constraints de uma tabela
SELECT constraint_name, constraint_type 
FROM information_schema.table_constraints 
WHERE table_name = 'nome_da_tabela';

-- Verificar views que usam uma coluna específica
SELECT * FROM pg_views 
WHERE definition ILIKE '%nome_da_coluna%';
```

---

## 🔧 CORREÇÃO ADICIONAL: Erro de Sintaxe

### **❌ Segundo Erro Encontrado:**
```
ERROR: 42601: syntax error at or near "RAISE"
LINE 85: DROP VIEW IF EXISTS odonto.vw_procedimentos_completo CASCADE;
```

### **🐛 Causa do Problema:**
- `RAISE NOTICE` não pode ser usado diretamente fora de blocos `DO $$`
- Comandos SQL simples e RAISE NOTICE devem estar separados
- Estrutura mista causou erro de sintaxe

### **✅ Solução Aplicada:**
- **Arquivo Corrigido**: `database/fix-remove-valores-procedimentos-v2.sql`
- Todos os `RAISE NOTICE` movidos para dentro de blocos `DO $$`
- Comandos SQL simples (DROP, CREATE) fora dos blocos
- Estrutura limpa e funcional

### **📋 Estrutura Corrigida:**
```sql
-- Comando SQL simples
DROP VIEW IF EXISTS odonto.vw_procedimentos_completo CASCADE;

-- Log dentro de bloco DO
DO $$
BEGIN
    RAISE NOTICE 'View removida com sucesso';
END $$;
```

### **🎯 Versão Final:**
- **V1**: `fix-remove-valores-procedimentos.sql` (erro de dependência)
- **V2**: `fix-remove-valores-procedimentos-v2.sql` ✅ **CORRIGIDO**

---

*Correção aplicada em: 01/07/2025*  
*Status: ✅ Script V2 corrigido e pronto para execução*  
*Arquivo: `database/fix-remove-valores-procedimentos-v2.sql`*