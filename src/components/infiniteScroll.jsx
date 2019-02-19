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
            youtubeId: '8hYlB38asDY',
            DBvideoIndex: 0
        }
        // 초기 표현할 video 값
        this.defaultVideo = 20;
        // 무한 스크롤로 인해 video가 중복되지 않게 출력되기 위한 index
        this.videoIndex = 0;
        // scroll or modal 작동 여부 확인
        this.isScrolling = false;
        // modalYoutube 작동 중에는 infiniScroll 작동 방지
        this.modalOn = false;
        this.modalClicked = false;
        this.appendMachine = this.appendMachine.bind(this);
        this.openModalYoutube = this.openModalYoutube.bind(this);
    }

    appendMachine() {
        if($("#infiniteIndex"+this.videoIndex).hasClass("infiniteVideoImgArea")) {
            // 이미 있는 경우 추가 생성 오작동 방지
        } else {
            $(".infiniteVideoArea").append(
                '<div data-videoIndex="' + this.videoIndex + '" class="infiniteVideo" name=' + 
                        this.props.videoDesc[this.videoIndex].youtubeId + '>' +
                    '<div id=infiniteIndex' + this.videoIndex + 
                        ' class="infiniteVideoImgArea">' +
                        '<i class="fab fa-youtube"></i>' +
                        '<input class="DBvideoIndex" type="hidden" value="' + this.props.videoDesc[this.videoIndex].videoIndex + '"></input>' +
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

    openModalYoutube(videoIndex, videoId, DBvideoIndex) {
        // video에 click 발생 시 
        // videoIndex에 따라 video에 매핑 된 videoId를 통해
        // youtube 예고편 및 영화정보가 변화
        this.setState({
            videoTitle: this.props.videoDesc[videoIndex].title,
            releaseYear: this.props.videoDesc[videoIndex].releaseYear,
            youtubeId: videoId,
            DBvideoIndex: DBvideoIndex
        });
        // open modalYoutube
        $(".modalYoutube").css({"display": "block"});
        this.modalOn = true;
    }

    componentDidMount() {
        // 생성자로 호출 시 렌더링 전이라 .infiniteVideoArea가 없어서 추가가 되지 않음
        // componentDidMount로 첫 렌더링이 된 .infiniteVideoArea가 만들어진 후여야
        // 정상적으로 초기 video 들이 동적 할당 됨
        var newLocal = this;
        for(var i=0; i < this.defaultVideo; i++) {
            newLocal.appendMachine();
        }
    }

    render() {
        // genre 선택에 따른 처리
        if(this.props.genre === true) {
            // defaultVideo 는 항상 20개를 유지
            this.videoIndex = 0;
            this.defaultVideo = 20;
            // 현재 보여지는 video 전부 삭제
            $(".infiniteVideo").remove();
            if(this.props.totalIndex < this.defaultVideo) {
                // video 개수가 20개 미만 시 처리
                this.defaultVideo = this.props.totalIndex;
            } 
            for(var i=0; i < this.defaultVideo; i++) {
                this.appendMachine();
            }
        }

        // 정렬에 따른 처리
        if(this.props.changeNum === 3) {
            // 최신 순
            this.videoIndex = 0;
            $(".infiniteVideo").remove();
            for(var i=0; i < this.defaultVideo; i++) {
                this.appendMachine();
            }
        } else if(this.props.changeNum === 4) {
            // 러닝타임 긴 순
            this.videoIndex = 0;
            $(".infiniteVideo").remove();
            for(var i=0; i < this.defaultVideo; i++) {
                this.appendMachine();
            }
        }
        var newLocal = this;
        // infinite scroll
        $(window).scroll(function () {
            if(newLocal.videoIndex > newLocal.props.totalIndex) {
                // 휠 오작동으로 인한 무한로딩 방지
                $(window).off('scroll');
            }
            // modalYoutube 작동 중에는 infiniScroll 작동 방지
            if(newLocal.modalOn === false) {
            if ((parseInt($(window).scrollTop()) + 1) >= ($(document).height() - $(window).height())) {
                // isScrolling의 용도
                // 스크롤이 작동 중일 때 재 스크롤 조작으로
                // 요청이 중첩됨으로 인한 오작동 방지
                if(newLocal.videoIndex < newLocal.props.totalIndex 
                    && newLocal.isScrolling === false) {
                    // isScrolling on
                    newLocal.isScrolling = true;
                    $(".progress").css({"display": "block"});
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
            var youtubeId = '';
            var DBvideoIndex = $(this).find("input.DBvideoIndex").val();
            newLocal.modalClicked = true;
            // youtubeId null check
            // 동적 태그 생성 시 boolean이 아닌 
            // "null" 이라는 문자열로 삽입되었기에
            // "null" 문자열로 null 체크
            if($(this).attr("name") === "null") {
                // youtubeId 기본값 설정
                // null일 경우를 대비해
                // 기본값을 '8hYlB38asDY' 세팅
                youtubeId = '8hYlB38asDY';
            } 
            else {
                youtubeId = $(this).attr("name");
            }
            newLocal.openModalYoutube(videoIndex, youtubeId, DBvideoIndex);
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
                {
                    this.modalClicked === true ?
                    <ModalYoutube 
                        videoTitle={this.state.videoTitle}
                        releaseYear={this.state.releaseYear}
                        youtubeId={this.state.youtubeId}
                        videoIndex={this.state.DBvideoIndex}
                    /> : ""
                }
            </div>
        );
    }
}

export default InfiniteScl;