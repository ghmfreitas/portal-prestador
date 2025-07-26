# 🗺️ MAPA COMPLETO DE ETAPAS - FORMULÁRIO ORTODONTIA
## Workspace Gustavo - Estrutura de Navegação Completa

**Data**: 2025-01-22  
**Total**: 11 etapas principais + 38+ sub-etapas  
**Profundidade**: Até 4 níveis (ex: 9.421)

---

## 📊 **ESTRUTURA HIERÁRQUICA COMPLETA**

### **1️⃣ ETAPA 1: FASE DO TRATAMENTO**
- **Título**: "Selecione a fase do tratamento ortodôntico"
- **Tipo**: Seleção única - renderCard()
- **Opções**: Permanente, Mista, Decídua
- **Validação**: `dados.faseTratamento`
- **Próximo**: Etapa 2

### **2️⃣ ETAPA 2: CLASSIFICAÇÃO E PADRÃO FACIAL**
- **Título**: "Selecione a classificação de Angle e o padrão facial"
- **Tipo**: Dupla seleção - renderCard()
- **Seção 1**: Classificação de Angle (Classe I, II, III)
- **Seção 2**: Padrão facial (I, II, III, Face longa, Face curta)
- **Validação**: `dados.classificacaoAngle && dados.padraoFacial`
- **Próximo**: 
  - Se Classe II → Etapa 2.1
  - Se Classe III → Etapa 2.2
  - Se Classe I → Etapa 3

#### **2.1 CLASSE II ESPECÍFICA**
- **Notificação**: 🔵 "Classe II Selecionada"
- **Seção 1**: Divisão (1ª, 2ª)
- **Seção 2**: Subdivisão (Direita, Esquerda, Bilateral)
- **Validação**: `dados.classeIIDivisao && dados.classeIISubdivisao`

#### **2.2 CLASSE III ESPECÍFICA**
- **Notificação**: 🔵 "Classe III Selecionada"
- **Seção**: Subdivisão (Direita, Esquerda, Bilateral)
- **Validação**: `dados.classeIIISubdivisao`

### **3️⃣ ETAPA 3: LINHA MÉDIA E MORDIDA**
- **Título**: "Informações sobre linha média e mordida"
- **Tipo**: Dupla seleção
- **Seção 1**: Linha média coincidente (Sim/Não)
- **Seção 2**: Mordida cruzada (Sim/Não)
- **Validação**: `dados.linhaMediaCoincidente && dados.mordidaCruzada`
- **Próximo**:
  - Se linha média "não" → Etapa 3.1
  - Se mordida cruzada "sim" → Etapa 3.2
  - Se ambos "não"/"sim" → Etapa 4

#### **3.1 DESVIOS DE LINHA MÉDIA**
- **Notificação**: 🔵 "Linha Média Não Coincidente"
- **Seção 1**: Desvio superior (Direita, Esquerda, Ausente)
- **Seção 2**: Desvio inferior (Direita, Esquerda, Ausente)
- **Validação**: `dados.desvioSuperior && dados.desvioInferior`

#### **3.2 MORDIDA CRUZADA**
- **Notificação**: 🔵 "Mordida Cruzada Presente"
- **Seção 1**: Cruzada anterior (Sim/Não)
- **Seção 2**: Cruzada posterior (Sim/Não)
- **Validação**: `dados.cruzadaAnterior && dados.cruzadaPosterior`
- **Próximo**: Se posterior "sim" → Etapa 3.21

##### **3.21 TIPO MORDIDA CRUZADA POSTERIOR**
- **Notificação**: 🔵 "Mordida Cruzada Posterior"
- **Tipo**: Seleção única
- **Opções**: Unilateral direita, Unilateral esquerda, Bilateral
- **Validação**: `dados.tipoMordidaCruzada`

### **4️⃣ ETAPA 4: TRESPASSE HORIZONTAL E VERTICAL**
- **Título**: "Informações sobre trespasse horizontal e vertical"
- **Tipo**: Dupla seleção
- **Seção 1**: Trespasse horizontal (Adequado/Inadequado)
- **Seção 2**: Trespasse vertical (Adequado/Mordida aberta/Sobremordida)
- **Validação**: `dados.overjet && dados.overbite`
- **Próximo**:
  - Se horizontal "inadequado" → Etapa 4.1
  - Se vertical "mordida aberta" → Etapa 4.2
  - Se vertical "sobremordida" → Etapa 4.3

