import React, { Component } from 'react';
import request from 'superagent';
// components
import Comment from './comment.jsx';
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
        return (
            <div className="modalYoutube">
                <div className="modalYoutubeContent">
                    <div className="videoInfo">
                        {/* 영화 제목 */}
                        <h2>{this.props.videoTitle}</h2>
                        {/* 개봉일 */}
                        <p>{this.props.releaseYear}</p>
                        <i id="btnCloseYoutube" className="fas fa-times"></i>
                    {/* /videoInfo */}
                    </div>
                    <Youtube
                        video={this.props.videoId}
                        width="900px"
                        height="350px"
                        autoplay="0"
                        mute="0"
                        rel="1"
                        modest="0" />
                    <Comment />
                {/* /modalYoutubeContent */}
                </div>
            {/* /modalYoutube */}
            </div>
        );
    }
}

export default ModalYoutube;
