# 🧠 MEMÓRIA PRÉ-APROVAÇÃO - WORKSPACE GUSTAVO
## Índice Rápido para Padrões Formulários

**Data**: 2025-01-22  
**Status**: Memória Ativa e Indexada  
**Objetivo**: Referência instantânea para padronização

---

## 📋 **LINKS RÁPIDOS**

### **📖 Documentação Principal**
- [🎨 DESIGN SYSTEM COMPLETO](./DESIGN_SYSTEM_PRE_APROVACAO.md) - Padrões visuais master
- [🗺️ MAPA DE ETAPAS](./MAPA_ETAPAS_ORTODONTIA.md) - Estrutura de navegação
- [📁 CLAUDE.md](./CLAUDE.md) - Instruções do projeto

### **🎯 Arquivos de Referência**
- [FormularioOrtodontia.tsx](./src/components/pre-aprovacao/FormularioOrtodontia.tsx) - MASTER (2,556 linhas)
- [FormularioProrrogacao.tsx](./src/components/pre-aprovacao/FormularioProrrogacao.tsx) - Padronizado ✅

---

## ⚡ **ACESSO INSTANTÂNEO AOS PADRÕES**

### **🎨 VISUAL (Design System)**
```jsx
// Card Padrão Master
const renderCard = (opcao, valorSelecionado, onSelecionar) => (
  <div className="relative bg-white border-2 rounded-xl px-4 py-4 cursor-pointer 
                  transition-all duration-300 hover:shadow-lg flex items-center justify-center
                  w-[180px] h-[60px]
                  ${valorSelecionado === opcao.id ? 'border-[#F05223] bg-[#F05223]/5' : 'border-[#EAE7EC]'}">
    <h4 className="text-base font-medium text-center">{opcao.titulo}</h4>
  </div>
)

// Notificação Contextual
<div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
  <h4 className="text-sm font-medium text-blue-800 mb-1">Título</h4>
  <p className="text-sm text-blue-700">Descrição</p>
</div>

// Container Principal
<div className="space-y-8">
  <div className="flex items-start justify-between gap-4">...</div>
  <div className="space-y-4">...</div>
</div>
```

### **🏷️ TIPOGRAFIA**
- **Título**: `text-lg font-semibold text-gray-900 mb-2`
- **Descrição**: `text-sm text-gray-600`  
- **Labels**: `text-sm font-medium text-gray-700`
- **Cards**: `text-base font-medium text-center`

### **🎨 CORES**
- **Primária**: `#F05223` (SulAmérica Orange)
- **Secundária**: `#EAE7EC` (Gray Light)
- **Azul**: `bg-blue-50`, `border-blue-200`, `text-blue-800/700`

### **📐 LAYOUTS**
- **Principal**: `flex flex-wrap gap-4 max-w-4xl mt-3`
- **Secundário**: `flex flex-wrap gap-3 max-w-lg mt-3`
- **2-Colunas**: `flex gap-px` → `flex flex-col gap-2 flex-1`

---

## 🗺️ **NAVEGAÇÃO (Mapa Etapas)**

### **Estrutura Hierárquica**
```
1 → 2 → 2.1/2.2 → 3 → 3.1/3.2/3.21 → 4 → 4.1/4.2/4.3 
→ 5 → 5.1/5.2/5.3 → 6 → 6.1 → 7 → 7.X/7.XX → 8 → 8.1 
→ 9 → 9.X/9.XX/9.XXX → 10 → 10.1 → 11
```

### **Etapas Críticas com Notificações**
- **2.1**: "Classe II Selecionada"
- **3.1**: "Linha Média Não Coincidente"
- **3.2**: "Mordida Cruzada Presente"
- **5.1/5.2/5.3**: "Diastemas/Apinhamento/Giroversões Presentes"
- **6.1**: "Dor ou Ruído Articular Presente"
- **8.1**: "Tratamento Complementar Necessário"
- **10.1**: "Aparelho Instalado Previamente"

---

## 🚀 **COMANDOS SUPERCLAUDE**

### **Para Análise**
```bash
# Análise comparativa com padrão master
/analyze @novo-formulario.tsx --focus design-system --reference @FormularioOrtodontia.tsx --seq

# Análise de navegação
/analyze @novo-formulario.tsx --focus navigation-flow --validate-hierarchy --seq
```

### **Para Padronização**
```bash
# Padronização automática
/improve @formulario.tsx --focus ui-consistency --pattern-matching --reference-master --seq

# Implementação de novo formulário
/implement novo-formulario-especialidade --reference @DESIGN_SYSTEM_PRE_APROVACAO.md --pattern-navigation --seq
```

