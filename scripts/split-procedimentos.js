const fs = require('fs');

// Ler dados filtrados
const procedimentos = JSON.parse(fs.readFileSync('documents/procedimentos_filtrados.json', 'utf8'));

console.log(`Dividindo ${procedimentos.length} procedimentos em 3 partes...`);

// Mapear especialidades
const especialidadesMap = {
    1: 'NAO_INF',
    2: 'CIRURGIA',
    3: 'ENDO',
    4: 'IMPLANTE',
    5: 'PROTESE',
    6: 'DENT',
    8: 'PERIO',
    9: 'ORTODONT',
    10: 'RADIO',
    11: 'ODONTOP',
    15: 'DTM',
    18: 'ESTETICA',
    19: 'URG_DIURNA',
    23: 'DIAGNOST',
    25: 'PREV',
    27: 'URG_NOT',
    34: 'ORT_INVIS',
    35: 'RAD_SCAN'
};

// Função para gerar SQL de um procedimento
function gerarSQLProcedimento(proc, index) {
    const codigoTuss = String(proc.codigo_tuss).trim().replace(/'/g, "''");
    const descricao = String(proc.descricao).replace(/'/g, "''");
    const especialidadeCod = especialidadesMap[proc.especialidade] || 'NAO_INF';
    
    // Determinar flags
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
    
    // Determinar complexidade
    let complexidade = 1;
    if (proc.especialidade === 4 || proc.especialidade === 9 || proc.especialidade === 34) {
        complexidade = 4;
    } else if (raioxInicial || raioxFinal) {
        complexidade = 3;
    } else if (requerPreAprovacao) {
        complexidade = 2;
    }
    
    return `
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
    FALSE,
    ${requerRegiao},
    ${raioxInicial},
    ${raioxFinal},
    ${complexidade}
)
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
    nivel_complexidade_id = EXCLUDED.nivel_complexidade_id;`;
}

// Dividir em 3 partes
const parte1 = procedimentos.slice(0, 136);   // 1-136
const parte2 = procedimentos.slice(136, 272); // 137-272  
const parte3 = procedimentos.slice(272);      // 273-407

// Gerar Parte 1
let sql1 = `-- =====================================================
-- 03 - INSERÇÃO DOS PROCEDIMENTOS - PARTE 1/3
-- Data: 2025-07-01
-- Procedimentos: 1-136 (${parte1.length} total)
-- =====================================================

BEGIN;

-- INSERÇÃO DOS PRIMEIROS 136 PROCEDIMENTOS
`;

parte1.forEach((proc, index) => {
    sql1 += gerarSQLProcedimento(proc, index);
});

sql1 += `

-- VERIFICAÇÃO DA PARTE 1
DO $$
DECLARE
    total_inseridos INTEGER;
BEGIN
    SELECT COUNT(*) INTO total_inseridos FROM odonto.procedimentos;
    
    RAISE NOTICE '================================================';
    RAISE NOTICE '📊 RELATÓRIO DA PARTE 1';
    RAISE NOTICE '================================================';
    RAISE NOTICE '✅ Procedimentos inseridos até agora: %', total_inseridos;
    RAISE NOTICE '🎯 Meta da Parte 1: ${parte1.length} procedimentos';
    RAISE NOTICE '================================================';
END $$;

COMMIT;

-- =====================================================
-- PRÓXIMO PASSO: Execute 04-procedimentos-parte2.sql
-- =====================================================`;

// Gerar Parte 2
let sql2 = `-- =====================================================
-- 04 - INSERÇÃO DOS PROCEDIMENTOS - PARTE 2/3
-- Data: 2025-07-01
-- Procedimentos: 137-272 (${parte2.length} total)
-- =====================================================

BEGIN;

-- INSERÇÃO DOS PROCEDIMENTOS 137-272
`;

parte2.forEach((proc, index) => {
    sql2 += gerarSQLProcedimento(proc, index + 136);
});

sql2 += `

-- VERIFICAÇÃO DA PARTE 2
DO $$
DECLARE
    total_inseridos INTEGER;
BEGIN
    SELECT COUNT(*) INTO total_inseridos FROM odonto.procedimentos;
    
    RAISE NOTICE '================================================';
    RAISE NOTICE '📊 RELATÓRIO DA PARTE 2';
    RAISE NOTICE '================================================';
    RAISE NOTICE '✅ Procedimentos inseridos até agora: %', total_inseridos;
    RAISE NOTICE '🎯 Meta após Parte 2: ${parte1.length + parte2.length} procedimentos';
    RAISE NOTICE '================================================';
END $$;

COMMIT;

-- =====================================================
-- PRÓXIMO PASSO: Execute 05-procedimentos-parte3.sql
-- =====================================================`;

// Gerar Parte 3
let sql3 = `-- =====================================================
-- 05 - INSERÇÃO DOS PROCEDIMENTOS - PARTE 3/3
-- Data: 2025-07-01
-- Procedimentos: 273-407 (${parte3.length} total)
-- =====================================================

BEGIN;

-- INSERÇÃO DOS PROCEDIMENTOS FINAIS 273-407
`;

parte3.forEach((proc, index) => {
    sql3 += gerarSQLProcedimento(proc, index + 272);
});

sql3 += `

-- VERIFICAÇÃO FINAL DA PARTE 3
DO $$
DECLARE
    total_inseridos INTEGER;
    total_com_pre_aprovacao INTEGER;
BEGIN
    SELECT COUNT(*) INTO total_inseridos FROM odonto.procedimentos;
    SELECT COUNT(*) INTO total_com_pre_aprovacao FROM odonto.procedimentos WHERE requer_pre_aprovacao = TRUE;
    
    RAISE NOTICE '================================================';
    RAISE NOTICE '🎉 RELATÓRIO FINAL DA PARTE 3';
    RAISE NOTICE '================================================';
    RAISE NOTICE '✅ Total de procedimentos inseridos: %', total_inseridos;
    RAISE NOTICE '🔒 Procedimentos com pré-aprovação: %', total_com_pre_aprovacao;
    RAISE NOTICE '🎯 Meta total: ${procedimentos.length} procedimentos';
    
    IF total_inseridos = ${procedimentos.length} THEN
        RAISE NOTICE '🎉 SUCESSO TOTAL: Todos os procedimentos foram inseridos!';
    ELSE
        RAISE NOTICE '⚠️  ATENÇÃO: Diferença detectada no total esperado';
    END IF;
    RAISE NOTICE '================================================';
END $$;

COMMIT;

-- =====================================================
-- PRÓXIMO PASSO: Execute 06-finalizacao.sql
-- =====================================================`;

// Salvar arquivos
fs.writeFileSync('database/replace-procedimentos/03-procedimentos-parte1.sql', sql1);
fs.writeFileSync('database/replace-procedimentos/04-procedimentos-parte2.sql', sql2);
fs.writeFileSync('database/replace-procedimentos/05-procedimentos-parte3.sql', sql3);

console.log('✅ Arquivos de procedimentos gerados:');
console.log(`  📄 Parte 1: ${parte1.length} procedimentos`);
console.log(`  📄 Parte 2: ${parte2.length} procedimentos`);
console.log(`  📄 Parte 3: ${parte3.length} procedimentos`);
console.log(`  🎯 Total: ${procedimentos.length} procedimentos`);