# 🖥️ CONTEXTO VPS - Portal Prestador Odonto

## 📋 Resumo da Implementação

Este documento registra toda a configuração e migração do **Portal Prestador Odonto** para VPS, incluindo a integração com Traefik e resolução de problemas de paths.

---

## 🎯 Situação Initial

### **Ambiente Anterior:**
- **Local**: Máquina local com `npm run dev`
- **Acesso**: `localhost:3000`
- **Hot Reload**: Automático

### **Ambiente Atual:**
- **VPS**: Servidor 173.212.232.9
- **Produção**: Docker Swarm + Traefik
- **Acesso**: `https://173.212.232.9/portal`

---

## 🔧 Processo de Configuração

### **1. Configuração Inicial do PM2**

**Instalação e Setup:**
```bash
# Instalar PM2 globalmente
npm install -g pm2

# Parar processo Next.js antigo
kill -TERM 4328

# Instalar dependências
npm install

# Build de produção
npm run build
```

**Configuração ecosystem.config.js:**
```javascript
module.exports = {
  apps: [{
    name: 'portal-prestador',
    script: 'npm',
    args: 'start',
    cwd: '/root/claude-projects/portal-prestador',
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'production',
      PORT: 3000,
      HOSTNAME: '0.0.0.0'
    },
    error_file: './logs/pm2-error.log',
    out_file: './logs/pm2-out.log',
    log_file: './logs/pm2-combined.log',
    time: true
  }]
}
```

**Comandos PM2:**
```bash
# Iniciar aplicação
pm2 start ecosystem.config.js

# Configurar auto-start
pm2 startup
pm2 save

# Comandos úteis
pm2 status
pm2 logs portal-prestador
pm2 restart portal-prestador
pm2 stop portal-prestador
```

### **2. Configuração do Traefik**

**Identificação do Ambiente:**
```bash
# Verificar Traefik existente
docker ps | grep traefik
# Output: traefik:v2.11.2 na porta 80/443

# Verificar rede
docker network ls | grep mnhNet
# Output: mnhNet (overlay swarm)
```

**Configuração docker-compose.traefik.yml:**
```yaml
version: '3.8'

services:
  portal-prestador:
    image: node:20-alpine
    working_dir: /app
    command: npm start
    volumes:
      - .:/app
    networks:
      - mnhNet
    deploy:
      labels:
        - "traefik.enable=true"
        - "traefik.http.services.portal-prestador.loadbalancer.server.port=3000"
        - "traefik.http.routers.portal-prestador.rule=PathPrefix(`/portal`)"
        - "traefik.http.routers.portal-prestador.entrypoints=web,websecure"
        - "traefik.http.routers.portal-prestador.tls.certresolver=letsencryptresolver"
        - "traefik.http.middlewares.portal-strip.stripprefix.prefixes=/portal"
        - "traefik.http.routers.portal-prestador.middlewares=portal-strip"
        - "traefik.docker.network=mnhNet"
    environment:
      - NODE_ENV=production
      - PORT=3000
      - HOSTNAME=0.0.0.0

networks:
  mnhNet:
    external: true
```

**Deploy:**
```bash
# Deploy no Docker Swarm
docker stack deploy -c docker-compose.traefik.yml portal

# Verificar status
docker service ls | grep portal
docker service logs portal_portal-prestador
```

### **3. Resolução de Problemas de Paths**

**Problema Identificado:**
- Assets carregando com paths incorretos
- CSS e JavaScript não funcionando
- Imagens quebradas

**Exemplo do Problema:**
```html
<!-- ❌ Problema -->
<link rel="stylesheet" href="/_next/static/css/..."/>
<script src="/_next/static/chunks/..."/>

<!-- ✅ Solução -->
<link rel="stylesheet" href="/portal/_next/static/css/..."/>
<script src="/portal/_next/static/chunks/..."/>
```

**Configuração next.config.js:**
```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  basePath: '/portal',
  assetPrefix: '/portal',
}

module.exports = nextConfig
```

**Rebuild e Deploy:**
```bash
# Rebuild com nova configuração
npm run build

# Atualizar serviço Docker
docker service update --force portal_portal-prestador
```

---

## 🌐 URLs de Acesso

### **Desenvolvimento:**
- **Local**: `http://localhost:3000`
- **Hot Reload**: Automático

