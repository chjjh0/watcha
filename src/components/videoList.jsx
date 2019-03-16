import React, { Component } from 'react';
import request from 'superagent';

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
        video: 'cMpWP5P_f2s',
        title: '1',
        releaseYear: '2',
        ratingAge: '3',
        runningTime: '4',
        synopsis: '5',
        moveNum: 1,
    }
    this.videoSlideNum = 1;
    this.videoDataAry = [];
    this.videoImgAry = [];
    this.defaultVideoSet = this.defaultVideoSet.bind(this);
    this.videoSelected = this.videoSelected.bind(this);
    this.videoHovered = this.videoHovered.bind(this);
    this.viewMore = this.viewMore.bind(this);
    this.btnPrev = this.btnPrev.bind(this);
    this.btnNext = this.btnNext.bind(this);
    this.btnFavorite = this.btnFavorite.bind(this);
    this.closeVideoDetail = this.closeVideoDetail.bind(this);
    this.defaultVideoSet();
 }

viewMore(num) {
    var viewMoreImage = this.videoImgAry[num];
    var viewMoreTitle = $("#videoIndex"+num+" > h2").html();
    var viewMoreRating = $("#videoIndex"+num+" > .videoDesc > p:eq(0)").html();
    var viewMoreSynopsis = this.videoDataAry[num].synopsis;
    var viewMoreVideoIndex = this.videoDataAry[num].videoIndex;
    // #1
    // hoverMode로 인한 transform이 아직 돌아가지 않은 시점에서
    // viewMore 가 click 되어 원상태로 돌아가지 못하는 걸 방지
    $(".video").css({"transform": "none"});
    // #2
    // hoverMode > clickMode로 전환
    $(".video").removeClass("videoHoverMode");
    $(".video").addClass("videoClickMode");
    $(".videoArea .videoList").animate({"height": "220px"});
    // #3
    // 클릭 시 선택되어진 요소의 border color: white로 변경
    this.videoSelected(num);
    // #4
    // .videoArea height 변환
    $(".videoArea").animate({"height": "620"});
    // viewMore 배경이미지 set
    $(".videoDetail-container").css({
        "background":"url('img/"+viewMoreImage+"') no-repeat right/55%"
    });
    // viewMore 영화 정보 set
    $(".videoDetail-contentInfo").find("h2").html(viewMoreTitle);
    $(".videoDetail-contentInfo").find(".videoDetail-rating").html(viewMoreRating);
    $(".videoDetail-contentInfo").find(".videoDetail-synopsis").html(viewMoreSynopsis);
    $(".videoDetail-contentInfo").find(".videoDetail-btnWish").attr("name", viewMoreVideoIndex);
    // viewMore 느리게 보이기
    $(".videoDetail-container").slideDown("slow");
}

videoSelected(num) {
    // .video가 있는 모든 요소들의 border color: #121212로 초기화
    // 클릭 시 선택되어진 요소의 border color: white로 변경
    $(".video").css("border","4px solid #121212");
    $("#videoIndex"+num).css({
        "border":"4px solid white"
    })
}


