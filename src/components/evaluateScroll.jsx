import React, { Component } from "react";
// components
import Progress from './progress.jsx';
// css
import '../css/evaluateScroll.css';
// img
import evaluateStar from '../img/evaluate_star.png';
// jquery
import $ from 'jquery';
window.$ = $;

class infiniteScl extends Component {
    constructor(props) {
        super(props);
        this.state = {
           
        }
        this.defaultVideo = 20;
        this.videoIndex = 0;
        // 작동 중 확인
        this.isScrolling = false;
        this.appendMachine = this.appendMachine.bind(this);
        this.hoverModeStarPoint = this.hoverModeStarPoint.bind(this);
        this.clickModeStarPoint = this.clickModeStarPoint.bind(this);
        this.clickSetStarPoint = this.clickSetStarPoint.bind(this);
    }


    appendMachine() {
        $(".evaluateVideoArea").append(
            '<div class="evaluateVideo">' +
                '<div id=evaluateIndex' + this.videoIndex + ' class="evaluateVideoImgArea hoverMode">' +
                    '<div class="evaluateHover">' +
                        '<h2 class="evaluateVideoTitle">' + this.props.videoDesc[this.videoIndex].title + '</h2>' +
                        '<p class="evaluateReleaseYear">' + this.props.videoDesc[this.videoIndex].releaseYear  + '</p>' +
                        '<p class="star hoverMode">' + 
                            '<a href="#">★</a>' +
                            '<a href="#">★</a>' +
                            '<a href="#">★</a>' +
                            '<a href="#">★</a>' +
                            '<a href="#">★</a>' +
                        '</p>' +
                    '</div>' +
                '</div>' +
            '</div>'
        );
        $("#evaluateIndex" + this.videoIndex).css({
            "background": "url('/img/" + this.props.videoDesc[this.videoIndex].image + "') #888 no-repeat center/cover"
        });
        this.videoIndex++;
    }

    hoverModeStarPoint(mouseNow, starThis) {
        // mouseNow = mouse 현 위치
        // starThis = p.star.hoverMode
        if(!$(starThis).hasClass("hoverMode")) {
            // click 발생 시
            // p tag의 hoverMode class가 삭제됨에 따라
            // mousemove, mouseleave 동작이 중지 되어
            // 별점의 움직임을 막는다
            $(starThis).off('mousemove mouseleave');
            return;
        };
        // hover될 때마다 별점 초기화
        $(starThis).find("a").removeClass("half full");
        if(mouseNow >= 10 && mouseNow <= 40) {
            // 1 star half
            $(starThis).find("a:eq(0)").addClass("half");
        } else if(mouseNow >= 41 && mouseNow <= 60) {
            // 1 star full
            $(starThis).find("a:eq(0)").addClass("full");
        } else if(mouseNow >= 61 && mouseNow <= 85) {
            // 2 star half
            $(starThis).find("a:eq(1)").addClass("half");
            $(starThis).find("a:eq(1)").prevAll("a").addClass("full");
        } else if(mouseNow >= 86 && mouseNow <= 100) {
            // 2 star full
            $(starThis).find("a:eq(2)").prevAll("a").addClass("full");
        } else if(mouseNow >= 101 && mouseNow <= 130) {
            // 3 star half
            $(starThis).find("a:eq(2)").addClass("half");
            $(starThis).find("a:eq(2)").prevAll("a").addClass("full");
        } else if(mouseNow >= 131 && mouseNow <= 150) {
            // 3 star full
            $(starThis).find("a:eq(3)").prevAll("a").addClass("full");
        } else if(mouseNow >= 151 && mouseNow <= 170) {
            // 4 star half
            $(starThis).find("a:eq(3)").addClass("half");
            $(starThis).find("a:eq(3)").prevAll("a").addClass("full");
        } else if(mouseNow >= 171 && mouseNow <= 200) {
            // 4 star full
            $(starThis).find("a:eq(4)").prevAll("a").addClass("full");
        } else if(mouseNow >= 201 && mouseNow <= 220) {
            // 5 star half
            $(starThis).find("a:eq(4)").addClass("half");
            $(starThis).find("a:eq(4)").prevAll("a").addClass("full");
        } else if(mouseNow >= 221 && mouseNow <= 250) {
            // 5 star full
            $(starThis).find("a:eq(4)").addClass("full");
            $(starThis).find("a:eq(4)").prevAll("a").addClass("full");
        }
    }

