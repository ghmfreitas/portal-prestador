# 📋 INSTRUÇÕES DO PROJETO - PORTAL PRESTADOR ODONTO

[... previous content remains unchanged ...]

# 🧠 PERFIL DE REASONING AVANÇADO

## **ATIVAÇÃO AUTOMÁTICA APÓS CARREGAMENTO DE PERFIL**
Quando executar comandos de perfil para **Gustavo** ou **Karine**, ativar automaticamente:
- 🔍 **Modo investigativo** para resolução de problemas
- 📋 **Execução em etapas explicativas** com paradas estratégicas
- 🛑 **Aguardar feedback** antes de prosseguir com soluções
- 💡 **Reasoning avançado** baseado no caso `.md/contexto-vps`

## **🧠 METODOLOGIA DE REASONING E EXECUÇÃO**

### **🛑 Quando Parar e Solicitar Informações**
- Se não souber exatamente qual comando executar próximo
- Antes de modificar configurações críticas de produção
- Quando detectar inconsistências ou problemas complexos
- Se precisar de confirmação sobre estratégia a seguir
- Ao encontrar múltiplas possibilidades de solução

### **🔍 Processo de Investigação Sistemática**
1. **Explicar o problema** - O que será investigado e por quê
2. **Coletar evidências** - Executar comandos diagnósticos primeiro
3. **Analisar resultados** - Interpretar saídas em detalhes
4. **Formar hipóteses** - Baseadas nas evidências coletadas
5. **Solicitar confirmação** - Antes de implementar soluções
6. **Implementar em etapas** - Uma ação por vez
7. **Documentar descobertas** - Para referência futura

### **💡 Inspiração do Caso contexto-vps.md**
Seguir metodologia demonstrada na investigação da "Tela Branca com Cloudflare":

**Exemplo de Reasoning Adequado:**
```
🔍 **Investigando problema X**

📋 **Etapa 1: Diagnóstico inicial**
- Vou verificar Y para entender Z
- Comando: [comando específico]
- Objetivo: Identificar se o problema é A ou B

[Executa comando e analisa resultado]

📊 **Resultado encontrado:** [explicação detalhada]

📋 **Etapa 2: Hipóteses formadas**
- Se for A, farei estratégia 1
- Se for B, farei estratégia 2
- Com base no resultado, acredito que seja A

🤔 **Você concorda com esta análise? Posso prosseguir com a estratégia 1?**
```

### **📋 Comandos de Investigação Comuns**
```bash
# Status de serviços
docker service ls | grep [nome]
docker service logs [service] --tail 50

# Verificar builds
cat .next/BUILD_ID
curl -s https://dominio.com | grep -o '"buildId":"[^"]*"'

# Headers e cache
curl -I https://dominio.com/recurso

# Logs em tempo real
docker service logs -f [service]

# Verificar arquivos
ls -la [caminho]
grep -r [pattern] [path]
```

### **🚫 O que NÃO fazer**
- Executar múltiplas soluções simultaneamente
- Assumir que entendeu o problema sem investigar
- Prosseguir sem confirmar com o usuário
- Modificar produção sem backup/rollback plan
- Implementar soluções complexas sem etapas

### **👥 Aplicável para Gustavo e Karine**
- **Perfil consistente** para ambos os designers
- **Adaptável** às necessidades específicas de cada projeto
- **Comunicação clara** sobre cada etapa
- **Foco em colaboração** e aprendizado compartilhado

---

[... rest of the previous content remains unchanged ...]