# 🚀 CONTEXTO PARA FASE 3 - PORTAL PRESTADOR ODONTO

## 📋 RESUMO DA SITUAÇÃO ATUAL

### **✅ FASE 2 CONCLUÍDA COM SUCESSO (30/06/2025)**

O Portal Prestador Odonto agora possui **busca dinâmica de procedimentos** totalmente funcional e integrada ao Supabase.

---

## 🏗️ INFRAESTRUTURA ATUAL

### **🗄️ Banco de Dados Supabase**
- **URL**: `https://bbocxptqyhejqzwudevz.supabase.co`
- **Schema**: `odonto` (exposto na API)
- **Status**: ✅ 100% funcional e testado
- **Permissões**: RLS configurado adequadamente

### **📊 Dados Disponíveis:**
- **20 beneficiários** de teste com CPF/Carteirinha válidos
- **12 especialidades** odontológicas (CLÍNICA, ENDODONTIA, ORTODONTIA, etc.)
- **8+ procedimentos** com valores e regras completas
- **4 níveis de complexidade** (Baixa, Média, Alta, Especial)
- **Views otimizadas** para consultas rápidas

### **🧪 Dados de Teste Validados:**
```
✅ CPF: 123.456.789-01 → Maria Silva Santos → Carteirinha: 1234567890 (ELEGÍVEL)
✅ Busca: "PROFILAXIA" → Código TUSS: 81000049 → R$ 80,00
✅ Hook useProcedimentos funcionando perfeitamente
```

---

## 🎯 OBJETIVO DA FASE 3

### **📝 TAREFA PRINCIPAL:**
**Implementar o sistema de pré-aprovação** para procedimentos que requerem análise prévia antes da execução.

### **🔄 FUNCIONALIDADES A IMPLEMENTAR:**

#### **3.1 Detecção Automática**
- ✅ Campo `requer_pre_aprovacao` já disponível na view
- [ ] Interface para exibir alertas visuais
- [ ] Fluxo diferenciado para procedimentos complexos

#### **3.2 Formulários Dinâmicos**
- [ ] **PreAprovacaoForm.tsx** - Formulário baseado em regras
- [ ] **CamposDinamicos.tsx** - Campos condicionais
- [ ] **DocumentosObrigatorios.tsx** - Upload de anexos

#### **3.3 Upload de Documentos**
- [ ] Integração com Supabase Storage
- [ ] Validação de tipos e tamanhos
- [ ] Preview de arquivos
- [ ] Registro em `solicitacao_anexos`

---

## 🔍 ANÁLISE DO ESTADO ATUAL

### **✅ IMPLEMENTADO NA FASE 2:**

#### **Data Layer**
- ✅ `src/hooks/useProcedimentos.ts` - Busca dinâmica funcional
- ✅ Interface `Procedimento` com todos os campos necessários
- ✅ Conexão com `odonto.vw_procedimentos_completo`

#### **UI Components**
- ✅ Busca inteligente com filtros
- ✅ Cards com indicadores visuais de pré-aprovação
- ✅ Campos específicos condicionais (dente, face, região)
- ✅ Estados de loading e erro

#### **Validações**
- ✅ TypeScript com tipos corretos
- ✅ Validação de campos obrigatórios básica
- ✅ Integração completa testada

### **📋 ESTRUTURA ATUAL DO STEP 3:**

```typescript
// src/app/solicitar/page.tsx - Step Procedimentos
- Busca dinâmica de procedimentos ✅
- Exibição de informações completas ✅
- Indicador de pré-aprovação ✅
- Campos condicionais baseados em regras ✅
```

---

## 🛠️ IMPLEMENTAÇÕES NECESSÁRIAS NA FASE 3

### **3.1 Sistema de Pré-Aprovação**
- [ ] `components/pre-aprovacao/PreAprovacaoAlert.tsx`
- [ ] `components/pre-aprovacao/FormularioPreAprovacao.tsx`
- [ ] `components/pre-aprovacao/DocumentosNecessarios.tsx`
- [ ] `hooks/usePreAprovacao.ts`

### **3.2 Upload de Documentos**
- [ ] `components/upload/DocumentUpload.tsx`
- [ ] `components/upload/FilePreview.tsx`
- [ ] `hooks/useDocumentos.ts`
- [ ] Configuração do Supabase Storage

### **3.3 Fluxo de Aprovação**
- [ ] `types/pre-aprovacao.types.ts`
- [ ] `utils/validacaoDocumentos.ts`
- [ ] `utils/gerarProtocolo.ts`

