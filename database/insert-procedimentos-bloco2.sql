-- =====================================================
-- INSERÇÃO DE PROCEDIMENTOS - BLOCO 2/4 (SEM DUPLICATAS)
-- Data: 2025-07-01 (REGENERADO - duplicatas removidas)
-- Procedimentos: 75-148 (74 total)
-- Origem: Results.xlsx (excluindo duplicatas e 6 já inseridos)
-- =====================================================

BEGIN;

-- Inserir procedimentos do bloco 2 (sem duplicatas)
INSERT INTO odonto.procedimentos (
    codigo_tuss, descricao, especialidade_id, ativo,
    requer_pre_aprovacao, requer_dente, requer_face, requer_regiao,
    requer_rx_inicial, requer_rx_final, nivel_complexidade_id
) VALUES
-- 75: 82000484 - CONTROLE DE HEMORRAGIA SEM APLICAÇÃO DE AGENTE HEMOSTÁTICO EM REGIÃO BUCO-MAXILO-FACIAL
('82000484', 'CONTROLE DE HEMORRAGIA SEM APLICAÇÃO DE AGENTE HEMOSTÁTICO EM REGIÃO BUCO-MAXILO-FACIAL', (SELECT id FROM odonto.especialidades WHERE codigo = 'CIRURGIA' LIMIT 1), TRUE, false, true, FALSE, false, false, false, 1),
-- 76: 82000557 - CUNHA PROXIMAL
('82000557', 'CUNHA PROXIMAL', (SELECT id FROM odonto.especialidades WHERE codigo = 'PERIO' LIMIT 1), TRUE, false, true, FALSE, false, false, false, 1),
-- 77: 82000620 - ENXERTO COM OSSO LIOFILIZADO
('82000620', 'ENXERTO COM OSSO LIOFILIZADO', (SELECT id FROM odonto.especialidades WHERE codigo = 'IMPLANTE' LIMIT 1), TRUE, true, false, FALSE, true, true, true, 4),
-- 78: 82000646 - ENXERTO CONJUNTIVO SUBEPITELIAL
('82000646', 'ENXERTO CONJUNTIVO SUBEPITELIAL', (SELECT id FROM odonto.especialidades WHERE codigo = 'PERIO' LIMIT 1), TRUE, false, false, FALSE, true, false, false, 1),
-- 79: 82000662 - ENXERTO GENGIVAL LIVRE
('82000662', 'ENXERTO GENGIVAL LIVRE', (SELECT id FROM odonto.especialidades WHERE codigo = 'PERIO' LIMIT 1), TRUE, false, true, FALSE, false, false, false, 1),
-- 80: 82000689 - ENXERTO PEDICULADO
('82000689', 'ENXERTO PEDICULADO', (SELECT id FROM odonto.especialidades WHERE codigo = 'PERIO' LIMIT 1), TRUE, false, true, FALSE, false, false, false, 1),
-- 81: 82000700 - ESTABILIZAÇÃO DE PACIENTE POR MEIO DE CONTENÇÃO FÍSICA E/OU MECÂNICA
('82000700', 'ESTABILIZAÇÃO DE PACIENTE POR MEIO DE CONTENÇÃO FÍSICA E/OU MECÂNICA', (SELECT id FROM odonto.especialidades WHERE codigo = 'DIAGNOST' LIMIT 1), TRUE, false, false, FALSE, true, false, false, 1),
-- 82: 82000743 - EXÉRESE DE LIPOMA NA REGIÃO BUCO-MAXILO-FACIAL
('82000743', 'EXÉRESE DE LIPOMA NA REGIÃO BUCO-MAXILO-FACIAL', (SELECT id FROM odonto.especialidades WHERE codigo = 'CIRURGIA' LIMIT 1), TRUE, false, false, FALSE, false, false, false, 1),
-- 83: 82000778 - EXÉRESE OU EXCISÃO DE CÁLCULO SALIVAR
('82000778', 'EXÉRESE OU EXCISÃO DE CÁLCULO SALIVAR', (SELECT id FROM odonto.especialidades WHERE codigo = 'CIRURGIA' LIMIT 1), TRUE, false, false, FALSE, true, false, false, 1),
-- 84: 82000786 - EXÉRESE OU EXCISÃO DE CISTOS ODONTOLÓGICOS
('82000786', 'EXÉRESE OU EXCISÃO DE CISTOS ODONTOLÓGICOS', (SELECT id FROM odonto.especialidades WHERE codigo = 'CIRURGIA' LIMIT 1), TRUE, true, false, FALSE, false, true, true, 3),
-- 85: 82000794 - EXÉRESE OU EXCISÃO DE MUCOCELE
('82000794', 'EXÉRESE OU EXCISÃO DE MUCOCELE', (SELECT id FROM odonto.especialidades WHERE codigo = 'CIRURGIA' LIMIT 1), TRUE, false, false, FALSE, true, false, false, 1),
-- 86: 82000808 - EXÉRESE OU EXCISÃO DE RÂNULA
('82000808', 'EXÉRESE OU EXCISÃO DE RÂNULA', (SELECT id FROM odonto.especialidades WHERE codigo = 'CIRURGIA' LIMIT 1), TRUE, false, false, FALSE, true, false, false, 1),
-- 87: 82000816 - EXODONTIA A RETALHO
('82000816', 'EXODONTIA A RETALHO', (SELECT id FROM odonto.especialidades WHERE codigo = 'CIRURGIA' LIMIT 1), TRUE, true, true, FALSE, false, true, true, 3),
-- 88: 82000832 - EXODONTIA DE PERMANENTE POR INDICAÇÃO ORTODONTICA/PROTETICA
('82000832', 'EXODONTIA DE PERMANENTE POR INDICAÇÃO ORTODONTICA/PROTETICA', (SELECT id FROM odonto.especialidades WHERE codigo = 'CIRURGIA' LIMIT 1), TRUE, true, true, FALSE, false, true, true, 3),
-- 89: 82000859 - EXODONTIA DE RAIZ RESIDUAL
('82000859', 'EXODONTIA DE RAIZ RESIDUAL', (SELECT id FROM odonto.especialidades WHERE codigo = 'CIRURGIA' LIMIT 1), TRUE, true, true, FALSE, false, true, true, 3),
-- 90: 82000883 - FRENULECTOMIA LABIAL
('82000883', 'FRENULECTOMIA LABIAL', (SELECT id FROM odonto.especialidades WHERE codigo = 'CIRURGIA' LIMIT 1), TRUE, false, false, FALSE, true, false, false, 1),
-- 91: 82000891 - FRENULECTOMIA LINGUAL
('82000891', 'FRENULECTOMIA LINGUAL', (SELECT id FROM odonto.especialidades WHERE codigo = 'CIRURGIA' LIMIT 1), TRUE, false, false, FALSE, true, false, false, 1),
-- 92: 82000905 - FRENULOTOMIA LABIAL
('82000905', 'FRENULOTOMIA LABIAL', (SELECT id FROM odonto.especialidades WHERE codigo = 'CIRURGIA' LIMIT 1), TRUE, false, false, FALSE, false, false, false, 1),
-- 93: 82000913 - FRENULOTOMIA LINGUAL
('82000913', 'FRENULOTOMIA LINGUAL', (SELECT id FROM odonto.especialidades WHERE codigo = 'CIRURGIA' LIMIT 1), TRUE, false, false, FALSE, false, false, false, 1),
-- 94: 82000921 - GENGIVECTOMIA
('82000921', 'GENGIVECTOMIA', (SELECT id FROM odonto.especialidades WHERE codigo = 'PERIO' LIMIT 1), TRUE, false, false, FALSE, true, false, false, 1),
-- 95: 82000948 - GENGIVOPLASTIA
('82000948', 'GENGIVOPLASTIA', (SELECT id FROM odonto.especialidades WHERE codigo = 'PERIO' LIMIT 1), TRUE, false, false, FALSE, true, false, false, 1),
-- 96: 82000980 - IMPLANTE ÓSSEO INTEGRADO
('82000980', 'IMPLANTE ÓSSEO INTEGRADO', (SELECT id FROM odonto.especialidades WHERE codigo = 'IMPLANTE' LIMIT 1), TRUE, true, true, FALSE, false, true, true, 4),
-- 97: 82001022 - INCISÃO E DRENAGEM EXTRA-ORAL DE ABSCESSO, HEMATOMA E/OU FLEGMÃO DA REGIÃO BUCO-MAXILO-FACIAL
('82001022', 'INCISÃO E DRENAGEM EXTRA-ORAL DE ABSCESSO, HEMATOMA E/OU FLEGMÃO DA REGIÃO BUCO-MAXILO-FACIAL', (SELECT id FROM odonto.especialidades WHERE codigo = 'CIRURGIA' LIMIT 1), TRUE, false, false, FALSE, true, false, false, 1),
-- 98: 82001030 - INCISÃO E DRENAGEM INTRA-ORAL DE ABSCESSO, HEMATOMA E/OU FLEGMÃO DA REGIÃO BUCO-MAXILO-FACIAL
('82001030', 'INCISÃO E DRENAGEM INTRA-ORAL DE ABSCESSO, HEMATOMA E/OU FLEGMÃO DA REGIÃO BUCO-MAXILO-FACIAL', (SELECT id FROM odonto.especialidades WHERE codigo = 'CIRURGIA' LIMIT 1), TRUE, true, false, FALSE, true, true, false, 3),
-- 99: 82001049 - LEVANTAMENTO DO SEIO MAXILAR COM OSSO AUTÓGENO
('82001049', 'LEVANTAMENTO DO SEIO MAXILAR COM OSSO AUTÓGENO', (SELECT id FROM odonto.especialidades WHERE codigo = 'IMPLANTE' LIMIT 1), TRUE, true, false, FALSE, true, true, true, 4),
-- 100: 82001073 - ODONTO-SECÇÃO
('82001073', 'ODONTO-SECÇÃO', (SELECT id FROM odonto.especialidades WHERE codigo = 'CIRURGIA' LIMIT 1), TRUE, true, true, FALSE, false, true, true, 3),
-- 101: 82001103 - PUNÇÃO ASPIRATIVA NA REGIAO BUCO-MAXILO-FACIAL
('82001103', 'PUNÇÃO ASPIRATIVA NA REGIAO BUCO-MAXILO-FACIAL', (SELECT id FROM odonto.especialidades WHERE codigo = 'CIRURGIA' LIMIT 1), TRUE, false, false, FALSE, true, false, false, 1),
-- 102: 82001138 - REABERTURA - COLOCAÇÃO DE CICATRIZADOR
('82001138', 'REABERTURA - COLOCAÇÃO DE CICATRIZADOR', (SELECT id FROM odonto.especialidades WHERE codigo = 'IMPLANTE' LIMIT 1), TRUE, true, true, FALSE, false, true, true, 4),
-- 103: 82001170 - REDUÇÃO CRUENTA DE FRATURA ALVÉOLO DENTÁRIA
('82001170', 'REDUÇÃO CRUENTA DE FRATURA ALVÉOLO DENTÁRIA', (SELECT id FROM odonto.especialidades WHERE codigo = 'CIRURGIA' LIMIT 1), TRUE, true, false, FALSE, false, true, true, 3),
-- 104: 82001189 - REDUÇÃO INCRUENTA DE FRATURA ALVÉOLO DENTÁRIA
('82001189', 'REDUÇÃO INCRUENTA DE FRATURA ALVÉOLO DENTÁRIA', (SELECT id FROM odonto.especialidades WHERE codigo = 'CIRURGIA' LIMIT 1), TRUE, true, false, FALSE, false, true, true, 3),
-- 105: 82001197 - REDUÇÃO SIMPLES DE LUXAÇÃO DE ARTICULAÇÃO TÊMPORO-MANDIBULAR (ATM)
('82001197', 'REDUÇÃO SIMPLES DE LUXAÇÃO DE ARTICULAÇÃO TÊMPORO-MANDIBULAR (ATM)', (SELECT id FROM odonto.especialidades WHERE codigo = 'DTM' LIMIT 1), TRUE, false, false, FALSE, true, false, false, 1),
-- 106: 82001251 - REIMPLANTE DENTÁRIO COM CONTENÇÃO
('82001251', 'REIMPLANTE DENTÁRIO COM CONTENÇÃO', (SELECT id FROM odonto.especialidades WHERE codigo = 'URG_DIURNA' LIMIT 1), TRUE, true, true, FALSE, false, true, false, 3),
-- 107: 82001286 - REMOÇÃO DE DENTES INCLUSOS / IMPACTADOS
('82001286', 'REMOÇÃO DE DENTES INCLUSOS / IMPACTADOS', (SELECT id FROM odonto.especialidades WHERE codigo = 'CIRURGIA' LIMIT 1), TRUE, true, true, FALSE, false, true, true, 3),
-- 108: 82001294 - REMOÇÃO DE DENTES SEMI-INCLUSOS / IMPACTADOS
('82001294', 'REMOÇÃO DE DENTES SEMI-INCLUSOS / IMPACTADOS', (SELECT id FROM odonto.especialidades WHERE codigo = 'CIRURGIA' LIMIT 1), TRUE, true, true, FALSE, false, true, true, 3),
-- 109: 82001308 - REMOÇÃO DE DRENO EXTRA-ORAL
('82001308', 'REMOÇÃO DE DRENO EXTRA-ORAL', (SELECT id FROM odonto.especialidades WHERE codigo = 'CIRURGIA' LIMIT 1), TRUE, false, false, FALSE, false, false, false, 1),
-- 110: 82001316 - REMOÇÃO DE DRENO INTRA-ORAL
('82001316', 'REMOÇÃO DE DRENO INTRA-ORAL', (SELECT id FROM odonto.especialidades WHERE codigo = 'CIRURGIA' LIMIT 1), TRUE, false, false, FALSE, false, false, false, 1),
-- 111: 82001324 - REMOÇÃO DE IMPLANTE DENTÁRIO NÃO ÓSSEO INTEGRADO
('82001324', 'REMOÇÃO DE IMPLANTE DENTÁRIO NÃO ÓSSEO INTEGRADO', (SELECT id FROM odonto.especialidades WHERE codigo = 'IMPLANTE' LIMIT 1), TRUE, true, true, FALSE, false, true, true, 4),
-- 112: 82001367 - REMOÇÃO DE ODONTOMA
('82001367', 'REMOÇÃO DE ODONTOMA', (SELECT id FROM odonto.especialidades WHERE codigo = 'CIRURGIA' LIMIT 1), TRUE, true, false, FALSE, false, true, true, 3),
-- 113: 82001391 - RETIRADA DE CORPO ESTRANHO OROANTRAL OU ORONASAL DA REGIÃO BUCO-MAXILO-FACIAL
('82001391', 'RETIRADA DE CORPO ESTRANHO OROANTRAL OU ORONASAL DA REGIÃO BUCO-MAXILO-FACIAL', (SELECT id FROM odonto.especialidades WHERE codigo = 'CIRURGIA' LIMIT 1), TRUE, true, false, FALSE, true, true, true, 3),
-- 114: 82001413 - RETIRADA DE CORPO ESTRANHO SUBCUTÂNEO OU SUBMUCOSO DA REGIÃO BUCO-MAXILO-FACIAL
('82001413', 'RETIRADA DE CORPO ESTRANHO SUBCUTÂNEO OU SUBMUCOSO DA REGIÃO BUCO-MAXILO-FACIAL', (SELECT id FROM odonto.especialidades WHERE codigo = 'CIRURGIA' LIMIT 1), TRUE, false, false, FALSE, false, false, false, 1),
-- 115: 82001448 - SEDAÇÃO CONSCIENTE COM ÓXIDO NITROSO E OXIGÊNIO EM ODONTOLOGIA
('82001448', 'SEDAÇÃO CONSCIENTE COM ÓXIDO NITROSO E OXIGÊNIO EM ODONTOLOGIA', (SELECT id FROM odonto.especialidades WHERE codigo = 'DIAGNOST' LIMIT 1), TRUE, false, false, FALSE, true, false, false, 1),
-- 116: 82001456 - SEDAÇÃO MEDICAMENTOSA AMBULATORIAL EM ODONTOLOGIA
('82001456', 'SEDAÇÃO MEDICAMENTOSA AMBULATORIAL EM ODONTOLOGIA', (SELECT id FROM odonto.especialidades WHERE codigo = 'DIAGNOST' LIMIT 1), TRUE, false, false, FALSE, true, false, false, 1),
-- 117: 82001464 - SEPULTAMENTO RADICULAR
('82001464', 'SEPULTAMENTO RADICULAR', (SELECT id FROM odonto.especialidades WHERE codigo = 'PERIO' LIMIT 1), TRUE, true, true, FALSE, false, true, true, 3),
-- 118: 82001499 - SUTURA DE FERIDA EM REGIÃO BUCO-MAXILO-FACIAL
('82001499', 'SUTURA DE FERIDA EM REGIÃO BUCO-MAXILO-FACIAL', (SELECT id FROM odonto.especialidades WHERE codigo = 'CIRURGIA' LIMIT 1), TRUE, false, false, FALSE, true, false, false, 1),
-- 119: 82001502 - TRACIONAMENTO CIRÚRGICO COM FINALIDADE ORTODÔNTICA
('82001502', 'TRACIONAMENTO CIRÚRGICO COM FINALIDADE ORTODÔNTICA', (SELECT id FROM odonto.especialidades WHERE codigo = 'CIRURGIA' LIMIT 1), TRUE, true, true, FALSE, false, true, true, 3),
-- 120: 82001510 - TRATAMENTO CIRURGICO DAS FISTULAS BUCO NASAL
('82001510', 'TRATAMENTO CIRURGICO DAS FISTULAS BUCO NASAL', (SELECT id FROM odonto.especialidades WHERE codigo = 'CIRURGIA' LIMIT 1), TRUE, true, false, FALSE, false, true, true, 3),
-- 121: 82001529 - TRATAMENTO CIRÚRGICO DAS FÍSTULAS BUCO SINUSAL
('82001529', 'TRATAMENTO CIRÚRGICO DAS FÍSTULAS BUCO SINUSAL', (SELECT id FROM odonto.especialidades WHERE codigo = 'CIRURGIA' LIMIT 1), TRUE, true, false, FALSE, false, true, true, 3),
-- 122: 82001545 - TRATAMENTO CIRÚRGICO DE BRIDAS CONSTRITIVAS DA REGIÃO BUCO-MAXILO-FACIAL
('82001545', 'TRATAMENTO CIRÚRGICO DE BRIDAS CONSTRITIVAS DA REGIÃO BUCO-MAXILO-FACIAL', (SELECT id FROM odonto.especialidades WHERE codigo = 'CIRURGIA' LIMIT 1), TRUE, false, false, FALSE, true, false, false, 1),
-- 123: 82001553 - TRATAMENTO CIRÚRGICO DE HIPERPLASIAS DE TECIDOS MOLES NA REGIÃO BUCO-MAXILO-FACIAL
('82001553', 'TRATAMENTO CIRÚRGICO DE HIPERPLASIAS DE TECIDOS MOLES NA REGIÃO BUCO-MAXILO-FACIAL', (SELECT id FROM odonto.especialidades WHERE codigo = 'CIRURGIA' LIMIT 1), TRUE, false, false, FALSE, false, false, false, 1),
-- 124: 82001588 - TRATAMENTO CIRURGICO DE HIPERPLASIAS DE TECIDOS OSSEOS/CARTILAGINOSOS NA REGIAO BUCO-MAXILO-FACIAL
('82001588', 'TRATAMENTO CIRURGICO DE HIPERPLASIAS DE TECIDOS OSSEOS/CARTILAGINOSOS NA REGIAO BUCO-MAXILO-FACIAL', (SELECT id FROM odonto.especialidades WHERE codigo = 'CIRURGIA' LIMIT 1), TRUE, true, false, FALSE, false, true, true, 3),
-- 125: 82001596 - TRATAMENT CIRÚRGICO DE TUMORES BENIGNOS DE TECIDOS ÓSSEOS/CARTILAGINOSOS NA REGIÃO BUCO-MAXILO-FACIAL
('82001596', 'TRATAMENT CIRÚRGICO DE TUMORES BENIGNOS DE TECIDOS ÓSSEOS/CARTILAGINOSOS NA REGIÃO BUCO-MAXILO-FACIAL', (SELECT id FROM odonto.especialidades WHERE codigo = 'CIRURGIA' LIMIT 1), TRUE, true, false, FALSE, true, true, true, 3),
-- 126: 82001618 - TRATAMENTO CIRÚRGICO DOS TUMORES BENIGNOS DE TECIDOS MOLES NA REGIÃO BUCO-MAXILO-FACIAL
('82001618', 'TRATAMENTO CIRÚRGICO DOS TUMORES BENIGNOS DE TECIDOS MOLES NA REGIÃO BUCO-MAXILO-FACIAL', (SELECT id FROM odonto.especialidades WHERE codigo = 'CIRURGIA' LIMIT 1), TRUE, false, false, FALSE, false, false, false, 1),
-- 127: 82001634 - TRATAMENTO CIRÚRGICO PARA TUMORES ODONTOGÊNICOS BENIGNOS - SEM RECONSTRUÇÃO
('82001634', 'TRATAMENTO CIRÚRGICO PARA TUMORES ODONTOGÊNICOS BENIGNOS - SEM RECONSTRUÇÃO', (SELECT id FROM odonto.especialidades WHERE codigo = 'CIRURGIA' LIMIT 1), TRUE, true, false, FALSE, true, true, true, 3),
-- 128: 82001642 - TRATAMENTO CONSERVADOR DE LUXAÇÃO DA ARTICULAÇÃO TÊMPORO-MANDIBULAR - ATM
('82001642', 'TRATAMENTO CONSERVADOR DE LUXAÇÃO DA ARTICULAÇÃO TÊMPORO-MANDIBULAR - ATM', (SELECT id FROM odonto.especialidades WHERE codigo = 'DTM' LIMIT 1), TRUE, false, false, FALSE, false, false, false, 1),
-- 129: 82001650 - TRATAMENTO DE ALVEOLITE
('82001650', 'TRATAMENTO DE ALVEOLITE', (SELECT id FROM odonto.especialidades WHERE codigo = 'URG_DIURNA' LIMIT 1), TRUE, true, true, FALSE, false, true, false, 3),
-- 130: 82001707 - ULECTOMIA 2
('82001707', 'ULECTOMIA 2', (SELECT id FROM odonto.especialidades WHERE codigo = 'CIRURGIA' LIMIT 1), TRUE, false, true, FALSE, false, false, false, 1),
-- 131: 82001715 - ULOTOMIA
('82001715', 'ULOTOMIA', (SELECT id FROM odonto.especialidades WHERE codigo = 'CIRURGIA' LIMIT 1), TRUE, false, true, FALSE, false, false, false, 1),
-- 132: 82001723 - APLICAÇÃO DE LASER PÓS CIRÚRGICO
('82001723', 'APLICAÇÃO DE LASER PÓS CIRÚRGICO', (SELECT id FROM odonto.especialidades WHERE codigo = 'CIRURGIA' LIMIT 1), TRUE, false, false, FALSE, true, false, false, 1),
-- 133: 82001731 - EXODONTIA DE SEMI-INCLUSO/IMPACTADO SUPRA NUMERÁRIO
('82001731', 'EXODONTIA DE SEMI-INCLUSO/IMPACTADO SUPRA NUMERÁRIO', (SELECT id FROM odonto.especialidades WHERE codigo = 'CIRURGIA' LIMIT 1), TRUE, true, true, FALSE, false, true, true, 3),
-- 134: 82001740 - EXODONTIA DE INCLUSO/IMPACTADO SUPRA NUMERÁRIO
('82001740', 'EXODONTIA DE INCLUSO/IMPACTADO SUPRA NUMERÁRIO', (SELECT id FROM odonto.especialidades WHERE codigo = 'CIRURGIA' LIMIT 1), TRUE, true, true, FALSE, false, true, true, 3),
-- 135: 82001758 - MARSUPIALIZAÇÃO DE CISTOS ODONTOLÓGICOS
('82001758', 'MARSUPIALIZAÇÃO DE CISTOS ODONTOLÓGICOS', (SELECT id FROM odonto.especialidades WHERE codigo = 'CIRURGIA' LIMIT 1), TRUE, true, false, FALSE, false, true, true, 3),
-- 136: 82001766 - PLACA DE CONTENÇÃO CIRÚRGICA
('82001766', 'PLACA DE CONTENÇÃO CIRÚRGICA', (SELECT id FROM odonto.especialidades WHERE codigo = 'DIAGNOST' LIMIT 1), TRUE, false, false, FALSE, false, false, false, 1),
-- 137: 83000020 - COROA DE ACETATO EM DENTE DECÍDUO
('83000020', 'COROA DE ACETATO EM DENTE DECÍDUO', (SELECT id FROM odonto.especialidades WHERE codigo = 'ODONTOP' LIMIT 1), TRUE, true, true, FALSE, false, true, true, 3),
-- 138: 83000046 - COROA DE ACO EM DENTE DECIDUO
('83000046', 'COROA DE ACO EM DENTE DECIDUO', (SELECT id FROM odonto.especialidades WHERE codigo = 'ODONTOP' LIMIT 1), TRUE, true, true, FALSE, false, true, true, 3),
-- 139: 83000062 - COROA DE POLICARBONATO EM DENTE DECIDUO
('83000062', 'COROA DE POLICARBONATO EM DENTE DECIDUO', (SELECT id FROM odonto.especialidades WHERE codigo = 'ODONTOP' LIMIT 1), TRUE, true, true, FALSE, false, true, true, 3),
-- 140: 83000089 - EXODONTIA SIMPLES DE DECÍDUO
('83000089', 'EXODONTIA SIMPLES DE DECÍDUO', (SELECT id FROM odonto.especialidades WHERE codigo = 'ODONTOP' LIMIT 1), TRUE, false, true, FALSE, false, false, false, 1),
-- 141: 83000097 - MANTENEDOR DE ESPAÇO FIXO
('83000097', 'MANTENEDOR DE ESPAÇO FIXO', (SELECT id FROM odonto.especialidades WHERE codigo = 'ODONTOP' LIMIT 1), TRUE, false, false, FALSE, true, false, false, 1),
-- 142: 83000100 - MANTENEDOR DE ESPAÇO REMOVÍVEL
('83000100', 'MANTENEDOR DE ESPAÇO REMOVÍVEL', (SELECT id FROM odonto.especialidades WHERE codigo = 'ODONTOP' LIMIT 1), TRUE, false, false, FALSE, true, false, false, 1),
-- 143: 83000127 - PULPOTOMIA EM DENTE DECIDUO
('83000127', 'PULPOTOMIA EM DENTE DECIDUO', (SELECT id FROM odonto.especialidades WHERE codigo = 'ODONTOP' LIMIT 1), TRUE, true, true, FALSE, false, true, true, 3),
-- 144: 83000135 - RESTAURAÇÃO ATRAUMÁTICA EM DENTE DECÍDUO
('83000135', 'RESTAURAÇÃO ATRAUMÁTICA EM DENTE DECÍDUO', (SELECT id FROM odonto.especialidades WHERE codigo = 'ODONTOP' LIMIT 1), TRUE, false, true, FALSE, false, false, false, 1),
-- 145: 83000151 - TRATAMENTO ENDODÔNTICO EM DENTE DECÍDUO
('83000151', 'TRATAMENTO ENDODÔNTICO EM DENTE DECÍDUO', (SELECT id FROM odonto.especialidades WHERE codigo = 'ODONTOP' LIMIT 1), TRUE, true, true, FALSE, false, true, true, 3),
-- 146: 84000031 - APLICAÇÃO DE CARIOSTÁTICO
('84000031', 'APLICAÇÃO DE CARIOSTÁTICO', (SELECT id FROM odonto.especialidades WHERE codigo = 'ODONTOP' LIMIT 1), TRUE, false, true, FALSE, false, false, false, 1),
-- 147: 84000074 - APLICAÇÃO DE SELANTE DE FÓSSULAS E FISSURAS
('84000074', 'APLICAÇÃO DE SELANTE DE FÓSSULAS E FISSURAS', (SELECT id FROM odonto.especialidades WHERE codigo = 'ODONTOP' LIMIT 1), TRUE, false, true, FALSE, false, false, false, 1),
-- 148: 84000112 - APLICAÇÃO TÓPICA DE VERNIZ FLUORETADO
('84000112', 'APLICAÇÃO TÓPICA DE VERNIZ FLUORETADO', (SELECT id FROM odonto.especialidades WHERE codigo = 'ODONTOP' LIMIT 1), TRUE, false, true, FALSE, false, false, false, 1)
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

-- Verificação do bloco 2
DO $$
DECLARE
    total_inseridos INTEGER;
    total_bloco INTEGER := 74;
BEGIN
    SELECT COUNT(*) INTO total_inseridos FROM odonto.procedimentos;
    
    RAISE NOTICE '================================================';
    RAISE NOTICE 'RELATÓRIO DO BLOCO 2 (SEM DUPLICATAS)';
    RAISE NOTICE '================================================';
    RAISE NOTICE '✅ Procedimentos únicos inseridos: %', total_bloco;
    RAISE NOTICE '📊 Total de procedimentos no banco: %', total_inseridos;
    RAISE NOTICE '🎯 Progresso: Bloco 2/4 concluído';
    RAISE NOTICE '🧹 Duplicatas foram removidas na geração';
    RAISE NOTICE '================================================';
END $$;

COMMIT;

-- =====================================================
-- PRÓXIMO PASSO: Execute insert-procedimentos-bloco3.sql
-- =====================================================