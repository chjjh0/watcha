import React, { Component } from 'react';
// components
import Youtube from './youtube.jsx';
// css
import '../css/style.css';
import '../css/videoList.css';
// img
import VideoBG from '../img/video-gradient.png';
// jquery
import $ from 'jquery';
window.$ = $;


class VideoList extends Component {

 constructor(props) {
    super(props);
    this.state = {
        videoSlideNum: 1,
        video: 'cMpWP5P_f2s',
        title: '1',
        releaseYear: '2',
        ratingAge: '3',
        runningTime: '4',
        synopsis: '5',
        moveNum: 1,
    }
    this.videoDataAry = [];
    this.videoImgAry = [];
    this.videoSelected = this.videoSelected.bind(this);
    this.videoHovered = this.videoHovered.bind(this);
    this.viewMore = this.viewMore.bind(this);
    this.btnPrev = this.btnPrev.bind(this);
    this.btnNext = this.btnNext.bind(this);
    this.btnPreview = this.btnPreview.bind(this);
    this.defaultVideoSet = this.defaultVideoSet.bind(this);
    this.closeVideoDetail = this.closeVideoDetail.bind(this);
    this.defaultVideoSet();
 }

viewMore(num) {
    var viewMoreImage = this.videoImgAry[num];
    var viewMoreTitle = $("#videoIndex"+num+" > h2").html();
    var viewMoreRating = $("#videoIndex"+num+" > .videoDesc > p:eq(0)").html();
    var viewMoreSynopsis = $("#videoIndex"+num+" > .videoDesc > p:eq(1)").html();
//  video scale >> basic video shape
//  change videoHoverMode >> videoClickMode
    $(".video").css("transform","none");
    $(".video").removeClass("videoHoverMode");
    $(".video").addClass("videoClickMode");
//  border of video change color
    this.videoSelected(num);
//  viewMore set1
    $(".videoDetail-container").css({
        "background":"url('imgp/"+viewMoreImage+"') no-repeat right/55%"
    });
//  viewMore set2
    $(".videoDetail-contentInfo").find("h2").html(viewMoreTitle);
    $(".videoDetail-contentInfo").find(".videoDetail-rating").html(viewMoreRating);
    $(".videoDetail-contentInfo").find(".videoDetail-synopsis").html(viewMoreSynopsis);
//  smooth change display
    
    $(".videoDetail-container").slideDown("slow");
}

videoSelected(num) {
    // Change video border color
    $(".video").css("border","4px solid #121212");
    $("#videoIndex"+num).css({
        "border":"4px solid white"
    })
}

btnPreview(videoId) {
    this.setState({
        video: videoId
    });
}


defaultVideoSet() {
    var newLocal = this;
    // imgAry 0-4
    this.videoImgAry.push("lostnight.jpg");
    this.videoImgAry.push('Carribian.jpg');
    this.videoImgAry.push('starwars_7.jpg');
    this.videoImgAry.push('yourname.jpg');
    this.videoImgAry.push('iamsam.jpg');
    // imgAry 5-9
    this.videoImgAry.push('lordofthering3.jpg');
    this.videoImgAry.push('benjamin.jpg');
    this.videoImgAry.push('maninblack2.jpg');
    this.videoImgAry.push('bourneidentity.jpg');
    this.videoImgAry.push('lovestory.jpg');
    // video 0-4
    this.videoDataAry.push({
        image: this.videoImgAry[0],
        title: '사라진 밤',
        releaseYear: '2018',
        ratingAge: '15세',
        runningTime: '1시간 41분',
        synopsis: '아내 설희를 살해하고 완전범죄를 계획한 진한. 그런데 몇 시간 후, 국과수 사체 보관실에서 설희의 시체가 흔적도 없이 사라지고 진한에게는 문자 한 통이 도착한다.',
    });
    this.videoDataAry.push({
        image: this.videoImgAry[1],
        title: '캐리비안의 해적',
        releaseYear: '2007',
        ratingAge: '12세',
        runningTime: '2시간 48분',
        synopsis: '플라잉 더치맨 호와 데비 존스를 이용하여 해적을 소탕하고 다니는 동인도 회사에 맞서, 윌 터너와 엘리자베스 스완, 바르보사 선장은 해적 연맹을 소집한다.',
    });
    this.videoDataAry.push({
        image: this.videoImgAry[2],
        title: '스타 워즈 에피소드 7',
        releaseYear: '2015',
        ratingAge: '12세',
        runningTime: '2시간 18분',
        synopsis: '다스 베이더가 사망한 지 약 30년 후, 마지막 제다이인 루크 스카이워커가 사라진다. 저항군의 파일럿 포는 루크가 있는 곳의 지도를 얻지만, 스톰트루퍼들에게 붙잡히고 만다.',
    });
    this.videoDataAry.push({
        image: this.videoImgAry[3],
        title: '너의 이름은',
        releaseYear: '2018',
        ratingAge: '12세',
        runningTime: '1시간 46분',
        synopsis: '깊은 산골짜기 시골 마을에 사는 미츠하와 도쿄에 사는 타키. 만날 리 없던 두 사람은 어느 날 서로의 몸과 마음이 바뀐 신기한 꿈속에서 서로의 존재를 알게 된다.',
    });
    this.videoDataAry.push({
        image: this.videoImgAry[4],
        title: '아이 엠 샘',
        releaseYear: '2001',
        ratingAge: '12세',
        runningTime: '2시간 12분',
        synopsis: '일곱 살의 지능을 가진 샘은 딸 루시와 즐거운 나날을 보내고 있다. 그러나 루시가 일곱 살이 되자 사회 복지 기관 전문가가 샘이 루시를 부양할 수 있는지 검증이 필요하다며 끼어든다.',
    });
    // video 5-9
    this.videoDataAry.push({
        image: this.videoImgAry[5],
        title: '반지의 제왕:왕의 귀환',
        releaseYear: '2003',
        ratingAge: '12세',
        runningTime: '3시간 20분',
        synopsis: '간달프는 사우론의 군대와의 전투를 위해 흩어져 있던 병사들을 모은다. 그들은 중간계를 지키려는 사명감과 반지 운반자에게 임무를 끝낼 기회를 주기 위해 어둠의 군대를 향해 돌진한다.',
    });
    this.videoDataAry.push({
        image: this.videoImgAry[6],
        title: '벤자민 버튼의 시간은 거꾸로 간다',
        releaseYear: '2008',
        ratingAge: '12세',
        runningTime: '2시간 46분',
        synopsis: '80세의 외모로 태어나 부모에게 버려진 벤자민 버튼은 자신이 점점 젊어진다는 것을 알게 된다. 12살이 되어 60대의 외모가 된 어느 날, 소녀 데이지를 만나고 그녀를 잊지 못한다.',
    });
    this.videoDataAry.push({
        image: this.videoImgAry[7],
        title: '맨 인 블랙 2',
        releaseYear: '2002',
        ratingAge: '12세',
        runningTime: '1시간 28분',
        synopsis: '외계인 셀리나에 의해 지구가 위기에 놓이게 되자, MIB 요원 J는 은퇴하면서 자신의 기억을 모두 지워버린 베테랑 요원 K를 찾아가 그의 기억을 복구시키고자 갖은 애를 쓴다.',
    });
    this.videoDataAry.push({
        image: this.videoImgAry[8],
        title: '본 아이덴티티',
        releaseYear: '2002',
        ratingAge: '12세',
        runningTime: '1시간 58분',
        synopsis: '이탈리아 어부들이 지중해 한 가운데에서 등에 두 발의 총상을 입은 채 표류하고 있는 한 남자(Jason Bourne: 맷 데이먼 분)를 구하게 된다. 그는 의식을 찾게 되지만 기억 상실증에 걸려 자신이 누구인지 조차 모른다. 그가 누구인지 알 수 있는 단서는 등에 입은 총상과 살 속에 숨겨져 있던 스위스 은행의 계좌번호 뿐...',
    });
    this.videoDataAry.push({
        image: this.videoImgAry[9],
        title: '시월애',
        releaseYear: '2000',
        ratingAge: '12세',
        runningTime: '1시간 36분',
        synopsis: '성현에게 2년 후로부터 온 이상한 편지가 도착하고, 그 내용들이 현실 속에 나타난다. 자신의 편지가 2년 전으로 갔다는 것을 믿게 된 은주는 그곳으로 편지를 보내기 시작한다.',
    });

    $(function(){
        for(var i=0;i<10;i++){
            var image = newLocal.videoDataAry[i].image;
            var cdnImage = "https://lh5.googleusercontent.com/bcWan-ZZ3g-xSZPhp9CPfIrsBmmrHXCBYLA4daB8ua2PknoCEyFVHfw5WUwUrAGiHH41CWqxH7_wwg=w1920-h953-rw";
            var title = newLocal.videoDataAry[i].title;
            var releaseYear = newLocal.videoDataAry[i].releaseYear;
            var ratingAge = newLocal.videoDataAry[i].ratingAge;
            var runningTime = newLocal.videoDataAry[i].runningTime;
            var synopsis = newLocal.videoDataAry[i].synopsis;
            // video setting
            // background URL 속성이 index.html 이 있는 public 폴더를 기준으로 잡아야 적용 됨
            $(".video").addClass("videoHoverMode");
            $(".video:eq("+i+")").css({"background":"url('../imgp/"+image+"') center/cover"});
            //$(".video:eq("+i+")").css({"background":"url('"+cdnImage+"') center/cover"});
            $(".video:eq("+i+")").find("h2").html(title);
            $(".video:eq("+i+")").find(".videoDesc > h2").html(title);
            $(".video:eq("+i+")").find(".videoDesc > p:eq(0)").html(
                releaseYear+"&middot;"
                +"<span>"+ratingAge+"</span>"
                +"&middot;"+runningTime);
            $(".video:eq("+i+")").find("p:eq(1)").html(synopsis);
        }
    });
}


closeVideoDetail() {
    var slideNum = this.state.videoSlideNum;
    var i = 0;
    var end = 0;
    $(".video").css("border","4px solid #121212");
    $(".video").removeClass("videoClickMode");
    $(".video").removeClass("videoHoverMode");
    switch(slideNum) {
        case 1:
        i = 0;
        end = 5;
        break;
        case 2:
        i = 5;
        end = 10;
        break;
        case 3:
        break;
        default :
        break;
    }
    for(;i<end;i++) {
        $("#videoIndex"+i).addClass("videoHoverMode");
    }
    $(".videoDetail-container").slideUp("slow");
}

btnPrev() {
    var newLocal = this;
    var slideNum = this.state.videoSlideNum-1;
    var i = 0;
    var end = 0;
    if(slideNum === 0 || 1) {
        slideNum = 1;
    } else {
        slideNum--;
    }
    if(slideNum === 1) {
        i = 0;
        end = 5;
    } else if(slideNum === 2) {
        i = 5;
        end = 9;
    }
    this.state.videoSlideNum = slideNum;
    $(function(){
        $(".video").removeClass("videoHoverMode");
        if($(".video").hasClass("videoClickMode")) {
        } else {
        for(;i<end;i++) {
            $("#videoIndex"+i).addClass("videoHoverMode");
        } // //for
    } // //else
    $(".video").css({
        "left":"0",
        "transition":"all 1s"
    });
    });
    
}

btnNext(){
    const newLocal = this;
    var i = 0;
    var end = 0;
    var slideNum = this.state.videoSlideNum+1;
    if(slideNum === 1) {
        i = 0;
        end = 5;
    } else if(slideNum === 2) {
        i = 5;
        end = 10;
    }
    this.state.videoSlideNum = slideNum;
     $(function(){
        $(".video").removeClass("videoHoverMode");
        if($(".video").hasClass("videoClickMode")) {
        } else {
            for(;i<end;i++){
                $("#videoIndex"+i).addClass("videoHoverMode");
            } // //for
        } // //else
        $(".video").css({
            "left":"-1670px",
            "transition":"all 1s"
        });
     });
 }

