-- =====================================================
-- FIX PERMISSIONS - Schema Odonto para API Supabase
-- =====================================================

-- Conceder permissões de USAGE no schema odonto para usuários anônimos e autenticados
GRANT USAGE ON SCHEMA odonto TO anon, authenticated, service_role;

-- Conceder permissões SELECT nas tabelas principais para usuários anônimos e autenticados
GRANT SELECT ON ALL TABLES IN SCHEMA odonto TO anon, authenticated;
GRANT ALL ON ALL TABLES IN SCHEMA odonto TO service_role;

-- Conceder permissões específicas para tabelas que podem ser acessadas publicamente
GRANT SELECT ON odonto.especialidades TO anon, authenticated;
GRANT SELECT ON odonto.procedimentos TO anon, authenticated;
GRANT SELECT ON odonto.niveis_complexidade TO anon, authenticated;
GRANT SELECT ON odonto.tipos_documento TO anon, authenticated;
GRANT SELECT ON odonto.tipos_imagem TO anon, authenticated;
GRANT SELECT ON odonto.status_solicitacao TO anon, authenticated;

-- Conceder permissões nas views
GRANT SELECT ON ALL VIEWS IN SCHEMA odonto TO anon, authenticated;
GRANT ALL ON ALL VIEWS IN SCHEMA odonto TO service_role;

-- Configurar permissões padrão para novos objetos
ALTER DEFAULT PRIVILEGES IN SCHEMA odonto GRANT SELECT ON TABLES TO anon, authenticated;
ALTER DEFAULT PRIVILEGES IN SCHEMA odonto GRANT ALL ON TABLES TO service_role;
ALTER DEFAULT PRIVILEGES IN SCHEMA odonto GRANT SELECT ON VIEWS TO anon, authenticated;
ALTER DEFAULT PRIVILEGES IN SCHEMA odonto GRANT ALL ON VIEWS TO service_role;

-- Para tabelas de transação, conceder apenas para usuários autenticados
GRANT SELECT, INSERT, UPDATE ON odonto.solicitacoes TO authenticated;
GRANT SELECT, INSERT, UPDATE ON odonto.solicitacao_itens TO authenticated;
GRANT SELECT, INSERT ON odonto.solicitacao_historico TO authenticated;
GRANT SELECT, INSERT ON odonto.solicitacao_anexos TO authenticated;

-- Desabilitar RLS para algumas tabelas de lookup (ou configurar políticas permissivas)
ALTER TABLE odonto.especialidades DISABLE ROW LEVEL SECURITY;
ALTER TABLE odonto.niveis_complexidade DISABLE ROW LEVEL SECURITY;
ALTER TABLE odonto.tipos_documento DISABLE ROW LEVEL SECURITY;
ALTER TABLE odonto.tipos_imagem DISABLE ROW LEVEL SECURITY;
ALTER TABLE odonto.status_solicitacao DISABLE ROW LEVEL SECURITY;
ALTER TABLE odonto.procedimentos DISABLE ROW LEVEL SECURITY;

-- Recriar a view para garantir que ela existe e tenha as permissões corretas
DROP VIEW IF EXISTS odonto.vw_procedimentos_completo;

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

-- Conceder permissões na view recriada
GRANT SELECT ON odonto.vw_procedimentos_completo TO anon, authenticated;

-- Para beneficiários, se existir, manter RLS mas criar política permissiva para consultas
DO $$
BEGIN
    IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_schema = 'odonto' AND table_name = 'beneficiarios') THEN
        ALTER TABLE odonto.beneficiarios ENABLE ROW LEVEL SECURITY;
        
        -- Política para permitir consulta de beneficiários (elegibilidade)
        CREATE POLICY IF NOT EXISTS "Permitir consulta elegibilidade" ON odonto.beneficiarios
            FOR SELECT
            TO anon, authenticated
            USING (true);
    END IF;
END $$;

-- Comentários
COMMENT ON SCHEMA odonto IS 'Schema odonto com permissões configuradas para API Supabase';

-- =====================================================
-- VERIFICAÇÃO DAS PERMISSÕES
-- =====================================================

-- Query para verificar permissões concedidas
-- SELECT 
--     schemaname, 
--     tablename, 
--     grantor, 
--     grantee, 
--     privilege_type 
-- FROM information_schema.table_privileges 
-- WHERE schemaname = 'odonto' 
-- AND grantee IN ('anon', 'authenticated')
-- ORDER BY tablename, grantee;

-- Query para verificar status RLS
-- SELECT 
--     schemaname,
--     tablename,
--     rowsecurity
-- FROM pg_tables 
-- WHERE schemaname = 'odonto'
-- ORDER BY tablename;

-- =====================================================
-- NOTAS IMPORTANTES
-- =====================================================

-- 1. Essas permissões permitem acesso de leitura às tabelas de lookup
-- 2. Para tabelas de transação, apenas usuários autenticados têm acesso
-- 3. A tabela beneficiários tem RLS habilitado com política permissiva
-- 4. Views herdam as permissões das tabelas subjacentes
-- 5. Ajuste as políticas conforme suas necessidades de segurança

-- =====================================================
-- GRANTS PARA SEQUENCES (se necessário)
-- =====================================================

GRANT USAGE ON ALL SEQUENCES IN SCHEMA odonto TO authenticated;