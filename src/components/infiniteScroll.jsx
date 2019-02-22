import React, { Component } from "react";
// components
import Progress from './progress.jsx';
import ModalYoutube from './modalYoutube.jsx';
import InfiniteVideoList from './infiniteVideoList.jsx';
// css
import '../css/infiniteScroll.css';
// jquery
import $ from 'jquery';
window.$ = $;

class InfiniteScroll extends Component {
    constructor(props) {
        super(props);
        this.state = {
            videoTitle: '',
            releaseYear: '',
            youtubeId: '8hYlB38asDY',
            DBvideoIndex: 0,
            infiniteVideoList: [],
            flag: false
        }
        this.videoListTemp = []
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
        // this.state.infiniteVideoList 를 비웠다가 다시 채워줘야
        // 제대로 비디오가 추가 됨
        // 여기서 비워주지 않고 그냥 추가하면 변화 인지를 못하여 reRendering X
        // forceupdate()로도 되지 않음
        this.setState({
            infiniteVideoList: []
        })
        this.videoListTemp.push(
            <InfiniteVideoList 
                videoIndex = {this.videoIndex}
                youtubeId = {this.props.videoDesc[this.videoIndex].youtubeId}
                DBvideoIndex = {this.props.videoDesc[this.videoIndex].videoIndex}
                title = {this.props.videoDesc[this.videoIndex].title}
                image = {this.props.videoDesc[this.videoIndex].image}
                flag = {this.state.flag}
            />
        )
        this.videoIndex++
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
    }

    componentDidMount() {
        // 생성자로 호출 시 렌더링 전이라 .infiniteVideoArea가 없어서 추가가 되지 않음
        // componentDidMount로 첫 렌더링이 된 .infiniteVideoArea가 만들어진 후여야
        // 정상적으로 초기 video 들이 동적 할당 됨
        var $this = this;
        for(var i=0; i < this.defaultVideo; i++) {
            this.appendMachine()
        }
        $this.setState({
            infiniteVideoList: $this.videoListTemp
        })
        console.log($this.videoListTemp)
        document.getElementsByClassName('fab')[0].addEventListener('click', function() {
            console.log('clicked')
        })
        window.addEventListener('click', this.onClicked, false)
        window.addEventListener('scroll', this.onScroll, false)
    }

    onClicked = (e) => {
        console.log('onclicked')
        console.log(e.target)
        if ($(e.target).hasClass("fab")) {
            this.modalClicked = true    
            var videoIndex = $(e.target).next().attr("value")
            var DBvideoIndex = (videoIndex - 1)
            var videoId = $(e.target).parent().parent().attr("name")
            console.log(videoIndex)
            console.log(DBvideoIndex)
            console.log(videoId)
            this.setState({
                videoTitle: this.props.videoDesc[videoIndex].title,
                releaseYear: this.props.videoDesc[videoIndex].releaseYear,
                youtubeId: videoId,
                DBvideoIndex: DBvideoIndex
            });
            // open modalYoutube
            $(".modalYoutube").css({"display": "block"});
    
        }
    }

    onScroll = () => {
        console.log('onScroll')
        //console.log('videoIndex:: ',this.videoIndex)
        //console.log('totalIndex::: ',this.props.totalIndex)
        var $this = this
        // infinite scroll
        $(window).scroll(function () {
            if ((parseInt($(window).scrollTop()) + 1) >= ($(document).height() - $(window).height())) {
                // isScrolling의 용도
                // 스크롤이 작동 중일 때 재 스크롤 조작으로
                // 요청이 중첩됨으로 인한 오작동 방지
                if($this.videoIndex < $this.props.totalIndex 
                    && $this.isScrolling === false) {
                    // isScrolling on
                    $this.isScrolling = true;
                    $(".progress").css({"display": "block"});
                    setTimeout(function() {
                        if($this.videoIndex < $this.props.totalIndex) {
                            for(var i=0; i<5; i++) {
                                if($this.videoIndex >= $this.props.totalIndex) {
                                    break;
                                } else {
                                    $this.setState({
                                        flag: true
                                    })
                                    $this.appendMachine();
                                }
                            }
                        }
                        // isScrolling off
                        $this.isScrolling = false;
                        $(".progress").css({"display": "none"});
                        $this.setState({
                            infiniteVideoList: $this.videoListTemp
                        })
                        console.log('force')
                        console.log($this.state.infiniteVideoList)
                    }, 2000);
                } else {
                    // 더 이상 video가 없습니다
                }
        }
        });
      }

