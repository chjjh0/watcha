import React, { Component } from 'react';
// components
import Youtube from './youtube.jsx';
// css
import '../css/infiniteVideo.css'
// jquery
import $ from 'jquery';
window.$ = $;


class Video extends Component {
    constructor(props) {
        super(props);
        this.videoDataAry = [];
        this.videoImgAry = [];
        this.defaultVideoSet = this.defaultVideoSet.bind(this);
        this.defaultVideoSet();
    }

    defaultVideoSet() {
        var newLocal = this;
        console.log('=====infiniteVideo')
        console.log('index: '+this.props.index)
        console.log('전체 전달 확인2: '+this.props.videoDesc)
        console.log('0000 전달 확인2: '+this.props.videoDesc[0].title)
        console.log('0000 전달 확인2: '+this.props.videoDesc[0].image)
        console.log('1111 전달 확인2: '+this.props.videoDesc[1].title)
        console.log('1111 전달 확인2: '+this.props.videoDesc[1].image)

        $(function() {
            console.log('========function')
            console.log('========index: '+newLocal.props.index)
            $(".infiniteVideoImgArea:eq("+newLocal.props.index+")").css({
                "background":
                    "url('/img/"+newLocal.props.videoDesc[newLocal.props.index].image+"') no-repeat center/cover"});
            });
    }

    

    render() {
        return (
        <div id="" className="infiniteVideo">
            <div className="infiniteVideoImgArea"></div>
            <Youtube video="67ccXSgqseg"/>
            <h2>
                {this.props.videoDesc[this.props.index].title}
            </h2>
        {/* //video */}
        </div>
        );
    }
}

export default Video;
