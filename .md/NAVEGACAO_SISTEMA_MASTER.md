# 🧭 SISTEMA DE NAVEGAÇÃO MASTER - ORTODONTIA

## 📋 **MEMORIZAÇÃO PARA PADRONIZAÇÃO AUTOMÁTICA**
**Baseado em**: FormularioOrtodontia.tsx (MASTER reference)
**Objetivo**: Aplicar estes padrões em todos os formulários de pré-aprovação

---

## 🚀 **PADRÕES DE NAVEGAÇÃO CORE**

### **1. Função `proximaEtapa()` - NAVEGAÇÃO AVANÇAR**

**🎯 Princípio Base**: Navegação condicional baseada em validação de dados preenchidos

```typescript
const proximaEtapa = () => {
  // PATTERN 1: Validação simples - campo obrigatório
  if (etapaAtual === 1 && !!dados.faseTratamento) {
    setEtapaAtual(2)
  }
  
  // PATTERN 2: Navegação condicional - múltiplos caminhos
  if (etapaAtual === 2 && !!dados.classificacaoAngle && !!dados.padraoFacial) {
    if (dados.classificacaoAngle === 'classe_i') {
      setEtapaAtual(3)
    } else if (dados.classificacaoAngle === 'classe_ii') {
      setEtapaAtual(2.1)
    } else if (dados.classificacaoAngle === 'classe_iii') {
      setEtapaAtual(2.2)
    }
  }
  
  // PATTERN 3: Sub-etapas sequenciais
  if (etapaAtual === 2.1 && !!dados.divisaoClasse) {
    setEtapaAtual(3)
  }
  
  // PATTERN 4: Navegação com sub-validações complexas
  if (etapaAtual === 3.2 && !!dados.cruzadaAnterior && !!dados.cruzadaPosterior) {
    if (dados.cruzadaPosterior === 'sim' && !dados.tipoMordidaCruzada) {
      setEtapaAtual(3.21) // Vai para sub-etapa
    } else {
      setEtapaAtual(4) // Pula sub-etapa
    }
  }
}
```

### **2. Função `podeContinuar()` - VALIDAÇÃO DE AVANÇO**

**🎯 Princípio Base**: Cada etapa tem critérios específicos para liberar o botão "Próximo"

```typescript
const podeContinuar = () => {
  switch (etapaAtual) {
    case 1:
      return !!dados.faseTratamento
      
    case 2:
      return !!dados.classificacaoAngle && !!dados.padraoFacial
      
    case 2.1:
      return !!dados.divisaoClasse
      
    case 3.2:
      return !!dados.cruzadaAnterior && !!dados.cruzadaPosterior &&
             (dados.cruzadaPosterior === 'nao' || !!dados.tipoMordidaCruzada)
      
    // Pattern para validações complexas de arrays
    case 5.1:
      return dados.diastemas === 'ausentes' || 
             (dados.dentesDiastemas && dados.dentesDiastemas.length > 0)
             
    case 11:
      return dados.imagensInicio && dados.imagensInicio.length > 0
      
    default:
      return false
  }
}
```

### **3. Função `etapaAnterior()` - NAVEGAÇÃO VOLTAR**

**🎯 Princípio Base**: Navegação reversa seguindo exatamente o caminho percorrido

```typescript
const etapaAnterior = () => {
  if (etapaAtual === 3) {
    // Volta para a sub-etapa correta baseada nos dados
    if (dados.classificacaoAngle === 'classe_i') {
      setEtapaAtual(2)
    } else if (dados.classificacaoAngle === 'classe_ii') {
      setEtapaAtual(2.1)
    } else if (dados.classificacaoAngle === 'classe_iii') {
      setEtapaAtual(2.2)
    }
  }
  
  // Pattern para sub-etapas complexas
  if (etapaAtual === 4) {
    // Lógica reversa complexa - volta para última etapa visitada
    if (dados.mordidaCruzada === 'sim' && dados.cruzadaPosterior === 'sim' && dados.tipoMordidaCruzada) {
      setEtapaAtual(3.21)
    } else if (dados.mordidaCruzada === 'sim' && dados.cruzadaAnterior && dados.cruzadaPosterior) {
      setEtapaAtual(3.2)
    } else if (dados.linhaMediaCoincidente === 'nao' && dados.desvioSuperior && dados.desvioInferior) {
      setEtapaAtual(3.1)
    } else {
      setEtapaAtual(3)
    }
  }
}
```

---

## 🔧 **PADRÕES TÉCNICOS AVANÇADOS**

### **4. Hook `useImperativeHandle` - EXPOSIÇÃO DE MÉTODOS**

**🎯 Princípio**: Componente expõe métodos de navegação para o componente pai

