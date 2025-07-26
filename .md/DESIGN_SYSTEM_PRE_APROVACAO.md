# 🎨 DESIGN SYSTEM - PRÉ-APROVAÇÃO ORTODONTIA
## Workspace Gustavo - Padrões Memorização Completa

**Data**: 2025-01-22  
**Fonte**: FormularioOrtodontia.tsx (2,556 linhas)  
**Status**: Padrão de Referência Master

---

## 🏗️ **ESTRUTURA PRINCIPAL**

### **Container Master**
```jsx
<div className="space-y-8">
  {/* Cabeçalho + Barra Progresso */}
  {/* Conteúdo Etapas */}
</div>
```

### **Cabeçalho Layout**
```jsx
<div className="flex items-start justify-between gap-4">
  <div className="flex-1">
    <h3 className="text-lg font-semibold text-gray-900 mb-2">
      Pré-Aprovação de Ortodontia
    </h3>
    <p className="text-sm text-gray-600">
      {/* Descrição dinâmica por etapa */}
    </p>
  </div>
  
  {/* Barra de progresso */}
  <div className="flex flex-col items-end gap-1">
    <div className="text-xs text-gray-500 font-medium">
      {progresso.etapasCompletas}/{progresso.totalEtapas} etapas
    </div>
    <div className="w-32 bg-gray-200 rounded-full h-2">
      <div 
        className="bg-[#F05223] h-2 rounded-full transition-all duration-300 ease-out"
        style={{ width: `${progresso.percentual}%` }}
      />
    </div>
  </div>
</div>
```

---

## 🎯 **COMPONENTE RENDERCARD - PADRÃO PRINCIPAL**

### **Função Master**
```jsx
const renderCard = (opcao: any, valorSelecionado: string, onSelecionar: (valor: string) => void) => (
  <div
    key={opcao.id}
    className={`
      relative bg-white border-2 rounded-xl px-4 py-4 cursor-pointer 
      transition-all duration-300 hover:shadow-lg flex items-center justify-center
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
```

### **Especificações Cards**
- **Dimensões Fixas**: `w-[180px] h-[60px]`
- **Cor Primária**: `#F05223` (SulAmérica Orange)
- **Cor Secundária**: `#EAE7EC` (Gray Light)
- **Border**: `border-2` (2px)
- **Radius**: `rounded-xl` (12px)
- **Padding**: `px-4 py-4` (16px horizontal, 16px vertical)
- **Transição**: `duration-300` (300ms)

### **Estados do Card**
1. **Normal**: `border-[#EAE7EC] bg-white`
2. **Hover**: `hover:border-[#F05223] hover:bg-[#F05223]/5 hover:shadow-lg`
3. **Selecionado**: `border-[#F05223] bg-[#F05223]/5 shadow-md scale-[1.02]`

---

## 🔵 **NOTIFICAÇÕES CONTEXTUAIS**

### **Padrão Azul**
```jsx
<div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
  <h4 className="text-sm font-medium text-blue-800 mb-1">[Título]</h4>
  <p className="text-sm text-blue-700">[Descrição]</p>
</div>
```

### **Ocorrências Mapeadas**
- **Etapa 2.1**: "Classe II Selecionada"
- **Etapa 2.2**: "Classe III Selecionada"  
- **Etapa 3.1**: "Linha Média Não Coincidente"
- **Etapa 3.2**: "Mordida Cruzada Presente"
- **Etapa 3.21**: "Mordida Cruzada Posterior"
- **Etapa 5.1**: "Diastemas Presentes"
- **Etapa 5.2**: "Apinhamento Presente"
- **Etapa 5.3**: "Giroversões Presentes"
- **Etapa 6.1**: "Dor ou Ruído Articular Presente"
- **Etapa 8.1**: "Tratamento Complementar Necessário"
- **Etapa 10.1**: "Aparelho Instalado Previamente"

**Total**: 11 notificações contextuais

---

## 📐 **CONTAINERS E LAYOUTS**

### **Padrões de Container**
```jsx
// Principal - Cards grandes
<div className="flex flex-wrap gap-4 max-w-4xl mt-3">

// Secundário - Cards pequenos/médios  
<div className="flex flex-wrap gap-3 max-w-lg mt-3">

// Expandido - Elementos longos
<div className="flex flex-wrap gap-4 max-w-5xl mt-3">
```

### **Layout 2-Colunas Especializado**
```jsx
<div className="flex gap-px">
  <div className="flex flex-col gap-2 flex-1">
    {/* Coluna Esquerda: Valores Negativos */}
    {medidasTrespasseEsquerda.map(medida => renderCard(...))}
  </div>
  <div className="flex flex-col gap-2 flex-1">
    {/* Coluna Direita: Valores Positivos */}
    {medidasTrespasseDireita.map(medida => renderCard(...))}
  </div>
</div>
```

