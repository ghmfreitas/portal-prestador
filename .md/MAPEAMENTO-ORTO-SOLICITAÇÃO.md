# 📋 IMPLEMENTAÇÃO COMPLETA: PRÉ-APROVAÇÃO DE ORTODONTIA

#### **Etapa 1: Fase do Tratamento** ✅
- **Pergunta**: "Selecione a fase do tratamento" → Permanente, Mista, Decídua
- **Próximo**: Etapa 2 (Classificação de Angle e Padrão Facial)

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
- **Pergunta**: "Selecione os dentes com diastemas:" → Lista odontograma
- **Próximo**: Etapa 6 (Dor ou Ruído Articular, Bruxismo e Apertamento)

#### **Etapa 5.2: Especificação "Apinhamento" → Presentes** ✅
- **Condição**: Apenas se Presentes foi selecionado
- **Pergunta**: "Selecione os dentes com apinhamento:" → Lista odontograma
- **Próximo**: Etapa 6 (Dor ou Ruído Articular, Bruxismo e Apertamento)

#### **Etapa 5.3: Especificação "Giroversões" → Presentes** ✅
- **Condição**: Apenas se Presentes foi selecionado
- **Pergunta**: "Selecione os dentes com giroversões:" → Lista odontograma
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
  - "Doença Periodontal" → Ausente → Vai direto para Etapa 8 (Necessidade de tratamento complementar)
  - "Doença Periodontal" → Leve → Vai para Etapa 7.1 (especificação "Doença Periodontal" → Leve)
  - "Doença Periodontal" → Moderado → Vai para Etapa 7.2 (especificação "Doença Periodontal" → Moderado)
  - "Doença Periodontal" → Grave → Vai para Etapa 7.3 (especificação "Doença Periodontal" → Grave)
  
#### **Etapa 7.1: Especificação "Doença Periodontal" → Leve*
- **Condição**: Apenas se Leve foi selecionado
- **Pergunta**: "Selecione o tipo de perda óssea" → Generalizada, Localizada
- **Fluxo condicional**:
  - "Selecione o tipo de perda óssea" → Generalizada → Vai direto para Etapa 8 (Necessidade de tratamento complementar)
  - "Selecione o tipo de perda óssea" → Localizada → Vai para Etapa 7.1.1 (especificação "Doença Periodontal" → Leve → "Selecione o tipo de perda óssea" → Localizada)
  
#### **Etapa 7.1.1: Especificação "Doença Periodontal" → Leve → "Selecione o tipo de perda óssea" → Localizada*
- **Condição**: Apenas se Localizada foi selecionado
- **Pergunta**: "Selecione os dentes:" → Lista odontograma
- **Próximo**: Etapa 8 (Necessidade de tratamento complementar)

#### **Etapa 7.2: Especificação "Doença Periodontal" → Moderado*
- **Condição**: Apenas se Moderado foi selecionado
- **Pergunta**: "Selecione o tipo de perda óssea" → Generalizada, Localizada
- **Fluxo condicional**:
  - "Selecione o tipo de perda óssea" → Generalizada → Vai direto para Etapa 8 (Necessidade de tratamento complementar)
  - "Selecione o tipo de perda óssea" → Localizada → Vai para Etapa 7.2.1 (especificação "Doença Periodontal" → Moderado → "Selecione o tipo de perda óssea" → Localizada)

#### **Etapa 7.2.1: Especificação "Doença Periodontal" → Moderado → "Selecione o tipo de perda óssea" → Localizada*
- **Condição**: Apenas se Localizada foi selecionado
- **Pergunta**: "Selecione os dentes:" → Lista odontograma
- **Próximo**: Etapa 8 (Necessidade de tratamento complementar)

#### **Etapa 7.3: Especificação "Doença Periodontal" → Grave*
- **Condição**: Apenas se Grave foi selecionado
- **Pergunta**: "Selecione o tipo de perda óssea" → Generalizada, Localizada
- **Fluxo condicional**:
  - "Selecione o tipo de perda óssea" → Generalizada → Vai direto para Etapa 8 (Necessidade de tratamento complementar)
  - "Selecione o tipo de perda óssea" → Localizada →  Vai para Etapa 7.3.1 (especificação "Doença Periodontal" → Grave → "Selecione o tipo de perda óssea" → Localizada)

