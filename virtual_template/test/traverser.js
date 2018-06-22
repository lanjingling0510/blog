const ast = require('./parser');
const traverser = require('../src/traverser');


 traverser(ast, {
     Program: {
         enter(node) {
             console.log(node);
         }
     },

     Node: {
         enter(node, parent) {
            console.log(node);
         }
     },

     Attr: {
         enter(node) {
             console.log(node);
         }
     },
     
     Text: {
        enter(node) {
            console.log(node);
        }
     },

     Evaluate: {
        enter(node) {
            console.log(node);
        }
     },
 })