 videoHovered() {
    $(function(){
        if($(".video").hasClass("videoClickMode")) {
        } else {
    // video:eq(0)
        $(".videoHoverMode:eq(0)").hover(function(){
            for(var j=1;j<5;j++) {
                $(".videoHoverMode:eq("+j+")").css({
                "transform":"translate(80px, 0)", 
                "transition":"all 0.5s"})
            }
        }, function() {
            for(var i=1;i<5;i++) {
                $(".videoHoverMode:eq("+i+")").css({
                    "transform": "none"
                });
            }
        });
    // video:eq(1)
        $(".videoHoverMode:eq(1)").hover(function(){
            $(".videoHoverMode:eq(0)").css({
                "transform":"translate(-80px, 0)",
                "transition":"all 0.5s"
            });
            for(var j=2;j<5;j++) {
                $(".videoHoverMode:eq("+j+")").css({
                "transform":"translate(80px, 0)", 
                "transition":"all 0.5s"})
            }
        }, function() {
            $(".videoHoverMode:eq(0)").css({
                "transform":"none",
                "transition":"all 0.5s"
            });
            for(var i=2;i<5;i++) {
                $(".videoHoverMode:eq("+i+")").css({
                    "transform": "none"
                });
            }
        });
    // video:eq(2)
        $(".videoHoverMode:eq(2)").hover(function(){
            for(var i=0;i<2;i++) {
                $(".videoHoverMode:eq("+i+")").css({
                    "transform":"translate(-80px, 0)",
                    "transition":"all 0.5s"
                });
            }
            for(var j=3;j<5;j++) {
                $(".videoHoverMode:eq("+j+")").css({
                "transform":"translate(80px, 0)", 
                "transition":"all 0.5s"})
            }
        }, function() {
            for(var i=0;i<2;i++) {
                $(".videoHoverMode:eq("+i+")").css({
                    "transform":"none",
                    "transition":"all 0.5s"
                });
            }
            for(var i=3;i<5;i++) {
                $(".videoHoverMode:eq("+i+")").css({
                    "transform": "none"
                });
            }
        });
    // video:eq(3)
        $(".videoHoverMode:eq(3)").hover(function(){
            for(var i=0;i<3;i++) {
                $(".videoHoverMode:eq("+i+")").css({
                    "transform":"translate(-80px, 0)",
                    "transition":"all 0.5s"
                });
            }
            $(".videoHoverMode:eq(4)").css({
                "transform":"translate(80px, 0)",
                "transition":"all 0.5s"
            });
        }, function() {
            for(var i=0;i<3;i++) {
                $(".videoHoverMode:eq("+i+")").css({
                    "transform":"none",
                    "transition":"all 0.5s"
                });
            }
            $(".videoHoverMode:eq(4)").css({
                "transform":"none",
                "transition":"all 0.5s"
            });
        });
    // video:eq(4)
        $(".videoHoverMode:eq(4)").hover(function(){
            for(var i=0;i<4;i++) {
                $(".videoHoverMode:eq("+i+")").css({
                    "transform":"translate(-80px, 0)",
                    "transition":"all 0.5s"
                });
            }
        }, function() {
            for(var i=0;i<4;i++) {
                $(".videoHoverMode:eq("+i+")").css({
                    "transform":"none",
                    "transition":"all 0.5s"
                });
            }
        });
    }
    });
 }
 
