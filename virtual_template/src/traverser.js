/**
 * ============================================================================
 *                               THE TRAVERSER!!!
 * ============================================================================
 */

 /**
 * So now we have our AST, and we want to be able to visit different nodes with
 * a visitor. We need to be able to call the methods on the visitor whenever we
 * encounter a node with a matching type.
 *
 *   traverse(ast, {
 *     Program: {
 *       enter(node) {
 *         // ...
 *       },
 *       exit(node) {
 *         // ...
 *       },
 *     },
 *
 *     Node: {
 *       enter(node, parent) {
 *         // ...
 *       },
 *       exit(node, parent) {
 *         // ...
 *       },
 *     },
 *
 *     Attr: {
 *       enter(node, parent) {
 *         // ...
 *       },
 *       exit(node, parent) {
 *         // ...
 *       },
 *     },
 *   });
 */

 
module.exports = function traverser(ast, visitor) {

    function traverse(node, parent) {
        let methods = visitor[node.type];
        if (methods && methods.enter) {
            methods.enter(node, parent);
        }

        switch(node.type) {

            case 'Program':
            node.body.forEach(child => {
                traverse(child, node);
            });
            break;

            case 'Node':
            node.props.forEach(prop => {
                traverse(prop, node);
            });
            node.children.forEach(child => {
                traverse(child, node);
            });
            break;

            case 'Evaluate':
            case 'Text':
            case 'Attr':
            break;

            default:
            throw new TypeError(node.type);
        }

        if (methods && methods.exit) {
            methods.exit(node, parent);
        }
    }

    traverse(ast, null);
};