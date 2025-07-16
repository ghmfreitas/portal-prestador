const fs = require('fs');

// Ler dados filtrados
const procedimentos = JSON.parse(fs.readFileSync('documents/procedimentos_filtrados.json', 'utf8'));

console.log(`Gerando SQL para ${procedimentos.length} procedimentos...`);

// Mapear especialidades (pelos códigos encontrados na planilha)
const especialidadesMap = {
    1: { nome: 'NÃO INFORMADA', codigo: 'NAO_INF' },
    5: { nome: 'PRÓTESE', codigo: 'PROTESE' },
    8: { nome: 'PERIODONTIA', codigo: 'PERIO' },
    10: { nome: 'RADIOLOGIA', codigo: 'RADIO' },
    17: { nome: 'CLÍNICA GERAL', codigo: 'CLINICA' },
    25: { nome: 'PREVENÇÃO', codigo: 'PREV' },
    // Adicionar mais conforme necessário
};

// Gerar SQL
let sql = `-- =====================================================
-- SUBSTITUIÇÃO COMPLETA DE PROCEDIMENTOS - Results.xlsx
-- Data: ${new Date().toISOString().split('T')[0]}
-- Total de procedimentos: ${procedimentos.length}
-- Origem: documents/Results.xlsx (coluna Divulga = 1)
-- =====================================================

BEGIN;

-- 1. CRIAR BACKUP DOS PROCEDIMENTOS ATUAIS
CREATE TABLE IF NOT EXISTS odonto.backup_procedimentos_antigos (
    id SERIAL PRIMARY KEY,
    codigo_tuss_original VARCHAR(20),
    descricao_original VARCHAR(255),
    especialidade_id_original INTEGER,
    data_backup TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    motivo TEXT DEFAULT 'Backup antes da substituição completa com dados da planilha Results.xlsx'
);

-- Fazer backup dos procedimentos existentes
INSERT INTO odonto.backup_procedimentos_antigos (
    codigo_tuss_original, 
    descricao_original, 
    especialidade_id_original
)
SELECT 
    codigo_tuss,
    descricao,
    especialidade_id
FROM odonto.procedimentos
ON CONFLICT DO NOTHING;

-- 2. TRUNCAR TABELA DE PROCEDIMENTOS (REMOVER TODOS)
TRUNCATE TABLE odonto.procedimentos RESTART IDENTITY CASCADE;

-- 3. GARANTIR QUE AS ESPECIALIDADES EXISTAM
`;

// Adicionar especialidades únicas encontradas
const especialidadesUnicas = [...new Set(procedimentos.map(p => p.especialidade))];
especialidadesUnicas.forEach(codEsp => {
    if (especialidadesMap[codEsp]) {
        const esp = especialidadesMap[codEsp];
        sql += `
INSERT INTO odonto.especialidades (codigo, descricao, extra_rol, ativa) 
VALUES ('${esp.codigo}', '${esp.nome}', FALSE, TRUE)
ON CONFLICT (codigo) DO NOTHING;`;
    }
});

sql += `

-- 4. INSERIR NOVOS PROCEDIMENTOS DA PLANILHA
`;