    render() {
        var newLocal = this;
        // videoHovered
        $(function() {
            $(".videoHoverMode").hover(function() {
                newLocal.videoHovered();
            });
        });
        // videoClickMode
        $(function() {
            $(".video").click(function(){
                if($(this).hasClass("videoClickMode")) {
                var idTemp = $(this).attr("id").valueOf();
                var indexTemp = idTemp.substring(idTemp.length-1, idTemp.length);
                newLocal.videoSelected(indexTemp);
                newLocal.viewMore(indexTemp);
                
            }
            });
        });
        //function end
        return (
        <div className="videoArea">
        {/* categoryTitle */}
        <div className="videoList">
        <p>
            <span className="videoLabel_new">새로 올라온 작품</span>
        </p>
            <div className="videoInner">
                <div id="videoIndex0" className="video">
                    <h2>Title</h2>
                    <div>
                        <img className="video-bgGradient" src={VideoBG} alt=""/>
                    </div>
                    <div className="videoDesc">
                        <h2>DescTitle</h2>
                        <p><span></span></p>
                        <p>줄거리</p>
                        <div className="viewMore" onClick={() => this.viewMore(0)}>
                            <i className="fas fa-chevron-right"></i>
                        </div>
                    {/* videoDesc */}
                    </div>
                {/* //video */}
                </div>
                <div id="videoIndex1" className="video">
                    <h2>Title</h2>
                    <div className="videoDesc">
                        <div className="preview"></div>
                        <h2>DescTitle</h2>
                        <p>2018 <span>15세</span> 1시간 41분</p>
                        <p>줄거리</p>
                        <div className="viewMore" onClick={() => this.viewMore(1)}>
                            <i className="fas fa-chevron-right"></i>
                        </div>
                    {/* videoDesc */}
                    </div>
                {/* //video */}
                </div>
                <div id="videoIndex2" className="video">
                    <h2>Title</h2>
                    <div className="videoDesc">
                        <div className="preview"></div>
                        <h2>DescTitle</h2>
                        <p>2018 <span>15세</span> 1시간 41분</p>
                        <p>줄거리</p>
                        <div className="viewMore" onClick={() => this.viewMore(2)}>
                            <i className="fas fa-chevron-right"></i>
                        </div>
                    {/* videoDesc */}
                    </div>
                {/* //video */}
                </div>
                <div id="videoIndex3" className="video">
                    <h2>Title</h2>
                    <div className="videoDesc">
                        <div className="preview"></div>
                        <h2>DescTitle</h2>
                        <p>2018 <span>15세</span> 1시간 41분</p>
                        <p>줄거리</p>
                        <div className="viewMore" onClick={() => this.viewMore(3)}>
                            <i className="fas fa-chevron-right"></i>
                        </div>
                    {/* videoDesc */}
                    </div>
                {/* //video */}
                </div>
                <div id="videoIndex4" className="video">
                    <h2>Title</h2>
                    <div className="videoDesc">
                        <div className="preview"></div>
                        <h2>DescTitle</h2>
                        <p>2018 <span>15세</span> 1시간 41분</p>
                        <p>줄거리</p>
                        <div className="viewMore" onClick={() => this.viewMore(4)}>
                            <i className="fas fa-chevron-right"></i>
                        </div>
                    {/* videoDesc */}
                    </div>
                {/* //video */}
                </div>
                <div id="videoIndex5" className="video">
                    <h2>Title</h2>
                    <div className="videoDesc">
                        <div className="preview"></div>
                        <h2>DescTitle</h2>
                        <p>2018 <span>15세</span> 1시간 41분</p>
                        <p>줄거리</p>
                        <div className="viewMore" onClick={() => this.viewMore(5)}>
                            <i className="fas fa-chevron-right"></i>
                        </div>
                    {/* videoDesc */}
                    </div>
                {/* //video */}
                </div>
                <div id="videoIndex6" className="video">
                    <h2>Title</h2>
                    <div className="videoDesc">
                        <div className="preview"></div>
                        <h2>DescTitle</h2>
                        <p>2018 <span>15세</span> 1시간 41분</p>
                        <p>줄거리</p>
                        <div className="viewMore" onClick={() => this.viewMore(6)}>
                            <i className="fas fa-chevron-right"></i>
                        </div>
                    {/* videoDesc */}
                    </div>
                {/* //video */}
                </div>
                <div id="videoIndex7" className="video">
                    <h2>Title</h2>
                    <div className="videoDesc">
                        <div className="preview"></div>
                        <h2>DescTitle</h2>
                        <p>2018 <span>15세</span> 1시간 41분</p>
                        <p>줄거리</p>
                        <div className="viewMore" onClick={() => this.viewMore(7)}>
                            <i className="fas fa-chevron-right"></i>
                        </div>
                    {/* videoDesc */}
                    </div>
                {/* //video */}
                </div>
                <div id="videoIndex8" className="video">
                    <h2>Title</h2>
                    <div className="videoDesc">
                        <div className="preview"></div>
                        <h2>DescTitle</h2>
                        <p>2018 <span>15세</span> 1시간 41분</p>
                        <p>줄거리</p>
                        <div className="viewMore" onClick={() => this.viewMore(8)}>
                            <i className="fas fa-chevron-right"></i>
                        </div>
                    {/* videoDesc */}
                    </div>
                {/* //video */}
                </div>
                <div id="videoIndex9" className="video">
                    <h2>Title</h2>
                    <div className="videoDesc">
                        <div className="preview"></div>
                        <h2>DescTitle</h2>
                        <p>2018 <span>15세</span> 1시간 41분</p>
                        <p>줄거리</p>
                        <div className="viewMore" onClick={() => this.viewMore(9)}>
                            <i className="fas fa-chevron-right"></i>
                        </div>
                    {/* videoDesc */}
                    </div>
                {/* //video */}
                </div>
            {/* //videoInner */}
            </div>
            
            
        {/* //videoList */}
        </div>
        <div className="videoDetail-container">
                <div className="videoDetail-bgGradient"></div>
                <div className="videoDetail-contentInfo">
                    <h2></h2>
                    <p>
                        <span className="videoDetail-ratingLabel">예상 별점</span>
                        <span className="videoDetail-ratingValue">2.5</span>
                        <span className="videoDetail-rating">1</span>
                    </p>
                    <p className="videoDetail-synopsis">
                    </p>
                    <div className="videoDetail-btnBox">
                        <button className="videoDetail-btnPlay"><i className="far fa-play-circle"></i> 재생</button>
                        <button className="videoDetail-btnWish"><i className="fas fa-plus"></i> 보고싶어요</button>
                        <button className="videoDetail-nop"><i className="fas fa-ban"></i> 관심없어요</button>
                    {/* //btnBox */}
                    </div> 
                {/* //contentInfo */}
                </div> 
                    <i id="videoDetail-btnClose" onClick={this.closeVideoDetail} className="fas fa-times videoDetail-btnClose"></i>
                {/* //videoDetail */}
                </div>
        {/* video prev, next */}
        <div className="btnVideoPrev" onClick={this.btnPrev}>
            <i className="fas fa-chevron-left"></i>
        </div>
        <div className="btnVideoNext" onClick={this.btnNext}>
            <i className="fas fa-chevron-right"></i>
        </div> 
        </div> 
        );
    }
    }

export default VideoList;