### **Para Implementação**
```bash
# Build com verificação de padrões
/build @src/components/pre-aprovacao/ --focus design-validation --pattern-compliance --seq

# Design novo formulário
/design formulario-especialidade --reference @MAPA_ETAPAS_ORTODONTIA.md --ui-consistency --seq
```

---

## 📊 **CHECKLIST RÁPIDO**

### ✅ **Elementos Visuais Obrigatórios**
- [ ] Container `space-y-8`
- [ ] Cabeçalho flex justify-between
- [ ] Barra progresso `w-32 h-2 bg-gray-200`
- [ ] Cards `w-[180px] h-[60px]`
- [ ] Função `renderCard()` idêntica
- [ ] Cores `#F05223` e `#EAE7EC`
- [ ] Labels `text-sm font-medium text-gray-700`
- [ ] Transições `duration-300`

### ✅ **Estrutura de Navegação**
- [ ] Função `podeContinuar()` por etapa
- [ ] Função `proximaEtapa()` com lógica condicional
- [ ] Validação antes de avançar
- [ ] Progresso dinâmico atualizado
- [ ] Sub-etapas condicionais implementadas

### ✅ **Notificações Contextuais**
- [ ] Template `bg-blue-50 border-blue-200`
- [ ] Posicionamento correto nas sub-etapas
- [ ] Títulos `text-blue-800 mb-1`
- [ ] Descrições `text-blue-700`

---

## 🎯 **CASOS DE USO**

### **1. Novo Formulário de Especialidade**
```bash
# 1. Carregar memória
cat MEMORIA_PRE_APROVACAO.md

# 2. Analisar padrão
/analyze @DESIGN_SYSTEM_PRE_APROVACAO.md --memorize-patterns

# 3. Implementar
/implement novo-formulario-endodontia --reference-master --seq

# 4. Validar
/improve @FormularioEndodontia.tsx --pattern-compliance --validate
```

### **2. Padronizar Formulário Existente**
```bash
# 1. Análise comparativa
/analyze @formulario-existente.tsx --compare @FormularioOrtodontia.tsx --seq

# 2. Aplicar padrões  
/improve @formulario-existente.tsx --apply-master-patterns --seq

# 3. Validar resultado
/build @src/components/pre-aprovacao/ --validate-consistency
```

### **3. Manutenção e Updates**
```bash
# Verificar consistência
/analyze @src/components/pre-aprovacao/ --pattern-consistency --report

# Atualizar padrões globais
/improve @src/components/pre-aprovacao/ --sync-patterns --batch-update --seq
```

---

## 📚 **HISTÓRICO E VERSIONAMENTO**

### **V1.0 (2025-01-22) - Criação Base**
- ✅ FormularioOrtodontia.tsx como MASTER (2,556 linhas)
- ✅ Identificação completa de padrões visuais
- ✅ Mapeamento estrutura de 11 etapas + 38+ sub-etapas
- ✅ Documentação Design System completa

### **V1.1 (2025-01-22) - Primeira Padronização**  
- ✅ FormularioProrrogacao.tsx padronizado
- ✅ Notificações amarelo → azul convertidas
- ✅ Layouts uniformizados para `max-w-4xl`
- ✅ Validação de consistência 100%

### **Próximas Versões**
- [ ] FormularioEndodontia.tsx (planejado)
- [ ] FormularioPeriodontia.tsx (planejado)
- [ ] Componentes reutilizáveis extraídos
- [ ] Testes automatizados de padrões

---

## 🔧 **MANUTENÇÃO DA MEMÓRIA**

### **Atualização Automática**
- Toda vez que FormularioOrtodontia.tsx for modificado
- Quando novos padrões forem identificados
- Em mudanças de Design System

### **Comandos de Manutenção**
```bash
# Sincronizar memória com código atual
/analyze @FormularioOrtodontia.tsx --update-memory --comprehensive

# Validar integridade da memória
/analyze @MEMORIA_PRE_APROVACAO.md --validate-references --seq

# Regenerar documentação
/document @src/components/pre-aprovacao/ --update-design-system --seq
```

---

## 🎪 **TRIGGERS DE MEMÓRIA**

### **Palavras-Chave para Ativação**
- "padrões de pré-aprovação"
- "Design System ortodontia" 
- "FormularioOrtodontia referência"
- "padronizar formulário"
- "estrutura de etapas"
- "renderCard padrão"
- "notificações contextuais"
- "DESIGN_SYSTEM_PRE_APROVACAO.md"

### **Contextos de Ativação**
- Implementação de novos formulários especialidade
- Padronização de formulários existentes
- Troubleshooting de inconsistências visuais
- Refatoração de componentes de pré-aprovação
- Code review de formulários
- Onboarding de desenvolvedores

---

**💾 MEMÓRIA INDEXADA E ATIVA**  
**📅 Última sincronização**: 2025-01-22  
**🎯 Status**: Pronta para uso em formulários futuros