#### **Etapa 7.3.1: Especificação "Doença Periodontal" → Grave → "Selecione o tipo de perda óssea" → Localizada*
- **Condição**: Apenas se Localizada foi selecionado
- **Pergunta**: "Selecione os dentes:" → Lista odontograma
- **Próximo**: Etapa 8 (Necessidade de tratamento complementar)

#### **Etapa 8: Necessidade de tratamento complementar**
- **Perguntas**: "Tem necessidade de tratamento complementar?"
  1. "Tem necessidade de tratamento complementar?" → Sim, Não
  2. "Qual a queixa principal do paciente?" → componente Textarea com placeholder "Descreva nesse campo a queixa relatada do paciente"
- **Fluxo condicional**:
  - "Tem necessidade de tratamento complementar?" → Sim → Vai para Etapa 8.1 (especificação "Tem necessidade de tratamento complementar?" → Sim)
  - "Tem necessidade de tratamento complementar?" → Não → Vai direto para Etapa 9 (Tratamento)

#### **Etapa 8.1: Especificação "Tem necessidade de tratamento complementar?" → Sim*
- **Condição**: Apenas se Sim foi selecionado
- **Pergunta**: "Escolha o tipo de tratamento complementar:"
- **Opções [checkbox]**: Fonoaudiologia, Pré-protéticas, Otorrinolaringologia, Cirurgia ortognática, Implantes
- **Próximo**: Etapa 9 (Tratamento)

#### **Etapa 9: Tratamento**
- **Pergunta**: "Selecione o tipo de tratamento:"
- **Opções**: Preventivo / Interceptativo, Ortopédico, Corretivo, Cirúrgica
- **Fluxo condicional**:
  - "Selecione o tipo de tratamento:" → Preventivo / Interceptativo → Vai para Etapa 9.1.1 (especificação "Tratamento" → Preventivo / Interceptativo)
  - "Selecione o tipo de tratamento:" → Ortopédico → Vai para Etapa 9.2.1 (especificação "Tratamento" → Ortopédico)
  - "Selecione o tipo de tratamento:" → Corretivo → Vai para Etapa 9.3.1 (especificação "Tratamento" → Corretivo)
  - "Selecione o tipo de tratamento:" → Cirúrgica → Vai para Etapa 9.4.1  (especificação "Tratamento" → Cirúrgica)
  
  #### **Etapa 9.1.1: Especificação "Tratamento" → Preventivo / Interceptativo*
- **Condição**: Apenas se Preventivo / Interceptativo foi selecionado
- **Pergunta**: "Escolha o tipo de tratamento complementar:"
- **Opções [checkbox]**: Intra oral, Extra oral
- **Fluxo condicional**:
  - "Escolha o tipo de tratamento complementar:" → Intra oral → Vai para Etapa 9.1.1.1 (especificação "Tratamento" → Preventivo / Interceptativo → "Escolha o tipo de tratamento complementar:" → Intra oral)
  - "Escolha o tipo de tratamento complementar:" → Extra oral → aparece componente Textarea com placeholder "Especifique o tipo de aparelho" e vai para Etapa 9.1.2 (especificação "Tratamento" → Preventivo / Interceptativo → "Exodontia")

#### **Etapa 9.1.1.1: Especificação "Tratamento" → Preventivo / Interceptativo → "Escolha o tipo de tratamento complementar:" → Intra oral**
- **Condição**: Apenas se Intra oral foi selecionado
- **Pergunta**: "Escolha o tipo de tratamento complementar:"
- **Opções**: Convencional, Alinhador
- **Fluxo condicional**:
  - "Escolha o tipo de tratamento complementar:" → Alinhador → Vai para Etapa 9.1.2 (especificação "Tratamento" → Preventivo / Interceptativo → "Exodontia")
  - "Escolha o tipo de tratamento complementar:" → Convencional → aparece componente Textarea com placeholder "Especifique o tipo de aparelho" e vai para Etapa 9.1.2 (especificação "Tratamento" → Preventivo / Interceptativo → "Exodontia")

#### **Etapa 9.1.2: Especificação "Tratamento" → Preventivo / Interceptativo → "Exodontia"**
- **Condição**: Após responder as perguntas Intra oral e/ou Extra oral
- **Perguntas**:
  1. "Exodontias" → Sim, Não
  2. "Prognóstico" → Favorável, Desfavorável, Duvidoso
