# 🚀 Workflow de Desenvolvimento - Portal Prestador

## 📋 Ambiente Único

### 🔥 Desenvolvimento Local
**Único ambiente disponível - Hot reload ativo**
```bash
./scripts/dev-start.sh
```

**URL:**
- **Local**: http://localhost:3001

**Características:**
- ✅ Hot reload instantâneo
- ✅ Debugging habilitado
- ✅ Desenvolvimento simplificado
- ✅ Sem complexidade de produção

## 🔄 Fluxo de Trabalho Simplificado

### Desenvolvimento Direto
```bash
# Iniciar ambiente
./scripts/dev-start.sh

# Fazer alterações no código...
# Hot reload acontece automaticamente

# Ver logs (opcional)
tail -f dev.log

# Parar quando terminar
./scripts/dev-stop.sh
```

## 📁 Estrutura de Scripts

```
scripts/
├── dev-start.sh      # Inicia desenvolvimento
├── dev-stop.sh       # Para desenvolvimento
└── [outros scripts utilitários]
```

## 🛠️ Comandos Úteis

### Desenvolvimento
```bash
# Status do processo
ps aux | grep "npm run dev"

# Logs em tempo real
tail -f dev.log

# Verificar porta
netstat -tlnp | grep 3001

# Matar processo se necessário
pkill -f "npm run dev"
```

## ⚡ Performance

### Ambiente de Desenvolvimento
- **Inicialização**: ~5-10 segundos
- **Hot Reload**: <1 segundo
- **RAM**: ~300MB

## 🚨 Troubleshooting

### Dev não inicia?
```bash
# Verificar se porta 3001 está livre
lsof -i :3001

# Matar processo antigo
kill -9 $(lsof -t -i:3001)

# Reiniciar
./scripts/dev-start.sh
```

### Hot reload não funciona?
```bash
# Parar e reiniciar
./scripts/dev-stop.sh
./scripts/dev-start.sh

# Verificar se Next.js está rodando
ps aux | grep next
```

## 🔧 Configurações

### Ambiente de Desenvolvimento
- `NODE_ENV=development`
- `PORT=3001`
- `HOSTNAME=0.0.0.0`

### Branch Única
- **main** - Todo desenvolvimento direto

## 📝 Notas Importantes

1. **Sem ambiente de produção**
2. **Sem Docker Swarm**
3. **Desenvolvimento direto na main**
4. **Apenas porta 3001**
5. **Fluxo simplificado**