#### **4.1 MEDIDA TRESPASSE HORIZONTAL**
- **Título**: "Assinale a medida do trespasse horizontal"
- **Tipo**: Layout 2-colunas especial
- **Layout**: `flex gap-px` → duas colunas `flex-1`
- **Coluna Esquerda**: -4mm, -3mm, -2mm, -1mm, 0mm
- **Coluna Direita**: 1mm, 2mm, 3mm, 4mm, Acima 4mm
- **Validação**: `dados.medidaOverjet`

#### **4.2 MEDIDA MORDIDA ABERTA**
- **Título**: "Assinale a medida da mordida aberta"
- **Tipo**: Layout 2-colunas especial
- **Medidas**: 0mm, 1mm, 2mm, 3mm, 4mm, Acima 4mm
- **Validação**: `dados.medidaMordidaAberta`

#### **4.3 MEDIDA SOBREMORDIDA**
- **Título**: "Assinale a medida da sobremordida"
- **Tipo**: Layout 2-colunas especial
- **Medidas**: 0mm, 1mm, 2mm, 3mm, 4mm, Acima 4mm
- **Validação**: `dados.medidaSobremordida`

### **5️⃣ ETAPA 5: DIASTEMAS, APINHAMENTO E GIROVERSÕES**
- **Título**: "Presença de diastemas, apinhamento e giroversões"
- **Tipo**: Tripla seleção
- **Seção 1**: Diastemas (Sim/Não)
- **Seção 2**: Apinhamento (Sim/Não)
- **Seção 3**: Giroversões (Sim/Não)
- **Validação**: `dados.diastemas && dados.apinhamento && dados.giroversoes`
- **Próximo**:
  - Se diastemas "sim" → Etapa 5.1
  - Se apinhamento "sim" → Etapa 5.2
  - Se giroversões "sim" → Etapa 5.3

#### **5.1 SELEÇÃO DENTES COM DIASTEMAS**
- **Notificação**: 🔵 "Diastemas Presentes"
- **Tipo**: Odontograma interativo
- **Layout**: Grid 8-colunas (dentes 11-18, 21-28, 31-38, 41-48)
- **Validação**: `dados.dentesDiastemas.length > 0`

#### **5.2 SELEÇÃO DENTES COM APINHAMENTO**
- **Notificação**: 🔵 "Apinhamento Presente"
- **Tipo**: Odontograma interativo
- **Validação**: `dados.dentesApinhamento.length > 0`

#### **5.3 SELEÇÃO DENTES COM GIROVERSÕES**
- **Notificação**: 🔵 "Giroversões Presentes"
- **Tipo**: Odontograma interativo
- **Validação**: `dados.dentesGiroversoes.length > 0`

### **6️⃣ ETAPA 6: DOR ARTICULAR, BRUXISMO E APERTAMENTO**
- **Título**: "Informações sobre dor articular, bruxismo e apertamento"
- **Tipo**: Tripla seleção
- **Seção 1**: Dor/ruído articular (Sim/Não)
- **Seção 2**: Bruxismo (Sim/Não)
- **Seção 3**: Apertamento (Sim/Não)
- **Validação**: `dados.dorRuidoArticular && dados.bruxismo && dados.apertamento`
- **Próximo**: Se dor/ruído "sim" → Etapa 6.1

#### **6.1 LADO DA DOR/RUÍDO**
- **Notificação**: 🔵 "Dor ou Ruído Articular Presente"
- **Tipo**: Seleção única
- **Opções**: Direita, Esquerda, Bilateral
- **Validação**: `dados.ladoDorRuido`

### **7️⃣ ETAPA 7: RESPIRAÇÃO E DOENÇA PERIODONTAL**
- **Título**: "Informações sobre respiração e doença periodontal"
- **Tipo**: Dupla seleção
- **Seção 1**: Respiração (Nasal, Mista, Bucal)
- **Seção 2**: Doença periodontal (Sim/Não)
- **Validação**: `dados.respiracao && dados.doencaPeriodontal`
- **Próximo**: Se doença periodontal "sim" → Sub-etapas por tipo