- **Fluxo condicional**:
  - "Exodontias" → Sim → Vai para Etapa 9.1.2.1 (especificação "Tratamento" → Preventivo / Interceptativo → "Exodontia" → Sim)
  - "Exodontias" → Não → Vai direto para Etapa 10 (Previsão para finalização do tratamento)
  - "Prognóstico" → Favorável → Vai direto para Etapa 10 (Previsão para finalização do tratamento)
  - "Prognóstico" → Desfavorável → Vai direto para Etapa 10 (Previsão para finalização do tratamento)
  - "Prognóstico" → Duvidoso → Vai direto para Etapa 10 (Previsão para finalização do tratamento)

#### **Etapa 9.1.2.1: Especificação "Tratamento" → Preventivo / Interceptativo → "Exodontia" → Sim**
- **Condição**: Apenas se Sim foi selecionado
- **Pergunta**: "Selecione os dentes:" → Lista odontograma
- **Próximo**: Etapa 10 (Previsão para finalização do tratamento)

#### **Etapa 9.2.1: Especificação "Tratamento" → Ortopédico*
- **Condição**: Apenas se Ortopédico foi selecionado
- **Pergunta**: "Escolha o tipo de tratamento complementar:"
- **Opções [checkbox]**: Intra oral, Extra oral
- **Fluxo condicional**:
  - "Escolha o tipo de tratamento complementar:" → Intra oral → Vai para Etapa 9.2.1.1 (especificação "Tratamento" → Ortopédico → "Escolha o tipo de tratamento complementar:" → Intra oral)
  - "Escolha o tipo de tratamento complementar:" → Extra oral → aparece componente Textarea com placeholder "Especifique o tipo de aparelho" e vai para Etapa 9.1.2 (especificação "Tratamento" → Ortopédico → "Exodontia")

#### **Etapa 9.2.1.1: Especificação "Tratamento" → Ortopédico → "Escolha o tipo de tratamento complementar:" → Intra oral**
- **Condição**: Apenas se Intra oral foi selecionado
- **Pergunta**: "Escolha o tipo de tratamento complementar:"
- **Opções**: Convencional, Alinhador
- **Fluxo condicional**:
  - "Escolha o tipo de tratamento complementar:" → Alinhador → Vai para Etapa 9.2.2 (especificação "Tratamento" → Ortopédico → "Exodontia")
  - "Escolha o tipo de tratamento complementar:" → Convencional → aparece componente Textarea com placeholder "Especifique o tipo de aparelho" e vai para Etapa 9.2.2 (especificação "Tratamento" → Ortopédico → "Exodontia")

#### **Etapa 9.2.2: Especificação "Tratamento" → Ortopédico → "Exodontia"**
- **Condição**: Após responder as perguntas Intra oral e/ou Extra oral
- **Perguntas**:
  1. "Exodontias" → Sim, Não
  2. "Prognóstico" → Favorável, Desfavorável, Duvidoso
- **Fluxo condicional**:
  - "Exodontias" → Sim → Vai para Etapa 9.2.2.1 (especificação "Tratamento" → Ortopédico → "Exodontia" → Sim)
  - "Exodontias" → Não → Vai direto para Etapa 10 (Previsão para finalização do tratamento)
  - "Prognóstico" → Favorável → Vai direto para Etapa 10 (Previsão para finalização do tratamento)
  - "Prognóstico" → Desfavorável → Vai direto para Etapa 10 (Previsão para finalização do tratamento)
  - "Prognóstico" → Duvidoso → Vai direto para Etapa 10 (Previsão para finalização do tratamento)

#### **Etapa 9.2.2.1: Especificação "Tratamento" → Ortopédico → "Exodontia" → Sim**
- **Condição**: Apenas se Sim foi selecionado
- **Pergunta**: "Selecione os dentes:" → Lista odontograma
- **Próximo**: Etapa 10 (Previsão para finalização do tratamento)

#### **Etapa 9.3.1: Especificação "Tratamento" → Corretivo*
- **Condição**: Apenas se Corretivo foi selecionado
- **Pergunta**: "É compositório?"
- **Opções**: Sim, Não
- **Fluxo condicional**:
  - "É compositório?" → Sim → Vai para Etapa 9.3.1.1 (espeficicação "Tratamento" → Corretivo → "É compositório?" → Sim)**
  - "É compositório?" → Não → Vai para Etapa 9.3.2 (espeficicação "Tratamento" → Corretivo → "Exodontia")

