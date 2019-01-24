import React, { Component } from "react";
// components
import Progress from './progress.jsx';
import ModalYoutube from './modalYoutube.jsx';
// css
import '../css/infiniteScroll.css';
// jquery
import $ from 'jquery';
window.$ = $;

class InfiniteScl extends Component {
    constructor(props) {
        super(props);
        this.state = {
            videoTitle: '',
            releaseYear: '',
            youtubeId: '8hYlB38asDY'
        }
        this.defaultVideo = 20;
        this.videoIndex = 0;
        // 작동 중 확인
        this.isScrolling = false;
        this.modalOn = false;
        this.appendMachine = this.appendMachine.bind(this);
        this.openModalYoutube = this.openModalYoutube.bind(this);
    }

    appendMachine() {
        if($("#infiniteIndex"+this.videoIndex).hasClass("infiniteVideoImgArea")) {
            // 이미 있는 경우 추가 생성 오작동 방지
        } else {
            $(".infiniteVideoArea").append(
                '<div data-videoIndex="' + this.videoIndex 
                    + '" class="infiniteVideo" name=' + 
                        this.props.videoDesc[this.videoIndex].youtubeId + '>' +
                    '<div id=infiniteIndex' + this.videoIndex + 
                        ' class="infiniteVideoImgArea">' +
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
    }

    openModalYoutube(videoIndex, videoId) {
        // video에 click 발생 시 
        // videoIndex에 따라 video에 맞는 videoId를 통해
        // youtube 예고편 및 영화정보가 바뀜
        this.setState({
            videoTitle: this.props.videoDesc[videoIndex].title,
            releaseYear: this.props.videoDesc[videoIndex].releaseYear,
            youtubeId: videoId,
        });
        // open modalYoutube
        $(".modalYoutube").css({"display": "block"});
        this.modalOn = true;
    }

    componentDidMount() {
        // defaultVideoSet() 으로 호출 시 렌더링 전이라 .infiniteVideoArea가 없어서 추가가 되지 않음
        // componentDidMount로 첫 렌더링이 된 .infiniteVideoArea가 만들어진 후여야
        // 정상적으로 초기 video 들이 동적 할당 됨
        var newLocal = this;
        console.log('default')
        for(var i=0; i < this.defaultVideo; i++) {
            newLocal.appendMachine();
        }
    }

    render() {
        var newLocal = this;
        // infinite scroll
        $(window).scroll(function () {
            // modalYoutube 작동 중에는 infiniScroll 작동 방지
            if(newLocal.modalOn === false) {
            if ((parseInt($(window).scrollTop()) + 1) >= ($(document).height() - $(window).height())) {
                // isScrolling의 용도는 스크롤이 작동 중일 때 
                // 재 스크롤 조작으로 요청이 중첩됨으로 인한 오작동을 방지
                if(newLocal.videoIndex < newLocal.props.totalIndex 
                    && newLocal.isScrolling === false) {
                    // isScrolling on
                    newLocal.isScrolling = true;
                    $(".progress").css({"display": "block"});
                    // .progress가 보여진 후 위치값을 계산하여
                    // 스크롤 위치를 .progress가 보이는 위치로 이동
                    var offset = $(".progress").offset();
                    $("html, body").animate({scrollTop: offset.top}, 500);
                    setTimeout(function() {
                        if(newLocal.videoIndex < newLocal.props.totalIndex) {
                            for(var i=0; i<5; i++) {
                                if(newLocal.videoIndex >= newLocal.props.totalIndex) {
                                    break;
                                } else {
                                    newLocal.appendMachine();
                                }
                            }
                        }
                        // isScrolling off
                        newLocal.isScrolling = false;
                        $(".progress").css({"display": "none"});
                    }, 2000);
                } else {
                    // 더 이상 video가 없습니다
                }
            }
        }
        });
        
        // open modalYoutube
        // click이 한 번만 발생하게 하여 여러 번 호출되는 것을 방지
        $(document).one("click", ".infiniteVideo", function() {
            // videoIndex 추출
            var videoIndex = $(this).attr("data-videoIndex");
            // youtubeId 기본값 설정
            // null일 경우를 대비해
            // 기본값을 '8hYlB38asDY' 세팅
            var youtubeId = '8hYlB38asDY';
            // youtubeId null check
            // 동적 태그 생성 시 boolean이 아닌 
            // "null" 이라는 문자열로 삽입되었기에
            // "null" 문자열로 null 체크
            if($(this).attr("name") === "null") {
                // youtubeId is null
            } 
            else {
                youtubeId = $(this).attr("name");
            }
            newLocal.openModalYoutube(videoIndex, youtubeId);
        });
        // close modalYoutube
            $(document).on('click', "#btnCloseYoutube", function() {
                // youtube background에서 작동 방지
                $("iframe")[0]
                     .contentWindow
                     .postMessage('{"event":"command","func":"' +
                         'stopVideo' + '","args":""}', '*');
                // close modalYoutbe
                $(".modalYoutube").css({"display": "none"});
                // modalOn off
                newLocal.modalOn = false;
            });
        return (
            <div>
                <div className="infiniteVideoArea"></div>
                <div className="progress">
                    <Progress />
                </div>
                <ModalYoutube 
                    videoTitle={this.state.videoTitle}
                    releaseYear={this.state.releaseYear}
                    videoId={this.state.youtubeId}
                />
            </div>
        );
    }
}

export default InfiniteScl;