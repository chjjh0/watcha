import React, { Component } from 'react';
// components
import ModalYoutube from '../components/modalYoutube.jsx';

// css
import '../css/infiniteVideo.css'
// jquery
import $ from 'jquery';
window.$ = $;


class InfiniteVideo extends Component {
    constructor(props) {
        super(props);
        this.defaultVideoSet = this.defaultVideoSet.bind(this);
        this.defaultVideoSet();
    }

    defaultVideoSet() {
        var newLocal = this;
        // 상위 component 에서 videoDesc 전체를 던지지 않고 index에 따라 던지면
        // 객체가 하나씩 던저지기때문에 index가 필요 없음
        // videoDesc[index].image 문법이 아닌 videoDesc.image 문법으로 적용
        $(function () {
            $(".infiniteVideoImgArea:eq(" + newLocal.props.index + ")").css({
                "background":
                    "url('/img/" + newLocal.props.videoDesc.image + "') no-repeat center/cover"
            });
        });
    }


    render() {
        console.log('=====infinite Video=====')
        return (
            <div className="infiniteVideo">
                <div className="infiniteVideoImgArea">
                    <i id={"infiniteIndex" + this.props.index} className="fab fa-youtube"></i>
                </div>
                <h2 className="infiniteVideoTitle">
                    {this.props.videoDesc.title}
                </h2>
                {/* //video */}
            </div>
        );
    }
}

export default InfiniteVideo;