### **Etapa 9.3.1.1: Especificação "Tratamento" → Corretivo → "É compositório?" → Sim**
- **Condição**: Apenas se Sim foi selecionado
- **Pergunta**: "Qual o tipo de aparatologia?"
- **Opções**: Fixa, Alinhador
- **Fluxo condicional**:
  - "Qual o tipo de aparatologia?" → Fixa → Vai para Etapa 9.3.1.2 (espeficicação "Tratamento" → Corretivo → "É compositório?" → Sim → "Qual o tipo de aparatologia?" → Fixa)**
  - "Qual o tipo de aparatologia?" → Alinhador → Vai para Etapa 9.3.2 (espeficicação "Tratamento" → Corretivo → "Exodontia")

#### **Etapa 9.3.1.2: Especificação "Tratamento" → Corretivo → "É compositório?" → Sim → "Qual o tipo de aparatologia?" → Fixa**
- **Condição**: Apenas se Fixa foi selecionado
- **Pergunta**: "Escolha qual o formato:" → Estético, Metálico
- **Próximo**: Etapa 9.3.2 (especificação "Tratamento" → Corretivo → "Exodontia")

### **Etapa 9.3.2: Especificação "Tratamento" → Corretivo → "Exodontia"**
- **Condição**: Após responder as perguntas Estético ou Metálico
- **Perguntas**:
  1. "Exodontias" → Sim, Não
  2. "Desgaste Interproximal" → Sim, Não
  3. "Prognóstico" → Favorável, Desfavorável, Duvidoso
- **Fluxo condicional**:
  - "Exodontias" → Sim → Vai para Etapa 9.4.2.1 (especificação "Tratamento" → Corretivo → "Exodontia" → Sim)
  - "Exodontias" → Não → Vai direto para Etapa 10 (Previsão para finalização do tratamento)
  - "Desgaste Interproximal" → Sim → Vai para Etapa 9.4.3.1 (especificação "Tratamento" → Corretivo → "Desgaste Interproximal" → Sim)
  - "Desgaste Interproximal" → Não → Vai direto para Etapa 10 (Previsão para finalização do tratamento)
  - "Prognóstico" → Favorável → Vai direto para Etapa 10 (Previsão para finalização do tratamento)
  - "Prognóstico" → Desfavorável → Vai direto para Etapa 10 (Previsão para finalização do tratamento)
  - "Prognóstico" → Duvidoso → Vai direto para Etapa 10 (Previsão para finalização do tratamento)

#### **Etapa 9.3.2.1: Especificação "Tratamento" → Corretivo → "Exodontia" → "Sim"**
- **Condição**: Apenas se Sim foi selecionado
- **Pergunta**: "Selecione os dentes:" → Lista odontograma
- **Próximo**: Etapa 10 (Previsão para finalização do tratamento)

#### **Etapa 9.3.3.1: Especificação "Tratamento" → Corretivo → "Desgaste Interproximal" → Sim**
- **Condição**: Apenas se Sim foi selecionado
- **Pergunta**: "Selecione os dentes:" → Lista odontograma
- **Próximo**: Etapa 10 (Previsão para finalização do tratamento)

#### **Etapa 9.4.1: Especificação "Tratamento" → Cirúrgico*
- **Condição**: Apenas se Cirúrgico foi selecionado
- **Pergunta**: "Escolha o tipo de aparatologia:"
- **Opções**: Fixa, Ortopédico, Alinhador
- **Fluxo condicional**:
  - "Escolha o tipo de aparatologia:" → Fixa → Vai para Etapa 9.4.1.1 (especificação "Tratamento" → Cirúrgico → "Escolha o tipo de aparatologia:" → Fixa)
  - "Escolha o tipo de aparatologia:" → Ortopédico → Vai para Etapa 9.4.1.2 (especificação "Tratamento" → Cirúrgico → "Escolha o tipo de aparatologia:" → Ortopédico)
  - "Escolha o tipo de aparatologia:" → Alinhador → Vai para Etapa 9.4.2 (especificação "Tratamento" → Cirúrgico → "Exodontia")

#### **Etapa 9.4.1.1: Especificação "Tratamento" → Cirúrgico → "Escolha o tipo de aparatologia:" → Fixa**
- **Condição**: Apenas se Fixa foi selecionado
- **Pergunta**: "Escolha qual o formato:" → Estético, Metálico
- **Próximo**: Etapa 9.4.2 (especificação "Tratamento" → Cirúrgico → "Exodontia")

