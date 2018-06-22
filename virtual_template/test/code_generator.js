const ast = require('./parser');
const CodeGenerator = require('../src/code_generator');

const codeGenerator = new CodeGenerator(ast);

const code = codeGenerator.execute();

console.log(code);