```typescript
useImperativeHandle(ref, () => ({
  proximaEtapa,
  podeContinuar
}))
```

### **5. useEffect para Comunicação com Pai**

**🎯 Princípio**: Notifica componente pai sobre mudanças de estado

```typescript
useEffect(() => {
  // IMPORTANTE: Só chamar onStatusChange se NÃO for prorrogação
  // Em modo prorrogação, o FormularioProrrogacao é responsável por chamar onStatusChange
  if (onStatusChange && !isProrrogacao) {
    onStatusChange(podeContinuar(), etapaAtual)
  }
}, [dados, etapaAtual, onStatusChange, isProrrogacao])
```

---

## 🎯 **REGRAS DE NAVEGAÇÃO POR CATEGORIA**

### **Etapas Simples (1→2→3)**
- **Validação**: Campo único obrigatório
- **Avanço**: Linear direto
- **Retorno**: Etapa anterior direta

### **Etapas Condicionais (2→2.1/2.2→3)**
- **Validação**: Múltiplos campos obrigatórios
- **Avanço**: Baseado em valor específico
- **Retorno**: Reconstroi caminho baseado nos dados

### **Etapas com Sub-validações (3.2→3.21→4)**
- **Validação**: Campo A + (Campo B condicional)
- **Avanço**: Pode pular sub-etapa se não necessária
- **Retorno**: Lógica complexa reconstroi histórico

### **Etapas de Array/Múltipla Seleção**
- **Validação**: `array.length > 0` ou valor específico
- **Avanço**: Valida presença de dados quando obrigatório
- **Retorno**: Considera se sub-etapa foi visitada

### **Etapas Finais/Upload**
- **Validação**: Arrays de arquivos ou dados finais
- **Avanço**: Chama `onContinuar(dados)` para finalizar
- **Retorno**: Etapa anterior baseada em dados preenchidos

---

## ⚡ **PADRÕES DE IMPLEMENTAÇÃO**

### **Estados de Etapa**
```typescript
const [etapaAtual, setEtapaAtual] = useState<number>(1)

// Etapas decimais para sub-etapas: 2.1, 2.2, 3.21, etc.
// Permite navegação hierárquica complexa
```

### **Validação de Arrays**
```typescript
// Pattern para campos de múltipla seleção
return dados.campo === 'opcao_que_nao_precisa' || 
       (dados.arrayCampo && dados.arrayCampo.length > 0)
```

### **Navegação Condicional Complexa**
```typescript
// Pattern para múltiplos caminhos baseados em dados
if (etapaAtual === X && validacaoBase) {
  if (dados.campo === 'valor1') {
    setEtapaAtual(Y.1)
  } else if (dados.campo === 'valor2') {
    setEtapaAtual(Y.2)
  } else {
    setEtapaAtual(Z) // Caminho padrão
  }
}
```

---

## 🚨 **REGRAS CRÍTICAS DE CONSISTÊNCIA**

### **✅ OBRIGATÓRIO EM TODOS OS FORMULÁRIOS**

1. **Função `proximaEtapa()`**: Navegação avançar com validação
2. **Função `podeContinuar()`**: Validação para liberar botão
3. **Função `etapaAnterior()`**: Navegação reversa inteligente
4. **Hook `useImperativeHandle`**: Exposição para componente pai
5. **useEffect de notificação**: Comunicação com componente pai

### **🔍 VALIDAÇÕES ESSENCIAIS**

- **Campos obrigatórios**: `!!dados.campo` para strings/objetos
- **Arrays**: `array && array.length > 0`
- **Condicionais**: Validar dependências antes de permitir avanço
- **Sub-etapas**: Lógica de pulo quando não aplicável

### **🧭 NAVEGAÇÃO REVERSA**

- **Reconstruir caminho**: Baseado nos dados atuais, não histórico
- **Sub-etapas visitadas**: Voltar para última sub-etapa se dados preenchidos
- **Múltiplos caminhos**: Identificar qual caminho foi percorrido pelos dados

---

## 📝 **COMANDOS SUPERCLAUDE PARA APLICAÇÃO**

### **Verificar Consistência de Navegação**
```bash
/analyze @FormularioXYZ.tsx --focus navigation
```

### **Aplicar Padrões MASTER**
```bash
/improve @FormularioXYZ.tsx --pattern master-navigation --validate
```

### **Comparar com MASTER**
```bash
/compare @FormularioOrtodontia.tsx @FormularioXYZ.tsx --focus navigation
```

---

**🧠 MEMORIZADO PARA USO AUTOMÁTICO**: Este documento serve como referência para padronizar a navegação de qualquer formulário de pré-aprovação, garantindo consistência total com o sistema MASTER.