# 📋 INSTRUÇÕES DO PROJETO - PORTAL PRESTADOR ODONTO

## 🎯 REGRAS FUNDAMENTAIS DE ORGANIZAÇÃO

### **📁 Estrutura de Arquivos (OBRIGATÓRIA)**
```
PROJETO_RAIZ/
├── CLAUDE.md                    ✅ Instruções (SEMPRE na raiz)
├── .md/                         📚 Documentação estratégica
│   ├── CONTEXTO-FASE-3.md
│   ├── IMPLEMENTACAO-ORTODONTIA.md
│   ├── PLANO-INTEGRACAO-ATUALIZADO.md
│   └── [outros .md]
├── database/                    🗄️ Scripts SQL
│   ├── odonto-database.sql
│   ├── seed-usuarios.sql
│   └── [outros .sql]
└── src/                         💻 Código fonte
```

### **🎯 INSTRUÇÕES PARA CLAUDE**

#### **ANTES DE QUALQUER AÇÃO:**
1. **📖 LER** documentação em `.md/` para contextualização
2. **🔍 ANALISAR** estrutura existente em `database/`
3. **✅ MANTER** consistência com padrões estabelecidos
4. **📍 COLOCAR** arquivos nas pastas corretas

#### **LOCALIZAÇÃO OBRIGATÓRIA:**
- **SQL**: `database/` (SEMPRE)
- **Documentação**: `.md/` (exceto CLAUDE.md)
- **Instruções**: `CLAUDE.md` (raiz)

---

# 📦 BIBLIOTECAS E DEPENDÊNCIAS

## 🎨 ÍCONES - PHOSPHOR REACT

### **Biblioteca Oficial**
- **Nome**: `phosphor-react`
- **Versão**: ^1.4.1
- **Instalação**: `npm install phosphor-react`

### **⚠️ IMPORTANTE - MIGRAÇÃO CONCLUÍDA**
O projeto migrou completamente do **Lucide React** para **Phosphor React**. 
**NUNCA** use `lucide-react` em novos componentes.

### **📋 Mapeamento de Ícones (Lucide → Phosphor)**
| Lucide | Phosphor | Uso |
|--------|----------|-----|
| `AlertCircle` | `WarningCircle` | Alertas circulares |
| `AlertTriangle` | `Warning` | Avisos/alertas |
| `Archive` | `Archive` | Arquivar |
| `ArchiveRestore` | `ArchiveBox` | Desarquivar |
| `ArrowLeft` | `ArrowLeft` | Voltar |
| `ArrowRight` | `ArrowRight` | Avançar |
| `ArrowUpRight` | `ArrowUpRight` | Link externo |
| `BarChart` | `ChartBar` | Relatórios |
| `Bell` | `Bell` | Notificações |
| `BookOpen` | `BookOpen` | Material de apoio |
| `Check` | `Check` | Confirmação/seleção |
| `CheckCircle` | `CheckCircle` | Sucesso circular |
| `CheckCircle2` | `CheckCircle` | Sucesso alternativo |
| `ChevronDown` | `CaretDown` | Dropdown |
| `ChevronLeft` | `CaretLeft` | Navegação esquerda |
| `ChevronRight` | `CaretRight` | Navegação direita |
| `Circle` | `Circle` | Estado não selecionado |
| `ClipboardCheck` | `ClipboardText` | Resumo/checklist |
| `Clock` | `Clock` | Histórico/tempo |
| `CreditCard` | `CreditCard` | Pagamentos |
| `DollarSign` | `CurrencyDollar` | Financeiro |
| `ExternalLink` | `ArrowSquareOut` | Link externo |
| `Eye` | `Eye` | Visualizar |
| `EyeOff` | `EyeSlash` | Ocultar |
| `FileCheck` | `FileCheck` | Procedimentos |
| `FileText` | `FileText` | Documentos |
| `Filter` | `Funnel` | Filtrar |
| `Home` | `House` | Dashboard |
| `Info` | `Info` | Informação |
| `Loader2` | `CircleNotch` | Carregamento |
| `Lock` | `Lock` | Autenticação |
| `LogOut` | `SignOut` | Sair |
| `MessageSquare` | `ChatCircle` | Comunicados |
| `MoreVertical` | `DotsThreeVertical` | Menu opções |
| `Plus` | `Plus` | Adicionar |
| `Receipt` | `Receipt` | Faturamento |
| `RefreshCw` | `ArrowsClockwise` | Atualizar |
| `Search` | `MagnifyingGlass` | Buscar |
| `Settings` | `Gear` | Configurações |
| `Shield` | `Shield` | Elegibilidade |
| `Trash2` | `Trash` | Excluir |
| `TrendingUp` | `TrendUp` | Crescimento |
| `User` | `User` | Usuário |
| `UserCheck` | `UserCheck` | Verificação usuário |
| `X` | `X` | Fechar |

