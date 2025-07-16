# 📋 IMPLEMENTAÇÃO COMPLETA: PRÉ-APROVAÇÃO DE ORTODONTIA

#### **Etapa 1: Fase do Tratamento** ✅
- **Pergunta**: "Selecione a fase do tratamento"
- **Opções**: Permanente, Mista, Decídua

#### **Etapa 2: Classificação de Angle e Padrão Facial** ✅ 
- **Perguntas**:
  1. "Classificação de Angle" → Classe I, Classe II, Classe III
  2. "Padrão facial" → Padrão I, Padrão II, Padrão III, Face longa, Face curta
- **Fluxo condicional**:
  - "Classificação de Angle" → Classe I → Vai direto para Etapa 3 (Linha Média e Mordida)
  - "Classificação de Angle" → Classe II → Vai para Etapa 2.1 (especificação Classe II)
  - "Classificação de Angle" → Classe III → Vai para Etapa 2.2 (especificação Classe III)
  - "Padrão facial" → Padrão I, Padrão II, Padrão III, Face longa, Face curta → Vai direto para Etapa 3 (Linha Média e Mordida)

#### **Etapa 2.1: Especificação "Classificação de Angle" → Classe II** ✅
- **Condição**: Apenas se Classe II foi selecionada
- **Perguntas**:
  1. "Selecione a divisão da classe" → Divisão 1ª, Divisão 2ª
  2. "Escolha a subdivisão" → Subdivisão direita, esquerda, bilateral
- **Próximo**: Etapa 3 (Linha Média e Mordida)

#### **Etapa 2.2: "Classificação de Angle" → Classe III** ✅
- **Condição**: Apenas se Classe III foi selecionada
- **Pergunta**: "Escolha a subdivisão" → Subdivisão direita, esquerda, bilateral
- **Próximo**: Etapa 3 (Linha Média e Mordida)

#### **Etapa 3: Linha Média e Mordida** ⚠️ (Parcialmente implementado)
- **Perguntas**:
  1. "Linha Média - Coincidente" → Sim, Não
  2. "Mordida - Cruzada" → Sim, Não
- **Fluxo condicional**:
  - "Linha Média - Coincidente" → Sim → Vai direto para Etapa 4 (Mordida - Trespasse Horizontal e Vertical)
  - "Linha Média - Coincidente" → Não → Vai para Etapa 3.1 (especificação "Linha Média - Coincidente" → Não)
  - "Mordida - Cruzada" → Sim → Vai para Etapa 3.2 (especificação "Mordida - Cruzada" → Sim)
  - "Mordida - Cruzada" → Não → Vai direto para Etapa 4 (Mordida - Trespasse Horizontal e Vertical)

#### **Etapa 3.1: Especificação "Linha Média - Coincidente" → Não** ✅
- **Condição**: Apenas se Não foi selecionada
- **Perguntas**:
  1. "Desvio superior" → Direita, Esquerda, Ausente
  2. "Desvio inferior" → Direita, Esquerda, Ausente
- **Próximo**: Etapa 4: Mordida - Trespasse Horizontal e Vertical

#### **Etapa 3.2: Especificação "Mordida - Cruzada" → Sim** ✅
- **Condição**: Apenas se Sim foi selecionada
- **Perguntas**:
  1. "Cruzada anterior" → Sim, Não
  2. "Cruzada posterior" → Sim, Não
- **Fluxo condicional**:
  - "Cruzada anterior" → Sim, Não → Vai direto para Etapa 4 (Mordida - Trespasse Horizontal e Vertical)
  - "Cruzada posterior" → Sim → Vai para Etapa 3.2.1 (especificação "Mordida - Cruzada" → "Cruzada posterior" → Sim)
  - "Mordida - Cruzada" → Não → Vai direto para Etapa 4 (Mordida - Trespasse Horizontal e Vertical)

### **Etapa 3.2.1: Especificação "Mordida - Cruzada" → "Cruzada posterior" → Sim** ✅
- **Condição**: Apenas se Sim foi selecionada
- **Pergunta**:"Selecione o tipo de mordida" → Unilateral direita, Unilateral esquerda, Bilateral
- **Próximo**: Etapa 4: Mordida - Trespasse Horizontal e Vertical

#### **Etapa 4: Mordida - Trespasse Horizontal e Vertical** ⚠️ (Básico implementado)
- **Perguntas**:
  1. "Trespasse horizontal (sobressaliência/overjet)" → Adequado, Inadequado
  2. "Trepasse Vertical (sobremordida/overbite)?" → Adequado, Mordida aberta, Sobremordida
- **Fluxo condicional**:
  - "Mordida - Trespasse Horizontal" → Adequado → Vai direto para Etapa 5 (Mordida - Diastemas, Apinhamento e Giroversões)
  - "Mordida - Trespasse Horizontal" → Inadequado → Vai para Etapa 4.1 (especificação "Mordida - Trespasse Horizontal" → Inadequado)
  - "Mordida - Trepasse Vertical" → Adequado → Vai direto para Etapa 5 (Mordida - Diastemas, Apinhamento e Giroversões)
  - "Mordida - Trepasse Vertical" → Mordida aberta → Vai para Etapa 4.2.1 (especificação "Mordida - Trepasse Vertical" → Mordida aberta)
  - "Mordida - Trepasse Vertical" → Sobremordida → Vai para Etapa 4.2.2 (especificação "Mordida - Cruzada" → Sim)

