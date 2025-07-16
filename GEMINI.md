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