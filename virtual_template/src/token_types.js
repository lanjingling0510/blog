
/**
 * 词法单元 
 */
module.exports = {
    TEXT: 'TEXT', // 文本节点
    EVALUATE: 'EVALUATE', // <% ... %>
    GT: 'GT', // >
    SLASH_GT: 'SLASH_GT', // />
    TAG_NAME: 'TAG_NAME', // <div|<span|<img|...
    ATTR_NAME: 'ATTR_NAME', // 属性名
    ATTR_EQUAL: 'ATTR_EQUAL', // =
    ATTR_STRING: 'ATTR_STRING', // "string"
    CLOSE_TAG: 'CLOSE_TAG', // </div>|</span>|</a>|...
    EOF: 'EOF' // end of file
};