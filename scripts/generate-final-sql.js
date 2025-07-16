const fs = require('fs');

// Ler dados filtrados
const procedimentos = JSON.parse(fs.readFileSync('documents/procedimentos_filtrados.json', 'utf8'));

console.log(`Gerando SQL final para ${procedimentos.length} procedimentos...`);

// Mapear especialidades com base nos dados reais da planilha
const especialidadesMap = {
    1: { nome: 'NÃO INFORMADA', codigo: 'NAO_INF', extra_rol: false },
    2: { nome: 'CIRURGIA', codigo: 'CIRURGIA', extra_rol: false },
    3: { nome: 'ENDODONTIA', codigo: 'ENDO', extra_rol: false },
    4: { nome: 'IMPLANTES', codigo: 'IMPLANTE', extra_rol: true },
    5: { nome: 'PRÓTESE', codigo: 'PROTESE', extra_rol: true },
    6: { nome: 'DENTÍSTICA', codigo: 'DENTISTICA', extra_rol: false },
    8: { nome: 'PERIODONTIA', codigo: 'PERIO', extra_rol: false },
    9: { nome: 'ORTODONTIA', codigo: 'ORTODONT', extra_rol: true },
    10: { nome: 'RADIOLOGIA', codigo: 'RADIO', extra_rol: false },
    11: { nome: 'ODONTOPEDIATRIA', codigo: 'ODONTOPED', extra_rol: false },
    15: { nome: 'DTM', codigo: 'DTM', extra_rol: false },
    18: { nome: 'ODONTOLOGIA ESTÉTICA', codigo: 'ESTETICA', extra_rol: true },
    19: { nome: 'URGÊNCIA DIURNA', codigo: 'URG_DIURNA', extra_rol: false },
    23: { nome: 'DIAGNÓSTICO', codigo: 'DIAGNOSTICO', extra_rol: false },
    25: { nome: 'PREVENÇÃO', codigo: 'PREV', extra_rol: false },
    27: { nome: 'URGÊNCIA NOTURNA/FERIADOS/SÁBADOS E DOM.', codigo: 'URG_NOTURNA', extra_rol: false },
    34: { nome: 'ORTODONTIA - ALINHADOR INVISÍVEL', codigo: 'ORTODONT_INVISIVEL', extra_rol: true },
    35: { nome: 'RADIOLOGIA COM ESCANEAMENTO', codigo: 'RADIO_SCAN', extra_rol: false }
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
CREATE TABLE IF NOT EXISTS odonto.backup_procedimentos_antigos_${new Date().toISOString().split('T')[0].replace(/-/g, '')} (
    id SERIAL PRIMARY KEY,
    codigo_tuss_original VARCHAR(20),
    descricao_original VARCHAR(255),
    especialidade_id_original INTEGER,
    data_backup TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    motivo TEXT DEFAULT 'Backup antes da substituição completa com dados da planilha Results.xlsx'
);

-- Fazer backup dos procedimentos existentes
DO $$
BEGIN
    IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'procedimentos' AND table_schema = 'odonto') THEN
        INSERT INTO odonto.backup_procedimentos_antigos_${new Date().toISOString().split('T')[0].replace(/-/g, '')} (
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
        
        RAISE NOTICE 'Backup dos procedimentos existentes criado';
    ELSE
        RAISE NOTICE 'Tabela procedimentos não existe, prosseguindo sem backup';
    END IF;
END $$;

-- 2. TRUNCAR TABELA DE PROCEDIMENTOS (REMOVER TODOS)
TRUNCATE TABLE odonto.procedimentos RESTART IDENTITY CASCADE;

DO $$
BEGIN
    RAISE NOTICE 'Tabela procedimentos limpa - todos os procedimentos removidos';
END $$;

-- 3. GARANTIR QUE AS ESPECIALIDADES EXISTAM
`;

// Adicionar todas as especialidades encontradas
Object.entries(especialidadesMap).forEach(([codigo, esp]) => {
    sql += `
INSERT INTO odonto.especialidades (codigo, descricao, extra_rol, ativa) 
VALUES ('${esp.codigo}', '${esp.nome}', ${esp.extra_rol}, TRUE)
ON CONFLICT (codigo) DO UPDATE SET
    descricao = EXCLUDED.descricao,
    extra_rol = EXCLUDED.extra_rol,
    ativa = EXCLUDED.ativa;`;
});

sql += `

DO $$
BEGIN
    RAISE NOTICE 'Especialidades atualizadas/inseridas';
END $$;

-- 4. INSERIR NOVOS PROCEDIMENTOS DA PLANILHA
`;

// Processar cada procedimento
procedimentos.forEach((proc, index) => {
    // Limpar e validar dados
    const codigoTuss = String(proc.codigo_tuss).trim().replace(/'/g, "''");
    const descricao = String(proc.descricao).replace(/'/g, "''");
    const especialidadeCod = especialidadesMap[proc.especialidade]?.codigo || 'NAO_INF';
    
    // Determinar flags baseadas nos dados da planilha
    const dentesPermitidos = String(proc.extra_col_6 || '').toLowerCase();
    const regioes = String(proc.extra_col_7 || '').toLowerCase();
    const raioxInicial = proc.extra_col_8 === 1;
    const raioxFinal = proc.extra_col_9 === 1;
    
    const requerDente = dentesPermitidos.includes('^') && !dentesPermitidos.includes('null');
    const requerRegiao = regioes.includes('asai') || regioes.includes('ai') || regioes.includes('as');
    const requerPreAprovacao = raioxInicial || raioxFinal || 
                              proc.descricao.toLowerCase().includes('ortodont') ||
                              proc.descricao.toLowerCase().includes('implant') ||
                              proc.descricao.toLowerCase().includes('prótese');
    
    // Determinar complexidade baseada na especialidade e características
    let complexidade = 1; // Baixa por padrão
    if (proc.especialidade === 4 || proc.especialidade === 9 || proc.especialidade === 34) {
        complexidade = 4; // Especial para implantes e ortodontia
    } else if (raioxInicial || raioxFinal) {
        complexidade = 3; // Alta para procedimentos com RX
    } else if (requerPreAprovacao) {
        complexidade = 2; // Média para pré-aprovação
    }
    
    sql += `
-- Procedimento ${index + 1}: ${codigoTuss} - ${descricao}
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
    FALSE, -- Face será determinada por lógica específica futura
    ${requerRegiao},
    ${raioxInicial},
    ${raioxFinal},
    ${complexidade}
);`;
});

sql += `

