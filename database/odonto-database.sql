-- =====================================================
-- SISTEMA DE PROCEDIMENTOS ODONTOLÓGICOS v2.1 - SUPABASE
-- Autor: Sistema de Gestão Odontológica
-- Data: 2025-07-01
-- Descrição: Schema completo para gerenciamento de 
-- procedimentos, regras e pré-aprovações
-- 
-- ALTERAÇÕES v2.1:
-- - Removido campo valor_referencia da tabela procedimentos
-- - Removido constraint valor_positivo
-- - Atualizada view vw_procedimentos_completo
-- - Adicionado IF NOT EXISTS em tabelas, sequences e índices
-- - Compatível com execução múltipla (não gera erros se já existir)
-- =====================================================

-- Criar schema
CREATE SCHEMA IF NOT EXISTS odonto;

-- =====================================================
-- TABELAS DE DOMÍNIO (LOOKUP TABLES)
-- =====================================================

-- Especialidades odontológicas
CREATE TABLE IF NOT EXISTS odonto.especialidades (
    id SERIAL PRIMARY KEY,
    codigo VARCHAR(10) UNIQUE NOT NULL,
    descricao VARCHAR(100) NOT NULL,
    extra_rol BOOLEAN DEFAULT FALSE,
    ativa BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

COMMENT ON TABLE odonto.especialidades IS 'Especialidades odontológicas reconhecidas';
COMMENT ON COLUMN odonto.especialidades.extra_rol IS 'TRUE para especialidades não obrigatórias pela ANS (ortodontia, implante, prótese)';

-- Níveis de complexidade documental
CREATE TABLE IF NOT EXISTS odonto.niveis_complexidade (
    id SERIAL PRIMARY KEY,
    nivel INTEGER UNIQUE NOT NULL CHECK (nivel BETWEEN 1 AND 4),
    descricao VARCHAR(50) NOT NULL,
    cor_hex VARCHAR(7) NOT NULL,
    prazo_analise_horas INTEGER NOT NULL,
    descricao_completa TEXT
);

COMMENT ON TABLE odonto.niveis_complexidade IS 'Níveis de exigência documental (1-Baixa, 2-Média, 3-Alta, 4-Especial)';

-- Tipos de documentos
CREATE TABLE IF NOT EXISTS odonto.tipos_documento (
    id SERIAL PRIMARY KEY,
    codigo VARCHAR(20) UNIQUE NOT NULL,
    descricao VARCHAR(100) NOT NULL,
    formato_aceito VARCHAR(50),
    tamanho_max_mb INTEGER DEFAULT 5,
    obrigatorio_digitalizacao BOOLEAN DEFAULT FALSE
);

-- Tipos de imagem radiológica
CREATE TABLE IF NOT EXISTS odonto.tipos_imagem (
    id SERIAL PRIMARY KEY,
    codigo VARCHAR(20) UNIQUE NOT NULL,
    descricao VARCHAR(100) NOT NULL,
    finalidade TEXT,
    codigo_tuss VARCHAR(20)
);

-- Status de solicitação
CREATE TABLE IF NOT EXISTS odonto.status_solicitacao (
    id SERIAL PRIMARY KEY,
    codigo VARCHAR(30) UNIQUE NOT NULL,
    descricao VARCHAR(100) NOT NULL,
    tipo VARCHAR(20) CHECK (tipo IN ('autorizacao', 'pagamento', 'ambos')),
    descricao_beneficiario TEXT, -- Descrição clara para RN 623
    cor_hex VARCHAR(7),
    ordem_exibicao INTEGER
);

COMMENT ON COLUMN odonto.status_solicitacao.descricao_beneficiario IS 'Descrição em linguagem clara para o beneficiário (RN 623)';

-- =====================================================
-- TABELA PRINCIPAL DE PROCEDIMENTOS
-- =====================================================

CREATE TABLE IF NOT EXISTS odonto.procedimentos (
    id SERIAL PRIMARY KEY,
    codigo_tuss VARCHAR(20) UNIQUE NOT NULL,
    descricao VARCHAR(255) NOT NULL,
    especialidade_id INTEGER REFERENCES odonto.especialidades(id),
    ativo BOOLEAN DEFAULT TRUE,
    
    -- Flags de exigências
    requer_pre_aprovacao BOOLEAN DEFAULT FALSE,
    requer_dente BOOLEAN DEFAULT FALSE,
    requer_face BOOLEAN DEFAULT FALSE,
    requer_regiao BOOLEAN DEFAULT FALSE,
    requer_rx_inicial BOOLEAN DEFAULT FALSE,
    requer_rx_final BOOLEAN DEFAULT FALSE,
    
    -- Complexidade e prazos
    nivel_complexidade_id INTEGER REFERENCES odonto.niveis_complexidade(id),
    prazo_longevidade_meses INTEGER,
    idade_minima INTEGER,
    idade_maxima INTEGER,
    
    -- Metadados
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Criar índices se não existirem
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_indexes WHERE indexname = 'idx_procedimentos_codigo') THEN
        CREATE INDEX idx_procedimentos_codigo ON odonto.procedimentos(codigo_tuss);
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM pg_indexes WHERE indexname = 'idx_procedimentos_especialidade') THEN
        CREATE INDEX idx_procedimentos_especialidade ON odonto.procedimentos(especialidade_id);
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM pg_indexes WHERE indexname = 'idx_procedimentos_pre_aprovacao') THEN
        CREATE INDEX idx_procedimentos_pre_aprovacao ON odonto.procedimentos(requer_pre_aprovacao);
    END IF;
