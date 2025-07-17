#!/bin/bash

# Script para deploy seguro em produção
# Apenas depois de merge na main

CURRENT_BRANCH=$(git branch --show-current)

if [ "$CURRENT_BRANCH" != "main" ]; then
    echo "❌ Deploy só é permitido na branch main"
    echo "Branch atual: $CURRENT_BRANCH"
    echo "Execute: git checkout main && git pull origin main"
    exit 1
fi

echo "🏗️  Iniciando deploy para produção..."

# Verificar se há mudanças pendentes
if ! git diff-index --quiet HEAD --; then
    echo "❌ Há mudanças não commitadas. Faça commit antes do deploy."
    exit 1
fi

# Build de produção
echo "📦 Fazendo build de produção..."
npm run build

if [ $? -ne 0 ]; then
    echo "❌ Build falhou. Verifique os erros acima."
    exit 1
fi

# Atualizar serviço Docker
echo "🐳 Atualizando serviço Docker..."
docker service update --force rhgdhasr62uq

if [ $? -eq 0 ]; then
    echo "✅ Deploy realizado com sucesso!"
    echo "🌐 Site disponível em: https://odonto.mnd-system.cloud"
else
    echo "❌ Falha no deploy do Docker"
    exit 1
fi