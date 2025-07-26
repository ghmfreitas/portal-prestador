-- =====================================================
-- REMOÇÃO DE PROCEDIMENTOS INEXISTENTES NA PLANILHA
-- Data: 2025-07-01
-- Objetivo: Remover procedimentos que não existem na planilha Results.xlsx
-- =====================================================

BEGIN;

-- 1. PRIMEIRO: Remover relacionamentos na tabela procedimentos_excludentes
-- que referenciam os procedimentos que serão deletados
DELETE FROM odonto.procedimentos_excludentes 
WHERE procedimento_id IN (
    SELECT id FROM odonto.procedimentos 
    WHERE codigo_tuss IN ('81000030', '98241150', '86000098', '85311030')
) OR procedimento_exclui_id IN (
    SELECT id FROM odonto.procedimentos 
    WHERE codigo_tuss IN ('81000030', '98241150', '86000098', '85311030')
);

-- 2. SEGUNDO: Agora remover os procedimentos que não estão na planilha Results.xlsx
DELETE FROM odonto.procedimentos 
WHERE codigo_tuss IN (
    '81000030', -- CONSULTA ODONTOLÓGICA INICIAL
    '98241150', -- RESTAURAÇÃO C/ RESINA COMPOSTA CL I
    '86000098', -- APARELHO ORTODÔNTICO FIXO METÁLICO
    '85311030'  -- PRÓTESE UNITÁRIA
);

-- Atualizar descrição do procedimento que existe mas tem descrição diferente
UPDATE odonto.procedimentos 
SET descricao = 'CONSULTA ODONTOLÓGICA DE URGÊNCIA'
WHERE codigo_tuss = '81000049';

-- Relatório de limpeza
DO $$
DECLARE
    total_restante INTEGER;
    total_excludentes INTEGER;
BEGIN
    SELECT COUNT(*) INTO total_restante FROM odonto.procedimentos;
    SELECT COUNT(*) INTO total_excludentes FROM odonto.procedimentos_excludentes;
    
    RAISE NOTICE '================================================';
    RAISE NOTICE 'RELATÓRIO DE LIMPEZA DOS PROCEDIMENTOS';
    RAISE NOTICE '================================================';
    RAISE NOTICE '🔗 Relacionamentos excludentes removidos';
    RAISE NOTICE '🗑️  Procedimentos removidos: 4';
    RAISE NOTICE '✏️  Descrições atualizadas: 1';
    RAISE NOTICE '📊 Total de procedimentos restantes: %', total_restante;
    RAISE NOTICE '🔗 Total de relacionamentos excludentes: %', total_excludentes;
    RAISE NOTICE '✅ Base limpa e pronta para inserção dos dados da planilha';
    RAISE NOTICE '================================================';
END $$;

COMMIT;

-- =====================================================
-- CORREÇÃO v2 - RESOLVE ERRO DE FOREIGN KEY
-- 
-- PROBLEMA ORIGINAL:
-- ERROR: 23503: update or delete on table "procedimentos" violates 
-- foreign key constraint "procedimentos_excludentes_procedimento_exclui_id_fkey"
-- 
-- SOLUÇÃO APLICADA:
-- 1. Remove relacionamentos na tabela procedimentos_excludentes PRIMEIRO
-- 2. Depois remove os procedimentos sem violar constraints
-- 
-- PROCEDIMENTOS REMOVIDOS:
-- - 81000030: CONSULTA ODONTOLÓGICA INICIAL
-- - 98241150: RESTAURAÇÃO C/ RESINA COMPOSTA CL I  
-- - 86000098: APARELHO ORTODÔNTICO FIXO METÁLICO
-- - 85311030: PRÓTESE UNITÁRIA
-- 
-- PROCEDIMENTOS ATUALIZADOS:
-- - 81000049: PROFILAXIA → CONSULTA ODONTOLÓGICA DE URGÊNCIA
-- 
-- PRÓXIMO PASSO: Execute os arquivos de inserção na ordem
-- =====================================================