-- 5. VERIFICAÇÕES E RELATÓRIO FINAL
DO $$
DECLARE
    total_inseridos INTEGER;
    total_backup INTEGER;
    total_especialidades INTEGER;
    total_com_pre_aprovacao INTEGER;
BEGIN
    -- Contar registros
    SELECT COUNT(*) INTO total_inseridos FROM odonto.procedimentos;
    SELECT COUNT(*) INTO total_backup FROM odonto.backup_procedimentos_antigos_${new Date().toISOString().split('T')[0].replace(/-/g, '')};
    SELECT COUNT(*) INTO total_especialidades FROM odonto.especialidades WHERE ativa = TRUE;
    SELECT COUNT(*) INTO total_com_pre_aprovacao FROM odonto.procedimentos WHERE requer_pre_aprovacao = TRUE;
    
    -- Relatório
    RAISE NOTICE '================================================';
    RAISE NOTICE 'RELATÓRIO DE SUBSTITUIÇÃO DE PROCEDIMENTOS';
    RAISE NOTICE '================================================';
    RAISE NOTICE 'Procedimentos em backup: %', total_backup;
    RAISE NOTICE 'Novos procedimentos inseridos: %', total_inseridos;
    RAISE NOTICE 'Especialidades ativas: %', total_especialidades;
    RAISE NOTICE 'Procedimentos com pré-aprovação: %', total_com_pre_aprovacao;
    RAISE NOTICE 'Origem: Results.xlsx (Divulga = 1)';
    RAISE NOTICE 'Data da operação: ${new Date().toISOString()}';
    RAISE NOTICE '================================================';
    
    IF total_inseridos = ${procedimentos.length} THEN
        RAISE NOTICE 'SUCESSO TOTAL: Todos os procedimentos foram inseridos!';
    ELSE
        RAISE NOTICE 'ATENÇÃO: Diferença no número de procedimentos esperado vs inserido';
        RAISE NOTICE 'Esperado: ${procedimentos.length}, Inserido: %', total_inseridos;
    END IF;
