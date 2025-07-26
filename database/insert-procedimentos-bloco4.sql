-- =====================================================
-- INSERÇÃO DE PROCEDIMENTOS - BLOCO 4/4 (SEM DUPLICATAS)
-- Data: 2025-07-01 (REGENERADO - duplicatas removidas)
-- Procedimentos: 223-296 (74 total)
-- Origem: Results.xlsx (excluindo duplicatas e 6 já inseridos)
-- =====================================================

BEGIN;

-- Inserir procedimentos do bloco 4 (sem duplicatas)
INSERT INTO odonto.procedimentos (
    codigo_tuss, descricao, especialidade_id, ativo,
    requer_pre_aprovacao, requer_dente, requer_face, requer_regiao,
    requer_rx_inicial, requer_rx_final, nivel_complexidade_id
) VALUES
-- 223: 85400416 - PRÓTESE TOTAL IMEDIATA
('85400416', 'PRÓTESE TOTAL IMEDIATA', (SELECT id FROM odonto.especialidades WHERE codigo = 'PROTESE' LIMIT 1), TRUE, true, false, FALSE, true, false, false, 2),
-- 224: 85400424 - PRÓTESE TOTAL INCOLOR
('85400424', 'PRÓTESE TOTAL INCOLOR', (SELECT id FROM odonto.especialidades WHERE codigo = 'PROTESE' LIMIT 1), TRUE, true, false, FALSE, true, false, false, 2),
-- 225: 85400467 - RECIMENTAÇÃO DE TRABALHOS PROTÉTICOS
('85400467', 'RECIMENTAÇÃO DE TRABALHOS PROTÉTICOS', (SELECT id FROM odonto.especialidades WHERE codigo = 'URG_DIURNA' LIMIT 1), TRUE, true, true, FALSE, false, true, false, 3),
-- 226: 85400475 - REEMBASAMENTO DE COROA PROVISÓRIA
('85400475', 'REEMBASAMENTO DE COROA PROVISÓRIA', (SELECT id FROM odonto.especialidades WHERE codigo = 'PROTESE' LIMIT 1), TRUE, true, true, FALSE, false, true, false, 3),
-- 227: 85400483 - REEMBASAMENTO DE PRÓTESE TOTAL OU PARCIAL - IMEDIATO (EM CONSULTÓRIO)
('85400483', 'REEMBASAMENTO DE PRÓTESE TOTAL OU PARCIAL - IMEDIATO (EM CONSULTÓRIO)', (SELECT id FROM odonto.especialidades WHERE codigo = 'PROTESE' LIMIT 1), TRUE, true, false, FALSE, true, false, false, 2),
-- 228: 85400491 - REEMBASAMENTO DE PRÓTESE TOTAL OU PARCIAL - MEDIATO (EM LABORATÓRIO)
('85400491', 'REEMBASAMENTO DE PRÓTESE TOTAL OU PARCIAL - MEDIATO (EM LABORATÓRIO)', (SELECT id FROM odonto.especialidades WHERE codigo = 'PROTESE' LIMIT 1), TRUE, true, false, FALSE, true, false, false, 2),
-- 229: 85400505 - REMOÇÃO DE TRABALHO PROTÉTICO
('85400505', 'REMOÇÃO DE TRABALHO PROTÉTICO', (SELECT id FROM odonto.especialidades WHERE codigo = 'PROTESE' LIMIT 1), TRUE, true, true, FALSE, false, true, true, 3),
-- 230: 85400513 - RESTAURAÇÃO EM CERÂMICA PURA - INLAY
('85400513', 'RESTAURAÇÃO EM CERÂMICA PURA - INLAY', (SELECT id FROM odonto.especialidades WHERE codigo = 'PROTESE' LIMIT 1), TRUE, true, true, FALSE, false, true, true, 3),
-- 231: 85400521 - RESTAURAÇÃO EM CERÂMICA PURA - ONLAY
('85400521', 'RESTAURAÇÃO EM CERÂMICA PURA - ONLAY', (SELECT id FROM odonto.especialidades WHERE codigo = 'PROTESE' LIMIT 1), TRUE, true, true, FALSE, false, true, true, 3),
-- 232: 85400530 - RESTAURAÇÃO EM CERÔMERO - ONLAY
('85400530', 'RESTAURAÇÃO EM CERÔMERO - ONLAY', (SELECT id FROM odonto.especialidades WHERE codigo = 'PROTESE' LIMIT 1), TRUE, true, true, FALSE, false, true, true, 3),
-- 233: 85400548 - RESTAURAÇÃO EM CERÔMERO - INLAY
('85400548', 'RESTAURAÇÃO EM CERÔMERO - INLAY', (SELECT id FROM odonto.especialidades WHERE codigo = 'PROTESE' LIMIT 1), TRUE, true, true, FALSE, false, true, true, 3),
-- 234: 85400556 - RESTAURAÇÃO METÁLICA FUNDIDA
('85400556', 'RESTAURAÇÃO METÁLICA FUNDIDA', (SELECT id FROM odonto.especialidades WHERE codigo = 'PROTESE' LIMIT 1), TRUE, true, true, FALSE, false, true, true, 3),
-- 235: 85400572 - COROA 3/4 OU 4/5
('85400572', 'COROA 3/4 OU 4/5', (SELECT id FROM odonto.especialidades WHERE codigo = 'PROTESE' LIMIT 1), TRUE, true, true, FALSE, false, true, true, 3),
-- 236: 85400580 - JIG OU FRONT PLATO - ÓRTESE REPOSICIONADORA
('85400580', 'JIG OU FRONT PLATO - ÓRTESE REPOSICIONADORA', (SELECT id FROM odonto.especialidades WHERE codigo = 'PROTESE' LIMIT 1), TRUE, false, false, FALSE, true, false, false, 1),
-- 237: 85400602 - PONTO DE SOLDA
('85400602', 'PONTO DE SOLDA', (SELECT id FROM odonto.especialidades WHERE codigo = 'PROTESE' LIMIT 1), TRUE, false, true, FALSE, false, false, false, 1),
-- 238: 85400610 - PRÓTESE TOTAL CARACTERIZADA
('85400610', 'PRÓTESE TOTAL CARACTERIZADA', (SELECT id FROM odonto.especialidades WHERE codigo = 'PROTESE' LIMIT 1), TRUE, true, false, FALSE, true, false, false, 2),
-- 239: 85500011 - COROA PROVISÓRIA SOBRE IMPLANTE
('85500011', 'COROA PROVISÓRIA SOBRE IMPLANTE', (SELECT id FROM odonto.especialidades WHERE codigo = 'IMPLANTE' LIMIT 1), TRUE, true, true, FALSE, false, true, true, 4),
-- 240: 85500020 - COROA PROVISÓRIA SOBRE IMPLANTE COM CARGA IMEDIATA
('85500020', 'COROA PROVISÓRIA SOBRE IMPLANTE COM CARGA IMEDIATA', (SELECT id FROM odonto.especialidades WHERE codigo = 'IMPLANTE' LIMIT 1), TRUE, true, true, FALSE, false, true, true, 4),
-- 241: 85500038 - COROA TOTAL METALO CERÂMICA SOBRE IMPLANTE
('85500038', 'COROA TOTAL METALO CERÂMICA SOBRE IMPLANTE', (SELECT id FROM odonto.especialidades WHERE codigo = 'IMPLANTE' LIMIT 1), TRUE, true, true, FALSE, false, true, true, 4),
-- 242: 85500046 - COROA TOTAL METALO PLASTICA SOBRE IMPLANTE - CERÔMERO
('85500046', 'COROA TOTAL METALO PLASTICA SOBRE IMPLANTE - CERÔMERO', (SELECT id FROM odonto.especialidades WHERE codigo = 'IMPLANTE' LIMIT 1), TRUE, true, true, FALSE, false, true, true, 4),
-- 243: 85500054 - COROA TOTAL METALO PLASTICA SOBRE IMPLANTE - RESINA ACRILICA
('85500054', 'COROA TOTAL METALO PLASTICA SOBRE IMPLANTE - RESINA ACRILICA', (SELECT id FROM odonto.especialidades WHERE codigo = 'IMPLANTE' LIMIT 1), TRUE, true, true, FALSE, false, true, true, 4),
-- 244: 85500062 - GUIA CIRÚRGICO PARA IMPLANTE
('85500062', 'GUIA CIRÚRGICO PARA IMPLANTE', (SELECT id FROM odonto.especialidades WHERE codigo = 'IMPLANTE' LIMIT 1), TRUE, true, false, FALSE, true, false, false, 4),
-- 245: 85500089 - MANUTENÇÃO DE PRÓTESE SOBRE IMPLANTES
('85500089', 'MANUTENÇÃO DE PRÓTESE SOBRE IMPLANTES', (SELECT id FROM odonto.especialidades WHERE codigo = 'IMPLANTE' LIMIT 1), TRUE, true, false, FALSE, true, false, false, 4),
-- 246: 85500097 - OVERDENTURE BARRA CLIPE OU O`RING SOBRE DOIS IMPLANTES
('85500097', 'OVERDENTURE BARRA CLIPE OU O`RING SOBRE DOIS IMPLANTES', (SELECT id FROM odonto.especialidades WHERE codigo = 'IMPLANTE' LIMIT 1), TRUE, true, false, FALSE, true, true, true, 4),
-- 247: 85500100 - OVERDENTURE BARRA CLIPE OU O´RING SOBRE QUATRO OU MAIS IMPLANTES
('85500100', 'OVERDENTURE BARRA CLIPE OU O´RING SOBRE QUATRO OU MAIS IMPLANTES', (SELECT id FROM odonto.especialidades WHERE codigo = 'IMPLANTE' LIMIT 1), TRUE, true, false, FALSE, true, true, true, 4),
-- 248: 85500119 - OVERDENTURE BARRA CLIPE OU O´RING SOBRE TRÊS IMPLANTES
('85500119', 'OVERDENTURE BARRA CLIPE OU O´RING SOBRE TRÊS IMPLANTES', (SELECT id FROM odonto.especialidades WHERE codigo = 'IMPLANTE' LIMIT 1), TRUE, true, false, FALSE, true, true, true, 4),
-- 249: 85500127 - PRÓTESE PARCIAL FIXA IMPLANTO SUPORTADA
('85500127', 'PRÓTESE PARCIAL FIXA IMPLANTO SUPORTADA', (SELECT id FROM odonto.especialidades WHERE codigo = 'IMPLANTE' LIMIT 1), TRUE, true, true, FALSE, false, true, true, 4),
-- 250: 85500135 - PRÓTESE PARCIAL FIXA PROVISÓRIA EM CARGA IMEDIATA
('85500135', 'PRÓTESE PARCIAL FIXA PROVISÓRIA EM CARGA IMEDIATA', (SELECT id FROM odonto.especialidades WHERE codigo = 'IMPLANTE' LIMIT 1), TRUE, true, true, FALSE, false, true, true, 4),
-- 251: 85500160 - PROTOCOLO BRANEMARK PARA 4 IMPLANTES
('85500160', 'PROTOCOLO BRANEMARK PARA 4 IMPLANTES', (SELECT id FROM odonto.especialidades WHERE codigo = 'IMPLANTE' LIMIT 1), TRUE, true, false, FALSE, true, true, true, 4),
-- 252: 85500178 - PROTOCOLO BRANEMARK PARA 5 IMPLANTES
('85500178', 'PROTOCOLO BRANEMARK PARA 5 IMPLANTES', (SELECT id FROM odonto.especialidades WHERE codigo = 'IMPLANTE' LIMIT 1), TRUE, true, false, FALSE, true, true, true, 4),
-- 253: 85500186 - PROTOCOLO BRANEMARK PROVISÓRIO PARA 4 IMPLANTES
('85500186', 'PROTOCOLO BRANEMARK PROVISÓRIO PARA 4 IMPLANTES', (SELECT id FROM odonto.especialidades WHERE codigo = 'IMPLANTE' LIMIT 1), TRUE, true, false, FALSE, true, true, true, 4),
-- 254: 85500194 - PROTOCOLO BRANEMARK PROVISÓRIO PARA 5 IMPLANTES
('85500194', 'PROTOCOLO BRANEMARK PROVISÓRIO PARA 5 IMPLANTES', (SELECT id FROM odonto.especialidades WHERE codigo = 'IMPLANTE' LIMIT 1), TRUE, true, false, FALSE, true, true, true, 4),
-- 255: 85500224 - TRATAMENTO DE PERIMPLANTITE POR IMPLANTE
('85500224', 'TRATAMENTO DE PERIMPLANTITE POR IMPLANTE', (SELECT id FROM odonto.especialidades WHERE codigo = 'IMPLANTE' LIMIT 1), TRUE, true, true, FALSE, false, true, true, 4),
-- 256: 86000357 - MANUTENÇÃO DE APARELHO ORTODÔNTICO - APARELHO FIXO
('86000357', 'MANUTENÇÃO DE APARELHO ORTODÔNTICO - APARELHO FIXO', (SELECT id FROM odonto.especialidades WHERE codigo = 'ORTODONT' LIMIT 1), TRUE, false, false, FALSE, true, false, false, 4),
-- 257: 86000365 - MANUTENÇÃO DE APARELHO ORTODÔNTICO - APARELHO ORTOPÉDICO
('86000365', 'MANUTENÇÃO DE APARELHO ORTODÔNTICO - APARELHO ORTOPÉDICO', (SELECT id FROM odonto.especialidades WHERE codigo = 'ORTODONT' LIMIT 1), TRUE, false, false, FALSE, true, false, false, 4),
-- 258: 86000373 - MANUTENÇÃO DE APARELHO ORTODÔNTICO - APARELHO REMOVÍVEL
('86000373', 'MANUTENÇÃO DE APARELHO ORTODÔNTICO - APARELHO REMOVÍVEL', (SELECT id FROM odonto.especialidades WHERE codigo = 'ORTODONT' LIMIT 1), TRUE, false, false, FALSE, true, false, false, 4),
-- 259: 86000400 - MANUTENÇÃO DE APARELHO ORTODÔNTICO - ESTÉTICO
('86000400', 'MANUTENÇÃO DE APARELHO ORTODÔNTICO - ESTÉTICO', (SELECT id FROM odonto.especialidades WHERE codigo = 'ORTODONT' LIMIT 1), TRUE, false, false, FALSE, true, false, false, 4),
-- 260: 86000608 - PLACA DE CONTENÇÃO ORTODÔNTICA
('86000608', 'PLACA DE CONTENÇÃO ORTODÔNTICA', (SELECT id FROM odonto.especialidades WHERE codigo = 'ORTODONT' LIMIT 1), TRUE, false, false, FALSE, true, false, false, 4),
-- 261: 87000016 - ATIVIDADE EDUCATIVA EM ODONTOLOGIA PARA PAIS E/OU CUIDADORES DE PACIENTES COM NECESSIDADES ESPECIAIS
('87000016', 'ATIVIDADE EDUCATIVA EM ODONTOLOGIA PARA PAIS E/OU CUIDADORES DE PACIENTES COM NECESSIDADES ESPECIAIS', (SELECT id FROM odonto.especialidades WHERE codigo = 'PREV' LIMIT 1), TRUE, false, false, FALSE, true, false, false, 1),
-- 262: 87000024 - ATIVIDADE EDUCATIVA PARA PAIS E/OU CUIDADORES
('87000024', 'ATIVIDADE EDUCATIVA PARA PAIS E/OU CUIDADORES', (SELECT id FROM odonto.especialidades WHERE codigo = 'PREV' LIMIT 1), TRUE, false, false, FALSE, true, false, false, 1),
-- 263: 87000032 - CONDICIONAMENTO EM ODONTOLOGIA PARA PACIENTES COM NECESSIDADES ESPECIAIS
('87000032', 'CONDICIONAMENTO EM ODONTOLOGIA PARA PACIENTES COM NECESSIDADES ESPECIAIS', (SELECT id FROM odonto.especialidades WHERE codigo = 'PREV' LIMIT 1), TRUE, false, false, FALSE, true, false, false, 1),
-- 264: 87000040 - COROA DE ACETATO EM DENTE PERMANENTE
('87000040', 'COROA DE ACETATO EM DENTE PERMANENTE', (SELECT id FROM odonto.especialidades WHERE codigo = 'PROTESE' LIMIT 1), TRUE, true, true, FALSE, false, true, true, 3),
-- 265: 87000059 - COROA DE AÇO EM DENTE PERMANENTE
('87000059', 'COROA DE AÇO EM DENTE PERMANENTE', (SELECT id FROM odonto.especialidades WHERE codigo = 'PROTESE' LIMIT 1), TRUE, true, true, FALSE, false, true, true, 3),
-- 266: 87000067 - COROA DE POLICARBONATO EM DENTE PERMANENTE
('87000067', 'COROA DE POLICARBONATO EM DENTE PERMANENTE', (SELECT id FROM odonto.especialidades WHERE codigo = 'PROTESE' LIMIT 1), TRUE, true, true, FALSE, false, true, true, 3),
-- 267: 95200093 - RETRATAMENTO ENDODÔNTICO BIRRADICULAR COM USO DE MICROSCÓPIO
('95200093', 'RETRATAMENTO ENDODÔNTICO BIRRADICULAR COM USO DE MICROSCÓPIO', (SELECT id FROM odonto.especialidades WHERE codigo = 'ENDO' LIMIT 1), TRUE, true, true, FALSE, false, true, true, 3),
-- 268: 95200107 - RETRATAMENTO ENDODÔNTICO MULTIRRADICULAR COM USO DE MICROSCÓPIO
('95200107', 'RETRATAMENTO ENDODÔNTICO MULTIRRADICULAR COM USO DE MICROSCÓPIO', (SELECT id FROM odonto.especialidades WHERE codigo = 'ENDO' LIMIT 1), TRUE, true, true, FALSE, false, true, true, 3),
-- 269: 95200115 - RETRATAMENTO ENDODÔNTICO UNIRRADICULAR COM USO DE MICROSCÓPIO
('95200115', 'RETRATAMENTO ENDODÔNTICO UNIRRADICULAR COM USO DE MICROSCÓPIO', (SELECT id FROM odonto.especialidades WHERE codigo = 'ENDO' LIMIT 1), TRUE, true, true, FALSE, false, true, true, 3),
-- 270: 95200123 - TRATAMENTO DE PERFURAÇÃO ENDODÔNTICA COM USO DE MICROSCÓPIO
('95200123', 'TRATAMENTO DE PERFURAÇÃO ENDODÔNTICA COM USO DE MICROSCÓPIO', (SELECT id FROM odonto.especialidades WHERE codigo = 'ENDO' LIMIT 1), TRUE, true, true, FALSE, false, true, true, 3),
-- 271: 95200140 - TRATAMENTO ENDODÔNTICO BIRRADICULAR COM USO DE MICROSCÓPIO
('95200140', 'TRATAMENTO ENDODÔNTICO BIRRADICULAR COM USO DE MICROSCÓPIO', (SELECT id FROM odonto.especialidades WHERE codigo = 'ENDO' LIMIT 1), TRUE, true, true, FALSE, false, true, true, 3),
-- 272: 95200158 - TRATAMENTO ENDODÔNTICO MULTIRRADICULAR COM USO DE MICROSCÓPIO
('95200158', 'TRATAMENTO ENDODÔNTICO MULTIRRADICULAR COM USO DE MICROSCÓPIO', (SELECT id FROM odonto.especialidades WHERE codigo = 'ENDO' LIMIT 1), TRUE, true, true, FALSE, false, true, true, 3),
-- 273: 95200166 - TRATAMENTO ENDODÔNTICO UNIRRADICULAR COM USO DE MICROSCÓPIO
('95200166', 'TRATAMENTO ENDODÔNTICO UNIRRADICULAR COM USO DE MICROSCÓPIO', (SELECT id FROM odonto.especialidades WHERE codigo = 'ENDO' LIMIT 1), TRUE, true, true, FALSE, false, true, true, 3),
-- 274: 98113119 - CONSULTA DE AVALIAÇÃO DE DTM
('98113119', 'CONSULTA DE AVALIAÇÃO DE DTM', (SELECT id FROM odonto.especialidades WHERE codigo = 'DTM' LIMIT 1), TRUE, false, false, FALSE, true, false, false, 1),
-- 275: 98265156 - RESTAURAÇÃO DE SUPERFÍCIE RADICULAR
('98265156', 'RESTAURAÇÃO DE SUPERFÍCIE RADICULAR', (SELECT id FROM odonto.especialidades WHERE codigo = 'DENT' LIMIT 1), TRUE, false, true, FALSE, false, false, false, 1),
-- 276: 98301144 - REST EM AMÁLGAMA 1 FACE EM DECÍDUOS
('98301144', 'REST EM AMÁLGAMA 1 FACE EM DECÍDUOS', (SELECT id FROM odonto.especialidades WHERE codigo = 'ODONTOP' LIMIT 1), TRUE, false, true, FALSE, false, false, false, 1),
-- 277: 98301152 - REST EM RESINA 1 FACE EM DECÍDUOS
('98301152', 'REST EM RESINA 1 FACE EM DECÍDUOS', (SELECT id FROM odonto.especialidades WHERE codigo = 'ODONTOP' LIMIT 1), TRUE, false, true, FALSE, false, false, false, 1),
-- 278: 98302140 - REST EM AMÁLGAMA 2 FACES EM DECÍDUOS
('98302140', 'REST EM AMÁLGAMA 2 FACES EM DECÍDUOS', (SELECT id FROM odonto.especialidades WHERE codigo = 'ODONTOP' LIMIT 1), TRUE, false, true, FALSE, false, false, false, 1),
-- 279: 98302159 - REST EM RESINA 2 FACES EM DECÍDUOS
('98302159', 'REST EM RESINA 2 FACES EM DECÍDUOS', (SELECT id FROM odonto.especialidades WHERE codigo = 'ODONTOP' LIMIT 1), TRUE, false, true, FALSE, false, false, false, 1),
-- 280: 98303147 - REST EM AMÁLGAMA 3 FACES EM DECÍDUOS
('98303147', 'REST EM AMÁLGAMA 3 FACES EM DECÍDUOS', (SELECT id FROM odonto.especialidades WHERE codigo = 'ODONTOP' LIMIT 1), TRUE, false, true, FALSE, false, false, false, 1),
-- 281: 98303155 - REST EM RESINA 3 FACES EM DECÍDUOS
('98303155', 'REST EM RESINA 3 FACES EM DECÍDUOS', (SELECT id FROM odonto.especialidades WHERE codigo = 'ODONTOP' LIMIT 1), TRUE, false, true, FALSE, false, false, false, 1),
-- 282: 98304143 - REST EM AMÁLGAMA 4 FACES OU MAIS EM DECÍDUOS
('98304143', 'REST EM AMÁLGAMA 4 FACES OU MAIS EM DECÍDUOS', (SELECT id FROM odonto.especialidades WHERE codigo = 'ODONTOP' LIMIT 1), TRUE, false, true, FALSE, false, false, false, 1),
-- 283: 98304151 - REST EM RESINA 4 FACES OU MAIS EM DECÍDUOS
('98304151', 'REST EM RESINA 4 FACES OU MAIS EM DECÍDUOS', (SELECT id FROM odonto.especialidades WHERE codigo = 'ODONTOP' LIMIT 1), TRUE, false, true, FALSE, false, false, false, 1),
-- 284: 98662449 - PACOTE DE FISIOTERAPIA DE DTM
('98662449', 'PACOTE DE FISIOTERAPIA DE DTM', (SELECT id FROM odonto.especialidades WHERE codigo = 'DTM' LIMIT 1), TRUE, false, false, FALSE, true, false, false, 1),
-- 285: 98704567 - MODELOS DE TRABALHO
('98704567', 'MODELOS DE TRABALHO', (SELECT id FROM odonto.especialidades WHERE codigo = 'RADIO' LIMIT 1), TRUE, false, false, FALSE, true, false, false, 1),
-- 286: 98705563 - DISCREPÂNCIA /ANÁLISE DE MODELOS
('98705563', 'DISCREPÂNCIA /ANÁLISE DE MODELOS', (SELECT id FROM odonto.especialidades WHERE codigo = 'RADIO' LIMIT 1), TRUE, false, false, FALSE, true, false, false, 1),
-- 287: 98763000 - DOCUMENTAÇÃO ORTODÔNTICA PARA ALINHADOR INVISÍVEL
('98763000', 'DOCUMENTAÇÃO ORTODÔNTICA PARA ALINHADOR INVISÍVEL', (SELECT id FROM odonto.especialidades WHERE codigo = 'ORT_INVIS' LIMIT 1), TRUE, true, false, FALSE, true, true, false, 4),
-- 288: 98763010 - ESCANEAMENTO DIGITAL PARA ALINHADOR INVISÍVEL
('98763010', 'ESCANEAMENTO DIGITAL PARA ALINHADOR INVISÍVEL', (SELECT id FROM odonto.especialidades WHERE codigo = 'ORT_INVIS' LIMIT 1), TRUE, true, false, FALSE, true, true, false, 4),
-- 289: 98763020 - ESCANEAMENTO DIGITAL - RADIOLOGIA
('98763020', 'ESCANEAMENTO DIGITAL - RADIOLOGIA', (SELECT id FROM odonto.especialidades WHERE codigo = 'RAD_SCAN' LIMIT 1), TRUE, true, false, FALSE, true, true, false, 3),
-- 290: 98764004 - ALINHADOR ORTODÔNTICO - ACOMPANHAMENTO 
('98764004', 'ALINHADOR ORTODÔNTICO - ACOMPANHAMENTO ', (SELECT id FROM odonto.especialidades WHERE codigo = 'ORT_INVIS' LIMIT 1), TRUE, false, false, FALSE, true, false, false, 4),
-- 291: 98826620 - NÚCLEO DE FIBRA DE VIDRO/CARBONO
('98826620', 'NÚCLEO DE FIBRA DE VIDRO/CARBONO', (SELECT id FROM odonto.especialidades WHERE codigo = 'PROTESE' LIMIT 1), TRUE, true, true, FALSE, false, true, true, 3),
-- 292: 98842625 - COROA VENEER
('98842625', 'COROA VENEER', (SELECT id FROM odonto.especialidades WHERE codigo = 'PROTESE' LIMIT 1), TRUE, true, true, FALSE, false, true, true, 3),
-- 293: 98870637 - COROA METALOCERÂMICA SOBRE IMPLANTE
('98870637', 'COROA METALOCERÂMICA SOBRE IMPLANTE', (SELECT id FROM odonto.especialidades WHERE codigo = 'IMPLANTE' LIMIT 1), TRUE, true, true, FALSE, false, true, true, 4),
-- 294: 98958569 - DOCUMENTAÇÃO ORTODÔNTICA
('98958569', 'DOCUMENTAÇÃO ORTODÔNTICA', (SELECT id FROM odonto.especialidades WHERE codigo = 'RADIO' LIMIT 1), TRUE, false, false, FALSE, true, false, false, 1),
-- 295: 98966162 - DOCUMENTAÇÃO PERIODONTAL
('98966162', 'DOCUMENTAÇÃO PERIODONTAL', (SELECT id FROM odonto.especialidades WHERE codigo = 'RADIO' LIMIT 1), TRUE, false, false, FALSE, true, false, false, 1),
-- 296: 98968564 - DOCUMENTAÇÃO ORTOPÉDICA
('98968564', 'DOCUMENTAÇÃO ORTOPÉDICA', (SELECT id FROM odonto.especialidades WHERE codigo = 'RADIO' LIMIT 1), TRUE, false, false, FALSE, true, false, false, 1)
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

-- Verificação do bloco 4
DO $$
DECLARE
    total_inseridos INTEGER;
    total_bloco INTEGER := 74;
BEGIN
    SELECT COUNT(*) INTO total_inseridos FROM odonto.procedimentos;
    
    RAISE NOTICE '================================================';
    RAISE NOTICE 'RELATÓRIO DO BLOCO 4 (SEM DUPLICATAS)';
    RAISE NOTICE '================================================';
    RAISE NOTICE '✅ Procedimentos únicos inseridos: %', total_bloco;
    RAISE NOTICE '📊 Total de procedimentos no banco: %', total_inseridos;
    RAISE NOTICE '🎯 Progresso: Bloco 4/4 concluído';
    RAISE NOTICE '🧹 Duplicatas foram removidas na geração';
    RAISE NOTICE '================================================';
END $$;

COMMIT;

-- =====================================================
-- PRÓXIMO PASSO: Todos os blocos concluídos!
-- =====================================================