#### **7.1, 7.2, 7.3 TIPOS DE PERDA ÓSSEA**
- **Título**: "Tipo de perda óssea"
- **Tipo**: Seleção única
- **Opções**: Horizontal, Vertical, Mista
- **Validação**: `dados.tipoPerdaOssea`
- **Próximo**: Etapas 7.11, 7.21, 7.31

##### **7.11, 7.21, 7.31 DENTES COM PERDA ÓSSEA**
- **Tipo**: Odontograma interativo
- **Validação**: `dados.dentesPerdaOssea.length > 0`

### **8️⃣ ETAPA 8: TRATAMENTO COMPLEMENTAR**
- **Título**: "Necessidade de tratamento complementar"
- **Tipo**: Dupla seleção
- **Seção 1**: Necessidade (Sim/Não)
- **Seção 2**: Queixa principal (textarea)
- **Validação**: `dados.necessidadeTratamentoComplementar && dados.queixaPrincipal`
- **Próximo**: Se necessidade "sim" → Etapa 8.1

#### **8.1 TIPOS DE TRATAMENTO COMPLEMENTAR**
- **Notificação**: 🔵 "Tratamento Complementar Necessário"
- **Tipo**: Seleção múltipla (checkboxes)
- **Opções**: Fonoaudiologia, Pré-protéticas, Otorrinolaringologia, Cirurgia ortognática, Implantes
- **Validação**: `dados.tiposTratamentoComplementar.length > 0`

### **9️⃣ ETAPA 9: TIPO DE TRATAMENTO**
- **Título**: "Selecione o tipo de tratamento"
- **Tipo**: Seleção única - Cards grandes
- **Opções**: Preventivo/Interceptativo, Ortopédico, Corretivo, Cirúrgico
- **Validação**: `dados.tipoTratamento`
- **Próximo**: Sub-fluxos específicos por tipo

#### **9.1 PREVENTIVO/INTERCEPTATIVO - APARATOLOGIA**
- **Título**: "Tratamento Preventivo/Interceptativo - Aparatologia"
- **Seção 1**: Tipo aparatologia (Intra oral, Extra oral)
- **Seção 2**: Formato (Estético, Metálico)
- **Próximo**: Se intra oral → 9.11, se completo → 9.12

##### **9.11 TIPO APARELHO INTRA ORAL**
- **Tipo**: Seleção única
- **Opções**: Convencional, Alinhador

##### **9.12 EXODONTIAS E PROGNÓSTICO**
- **Seção 1**: Exodontias (Sim/Não)
- **Seção 2**: Prognóstico (Favorável, Desfavorável, Duvidoso)
- **Próximo**: Se exodontias "sim" → 9.121

###### **9.121 DENTES PARA EXODONTIA**
- **Tipo**: Odontograma interativo

#### **9.2 ORTOPÉDICO - APARATOLOGIA**
- **Estrutura similar ao 9.1**
- **Sub-etapas**: 9.21, 9.22, 9.221

#### **9.3 CORRETIVO - COMPOSITÓRIO**
- **Título**: "Tratamento Corretivo - É compositório?"
- **Tipo**: Seleção única (Sim/Não)
- **Próximo**: 9.31

##### **9.31 TIPO DE APARATOLOGIA**
- **Seção 1**: Tipo (Fixa, Alinhador)
- **Próximo**: Se fixa → 9.312

###### **9.312 FORMATO APARATOLOGIA FIXA**
- **Opções**: Estético, Metálico
- **Próximo**: 9.32

##### **9.32 EXODONTIAS, DESGASTE E PROGNÓSTICO**
- **Seção 1**: Exodontias (Sim/Não)
- **Seção 2**: Desgaste interproximal (Sim/Não)
- **Seção 3**: Prognóstico
- **Próximo**: 
  - Se exodontias "sim" → 9.321
  - Se desgaste "sim" → 9.331

###### **9.321 DENTES PARA EXODONTIA**
- **Tipo**: Odontograma

###### **9.331 DENTES PARA DESGASTE**
- **Tipo**: Odontograma

#### **9.4 CIRÚRGICO - APARATOLOGIA**
- **Estrutura complexa similar ao Corretivo**
- **Sub-etapas**: 9.41, 9.412, 9.42, 9.421, 9.431