END $$;

COMMENT ON TABLE odonto.procedimentos IS 'Tabela principal de procedimentos odontológicos com suas regras';

-- =====================================================
-- TABELAS DE REGRAS E RELACIONAMENTOS
-- =====================================================

-- Documentos necessários por procedimento
CREATE TABLE IF NOT EXISTS odonto.procedimento_documentos (
    id SERIAL PRIMARY KEY,
    procedimento_id INTEGER REFERENCES odonto.procedimentos(id),
    tipo_documento_id INTEGER REFERENCES odonto.tipos_documento(id),
    momento VARCHAR(20) CHECK (momento IN ('inicial', 'final', 'ambos')),
    obrigatorio BOOLEAN DEFAULT TRUE,
    observacao TEXT,
    UNIQUE(procedimento_id, tipo_documento_id, momento)
);

-- Procedimentos auto-excludentes
CREATE TABLE IF NOT EXISTS odonto.procedimentos_excludentes (
    id SERIAL PRIMARY KEY,
    procedimento_id INTEGER REFERENCES odonto.procedimentos(id),
    procedimento_exclui_id INTEGER REFERENCES odonto.procedimentos(id),
    observacao TEXT,
    UNIQUE(procedimento_id, procedimento_exclui_id),
    CHECK (procedimento_id != procedimento_exclui_id)
);

COMMENT ON TABLE odonto.procedimentos_excludentes IS '3.624 combinações de procedimentos que não podem ser realizados juntos';