### **💡 Como Usar**
```tsx
// ✅ CORRETO - Phosphor React
import { House, Check, Warning } from 'phosphor-react'

// ❌ INCORRETO - Não usar mais
import { Home, Check, AlertTriangle } from 'lucide-react'
```

---

# 🎨 DESIGN SYSTEM

## 1️⃣ CORES PRINCIPAIS

### **Paleta de Cores**
```css
/* Primárias */
--primary-orange: #F05223;    /* SulAmérica */
--primary-dark: #111827;      /* Textos principais */

/* Neutras */
--white: #FFFFFF;
--gray-50: #F9FAFB;
--gray-100: #F3F4F6;
--gray-200: #E5E7EB;
--gray-300: #D1D5DB;
--gray-400: #9CA3AF;
--gray-500: #6B7280;
--gray-600: #4B5563;
--gray-700: #374151;
--gray-900: #111827;

/* Bordas e Cards */
--border-color: #EAE7EC;

/* Status */
--success: #04843F;
--info: #145ABF;
--warning: #EF9928;
--error: #C80505;
```

---

## 2️⃣ TIPOGRAFIA

### **Hierarquia de Títulos**
```css
/* H1 - Título Principal */
.h1 {
  font-size: 30px;          /* text-3xl */
  font-weight: 700;         /* font-bold */
  color: #111827;           /* text-gray-900 */
}

/* H2 - Seções Principais */
.h2 {
  font-size: 20px;          /* text-xl */
  font-weight: 600;         /* font-semibold */
  color: #111827;           /* text-gray-900 */
}

/* H3 - Subtítulos/Cards */
.h3 {
  font-size: 18px;          /* text-lg */
  font-weight: 600;         /* font-semibold */
  color: #111827;           /* text-gray-900 */
}

/* H4 - Breadcrumbs */
.h4 {
  font-size: 18px;          /* text-lg */
  font-weight: 500;         /* font-medium */
  color: #F05223;           /* text-[#F05223] */
}
```

### **Textos de Conteúdo**
```css
/* Corpo Principal */
.body-primary {
  font-size: 16px;          /* text-base */
  font-weight: 400;         /* font-normal */
  color: #374151;           /* text-gray-700 */
}

/* Corpo Secundário */
.body-secondary {
  font-size: 14px;          /* text-sm */
  font-weight: 400;         /* font-normal */
  color: #4B5563;           /* text-gray-600 */
}

/* Metadados/Timestamps */
.metadata {
  font-size: 12px;          /* text-xs */
  font-weight: 400;         /* font-normal */
  color: #6B7280;           /* text-gray-500 */
}

/* Labels de Formulário */
.form-label {
  font-size: 14px;          /* text-sm */
  font-weight: 500;         /* font-medium */
  color: #374151;           /* text-gray-700 */
}
```

---

## 3️⃣ COMPONENTES

### **📄 Padrão de Página**
```tsx
<main className="p-4 lg:p-8 overflow-auto lg:col-start-2">
  <div className="max-w-7xl mx-auto">
    {/* Cabeçalho */}
    <div className="mb-8">
      <h4 className="text-lg font-medium text-[#F05223] mb-1">
        {breadcrumb}
      </h4>
      <h1 className="text-3xl font-bold text-gray-900">
        {pageTitle}
      </h1>
    </div>
    
    {/* Conteúdo */}
    <div className="mb-20">
      {/* Todo o conteúdo aqui */}
    </div>
  </div>
</main>
```

### **🏷️ Tags de Status**

#### **Base (Todas as Tags)**
```css
.status-tag {
  background-color: #FFFFFF;
  border: 1px solid #EAE7EC;
  border-radius: 300px;
  font-size: 14px;
  font-weight: 700;
  color: #323232;
  padding: 8px 16px;
  display: inline-flex;
  align-items: center;
  white-space: nowrap;
}
```

#### **Ícones por Categoria**
```css
.status-icon {
  width: 22px;
  height: 22px;
  border-radius: 50%;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin-right: 8px;
}

/* Sucesso (Verde) */
.status-icon-success { background-color: #04843F; }

/* Informativo (Azul) */
.status-icon-info { background-color: #145ABF; }

/* Alerta (Amarelo) */
.status-icon-alert { background-color: #EF9928; }

/* Erro (Vermelho) */
.status-icon-error { background-color: #C80505; }
```

#### **Status Disponíveis**
| Status | Categoria | Ícone | Cor de Fundo |
|--------|-----------|-------|--------------|
| Emitida | Sucesso | Check | #04843F |
| Aprovada | Sucesso | Check | #04843F |
| Pagamento liberado | Sucesso | Check | #04843F |
| Aguardando análise | Info | Info | #145ABF |
| Aguardando SIC | Info | Info | #145ABF |
| Resposta SIC | Info | Info | #145ABF |
| Em análise | Info | Info | #145ABF |
| Recursado | Info | Info | #145ABF |
| Análise pagamento | Info | Info | #145ABF |
| Glosada | Alerta | AlertCircle | #EF9928 |
| Pagamento parc. liberado | Alerta | AlertCircle | #EF9928 |
| Cancelado | Erro | AlertCircle | #C80505 |

