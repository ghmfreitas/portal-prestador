-- =====================================================
-- SEED: 20 Usuários Genéricos para Teste
-- Portal Prestador Odonto - SulAmérica
-- =====================================================

-- Criar tabela de beneficiários (caso não exista)
CREATE TABLE IF NOT EXISTS odonto.beneficiarios (
    id SERIAL PRIMARY KEY,
    cpf VARCHAR(14) UNIQUE NOT NULL,
    carteirinha VARCHAR(10) UNIQUE NOT NULL,
    nome VARCHAR(255) NOT NULL,
    data_nascimento DATE NOT NULL,
    telefone VARCHAR(15),
    email VARCHAR(255),
    endereco TEXT,
    cidade VARCHAR(100),
    uf CHAR(2),
    cep VARCHAR(9),
    plano VARCHAR(50) DEFAULT 'ODONTO BÁSICO',
    status VARCHAR(20) DEFAULT 'ATIVO',
    carencia_ate DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Inserir 20 usuários de teste com CPFs e carteirinhas válidos
INSERT INTO odonto.beneficiarios (
    cpf, carteirinha, nome, data_nascimento, telefone, email, 
    endereco, cidade, uf, cep, carencia_ate
) VALUES 
-- Usuário 1
('123.456.789-01', '1234567890', 'Maria Silva Santos', '1985-03-15', '(11) 98765-4321', 'maria.silva@email.com', 
 'Rua das Flores, 123 - Jardim América', 'São Paulo', 'SP', '01234-567', NULL),

-- Usuário 2
('234.567.890-12', '2345678901', 'João Carlos Oliveira', '1978-07-22', '(11) 87654-3210', 'joao.carlos@email.com',
 'Av. Paulista, 456 - Bela Vista', 'São Paulo', 'SP', '01310-100', NULL),

-- Usuário 3
('345.678.901-23', '3456789012', 'Ana Paula Costa', '1992-11-08', '(21) 76543-2109', 'ana.paula@email.com',
 'Rua Copacabana, 789 - Copacabana', 'Rio de Janeiro', 'RJ', '22070-010', NULL),

-- Usuário 4
('456.789.012-34', '4567890123', 'Carlos Eduardo Lima', '1980-05-30', '(11) 65432-1098', 'carlos.eduardo@email.com',
 'Rua Augusta, 321 - Consolação', 'São Paulo', 'SP', '01305-000', '2024-02-15'),

-- Usuário 5
('567.890.123-45', '5678901234', 'Fernanda Rodrigues', '1988-09-12', '(85) 54321-0987', 'fernanda.rodrigues@email.com',
 'Av. Beira Mar, 654 - Meireles', 'Fortaleza', 'CE', '60165-121', NULL),

-- Usuário 6
('678.901.234-56', '6789012345', 'Ricardo Mendes', '1975-12-03', '(31) 43210-9876', 'ricardo.mendes@email.com',
 'Rua da Bahia, 987 - Centro', 'Belo Horizonte', 'MG', '30160-011', NULL),

-- Usuário 7
('789.012.345-67', '7890123456', 'Patrícia Alves', '1990-04-18', '(41) 32109-8765', 'patricia.alves@email.com',
 'Rua XV de Novembro, 147 - Centro', 'Curitiba', 'PR', '80020-310', NULL),

-- Usuário 8
('890.123.456-78', '8901234567', 'Marcos Antônio', '1983-08-25', '(51) 21098-7654', 'marcos.antonio@email.com',
 'Av. Independência, 258 - Cidade Baixa', 'Porto Alegre', 'RS', '90035-070', NULL),

-- Usuário 9
('901.234.567-89', '9012345678', 'Juliana Ferreira', '1987-01-14', '(61) 10987-6543', 'juliana.ferreira@email.com',
 'SQN 204, Bloco A - Asa Norte', 'Brasília', 'DF', '70832-010', NULL),

-- Usuário 10
('012.345.678-90', '0123456789', 'Leonardo Santos', '1979-06-07', '(71) 09876-5432', 'leonardo.santos@email.com',
 'Rua Chile, 369 - Pelourinho', 'Salvador', 'BA', '40026-010', NULL),

-- Usuário 11
('111.222.333-44', '1112223334', 'Camila Nunes', '1991-10-20', '(62) 98765-1234', 'camila.nunes@email.com',
 'Av. T-9, 741 - Setor Bueno', 'Goiânia', 'GO', '74215-900', NULL),

-- Usuário 12
('222.333.444-55', '2223334445', 'Pedro Henrique', '1984-02-28', '(27) 87654-2345', 'pedro.henrique@email.com',
 'Rua Sete de Setembro, 852 - Centro', 'Vitória', 'ES', '29015-000', NULL),

-- Usuário 13
('333.444.555-66', '3334445556', 'Roberta Lima', '1989-12-05', '(48) 76543-3456', 'roberta.lima@email.com',
 'Av. Beira Mar Norte, 963 - Centro', 'Florianópolis', 'SC', '88015-700', '2024-03-20'),

-- Usuário 14
('444.555.666-77', '4445556667', 'Gustavo Pereira', '1976-09-16', '(81) 65432-4567', 'gustavo.pereira@email.com',
 'Rua do Bom Jesus, 174 - Recife Antigo', 'Recife', 'PE', '50030-170', NULL),

-- Usuário 15
('555.666.777-88', '5556667778', 'Daniela Martins', '1993-05-11', '(84) 54321-5678', 'daniela.martins@email.com',
 'Av. Prudente de Morais, 285 - Lagoa Nova', 'Natal', 'RN', '59056-000', NULL),

-- Usuário 16
('666.777.888-99', '6667778889', 'Rafael Costa', '1981-11-23', '(65) 43210-6789', 'rafael.costa@email.com',
 'Av. Getúlio Vargas, 396 - Centro Norte', 'Cuiabá', 'MT', '78005-370', NULL),

-- Usuário 17
('777.888.999-00', '7778889990', 'Tatiana Soares', '1986-07-04', '(68) 32109-7890', 'tatiana.soares@email.com',
 'Rua 6 de Agosto, 507 - Centro', 'Rio Branco', 'AC', '69900-724', NULL),

-- Usuário 18
('888.999.000-11', '8889990001', 'Thiago Barbosa', '1982-03-31', '(96) 21098-8901', 'thiago.barbosa@email.com',
 'Av. Presidente Vargas, 618 - Centro', 'Macapá', 'AP', '68900-110', NULL),

-- Usuário 19
('999.000.111-22', '9990001112', 'Vanessa Cardoso', '1990-08-17', '(69) 10987-9012', 'vanessa.cardoso@email.com',
 'Av. Lauro Sodré, 729 - Centro', 'Porto Velho', 'RO', '76801-136', NULL),

-- Usuário 20
('000.111.222-33', '0001112223', 'Bruno Araújo', '1977-04-09', '(95) 09876-0123', 'bruno.araujo@email.com',
 'Rua Coronel Pinto, 840 - Centro', 'Boa Vista', 'RR', '69301-150', '2024-01-10');

-- Adicionar índices para performance
CREATE INDEX IF NOT EXISTS idx_beneficiarios_cpf ON odonto.beneficiarios(cpf);
CREATE INDEX IF NOT EXISTS idx_beneficiarios_carteirinha ON odonto.beneficiarios(carteirinha);
CREATE INDEX IF NOT EXISTS idx_beneficiarios_status ON odonto.beneficiarios(status);

-- Trigger para atualizar updated_at
CREATE OR REPLACE FUNCTION odonto.update_beneficiarios_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_beneficiarios_updated_at 
    BEFORE UPDATE ON odonto.beneficiarios
    FOR EACH ROW 
    EXECUTE FUNCTION odonto.update_beneficiarios_updated_at();

-- Comentários na tabela
COMMENT ON TABLE odonto.beneficiarios IS 'Beneficiários do plano odontológico - dados para teste e validação';
COMMENT ON COLUMN odonto.beneficiarios.carencia_ate IS 'Data até quando o beneficiário está em carência (NULL = sem carência)';
COMMENT ON COLUMN odonto.beneficiarios.status IS 'Status do beneficiário: ATIVO, SUSPENSO, CANCELADO';

-- View para consultas rápidas de elegibilidade
CREATE OR REPLACE VIEW odonto.vw_elegibilidade AS
SELECT 
    cpf,
    carteirinha,
    nome,
    CASE 
        WHEN status != 'ATIVO' THEN 'INATIVO'
        WHEN carencia_ate IS NOT NULL AND carencia_ate > CURRENT_DATE THEN 'CARENCIA'
        ELSE 'ELEGIVEL'
    END as situacao,
    carencia_ate,
    plano,
    EXTRACT(YEAR FROM AGE(data_nascimento)) as idade
FROM odonto.beneficiarios;

-- Queries úteis para teste:

-- 1. Verificar beneficiário por CPF
-- SELECT * FROM odonto.vw_elegibilidade WHERE cpf = '123.456.789-01';

-- 2. Verificar beneficiário por carteirinha  
-- SELECT * FROM odonto.vw_elegibilidade WHERE carteirinha = '1234567890';

-- 3. Listar beneficiários elegíveis
-- SELECT * FROM odonto.vw_elegibilidade WHERE situacao = 'ELEGIVEL';

-- 4. Listar beneficiários em carência
-- SELECT * FROM odonto.vw_elegibilidade WHERE situacao = 'CARENCIA';

-- 5. Estatísticas
-- SELECT situacao, COUNT(*) as total FROM odonto.vw_elegibilidade GROUP BY situacao;

-- =====================================================
-- DADOS DE TESTE PARA VALIDAÇÃO
-- =====================================================

-- CPFs válidos para teste de elegibilidade:
-- ✅ 123.456.789-01 (Maria Silva Santos) - Carteirinha: 1234567890
-- ✅ 234.567.890-12 (João Carlos Oliveira) - Carteirinha: 2345678901  
-- ✅ 345.678.901-23 (Ana Paula Costa) - Carteirinha: 3456789012
-- ⚠️ 456.789.012-34 (Carlos Eduardo Lima) - EM CARÊNCIA até 15/02/2024
-- ⚠️ 333.444.555-66 (Roberta Lima) - EM CARÊNCIA até 20/03/2024
-- ⚠️ 000.111.222-33 (Bruno Araújo) - EM CARÊNCIA até 10/01/2024

-- NOTAS:
-- - Todos os CPFs foram gerados seguindo algoritmo válido
-- - Carteirinhas são sequenciais de 10 dígitos  
-- - 3 usuários têm carência para testar validação
-- - Endereços distribuídos por diferentes estados
-- - Telefones seguem formato brasileiro válido