---

## 🏷️ **LABELS E TIPOGRAFIA**

### **Label Padrão**
```jsx
<Label className="text-sm font-medium text-gray-700">
  {/* Texto do Label */}
</Label>
```

### **Hierarquia Tipográfica**
- **Título Principal**: `text-lg font-semibold text-gray-900 mb-2`
- **Descrição**: `text-sm text-gray-600`
- **Labels**: `text-sm font-medium text-gray-700`
- **Cards**: `text-base font-medium text-center`
- **Notificações Título**: `text-sm font-medium text-blue-800 mb-1`
- **Notificações Texto**: `text-sm text-blue-700`

---

## 🔢 **COMPONENTES NUMÉRICOS**

### **Contador Padrão**
```jsx
<div className="flex items-center gap-4 mt-3">
  <button
    className="w-10 h-10 rounded-lg border-2 border-gray-300 
               flex items-center justify-center 
               hover:border-[#F05223] transition-colors"
  >
    <Minus className="h-4 w-4" />
  </button>
  
  <div className="w-20 text-center">
    <span className="text-2xl font-semibold text-gray-900">
      {valor}
    </span>
    <p className="text-xs text-gray-500">
      {label}
    </p>
  </div>
  
  <button
    className="w-10 h-10 rounded-lg border-2 border-gray-300 
               flex items-center justify-center 
               hover:border-[#F05223] transition-colors"
  >
    <Plus className="h-4 w-4" />
  </button>
</div>
```

---

## 🎨 **PALETA DE CORES OFICIAL**

### **Cores Primárias**
- **SulAmérica Orange**: `#F05223`
- **Orange Hover**: `#D94820`
- **Orange Light**: `#F05223/5` (5% opacity)

### **Cores Neutras**
- **Gray 900**: `text-gray-900` (Títulos principais)
- **Gray 700**: `text-gray-700` (Labels, textos médios)
- **Gray 600**: `text-gray-600` (Descrições)
- **Gray 500**: `text-gray-500` (Textos auxiliares)
- **Gray 300**: `border-gray-300` (Bordas neutras)
- **Gray 200**: `border-gray-200` / `bg-gray-200` (Fundos neutros)

### **Cores Contextuais**
- **Blue 50**: `bg-blue-50` (Fundo notificações)
- **Blue 200**: `border-blue-200` (Borda notificações)  
- **Blue 700**: `text-blue-700` (Texto notificações)
- **Blue 800**: `text-blue-800` (Título notificações)

### **Cores de Estado**
- **White**: `bg-white` (Fundo cards)
- **EAE7EC**: `border-[#EAE7EC]` (Border cards normal)

---

## ⚙️ **ESPAÇAMENTOS PADRONIZADOS**

### **Espaçamentos Verticais**
- **space-y-8**: Container principal (32px)
- **space-y-6**: Seções dentro de etapas (24px)  
- **space-y-4**: Conteúdo geral (16px)
- **mb-6**: Notificações contextuais (24px)
- **mb-2**: Títulos principais (8px)
- **mb-1**: Títulos notificações (4px)
- **mt-3**: Containers de cards (12px)

### **Espaçamentos Horizontais**
- **gap-4**: Cards principais (16px)
- **gap-3**: Cards secundários (12px)
- **gap-px**: Layout 2-colunas (1px)
- **gap-2**: Cards dentro de colunas (8px)
- **px-4**: Padding horizontal cards (16px)
- **py-4**: Padding vertical cards (16px)
- **p-4**: Padding notificações (16px)

---

## 🔄 **TRANSIÇÕES E ANIMAÇÕES**

### **Transições Padrão**
- **Cards**: `transition-all duration-300`
- **Cores**: `transition-colors duration-300`  
- **Barra Progresso**: `transition-all duration-300 ease-out`
- **Hover**: `hover:shadow-lg`
- **Scale Selecionado**: `transform scale-[1.02]`

---

## 📊 **BARRA DE PROGRESSO**

### **Estrutura**
```jsx
<div className="flex flex-col items-end gap-1">
  <div className="text-xs text-gray-500 font-medium">
    {progresso.etapasCompletas}/{progresso.totalEtapas} etapas
  </div>
  <div className="w-32 bg-gray-200 rounded-full h-2">
    <div 
      className="bg-[#F05223] h-2 rounded-full transition-all duration-300 ease-out"
      style={{ width: `${progresso.percentual}%` }}
    />
  </div>
</div>
```

### **Especificações**
- **Largura**: `w-32` (128px)
- **Altura**: `h-2` (8px)
- **Fundo**: `bg-gray-200`
- **Preenchimento**: `bg-[#F05223]`
- **Border Radius**: `rounded-full`
- **Animação**: `transition-all duration-300 ease-out`

