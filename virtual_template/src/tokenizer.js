const types = require('./token_types');

/**
 * ============================================================================
 *                                THE TOKENIZER!
 * ============================================================================
 */

/**
 * We're gonna start off with our first phase of parsing, lexical analysis, with
 * the tokenizer.
 *
 * We're just going to take our string of code and break it down into an array
 * of tokens.
 *
 *   <div class="banner-gift banner-event"   =>   [{ type: 'TAG_NAME', value: 'div' }, ...]
 */

module.exports = class Token {
    constructor(input) {
        this.content = input || '';
        this.index = 0;
        this.context = null;
        this.length = this.content.length;
        this.eof = false;
        this.tokens = [];
    }

    execute() {
        while (!this.eof) {
            this.tokens.push(this.nextToken());
        }

        return this.tokens;
    }

    nextToken() {
        this.skipSpaces();
        // NOTE: 解析token的顺序很重要
        const token = (
            this.readEvaluate() ||
            this.readGT() ||
            this.readCloseTag() ||
            this.readSlashGT() ||
            this.readTagName() ||
            this.readAttrName() ||
            this.readAttrEqual() ||
            this.readAttrString() ||
            this.readText() ||
            this.readEOF() ||
            this.error()
        );

        return token;
    }

    skipSpaces() {
        while (/\s/.test(this.char())) {
            this.index++
        }
    }

    char() {
        return this.content[this.index];
    }

    nextChar() {
        return this.content[this.index + 1];
    }

    setContext(type) {
        this.context = type;
    }

    inContext(type) {
        return this.context === type;
    }

    captureByRegx(regx, type) {
        const input = this.content.slice(this.index);
        const matches = input.match(regx);
        if (matches) {
            const match = matches[0];
            this.index += match.length;
            this.setContext(type);
            return {
                type: type,
                value: match,
            };
        }
    }

    /**
     *<% ... %>
     */
    readEvaluate() {
        return this.captureByRegx(
            /^<%(?![\-\=])(?:[\s\S])*?%>/,
            types.EVALUATE
        );
    }

    /**
     *解析文本节点
     */
    readText() {
        // 当前context不是TagName
        if (!this.inContext(types.TAG_NAME)) {
            const start = this.index;

            if (!this.char()) return;

            // 提取<%=([\s\S]+?)%> 和 <%-([\s\S]+?)%> 为单独的Text
            let signOffset = 0;
            const input = this.content.slice(this.index);
            input.replace(/^<%=([\s\S]+?)%>|^<%-([\s\S]+?)%>/, ($0, $1, $2) => {
                signOffset = $0.length;
                this.index += $0.length;
                return input;
            });

            if (signOffset) {
                return {
                    type: types.TEXT,
                    value: input.slice(0, signOffset)
                };
            }

            this.index++;

            while (this.char()) {
                // 碰到'<'，跳出readText检测
                if (this.char() === '<') {
                    break;
                }

                this.index++;
            }

            return {
                type: types.TEXT,
                value: this.content.slice(start, this.index)
            }
        }
    }

    /**
     * 解析 >
     */
    readGT() {
        if (this.char() === '>') {
            this.index++;
            this.setContext(types.GT);
            return {
                type: types.GT,
                value: '>'
            };
        }
    }

    /**
     * 解析 />
     */
    readSlashGT() {
        return this.captureByRegx(
            /^\/>/,
            types.SLASH_GT
        );
    }

    /**
     * 解析<div|<span|<img|...
     */
    readTagName() {
        let hasName = false;
        if (this.char() === '<') {
            if (this.nextChar() === '%') return;
            this.index++;
            this.skipSpaces();
            const start = this.index;
            while (this.char().match(/\w/)) {
                hasName = true;
                this.index++;
            }

            if (!hasName) return;

            var tagName = this.content.slice(start, this.index);
            this.setContext(types.TAG_NAME);
            return {
                type: types.TAG_NAME,
                value: tagName
            };
        }
    }

    /**
     * 解析属性名
     */
    readAttrName() {
        if (this.inContext(types.TAG_NAME)) {
            const regex = /[\w\-]/;
            if (!regex.test(this.char())) return;
            const start = this.index;
            while (this.char() && regex.test(this.char())) {
                this.index++
            }
            return {
                type: types.ATTR_NAME,
                value: this.content.slice(start, this.index)
            }
        }
    }

    /**
     * 解析 解析属性等号=
     */
    readAttrEqual() {
        if (this.inContext(types.TAG_NAME) && this.char() === '=') {
            this.index++;
            return {
                type: types.ATTR_EQUAL,
                value: '=',
            };
        }
    }

    /**
     * 解析属性值 "xxx"
     */
    readAttrString() {
        if (this.inContext(types.TAG_NAME) && /['"]/.test(this.char())) {
            const quote = this.char();
            const start = this.index;
            this.index++;
            while (this.char() !== quote) {
                this.index++;
            }

            this.index++;

            return {
                type: types.ATTR_STRING,
                value: this.content.slice(start + 1, this.index - 1)
            };
        }
    }

    /**
     * 解析</div>|</span>|</a>|...
     */
    readCloseTag() {
        return this.captureByRegx(
            /^\<\s*?\/\s*?[\w-]+?\s*?\>/,
            types.CLOSE_TAG
        );
    }

    readEOF() {
        if (this.index >= this.content.length) {
            this.eof = true;
            return {
                type: types.EOF,
                value: '$'
            };
        }
    }

    error() {
        throw new Error('解析出错...');
    }

}