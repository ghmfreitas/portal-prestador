const XLSX = require('xlsx');
const fs = require('fs');
const path = require('path');

// Ler a planilha Excel
const workbook = XLSX.readFile('documents/Results.xlsx');
const sheetName = workbook.SheetNames[0];
const worksheet = workbook.Sheets[sheetName];

// Converter para JSON
const data = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

console.log('=== INFORMAÇÕES DA PLANILHA ===');
console.log('Total de linhas:', data.length);
console.log('Primeira linha (cabeçalhos):', data[0]);
console.log();

console.log('=== PRIMEIRAS 5 LINHAS ===');
data.slice(0, 5).forEach((row, index) => {
    console.log(`Linha ${index}:`, row);
});
console.log();

// Verificar coluna C (índice 2) 
const headers = data[0];
const dataRows = data.slice(1);

console.log('=== ANÁLISE DA COLUNA C (DIVULGA) ===');
const colunaC = dataRows.map(row => row[2]);
const valoresUnicos = [...new Set(colunaC)];
console.log('Valores únicos na coluna C:', valoresUnicos);

// Contar ocorrências
const contagem = {};
colunaC.forEach(val => {
    contagem[val] = (contagem[val] || 0) + 1;
});
console.log('Contagem de valores:', contagem);
console.log();

// Filtrar procedimentos onde coluna C = 1
const procedimentosFiltrados = dataRows.filter(row => row[2] === 1);
console.log(`=== PROCEDIMENTOS COM DIVULGA = 1 ===`);
console.log(`Total de procedimentos a incluir: ${procedimentosFiltrados.length}`);
console.log();

console.log('=== PRIMEIRAS 10 PROCEDIMENTOS FILTRADOS ===');
procedimentosFiltrados.slice(0, 10).forEach((row, index) => {
    console.log(`${index + 1}:`, row);
});
console.log();

// Criar estrutura de dados para SQL
const procedimentosParaSQL = procedimentosFiltrados.map(row => {
    return {
        codigo_tuss: row[0] || '',
        descricao: row[1] || '',
        divulga: row[2] || 0,
        especialidade: row[3] || '',
        extra_col_4: row[4] || '',
        extra_col_5: row[5] || '',
        extra_col_6: row[6] || '',
        extra_col_7: row[7] || '',
        extra_col_8: row[8] || '',
        extra_col_9: row[9] || ''
    };
});

// Salvar dados filtrados
fs.writeFileSync('documents/procedimentos_filtrados.json', JSON.stringify(procedimentosParaSQL, null, 2));

console.log('✅ Dados filtrados salvos em documents/procedimentos_filtrados.json');
console.log(`✅ Total de ${procedimentosParaSQL.length} procedimentos serão incluídos no banco`);