---

## 📊 ESTRUTURA DO BANCO (Relevante para Fase 3)

### **📋 Tabelas para Pré-Aprovação:**
- `procedimentos` - Campo `requer_pre_aprovacao` ✅
- `procedimento_documentos` - Documentos obrigatórios por procedimento
- `formularios_template` - Templates de formulários dinâmicos
- `solicitacoes` - Registro da solicitação principal
- `solicitacao_anexos` - Arquivos enviados

### **👁️ Views Disponíveis:**
- `vw_procedimentos_completo` - Procedimentos com regras ✅
- `vw_documentos_obrigatorios` - Documentos por procedimento
- `vw_formularios_dinamicos` - Campos dinâmicos

---

## 🎯 PLANO DE AÇÃO DETALHADO

### **FASE 3: SISTEMA DE PRÉ-APROVAÇÃO** ⏱️ *3-4 dias*

#### **3.1 Detecção e Alertas (Dia 1)**
- [ ] Expandir interface do step procedimentos
- [ ] Adicionar alertas visuais para pré-aprovação
- [ ] Implementar redirecionamento condicional

#### **3.2 Formulários Dinâmicos (Dia 2)**
- [ ] Criar componente de formulário de pré-aprovação
- [ ] Implementar campos dinâmicos baseados no procedimento
- [ ] Adicionar validações específicas

#### **3.3 Upload de Documentos (Dia 3)**
- [ ] Configurar Supabase Storage
- [ ] Implementar componente de upload
- [ ] Adicionar preview e validação de arquivos

#### **3.4 Integração Completa (Dia 4)**
- [ ] Conectar todos os componentes
- [ ] Implementar persistência na base
- [ ] Testes de integração

---

## 🔧 ARQUIVOS CRIADOS NA FASE 2

### **✅ Implementado:**
```
src/
├── hooks/
│   └── useProcedimentos.ts ✅
└── app/solicitar/
    └── page.tsx (Step 3 refatorado) ✅
```

### **📁 Estrutura para Fase 3:**
```
src/
├── components/
│   ├── pre-aprovacao/
│   │   ├── PreAprovacaoAlert.tsx
│   │   ├── FormularioPreAprovacao.tsx
│   │   └── DocumentosNecessarios.tsx
│   └── upload/
│       ├── DocumentUpload.tsx
│       └── FilePreview.tsx
├── hooks/
│   ├── usePreAprovacao.ts
│   └── useDocumentos.ts
└── types/
    └── pre-aprovacao.types.ts
```

---

## 🚀 RESULTADO ESPERADO DA FASE 3

### **🎯 Funcionalidades Completas:**
- ✅ Detecção automática de procedimentos que requerem pré-aprovação
- ✅ Formulários dinâmicos baseados no tipo de procedimento
- ✅ Upload seguro de documentos no Supabase Storage
- ✅ Validação de arquivos obrigatórios
- ✅ Fluxo diferenciado para aprovação prévia

### **📊 KPIs de Sucesso:**
- [ ] **100%** dos procedimentos com flag de pré-aprovação detectados
- [ ] **Upload funcional** de documentos (PDF, JPEG, PNG)
- [ ] **Formulários dinâmicos** renderizados corretamente
- [ ] **Validações completas** de campos obrigatórios
- [ ] **Persistência** de dados na base

---

## 📝 PROMPT PARA PRÓXIMA CONVERSA

```
Olá! A FASE 2 foi concluída com sucesso - o step "Procedimentos" agora usa busca dinâmica do Supabase e está 100% funcional.

Agora preciso executar a FASE 3: implementar o sistema de pré-aprovação para procedimentos que requerem análise prévia.

Contexto técnico atual:
- Hook useProcedimentos.ts funcionando perfeitamente ✅
- Campo requer_pre_aprovacao disponível nos dados ✅
- Interface visual com indicadores de pré-aprovação ✅
- Campos condicionais já implementados ✅

Objetivo da Fase 3:
- Implementar formulários dinâmicos para pré-aprovação
- Adicionar sistema de upload de documentos
- Criar fluxo diferenciado para procedimentos complexos

Leia o arquivo CONTEXTO-FASE-3.md para detalhes completos.

Vamos começar implementando o componente PreAprovacaoAlert.tsx?
```

---

*Documento atualizado em: 30/06/2025*  
*Fase 2 concluída com sucesso - Busca dinâmica 100% funcional*  
*Pronto para Fase 3 - Sistema de Pré-Aprovação* ✅