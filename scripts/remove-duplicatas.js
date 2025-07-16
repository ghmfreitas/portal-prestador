const fs = require('fs');

// Função para remover duplicatas de um bloco
function removerDuplicatas(arquivo) {
    if (!fs.existsSync(arquivo)) {
        console.log(`❌ Arquivo não encontrado: ${arquivo}`);
        return;
    }
    
    let conteudo = fs.readFileSync(arquivo, 'utf8');
    const linhas = conteudo.split('\n');
    
    // Encontrar início e fim do INSERT
    let inicioInsert = -1;
    let fimInsert = -1;
    
    for (let i = 0; i < linhas.length; i++) {
        if (linhas[i].includes(') VALUES')) {
            inicioInsert = i + 1;
        }
        if (linhas[i].includes('ON CONFLICT')) {
            fimInsert = i - 1;
            break;
        }
    }
    
    if (inicioInsert === -1 || fimInsert === -1) {
        console.log(`❌ Não foi possível encontrar INSERT em ${arquivo}`);
        return;
    }
    
    console.log(`📋 Processando ${arquivo}...`);
    console.log(`   Linhas INSERT: ${inicioInsert + 1} até ${fimInsert + 1}`);
    
    // Extrair linhas do INSERT
    const linhasInsert = linhas.slice(inicioInsert, fimInsert + 1);
    const codigosVistos = new Set();
    const linhasLimpas = [];
    let removidos = 0;
    
    for (let i = 0; i < linhasInsert.length; i++) {
        const linha = linhasInsert[i];
        
        // Procurar por comentários com códigos
        const comentarioMatch = linha.match(/^-- \d+: ([^ ]+) -/);
        if (comentarioMatch) {
            const codigo = comentarioMatch[1];
            
            if (codigosVistos.has(codigo)) {
                // Código duplicado - pular esta linha e a próxima (que contém o INSERT)
                console.log(`   🗑️  Removendo duplicata: ${codigo}`);
                i++; // Pular também a linha do INSERT
                removidos++;
                continue;
            } else {
                codigosVistos.add(codigo);
            }
        }
        
        // Adicionar linha se não for duplicata
        linhasLimpas.push(linha);
    }
    
    // Ajustar vírgulas - remover vírgula da última linha de INSERT
    for (let i = linhasLimpas.length - 1; i >= 0; i--) {
        if (linhasLimpas[i].match(/^\('.*'\),$/) || linhasLimpas[i].match(/^\('.*'\),$/)) {
            linhasLimpas[i] = linhasLimpas[i].replace(/,$/, '');
            break;
        }
    }
    
    // Reconstruir arquivo
    const novaLinhas = [
        ...linhas.slice(0, inicioInsert),
        ...linhasLimpas,
        ...linhas.slice(fimInsert + 1)
    ];
    
    const novoConteudo = novaLinhas.join('\n');
    fs.writeFileSync(arquivo, novoConteudo);
    
    console.log(`   ✅ ${removidos} duplicatas removidas`);
    console.log(`   📊 Procedimentos restantes: ${codigosVistos.size}`);
    
    return { removidos, restantes: codigosVistos.size };
}

// Processar todos os blocos
console.log('🧹 REMOVENDO DUPLICATAS DOS BLOCOS\n');

let totalRemovidos = 0;
let totalRestantes = 0;

for (let i = 1; i <= 4; i++) {
    const arquivo = `database/insert-procedimentos-bloco${i}.sql`;
    const resultado = removerDuplicatas(arquivo);
    
    if (resultado) {
        totalRemovidos += resultado.removidos;
        totalRestantes += resultado.restantes;
    }
    console.log('');
}

console.log('📊 RESUMO FINAL:');
console.log(`🗑️  Total de duplicatas removidas: ${totalRemovidos}`);
console.log(`✅ Total de procedimentos únicos: ${totalRestantes}`);
console.log('🎯 Agora os blocos podem ser executados sem erro de duplicata!');