#### **Etapa 9.4.1.2: Especificação "Tratamento" → Cirúrgico → "Escolha o tipo de aparatologia:" → Ortopédico**
- **Condição**: Apenas se Ortopédico foi selecionado
- **Pergunta**: "Escolha o tipo de tratamento complementar:"
- **Opções [checkbox]**: Intra oral, Extra oral
- **Fluxo condicional**:
  - "Escolha o tipo de tratamento complementar:" → Intra oral → aparece componente Textarea com placeholder "Especifique o tipo de aparelho" e vai para Etapa 9.4.2 (especificação "Tratamento" → Cirúrgico → "Exodontia")
  - "Escolha o tipo de tratamento complementar:" → Extra oral → aparece componente Textarea com placeholder "Especifique o tipo de aparelho" e vai para Etapa 9.4.2 (especificação "Tratamento" → Cirúrgico → "Exodontia")

#### **Etapa 9.4.2: Especificação "Tratamento" → Cirúrgico → "Exodontia"**
- **Condição**: Após responder as perguntas Estético ou Metálico
- **Perguntas**:
  1. "Exodontias" → Sim, Não
  2. "Desgaste Interproximal" → Sim, Não
  3. "Prognóstico" → Favorável, Desfavorável, Duvidoso
- **Fluxo condicional**:
  - "Exodontias" → Sim → Vai para Etapa 9.4.2.1 (especificação "Tratamento" → Cirúrgico → "Exodontia" → Sim)
  - "Exodontias" → Não → Vai direto para Etapa 10 (Previsão para finalização do tratamento)
  - "Desgaste Interproximal" → Sim → Vai para Etapa 9.4.3.1 (especificação "Tratamento" → Cirúrgico → "Desgaste Interproximal" → Sim)
  - "Desgaste Interproximal" → Não → Vai direto para Etapa 10 (Previsão para finalização do tratamento)
  - "Prognóstico" → Favorável → Vai direto para Etapa 10 (Previsão para finalização do tratamento)
  - "Prognóstico" → Desfavorável → Vai direto para Etapa 10 (Previsão para finalização do tratamento)
  - "Prognóstico" → Duvidoso → Vai direto para Etapa 10 (Previsão para finalização do tratamento)

#### **Etapa 9.4.2.1: Especificação "Tratamento" → Cirúrgico → "Exodontia" → "Sim"**
- **Condição**: Apenas se Sim foi selecionado
- **Pergunta**: "Selecione os dentes:" → Lista odontograma
- **Próximo**: Etapa 10 (Previsão para finalização do tratamento)

#### **Etapa 9.4.3.1: Especificação "Tratamento" → Cirúrgico → "Desgaste Interproximal" → Sim**
- **Condição**: Apenas se Sim foi selecionado
- **Pergunta**: "Selecione os dentes:" → Lista odontograma
- **Próximo**: Etapa 10 (Previsão para finalização do tratamento)

#### **Etapa 10: Previsão para finalização do tratamento**
- **Perguntas**:
  1. "Informe a quantidade de meses abaixo" → componente contador a partir de 01 mês até 24 meses
  2. "Paciente possui aparelho instalado previamente?" → Sim, Não
- **Fluxo condicional**:
  - "Paciente possui aparelho instalado previamente?" → Sim → Vai para Etapa 10.1 (especificação "Previsão para finalização do tratamento" → "Paciente possui aparelho instalado previamente" → Sim)
  - "Paciente possui aparelho instalado previamente?" → Não → Vai direto para Etapa 11 (Envie a imagem do início do tratamento)

#### **Etapa 10.1: Especificação "Previsão para finalização do tratamento" → "Paciente possui aparelho instalado previamente" → Sim**
- **Condição**: Apenas se Sim foi selecionado
- **Pergunta**: "Há quanto tempo o paciente possui aparelho?" → componente contador a partir de 01 mês até 24 meses
- **Próximo**: Etapa 11 (Envie a imagem do início do tratamento)

#### **Etapa 11: Envie a imagem do início do tratamento**
- **Pergunta**: "Nos envie as imagens que comprovem o estado inicial do paciente para esse tratamento " → Componente de anexar imagens (pode ser mais de uma)

(FINALIZA FORMULÁRIO E SALVA OS DADOS)
