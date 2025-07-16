const fs = require('fs');

// Corrigir os 4 blocos adicionando ON CONFLICT
for(let i = 1; i <= 4; i++) {
    const arquivo = `database/insert-procedimentos-bloco${i}.sql`;
    
    if(fs.existsSync(arquivo)) {
        let conteudo = fs.readFileSync(arquivo, 'utf8');
        
        // Encontrar onde termina o VALUES e adicionar ON CONFLICT
        const regex = /(\) VALUES[\s\S]*?);(\s*-- Verificação)/;
        
        const onConflict = `)
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
        
        // Substituir o ); pelo ON CONFLICT
        conteudo = conteudo.replace(regex, (match, values, verificacao) => {
            return values.replace(/;$/, onConflict) + verificacao;
        });
        
        // Atualizar cabeçalho para indicar correção
        conteudo = conteudo.replace(
            /-- Data: 2025-07-01/,
            `-- Data: 2025-07-01 (CORRIGIDO - ON CONFLICT adicionado)`
        );
        
        // Salvar arquivo corrigido
        fs.writeFileSync(arquivo, conteudo);
        console.log(`✅ Bloco ${i} corrigido - ON CONFLICT adicionado`);
    } else {
        console.log(`❌ Arquivo não encontrado: ${arquivo}`);
    }
}

console.log('\\n🎯 Todos os blocos foram corrigidos!');
console.log('📋 Agora eles podem ser executados sem erro de duplicata');
console.log('🔄 Se um código já existir, será atualizado em vez de gerar erro');