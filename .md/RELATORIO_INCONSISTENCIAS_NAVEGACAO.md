# 🚨 RELATÓRIO DE INCONSISTÊNCIAS - NAVEGAÇÃO FormularioProrrogacao

## 📋 **ANÁLISE COMPARATIVA vs MASTER (FormularioOrtodontia)**

---

## 🔴 **PROBLEMAS CRÍTICOS IDENTIFICADOS**

### **1. FUNÇÃO `proximaEtapa()` - LÓGICA SIMPLIFICADA DEMAIS**

**❌ PROBLEMA**: FormularioProrrogacao usa lógica linear simples, perdendo a sofisticação do MASTER

**MASTER (FormularioOrtodontia)**:
```typescript
const proximaEtapa = () => {
  // PATTERN: Validação + Navegação condicional
  if (etapaAtual === 3.2 && !!dados.cruzadaAnterior && !!dados.cruzadaPosterior) {
    if (dados.cruzadaPosterior === 'sim' && !dados.tipoMordidaCruzada) {
      setEtapaAtual(3.21) // Vai para sub-etapa apenas se necessário
    } else {
      setEtapaAtual(4) // Pula sub-etapa se não aplicável
    }
  }
}
```

**❌ PROBLEMÁTICO (FormularioProrrogacao)**:
```typescript
const proximaEtapa = () => {
  if (etapaAtual === 3) {
    // PROBLEMA: Não valida se dados estão preenchidos antes de navegar
    if (dados.faltasConsultas === 'sim') {
      setEtapaAtual(3.1) // ❌ Vai mesmo sem validar dados básicos da etapa 3
    }
  }
}
```

### **2. FUNÇÃO `podeContinuar()` - VALIDAÇÕES INCONSISTENTES**

**❌ PROBLEMA**: Validações muito simples comparado ao MASTER

**MASTER (Validações robustas)**:
```typescript
case 3.2:
  return !!dados.cruzadaAnterior && !!dados.cruzadaPosterior &&
         (dados.cruzadaPosterior === 'nao' || !!dados.tipoMordidaCruzada)
```

**❌ PROBLEMÁTICO (FormularioProrrogacao)**:
```typescript
case 3: 
  return Boolean(
    dados.colaboracaoPaciente && 
    dados.faltasConsultas && 
    dados.usoElastico && 
    dados.tracionamentoDentes && 
    dados.alteracaoPlanejamento
  )
// ❌ PROBLEMA: Não considera sub-validações condicionais
```

### **3. FUNÇÃO `etapaAnterior()` - LÓGICA REVERSA INADEQUADA**

**❌ PROBLEMA**: Navegação reversa não reconstroi corretamente o caminho

**MASTER (Navegação reversa inteligente)**:
```typescript
const etapaAnterior = () => {
  if (etapaAtual === 4) {
    // Reconstroi caminho baseado nos dados atuais
    if (dados.mordidaCruzada === 'sim' && dados.cruzadaPosterior === 'sim' && dados.tipoMordidaCruzada) {
      setEtapaAtual(3.21)
    } else if (dados.mordidaCruzada === 'sim' && dados.cruzadaAnterior && dados.cruzadaPosterior) {
      setEtapaAtual(3.2)
    } else {
      setEtapaAtual(3)
    }
  }
}
```

**❌ PROBLEMÁTICO (FormularioProrrogacao)**:
```typescript
} else if (etapaAtual === 6) {
  if (dados.trespasseVertical === 'mordida_aberta' || dados.trespasseVertical === 'sobremordida') {
    setEtapaAtual(5.21) // ❌ PROBLEMA: Sempre vai para 5.21, ignora 5.22
  } else if (dados.trespasseHorizontal === 'inadequado') {
    setEtapaAtual(5.1)
  } else {
    setEtapaAtual(5)
  }
}
```

### **4. HOOK `useImperativeHandle` - IMPLEMENTADO CORRETAMENTE** ✅

**✅ CORRETO**: Ambos componentes expõem corretamente os métodos
```typescript
useImperativeHandle(ref, () => ({
  proximaEtapa,
  podeContinuar
}))
```

### **5. NOTIFICAÇÃO PARA PAI - IMPLEMENTAÇÃO INCONSISTENTE**

**❌ PROBLEMA**: FormularioProrrogacao não tem o useEffect de notificação automática