### **Produção:**
- **HTTP**: `http://173.212.232.9/portal` (redireciona para HTTPS)
- **HTTPS**: `https://173.212.232.9/portal` ✅
- **SSL**: Certificado automático via Let's Encrypt

---

## 📋 Comandos de Gerenciamento

### **PM2 (Alternativo):**
```bash
# Ver status
pm2 status

# Reiniciar após mudanças
pm2 restart portal-prestador

# Ver logs
pm2 logs portal-prestador

# Parar temporariamente
pm2 stop portal-prestador
```

### **Docker Swarm (Atual):**
```bash
# Ver status dos serviços
docker service ls | grep portal

# Ver logs em tempo real
docker service logs -f portal_portal-prestador

# Reiniciar após mudanças
docker service update --force portal_portal-prestador

# Remover serviço
docker service rm portal_portal-prestador
```

### **Deploy após Mudanças:**
```bash
# 1. Fazer build
npm run build

# 2. Atualizar serviço
docker service update --force portal_portal-prestador

# 3. Verificar logs
docker service logs portal_portal-prestador --tail 50
```

---

## 🔍 Investigação de Assets

### **Estrutura de Assets:**
```
public/
├── images/
│   ├── logo-sulamerica.png
│   ├── container.png
│   └── cross-sell/
│       ├── cross-sell-sula-profissoes.png
│       ├── cross-sell-sula-seguro-vida.png
│       └── cross-sell-sula-dentista.png
└── termo-aceite/
    └── pdf-termo/
        └── contrato_credenciamento.pdf

src/
├── app/
│   ├── globals.css
│   └── layout.tsx
└── components/
    ├── Header.tsx
    ├── Sidebar.tsx
    └── Footer.tsx
```

### **Implementação de Assets:**
```tsx
// Uso correto do Next.js Image
import Image from 'next/image'

<Image
  src="/images/logo-sulamerica.png"
  alt="SulAmérica"
  width={180}
  height={60}
  priority
/>

// Uso correto do Next.js Link
import Link from 'next/link'

<Link href="/dashboard" className="...">
  Dashboard
</Link>
```

---

## 🚀 Configuração de Produção

### **Características Atuais:**
- ✅ **Docker Swarm**: Orquestração de containers
- ✅ **Traefik**: Proxy reverso com SSL automático
- ✅ **SSL/HTTPS**: Certificados Let's Encrypt
- ✅ **Auto-restart**: Reinício automático em falhas
- ✅ **Logs**: Centralizados via Docker
- ✅ **Paths**: Corrigidos para subpasta `/portal`

### **Vantagens da Configuração:**
1. **Profissional**: Configuração enterprise-grade
2. **Seguro**: HTTPS automático
3. **Escalável**: Docker Swarm permite scaling
4. **Monitorável**: Logs centralizados
5. **Resiliente**: Auto-restart e health checks

---

## 🛠️ Troubleshooting

### **Problemas Comuns:**

**1. Aplicação não carrega:**
```bash
# Verificar status
docker service ls | grep portal

# Ver logs
docker service logs portal_portal-prestador --tail 50

# Reiniciar se necessário
docker service update --force portal_portal-prestador
```

**2. CSS/JS não carrega:**
```bash
# Verificar se basePath está configurado
cat next.config.js

# Rebuild se necessário
npm run build
docker service update --force portal_portal-prestador
```

**3. Imagens quebradas:**
```bash
# Verificar se images estão em public/
ls -la public/images/

# Verificar se Next.js Image está sendo usado
grep -r "next/image" src/
```

### **Logs Úteis:**
```bash
# Logs do portal
docker service logs portal_portal-prestador

# Logs do Traefik
docker service logs traefik_traefik

# Status dos serviços
docker service ls
```

---

## 📊 Resumo Final

### **Antes:**
- ❌ Rodando localmente
- ❌ Apenas HTTP
- ❌ Sem SSL
- ❌ Porta 3000 exposta

### **Depois:**
- ✅ Rodando em VPS
- ✅ HTTPS automático
- ✅ SSL Let's Encrypt
- ✅ URL limpa `/portal`
- ✅ Configuração profissional

### **Acesso Final:**
**https://173.212.232.9/portal**

---

## 📝 Notas Importantes

1. **Backup**: Sempre fazer backup antes de mudanças
2. **Teste**: Testar em ambiente de desenvolvimento primeiro
3. **Logs**: Monitorar logs após deploys
4. **SSL**: Certificados são renovados automaticamente
5. **Scaling**: Configuração permite escalar horizontalmente

