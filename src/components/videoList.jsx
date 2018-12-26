import React, { Component } from 'react';
//css
import '../css/style.css';
import '../css/videoList.css';
//img
import Btnplay from '../img/btnPlay.png';
import $ from 'jquery';
window.$ = $;


class videoList extends Component {

 constructor(props) {
     super(props);
     this.state = {
         title: '1',
         releaseYear: '2',
         ratingAge: '3',
         runningTime: '4',
         synopsis: '5',
     }
     this.next = this.next.bind(this);
     this.defaultVideoSet = this.defaultVideoSet.bind(this);
     this.videoDetail = this.videoDetail.bind(this);
     this.closeVideoDetail = this.closeVideoDetail.bind(this);
     this.defaultVideoSet();
 }


defaultVideoSet() {
    var dummyData = [];
    dummyData.push({
        title: '사라진 밤',
        releaseYear: '2018',
        ratingAge: '15세',
        runningTime: '1시간 41분',
        synopsis: '아내 설희를 살해하고 완전범죄를 계획한 진한. 그런데 몇 시간 후, 국과수 사체 보관실에서 설희의 시체가 흔적도 없이 사라지고 진한에게는 문자 한 통이 도착한다.',
    });
    dummyData.push({
        title: '캐리비안의 해적',
        releaseYear: '2007',
        ratingAge: '12세',
        runningTime: '2시간 48분',
        synopsis: '플라잉 더치맨 호와 데비 존스를 이용하여 해적을 소탕하고 다니는 동인도 회사에 맞서, 윌 터너와 엘리자베스 스완, 바르보사 선장은 해적 연맹을 소집한다.',
    });
    dummyData.push({
        title: '스타 워즈 에피소드 7',
        releaseYear: '2015',
        ratingAge: '12세',
        runningTime: '2시간 18분',
        synopsis: '다스 베이더가 사망한 지 약 30년 후, 마지막 제다이인 루크 스카이워커가 사라진다. 저항군의 파일럿 포는 루크가 있는 곳의 지도를 얻지만, 스톰트루퍼들에게 붙잡히고 만다.',
    });
    dummyData.push({
        title: '너의 이름은',
        releaseYear: '2018',
        ratingAge: '12세',
        runningTime: '1시간 46분',
        synopsis: '깊은 산골짜기 시골 마을에 사는 미츠하와 도쿄에 사는 타키. 만날 리 없던 두 사람은 어느 날 서로의 몸과 마음이 바뀐 신기한 꿈속에서 서로의 존재를 알게 된다.',
    });
    dummyData.push({
        title: '아이 엠 샘',
        releaseYear: '2001',
        ratingAge: '12세',
        runningTime: '2시간 12분',
        synopsis: '일곱 살의 지능을 가진 샘은 딸 루시와 즐거운 나날을 보내고 있다. 그러나 루시가 일곱 살이 되자 사회 복지 기관 전문가가 샘이 루시를 부양할 수 있는지 검증이 필요하다며 끼어든다.',
    });

    $(function(){
        for(var i=0;i<5;i++){
            // video setting
            // background URL 속성이 index.html 이 있는 public 폴더를 기준으로 잡아야 적용 됨
            $(".video").addClass("videoDefault");
            $(".video:eq("+i+")").attr("id","videoIndex"+i);
            $(".video:eq("+i+")").css({"background":"URL('./imgp/video"+i+".jpg') red center/cover"});
            $(".video:eq("+i+")").find("h2").html(dummyData[i].title);
            $(".video:eq("+i+")").find("h2:eq(1)").html(dummyData[i].title);
            $(".video:eq("+i+")").find("p:eq(0)").html(dummyData[i].releaseYear+"<span>"+dummyData[i].ratingAge+"</span>"+dummyData[i].runningTime);
            $(".video:eq("+i+")").find("p:eq(1)").html(dummyData[i].synopsis);
        }
    });
}

videoDetail(i) {
    // videoDetail-container
    // "linear-gradient(top, #121212, transparent, #121212) no-repeat"
    //  "url('../img/video"+i+".jpg') no-repeat right/65%"
    // var offset = $(".videoLabel_new").offset();
    $(function(){
        // $("html, body").animate({scrollTop:offset.top}, 500);
        $(".video").css({"border":"0"});
        $(".video").addClass("videoClick");
        $("#videoIndex"+i).addClass("videoHoving"+i);
        $(".video").removeClass("videoDefault");
        $(".videoDetail-container").css({
            "background": "url('./imgp/video"+i+".jpg') no-repeat right/65%"
        });
        $("#videoIndex"+i).css({"border":"2px solid white"});
        $(".videoDetail-container").find(".contentInfo h2").html($("#videoIndex"+i).find("h2").html());
        $(".videoDetail-container").find(".contentInfo p span:eq(2)").html($("#videoIndex"+i).find("p:eq(0)").text());
        $(".videoDetail-container").find(".contentInfo .synopsis").html($("#videoIndex"+i).find("p:eq(1)").text());
        $(".videoDetail-container, .contentInfo").css({"display":"block","height":"600px","opacity":"1", "transition":"all 0.5s"});
    });
}

closeVideoDetail() {
    // close videoDetail-container
    $(function(){
        $(".video").removeClass("videoHoving0");
        $(".video").removeClass("videoHoving1");
        $(".video").removeClass("videoHoving2");
        $(".video").removeClass("videoHoving3");
        $(".video").removeClass("videoClick");
        $(".video").css({"border":"0"});
        $(".video").addClass("videoDefault");
        $(".videoDetail-container").css({"display":"none","background":"transparent", "opacity":"0", "transition":"all 0.5s"});
    });
}
 

next(){
    alert('next');
    const newLocal = this;
    var dummyData2 = {
        title: '왕좌의 게임',
        releaseYear: '2017',
        ratingAge: '15세',
        runningTime: '1시간 41분',
        synopsis: '아내 설희를 살해하고 완전범죄를 계획한 진한. 그런데 몇 시간 후, 국과수 사체 보관실에서 설희의 시체가 흔적도 없이 사라지고 진한에게는 문자 한 통이 도착한다.',
    }
     $(function(){
        alert('click');
        newLocal.setState({
            title: dummyData2.title,
            releaseYear: '2018',
            ratingAge: '15세',
            runningTime: '1시간 41분',
            synopsis: '아내 설희를 살해하고 완전범죄를 계획한 진한. 그런데 몇 시간 후, 국과수 사체 보관실에서 설희의 시체가 흔적도 없이 사라지고 진한에게는 문자 한 통이 도착한다.',
        });
     });
 }
    render() {
        {
        window.onscroll = function() {
            scrollFunction()
        };
    
        function scrollFunction() {
            if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
            $(".gnb")[0].style.background = "rgba(0,0,0,0.8)";
            } else {
            $(".gnb")[0].style.background = "transparent";
            }
        }
        // paymentModal
        $(function(){
            $(".payment-bar").click(function(){
            $(".paymentModal").css({"display":"block"});
            });
        });

        // closeModal
        $(function() {
            $("#btnCloseModal").click(function(){
            $(".paymentModal").css({"display":"none"});
            });
        });
    
        // search
        $(function(){
            $(".search-container i").click(function(){   
            // $(".searchBar").toggle();
            $(".rightNav i").css({"opacity": "0", "transition": "all 0.1s"});
            $(".searchBar").css({"opacity": "1", "width": "200px"});
            });
            window.onclick = function(event) {
            if (!event.target.matches('.search-container i')) {
                $(".searchBar").css({"opacity": "0", "width": "0"});
                $(".rightNav i").css({"opacity": "1", "transition": "all 0.9s"});
                $(".payment-bar").removeClass("paymentModal");
            }
            }
        // videoHoving
        $(".video").click(function() {
            if($(this).hasClass("videoClick")) {
                var temp = $(this).attr("id").valueOf();
                var i = temp.substring(temp.length-1, temp.length);
                // var offset = $(".videoLabel_new").offset();
                // moveScroll
                // $("html, body").animate({scrollTop:offset.top}, 500);
                // change_videoDetail
                $(".video").css({"border":"0"});
                $(".videoDetail-container").css({
                    "background": "url('../imgp/video"+i+".jpg') no-repeat right/65%"
                });
                $(this).css({"border":"2px solid white"});
                $(".videoDetail-container").find(".contentInfo h2").html($(this).find("h2").html());
                $(".videoDetail-container").find(".contentInfo p span:eq(2)").html($(this).find("p:eq(0)").text());
                $(".videoDetail-container").find(".contentInfo .synopsis").html($(this).find("p:eq(1)").text());
                $(".videoDetail-container, .contentInfo").css({"display":"block","opacity":"1", "transition":"all 0.5s"});
            }
        });
        
        }); // function

        } //script
        return (
        <div className="videoList">
        <p>
            <span className="videoLabel_new">새로 올라온 작품</span>
            {/* <!--<span className="viewMore">모두 보기 ></span>--> */}
        </p>
        <div id="test" className="video">
            <h2></h2>
            <div className="videoInfo">
                <div className="btnPlayBox">
                    <a href="./play.html">
                    <img src={Btnplay} alt="playbutton" />
                    </a>
                </div>
                {/* //btnPlayBox */}
                <h2></h2>
                <p> <span> </span> </p>
                <p></p>
                {/* <p className="ratingScore">4.0</p> */}
                <p className="viewMoreBox" onClick={() => this.videoDetail(0)}><i id="btnViewMore" className="fas fa-chevron-right"></i></p>
                </div> {/* //videoInfo */}
        </div> {/* //video */}
        <div className="video">
            <h2></h2>
            <div className="videoInfo">
                <div className="btnPlayBox">
                    <a href="./play.html">
                    <img src={Btnplay} alt="playbutton" />
                    </a>
                </div>
                {/* //btnPlayBox */}
                <h2></h2>
                <p> <span> </span> </p>
                <p></p>
                {/* <p className="ratingScore">4.0</p> */}
                <p className="viewMoreBox" onClick={() => this.videoDetail(1)}><i id="btnViewMore" className="fas fa-chevron-right"></i></p>
                </div> {/* //videoInfo */}
        </div> {/* //video */}
        <div className="video">
            <h2></h2>
            <div className="videoInfo">
                <div className="btnPlayBox">
                    <a href="./play.html">
                    <img src={Btnplay} alt="playbutton" />
                    </a>
                </div>
                {/* //btnPlayBox */}
                <h2></h2>
                <p> <span> </span> </p>
                <p></p>
                {/* <p className="ratingScore">4.0</p> */}
                
                <p className="viewMoreBox" onClick={() => this.videoDetail(2)}><i id="btnViewMore" className="fas fa-chevron-right"></i></p>
                </div> {/* //videoInfo */}
        </div> {/* //video */}
        <div className="video">
            <h2></h2>
            <div className="videoInfo">
                <div className="btnPlayBox">
                    <a href="./play.html">
                    <img src={Btnplay} alt="playbutton" />
                    </a>
                </div>
                {/* //btnPlayBox */}
                <h2></h2>
                <p> <span> </span> </p>
                <p></p>
                {/* <p className="ratingScore">4.0</p> */}
                <p className="viewMoreBox" onClick={() => this.videoDetail(3)}><i id="btnViewMore" className="fas fa-chevron-right"></i></p>
                </div> {/* //videoInfo */}
        </div> {/* //video */}
        <div className="video">
            <h2></h2>
            <div className="videoInfo">
                <div className="btnPlayBox">
                    <a href="./play.html">
                    <img src={Btnplay} alt="playbutton" />
                    </a>
                </div>
                {/* //btnPlayBox */}
                <h2></h2>
                <p> <span> </span> </p>
                <p></p>
                {/* <p className="ratingScore">4.0</p> */}
                <p className="viewMoreBox" onClick={() => this.videoDetail(4)}>
                <i id="btnViewMore" className="fas fa-chevron-right"></i></p>
                </div> {/* //videoInfo */}
        </div> {/* //video */}
        <div className="video">
            <h2></h2>
            <div className="videoInfo">
                <div className="btnPlayBox">
                    <a href="./play.html">
                    <img src={Btnplay} alt="playbutton" />
                    </a>
                </div>
                {/* //btnPlayBox */}
                <h2></h2>
                <p> <span> </span> </p>
                <p></p>
                {/* <p className="ratingScore">4.0</p> */}
                <p className="viewMoreBox" onClick={() => this.videoDetail(4)}>
                <i id="btnViewMore" className="fas fa-chevron-right"></i></p>
                </div> {/* //videoInfo */}
        </div> {/* //video */}
        <div className="videoPrev">
                <i className="fas fa-chevron-left"></i>
        </div>
        <div className="videoNext" onClick={this.next}>
                <i className="fas fa-chevron-right"></i>
        </div>
        <div className="videoDetail-container">
            <div className="contentInfo">
                <h2></h2>
                <p>
                    <span className="ratingLabel">예상 별점</span>
                    <span className="ratingValue">2.5</span>
                    <span className="rating"></span>
                </p>
                <p className="synopsis">
                </p>
                <div className="btnBox">
                <button className="btnPlay"><i className="far fa-play-circle"></i>재생</button>
                <button className="btnWish"><i className="fas fa-plus"></i>보고싶어요</button>
                <button className="nop"><i className="fas fa-ban"></i>관심없어요</button>
                </div> {/* //btnBox */}
            </div> {/* //contentInfo */}
            {/* btnClose */}
            <i id="btnClose" onClick={this.closeVideoDetail} className="fas fa-times"></i>
            
        </div> {/* //videoDetail */}
        {/* //videoList */}
        </div> 
        );
    }
    }

export default videoList;
