# 🤝 WORKFLOW COLABORATIVO - PORTAL PRESTADOR

## 🎯 **OBJETIVO**
Permitir que dois desenvolvedores trabalhem simultaneamente no projeto sem conflitos, usando a VPS como ambiente comum.

---

## 🏗️ **ARQUITETURA DO WORKFLOW**

```
┌─────────────────┬─────────────────┐
│   Desenvolvedor 1   │   Desenvolvedor 2   │
│   (Branch: dev-1)   │   (Branch: dev-2)   │
│   Porta: 3001       │   Porta: 3002       │
└─────────────────┴─────────────────┘
           │                 │
           └─────────┬───────────┘
                     │
            ┌─────────▼─────────┐
            │    BRANCH MAIN    │
            │   (Produção)      │
            │   Porta: 3000     │
            └─────────┬─────────┘
                     │
            ┌─────────▼─────────┐
            │   DOCKER SWARM    │
            │ https://odonto... │
            └───────────────────┘
```

---

## 🔄 **PROCESSO DE TRABALHO**

### **1. CONFIGURAÇÃO INICIAL**

#### **Para o Desenvolvedor 1:**
```bash
# Criar e ir para sua branch
git checkout -b dev-desenvolvedor1

# Iniciar servidor de desenvolvimento
./scripts/dev-server.sh desenvolvedor1 3001
```

#### **Para o Desenvolvedor 2:**
```bash
# Criar e ir para sua branch  
git checkout -b dev-desenvolvedor2

# Iniciar servidor de desenvolvimento
./scripts/dev-server.sh desenvolvedor2 3002
```

### **2. DESENVOLVIMENTO DIÁRIO**

#### **Início do Dia:**
```bash
# 1. Ir para sua branch
git checkout dev-seu-nome

# 2. Puxar atualizações da main
git fetch origin
git merge origin/main

# 3. Iniciar desenvolvimento
./scripts/dev-server.sh seu-nome [porta]
```

#### **Durante o Desenvolvimento:**
```bash
# Commit frequente (várias vezes por dia)
git add .
git commit -m "feat: adiciona nova funcionalidade X"

# Push para sua branch
git push origin dev-seu-nome
```

#### **Final do Dia:**
```bash
# Commit final do dia
git add .
git commit -m "wip: progresso do dia - feature X 80% completa"
git push origin dev-seu-nome
```

### **3. INTEGRAÇÃO E DEPLOY**

#### **Quando Feature Estiver Pronta:**
```bash
# 1. Garantir que está atualizado
git checkout dev-seu-nome
git fetch origin
git merge origin/main

# 2. Testar se tudo funciona
npm run build
npm run start

# 3. Fazer merge request (ou direto se combinado)
git checkout main
git merge dev-seu-nome
git push origin main

# 4. Deploy para produção
./scripts/deploy-to-production.sh
```

---

## 🚨 **REGRAS IMPORTANTES**

### **✅ PODE FAZER:**
1. Trabalhar em sua branch `dev-[nome]` livremente
2. Usar portas 3001, 3002, 3003... para desenvolvimento
3. Fazer commits frequentes em sua branch
4. Testar mudanças em modo desenvolvimento

### **❌ NÃO PODE FAZER:**
1. **NUNCA** fazer push direto para `main` sem coordenação
2. **NUNCA** fazer deploy para produção sem testar
3. **NUNCA** usar a porta 3000 (reservada para produção)
4. **NUNCA** trabalhar na mesma branch simultaneamente

### **⚡ REGRA OURO:**
**Main branch = Produção**. Só entre código testado e funcional.

---

## 🛠️ **COMANDOS ÚTEIS**

### **Status do Projeto:**
```bash
# Ver todas as branches
git branch -a

# Ver quem está trabalhando no quê
git log --oneline --graph --all

# Ver serviços rodando
pm2 list
docker service ls | grep portal
```