#### **Etapa 4.1: Especificação "Mordida - Trespasse Horizontal" → Inadequado** ✅
- **Condição**: Apenas se Inadequada foi selecionada
- **Pergunta**:"Assinale a medida do trepasse horizontal" → 0 mm, 1 mm, 2 mm, 3 mm, Acima de 4 mm
- **Próximo**: Etapa 5: Mordida - Diastemas, Apinhamento e Giroversões

#### **Etapa 4.2.1: Especificação "Mordida - Trepasse Vertical" → Mordida aberta** ✅
- **Condição**: Apenas se Mordida aberta foi selecionada
- **Pergunta**:"Assinale a medida do trepasse horizontal" → 0 mm, 1 mm, 2 mm, 3 mm, Acima de 4 mm
- **Próximo**: Etapa 5: Mordida - Diastemas, Apinhamento e Giroversões

#### **Etapa 4.2.2: Especificação "Mordida - Trepasse Vertical" → Sobremordida** ✅
- **Condição**: Apenas se Sobremordida foi selecionada
- **Pergunta**:"Assinale a medida do trepasse horizontal" → 0 mm, 1 mm, 2 mm, 3 mm, Acima de 4 mm
- **Próximo**: Etapa 5: Mordida - Diastemas, Apinhamento e Giroversões

#### **Etapa 5: Mordida - Diastemas, Apinhamento e Giroversões** ✅
- **Perguntas**:
  1. "Diastemas" → Presentes, Ausentes
  2. "Apinhamento" → Presentes, Ausentes
  3. "Giroversões" → Presentes, Ausentes
- **Fluxo condicional**:
  - "Diastemas" → Presentes → Vai para Etapa 5.1 (especificação "Diastemas" → Presentes)
  - "Apinhamento" → Presentes → Vai para Etapa 5.2 (especificação "Apinhamento" → Presentes)
  - "Giroversões" → Presentes → Vai para Etapa 5.3 (especificação "Giroversões" → Presentes)
  - "Diastemas", "Apinhamento", "Giroversões" → Ausentes → Vai direto para Etapa 6 (Dor ou Ruído Articular)

#### **Etapa 5.1: Especificação "Diastemas" → Presentes** ✅
- **Condição**: Apenas se Presentes foi selecionado
- **Pergunta**: "Selecione os dentes com diastemas" → Lista odontograma
- **Próximo**: Etapa 6 (Dor ou Ruído Articular, Bruxismo e Apertamento)

#### **Etapa 5.2: Especificação "Apinhamento" → Presentes** ✅
- **Condição**: Apenas se Presentes foi selecionado
- **Pergunta**: "Selecione os dentes com apinhamento" → Lista odontograma
- **Próximo**: Etapa 6 (Dor ou Ruído Articular, Bruxismo e Apertamento)

#### **Etapa 5.3: Especificação "Giroversões" → Presentes** ✅
- **Condição**: Apenas se Presentes foi selecionado
- **Pergunta**: "Selecione os dentes com giroversões" → Lista odontograma
- **Próximo**: Etapa 6 (Dor ou Ruído Articular, Bruxismo e Apertamento)

#### **Etapa 6: Dor ou Ruído Articular, Bruxismo e Apertamento** ✅
- **Perguntas**:
  1. "Dor ou ruído articular" → Sim, Não
  2. "Bruxismo" → Sim, Não
  3. "Apertamento" → Sim, Não
- **Fluxo condicional**:
  - "Dor ou ruído articular" → Sim → Vai para Etapa 6.1 (especificação "Dor ou ruído articular" → Sim)
  - "Dor ou ruído articular" → Não → Vai direto para Etapa 7 (Respiração e Doença periodontal)
  - "Bruxismo" → Sim, Não → Vai direto para Etapa 7 (Respiração e Doença periodontal)
  - "Apertamento" → Sim, Não → Vai direto para Etapa 7 (Respiração e Doença periodontal)

#### **Etapa 6.1: Especificação "Dor ou ruído articular" → Sim** ✅
- **Condição**: Apenas se Sim foi selecionado
- **Pergunta**: "Selecione o lado da dor / ruído" → Direita, Esquerda, Bilateral
- **Próximo**: Etapa 7 (Respiração e Doença periodontal)

#### **Etapa 7: Respiração e Doença Periodontal** ✅
- **Perguntas**:
  1. "Respiração" → Bucal, Nasal, Buco-nasal
  2. "Doença Periodontal" → Ausente, Leve, Moderada, Grave
- **Fluxo condicional**:
  - "Respiração" → Bucal, Nasal, Buco-nasal → Vai direto para Etapa 8 (Necessidade de tratamento complementar)