-- Regras customizadas por prestador (Motor de Regras Blaze)
CREATE TABLE IF NOT EXISTS odonto.prestadores (
    id SERIAL PRIMARY KEY,
    codigo VARCHAR(20) UNIQUE NOT NULL,
    nome VARCHAR(255) NOT NULL,
    tipo VARCHAR(10) CHECK (tipo IN ('PF', 'PJ')),
    cnpj_cpf VARCHAR(20) UNIQUE NOT NULL,
    especialidade_principal_id INTEGER REFERENCES odonto.especialidades(id),
    tipo_prestador VARCHAR(30) CHECK (tipo_prestador IN ('clinico', 'radiologico', 'misto')),
    outlier BOOLEAN DEFAULT FALSE,
    ativo BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS odonto.regras_customizadas (
    id SERIAL PRIMARY KEY,
    prestador_id INTEGER REFERENCES odonto.prestadores(id),
    procedimento_id INTEGER REFERENCES odonto.procedimentos(id),
    
    -- Customizações específicas
    exige_foto_inicial BOOLEAN DEFAULT FALSE,
    exige_justificativa_qtd INTEGER, -- Quantidade a partir da qual exige justificativa
    prazo_longevidade_custom_meses INTEGER,
    limite_mensal INTEGER,
    
    -- Configurações SIC
    sic_automatico BOOLEAN DEFAULT FALSE,
    sic_condicao TEXT,
    
    vigencia_inicio DATE NOT NULL,
    vigencia_fim DATE,
    motivo TEXT,
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_by VARCHAR(100)
);

COMMENT ON TABLE odonto.regras_customizadas IS 'Regras específicas por prestador (Motor Blaze)';

-- =====================================================
-- TABELAS DE FORMULÁRIOS DE PRÉ-APROVAÇÃO
-- =====================================================

-- Templates de formulários
CREATE TABLE IF NOT EXISTS odonto.formularios_template (
    id SERIAL PRIMARY KEY,
    especialidade_id INTEGER REFERENCES odonto.especialidades(id),
    tipo VARCHAR(30) NOT NULL, -- 'solicitacao', 'prorrogacao'
    nome VARCHAR(100) NOT NULL,
    qtd_etapas INTEGER NOT NULL,
    ativo BOOLEAN DEFAULT TRUE
);

-- Campos dos formulários
CREATE TABLE IF NOT EXISTS odonto.formulario_campos (
    id SERIAL PRIMARY KEY,
    formulario_id INTEGER REFERENCES odonto.formularios_template(id),
    ordem INTEGER NOT NULL,
    nome_campo VARCHAR(100) NOT NULL,
    tipo_campo VARCHAR(30) NOT NULL, -- 'texto', 'numero', 'select', 'radio', 'checkbox', 'arquivo'
    obrigatorio BOOLEAN DEFAULT TRUE,
    opcoes JSON, -- Para campos select/radio
    validacao JSON, -- Regras de validação
    condicional JSON -- Condições para exibir o campo
);

-- =====================================================
-- TABELAS DE CONTROLE E HISTÓRICO
-- =====================================================

-- Solicitações
CREATE TABLE IF NOT EXISTS odonto.solicitacoes (
    id SERIAL PRIMARY KEY,
    numero_protocolo VARCHAR(30) UNIQUE NOT NULL,
    prestador_id INTEGER REFERENCES odonto.prestadores(id),
    beneficiario_carteirinha VARCHAR(30) NOT NULL,
    beneficiario_nome VARCHAR(255) NOT NULL,
    tipo_solicitacao VARCHAR(30) CHECK (tipo_solicitacao IN ('normal', 'pre_aprovacao', 'sic')),
    status_id INTEGER REFERENCES odonto.status_solicitacao(id),
    valor_total DECIMAL(10,2),
    
    -- Dados de autenticação
    token_validacao VARCHAR(10),
    token_validado_em TIMESTAMP,
    
    -- Timestamps
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    analisado_em TIMESTAMP,
    aprovado_em TIMESTAMP,
    
    -- Dados da análise
    analisado_por VARCHAR(100),
    motivo_negativa TEXT,
    observacoes TEXT
);

-- Criar índices para solicitações se não existirem
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_indexes WHERE indexname = 'idx_solicitacoes_protocolo') THEN
        CREATE INDEX idx_solicitacoes_protocolo ON odonto.solicitacoes(numero_protocolo);
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM pg_indexes WHERE indexname = 'idx_solicitacoes_prestador') THEN
        CREATE INDEX idx_solicitacoes_prestador ON odonto.solicitacoes(prestador_id);
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM pg_indexes WHERE indexname = 'idx_solicitacoes_beneficiario') THEN
        CREATE INDEX idx_solicitacoes_beneficiario ON odonto.solicitacoes(beneficiario_carteirinha);
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM pg_indexes WHERE indexname = 'idx_solicitacoes_status') THEN
        CREATE INDEX idx_solicitacoes_status ON odonto.solicitacoes(status_id);
    END IF;
