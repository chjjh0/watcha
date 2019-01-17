import React, { Component } from "react";
// components
import InfiniteVideo from './infiniteVideo.jsx';
import Progress from './progress.jsx';
// css
import '../css/infiniteScroll.css';
import '../css/infiniteVideo.css';
// jquery
import $ from 'jquery';
window.$ = $;

class infiniteScl extends Component {
    constructor(props) {
        super(props);
        this.state = {
           defaultVideo: 20
        }
        this.videoIndex = 0;
        this.defaultVideoSet = this.defaultVideoSet.bind(this);
        this.appendMachine = this.appendMachine.bind(this);
        //this.defaultVideoSet();
    }

    defaultVideoSet() {
        var newLocal = this;
        console.log('default')
        for(var i=0; i < this.state.defaultVideo; i++) {
            newLocal.appendMachine();
        }
    }

    appendMachine() {
        console.log('Machine')
        console.log('videoIndex: '+this.videoIndex)
        $(".categoryArea").append(
            '<div class="infiniteVideo">' +
            '<div id=infiniteIndex' + this.videoIndex + ' class="infiniteVideoImgArea">' +
                '<i class="fab fa-youtube"></i>' +
            '</div>' +
            '<h2 class="infiniteVideoTitle">' + this.props.videoDesc[this.videoIndex].title + '</h2>' +
            '</div>'
        );
        $("#infiniteIndex" + this.videoIndex).css({
            "background": "url('/img/" + this.props.videoDesc[this.videoIndex].image + "') #888 no-repeat center/cover"
        });
        this.videoIndex++;
    }

    componentDidMount() {
        // defaultVideoSet() 으로 호출 시 렌더링 전이라 .categoryArea가 없어서 추가가 되지 않음
        // componentDidMount로 첫 렌더링이 된 .categoryArea가 만들어진 후여야
        // 정상적으로 초기 video 들이 동적 할당 됨
        var newLocal = this;
        console.log('default')
        for(var i=0; i < this.state.defaultVideo; i++) {
            newLocal.appendMachine();
        }
    }

    render() {
        console.log('=======infiniteScroll')
        console.log('전달확인 1 videoDESC: ' + this.props.videoDesc)
        console.log('전달확인 1 num: ' + this.props.videoDescNum)
        var newLocal = this;
            $(window).scroll(function () {
                console.log('scroll')
                if ((parseInt($(window).scrollTop()) + 1) >= ($(document).height() - $(window).height())) {
                    console.log('welcome=====')
                    console.log(newLocal.videoIndex)
                    if(newLocal.videoIndex < newLocal.props.totalIndex) {
                        for(var i=0; i<5; i++) {
                            newLocal.appendMachine();
                        } 
                    } else {
                        alert('끝')
                    }
                    console.log('동작 완료')
                }
            })

        return (
            <div className="categoryArea">
                <Progress />
            </div>
        );
    }
}

export default infiniteScl;