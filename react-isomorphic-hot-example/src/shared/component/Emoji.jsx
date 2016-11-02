import React from 'react';
import twemoji from 'twemoji';

class Emoji extends React.Component {
    render () {
        let {
            children,
        } = this.props;
        return (<span dangerouslySetInnerHTML={{
            __html: twemoji.parse(
                twemoji.convert.fromCodePoint(children.codePointAt()))
        }}/>);
    }
}

Emoji.propTypes = {
    children: React.PropTypes.string,
};

export default Emoji;