defaultVideoSet() {
    var $this = this;
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
        videoIndex: '6'
    });
    this.videoDataAry.push({
        image: this.videoImgAry[1],
        title: '캐리비안의 해적',
        releaseYear: '2007',
        ratingAge: '12세',
        runningTime: '2시간 48분',
        synopsis: '플라잉 더치맨 호와 데비 존스를 이용하여 해적을 소탕하고 다니는 동인도 회사에 맞서, 윌 터너와 엘리자베스 스완, 바르보사 선장은 해적 연맹을 소집한다.',
        videoIndex: '7'
    });
    this.videoDataAry.push({
        image: this.videoImgAry[2],
        title: '스타 워즈 에피소드 7',
        releaseYear: '2015',
        ratingAge: '12세',
        runningTime: '2시간 18분',
        synopsis: '다스 베이더가 사망한 지 약 30년 후, 마지막 제다이인 루크 스카이워커가 사라진다. 저항군의 파일럿 포는 루크가 있는 곳의 지도를 얻지만, 스톰트루퍼들에게 붙잡히고 만다.',
        videoIndex: '12'
    });
    this.videoDataAry.push({
        image: this.videoImgAry[3],
        title: '너의 이름은',
        releaseYear: '2018',
        ratingAge: '12세',
        runningTime: '1시간 46분',
        synopsis: '깊은 산골짜기 시골 마을에 사는 미츠하와 도쿄에 사는 타키. 만날 리 없던 두 사람은 어느 날 서로의 몸과 마음이 바뀐 신기한 꿈속에서 서로의 존재를 알게 된다.',
        videoIndex: '13'
    });
    this.videoDataAry.push({
        image: this.videoImgAry[4],
        title: '아이 엠 샘',
        releaseYear: '2001',
        ratingAge: '12세',
        runningTime: '2시간 12분',
        synopsis: '일곱 살의 지능을 가진 샘은 딸 루시와 즐거운 나날을 보내고 있다. 그러나 루시가 일곱 살이 되자 사회 복지 기관 전문가가 샘이 루시를 부양할 수 있는지 검증이 필요하다며 끼어든다.',
        videoIndex: '8'
    });
    // video 5-9
    this.videoDataAry.push({
        image: this.videoImgAry[5],
        title: '반지의 제왕:왕의 귀환',
        releaseYear: '2003',
        ratingAge: '12세',
        runningTime: '3시간 20분',
        synopsis: '간달프는 사우론의 군대와의 전투를 위해 흩어져 있던 병사들을 모은다. 그들은 중간계를 지키려는 사명감과 반지 운반자에게 임무를 끝낼 기회를 주기 위해 어둠의 군대를 향해 돌진한다.',
        videoIndex: '9'
    });
    this.videoDataAry.push({
        image: this.videoImgAry[6],
        title: '벤자민 버튼의 시간은 거꾸로 간다',
        releaseYear: '2008',
        ratingAge: '12세',
        runningTime: '2시간 46분',
        synopsis: '80세의 외모로 태어나 부모에게 버려진 벤자민 버튼은 자신이 점점 젊어진다는 것을 알게 된다. 12살이 되어 60대의 외모가 된 어느 날, 소녀 데이지를 만나고 그녀를 잊지 못한다.',
        videoIndex: '14'
    });
    this.videoDataAry.push({
        image: this.videoImgAry[7],
        title: '맨 인 블랙 2',
        releaseYear: '2002',
        ratingAge: '12세',
        runningTime: '1시간 28분',
        synopsis: '외계인 셀리나에 의해 지구가 위기에 놓이게 되자, MIB 요원 J는 은퇴하면서 자신의 기억을 모두 지워버린 베테랑 요원 K를 찾아가 그의 기억을 복구시키고자 갖은 애를 쓴다.',
        videoIndex: '14'
    });
    this.videoDataAry.push({
        image: this.videoImgAry[8],
        title: '본 아이덴티티',
        releaseYear: '2002',
        ratingAge: '12세',
        runningTime: '1시간 58분',
        synopsis: '총상을 입은 채 표류하고 있는 한 남자를 구하게 된다. 의식을 찾게 되지만 기억을 잃어 자신이 누구인지 조차 모른다. 그가 누구인지 알 수 있는 단서는 등에 입은 총상 뿐.',
        videoIndex: '67'
    });
    this.videoDataAry.push({
        image: this.videoImgAry[9],
        title: '시월애',
        releaseYear: '2000',
        ratingAge: '12세',
        runningTime: '1시간 36분',
        synopsis: '성현에게 2년 후로부터 온 이상한 편지가 도착하고, 그 내용들이 현실 속에 나타난다. 자신의 편지가 2년 전으로 갔다는 것을 믿게 된 은주는 그곳으로 편지를 보내기 시작한다.',
        videoIndex: '68'
    });

    $(function(){
        for(var i=0;i<10;i++){
            var image = $this.videoDataAry[i].image;
            var title = $this.videoDataAry[i].title;
            var releaseYear = $this.videoDataAry[i].releaseYear;
            var ratingAge = $this.videoDataAry[i].ratingAge;
            var runningTime = $this.videoDataAry[i].runningTime;
            var synopsis = $this.videoDataAry[i].synopsis;
            // synopsis 가 80글자 이상일 경우 80자까지 이상은 ... 으로 표기
            if(synopsis.length > 80) {
                synopsis = synopsis.substr(0, 81)+"...";
            }
            // video setting
            // background URL 속성이 index.html 이 있는 public 폴더를 기준으로 잡아야 적용 됨
            $(".video:eq("+i+")").css({"background":"url('img/"+image+"') center/cover"});
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
    var slideNum = this.videoSlideNum;
    var begin = 0;
    var end = 0;
    $(".video").css("border","4px solid #121212");
    $(".video").removeClass("videoClickMode");
    $(".video").removeClass("videoHoverMode");
    // clickMode > hoverMode 전환
    // 현재 슬라이드 번호에 따라 hoverMode로 전환
    switch(slideNum) {
        case 1:
            begin = 0;
            end = 5;
            break;
        case 2:
            begin = 5;
            end = 10;
            break;
        default :
    }
    for(;begin<end;begin++) {
        $("#videoIndex"+begin).addClass("videoHoverMode");
    }
    // videoDetail-container 감추기
    $(".videoDetail-container").slideUp("slow");
    setTimeout(function() {
        // videoArea, videoList 원상태로 복원
        $(".videoArea .videoList").animate({"height": "270px"});
        $(".videoArea").animate({"height": "230px"});
    }, 500);
}

btnPrev() {
    // video의 개수는 총 10개 (0번 ~ 9번)
    // default slide 1번, 총 slide 수 2개
    // slide 1번에서는 0 ~ 4번 slide 2번에는 5 ~ 9번에 hoverMode class 부여
    // videoList 영역에서 overflow: hidden 속성으로 감춰져 있더라도 
    // video가 hoverMode class를 가지고 있으면 움직임이 발생하는 것을 방지하기 위해
    // slide 숫자에 따라 현재 보이는 영역에서의 video 만 hoverMode를 부여하여 움직임을 허용
    var slideNum = this.videoSlideNum - 1;
    var begin = 0;
    var end = 0;
    if(slideNum <= 0 || slideNum === 1) {
        // slide 번호의 제일 작은 수는 1
        slideNum = 1;
        begin = 0;
        end = 5;
    } 
    this.videoSlideNum = slideNum;
    $(function(){
        if($(".video").hasClass("videoClickMode")) {
            // clickMode 시 처리내용 없음
        } else {
            // hoverMode class 초기화
            $(".video").removeClass("videoHoverMode");
            // hoverMode class 할당
            for(;begin<end;begin++) {
                $("#videoIndex"+begin).addClass("videoHoverMode");
            } // /for
        } // /else
        $(".video").animate({"left": "0"});
    });
}

btnNext(){
    // video의 개수는 총 10개 (0번 ~ 9번)
    // default slide 1번, 총 slide 수 2개
    // slide 1번에서는 0 ~ 4번 slide 2번에는 5 ~ 9번에 hoverMode class 부여
    // videoList 영역에서 overflow: hidden 속성으로 감춰져 있더라도 
    // video가 hoverMode class를 가지고 있으면 움직임이 발생하는 것을 방지하기 위해
    // slide 숫자에 따라 현재 보이는 영역에서의 video 만 hoverMode를 부여하여 움직임을 허용
    var begin = 0;
    var end = 0;
    var slideNum = this.videoSlideNum + 1;
    if(slideNum === 1) {
        begin = 0;
        end = 5;
    } else if(slideNum === 2) {
        begin = 5;
        end = 10;
    } else {
        // slide 번호가 2 이상일 경우 처리
        slideNum = 2;
        begin = 5;
        end = 10;
    }
    // 변화에 따른 자동 렌더링이 필요 없어 직접 접근하여 변경
    this.videoSlideNum = slideNum;
    $(function(){
        if($(".video").hasClass("videoClickMode")) {
            // clickMode일 경우 videoHoverMode class를 추가하지 않음
        } else {
            // hoverMode일 경우에만 진입
            $(".video").removeClass("videoHoverMode");
            for(;begin<end;begin++){
                $("#videoIndex"+begin).addClass("videoHoverMode");
            } // /for
        } // /else
        // .videoList의 width만큼 이동
        $(".video").animate({"left": -($(".videoList").width())});
    });
}

btnFavorite(e) {
    console.log('btnFavorite===')
    console.log(e.target.name)
    if(sessionStorage.getItem('id')) {
        // sessionStorage를 통해 login 여부 확인
        // login 상태라면 보고싶어요 작업 수행
        request.post('/addFavorite')
        .send({
            userId: sessionStorage.getItem('id'),
            videoIndex: e.target.name
        })
        .end((err, res) => {
            if(err) {
                console.log('err: '+err.message)
                console.log('res.body: '+res.body)
                alert(res.body)
                return;
            }
            if(res.body.message) {
                alert(res.body.message);
            } 
        })
    } else {
        // login 상태가 아니라면 login 페이지 이동 여부 확인
        if(window.confirm('로그인이 필요합니다 로그인 페이지로 이동할까요?')) {
            window.location.href = '/login'
        } else {
            // login 페이지 이동 X
        }
    }
}

 videoHovered(index) {
    // index에 따라 요소들을 이동
    // index는 0 ~ 4
    $(function() {
        switch(index) {
            case 0:
                // 0번 scale 및 overflow:hidden에 걸리지 않게 오른쪽 이동
                $(".videoHoverMode:eq(0)").css({
                    "transform": "translate(90px, 0) scale(1.7)",
                    "transition": "all 0.5s"});
                for(var j=1;j<5;j++) {
                    $(".videoHoverMode:eq("+j+")").css({
                        "transform": "translate(180px, 0)",
                        "transition": "all 0.5s"});
                }
                break;
            case 1:
                // 0번 왼쪽 이동
                $(".videoHoverMode:eq(0)").css({
                    "transform": "translate(-80px, 0)",
                    "transition": "all 0.5s"
                });
                // 1번 scale
                $(".videoHoverMode:eq(1)").css({
                    "transform": "scale(1.7)",
                    "transition": "all 0.5s"});
                // 2~4번 오른쪽 이동
                for(var j=2;j<5;j++) {
                    $(".videoHoverMode:eq("+j+")").css({
                        "transform": "translate(80px, 0)", 
                        "transition": "all 0.5s"})
                }
            break;
            case 2:
                // 0~1번 왼쪽 이동
                for(var i=0;i<2;i++) {
                    $(".videoHoverMode:eq("+i+")").css({
                        "transform": "translate(-80px, 0)",
                        "transition": "all 0.5s"
                    });
                }
                // 2번 scale
                $(".videoHoverMode:eq(2)").css({
                    "transform": "scale(1.7)",
                    "transition": "all 0.5s"});
                // 3~4번 오른쪽 이동
                for(var j=3;j<5;j++) {
                    $(".videoHoverMode:eq("+j+")").css({
                        "transform": "translate(80px, 0)", 
                        "transition": "all 0.5s"})
                }
            break;
            case 3:
                // 0~2번 왼쪽 이동
                for(var i=0;i<3;i++) {
                    $(".videoHoverMode:eq("+i+")").css({
                        "transform": "translate(-80px, 0)",
                        "transition": "all 0.5s"
                    });
                }
                // 3번 scale
                $(".videoHoverMode:eq(3)").css({
                    "transform": "scale(1.7)",
                    "transition": "all 0.5s"});
                // 4번 오른쪽 이동
                $(".videoHoverMode:eq(4)").css({
                    "transform": "translate(80px, 0)",
                    "transition": "all 0.5s"
                });
            break;
            case 4:
                // 4번 scale 및 overflow:hidden에 걸리지 않게 왼쪽 이동
                $(".videoHoverMode:eq(4)").css({
                    "transform": "translate(-90px, 0) scale(1.7)",
                    "transition": "all 0.5s"});
                // 0~3번 왼쪽 이동
                for(var i=0;i<4;i++) {
                    $(".videoHoverMode:eq("+i+")").css({
                        "transform": "translate(-180px, 0)",
                        "transition": "all 0.5s"
                    });
                }
            break;
            default:
        }
    });
}

componentDidMount() {
    var $this = this;
        // videoHovered
        $(document).on('mouseenter', ".videoHoverMode", function() {
            // $(this) = .videoHoverMode
            // .videoHoverMode class를 가지고 있는 건 총 5개
            // 5개의 index 0~4에 따라 다른 요소들의 움직임 결정
            var index = $(this).index(".videoHoverMode");
            $this.videoHovered(index);
            // .videoHoverMode 영역에서 마우스가 나갔을 때
            // videoHovered() 에서 이동시킨 요소들을 원위치
            $(this).on('mouseleave', function() {
                $(".videoHoverMode").css({
                    "transform":"none",
                    "transition":"all 0.5s"
                });
            });
        });
        // videoClickMode
            $(".video").click(function(){
                if($(this).hasClass("videoClickMode")) {
                    var idTemp = $(this).attr("id").valueOf();
                    var indexTemp = idTemp.substring(idTemp.length-1, idTemp.length);
                    $this.videoSelected(indexTemp);
                    $this.viewMore(indexTemp);
                }
            });
}
 
    render() {
        return (
            <section className="videoArea">
            {/* categoryTitle */}
                <div className="videoList">
                <p>
                    <span className="videoLabel_new">새로 올라온 작품</span>
                </p>
                    <div className="videoInner">
                        <div id="videoIndex0" className="video videoHoverMode">
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
                        <div id="videoIndex1" className="video videoHoverMode">
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
                        <div id="videoIndex2" className="video videoHoverMode">
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
                        <div id="videoIndex3" className="video videoHoverMode">
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
                        <div id="videoIndex4" className="video videoHoverMode">
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
                                <button className="videoDetail-btnWish" onClick={this.btnFavorite}><i className="fas fa-plus"></i> 보고싶어요</button>
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
            </section> 
        );
    }
    }

export default VideoList;