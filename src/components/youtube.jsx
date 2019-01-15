import React, { Component } from 'react';

class YouTube extends Component {

    constructor(props) {
        super(props);
    }
    
    render() {
        var videoSrc = 
            "https://www.youtube.com/embed/" + this.props.video + 
            "?autoplay=" + this.props.autoplay + 
            "&mute=" + this.props.mute + "&controls=1" + "&showinfo=0" + 
            "&rel=" + this.props.rel + "&loop=1" + 
            "&playlist=" + this.props.video + 
            "&modestbranding=" + this.props.modest +
            "&enablejsapi=1&version=3&playerapiid=ytplayer"
            ;
        return(
            <iframe 
                title='a'
                id="player"
                type="text/html" 
                width={this.props.width}
                height={this.props.height}
                src={videoSrc}
                frameBorder = '0'
            />
        );
    }
}

export default YouTube;