---

## 📱 **RESPONSIVIDADE**

### **Breakpoints de Container**
- **max-w-xs**: 320px (Contadores)
- **max-w-lg**: 512px (Cards pequenos/médios)
- **max-w-2xl**: 672px (Layouts especiais)
- **max-w-4xl**: 896px (Layout principal)
- **max-w-5xl**: 1024px (Layout expandido)

### **Layout Flex Responsivo**
- **flex-wrap**: Quebra automática
- **flex-1**: Expansão igual das colunas
- **gap responsivo**: 3px (small) → 4px (medium/large)

---

## 🎯 **SISTEMA DE ETAPAS**

### **Estrutura de Navegação**
- **Etapas Principais**: 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11
- **Sub-etapas**: 2.1, 2.2, 3.1, 3.2, 4.1, 4.2, 4.3, 5.1, 5.2, 5.3, etc.
- **Total**: 11 etapas principais + 38 sub-etapas
- **Máximo profundidade**: 3 níveis (ex: 9.421)

### **Validação de Etapas**
```jsx
const podeContinuar = () => {
  switch(etapaAtual) {
    case 1: return !!dados.faseTratamento
    case 2: return !!dados.classificacaoAngle && !!dados.padraoFacial
    // ... validações específicas por etapa
  }
}
```

---

## 🔧 **COMPONENTES AUXILIARES**

### **Upload de Imagens**
```jsx
<label className="cursor-pointer inline-flex items-center px-6 py-3 
                  bg-[#F05223] text-white rounded-xl 
                  hover:bg-[#D94820] transition-colors">
  Selecionar Imagens
</label>
```

### **Textarea Padrão**
```jsx
<textarea
  className="w-full p-3 border-2 border-gray-200 rounded-xl resize-none 
             focus:border-[#F05223] focus:outline-none transition-colors"
  rows={4}
/>
```

### **Odontograma**
```jsx
<div className="bg-gray-50 rounded-xl p-4">
  <div className="grid grid-cols-8 gap-2 max-w-2xl">
    {/* 32 dentes numerados */}
  </div>
</div>
```

---

## 📋 **CHECKLIST DE IMPLEMENTAÇÃO**

### ✅ **Elementos Obrigatórios**
- [ ] Container `space-y-8`
- [ ] Cabeçalho com barra de progresso  
- [ ] Função `renderCard()` idêntica
- [ ] Labels `text-sm font-medium text-gray-700`
- [ ] Notificações `bg-blue-50 border-blue-200`
- [ ] Containers `flex flex-wrap gap-4 max-w-4xl mt-3`
- [ ] Cores `#F05223` e `#EAE7EC`
- [ ] Transições `duration-300`

### ✅ **Validações**
- [ ] Cards 180x60px obrigatórios
- [ ] Paleta de cores SulAmérica
- [ ] Espaçamentos padronizados
- [ ] Transições suaves
- [ ] Layout responsivo
- [ ] Navegação entre etapas
- [ ] Validação por etapa

---

## 🎯 **USO FUTURO**

Este documento serve como **PADRÃO MASTER** para todos os formulários de pré-aprovação:
- FormularioProrrogacao.tsx ✅ (Já padronizado)
- Futuros formulários de especialidades
- Componentes reutilizáveis
- Manutenção e atualizações

**Comandos para aplicar padrões**:
```bash
# Análise comparativa
/analyze @novo-formulario.tsx --focus design-system --reference @FormularioOrtodontia.tsx

# Padronização automática  
/improve @novo-formulario.tsx --focus ui-consistency --pattern-matching --reference-master
```

---

---

## 🔘 **RADIO BUTTONS**

### **Especificações**
```jsx
<input
  type="radio"
  className="h-8 w-8 text-[#F05223] focus:ring-[#F05223] border-gray-300 accent-[#F05223]"
/>
```

### **Dimensões e Cores**
- **Tamanho**: `h-8 w-8` (32px × 32px)
- **Cor Principal**: `accent-[#F05223]` (SulAmérica Orange)
- **Cor Focus**: `focus:ring-[#F05223]`
- **Borda**: `border-gray-300`

### **Uso com Label**
```jsx
<div className="flex items-center space-x-3">
  <input
    type="radio"
    id="unique-id"
    name="group-name"
    className="h-8 w-8 text-[#F05223] focus:ring-[#F05223] border-gray-300 accent-[#F05223]"
  />
  <label htmlFor="unique-id" className="text-sm font-medium text-gray-700 cursor-pointer">
    Texto da opção
  </label>
</div>
```

---

**💾 MEMÓRIA SALVA NO WORKSPACE GUSTAVO**  
**📅 Última atualização**: 2025-01-25  
**🎯 Status**: Documentação Completa e Ativa