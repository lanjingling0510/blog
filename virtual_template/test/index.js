const compile = require('../src/index');

const input = `
<div class="banner-gift banner-event" data-templateid="<%-obj.templateId||''%>" data-uid="<%-obj.uid||''%>" data-url="<%-obj.url||''%>">
    <div class="banner-gift_left">
        <img src="<%-obj.left%>" alt="Left Image" />
    </div>
    <div class="banner-gift_content" style="background:<%-obj.background%>">
        <% for(var i=0; i < obj.content.length; i++){ %>
            <span style="color:<%-obj.content[i].color%>">
                <%-obj.content[i].text%>
            </span>
        <% } %>
    </div>
    <div class="banner-gift_right">
        <img src="<%-obj.right%>" alt="Right Image" />
    </div>
    <div id="text">hehe</div>
</div>
`;

const data = {
    templateId: 5,
    url: 'http://xxxx.jpg',
    left: 'http://left.png',
    right: 'http://right.png',
    background: 'http://background.png',
    content: [{
        color: '#fff',
        text: 'content1'
    }, {
        color: '#F00',
        text: 'content2'
    }]
};

const tree = compile(input)(data);
document.getElementById('root').appendChild(tree.render());