### **💳 Cards Padrão**
```tsx
<div className="bg-white border border-[#EAE7EC] rounded-xl p-6">
  {/* Conteúdo do card */}
</div>
```

### **📋 Cards com Radio Button (Elegibilidade/Ortodontia)**
```tsx
<div className={`
  relative bg-white border-2 rounded-xl p-6 cursor-pointer 
  transition-all duration-300 hover:shadow-lg
  ${selecionado 
    ? 'border-[#F05223] bg-[#F05223]/5 shadow-md transform scale-[1.02]' 
    : 'border-[#EAE7EC] hover:border-[#F05223] hover:bg-[#F05223]/5'
  }
`}>
  {/* Indicador de seleção */}
  {selecionado && (
    <div className="absolute top-4 right-4 w-6 h-6 bg-[#F05223] rounded-full flex items-center justify-center">
      <Check className="w-4 h-4 text-white" />
    </div>
  )}
  
  <div className="flex items-center space-x-4">
    {/* Radio visual */}
    <div className={`
      w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-300
      ${selecionado ? 'border-[#F05223] bg-[#F05223]' : 'border-[#EAE7EC]'}
    `}>
      {selecionado && <div className="w-3 h-3 bg-white rounded-full"></div>}
    </div>
    
    {/* Conteúdo */}
    <div className="flex-1">
      <h4 className={`text-lg font-semibold transition-colors duration-300 ${
        selecionado ? 'text-[#F05223]' : 'text-gray-900'
      }`}>
        {titulo}
      </h4>
      <p className="text-sm text-gray-600 mt-1">{descricao}</p>
    </div>
  </div>
</div>
```

### **🔘 Botões - Padrão de Altura**

#### **Altura Padrão**
Todos os botões do sistema devem ter **44px de altura fixa**.

#### **Implementação Obrigatória**
```tsx
// ✅ CORRETO - Altura fixa 44px + rounded-full
<button className="h-[44px] px-4 bg-[#F05223] text-white rounded-full">
  Texto do botão
</button>

// ❌ INCORRETO - Padding vertical ou bordas não arredondadas
<button className="py-2 px-4 bg-[#F05223] text-white rounded-lg">
  Texto do botão
</button>
```

#### **Regras Obrigatórias**
- **Altura**: Sempre `h-[44px]` (nunca usar `py-`)
- **Bordas**: Sempre `rounded-full` (nunca `rounded-lg`)
- **Consistência**: Aplicar em TODOS os botões do sistema

#### **Tipos de Botões**

**1. Botão Primário (Preenchido)**
```tsx
className="h-[44px] px-6 bg-[#F05223] text-white rounded-full hover:bg-[#D94820] transition-colors font-semibold"
```

**2. Botão Secundário (Com Borda)**
```tsx
className="h-[44px] px-6 bg-white border border-[#F05223] text-[#F05223] rounded-full hover:bg-[#F05223] hover:text-white transition-colors font-semibold"
```

**3. Botão Terciário (Outline)**
```tsx
className="h-[44px] px-6 border border-gray-300 text-gray-700 rounded-full hover:bg-gray-50 hover:text-gray-900 transition-colors"
```

#### **Notas Importantes**
- Para botões com ícones, usar `flex items-center justify-center`
- Para Links que parecem botões, adicionar `flex items-center justify-center` junto com `h-[44px]`
- Manter consistência em todos os botões do sistema

---

## 4️⃣ REGRAS DE IMPLEMENTAÇÃO

### **✅ Obrigatórias**
1. **Fundo branco** em todas as páginas e cards
2. **Consistência visual** entre componentes similares
3. **Responsividade** em todos os breakpoints
4. **Estados de hover/foco** em elementos interativos
5. **Padding de respiro**: `mb-20` no final das páginas

### **🚫 Proibidas**
1. Criar novos padrões visuais sem documentar
2. Usar cores fora da paleta estabelecida
3. Quebrar hierarquia tipográfica
4. Ignorar estados de loading/erro
5. Criar arquivos fora da estrutura estabelecida

### **📝 Documentação**
- Sempre documentar novos componentes
- Manter exemplos de código atualizados
- Registrar decisões de design
- Atualizar este arquivo quando necessário

---

# 🎯 MEMORIZAÇÃO OBRIGATÓRIA

**CLAUDE DEVE SEMPRE:**
1. **📖 Ler** `.md/` antes de qualquer implementação
2. **📍 Colocar** SQL em `database/`, docs em `.md/`
3. **🎨 Seguir** design system rigorosamente
4. **📋 Manter** estrutura organizada
5. **✅ Documentar** mudanças importantes