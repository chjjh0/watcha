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
        $(".evaluateVideoArea").append(
            '<div class="evaluateVideo">' +
                '<div id=evaluateIndex' + this.videoIndex + ' class="evaluateVideoImgArea">' +
                    '<div class="evaluateHover">' +
                        '<h2 class="evaluateVideoTitle">' + this.props.videoDesc[this.videoIndex].title + '</h2>' +
                        '<p class="evaluateReleaseYear">' + this.props.videoDesc[this.videoIndex].releaseYear  + '</p>' +
                        '<p class="star">' + 
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

    componentDidMount() {
        // defaultVideoSet() 으로 호출 시 렌더링 전이라 .infiniteVideoArea가 없어서 추가가 되지 않음
        // componentDidMount로 첫 렌더링이 된 .infiniteVideoArea가 만들어진 후여야
        // 정상적으로 초기 video 들이 동적 할당 됨
        var newLocal = this;
        console.log('default')
        for(var i=0; i < this.state.defaultVideo; i++) {
            newLocal.appendMachine();
        }
    }

    render() {
        console.log('=======evaluate')
        console.log('전달확인 1 videoDESC: ' + this.props.videoDesc)
        console.log('전달확인 1 num: ' + this.props.videoDescNum)
        var newLocal = this;
            $(window).scroll(function () {
                console.log('scroll')
                if ((parseInt($(window).scrollTop()) + 1) >= ($(document).height() - $(window).height())) {
                    console.log('welcome=====')
                    console.log(newLocal.videoIndex)
                    if(newLocal.videoIndex < newLocal.props.totalIndex) {
                        $(".progress").css({"display": "block"});
                    }
                    setTimeout(function() {
                        if(newLocal.videoIndex < newLocal.props.totalIndex) {
                            for(var i=0; i<5; i++) {
                                newLocal.appendMachine();
                            } 
                        } else {
                            console.log('end')
                        }
                        console.log('동작 완료');
                        $(".progress").css({"display": "none"});
                    }, 2000);
                }
            });
            // mouse 위치값
            $(function() {
                $(".evaluateVideoImgArea").hover(function() {
                    // mouseEnter
                    //$(".starEvalAfter").css({"opacity": "0"});
                    $(document).on('mouseenter', 'p.star', function() {
                        //console.log('enter')
                        var offset = $(this).offset();
                        $(this).on('mousemove', function(event){
                            // star init
                            var mouseNow = (event.pageX - offset.left);
                            //console.log('X Axis : ' + event.pageX);
                            //console.log('mouseNow : ', mouseNow);
                            // 별점 초기화
                            $(this).find("a").removeClass("half full");
                            if(mouseNow >= 20 && mouseNow <= 40) {
                                // this = p.star
                                // 1 star half
                                $(this).find("a:eq(0)").addClass("half");
                                $(this).find("a:eq(0)").on('click', function(){
                                    console.log('index: ', $(this).index($(this).parent()))
                                })
                            } else if(mouseNow >= 41 && mouseNow <= 60) {
                                // 1 star full
                                $(this).find("a:eq(0)").addClass("full");
                            } else if(mouseNow >= 61 && mouseNow <= 85) {
                                // 2 star half
                                $(this).find("a:eq(1)").addClass("half");
                                $(this).find("a:eq(1)").prevAll("a").addClass("full");
                            } else if(mouseNow >= 86 && mouseNow <= 100) {
                                // 2 star full
                                $(this).find("a:eq(2)").prevAll("a").addClass("full");
                            } else if(mouseNow >= 101 && mouseNow <= 130) {
                                // 3 star half
                                $(this).find("a:eq(2)").addClass("half");
                                $(this).find("a:eq(2)").prevAll("a").addClass("full");
                            } else if(mouseNow >= 131 && mouseNow <= 150) {
                                // 3 star full
                                $(this).find("a:eq(3)").prevAll("a").addClass("full");
                            } else if(mouseNow >= 151 && mouseNow <= 170) {
                                // 4 star half
                                $(this).find("a:eq(3)").addClass("half");
                                $(this).find("a:eq(3)").prevAll("a").addClass("full");
                            } else if(mouseNow >= 171 && mouseNow <= 200) {
                                // 4 star full
                                $(this).find("a:eq(4)").prevAll("a").addClass("full");
                            } else if(mouseNow >= 201 && mouseNow <= 220) {
                                // 5 star half
                                $(this).find("a:eq(4)").addClass("half");
                                $(this).find("a:eq(4)").prevAll("a").addClass("full");
                            } else if(mouseNow >= 221 && mouseNow <= 250) {
                                // 5 star full
                                $(this).find("a:eq(4)").addClass("full");
                                $(this).find("a:eq(4)").prevAll("a").addClass("full");
                            } 
                        });
                    });
                    // mouseLeave
                    $(this).one('mouseleave', function() {
                        console.log('byebyebye');
                        $(this).off('mousemove mouseleave');
                    });
                });
            });
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