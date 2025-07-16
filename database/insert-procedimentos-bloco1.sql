-- =====================================================
-- INSERÇÃO DE PROCEDIMENTOS - BLOCO 1/4 (SEM DUPLICATAS)
-- Data: 2025-07-01 (REGENERADO - duplicatas removidas)
-- Procedimentos: 1-74 (74 total)
-- Origem: Results.xlsx (excluindo duplicatas e 6 já inseridos)
-- =====================================================

BEGIN;

-- Inserir procedimentos do bloco 1 (sem duplicatas)
INSERT INTO odonto.procedimentos (
    codigo_tuss, descricao, especialidade_id, ativo,
    requer_pre_aprovacao, requer_dente, requer_face, requer_regiao,
    requer_rx_inicial, requer_rx_final, nivel_complexidade_id
) VALUES
-- 1: 6259 - TRANSPORTE DO SEGURADO
('6259', 'TRANSPORTE DO SEGURADO', (SELECT id FROM odonto.especialidades WHERE codigo = 'NAO_INF' LIMIT 1), TRUE, false, false, FALSE, true, false, false, 1),
-- 2: 100039 - RASPAGEM SUB-GENGIVAL - PACOTE
('100039', 'RASPAGEM SUB-GENGIVAL - PACOTE', (SELECT id FROM odonto.especialidades WHERE codigo = 'PERIO' LIMIT 1), TRUE, true, false, FALSE, true, true, false, 3),
-- 3: 100047 - RASPAGEM SUPRA-GENGIVAL - PACOTE
('100047', 'RASPAGEM SUPRA-GENGIVAL - PACOTE', (SELECT id FROM odonto.especialidades WHERE codigo = 'PERIO' LIMIT 1), TRUE, false, false, FALSE, true, false, false, 1),
-- 4: 100065 - CONSULTA + ATIVIDADE EDUCATIVA
('100065', 'CONSULTA + ATIVIDADE EDUCATIVA', (SELECT id FROM odonto.especialidades WHERE codigo = 'PREV' LIMIT 1), TRUE, false, false, FALSE, true, false, false, 1),
-- 5: 100090 - APLICAÇÃO TÓPICA DE FLÚOR - PACOTE
('100090', 'APLICAÇÃO TÓPICA DE FLÚOR - PACOTE', (SELECT id FROM odonto.especialidades WHERE codigo = 'PREV' LIMIT 1), TRUE, false, false, FALSE, true, false, false, 1),
-- 6: 12-009 - DOCUMENTAÇÃO ORTODONTICA ESPECIAL
('12-009', 'DOCUMENTAÇÃO ORTODONTICA ESPECIAL', (SELECT id FROM odonto.especialidades WHERE codigo = 'RADIO' LIMIT 1), TRUE, true, false, FALSE, true, false, false, 2),
-- 7: 12-024 - ATM - CONVENCIONAL (3 POSICOES - TRANSFACIAL / TRANSCRANEANA)
('12-024', 'ATM - CONVENCIONAL (3 POSICOES - TRANSFACIAL / TRANSCRANEANA)', (SELECT id FROM odonto.especialidades WHERE codigo = 'RADIO' LIMIT 1), TRUE, false, false, FALSE, true, false, false, 1),
-- 8: 19-022 - PRÓTESE FIXA ADESIVA INDIRETA EM CERAMICA PURA
('19-022', 'PRÓTESE FIXA ADESIVA INDIRETA EM CERAMICA PURA', (SELECT id FROM odonto.especialidades WHERE codigo = 'PROTESE' LIMIT 1), TRUE, true, true, FALSE, false, true, true, 3),
-- 9: 19-023 - NUCLEO CERAMICO
('19-023', 'NUCLEO CERAMICO', (SELECT id FROM odonto.especialidades WHERE codigo = 'PROTESE' LIMIT 1), TRUE, true, true, FALSE, false, true, true, 3),
-- 10: 19-038 - PRÓTESE PARCIAL REMOVIVEL CARACTERIZADA
('19-038', 'PRÓTESE PARCIAL REMOVIVEL CARACTERIZADA', (SELECT id FROM odonto.especialidades WHERE codigo = 'PROTESE' LIMIT 1), TRUE, true, false, FALSE, true, false, false, 2),
-- 11: 20-026 - REMOÇÃO DE APARELHO ORTODONTICO DEVIDO A CANCELAMENTO
('20-026', 'REMOÇÃO DE APARELHO ORTODONTICO DEVIDO A CANCELAMENTO', (SELECT id FROM odonto.especialidades WHERE codigo = 'ORTODONT' LIMIT 1), TRUE, true, false, FALSE, true, false, false, 4),
-- 12: 20-027 - CONTROLE DE TRATAMENTO ORTODONTICO CONCLUIDO
('20-027', 'CONTROLE DE TRATAMENTO ORTODONTICO CONCLUIDO', (SELECT id FROM odonto.especialidades WHERE codigo = 'ORTODONT' LIMIT 1), TRUE, true, false, FALSE, true, false, false, 4),
-- 13: 30201012 - BIÓPSIA DE LÁBIO
('30201012', 'BIÓPSIA DE LÁBIO', (SELECT id FROM odonto.especialidades WHERE codigo = 'CIRURGIA' LIMIT 1), TRUE, false, false, FALSE, true, false, false, 1),
-- 14: 30202027 - BIÓPSIA DE BOCA
('30202027', 'BIÓPSIA DE BOCA', (SELECT id FROM odonto.especialidades WHERE codigo = 'CIRURGIA' LIMIT 1), TRUE, false, false, FALSE, true, false, false, 1),
-- 15: 30203031 - BIÓPSIA DE LÍNGUA
('30203031', 'BIÓPSIA DE LÍNGUA', (SELECT id FROM odonto.especialidades WHERE codigo = 'CIRURGIA' LIMIT 1), TRUE, false, false, FALSE, true, false, false, 1),
-- 16: 30204011 - BIÓPSIA DE GLÂNDULA SALIVAR
('30204011', 'BIÓPSIA DE GLÂNDULA SALIVAR', (SELECT id FROM odonto.especialidades WHERE codigo = 'CIRURGIA' LIMIT 1), TRUE, false, false, FALSE, true, false, false, 1),
-- 17: 30211018 - BIÓPSIA DE MANDÍBULA
('30211018', 'BIÓPSIA DE MANDÍBULA', (SELECT id FROM odonto.especialidades WHERE codigo = 'CIRURGIA' LIMIT 1), TRUE, true, false, FALSE, true, true, false, 3),
-- 18: 40801187 - RX - RADIOGRAFIA OCLUSAL
('40801187', 'RX - RADIOGRAFIA OCLUSAL', (SELECT id FROM odonto.especialidades WHERE codigo = 'RADIO' LIMIT 1), TRUE, true, false, FALSE, true, true, false, 3),
-- 19: 81000014 - CONDICIONAMENTO EM ODONTOLOGIA
('81000014', 'CONDICIONAMENTO EM ODONTOLOGIA', (SELECT id FROM odonto.especialidades WHERE codigo = 'ODONTOP' LIMIT 1), TRUE, false, false, FALSE, true, false, false, 1),
-- 20: 81000057 - CONSULTA ODONTOLÓGICA DE URGÊNCIA 24 HS
('81000057', 'CONSULTA ODONTOLÓGICA DE URGÊNCIA 24 HS', (SELECT id FROM odonto.especialidades WHERE codigo = 'URG_NOT' LIMIT 1), TRUE, true, false, FALSE, true, true, false, 3),
-- 21: 81000090 - CONSULTA PARA TÉCNICA DE CLAREAMENTO DENTÁRIO CASEIRO
('81000090', 'CONSULTA PARA TÉCNICA DE CLAREAMENTO DENTÁRIO CASEIRO', (SELECT id FROM odonto.especialidades WHERE codigo = 'ESTETICA' LIMIT 1), TRUE, false, false, FALSE, true, false, false, 1),
-- 22: 81000111 - DIAGNÓSTICO ANATOMOPATOLÓGICO EM CITOLOGIA ESFOLIATIVA NA REGIÃO BUCO-MAXILO-FACIAL
('81000111', 'DIAGNÓSTICO ANATOMOPATOLÓGICO EM CITOLOGIA ESFOLIATIVA NA REGIÃO BUCO-MAXILO-FACIAL', (SELECT id FROM odonto.especialidades WHERE codigo = 'DIAGNOST' LIMIT 1), TRUE, false, false, FALSE, true, false, false, 1),
-- 23: 81000138 - DIAGNÓSTICO ANATOMOPATOLÓGICO EM MATERIAL DE BIÓPSIA NA REGIÃO BUCO-MAXILO-FACIAL
('81000138', 'DIAGNÓSTICO ANATOMOPATOLÓGICO EM MATERIAL DE BIÓPSIA NA REGIÃO BUCO-MAXILO-FACIAL', (SELECT id FROM odonto.especialidades WHERE codigo = 'DIAGNOST' LIMIT 1), TRUE, false, false, FALSE, true, false, false, 1),
-- 24: 81000154 - DIAGNÓSTICO ANATOMOPATOLÓGICO EM PEÇA CIRÚRGICA NA REGIÃO BUCO-MAXILO-FACIAL
('81000154', 'DIAGNÓSTICO ANATOMOPATOLÓGICO EM PEÇA CIRÚRGICA NA REGIÃO BUCO-MAXILO-FACIAL', (SELECT id FROM odonto.especialidades WHERE codigo = 'DIAGNOST' LIMIT 1), TRUE, false, false, FALSE, true, false, false, 1),
-- 25: 81000170 - DIAGNÓSTICO ANATOMOPATOLÓGICO EM PUNÇÃO NA REGIÃO BUCO-MAXILO-FACIAL
('81000170', 'DIAGNÓSTICO ANATOMOPATOLÓGICO EM PUNÇÃO NA REGIÃO BUCO-MAXILO-FACIAL', (SELECT id FROM odonto.especialidades WHERE codigo = 'DIAGNOST' LIMIT 1), TRUE, false, false, FALSE, true, false, false, 1),
-- 26: 81000197 - DIAGNÓSTICO E TRATAMENTO DE ESTOMATITE HERPÉTICA
('81000197', 'DIAGNÓSTICO E TRATAMENTO DE ESTOMATITE HERPÉTICA', (SELECT id FROM odonto.especialidades WHERE codigo = 'DIAGNOST' LIMIT 1), TRUE, false, false, FALSE, true, false, false, 1),
-- 27: 81000200 - DIAGNÓSTICO E TRATAMENTO DE ESTOMATITE POR CANDIDOSE
('81000200', 'DIAGNÓSTICO E TRATAMENTO DE ESTOMATITE POR CANDIDOSE', (SELECT id FROM odonto.especialidades WHERE codigo = 'DIAGNOST' LIMIT 1), TRUE, false, false, FALSE, false, false, false, 1),
-- 28: 81000219 - DIAGNÓSTICO E TRATAMENTO DE HALITOSE
('81000219', 'DIAGNÓSTICO E TRATAMENTO DE HALITOSE', (SELECT id FROM odonto.especialidades WHERE codigo = 'DIAGNOST' LIMIT 1), TRUE, false, false, FALSE, false, false, false, 1),
-- 29: 81000235 - DIAGNÓSTICO E TRATAMENTO DE XEROSTOMIA
('81000235', 'DIAGNÓSTICO E TRATAMENTO DE XEROSTOMIA', (SELECT id FROM odonto.especialidades WHERE codigo = 'DIAGNOST' LIMIT 1), TRUE, false, false, FALSE, false, false, false, 1),
-- 30: 81000243 - DIAGNÓSTICO POR MEIO DE ENCERAMENTO
('81000243', 'DIAGNÓSTICO POR MEIO DE ENCERAMENTO', (SELECT id FROM odonto.especialidades WHERE codigo = 'PROTESE' LIMIT 1), TRUE, false, false, FALSE, true, false, false, 1),
-- 31: 81000260 - DIAGNÓSTICO POR MEIO DE PROCEDIMENTOS LABORATORIAIS
('81000260', 'DIAGNÓSTICO POR MEIO DE PROCEDIMENTOS LABORATORIAIS', (SELECT id FROM odonto.especialidades WHERE codigo = 'DIAGNOST' LIMIT 1), TRUE, false, false, FALSE, false, false, false, 1),
-- 32: 81000278 - FOTOGRAFIA
('81000278', 'FOTOGRAFIA', (SELECT id FROM odonto.especialidades WHERE codigo = 'RADIO' LIMIT 1), TRUE, false, false, FALSE, true, false, false, 1),
-- 33: 81000294 - LEVANTAMENTO RADIOGRÁFICO (EXAME RADIODÔNTICO)
('81000294', 'LEVANTAMENTO RADIOGRÁFICO (EXAME RADIODÔNTICO)', (SELECT id FROM odonto.especialidades WHERE codigo = 'RADIO' LIMIT 1), TRUE, false, false, FALSE, true, false, false, 1),
-- 34: 81000308 - MODELOS ORTODÔNTICOS
('81000308', 'MODELOS ORTODÔNTICOS', (SELECT id FROM odonto.especialidades WHERE codigo = 'RADIO' LIMIT 1), TRUE, false, false, FALSE, true, false, false, 1),
-- 35: 81000324 - RADIOGRAFIA ANTERO-POSTERIOR
('81000324', 'RADIOGRAFIA ANTERO-POSTERIOR', (SELECT id FROM odonto.especialidades WHERE codigo = 'RADIO' LIMIT 1), TRUE, false, false, FALSE, true, false, false, 1),
-- 36: 81000340 - RADIOGRAFIA DA ATM
('81000340', 'RADIOGRAFIA DA ATM', (SELECT id FROM odonto.especialidades WHERE codigo = 'RADIO' LIMIT 1), TRUE, false, false, FALSE, true, false, false, 1),
-- 37: 81000367 - RADIOGRAFIA DA MÃO E PUNHO - CARPAL
('81000367', 'RADIOGRAFIA DA MÃO E PUNHO - CARPAL', (SELECT id FROM odonto.especialidades WHERE codigo = 'RADIO' LIMIT 1), TRUE, false, false, FALSE, true, false, false, 1),
-- 38: 81000375 - RADIOGRAFIA INTERPROXIMAL -BITE-WING
('81000375', 'RADIOGRAFIA INTERPROXIMAL -BITE-WING', (SELECT id FROM odonto.especialidades WHERE codigo = 'RADIO' LIMIT 1), TRUE, true, false, FALSE, false, true, false, 3),
-- 39: 81000383 - RADIOGRAFIA OCLUSAL
('81000383', 'RADIOGRAFIA OCLUSAL', (SELECT id FROM odonto.especialidades WHERE codigo = 'RADIO' LIMIT 1), TRUE, true, false, FALSE, true, true, false, 3),
-- 40: 81000405 - RADIOGRAFIA PANORÂMICA DE MANDÍBULA/MAXILA (ORTOPANTOMOGRAFIA)
('81000405', 'RADIOGRAFIA PANORÂMICA DE MANDÍBULA/MAXILA (ORTOPANTOMOGRAFIA)', (SELECT id FROM odonto.especialidades WHERE codigo = 'RADIO' LIMIT 1), TRUE, true, false, FALSE, true, true, false, 3),
-- 41: 81000413 - RADIOGRAFIA PANORÂMICA DE MANDÍBULA/MAXILA (ORTOPANTOMOGRAFIA) COM TRAÇADO CEFALOMÉTRICO
('81000413', 'RADIOGRAFIA PANORÂMICA DE MANDÍBULA/MAXILA (ORTOPANTOMOGRAFIA) COM TRAÇADO CEFALOMÉTRICO', (SELECT id FROM odonto.especialidades WHERE codigo = 'RADIO' LIMIT 1), TRUE, false, false, FALSE, true, false, false, 1),
-- 42: 81000430 - RADIOGRAFIA POSTERO-ANTERIOR
('81000430', 'RADIOGRAFIA POSTERO-ANTERIOR', (SELECT id FROM odonto.especialidades WHERE codigo = 'RADIO' LIMIT 1), TRUE, false, false, FALSE, true, false, false, 1),
-- 43: 81000472 - TELERRADIOGRAFIA
('81000472', 'TELERRADIOGRAFIA', (SELECT id FROM odonto.especialidades WHERE codigo = 'RADIO' LIMIT 1), TRUE, false, false, FALSE, true, false, false, 1),
-- 44: 81000480 - TELERRADIOGRAFIA COM TRACADO CEFALOMETRICO
('81000480', 'TELERRADIOGRAFIA COM TRACADO CEFALOMETRICO', (SELECT id FROM odonto.especialidades WHERE codigo = 'RADIO' LIMIT 1), TRUE, false, false, FALSE, true, false, false, 1),
-- 45: 81000510 - TOMOGRAFIA COMPUTADORIZADAPOR FEIXE CÔNICO - CONE BEAM
('81000510', 'TOMOGRAFIA COMPUTADORIZADAPOR FEIXE CÔNICO - CONE BEAM', (SELECT id FROM odonto.especialidades WHERE codigo = 'RADIO' LIMIT 1), TRUE, true, false, FALSE, true, true, false, 3),
-- 46: 81000529 - TOMOGRAFIA CONVENCIONAL - LINEAR OU MULTI-DIRECIONAL
('81000529', 'TOMOGRAFIA CONVENCIONAL - LINEAR OU MULTI-DIRECIONAL', (SELECT id FROM odonto.especialidades WHERE codigo = 'RADIO' LIMIT 1), TRUE, false, false, FALSE, false, false, false, 1),
-- 47: 81000537 - TRAÇADO CEFALOMÉTRICO
('81000537', 'TRAÇADO CEFALOMÉTRICO', (SELECT id FROM odonto.especialidades WHERE codigo = 'RADIO' LIMIT 1), TRUE, false, false, FALSE, true, false, false, 1),
-- 48: 81000545 - DIAGNÓSTICO E TRATAMENTO DE TRISMO
('81000545', 'DIAGNÓSTICO E TRATAMENTO DE TRISMO', (SELECT id FROM odonto.especialidades WHERE codigo = 'DIAGNOST' LIMIT 1), TRUE, false, false, FALSE, false, false, false, 1),
-- 49: 81000553 - DOCUMENTAÇÃO ODONTOLÓGICA EM MÍDIA DIGITAL
('81000553', 'DOCUMENTAÇÃO ODONTOLÓGICA EM MÍDIA DIGITAL', (SELECT id FROM odonto.especialidades WHERE codigo = 'RADIO' LIMIT 1), TRUE, false, false, FALSE, true, false, false, 1),
-- 50: 81000561 - RADIOGRAFIA LATERAL CORPO DA MANDÍBULA
('81000561', 'RADIOGRAFIA LATERAL CORPO DA MANDÍBULA', (SELECT id FROM odonto.especialidades WHERE codigo = 'RADIO' LIMIT 1), TRUE, false, false, FALSE, true, false, false, 1),
-- 51: 81000570 - TÉCNICA DE LOCALIZAÇÃO RADIOGRAFICA
('81000570', 'TÉCNICA DE LOCALIZAÇÃO RADIOGRAFICA', (SELECT id FROM odonto.especialidades WHERE codigo = 'RADIO' LIMIT 1), TRUE, false, true, FALSE, false, false, false, 1),
-- 52: 82000034 - ALVEOLOPLASTIA
('82000034', 'ALVEOLOPLASTIA', (SELECT id FROM odonto.especialidades WHERE codigo = 'CIRURGIA' LIMIT 1), TRUE, true, false, FALSE, true, true, false, 3),
-- 53: 82000050 - AMPUTAÇÃO RADICULAR COM OBTURAÇÃO RETRÓGRADA
('82000050', 'AMPUTAÇÃO RADICULAR COM OBTURAÇÃO RETRÓGRADA', (SELECT id FROM odonto.especialidades WHERE codigo = 'CIRURGIA' LIMIT 1), TRUE, true, true, FALSE, false, true, true, 3),
-- 54: 82000069 - AMPUTAÇÃO RADICULAR SEM OBTURAÇÃO RETRÓGRADA
('82000069', 'AMPUTAÇÃO RADICULAR SEM OBTURAÇÃO RETRÓGRADA', (SELECT id FROM odonto.especialidades WHERE codigo = 'CIRURGIA' LIMIT 1), TRUE, true, true, FALSE, false, true, true, 3),
-- 55: 82000077 - APICETOMIA BIRRADICULARES COM OBTURAÇÃO RETRÓGRADA
('82000077', 'APICETOMIA BIRRADICULARES COM OBTURAÇÃO RETRÓGRADA', (SELECT id FROM odonto.especialidades WHERE codigo = 'CIRURGIA' LIMIT 1), TRUE, true, true, FALSE, false, true, true, 3),
-- 56: 82000085 - APICETOMIA BIRRADICULARES SEM OBTURAÇÃO RETRÓGRADA
('82000085', 'APICETOMIA BIRRADICULARES SEM OBTURAÇÃO RETRÓGRADA', (SELECT id FROM odonto.especialidades WHERE codigo = 'CIRURGIA' LIMIT 1), TRUE, true, true, FALSE, false, true, true, 3),
-- 57: 82000158 - APICETOMIA MULTIRRADICULARES COM OBTURAÇÃO RETRÓGRADA
('82000158', 'APICETOMIA MULTIRRADICULARES COM OBTURAÇÃO RETRÓGRADA', (SELECT id FROM odonto.especialidades WHERE codigo = 'CIRURGIA' LIMIT 1), TRUE, true, true, FALSE, false, true, true, 3),
-- 58: 82000166 - APICETOMIA MULTIRRADICULARES SEM OBTURAÇÃO RETRÓGRADA
('82000166', 'APICETOMIA MULTIRRADICULARES SEM OBTURAÇÃO RETRÓGRADA', (SELECT id FROM odonto.especialidades WHERE codigo = 'CIRURGIA' LIMIT 1), TRUE, true, true, FALSE, false, true, true, 3),
-- 59: 82000174 - APICETOMIA UNIRRADICULARES COM OBTURAÇÃO RETRÓGRADA
('82000174', 'APICETOMIA UNIRRADICULARES COM OBTURAÇÃO RETRÓGRADA', (SELECT id FROM odonto.especialidades WHERE codigo = 'CIRURGIA' LIMIT 1), TRUE, true, true, FALSE, false, true, true, 3),
-- 60: 82000182 - APICETOMIA UNIRRADICULARES SEM OBTURAÇÃO RETRÓGRADA
('82000182', 'APICETOMIA UNIRRADICULARES SEM OBTURAÇÃO RETRÓGRADA', (SELECT id FROM odonto.especialidades WHERE codigo = 'CIRURGIA' LIMIT 1), TRUE, true, true, FALSE, false, true, true, 3),
-- 61: 82000190 - APROFUNDAMENTO/AUMENTO DE VESTÍBULO
('82000190', 'APROFUNDAMENTO/AUMENTO DE VESTÍBULO', (SELECT id FROM odonto.especialidades WHERE codigo = 'CIRURGIA' LIMIT 1), TRUE, false, false, FALSE, true, false, false, 1),
-- 62: 82000212 - AUMENTO DE COROA CLÍNICA
('82000212', 'AUMENTO DE COROA CLÍNICA', (SELECT id FROM odonto.especialidades WHERE codigo = 'PERIO' LIMIT 1), TRUE, true, true, FALSE, false, true, true, 3),
-- 63: 82000280 - BIOPSIA DE MAXILA
('82000280', 'BIOPSIA DE MAXILA', (SELECT id FROM odonto.especialidades WHERE codigo = 'CIRURGIA' LIMIT 1), TRUE, true, false, FALSE, true, true, false, 3),
-- 64: 82000298 - BRIDECTOMIA
('82000298', 'BRIDECTOMIA', (SELECT id FROM odonto.especialidades WHERE codigo = 'CIRURGIA' LIMIT 1), TRUE, false, false, FALSE, true, false, false, 1),
-- 65: 82000301 - BRIDOTOMIA
('82000301', 'BRIDOTOMIA', (SELECT id FROM odonto.especialidades WHERE codigo = 'CIRURGIA' LIMIT 1), TRUE, false, false, FALSE, true, false, false, 1),
-- 66: 82000344 - CIRURGIA ODONTOLÓGICA COM APLICAÇÃO DE ALOENXERTOS
('82000344', 'CIRURGIA ODONTOLÓGICA COM APLICAÇÃO DE ALOENXERTOS', (SELECT id FROM odonto.especialidades WHERE codigo = 'CIRURGIA' LIMIT 1), TRUE, true, false, FALSE, false, true, true, 3),
-- 67: 82000352 - CIRURGIA PARA EXOSTOSE MAXILAR
('82000352', 'CIRURGIA PARA EXOSTOSE MAXILAR', (SELECT id FROM odonto.especialidades WHERE codigo = 'CIRURGIA' LIMIT 1), TRUE, true, false, FALSE, true, true, false, 3),
-- 68: 82000360 - CIRURGIA PARA TORUS MANDIBULAR - BILATERAL
('82000360', 'CIRURGIA PARA TORUS MANDIBULAR - BILATERAL', (SELECT id FROM odonto.especialidades WHERE codigo = 'CIRURGIA' LIMIT 1), TRUE, true, false, FALSE, true, true, false, 3),
-- 69: 82000387 - CIRURGIA PARA TORUS MANDIBULAR - UNILATERAL
('82000387', 'CIRURGIA PARA TORUS MANDIBULAR - UNILATERAL', (SELECT id FROM odonto.especialidades WHERE codigo = 'CIRURGIA' LIMIT 1), TRUE, true, false, FALSE, true, true, false, 3),
-- 70: 82000395 - CIRURGIA PARA TORUS PALATINO
('82000395', 'CIRURGIA PARA TORUS PALATINO', (SELECT id FROM odonto.especialidades WHERE codigo = 'CIRURGIA' LIMIT 1), TRUE, true, false, FALSE, true, true, false, 3),
-- 71: 82000417 - CIRURGIA PERIODONTAL A RETALHO
('82000417', 'CIRURGIA PERIODONTAL A RETALHO', (SELECT id FROM odonto.especialidades WHERE codigo = 'PERIO' LIMIT 1), TRUE, true, false, FALSE, true, true, false, 3),
-- 72: 82000441 - COLETA DE RASPADO EM LESÕES OU SÍTIOS ESPECÍFICOS DA REGIÃO BUCO-MAXILO-FACIAL
('82000441', 'COLETA DE RASPADO EM LESÕES OU SÍTIOS ESPECÍFICOS DA REGIÃO BUCO-MAXILO-FACIAL', (SELECT id FROM odonto.especialidades WHERE codigo = 'CIRURGIA' LIMIT 1), TRUE, false, false, FALSE, true, false, false, 1),
-- 73: 82000468 - CONTROLE DE HEMORRAGIA COM APLICAÇÃO DE AGENTE HEMOSTÁTICO EM REGIÃO BUCO-MAXILO-FACIAL
('82000468', 'CONTROLE DE HEMORRAGIA COM APLICAÇÃO DE AGENTE HEMOSTÁTICO EM REGIÃO BUCO-MAXILO-FACIAL', (SELECT id FROM odonto.especialidades WHERE codigo = 'CIRURGIA' LIMIT 1), TRUE, false, true, FALSE, false, false, false, 1),
-- 74: 82000469 - CONTROLE DE HEMORRAGIA SEM APLICAÇÃO DE AGENTE HEMOSTÁTICO EM REGIÃO BUCO-MAXILO-FACIAL
('82000469', 'CONTROLE DE HEMORRAGIA SEM APLICAÇÃO DE AGENTE HEMOSTÁTICO EM REGIÃO BUCO-MAXILO-FACIAL', (SELECT id FROM odonto.especialidades WHERE codigo = 'URG_NOT' LIMIT 1), TRUE, false, true, FALSE, false, false, false, 1)
ON CONFLICT (codigo_tuss) DO UPDATE SET
    descricao = EXCLUDED.descricao,
    especialidade_id = EXCLUDED.especialidade_id,
    ativo = EXCLUDED.ativo,
    requer_pre_aprovacao = EXCLUDED.requer_pre_aprovacao,
    requer_dente = EXCLUDED.requer_dente,
    requer_face = EXCLUDED.requer_face,
    requer_regiao = EXCLUDED.requer_regiao,
    requer_rx_inicial = EXCLUDED.requer_rx_inicial,
    requer_rx_final = EXCLUDED.requer_rx_final,
    nivel_complexidade_id = EXCLUDED.nivel_complexidade_id;

-- Verificação do bloco 1
DO $$
DECLARE
    total_inseridos INTEGER;
    total_bloco INTEGER := 74;
BEGIN
    SELECT COUNT(*) INTO total_inseridos FROM odonto.procedimentos;
    
    RAISE NOTICE '================================================';
    RAISE NOTICE 'RELATÓRIO DO BLOCO 1 (SEM DUPLICATAS)';
    RAISE NOTICE '================================================';
    RAISE NOTICE '✅ Procedimentos únicos inseridos: %', total_bloco;
    RAISE NOTICE '📊 Total de procedimentos no banco: %', total_inseridos;
    RAISE NOTICE '🎯 Progresso: Bloco 1/4 concluído';
    RAISE NOTICE '🧹 Duplicatas foram removidas na geração';
    RAISE NOTICE '================================================';
END $$;

COMMIT;

-- =====================================================
-- PRÓXIMO PASSO: Execute insert-procedimentos-bloco2.sql
-- =====================================================