### **Desenvolvimento:**
```bash
# Iniciar desenvolvimento
./scripts/dev-server.sh [nome] [porta]

# Ver seu ambiente local
curl localhost:[sua-porta]

# Build e teste local
npm run build
npm run start
```

### **Deploy:**
```bash
# Deploy para produção (só na main)
./scripts/deploy-to-production.sh

# Verificar produção
curl https://odonto.mnd-system.cloud
```

---

## 🔍 **RESOLUÇÃO DE CONFLITOS**

### **Se Houver Conflito no Merge:**
```bash
# 1. Parar desenvolvimento
# 2. Ir para sua branch
git checkout dev-seu-nome

# 3. Puxar main atualizada
git fetch origin
git merge origin/main

# 4. Resolver conflitos nos arquivos
# 5. Commit da resolução
git add .
git commit -m "resolve: conflitos com main"

# 6. Tentar merge novamente
git checkout main
git merge dev-seu-nome
```

### **Se Build Quebrar:**
```bash
# 1. Voltar para commit anterior funcionando
git checkout main
git reset --hard [commit-anterior-funcionando]

# 2. Corrigir na branch de desenvolvimento
git checkout dev-seu-nome
# ... fazer correções ...

# 3. Testar antes de mergear
npm run build && npm run start
```

---

## 📊 **AMBIENTES DE TRABALHO**

| Ambiente | URL | Porta | Uso |
|----------|-----|-------|-----|
| **Produção** | https://odonto.mnd-system.cloud | 3000 | Usuários finais |
| **Dev 1** | http://IP-VPS:3001 | 3001 | Desenvolvedor 1 |
| **Dev 2** | http://IP-VPS:3002 | 3002 | Desenvolvedor 2 |
| **Testing** | http://IP-VPS:3003 | 3003 | Testes/QA |

---

## 🚀 **PERFORMANCE E RECURSOS**

### **Sobre Sobrecarga da VPS:**
- ✅ **Desenvolvimento**: Usa `npm run dev` (modo watch, sem build)
- ✅ **Produção**: Usa build otimizado + Docker
- ✅ **Recursos**: VPS moderna aguenta 2-3 ambientes dev simultaneamente
- ✅ **Build**: Só acontece quando necessário (não automático)

### **Otimizações:**
- Cada ambiente dev só carrega quando usado
- Build de produção só acontece no deploy
- Cache do Next.js é isolado por ambiente
- Docker Swarm gerencia recursos automaticamente

---

## 🎯 **VANTAGENS DESTE WORKFLOW**

1. **Trabalho Simultâneo**: Dois devs podem trabalhar sem conflitos
2. **Ambiente Unificado**: Todos usam a mesma VPS e configurações
3. **Deploy Seguro**: Processo automatizado e validado
4. **Rollback Fácil**: Git permite voltar rapidamente
5. **Produção Estável**: Main branch sempre funcional
6. **Desenvolvimento Ágil**: Hot reload em ambiente dev

---

## 📋 **CHECKLIST DIÁRIO**

### **Início do Desenvolvimento:**
- [ ] `git checkout dev-meu-nome`
- [ ] `git fetch origin && git merge origin/main`
- [ ] `./scripts/dev-server.sh meu-nome [porta]`
- [ ] Verificar se ambiente carregou: `curl localhost:[porta]`

### **Durante o Desenvolvimento:**
- [ ] Commits frequentes com mensagens descritivas
- [ ] Testar funcionalidades antes de commit
- [ ] Push regular para sua branch

### **Final do Desenvolvimento:**
- [ ] Commit final com status atual
- [ ] `npm run build` para verificar se não há erros
- [ ] Push para sua branch
- [ ] Se feature completa: coordenar merge com colega

### **Deploy (quando acordado):**
- [ ] `git checkout main`
- [ ] `git merge dev-meu-nome`
- [ ] `./scripts/deploy-to-production.sh`
- [ ] Verificar se site está funcionando
- [ ] Comunicar que deploy foi feito

---

*Este workflow garante produtividade máxima sem conflitos!* 🚀