    render() {
        // // genre 선택에 따른 처리
        // if(this.props.genre === true) {
        //     // defaultVideo 는 항상 20개를 유지
        //     this.videoIndex = 0;
        //     this.defaultVideo = 20;
        //     // 현재 보여지는 video 전부 삭제
        //     $(".infiniteVideo").remove();
        //     if(this.props.totalIndex < this.defaultVideo) {
        //         // video 개수가 20개 미만 시 처리
        //         this.defaultVideo = this.props.totalIndex;
        //     } 
        //     for(var i=0; i < this.defaultVideo; i++) {
        //         this.appendMachine();
        //     }
        // }

        // // 정렬에 따른 처리
        // if(this.props.changeNum === 3) {
        //     // 최신 순
        //     this.videoIndex = 0;
        //     $(".infiniteVideo").remove();
        //     for(var i=0; i < this.defaultVideo; i++) {
        //         this.appendMachine();
        //     }
        // } else if(this.props.changeNum === 4) {
        //     // 러닝타임 긴 순
        //     this.videoIndex = 0;
        //     $(".infiniteVideo").remove();
        //     for(var i=0; i < this.defaultVideo; i++) {
        //         this.appendMachine();
        //     }
        // }
        // var $this = this;
        // // infinite scroll
        // $(window).scroll(function () {
        //     if($this.videoIndex > $this.props.totalIndex) {
        //         // 휠 오작동으로 인한 무한로딩 방지
        //         $(window).off('scroll');
        //     }
        //     // modalYoutube 작동 중에는 infiniScroll 작동 방지
        //     if($this.modalOn === false) {
        //     if ((parseInt($(window).scrollTop()) + 1) >= ($(document).height() - $(window).height())) {
        //         // isScrolling의 용도
        //         // 스크롤이 작동 중일 때 재 스크롤 조작으로
        //         // 요청이 중첩됨으로 인한 오작동 방지
        //         if($this.videoIndex < $this.props.totalIndex 
        //             && $this.isScrolling === false) {
        //             // isScrolling on
        //             $this.isScrolling = true;
        //             $(".progress").css({"display": "block"});
        //             setTimeout(function() {
        //                 if($this.videoIndex < $this.props.totalIndex) {
        //                     for(var i=0; i<5; i++) {
        //                         if($this.videoIndex >= $this.props.totalIndex) {
        //                             break;
        //                         } else {
        //                             $this.appendMachine();
        //                         }
        //                     }
        //                 }
        //                 // isScrolling off
        //                 $this.isScrolling = false;
        //                 $(".progress").css({"display": "none"});
        //             }, 2000);
        //         } else {
        //             // 더 이상 video가 없습니다
        //         }
        //     }
        // }
        // });
        
        // // open modalYoutube
        // // click이 한 번만 발생하게 하여 여러 번 호출되는 것을 방지
        // $(document).one("click", ".infiniteVideo", function() {
        //     // videoIndex 추출
        //     var videoIndex = $(this).attr("data-videoIndex");
        //     var youtubeId = '';
        //     var DBvideoIndex = $(this).find("input.DBvideoIndex").val();
        //     $this.modalClicked = true;
        //     // youtubeId null check
        //     // 동적 태그 생성 시 boolean이 아닌 
        //     // "null" 이라는 문자열로 삽입되었기에
        //     // "null" 문자열로 null 체크
        //     if($(this).attr("name") === "null") {
        //         // youtubeId 기본값 설정
        //         // null일 경우를 대비해
        //         // 기본값을 '8hYlB38asDY' 세팅
        //         youtubeId = '8hYlB38asDY';
        //     } 
        //     else {
        //         youtubeId = $(this).attr("name");
        //     }
        //     $this.openModalYoutube(videoIndex, youtubeId, DBvideoIndex);
        // });
        // // close modalYoutube
        //     $(document).on('click', "#btnCloseYoutube", function() {
        //         // youtube background에서 작동 방지
        //         $("iframe")[0]
        //              .contentWindow
        //              .postMessage('{"event":"command","func":"' +
        //                  'stopVideo' + '","args":""}', '*');
        //         // close modalYoutbe
        //         $(".modalYoutube").css({"display": "none"});
        //         // modalOn off
        //         $this.modalOn = false;
        //     });
        return (
            <div>
                <div className="infiniteVideoArea">
                    {this.state.infiniteVideoList}

                </div>
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

export default InfiniteScroll;