### **🔟 ETAPA 10: PREVISÃO PARA FINALIZAÇÃO**
- **Título**: "Previsão para finalização do tratamento"
- **Tipo**: Contador numérico
- **Range**: 1-24 meses
- **Seção 2**: Aparelho prévio (Sim/Não)
- **Validação**: `dados.previsaoMeses && dados.aparelhoPrevio`
- **Próximo**: Se aparelho prévio "sim" → 10.1

#### **10.1 TEMPO COM APARELHO**
- **Notificação**: 🔵 "Aparelho Instalado Previamente"
- **Tipo**: Contador numérico
- **Range**: 1-99 meses
- **Validação**: `dados.tempoAparelhoPrevio`

### **1️⃣1️⃣ ETAPA 11: IMAGENS INÍCIO TRATAMENTO**
- **Título**: "Envie as imagens do início do tratamento"
- **Tipo**: Upload múltiplo
- **Validação**: `dados.imagensInicio.length > 0`
- **Final**: Formulário completo

---

## 🔄 **FLUXO DE NAVEGAÇÃO**

### **Navegação Linear**
```
1 → 2 → 3 → 4 → 5 → 6 → 7 → 8 → 9 → 10 → 11
```

### **Navegação Condicional**
```
2 → 2.1 (se Classe II)
2 → 2.2 (se Classe III)
3 → 3.1 (se linha média ≠ coincidente)
3 → 3.2 → 3.21 (se mordida cruzada)
4 → 4.1/4.2/4.3 (por tipo trespasse)
5 → 5.1/5.2/5.3 (por presença)
6 → 6.1 (se dor presente)
7 → 7.X → 7.XX (por tipo doença)
8 → 8.1 (se tratamento necessário)
9 → 9.X → 9.XX → 9.XXX (por tipo tratamento)
10 → 10.1 (se aparelho prévio)
```

### **Função de Navegação**
```jsx
const proximaEtapa = () => {
  // Lógica condicional baseada em dados
  if (etapaAtual === 2 && dados.classificacaoAngle === 'classe_ii') {
    setEtapaAtual(2.1)
  } else if (etapaAtual === 2 && dados.classificacaoAngle === 'classe_iii') {
    setEtapaAtual(2.2)
  }
  // ... demais condições
}
```

---

## 📊 **ESTATÍSTICAS DO FORMULÁRIO**

### **Contadores**
- **Etapas principais**: 11
- **Sub-etapas nível 2**: 15+ (ex: 2.1, 3.1, 4.1)
- **Sub-etapas nível 3**: 10+ (ex: 3.21, 9.11, 9.12)
- **Sub-etapas nível 4**: 8+ (ex: 9.121, 9.321, 9.331)
- **Total estimado**: 50+ etapas possíveis

### **Tipos de Entrada**
- **Cards seleção única**: 25+ etapas
- **Cards seleção múltipla**: 8+ etapas
- **Odontogramas**: 8 etapas
- **Contadores numéricos**: 3 etapas
- **Textareas**: 2 etapas
- **Upload**: 1 etapa
- **Checkboxes**: 2 etapas

### **Notificações Contextuais**
- **Total**: 11 notificações azuis
- **Distribuição**: Etapas 2.1, 2.2, 3.1, 3.2, 3.21, 5.1, 5.2, 5.3, 6.1, 8.1, 10.1

---

## 🎯 **APLICAÇÃO PARA FUTUROS FORMULÁRIOS**

### **Padrões Reutilizáveis**
1. **Estrutura hierárquica** com até 4 níveis
2. **Navegação condicional** baseada em respostas
3. **Validação por etapa** antes de avançar
4. **Notificações contextuais** em pontos críticos
5. **Barra de progresso** dinâmica
6. **Odontograma** para seleção de dentes
7. **Contadores** para valores numéricos
8. **Upload** para imagens

### **Comandos de Implementação**
```bash
# Criar novo formulário baseado nesta estrutura
/implement novo-formulario-especialidade --reference @MAPA_ETAPAS_ORTODONTIA.md --pattern-navigation

# Validar estrutura de etapas  
/analyze @novo-formulario.tsx --focus navigation-flow --validate-hierarchy
```

---

**💾 MAPA SALVO NO WORKSPACE GUSTAVO**  
**📅 Última atualização**: 2025-01-22  
**🎯 Status**: Documentação Completa para Referência