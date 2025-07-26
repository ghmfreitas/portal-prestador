# 📋 IMPLEMENTAÇÃO COMPLETA: PRÉ-APROVAÇÃO PRORROGAÇÃO DE ORTODONTIA

#### **Etapa 1: Fase do Tratamento**
- **Pergunta**: "Selecione a fase do tratamento" → Preventivo / Interceptativo, Ortopédico, Corretivo, Cirúrgico
- **Próximo**: Etapa 2 (Tempo de Tratamento)

#### **Etapa 2: Tempo de Tratamento**
- **Perguntas**:
  1. "Qual o tempo em meses está previsto para finalizar?" → componente contador a partir de 01 mês até 24 meses
  2. "Qual o motivo da prorrogação do tratamento?" → componente Textarea com placeholder "Descreva nesse campo o motivo da prorrogação"
- **Próximo**: Etapa 3 (Situação Atual do Tratamento)

#### **Etapa 3: Situação Atual do Tratamento**
- **Perguntas**:
  1. "Colaboração do paciente" → Sim, Não
  2. "Falta às consultas por parte do paciente" → Sim, Não
  3. "Uso de elástico" → Sim, Não
  4. "Tracionamento de dentes" → Sim, Não
  5. "Houve alteração no planejamento inicial?" → Sim, Não
- **Fluxo condicional**:
  - "Colaboração do paciente" → Sim → Vai direto para Etapa 4 (Análise Oclusal)
  - "Colaboração do paciente" → Não → Vai direto para Etapa 4 (Análise Oclusal)
  - "Falta às consultas por parte do paciente" → Sim → Vai para Etapa 3.1 (especificação "Situação Atual do Tratamento" → Sim → "Falta às consultas por parte do paciente" → Sim)
  - "Falta às consultas por parte do paciente" → Não → Vai direto para Etapa 4 (Mordida - Trespasse Horizontal e Vertical)
  - "Uso de elástico" → Sim → Vai direto para Etapa 4 (Análise Oclusal)
  - "Uso de elástico" → Não → Vai direto para Etapa 4 (Análise Oclusal)
  - "Tracionamento de dentes" → Sim → Vai para Etapa 3.2 (especificação "Situação Atual do Tratamento" → Sim → "Tracionamento de dentes" → Sim)
  - "Tracionamento de dentes" → Não → Vai direto para Etapa 4 (Análise Oclusal)
  - "Houve alteração no planejamento inicial?" → Sim → Vai para Etapa 3.3 (especificação "Situação Atual do Tratamento" → Sim → "Houve alteração no planejamento inicial?" → Sim)
  - "Houve alteração no planejamento inicial?" → Não → Vai direto para Etapa 4 (Análise Oclusal)

#### **Etapa 3.1: Especificação "Situação Atual do Tratamento" → Sim → "Falta às consultas por parte do paciente" → Sim
- **Condição**: Apenas se Sim foi selecionada
- **Pergunta**: "Quantas faltas?" → componente contador a partir de 01 falta até 99 faltas
- **Próximo**: Etapa 4 (Análise Oclusal - Relação dos caninos e molares)

#### **Etapa 3.2: Especificação "Situação Atual do Tratamento" → Sim → "Tracionamento de dentes" → Sim
- **Condição**: Apenas se Sim foi selecionada
- **Pergunta**: "Selecione os dentes com tracionamento:" → Lista odontograma
- **Próximo**: Etapa 4 (Análise Oclusal - Relação dos caninos e molares)

#### **Etapa 3.3: Especificação "Situação Atual do Tratamento" → Sim → "Houve alteração no planejamento inicial?" → Sim
- **Condição**: Apenas se Sim foi selecionada
- **Pergunta**: "Justifique:" → componente Textarea com placeholder "Descreva o motivo da alteração do planejamento inicial"
- **Próximo**: Etapa 4 (Análise Oclusal - Relação dos caninos e molares)

#### **Etapa 4: Análise Oclusal - Relação dos caninos e molares**
- **Perguntas**:
  1. "Relação dos caninos direitos" → Classe I, Classe II, Classe III, Ausente
  2. "Relação dos caninos esquerdos" → Classe I, Classe II, Classe III, Ausente
  3. "Relação dos molares direitos" → Classe I, Classe II, Classe III, Ausente
  4. "Relação dos molares esquerdos" → Classe I, Classe II, Classe III, Ausente
- **Próximo**: Etapa 5 (Análise Oclusal - Linha média, Trespasses horizontal e vertical)