### **Próximos Passos Recomendados:**
1. Configurar domínio personalizado
2. Implementar monitoramento (Prometheus/Grafana)
3. Configurar backup automático
4. Implementar CI/CD pipeline
5. Configurar ambiente de staging

---

*Documentação criada em: 16/07/2025*
*Última atualização: 16/07/2025*

---

## 🔍 INVESTIGAÇÃO: TELA BRANCA COM CLOUDFLARE (16/07/2025)

### **CONTEXTO DO PROBLEMA**
Após configuração com Cloudflare no domínio `https://odonto.mnd-system.cloud`, o site apresentou múltiplos problemas de cache e roteamento.

### **SINTOMAS IDENTIFICADOS**
1. **Perda total de formatação** - CSS e JS não carregavam
2. **Imagens quebradas** - Erro 404 em todas as imagens
3. **Tela branca após 1 segundo** - Específico na página de login
4. **Erro de chunks JS** - Chunk 999 com erro 500

### **PROCESSO DE INVESTIGAÇÃO EM ETAPAS**

#### **Etapa 1: Análise Inicial**
- Console: Erros 404 em imagens, erro 500 em chunk JS
- Network: Múltiplos recursos falhando
- Descoberta: HTML com buildId antigo sendo servido

#### **Etapa 2: Identificação de Cache**
```bash
# Verificação de buildId
curl -s https://odonto.mnd-system.cloud | grep -o '"buildId":"[^"]*"'
# Resultado: j1XMWWhk69... (antigo)

cat .next/BUILD_ID
# Resultado: N8qf9H3ivhvcqbSIsGobq (novo)
```

#### **Etapa 3: Tentativas de Solução**
1. **Limpar cache Cloudflare** - Problema persistiu
2. **Ativar Development Mode** - HTML ainda cacheado
3. **Identificar Docker Service** - `docker service ls | grep portal`
4. **Force update do container** - Resolveu parcialmente

#### **Etapa 4: Correção de Configuração**
```javascript
// Removido do next.config.js:
basePath: '/portal',
assetPrefix: '/portal',
trailingSlash: true,

// Mantido apenas:
images: { unoptimized: true }
```

#### **Etapa 5: Correção de Caminhos**
```tsx
// Login estava com:
src="/portal/images/logo.png"

// Outras páginas com:
src="/images/logo.png"

// Padronizado para:
src="/images/logo.png"
```

### **SOLUÇÃO COMPLETA**

1. **Remover basePath conflitante** do Next.js
2. **Padronizar caminhos de imagens**
3. **Rebuild completo** (`npm run build`)
4. **Force update do Docker Service**:
   ```bash
   docker service update --force rhgdhasr62uq
   ```
5. **Cloudflare em Development Mode** durante troubleshooting

### **ARQUITETURA IDENTIFICADA**
```
Cliente → Cloudflare → Traefik → Docker Swarm → Next.js
         (CDN/Cache)  (Proxy)   (Orquestrador)  (App)
```

### **COMANDOS ÚTEIS DESCOBERTOS**

```bash
# Verificar qual CSS/JS está sendo servido
curl -s https://dominio.com | grep -o 'static/css/[^"]*\.css'

# Comparar builds
curl -s https://dominio.com | grep -o '"buildId":"[^"]*"'

# Headers do Cloudflare
curl -I https://dominio.com/recurso

# Listar serviços Docker
docker service ls | grep portal

# Forçar atualização
docker service update --force [service-id]

# Verificar se arquivos existem
ls -la .next/static/chunks/ | grep "999-"
```

### **LIÇÕES APRENDIDAS**

1. **Cache em múltiplas camadas** pode causar inconsistências difíceis de debugar
2. **basePath do Next.js** pode conflitar com CDNs e proxies
3. **Development Mode do Cloudflare** é essencial para troubleshooting
4. **Docker Swarm** requer `--force` para garantir novo deploy
5. **Investigação em etapas** é fundamental para isolar problemas

### **RESULTADO FINAL**
✅ Site funcionando corretamente
✅ Todas as imagens carregando
✅ Sem erros de console
✅ Performance restaurada

### **CONFIGURAÇÃO FINAL FUNCIONANDO**
- **Domínio**: https://odonto.mnd-system.cloud
- **Next.js**: Sem basePath, imagens não otimizadas
- **Cloudflare**: Cache normal (Development Mode desativado)
- **Docker**: Service atualizado e estável