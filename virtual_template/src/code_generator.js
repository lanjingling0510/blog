const traverser = require('./traverser');

/**
 * ============================================================================
 *                            THE CODE GENERATOR!!!!
 * ============================================================================
 */



module.exports = class CodeGenerator {
    constructor(ast) {
        this.ast = ast;
        this.source = '';
        this.lines = [];
        this.nodeIndex = 1;
    }

    tranformTpl(text) {
        const regex = RegExp(
            [
              // 注意下 pattern 的 source 属性
              // |$用来匹配模板最后空字符
              (/<%-([\s\S]+?)%>/).source,
              (/<%=([\s\S]+?)%>/).source,
            ].join('|') + '|$',
            'g'
          );

        let index = 0;
        let source = `'`;
        text.replace(regex, function (match, escape, interpolate, offset) {
            source += text.slice(index, offset);
            index = offset + match.length;
            if (escape) {
              source += "'+\n((__t=(" + escape + "))==null?'':__escape(__t))+\n'";
            } else if (interpolate) {
              source += "'+\n((__t=(" + interpolate + "))==null?'':__t)+\n'";
            } 
        
            return match;
          });

        source += `'`;
        return source;
    }

    execute() {
        const self = this;

        traverser(self.ast, {
            Program: {
                enter(node) {
                    node.codeName = 'node0';
                    self.lines.push('var __t;');
                    self.lines.push('var node0 = {children: []};');
                },

                exit() {
                    self.lines.push('return __h("div", {}, node0.children);');
                    self.body = self.lines.join('\n');
                }
            },

            Node: {
                enter(node, parent) {
                    const currentIndex = self.nodeIndex++
                        const nodeName = 'node' + currentIndex;
                    node.codeName = nodeName;
                    self.lines.push(`var ${nodeName} = {children: [], props: {}}`);

                },

                exit(node, parent) {
                    self.lines.push(`${node.codeName} = __h("${node.tagName}", ${node.codeName}.props, ${node.codeName}.children);`);
                    self.lines.push(`${parent.codeName}.children.push(${node.codeName});`);
                }
            },

            Attr: {
                enter(node, parent) {
                    const text = self.tranformTpl(node.value);
                    self.lines.push(`${parent.codeName}.props["${node.name}"] = ${text};`);
                }
            },

            Text: {
                enter(node, parent) {
                    const text = self.tranformTpl(node.value);
                    self.lines.push(`${parent.codeName}.children.push(${text});`);
                }
            },

            Evaluate: {
                enter(node, parent) {
                    const expr = node.value.replace(/(^<%\s*)|(\s*%>$)/g, '');
                    self.lines.push(expr);
                }
            },
        });

        self.source = self.lines.join('\n');
        return self.source;
    }
}