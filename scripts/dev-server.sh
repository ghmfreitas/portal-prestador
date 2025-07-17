#!/bin/bash

# Script para desenvolvimento colaborativo
# Cada desenvolvedor pode ter sua própria porta

DEVELOPER=$1
# Portas padrão por desenvolvedor
if [ "$DEVELOPER" = "gustavo" ]; then
    PORT=${2:-3005}
elif [ "$DEVELOPER" = "karine" ]; then
    PORT=${2:-3002}
else
    PORT=${2:-3001}
fi

if [ -z "$DEVELOPER" ]; then
    echo "Uso: ./scripts/dev-server.sh [nome-desenvolvedor] [porta-opcional]"
    echo "Exemplo: ./scripts/dev-server.sh gustavo (usa porta 3005)"
    echo "Exemplo: ./scripts/dev-server.sh karine (usa porta 3002)"
    echo "Exemplo: ./scripts/dev-server.sh joao 3001"
    exit 1
fi

echo "🚀 Iniciando servidor de desenvolvimento para $DEVELOPER na porta $PORT"

# Criar branch se não existir
git checkout -b dev-$DEVELOPER 2>/dev/null || git checkout dev-$DEVELOPER

# Iniciar servidor de desenvolvimento
PORT=$PORT npm run dev