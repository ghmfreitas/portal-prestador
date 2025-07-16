const fs = require('fs');

// Ler dados filtrados
const data = JSON.parse(fs.readFileSync('documents/procedimentos_filtrados.json', 'utf8'));
const jaInseridos = ['81000049', '85100196', '85200140', '82000875', '81000421', '82001065'];

// Filtrar procedimentos que ainda precisam ser inseridos
const paraInserir = data.filter(proc => 
    !jaInseridos.includes(String(proc.codigo_tuss))
);

console.log('Total na planilha:', data.length);
console.log('Já inseridos no banco:', jaInseridos.length); 
console.log('Para inserir:', paraInserir.length);

// Dividir em 4 blocos de aproximadamente 100 procedimentos cada
const tamanhoBloco = Math.ceil(paraInserir.length / 4);
console.log('Tamanho aproximado por bloco:', tamanhoBloco);

// Mapeamento de especialidades
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
    
    return `-- ${index}: ${codigoTuss} - ${descricao}
('${codigoTuss}', '${descricao}', (SELECT id FROM odonto.especialidades WHERE codigo = '${especialidadeCod}' LIMIT 1), TRUE, ${requerPreAprovacao}, ${requerDente}, FALSE, ${requerRegiao}, ${raioxInicial}, ${raioxFinal}, ${complexidade})`;
}

// Gerar os 4 blocos
for(let i = 0; i < 4; i++) {
    const inicio = i * tamanhoBloco;
    const fim = Math.min(inicio + tamanhoBloco, paraInserir.length);
    const bloco = paraInserir.slice(inicio, fim);
    
    console.log(`Bloco ${i+1}: ${bloco.length} procedimentos (posições ${inicio+1}-${fim})`);
    
    let sql = `-- =====================================================
-- INSERÇÃO DE PROCEDIMENTOS - BLOCO ${i+1}/4
-- Data: 2025-07-01
-- Procedimentos: ${inicio+1}-${fim} (${bloco.length} total)
-- Origem: Results.xlsx (excluindo os 6 já inseridos)
-- =====================================================

BEGIN;

-- Inserir procedimentos do bloco ${i+1}
INSERT INTO odonto.procedimentos (
    codigo_tuss, descricao, especialidade_id, ativo,
    requer_pre_aprovacao, requer_dente, requer_face, requer_regiao,
    requer_rx_inicial, requer_rx_final, nivel_complexidade_id
) VALUES
`;

    // Adicionar cada procedimento do bloco
    bloco.forEach((proc, index) => {
        sql += gerarSQLProcedimento(proc, inicio + index + 1);
        if (index < bloco.length - 1) {
            sql += ',\n';
        } else {
            sql += ';\n';
        }
    });

    sql += `
-- Verificação do bloco ${i+1}
DO $$
DECLARE
    total_inseridos INTEGER;
    total_bloco INTEGER := ${bloco.length};
BEGIN
    SELECT COUNT(*) INTO total_inseridos FROM odonto.procedimentos;
    
    RAISE NOTICE '================================================';
    RAISE NOTICE 'RELATÓRIO DO BLOCO ${i+1}';
    RAISE NOTICE '================================================';
    RAISE NOTICE '✅ Procedimentos inseridos neste bloco: %', total_bloco;
    RAISE NOTICE '📊 Total de procedimentos no banco: %', total_inseridos;
    RAISE NOTICE '🎯 Progresso: Bloco ${i+1}/4 concluído';
    RAISE NOTICE '================================================';
END $$;

COMMIT;

-- =====================================================
-- PRÓXIMO PASSO: ${i+1 < 4 ? `Execute insert-procedimentos-bloco${i+2}.sql` : 'Todos os blocos concluídos!'}
-- =====================================================`;

    // Salvar arquivo
    fs.writeFileSync(`database/insert-procedimentos-bloco${i+1}.sql`, sql);
}

console.log('\\n✅ 4 arquivos de inserção criados:');
console.log('  📄 insert-procedimentos-bloco1.sql');
console.log('  📄 insert-procedimentos-bloco2.sql'); 
console.log('  📄 insert-procedimentos-bloco3.sql');
console.log('  📄 insert-procedimentos-bloco4.sql');
console.log(`\\n🎯 Total: ${paraInserir.length} novos procedimentos`);
console.log(`📋 6 procedimentos já existentes mantidos`);