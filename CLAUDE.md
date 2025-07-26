# 🏥 PORTAL PRESTADOR ODONTO - Claude Integration

## 📋 PROJECT OVERVIEW

**Portal Prestador** é um sistema de gestão odontológica para prestadores SulAmérica, focado em pré-aprovações e solicitações ortodônticas.

### 🎯 Core Functionality
- **Pré-aprovação Ortodôntica**: Sistema completo de solicitação com formulários estruturados
- **Gestão de Procedimentos**: Catalogação e mapeamento de especialidades odontológicas
- **Sistema de Autenticação**: Login prestador com controle de acesso
- **Dashboard**: Interface de gestão e acompanhamento de solicitações

## 🚀 TECHNICAL STACK

### Frontend
- **Next.js 14** (App Router)
- **TypeScript** 
- **Tailwind CSS**
- **Radix UI** (componentes)
- **React Hook Form** (formulários)

### Backend & Database
- **Supabase** (PostgreSQL + Auth)
- **Docker** (containerização)
- **Traefik** (proxy reverso)

### Infrastructure
- **Development Only**: http://localhost:3001
- **No Production Environment** - Using only development mode

## 📂 PROJECT STRUCTURE

```
src/
├── app/                    # Next.js 14 App Router
│   ├── solicitar/         # Formulário de solicitação ortodôntica
│   ├── dashboard/         # Painel principal
│   ├── autenticacao/      # Sistema de login
│   └── material-apoio/    # Documentação e tabelas
├── components/
│   ├── pre-aprovacao/     # Formulários ortodônticos
│   │   ├── FormularioOrtodontia.tsx      # Formulário principal
│   │   ├── FormularioOrtodontiaV2.tsx    # Nova versão (em desenvolvimento)
│   │   ├── FormularioProrrogacao.tsx     # Formulário de prorrogação
│   │   └── Odontograma.tsx               # Seletor visual de dentes
│   └── ui/                # Componentes Radix UI
├── lib/                   # Utilitários e configurações
└── types/                 # TypeScript definitions
```

## 🧠 ADVANCED REASONING MODE

### 🎯 Para Gustavo - Metodologia de Trabalho

**Ativação Automática:**
- 🔍 Modo investigativo para resolução de problemas
- 📋 Execução em etapas explicativas 
- 🛑 Aguardar feedback antes de implementar
- 💡 Reasoning baseado em evidências

**Processo Sistemático:**
1. **Explicar** problema/objetivo
2. **Coletar** evidências (comandos diagnósticos)
3. **Analisar** resultados detalhadamente
4. **Formar** hipóteses baseadas em dados
5. **Solicitar** confirmação antes de agir
6. **Implementar** em etapas controladas
7. **Documentar** descobertas

## 📋 DEVELOPMENT WORKFLOW

### Environment Commands
```bash
# Development (hot reload) - ÚNICO AMBIENTE
./scripts/dev-start.sh      # → http://localhost:3001
./scripts/dev-stop.sh
```

### Git Branch Strategy
- **main**: Única branch de desenvolvimento
- **Sem branches adicionais** - Todo desenvolvimento direto na main

### Important Rules
- ⚠️ **NEVER auto-commit** - Always wait for explicit user request
- ✅ **Always check current branch** before changes
- 🔍 **Always investigate before implementing**
- 📋 **Document changes and reasoning**

## 🏗️ CURRENT FEATURES

### ✅ Implemented
- **Sistema de Autenticação** (Supabase Auth)
- **Formulário Ortodontia Principal** (trespasse vertical/horizontal, mordida)
- **Odontograma Visual** (seleção de dentes)
- **Sistema de Navegação** (steps sequenciais)
- **Dashboard e Material de Apoio**
- **Ambiente de Desenvolvimento** (porta 3001)

### 🚧 In Development  
- **FormularioOrtodontiaV2.tsx** - Nova versão com melhorias
- **Sistema de Prorrogação** - Renovação de aprovações
- **Integrações** - APIs SulAmérica

## 📚 DOCUMENTATION REFERENCE

### Core Documentation
- **WORKFLOW.md** - Comandos de desenvolvimento
- **.md/MAPEAMENTO-VARIAVEIS-ORTODONTIA-V2.md** - Especificações técnicas
- **.md/DESIGN_SYSTEM_PRE_APROVACAO.md** - Sistema de design
- **.md/contexto-vps.md** - Exemplo de reasoning avançado

### Technical References
- **.md/MAPA_ETAPAS_ORTODONTIA.md** - Fluxo completo ortodontia
- **.md/MEMORIA_PRE_APROVACAO.md** - Histórico de decisões
- **.md/NAVEGACAO_SISTEMA_MASTER.md** - Arquitetura de navegação

## 🔧 COMMON TROUBLESHOOTING

### Development Issues
```bash
# Check dev process
ps aux | grep "npm run dev"
ps aux | grep 3001

# Port conflicts
netstat -tlnp | grep 3001
lsof -i :3001

# Restart development
./scripts/dev-stop.sh
./scripts/dev-start.sh
```

## 🎨 UI/UX PATTERNS

### Design System
- **Layout**: Sidebar navigation + main content
- **Forms**: Multi-step wizard com progress indicator
- **Components**: Radix UI + Tailwind CSS
- **Colors**: SulAmérica branding (azul/cinza)
- **Typography**: Inter font, hierarquia definida

### Form Patterns
- **Steps sequenciais** (1.1, 1.2, 2.1, etc.)
- **Validação em tempo real**
- **Cards uniformes** (2-colunas quando aplicável)
- **Feedback visual** (success/error states)

## 🔍 INVESTIGATION COMMANDS

### Quick Diagnostics
```bash
# Development status
ps aux | grep node | grep 3001

# Recent logs  
tail -f dev.log

# Build verification
cat .next/BUILD_ID

# Local tests
curl -I http://localhost:3001
```

### File System
```bash
# Check project structure
ls -la src/components/pre-aprovacao/

# Search patterns
grep -r "FormularioOrtodontia" src/

# Git status
git status
git branch
```

---

## 📝 NEW CONFIGURATION NOTES

### Single Environment Setup
- **Only Development Mode**: Port 3001
- **No Production Environment**
- **Single Branch**: main
- **No Docker Swarm/Services**

### Simplified Workflow
1. All development in main branch
2. Run locally with `npm run dev`
3. Access at http://localhost:3001

**🎯 Ready for simplified development workflow!**

*Metodologia baseada no reasoning demonstrado em `.md/contexto-vps.md`*