    clickModeStarPoint(mouseNow) {
        // mouseNow = 마우스 현 위치
        // starPoint = 마우스 현 위치에 따른 별점을 반환
        var starPoint = 0;
        if(mouseNow >= 10 && mouseNow <= 40) {
            // 1 star half
            starPoint = 10;
        } else if(mouseNow >= 41 && mouseNow <= 60) {
            // 1 star full
            starPoint = 20;
        } else if(mouseNow >= 61 && mouseNow <= 85) {
            // 2 star half
            starPoint = 30;
        } else if(mouseNow >= 86 && mouseNow <= 100) {
            // 2 star full
            starPoint = 40;
        } else if(mouseNow >= 101 && mouseNow <= 130) {
            // 3 star half
            starPoint = 50;
        } else if(mouseNow >= 131 && mouseNow <= 150) {
            // 3 star full
            starPoint = 60;
        } else if(mouseNow >= 151 && mouseNow <= 170) {
            // 4 star half
            starPoint = 70;
        } else if(mouseNow >= 171 && mouseNow <= 200) {
            // 4 star full
            starPoint = 80;
        } else if(mouseNow >= 201 && mouseNow <= 220) {
            // 5 star half
            starPoint = 90;
        } else if(mouseNow >= 221 && mouseNow <= 250) {
            // 5 star full
            starPoint = 100;
        }
        return starPoint;
        //this.clickSetStarPoint(starPoint);
    }

    clickSetStarPoint(starPoint) {
        console.log('별점은:::: ',starPoint);
        return 1;
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
        $(document).on('click', "a[href='#']", function(e) {
            e.preventDefault();
        });
        // infiniteScroll
        $(window).scroll(function () {
            if ((parseInt($(window).scrollTop()) + 1) >= ($(document).height() - $(window).height())) {
                // isScrolling의 용도는 스크롤이 작동 중일 때 
                // 재 스크롤 조작으로 요청이 중첩됨으로 인한 오작동을 방지
                if(newLocal.videoIndex < newLocal.props.totalIndex 
                    && newLocal.isScrolling === false) {
                    // isScrolling on
                    newLocal.isScrolling = true;
                    $(".progress").css({"display": "block"});
                    // // .progress가 보여진 후 위치값을 계산하여
                    // // 스크롤 위치를 .progress가 보이는 위치로 이동
                    // var offset = $(".progress").offset();
                    // $("html, body").animate({scrollTop: offset.top}, 500);
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
        });
        // starPoint
        $(function() {
            // hoverMode
            $(document).on('mouseenter', "p.hoverMode", function() {
                // $(this) = p.star.hoverMode
                if(!$(this).hasClass("hoverMode")) {
                    // p.hoverMode가 아닐 때
                    // mousemove, mouseleave event 삭제 
                    $(this).off('mousemove mouseleave');
                    return;
                } else {
                    // p.hoverMode일 때 진행
                    $(this).on('mousemove', function(event){
                        var offset = $(this).offset();
                        var starThis = $(this);
                        var mouseNow = (event.pageX - offset.left);
                        // $(this) = p.star.hoverMode
                        newLocal.hoverModeStarPoint(mouseNow, starThis);
                    }); // /mousemove
                } // /else
                // p.hoverMode 영역에 마우스가 들어왔다가
                // 떠났을 때 발생되는 이벤트 처리 
                $(this).one('mouseleave', function() {
                    $(this).off('mousemove mouseleave');
                });
            }); // /mouseenter
            // clickMode
            $(document).on('click', "p.star", function(event) {
                // $(this) = p.star
                // $(this).parent().parent() = div.evaluateVideoImgArea
                var evaluateVideoImgAreaTemp = $(this).parent().parent();
                if($(evaluateVideoImgAreaTemp).hasClass("hoverMode")) {
                    // hoverMode > clickMode 전환
                    var offset = $(this).offset();
                    var mouseNow = (event.pageX - offset.left);
                    var starPoint = newLocal.clickModeStarPoint(mouseNow);
                    console.log('starPoint::: ', starPoint)
                    evaluateVideoImgAreaTemp.removeClass("hoverMode");
                    $(this).removeClass("hoverMode");
                    evaluateVideoImgAreaTemp.addClass("clickMode");
                } else {
                    // clickMode > hoverMode 전환
                    evaluateVideoImgAreaTemp.removeClass("clickMode");
                    $(this).addClass("hoverMode");
                    evaluateVideoImgAreaTemp.addClass("hoverMode");
                } // /else
            }); // /p.star click
        }); // /function()
        return (
            <div>
                <div className="evaluateVideoArea"></div>
                <div className="progress">
                    <Progress />
                </div>
            </div>
        );
    }
}

export default infiniteScl;