END $$;

-- 6. RECRIAR VIEW ATUALIZADA
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

COMMENT ON VIEW odonto.vw_procedimentos_completo IS 'View completa de procedimentos baseada em Results.xlsx - atualizada em ${new Date().toISOString().split('T')[0]}';

DO $$
BEGIN
    RAISE NOTICE 'View vw_procedimentos_completo recriada com sucesso';
END $$;

-- 7. LOG DE EXECUÇÃO
INSERT INTO odonto.backup_procedimentos_antigos_${new Date().toISOString().split('T')[0].replace(/-/g, '')} (
    codigo_tuss_original, 
    descricao_original, 
    especialidade_id_original,
    motivo
) VALUES (
    'LOG_SUBSTITUICAO_COMPLETA', 
    'Substituição completa executada com dados da planilha Results.xlsx', 
    0,
    'Execução bem-sucedida em ${new Date().toISOString()} - ${procedimentos.length} procedimentos inseridos'
);

COMMIT;

-- =====================================================
-- QUERIES DE VERIFICAÇÃO (EXECUTAR SEPARADAMENTE)
-- =====================================================

/*
-- 1. Verificar procedimentos inseridos por especialidade
SELECT 
    e.codigo,
    e.descricao as especialidade,
    e.extra_rol,
    COUNT(p.id) as total_procedimentos,
    COUNT(CASE WHEN p.requer_pre_aprovacao THEN 1 END) as com_pre_aprovacao
FROM odonto.especialidades e
LEFT JOIN odonto.procedimentos p ON e.id = p.especialidade_id
WHERE e.ativa = TRUE
GROUP BY e.id, e.codigo, e.descricao, e.extra_rol
ORDER BY total_procedimentos DESC;

-- 2. Verificar complexidades
SELECT 
    nc.nivel,
    nc.descricao as complexidade,
    COUNT(p.id) as total_procedimentos
FROM odonto.niveis_complexidade nc
LEFT JOIN odonto.procedimentos p ON nc.id = p.nivel_complexidade_id
GROUP BY nc.id, nc.nivel, nc.descricao
ORDER BY nc.nivel;

-- 3. Testar view atualizada
SELECT 
    COUNT(*) as total_na_view,
    COUNT(DISTINCT especialidade) as especialidades_distintas,
    COUNT(CASE WHEN requer_pre_aprovacao THEN 1 END) as com_pre_aprovacao,
    COUNT(CASE WHEN requer_dente THEN 1 END) as requer_dente,
    COUNT(CASE WHEN requer_regiao THEN 1 END) as requer_regiao
FROM odonto.vw_procedimentos_completo;

-- 4. Verificar backup
SELECT 
    COUNT(*) as total_backups,
    MIN(data_backup) as primeiro_backup,
    MAX(data_backup) as ultimo_backup
FROM odonto.backup_procedimentos_antigos_${new Date().toISOString().split('T')[0].replace(/-/g, '')};
*/`;

// Salvar SQL
fs.writeFileSync('database/replace-procedimentos-completo.sql', sql);

console.log('✅ SQL final gerado com sucesso!');
console.log('📁 Arquivo: database/replace-procedimentos-completo.sql');
console.log(`📊 Total de procedimentos: ${procedimentos.length}`);
console.log(`🏥 Especialidades mapeadas: ${Object.keys(especialidadesMap).length}`);

// Estatísticas
const stats = {};
procedimentos.forEach(proc => {
    const esp = especialidadesMap[proc.especialidade]?.nome || 'DESCONHECIDA';
    stats[esp] = (stats[esp] || 0) + 1;
});

console.log('\n📊 DISTRIBUIÇÃO POR ESPECIALIDADE:');
Object.entries(stats).sort((a, b) => b[1] - a[1]).forEach(([esp, count]) => {
    console.log(`  ${esp}: ${count} procedimentos`);
});