import React, { Component } from "react";
// components
import Progress from './progress.jsx';
import ModalYoutube from './modalYoutube.jsx';
import InfiniteVideoList from './infiniteVideoList.jsx';
// css
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
        this.loop = false
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
        // 직접 접근은 안되고 this.setState로 접근해야 reRendering
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
    
    componentWillMount() {
        if (this.props.totalIndex < this.defaultVideo) {
            this.defaultVideo = this.props.totalIndex;
        } 
        for(var i=0; i < this.defaultVideo; i++) {
           this.appendMachine()
        }
        this.setState({
            infiniteVideoList: this.videoListTemp
        })
        
    }

    componentDidMount() {
        var $this = this
        // open modalYoutube
        // click이 한 번만 발생하게 하여 여러 번 호출되는 것을 방지
        $(document).on('click', ".infiniteVideo", function() {
            // modal이 보여지는 동안에는 스크롤 정지
            $(window).off('scroll')

            // videoIndex 추출
            var videoIndex = $(this).attr("data-videoIndex");
            var youtubeId = '';
            var DBvideoIndex = $(this).find("input.DBvideoIndex").val();
            $this.modalClicked = true;
            // youtubeId NULL check
            // name 속성에 "NULL" 이라는 문자열로 삽입되었기에
            // "NULL" 문자열로 NULL 체크 (대소문자 주의)
            if($(this).attr("name") === 'NULL') {
                // youtubeId 기본값 설정
                // NULL일 경우를 대비해
                // 기본값을 '8hYlB38asDY' 세팅
                youtubeId = '8hYlB38asDY';
            } 
            else {
                youtubeId = $(this).attr("name");
            }
            $this.openModalYoutube(videoIndex, youtubeId, DBvideoIndex);
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
        });
        window.addEventListener('scroll', this.onScroll, false)
    }



    // 무한스크롤
    onScroll = () => {
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
                    }, 2000);
                } else {
                    $(window).off('scroll')
                    console.log('off')
                    // 더 이상 video가 없습니다
                }
        }
        });
      }

    render() {
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