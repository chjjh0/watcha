import React, { Component } from 'react';
// jQuery
import $ from 'jquery';
window.$ = $;

class YouTube extends Component {

    constructor(props) {
        super(props);
    }
    
    render() {
        var videoSrc = "https://www.youtube.com/embed/" + 
        this.props.video + "?autoplay=" + 
        this.props.autoplay + "&mute=1" + "&controls=0" + "&showinfo=0" + "&rel=" + 
        this.props.rel + "&loop=1" + "&playlist="+ this.props.video + "&modestbranding=" +
        this.props.modest;
        
        return(
            <div className="youtubeArea">
                <iframe 
                    title='a'
                    className="player" 
                    type="text/html" 
                    width={this.props.width+"%"} 
                    height="1300px"
                    src={videoSrc}
                    frameBorder = '0'
                    />
            </div>
        );
    }
}

export default YouTube;