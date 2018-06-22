const types = require('./token_types');

/**
 * EBNF
 * -------------------------------
 * PROGRAM -> Stat*
 * Stat -> Evaluate | Node | Text
 * Evaluate -> <%([\s\S]+?)%>
 * Node ->  Node -> OpenTag Attr* GT Stat* CloseTag  | OpenTag Attr* Slash_GT 
 * OpenTag -> \w+
 * Attr -> /\w+/ = AttrValue | /\w+/
 * AttrValue -> [\s\S]+
 * CloseTag -> <[\w\d]+\> | />
 */



module.exports = class Parser {
    constructor(tokens) {
        this.tokens = tokens;
        this.index = 0;
    }

    execute() {
        return this.program();
    }

    eat() {
        return this.tokens[this.index++];
    }

    is(type) {
        return this.tokens[this.index].type === type;
    }

    program() {
        const body = [];
        let stat = this.parseStat();
        while(stat) {
            body.push(stat);
            stat = this.parseStat();
        }
        
        return {
            type: 'Program',
            body: body,
        };
    }

    parseStat() {
        if (this.is(types.EVALUATE)) {
            return this.parseEvaluate();
        }

        else if (this.is(types.TAG_NAME)) {
            return this.parseNode();
        }

        else if (this.is(types.TEXT)) {
            return this.parseText();
        }
    }

    parseNode() {
        // Node -> OpenTag Attr* GT Stat* CloseTag  | OpenTag Attr* Slash_GT
        let item;

        // OpenTag
        const tagName = this.eat().value;

        // Attr*
        const props = [];
        item = this.parseAttr();
        while(item) {
            props.push(item);
            item = this.parseAttr();
        }

        const children = [];

        // GT
        if (this.is(types.GT)) {
            this.eat();

            // Stat*
            item = this.parseStat();
            while(item) {
                children.push(item);
                item = this.parseStat();
            }

            // CloseTag
            if (!this.is(types.CLOSE_TAG)) {
                throw new Error('Node lose Close Tag.');
            }

            this.eat();
        }

        // Slash_GT
        else if (this.is(types.SLASH_GT)) {
            // ...
            this.eat();
        }

        else {
            throw new Error('Node lose SLASH_GT or GT.');
        }

        return {
            type: 'Node',
            tagName: tagName,
            props: props,
            children: children,
        };
    }

    parseAttr() {
        // Attr -> /\w+/ = AttrValue
        let name, value;
        if (this.is(types.ATTR_NAME)) {
            name = this.eat().value;
            if (this.is(types.ATTR_EQUAL)) {
                this.eat();
                value = this.eat().value;
            }

            return {
                type: 'Attr',
                name: name,
                value: value,
            };
        }
    }

    parseEvaluate() {
        const token = this.eat();
        return {
            type: 'Evaluate',
            value: token.value,
        };
    }

    parseText() {
        const token = this.eat();
        return {
            type: 'Text',
            value: token.value
        };
    }
}