// Processar cada procedimento
procedimentos.forEach((proc, index) => {
    // Limpar e validar dados
    const codigoTuss = String(proc.codigo_tuss).trim().replace(/['"]/g, "''");
    const descricao = String(proc.descricao).replace(/['"]/g, "''");
    const especialidadeCod = especialidadesMap[proc.especialidade]?.codigo || 'NAO_INF';
    
    // Determinar flags baseadas nos dados da planilha
    const dentesPermitidos = String(proc.extra_col_6 || '').toLowerCase();
    const regioes = String(proc.extra_col_7 || '').toLowerCase();
    const raioxInicial = proc.extra_col_8 === 1;
    const raioxFinal = proc.extra_col_9 === 1;
    
    const requerDente = dentesPermitidos.includes('^') || dentesPermitidos.includes('NULL') === false;
    const requerRegiao = regioes.includes('asai') || regioes.includes('ai') || regioes.includes('as');
    const requerPreAprovacao = raioxInicial || raioxFinal || proc.descricao.toLowerCase().includes('ortodont');
    
    sql += `
-- Procedimento ${index + 1}: ${codigoTuss}
INSERT INTO odonto.procedimentos (
    codigo_tuss,
    descricao,
    especialidade_id,
    ativo,
    requer_pre_aprovacao,
    requer_dente,
    requer_face,
    requer_regiao,
    requer_rx_inicial,
    requer_rx_final,
    nivel_complexidade_id
) VALUES (
    '${codigoTuss}',
    '${descricao}',
    (SELECT id FROM odonto.especialidades WHERE codigo = '${especialidadeCod}' LIMIT 1),
    TRUE,
    ${requerPreAprovacao},
    ${requerDente},
    FALSE, -- Face será determinada por lógica específica
    ${requerRegiao},
    ${raioxInicial},
    ${raioxFinal},
    1 -- Padrão: complexidade baixa
);`;
});

sql += `

-- 5. VERIFICAÇÕES E RELATÓRIO FINAL
DO $$
DECLARE
    total_inseridos INTEGER;
    total_backup INTEGER;
    total_especialidades INTEGER;
BEGIN
    -- Contar registros
    SELECT COUNT(*) INTO total_inseridos FROM odonto.procedimentos;
    SELECT COUNT(*) INTO total_backup FROM odonto.backup_procedimentos_antigos;
    SELECT COUNT(*) INTO total_especialidades FROM odonto.especialidades;
    
    -- Relatório
    RAISE NOTICE '================================================';
    RAISE NOTICE 'RELATÓRIO DE SUBSTITUIÇÃO DE PROCEDIMENTOS';
    RAISE NOTICE '================================================';
    RAISE NOTICE 'Procedimentos em backup: %', total_backup;
    RAISE NOTICE 'Novos procedimentos inseridos: %', total_inseridos;
    RAISE NOTICE 'Especialidades disponíveis: %', total_especialidades;
    RAISE NOTICE 'Origem: Results.xlsx (Divulga = 1)';
    RAISE NOTICE '================================================';
    
    IF total_inseridos = ${procedimentos.length} THEN
        RAISE NOTICE 'SUCESSO: Todos os procedimentos foram inseridos corretamente!';
    ELSE
        RAISE NOTICE 'ATENÇÃO: Diferença no número de procedimentos inseridos';
    END IF;
END $$;

-- 6. ATUALIZAR VIEW (se necessário)
DROP VIEW IF EXISTS odonto.vw_procedimentos_completo CASCADE;

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
    p.prazo_longevidade_meses,
    p.idade_minima,
    p.idade_maxima,
    p.ativo,
    p.created_at,
    p.updated_at
FROM odonto.procedimentos p
JOIN odonto.especialidades e ON p.especialidade_id = e.id
LEFT JOIN odonto.niveis_complexidade nc ON p.nivel_complexidade_id = nc.id
WHERE p.ativo = TRUE;

COMMENT ON VIEW odonto.vw_procedimentos_completo IS 'View completa de procedimentos baseada em Results.xlsx - ${new Date().toISOString().split('T')[0]}';

-- 7. LOG DE EXECUÇÃO
INSERT INTO odonto.backup_procedimentos_antigos (
    codigo_tuss_original, 
    descricao_original, 
    especialidade_id_original,
    motivo
) VALUES (
    'LOG_SUBSTITUICAO', 
    'Substituição completa executada com sucesso', 
    0,
    'Log de execução da substituição completa - ${new Date().toISOString()}'
);

COMMIT;

-- =====================================================
-- QUERIES DE VERIFICAÇÃO (EXECUTAR SEPARADAMENTE)
-- =====================================================

/*
-- Verificar procedimentos inseridos
SELECT 
    'NOVOS PROCEDIMENTOS' as tipo,
    COUNT(*) as total,
    COUNT(DISTINCT especialidade_id) as especialidades_distintas
FROM odonto.procedimentos;

-- Verificar especialidades
SELECT 
    'ESPECIALIDADES' as tipo,
    codigo,
    descricao,
    (SELECT COUNT(*) FROM odonto.procedimentos WHERE especialidade_id = e.id) as total_procedimentos
FROM odonto.especialidades e
ORDER BY total_procedimentos DESC;

-- Verificar backup
SELECT 
    'BACKUP' as tipo,
    COUNT(*) as total_backups,
    MIN(data_backup) as primeiro_backup,
    MAX(data_backup) as ultimo_backup
FROM odonto.backup_procedimentos_antigos;

-- Testar view atualizada
SELECT 
    'VIEW TESTE' as tipo,
    COUNT(*) as procedimentos_na_view,
    COUNT(DISTINCT especialidade) as especialidades_na_view
FROM odonto.vw_procedimentos_completo;
*/`;

// Salvar SQL
fs.writeFileSync('database/replace-procedimentos-planilha.sql', sql);

console.log('✅ SQL gerado com sucesso!');
console.log('📁 Arquivo: database/replace-procedimentos-planilha.sql');
console.log(`📊 Total de procedimentos: ${procedimentos.length}`);
console.log(`📋 Especialidades encontradas: ${especialidadesUnicas.join(', ')}`);