#### **Etapa 5: Análise Oclusal - Linha média, Trespasses horizontal e vertical**
- **Perguntas**:
  1. "Linha média" → Coincidente, Desviada
  2. "Trespasse horizontal (sobressaliência/overjet)" → Adequado, Inadequado
  3. "Trepasse vertical (sobremordida/overbite)?" → Adequado, Mordida aberta, Sobremordida
- **Fluxo condicional**:
  - "Linha média" → Coincidente → Vai direto para Etapa 6 (Análise Oclusal - Diastemas, Apinhamento e Giroversões)
  - "Linha média" → Desviada → Vai direto para Etapa 6 (Análise Oclusal - Diastemas, Apinhamento e Giroversões)
  - "Trespasse horizontal (sobressaliência/overjet)" → Adequado → Vai direto para Etapa 6 (Análise Oclusal - Diastemas, Apinhamento e Giroversões)
  - "Trespasse horizontal (sobressaliência/overjet)" → Inadequado → Vai para Etapa 5.1 (especificação "Análise Oclusal" → "Trespasse horizontal (sobressaliência/overjet)" → Inadequado)
  - "Trepasse vertical (sobremordida/overbite)" → Adequado → Vai direto para Etapa 6 (Análise Oclusal - Diastemas, Apinhamento e Giroversões)
  - "Trepasse vertical (sobremordida/overbite)" → Mordida aberta → Vai para Etapa 5.2.1 (especificação "Análise Oclusal" → "Trespasse vertical" → Mordida aberta)
  - "Trepasse vertical (sobremordida/overbite)" → Sobremordida → Vai para Etapa 5.2.2 (especificação "Análise Oclusal" → "Trespasse vertical" → Sobremordida)

#### **Etapa 5.1: Especificação "Análise Oclusal" → "Trespasse horizontal" → Inadequado**
- **Condição**: Apenas se Inadequado foi selecionada
- **Pergunta**: "Assinale a medida do trepasse horizontal" → -4 mm, -3 mm, -2 mm, -1 mm, 0 mm, 1 mm, 2 mm, 3 mm, 4 mm, Acima de 4 mm
- **Próximo**: Etapa 6: Análise Oclusal - Diastemas, Apinhamento e Giroversões

#### **Etapa 5.2.1: Especificação "Análise Oclusal" → "Trespasse vertical" → Mordida aberta**
- **Condição**: Apenas se Mordida aberta foi selecionada
- **Pergunta**:"Assinale a medida do trepasse vertical" → 0 mm, 1 mm, 2 mm, 3 mm, 4 mm, Acima de 4 mm
- **Próximo**: Etapa 5: Mordida - Diastemas, Apinhamento e Giroversões

#### **Etapa 5.2.2: Especificação "Análise Oclusal" → "Trespasse vertical" → Sobremordida**
- **Condição**: Apenas se Sobremordida foi selecionada
- **Pergunta**:"Assinale a medida do trepasse horizontal" → 0 mm, 1 mm, 2 mm, 3 mm, 4 mm, Acima de 4 mm
- **Próximo**: Etapa 5: Mordida - Diastemas, Apinhamento e Giroversões

#### **Etapa 6: Análise Oclusal - Diastemas, Apinhamento e Giroversões**
- **Perguntas**:
  1. "Diastemas" → Presentes, Ausentes
  2. "Apinhamento" → Presentes, Ausentes
  3. "Giroversões" → Presentes, Ausentes
- **Próximo**: Etapa 7: Objetivos a serem alcançados com a Prorrogação do Tratamento

#### **Etapa 7: Objetivos a serem alcançados com a Prorrogação do Tratamento**
- **Opções [checkbox]**: Normalização do selamento labial, Obtenção de trespasse horizontal adequado, Obtenção do trespasse vertical adequado, Obtenção de guias funcionais adequadas, Sem interferências oclusais, Obtenção de Classe I em caninos, Melhorar intercuspidação, Outro (ao clicar componetente de textarea deve aparecer com o placeholder 'Descreva os outros objetivos que serão alcançados')
- **Próximo**: Etapa 8 (Plano de tratamento e Mecânica)

#### **Etapa 8: Plano de tratamento e Mecânica**
- **Pergunta**: "Descreva o plano de tratamento e mecânica a ser utilizada para finalização do caso" → componente Textarea com placeholder "Descreva mais sobre o plano de tratamento"
- **Próximo**: Etapa 9 (Envie a imagem da fase atual do tratamento)

#### **Etapa 9: Envie a imagem da fase atual do tratamento**
- **Pergunta**: "Nos envie as imagens que comprovem o estado atual do paciente para esse tratamento " → Componente de anexar imagens (pode ser mais de uma)

(FINALIZA FORMULÁRIO E SALVA OS DADOS)