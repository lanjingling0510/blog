const svd = require('simple-virtual-dom');
const Tokenizer = require('./tokenizer');
const Parser = require('./parser');
const CodeGenerator = require('./code_generator');
const el = svd.el;


const escapeMap = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#x27;',
    '`': '&#x60;'
};

const createEscaper = function (map) {
    let escaper = function (match) {
        return map[match];
    };
    let source = '(?:' + Object.keys(map).join('|') + ')';
    let testRegexp = RegExp(source);
    let replaceRegexp = RegExp(source, 'g');
    return function (string) {
        string = string == null ? '' : '' + string;
        return testRegexp.test(string) ? string.replace(replaceRegexp, escaper) : string;
    };
};


const escape = createEscaper(escapeMap);

module.exports = function compile(template) {
    const tokenizer = new Tokenizer(template);
    const tokens = tokenizer.execute();
    const parser = new Parser(tokens);
    const ast = parser.execute();
    const codeGenerator = new CodeGenerator(ast);
    const code = codeGenerator.execute();

    return function (data) {
        var renderFunc = new Function('obj', '__h', '__escape', code);
        // console.log(renderFunc.toString());
        return renderFunc(data, el, escape);
    };
}