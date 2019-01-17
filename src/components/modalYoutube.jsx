import React, { Component } from 'react';
// components
import Youtube from './youtube.jsx';
// css
import '../css/modalYoutube.css';
// jQuery
import $ from 'jquery';
window.$ = $;


class ModalYoutube extends Component {
    constructor(props) {
        super(props);
    }
  
    render() {
        
        console.log('2 props: ', this.props.videoId)
        return (
            <div className="modalYoutube">
                <div className="modalYoutubeContent">
                    <h2>{this.props.videoId}</h2>
                    <Youtube
                        video={this.props.videoId}
                        width="100%"
                        height="100%"
                        autoplay="0"
                        mute="0"
                        rel="1"
                        modest="0" />
                    <i id="btnCloseYoutube" className="fas fa-times"></i>
                    {/* //modalContent */}
                </div>
                {/* //paymentModal */}
            </div>
        );
    }
}

export default ModalYoutube;
