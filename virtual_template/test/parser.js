const tokens = require('./tokenizer');
const Parser = require('../src/parser');

const parser = new Parser(tokens);

const ast = parser.execute();

// console.log(JSON.stringify(ast, null, 2));

module.exports = ast;