**MASTER (Notificação automática)**:
```typescript
useEffect(() => {
  if (onStatusChange && !isProrrogacao) {
    onStatusChange(podeContinuar(), etapaAtual)
  }
}, [dados, etapaAtual, onStatusChange, isProrrogacao])
```

**❌ FALTANDO no FormularioProrrogacao**: Não tem useEffect de notificação automática

---

## 🔧 **PADRÕES ESPECÍFICOS INCONSISTENTES**

### **Sub-etapas Decimais**
- **MASTER**: Usa 2.1, 2.2, 3.21, 4.1, 4.2, 4.3, etc.
- **Prorrogação**: Usa 3.1, 3.2, 3.3, 5.1, 5.21, 5.22 ✅ (consistente)

### **Validação de Arrays**
- **MASTER**: `dados.array && dados.array.length > 0`
- **Prorrogação**: `dados.array.length > 0` ⚠️ (pode dar erro se array for null)

### **Fluxo de Sub-etapas**
- **MASTER**: Valida dados antes de determinar se vai para sub-etapa
- **Prorrogação**: ❌ Vai direto baseado em resposta, sem validar dados da etapa atual

---

## 📝 **PADRONIZAÇÃO NECESSÁRIA**

### **1. Função `proximaEtapa()` - UPGRADE NECESSÁRIO**
```typescript
// ❌ ATUAL (problemático)
if (etapaAtual === 3) {
  if (dados.faltasConsultas === 'sim') {
    setEtapaAtual(3.1)
  }
}

// ✅ PADRONIZAR PARA (seguir MASTER)
if (etapaAtual === 3 && !!dados.colaboracaoPaciente && !!dados.faltasConsultas && 
    !!dados.usoElastico && !!dados.tracionamentoDentes && !!dados.alteracaoPlanejamento) {
  if (dados.faltasConsultas === 'sim' && !dados.quantidadeFaltas) {
    setEtapaAtual(3.1)
  } else if (dados.tracionamentoDentes === 'sim' && dados.dentesTracionamento.length === 0) {
    setEtapaAtual(3.2)
  } else if (dados.alteracaoPlanejamento === 'sim' && !dados.justificativaAlteracao) {
    setEtapaAtual(3.3)
  } else {
    setEtapaAtual(4)
  }
}
```

### **2. Função `etapaAnterior()` - CORREÇÕES NECESSÁRIAS**
```typescript
// ❌ ATUAL (problemático)
} else if (etapaAtual === 6) {
  if (dados.trespasseVertical === 'mordida_aberta' || dados.trespasseVertical === 'sobremordida') {
    setEtapaAtual(5.21) // ❌ Sempre 5.21, ignora 5.22
  }
}

// ✅ PADRONIZAR PARA (seguir MASTER)
} else if (etapaAtual === 6) {
  if (dados.trespasseVertical === 'sobremordida' && dados.medidaTrespasseVertical) {
    setEtapaAtual(5.22)
  } else if (dados.trespasseVertical === 'mordida_aberta' && dados.medidaTrespasseVertical) {
    setEtapaAtual(5.21)
  } else if (dados.trespasseHorizontal === 'inadequado' && dados.medidaTrespasseHorizontal) {
    setEtapaAtual(5.1)
  } else {
    setEtapaAtual(5)
  }
}
```

### **3. useEffect de Notificação - ADICIONAR**
```typescript
// ✅ ADICIONAR (seguir MASTER)
useEffect(() => {
  if (onStatusChange) {
    onStatusChange(podeContinuar(), etapaAtual)
  }
}, [dados, etapaAtual, onStatusChange])
```

### **4. Validações Arrays - TORNAR SEGURO**
```typescript
// ❌ ATUAL (pode dar erro)
case 3.2: return dados.dentesTracionamento.length > 0

// ✅ PADRONIZAR PARA (seguir MASTER)
case 3.2: return dados.dentesTracionamento && dados.dentesTracionamento.length > 0
```

---

## 🎯 **PRÓXIMOS PASSOS DE PADRONIZAÇÃO**

1. **Reescrever `proximaEtapa()`** com validações robustas
2. **Corrigir `etapaAnterior()`** para navegação reversa inteligente
3. **Adicionar useEffect** de notificação automática
4. **Tornar validações de arrays** null-safe
5. **Aplicar padrões MASTER** em toda lógica condicional

---

**🔴 CRITICIDADE**: ALTA - Sistema de navegação inconsistente pode quebrar fluxo do usuário