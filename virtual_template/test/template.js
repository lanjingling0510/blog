const template = require('../src/template');

const tpl = `
<div class="banner-gift banner-event" data-templateid="<%-obj.templateId||''%>" data-uid="<%-obj.uid||''%>" data-url="<%-obj.url||''%>">
    <div class="banner-gift_left">
        <img src="<%-obj.left%>" alt="Left Image">
    </div>
    <div class="banner-gift_content" style="background:<%-obj.background%>">
        <% for(var i=0; i < obj.content.length; i++){ %>
            <span style="color:<%-obj.content[i].color%>"><%-obj.content[i].text%></span>
        <% } %>
    </div>
    <div class="banner-gift_right">
        <img src="<%-obj.right%>" alt="Right Image">
    </div>
</div>
`;

var nodeStr = template(tpl)({
    uid: 43343,
    left: 'xxxx_left.jpg',
    right: 'xxxx_right.jpg',
    content: [{
        color: '#fff',
        text: '你好'
    }]
});

console.log(nodeStr);