END $$;

-- Itens da solicitação
CREATE TABLE IF NOT EXISTS odonto.solicitacao_itens (
    id SERIAL PRIMARY KEY,
    solicitacao_id INTEGER REFERENCES odonto.solicitacoes(id),
    procedimento_id INTEGER REFERENCES odonto.procedimentos(id),
    quantidade INTEGER DEFAULT 1,
    valor_unitario DECIMAL(10,2),
    
    -- Detalhes específicos
    numero_dente VARCHAR(10),
    face VARCHAR(20),
    regiao VARCHAR(50),
    
    -- Para radiologia
    dentista_solicitante_nome VARCHAR(255),
    dentista_solicitante_cro VARCHAR(20),
    dentista_solicitante_uf CHAR(2),
    
    -- Status individual
    aprovado BOOLEAN,
    motivo_glosa TEXT,
    valor_glosado DECIMAL(10,2),
    
    CONSTRAINT check_radiologia_fields CHECK (
        (dentista_solicitante_nome IS NULL AND dentista_solicitante_cro IS NULL AND dentista_solicitante_uf IS NULL) OR
        (dentista_solicitante_nome IS NOT NULL AND dentista_solicitante_cro IS NOT NULL AND dentista_solicitante_uf IS NOT NULL)
    )
);

