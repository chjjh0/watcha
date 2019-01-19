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
            youtubeId: '8hYlB38asDY'
        }
        this.defaultVideo = 20;
        this.videoIndex = 0;
        this.isScrolling = false;
        this.defaultVideoSet = this.defaultVideoSet.bind(this);
        this.appendMachine = this.appendMachine.bind(this);
        this.openModalYoutube = this.openModalYoutube.bind(this);
    }

    defaultVideoSet() {
        var newLocal = this;
        console.log('default')
        for(var i=0; i < this.defaultVideo; i++) {
            newLocal.appendMachine();
        }
    }

    appendMachine() {
        console.log('Machine')
        console.log('videoIndex: '+this.videoIndex)
        
        if($("#infiniteIndex"+this.videoIndex).hasClass("infiniteVideoImgArea")) {
            console.log('이미 있음')
            return;
        } else {
            $(".infiniteVideoArea").append(
                '<div class="infiniteVideo" name="' + 
                    this.props.videoDesc[this.videoIndex].youtubeId + '">' +
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
            console.log('isScrolling is ture????', this.isScrolling)
            console.log('videoIndex: ', this.videoIndex)

        }
    }


    openModalYoutube(videoId) {
        this.setState({
            youtubeId: videoId
        });
        // open modalYoutube
        $(".modalYoutube").css({"display": "block"});
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
        console.log('=======infiniteScroll')
        console.log('전달확인 1 videoDESC: ' + this.props.videoDesc)
        console.log('전달확인 1 num: ' + this.props.videoDescNum)
        console.log('전달확인 1 youtubeId: ' + this.props.videoDesc[0].youtubeId)
        var newLocal = this;
        // infinite scroll
        $(window).scroll(function () {
            if ((parseInt($(window).scrollTop()) + 1) >= ($(document).height() - $(window).height())) {
                // isScrolling의 용도는 스크롤이 작동 중일 때 
                // 재 스크롤 조작으로 요청이 중첩됨으로 인한 오작동을 방지
                if(newLocal.videoIndex < newLocal.props.totalIndex 
                    && newLocal.isScrolling === false) {
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
                        console.log('동작 완료');
                        newLocal.isScrolling = false;
                        $(".progress").css({"display": "none"});
                    }, 2000);
                } else {
                    console.log('end')
                }
            }
        });
        // open modalYoutube
        $(document).on("click", ".infiniteVideo", function() {
            // videoId가 null일 경우를 대비해
            // 기본값으로 '8hYlB38asDY' 세팅
            var videoId = '8hYlB38asDY';
            if(!$(this).attr("name")) {
                videoId = $(this).attr("name");
            } 
            else {
                console.log('videoId is Null');
            }
            newLocal.openModalYoutube(videoId);
        });
        // close modalYoutube
        $(function() {
            $("#btnCloseYoutube").click(function() {
                // youtube background에서 작동 방지
                $("iframe")[0]
                     .contentWindow
                     .postMessage('{"event":"command","func":"' +
                         'stopVideo' + '","args":""}', '*');
                // close modalYoutbe
                $(".modalYoutube").css({"display": "none"});
            });
        });    

        return (
            <div>
                <div className="infiniteVideoArea"></div>
                <div className="progress">
                    <Progress />
                </div>
                <ModalYoutube videoId={this.state.youtubeId}/>
            </div>
        );
    }
}

export default InfiniteScl;