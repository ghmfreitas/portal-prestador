-- =====================================================
-- INSERÇÃO DE PROCEDIMENTOS - BLOCO 3/4 (SEM DUPLICATAS)
-- Data: 2025-07-01 (REGENERADO - duplicatas removidas)
-- Procedimentos: 149-222 (74 total)
-- Origem: Results.xlsx (excluindo duplicatas e 6 já inseridos)
-- =====================================================

BEGIN;

-- Inserir procedimentos do bloco 3 (sem duplicatas)
INSERT INTO odonto.procedimentos (
    codigo_tuss, descricao, especialidade_id, ativo,
    requer_pre_aprovacao, requer_dente, requer_face, requer_regiao,
    requer_rx_inicial, requer_rx_final, nivel_complexidade_id
) VALUES
-- 149: 84000201 - REMINERALIZAÇÃO
('84000201', 'REMINERALIZAÇÃO', (SELECT id FROM odonto.especialidades WHERE codigo = 'ODONTOP' LIMIT 1), TRUE, false, false, FALSE, true, false, false, 1),
-- 150: 84000228 - TESTE DE CAPACIDADE TAMPÃO DA SALIVA
('84000228', 'TESTE DE CAPACIDADE TAMPÃO DA SALIVA', (SELECT id FROM odonto.especialidades WHERE codigo = 'DIAGNOST' LIMIT 1), TRUE, false, false, FALSE, true, false, false, 1),
-- 151: 84000236 - TESTE DE CONTAGEM MICROBIOLÓGICA
('84000236', 'TESTE DE CONTAGEM MICROBIOLÓGICA', (SELECT id FROM odonto.especialidades WHERE codigo = 'DIAGNOST' LIMIT 1), TRUE, false, false, FALSE, false, false, false, 1),
-- 152: 84000252 - TESTE DE PH SALIVAR
('84000252', 'TESTE DE PH SALIVAR', (SELECT id FROM odonto.especialidades WHERE codigo = 'DIAGNOST' LIMIT 1), TRUE, false, false, FALSE, true, false, false, 1),
-- 153: 85000787 - IMOBILIZAÇÃO DENTÁRIA EM DENTES DECÍDUOS
('85000787', 'IMOBILIZAÇÃO DENTÁRIA EM DENTES DECÍDUOS', (SELECT id FROM odonto.especialidades WHERE codigo = 'ODONTOP' LIMIT 1), TRUE, false, false, FALSE, false, false, false, 1),
-- 154: 85100013 - CAPEAMENTO PULPAR DIRETO
('85100013', 'CAPEAMENTO PULPAR DIRETO', (SELECT id FROM odonto.especialidades WHERE codigo = 'ENDO' LIMIT 1), TRUE, true, true, FALSE, false, true, false, 3),
-- 155: 85100021 - CLAREAMENTO DENTÁRIO CASEIRO
('85100021', 'CLAREAMENTO DENTÁRIO CASEIRO', (SELECT id FROM odonto.especialidades WHERE codigo = 'ESTETICA' LIMIT 1), TRUE, false, false, FALSE, true, false, false, 1),
-- 156: 85100030 - CLAREAMENTO DENTÁRIO DE CONSULTÓRIO - A LASER
('85100030', 'CLAREAMENTO DENTÁRIO DE CONSULTÓRIO - A LASER', (SELECT id FROM odonto.especialidades WHERE codigo = 'ESTETICA' LIMIT 1), TRUE, false, false, FALSE, true, false, false, 1),
-- 157: 85100048 - COLAGEM DE FRAGMENTOS DENTÁRIOS
('85100048', 'COLAGEM DE FRAGMENTOS DENTÁRIOS', (SELECT id FROM odonto.especialidades WHERE codigo = 'URG_DIURNA' LIMIT 1), TRUE, true, true, FALSE, false, true, false, 3),
-- 158: 85100056 - CURATIVO DE DEMORA EM ENDODONTIA
('85100056', 'CURATIVO DE DEMORA EM ENDODONTIA', (SELECT id FROM odonto.especialidades WHERE codigo = 'ENDO' LIMIT 1), TRUE, true, true, FALSE, false, true, false, 3),
-- 159: 85100064 - FACETA DIRETA EM RESINA FOTOPOLIMERIZÁVEL
('85100064', 'FACETA DIRETA EM RESINA FOTOPOLIMERIZÁVEL', (SELECT id FROM odonto.especialidades WHERE codigo = 'DENT' LIMIT 1), TRUE, true, true, FALSE, false, true, true, 3),
-- 160: 85100072 - PLACA DE ACETATO PARA CLAREAMENTO CASEIRO
('85100072', 'PLACA DE ACETATO PARA CLAREAMENTO CASEIRO', (SELECT id FROM odonto.especialidades WHERE codigo = 'ESTETICA' LIMIT 1), TRUE, false, false, FALSE, true, false, false, 1),
-- 161: 85100099 - RESTAURAÇÃO DE AMÁLGAMA - 1 FACE
('85100099', 'RESTAURAÇÃO DE AMÁLGAMA - 1 FACE', (SELECT id FROM odonto.especialidades WHERE codigo = 'DENT' LIMIT 1), TRUE, false, true, FALSE, false, false, false, 1),
-- 162: 85100102 - RESTAURAÇÃO DE AMÁLGAMA - 2 FACES
('85100102', 'RESTAURAÇÃO DE AMÁLGAMA - 2 FACES', (SELECT id FROM odonto.especialidades WHERE codigo = 'DENT' LIMIT 1), TRUE, false, true, FALSE, false, false, false, 1),
-- 163: 85100110 - RESTAURAÇÃO DE AMÁLGAMA - 3 FACES
('85100110', 'RESTAURAÇÃO DE AMÁLGAMA - 3 FACES', (SELECT id FROM odonto.especialidades WHERE codigo = 'DENT' LIMIT 1), TRUE, false, true, FALSE, false, false, false, 1),
-- 164: 85100129 - RESTAURAÇÃO DE AMÁLGAMA - 4 FACES
('85100129', 'RESTAURAÇÃO DE AMÁLGAMA - 4 FACES', (SELECT id FROM odonto.especialidades WHERE codigo = 'DENT' LIMIT 1), TRUE, false, true, FALSE, false, false, false, 1),
-- 165: 85100137 - RESTAURAÇÃO EM IONÔMERO DE VIDRO - 1 FACE
('85100137', 'RESTAURAÇÃO EM IONÔMERO DE VIDRO - 1 FACE', (SELECT id FROM odonto.especialidades WHERE codigo = 'DENT' LIMIT 1), TRUE, false, true, FALSE, false, false, false, 1),
-- 166: 85100145 - RESTAURAÇÃO EM IONÔMERO DE VIDRO - 2 FACES
('85100145', 'RESTAURAÇÃO EM IONÔMERO DE VIDRO - 2 FACES', (SELECT id FROM odonto.especialidades WHERE codigo = 'DENT' LIMIT 1), TRUE, false, true, FALSE, false, false, false, 1),
-- 167: 85100153 - RESTAURAÇÃO EM IONÔMERO DE VIDRO - 3 FACES
('85100153', 'RESTAURAÇÃO EM IONÔMERO DE VIDRO - 3 FACES', (SELECT id FROM odonto.especialidades WHERE codigo = 'DENT' LIMIT 1), TRUE, false, true, FALSE, false, false, false, 1),
-- 168: 85100161 - RESTAURAÇÃO EM IONÔMERO DE VIDRO - 4 FACES
('85100161', 'RESTAURAÇÃO EM IONÔMERO DE VIDRO - 4 FACES', (SELECT id FROM odonto.especialidades WHERE codigo = 'DENT' LIMIT 1), TRUE, false, true, FALSE, false, false, false, 1),
-- 169: 85100170 - RESTAURAÇÃO EM RESINA (INDIRETA) - INLAY
('85100170', 'RESTAURAÇÃO EM RESINA (INDIRETA) - INLAY', (SELECT id FROM odonto.especialidades WHERE codigo = 'PROTESE' LIMIT 1), TRUE, true, true, FALSE, false, true, true, 3),
-- 170: 85100200 - RESTAURAÇÃO EM RESINA FOTOPOLIMERIZÁVEL 2 FACES
('85100200', 'RESTAURAÇÃO EM RESINA FOTOPOLIMERIZÁVEL 2 FACES', (SELECT id FROM odonto.especialidades WHERE codigo = 'DENT' LIMIT 1), TRUE, false, true, FALSE, false, false, false, 1),
-- 171: 85100218 - RESTAURAÇÃO EM RESINA FOTOPOLIMERIZÁVEL 3 FACES
('85100218', 'RESTAURAÇÃO EM RESINA FOTOPOLIMERIZÁVEL 3 FACES', (SELECT id FROM odonto.especialidades WHERE codigo = 'DENT' LIMIT 1), TRUE, false, true, FALSE, false, false, false, 1),
-- 172: 85100226 - RESTAURAÇÃO EM RESINA FOTOPOLIMERIZÁVEL 4 FACES
('85100226', 'RESTAURAÇÃO EM RESINA FOTOPOLIMERIZÁVEL 4 FACES', (SELECT id FROM odonto.especialidades WHERE codigo = 'DENT' LIMIT 1), TRUE, false, true, FALSE, false, false, false, 1),
-- 173: 85100234 - TRATAMENTO DE FLUOROSE - MICROABRASÃO
('85100234', 'TRATAMENTO DE FLUOROSE - MICROABRASÃO', (SELECT id FROM odonto.especialidades WHERE codigo = 'DENT' LIMIT 1), TRUE, false, true, FALSE, false, false, false, 1),
-- 174: 85100242 - ADEQUAÇÃO DE MEIO
('85100242', 'ADEQUAÇÃO DE MEIO', (SELECT id FROM odonto.especialidades WHERE codigo = 'ODONTOP' LIMIT 1), TRUE, false, false, FALSE, true, false, false, 1),
-- 175: 85100250 - APLICAÇÃO DE LASER TERAPÊUTICO
('85100250', 'APLICAÇÃO DE LASER TERAPÊUTICO', (SELECT id FROM odonto.especialidades WHERE codigo = 'DIAGNOST' LIMIT 1), TRUE, false, false, FALSE, true, false, false, 1),
-- 176: 85200018 - CLAREAMENTO DE DENTE DESVITALIZADO
('85200018', 'CLAREAMENTO DE DENTE DESVITALIZADO', (SELECT id FROM odonto.especialidades WHERE codigo = 'ENDO' LIMIT 1), TRUE, true, true, FALSE, false, true, false, 3),
-- 177: 85200026 - PREPARO PARA NÚCLEO INTRARRADICULAR
('85200026', 'PREPARO PARA NÚCLEO INTRARRADICULAR', (SELECT id FROM odonto.especialidades WHERE codigo = 'ENDO' LIMIT 1), TRUE, true, true, FALSE, false, true, true, 3),
-- 178: 85200034 - PULPECTOMIA
('85200034', 'PULPECTOMIA', (SELECT id FROM odonto.especialidades WHERE codigo = 'ENDO' LIMIT 1), TRUE, true, true, FALSE, false, true, true, 3),
-- 179: 85200042 - PULPOTOMIA
('85200042', 'PULPOTOMIA', (SELECT id FROM odonto.especialidades WHERE codigo = 'ENDO' LIMIT 1), TRUE, true, true, FALSE, false, true, true, 3),
-- 180: 85200050 - REMOÇÃO DE CORPO ESTRANHO INTRACANAL
('85200050', 'REMOÇÃO DE CORPO ESTRANHO INTRACANAL', (SELECT id FROM odonto.especialidades WHERE codigo = 'ENDO' LIMIT 1), TRUE, true, true, FALSE, false, true, true, 3),
-- 181: 85200077 - REMOÇÃO DE NÚCLEO INTRARRADICULAR
('85200077', 'REMOÇÃO DE NÚCLEO INTRARRADICULAR', (SELECT id FROM odonto.especialidades WHERE codigo = 'ENDO' LIMIT 1), TRUE, true, true, FALSE, false, true, true, 3),
-- 182: 85200093 - RETRATAMENTO ENDODÔNTICO BIRRADICULAR
('85200093', 'RETRATAMENTO ENDODÔNTICO BIRRADICULAR', (SELECT id FROM odonto.especialidades WHERE codigo = 'ENDO' LIMIT 1), TRUE, true, true, FALSE, false, true, true, 3),
-- 183: 85200107 - RETRATAMENTO ENDODÔNTICO MULTIRRADICULAR
('85200107', 'RETRATAMENTO ENDODÔNTICO MULTIRRADICULAR', (SELECT id FROM odonto.especialidades WHERE codigo = 'ENDO' LIMIT 1), TRUE, true, true, FALSE, false, true, true, 3),
-- 184: 85200115 - RETRATAMENTO ENDODÔNTICO UNIRRADICULAR
('85200115', 'RETRATAMENTO ENDODÔNTICO UNIRRADICULAR', (SELECT id FROM odonto.especialidades WHERE codigo = 'ENDO' LIMIT 1), TRUE, true, true, FALSE, false, true, true, 3),
-- 185: 85200123 - TRATAMENTO DE PERFURAÇÃO ENDODÔNTICA
('85200123', 'TRATAMENTO DE PERFURAÇÃO ENDODÔNTICA', (SELECT id FROM odonto.especialidades WHERE codigo = 'ENDO' LIMIT 1), TRUE, true, true, FALSE, false, true, true, 3),
-- 186: 85200131 - TRATAMENTO ENDODÔNDICO DE DENTE COM RIZOGÊNESE INCOMPLETA
('85200131', 'TRATAMENTO ENDODÔNDICO DE DENTE COM RIZOGÊNESE INCOMPLETA', (SELECT id FROM odonto.especialidades WHERE codigo = 'ENDO' LIMIT 1), TRUE, true, true, FALSE, false, true, true, 3),
-- 187: 85200158 - TRATAMENTO ENDODÔNTICO MULTIRRADICULAR
('85200158', 'TRATAMENTO ENDODÔNTICO MULTIRRADICULAR', (SELECT id FROM odonto.especialidades WHERE codigo = 'ENDO' LIMIT 1), TRUE, true, true, FALSE, false, true, true, 3),
-- 188: 85200166 - TRATAMENTO ENDODÔNTICO UNIRRADICULAR
('85200166', 'TRATAMENTO ENDODÔNTICO UNIRRADICULAR', (SELECT id FROM odonto.especialidades WHERE codigo = 'ENDO' LIMIT 1), TRUE, true, true, FALSE, false, true, true, 3),
-- 189: 85300012 - DESSENSIBILIZAÇÃO DENTÁRIA
('85300012', 'DESSENSIBILIZAÇÃO DENTÁRIA', (SELECT id FROM odonto.especialidades WHERE codigo = 'PERIO' LIMIT 1), TRUE, false, true, FALSE, false, false, false, 1),
-- 190: 85300020 - IMOBILIZAÇÃO DENTÁRIA EM DENTES PERMANENTES
('85300020', 'IMOBILIZAÇÃO DENTÁRIA EM DENTES PERMANENTES', (SELECT id FROM odonto.especialidades WHERE codigo = 'PERIO' LIMIT 1), TRUE, true, true, FALSE, false, false, true, 3),
-- 191: 85300063 - TRATAMENTO DE ABSCESSO PERIODONTAL AGUDO
('85300063', 'TRATAMENTO DE ABSCESSO PERIODONTAL AGUDO', (SELECT id FROM odonto.especialidades WHERE codigo = 'PERIO' LIMIT 1), TRUE, true, false, FALSE, false, true, false, 3),
-- 192: 85300080 - TRATAMENTO DE PERICORONARITE
('85300080', 'TRATAMENTO DE PERICORONARITE', (SELECT id FROM odonto.especialidades WHERE codigo = 'PERIO' LIMIT 1), TRUE, false, true, FALSE, false, false, false, 1),
-- 193: 85300101 - TRACIONAMENTO DE RAIZ RESIDUAL
('85300101', 'TRACIONAMENTO DE RAIZ RESIDUAL', (SELECT id FROM odonto.especialidades WHERE codigo = 'CIRURGIA' LIMIT 1), TRUE, true, true, FALSE, false, true, true, 3),
-- 194: 85400017 - AJUSTE OCLUSAL POR ACRÉSCIMO
('85400017', 'AJUSTE OCLUSAL POR ACRÉSCIMO', (SELECT id FROM odonto.especialidades WHERE codigo = 'PROTESE' LIMIT 1), TRUE, false, false, FALSE, true, false, false, 1),
-- 195: 85400025 - AJUSTE OCLUSAL POR DESGASTE SELETIVO
('85400025', 'AJUSTE OCLUSAL POR DESGASTE SELETIVO', (SELECT id FROM odonto.especialidades WHERE codigo = 'DENT' LIMIT 1), TRUE, false, false, FALSE, true, false, false, 1),
-- 196: 85400033 - CONSERTO EM PRÓTESE PARCIAL REMOVIVEL (EM CONSULTORIO E EM LABORATORIO)
('85400033', 'CONSERTO EM PRÓTESE PARCIAL REMOVIVEL (EM CONSULTORIO E EM LABORATORIO)', (SELECT id FROM odonto.especialidades WHERE codigo = 'PROTESE' LIMIT 1), TRUE, true, false, FALSE, true, false, false, 2),
-- 197: 85400050 - CONSERTO EM PRÓTESE TOTAL (EM CONSULTORIO E EM LABORATORIO)
('85400050', 'CONSERTO EM PRÓTESE TOTAL (EM CONSULTORIO E EM LABORATORIO)', (SELECT id FROM odonto.especialidades WHERE codigo = 'PROTESE' LIMIT 1), TRUE, true, false, FALSE, true, false, false, 2),
-- 198: 85400076 - COROA PROVISÓRIA COM PINO
('85400076', 'COROA PROVISÓRIA COM PINO', (SELECT id FROM odonto.especialidades WHERE codigo = 'PROTESE' LIMIT 1), TRUE, true, true, FALSE, false, true, false, 3),
-- 199: 85400084 - COROA PROVISÓRIA SEM PINO
('85400084', 'COROA PROVISÓRIA SEM PINO', (SELECT id FROM odonto.especialidades WHERE codigo = 'PROTESE' LIMIT 1), TRUE, true, true, FALSE, false, true, false, 3),
-- 200: 85400092 - COROA TOTAL ACRÍLICA PRENSADA
('85400092', 'COROA TOTAL ACRÍLICA PRENSADA', (SELECT id FROM odonto.especialidades WHERE codigo = 'PROTESE' LIMIT 1), TRUE, true, true, FALSE, false, true, false, 3),
-- 201: 85400106 - COROA TOTAL EM CERÂMICA PURA
('85400106', 'COROA TOTAL EM CERÂMICA PURA', (SELECT id FROM odonto.especialidades WHERE codigo = 'PROTESE' LIMIT 1), TRUE, true, true, FALSE, false, true, true, 3),
-- 202: 85400114 - COROA TOTAL EM CERÔMERO
('85400114', 'COROA TOTAL EM CERÔMERO', (SELECT id FROM odonto.especialidades WHERE codigo = 'PROTESE' LIMIT 1), TRUE, true, true, FALSE, false, true, true, 3),
-- 203: 85400122 - COROA TOTAL LIVRE DE METAL (METALFREE) SOBRE IMPLANTE - CERÂMICA
('85400122', 'COROA TOTAL LIVRE DE METAL (METALFREE) SOBRE IMPLANTE - CERÂMICA', (SELECT id FROM odonto.especialidades WHERE codigo = 'IMPLANTE' LIMIT 1), TRUE, true, true, FALSE, false, true, true, 4),
-- 204: 85400149 - COROA TOTAL METÁLICA
('85400149', 'COROA TOTAL METÁLICA', (SELECT id FROM odonto.especialidades WHERE codigo = 'PROTESE' LIMIT 1), TRUE, true, true, FALSE, false, true, true, 3),
-- 205: 85400157 - COROA TOTAL METALO CERÂMICA
('85400157', 'COROA TOTAL METALO CERÂMICA', (SELECT id FROM odonto.especialidades WHERE codigo = 'PROTESE' LIMIT 1), TRUE, true, true, FALSE, false, true, true, 3),
-- 206: 85400173 - COROA TOTAL METALO PLASTICA - RESINA ACRILICA
('85400173', 'COROA TOTAL METALO PLASTICA - RESINA ACRILICA', (SELECT id FROM odonto.especialidades WHERE codigo = 'PROTESE' LIMIT 1), TRUE, true, true, FALSE, false, true, true, 3),
-- 207: 85400181 - FACETA EM CERÂMICA PURA
('85400181', 'FACETA EM CERÂMICA PURA', (SELECT id FROM odonto.especialidades WHERE codigo = 'PROTESE' LIMIT 1), TRUE, true, true, FALSE, false, true, true, 3),
-- 208: 85400203 - GUIA CIRURGICO PARA PRÓTESE TOTAL IMEDIATA
('85400203', 'GUIA CIRURGICO PARA PRÓTESE TOTAL IMEDIATA', (SELECT id FROM odonto.especialidades WHERE codigo = 'PROTESE' LIMIT 1), TRUE, true, false, FALSE, true, false, false, 2),
-- 209: 85400211 - NÚCLEO DE PREENCHIMENTO
('85400211', 'NÚCLEO DE PREENCHIMENTO', (SELECT id FROM odonto.especialidades WHERE codigo = 'PROTESE' LIMIT 1), TRUE, true, true, FALSE, false, true, true, 3),
-- 210: 85400220 - NÚCLEO METÁLICO FUNDIDO
('85400220', 'NÚCLEO METÁLICO FUNDIDO', (SELECT id FROM odonto.especialidades WHERE codigo = 'PROTESE' LIMIT 1), TRUE, true, true, FALSE, false, true, true, 3),
-- 211: 85400238 - ONLAY DE RESINA INDIRETA
('85400238', 'ONLAY DE RESINA INDIRETA', (SELECT id FROM odonto.especialidades WHERE codigo = 'PROTESE' LIMIT 1), TRUE, true, true, FALSE, false, true, true, 3),
-- 212: 85400246 - ÓRTESE MIORRELAXANTE (PLACA OCLUSAL ESTABILIZADORA)
('85400246', 'ÓRTESE MIORRELAXANTE (PLACA OCLUSAL ESTABILIZADORA)', (SELECT id FROM odonto.especialidades WHERE codigo = 'PROTESE' LIMIT 1), TRUE, false, false, FALSE, true, false, false, 1),
-- 213: 85400254 - ÓRTESE REPOSICIONADORA (PLACA OCLUSAL REPOSICIONADORA)
('85400254', 'ÓRTESE REPOSICIONADORA (PLACA OCLUSAL REPOSICIONADORA)', (SELECT id FROM odonto.especialidades WHERE codigo = 'DTM' LIMIT 1), TRUE, false, false, FALSE, true, false, false, 1),
-- 214: 85400262 - PINO PRÉ FABRICADO
('85400262', 'PINO PRÉ FABRICADO', (SELECT id FROM odonto.especialidades WHERE codigo = 'PROTESE' LIMIT 1), TRUE, true, true, FALSE, false, true, true, 3),
-- 215: 85400300 - PRÓTESE FIXA ADESIVA INDIRETA EM METALO CERÂMICA
('85400300', 'PRÓTESE FIXA ADESIVA INDIRETA EM METALO CERÂMICA', (SELECT id FROM odonto.especialidades WHERE codigo = 'PROTESE' LIMIT 1), TRUE, true, true, FALSE, false, true, true, 3),
-- 216: 85400335 - PRÓTESE PARCIAL FIXA EM METALO CERÂMICA
('85400335', 'PRÓTESE PARCIAL FIXA EM METALO CERÂMICA', (SELECT id FROM odonto.especialidades WHERE codigo = 'PROTESE' LIMIT 1), TRUE, true, true, FALSE, false, true, true, 3),
-- 217: 85400351 - PRÓTESE PARCIAL FIXA IN CERAN LIVRE DE METAL (METAL FREE)
('85400351', 'PRÓTESE PARCIAL FIXA IN CERAN LIVRE DE METAL (METAL FREE)', (SELECT id FROM odonto.especialidades WHERE codigo = 'PROTESE' LIMIT 1), TRUE, true, true, FALSE, false, true, true, 3),
-- 218: 85400360 - PRÓTESE PARCIAL FIXA PROVISÓRIA
('85400360', 'PRÓTESE PARCIAL FIXA PROVISÓRIA', (SELECT id FROM odonto.especialidades WHERE codigo = 'PROTESE' LIMIT 1), TRUE, true, true, FALSE, false, true, true, 3),
-- 219: 85400378 - PRÓTESE PARCIAL REMOVÍVEL COM ENCAIXES DE PRECISÃO OU DE SEMI PRECISÃO
('85400378', 'PRÓTESE PARCIAL REMOVÍVEL COM ENCAIXES DE PRECISÃO OU DE SEMI PRECISÃO', (SELECT id FROM odonto.especialidades WHERE codigo = 'PROTESE' LIMIT 1), TRUE, true, false, FALSE, true, false, true, 3),
-- 220: 85400386 - PRÓTESE PARCIAL REMOVÍVEL COM GRAMPOS BILATERAL
('85400386', 'PRÓTESE PARCIAL REMOVÍVEL COM GRAMPOS BILATERAL', (SELECT id FROM odonto.especialidades WHERE codigo = 'PROTESE' LIMIT 1), TRUE, true, false, FALSE, true, false, false, 2),
-- 221: 85400394 - PRÓTESE PARCIAL REMOVÍVEL PROVISÓRIA EM ACRÍLICO COM OU SEM GRAMPOS
('85400394', 'PRÓTESE PARCIAL REMOVÍVEL PROVISÓRIA EM ACRÍLICO COM OU SEM GRAMPOS', (SELECT id FROM odonto.especialidades WHERE codigo = 'PROTESE' LIMIT 1), TRUE, true, false, FALSE, true, false, false, 2),
-- 222: 85400408 - PRÓTESE TOTAL
('85400408', 'PRÓTESE TOTAL', (SELECT id FROM odonto.especialidades WHERE codigo = 'PROTESE' LIMIT 1), TRUE, true, false, FALSE, true, false, false, 2)
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

-- Verificação do bloco 3
DO $$
DECLARE
    total_inseridos INTEGER;
    total_bloco INTEGER := 74;
BEGIN
    SELECT COUNT(*) INTO total_inseridos FROM odonto.procedimentos;
    
    RAISE NOTICE '================================================';
    RAISE NOTICE 'RELATÓRIO DO BLOCO 3 (SEM DUPLICATAS)';
    RAISE NOTICE '================================================';
    RAISE NOTICE '✅ Procedimentos únicos inseridos: %', total_bloco;
    RAISE NOTICE '📊 Total de procedimentos no banco: %', total_inseridos;
    RAISE NOTICE '🎯 Progresso: Bloco 3/4 concluído';
    RAISE NOTICE '🧹 Duplicatas foram removidas na geração';
    RAISE NOTICE '================================================';
END $$;

COMMIT;

-- =====================================================
-- PRÓXIMO PASSO: Execute insert-procedimentos-bloco4.sql
-- =====================================================