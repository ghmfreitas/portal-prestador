#!/bin/bash

# Script para desenvolvimento colaborativo
# Cada desenvolvedor pode ter sua própria porta

DEVELOPER=$1
PORT=${2:-3001}

if [ -z "$DEVELOPER" ]; then
    echo "Uso: ./scripts/dev-server.sh [nome-desenvolvedor] [porta-opcional]"
    echo "Exemplo: ./scripts/dev-server.sh joao 3001"
    exit 1
fi

echo "🚀 Iniciando servidor de desenvolvimento para $DEVELOPER na porta $PORT"

# Criar branch se não existir
git checkout -b dev-$DEVELOPER 2>/dev/null || git checkout dev-$DEVELOPER

# Iniciar servidor de desenvolvimento
PORT=$PORT npm run dev