-- Histórico de status
CREATE TABLE IF NOT EXISTS odonto.solicitacao_historico (
    id SERIAL PRIMARY KEY,
    solicitacao_id INTEGER REFERENCES odonto.solicitacoes(id),
    status_anterior_id INTEGER REFERENCES odonto.status_solicitacao(id),
    status_novo_id INTEGER REFERENCES odonto.status_solicitacao(id),
    usuario VARCHAR(100),
    motivo TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Anexos
CREATE TABLE IF NOT EXISTS odonto.solicitacao_anexos (
    id SERIAL PRIMARY KEY,
    solicitacao_id INTEGER REFERENCES odonto.solicitacoes(id),
    tipo_documento_id INTEGER REFERENCES odonto.tipos_documento(id),
    nome_arquivo VARCHAR(255) NOT NULL,
    tamanho_bytes INTEGER NOT NULL,
    hash_arquivo VARCHAR(64), -- SHA-256
    caminho_storage TEXT NOT NULL,
    uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    uploaded_by VARCHAR(100)
);

-- SIC - Solicitação de Informação Complementar
CREATE TABLE IF NOT EXISTS odonto.sic_solicitacoes (
    id SERIAL PRIMARY KEY,
    solicitacao_id INTEGER REFERENCES odonto.solicitacoes(id),
    solicitado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    solicitado_por VARCHAR(100),
    informacao_solicitada TEXT NOT NULL,
    prazo_resposta_dias INTEGER DEFAULT 5,
    respondido_em TIMESTAMP,
    resposta_prestador TEXT,
    anexos_resposta JSON
);

-- =====================================================
-- VIEWS ÚTEIS
-- =====================================================

-- View de procedimentos com todas as informações
CREATE OR REPLACE VIEW odonto.vw_procedimentos_completo AS
SELECT 
    p.id,
    p.codigo_tuss,
    p.descricao,
    e.descricao as especialidade,
    e.extra_rol,
    p.requer_pre_aprovacao,
    p.requer_dente,
    p.requer_face,
    p.requer_regiao,
    p.requer_rx_inicial,
    p.requer_rx_final,
    nc.nivel,
    nc.descricao as complexidade,
    nc.prazo_analise_horas,
    p.prazo_longevidade_meses
FROM odonto.procedimentos p
JOIN odonto.especialidades e ON p.especialidade_id = e.id
LEFT JOIN odonto.niveis_complexidade nc ON p.nivel_complexidade_id = nc.id
WHERE p.ativo = TRUE;

-- View de solicitações com status
CREATE OR REPLACE VIEW odonto.vw_solicitacoes_dashboard AS
SELECT 
    s.id,
    s.numero_protocolo,
    s.created_at as data_solicitacao,
    pr.nome as prestador,
    s.beneficiario_nome,
    s.beneficiario_carteirinha,
    st.descricao as status,
    st.descricao_beneficiario as status_beneficiario,
    st.cor_hex as status_cor,
    s.valor_total,
    COUNT(si.id) as qtd_procedimentos,
    s.analisado_em,
    s.aprovado_em,
    CASE 
        WHEN st.tipo = 'autorizacao' THEN 'PRE'
        WHEN st.tipo = 'pagamento' THEN 'POS'
        ELSE 'AMBOS'
    END as fase
FROM odonto.solicitacoes s
JOIN odonto.prestadores pr ON s.prestador_id = pr.id
JOIN odonto.status_solicitacao st ON s.status_id = st.id
LEFT JOIN odonto.solicitacao_itens si ON s.id = si.solicitacao_id
GROUP BY s.id, s.numero_protocolo, s.created_at, pr.nome, 
         s.beneficiario_nome, s.beneficiario_carteirinha, 
         st.descricao, st.descricao_beneficiario, st.cor_hex, 
         s.valor_total, s.analisado_em, s.aprovado_em, st.tipo;

-- =====================================================
-- FUNCTIONS E TRIGGERS
-- =====================================================

-- Function para atualizar updated_at
CREATE OR REPLACE FUNCTION odonto.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers para updated_at
CREATE TRIGGER update_procedimentos_updated_at BEFORE UPDATE ON odonto.procedimentos
    FOR EACH ROW EXECUTE FUNCTION odonto.update_updated_at_column();

CREATE TRIGGER update_solicitacoes_updated_at BEFORE UPDATE ON odonto.solicitacoes
    FOR EACH ROW EXECUTE FUNCTION odonto.update_updated_at_column();

-- Function para validar procedimentos excludentes
CREATE OR REPLACE FUNCTION odonto.check_procedimentos_excludentes()
RETURNS TRIGGER AS $$
DECLARE
    conflito_count INTEGER;
BEGIN
    -- Verifica se há procedimentos excludentes na mesma solicitação
    SELECT COUNT(*)
    INTO conflito_count
    FROM odonto.solicitacao_itens si1
    JOIN odonto.solicitacao_itens si2 ON si1.solicitacao_id = si2.solicitacao_id
    JOIN odonto.procedimentos_excludentes pe ON 
        (pe.procedimento_id = si1.procedimento_id AND pe.procedimento_exclui_id = si2.procedimento_id)
    WHERE si1.solicitacao_id = NEW.solicitacao_id
        AND si1.id != si2.id;
    
    IF conflito_count > 0 THEN
        RAISE EXCEPTION 'Procedimentos excludentes detectados na mesma solicitação';
    END IF;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER check_excludentes_trigger
    AFTER INSERT OR UPDATE ON odonto.solicitacao_itens
    FOR EACH ROW EXECUTE FUNCTION odonto.check_procedimentos_excludentes();

-- Function para gerar número de protocolo
CREATE OR REPLACE FUNCTION odonto.gerar_numero_protocolo()
RETURNS VARCHAR AS $$
DECLARE
    novo_protocolo VARCHAR(30);
BEGIN
    novo_protocolo := 'ODO' || TO_CHAR(CURRENT_DATE, 'YYYYMMDD') || '-' || 
                      LPAD(NEXTVAL('odonto.protocolo_seq')::TEXT, 6, '0');
    RETURN novo_protocolo;
END;
$$ LANGUAGE plpgsql;

CREATE SEQUENCE IF NOT EXISTS odonto.protocolo_seq;

-- =====================================================
-- DADOS INICIAIS
-- =====================================================

-- Inserir especialidades
INSERT INTO odonto.especialidades (codigo, descricao, extra_rol) VALUES
('CLIN', 'CLÍNICA GERAL', FALSE),
('ENDO', 'ENDODONTIA', FALSE),
('PERIO', 'PERIODONTIA', FALSE),
('CIRUR', 'CIRURGIA', FALSE),
('RADIO', 'RADIOLOGIA', FALSE),
('DENT', 'DENTÍSTICA', FALSE),
('ORTO', 'ORTODONTIA', TRUE),
('IMPL', 'IMPLANTES', TRUE),
('PROT', 'PRÓTESE', TRUE),
('PREV', 'PREVENÇÃO', FALSE),
('ODPED', 'ODONTOPEDIATRIA', FALSE),
('DTM', 'DTM', FALSE);

-- Inserir níveis de complexidade
INSERT INTO odonto.niveis_complexidade (nivel, descricao, cor_hex, prazo_analise_horas, descricao_completa) VALUES
(1, 'Baixa Complexidade', '#4ecdc4', 0, 'Aprovação imediata - Documentação básica'),
(2, 'Média Complexidade', '#feca57', 48, 'Análise em 48h - Documentação + RX'),
(3, 'Alta Complexidade', '#ff6b6b', 120, 'Análise em 5 dias - Documentação completa'),
(4, 'Complexidade Especial', '#a29bfe', 240, 'Análise em 10 dias - Perícia obrigatória');

-- Inserir tipos de documento
INSERT INTO odonto.tipos_documento (codigo, descricao, formato_aceito, tamanho_max_mb) VALUES
('PEDIDO', 'Pedido Odontológico', 'PDF,JPG,PNG', 5),
('RX_PERIAPICAL', 'Radiografia Periapical', 'JPG,PNG,DICOM', 10),
('RX_PANORAMICA', 'Radiografia Panorâmica', 'JPG,PNG,DICOM', 20),
('FOTO_INTRAORAL', 'Foto Intraoral', 'JPG,PNG', 5),
('PLANO_TRATAMENTO', 'Plano de Tratamento', 'PDF', 5),
('LAUDO', 'Laudo Especializado', 'PDF', 5),
('TOMOGRAFIA', 'Tomografia', 'DICOM', 50);

-- Inserir tipos de imagem
INSERT INTO odonto.tipos_imagem (codigo, descricao, finalidade, codigo_tuss) VALUES
('PERIAPICAL', 'Radiografia Periapical', 'Diagnóstico dental específico', '81000421'),
('PANORAMICA', 'Radiografia Panorâmica', 'Visão geral dos maxilares', '81000405'),
('BITEWING', 'Radiografia Interproximal', 'Detecção de cáries interproximais', '81000375'),
('TOMOGRAFIA', 'Tomografia Computadorizada', 'Planejamento 3D', '81000529');

-- Inserir status
INSERT INTO odonto.status_solicitacao (codigo, descricao, tipo, descricao_beneficiario, cor_hex, ordem_exibicao) VALUES
('EMITIDA', 'Emitida', 'autorizacao', 'Sua solicitação foi recebida e está aguardando análise', '#3498db', 1),
('EM_ANALISE', 'Em Análise', 'autorizacao', 'Estamos analisando a documentação enviada pelo seu dentista', '#f39c12', 2),
('AGUARDANDO_SIC', 'Aguardando SIC', 'autorizacao', 'Precisamos de informações adicionais do seu dentista', '#e67e22', 3),
('APROVADA', 'Aprovada', 'autorizacao', 'Seu procedimento foi autorizado', '#27ae60', 4),
('NEGADA', 'Negada', 'autorizacao', 'Seu procedimento não foi autorizado - verifique o motivo abaixo', '#e74c3c', 5),
('PAGAMENTO_LIBERADO', 'Pagamento Liberado', 'pagamento', 'O pagamento foi processado', '#27ae60', 6),
('PARCIALMENTE_LIBERADO', 'Parcialmente Liberado', 'pagamento', 'Parte do pagamento foi processado', '#f39c12', 7),
('GLOSADO', 'Glosado', 'pagamento', 'O procedimento não foi pago - verifique o motivo', '#e74c3c', 8),
('RECURSADO', 'Recursado', 'pagamento', 'Recurso em análise', '#9b59b6', 9),
('CANCELADO', 'Cancelado', 'ambos', 'Solicitação cancelada', '#95a5a6', 10);

-- Inserir alguns procedimentos de exemplo
INSERT INTO odonto.procedimentos (
    codigo_tuss, descricao, especialidade_id,
    requer_pre_aprovacao, requer_dente, requer_face, requer_regiao,
    requer_rx_inicial, requer_rx_final, nivel_complexidade_id, prazo_longevidade_meses
) VALUES
-- Procedimentos simples
('81000049', 'PROFILAXIA', (SELECT id FROM odonto.especialidades WHERE codigo = 'PREV'),
 FALSE, FALSE, FALSE, FALSE, FALSE, FALSE, 1, 6),
 
('81000030', 'CONSULTA ODONTOLÓGICA INICIAL', (SELECT id FROM odonto.especialidades WHERE codigo = 'CLIN'),
 FALSE, FALSE, FALSE, FALSE, FALSE, FALSE, 1, NULL),

-- Restaurações (precisam dente e face)
('85100196', 'RESTAURAÇÃO EM RESINA FOTOPOLIMERIZÁVEL 1 FACE', (SELECT id FROM odonto.especialidades WHERE codigo = 'DENT'),
 FALSE, TRUE, FALSE, FALSE, FALSE, FALSE, 1, 24),

('98241150', 'RESTAURAÇÃO C/ RESINA COMPOSTA CL I', (SELECT id FROM odonto.especialidades WHERE codigo = 'DENT'),
 FALSE, TRUE, TRUE, FALSE, FALSE, FALSE, 1, 24),

-- Endodontia (precisa dente e RX)
('85200140', 'TRATAMENTO ENDODÔNTICO BIRRADICULAR', (SELECT id FROM odonto.especialidades WHERE codigo = 'ENDO'),
 FALSE, TRUE, FALSE, FALSE, TRUE, TRUE, 2, NULL),

-- Cirurgia
('82000875', 'EXODONTIA SIMPLES DE PERMANENTE', (SELECT id FROM odonto.especialidades WHERE codigo = 'CIRUR'),
 FALSE, TRUE, FALSE, FALSE, FALSE, FALSE, 2, NULL),

-- Radiologia (precisa solicitante)
('81000421', 'RADIOGRAFIA PERIAPICAL', (SELECT id FROM odonto.especialidades WHERE codigo = 'RADIO'),
 FALSE, FALSE, FALSE, FALSE, FALSE, FALSE, 1, NULL),

-- Ortodontia (pré-aprovação)
('86000098', 'APARELHO ORTODÔNTICO FIXO METÁLICO', (SELECT id FROM odonto.especialidades WHERE codigo = 'ORTO'),
 TRUE, FALSE, FALSE, FALSE, FALSE, FALSE, 3, NULL),

-- Implante (pré-aprovação)
('82001065', 'LEVANTAMENTO DO SEIO MAXILAR COM OSSO LIOFILIZADO', (SELECT id FROM odonto.especialidades WHERE codigo = 'IMPL'),
 TRUE, FALSE, FALSE, TRUE, TRUE, TRUE, 4, NULL),

-- Prótese (pré-aprovação)
('85311030', 'PRÓTESE UNITÁRIA', (SELECT id FROM odonto.especialidades WHERE codigo = 'PROT'),
 TRUE, TRUE, FALSE, FALSE, TRUE, TRUE, 3, NULL);

-- Inserir alguns procedimentos excludentes
INSERT INTO odonto.procedimentos_excludentes (procedimento_id, procedimento_exclui_id, observacao) VALUES
((SELECT id FROM odonto.procedimentos WHERE codigo_tuss = '85100196'), 
 (SELECT id FROM odonto.procedimentos WHERE codigo_tuss = '98241150'),
 'Não pode fazer duas restaurações diferentes no mesmo dente'),
 
((SELECT id FROM odonto.procedimentos WHERE codigo_tuss = '82000875'),
 (SELECT id FROM odonto.procedimentos WHERE codigo_tuss = '85200140'),
 'Não pode extrair dente que está sendo tratado canal');

-- =====================================================
-- INDICES ADICIONAIS PARA PERFORMANCE
-- =====================================================

-- Criar índices adicionais se não existirem
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_indexes WHERE indexname = 'idx_solicitacao_itens_solicitacao') THEN
        CREATE INDEX idx_solicitacao_itens_solicitacao ON odonto.solicitacao_itens(solicitacao_id);
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM pg_indexes WHERE indexname = 'idx_solicitacao_historico_solicitacao') THEN
        CREATE INDEX idx_solicitacao_historico_solicitacao ON odonto.solicitacao_historico(solicitacao_id);
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM pg_indexes WHERE indexname = 'idx_procedimento_documentos_proc') THEN
        CREATE INDEX idx_procedimento_documentos_proc ON odonto.procedimento_documentos(procedimento_id);
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM pg_indexes WHERE indexname = 'idx_regras_customizadas_prestador') THEN
        CREATE INDEX idx_regras_customizadas_prestador ON odonto.regras_customizadas(prestador_id);
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM pg_indexes WHERE indexname = 'idx_sic_solicitacoes_solicitacao') THEN
        CREATE INDEX idx_sic_solicitacoes_solicitacao ON odonto.sic_solicitacoes(solicitacao_id);
    END IF;
END $$;

-- =====================================================
-- CONFIGURAÇÃO DE RLS (ROW LEVEL SECURITY) PARA SUPABASE
-- =====================================================

-- Habilitar RLS nas tabelas principais (ajustar conforme necessário)
ALTER TABLE odonto.solicitacoes ENABLE ROW LEVEL SECURITY;
ALTER TABLE odonto.solicitacao_itens ENABLE ROW LEVEL SECURITY;
ALTER TABLE odonto.prestadores ENABLE ROW LEVEL SECURITY;

-- Exemplo de políticas RLS (ajustar conforme sua aplicação)
-- Permitir que prestadores vejam apenas suas próprias solicitações
-- CREATE POLICY "Prestadores veem suas solicitações" ON odonto.solicitacoes
--     FOR SELECT
--     USING (prestador_id IN (
--         SELECT id FROM odonto.prestadores 
--         WHERE cnpj_cpf = current_setting('app.current_user_cpf')::text
--     ));

-- =====================================================
-- COMENTÁRIOS FINAIS
-- =====================================================

COMMENT ON SCHEMA odonto IS 'Schema principal do sistema de gestão de procedimentos odontológicos v2.0';

-- Queries úteis de exemplo:

-- 1. Buscar procedimentos que precisam de pré-aprovação
-- SELECT * FROM odonto.vw_procedimentos_completo WHERE requer_pre_aprovacao = TRUE;

-- 2. Verificar procedimentos excludentes
-- SELECT p1.descricao as procedimento, p2.descricao as exclui
-- FROM odonto.procedimentos_excludentes pe
-- JOIN odonto.procedimentos p1 ON pe.procedimento_id = p1.id
-- JOIN odonto.procedimentos p2 ON pe.procedimento_exclui_id = p2.id;

-- 3. Dashboard de solicitações
-- SELECT * FROM odonto.vw_solicitacoes_dashboard 
-- WHERE data_solicitacao >= CURRENT_DATE - INTERVAL '30 days'
-- ORDER BY data_solicitacao DESC;

-- 4. Procedimentos que exigem campos específicos
-- SELECT codigo_tuss, descricao,
--        CASE WHEN requer_dente THEN 'Dente' END as campo1,
--        CASE WHEN requer_face THEN 'Face' END as campo2,
--        CASE WHEN requer_regiao THEN 'Região' END as campo3
-- FROM odonto.procedimentos
-- WHERE requer_dente OR requer_face OR requer_regiao;