import React, { Component } from 'react';
import request from 'superagent';

// components
//css
import '../css/slideArea.css';
//img
import Bggradient from '../img/bgGradient.png'
import $ from 'jquery';
window.$ = $;


class SlideArea extends Component {
    constructor(props) {
        super(props);
        this.state = {
            slideNum: 0
        }
        this.slideAry = [];
        this.slideInit = this.slideInit.bind(this);
        this.changeSlide = this.changeSlide.bind(this);
        this.btnNext = this.btnNext.bind(this);
        this.btnPrev = this.btnPrev.bind(this);
        this.btnFavorite = this.btnFavorite.bind(this);
        this.slideInit();
     }
    // slideAre 초기화
    slideInit(){
        var imgAry = [
            'gameofthrone.jpg',
            'ironman.jpg',
            'ifonly.jpg',
            'secret.jpg',
            'toystory3.jpg'
        ]
        this.slideAry.push({
            image: imgAry[0],
            videoIndex: '66',
            title: '왕좌의 게임 시즌 1',
            ratingValue: '4.1',
            rating: '2011 • 청불 • 에피소드 10개',
            synopsis: '웨스테로스 대륙의 연맹 국가인 칠 왕국이 통치권과 철 왕좌를 차지하기 위한 싸움을 벌이는 가운데, 장벽 너머에 전설 속의 적이 부활했다는 소문이 모두를 위협한다.'
        });
        this.slideAry.push({
            image: imgAry[1],
            videoIndex: '1',
            title: '아이언 맨',
            ratingValue: '3.9',
            rating: '2008 • 12세 • 2시간 5분',
            synopsis: '억만장자 CEO이자 천재 발명가인 토니 스타크는 아프가니스탄에서 납치되어 무기를 만들 것을 강요당하지만, 독창적인 철갑 무장 슈트를 만들어 탈출한 뒤 악에 맞서 싸우기로 다짐한다.'
        });
        this.slideAry.push({
            image: imgAry[2],
            videoIndex: '2',
            title: '이프 온리',
            ratingValue: '3.7',
            rating: '2004 • 15세 • 1시간 35분',
            synopsis: '눈앞에서 사랑하는 여인 사만다를 잃은 이안. 다음 날 아침, 이안은 자신의 옆에서 아무 일 없다는 듯 자고 있는 사만다를 보고 소스라치게 놀란다.'
        });
        this.slideAry.push({
            image: imgAry[3],
            videoIndex: '3',
            title: '말할 수 없는 비밀',
            ratingValue: '4.2',
            rating: '2007 • 12세 • 1시간 41분',
            synopsis: '예술학교로 전학 온 상륜은 옛 음악실에서 샤오위라는 소녀를 만난다. 가까워질수록 애틋한 마음이 싹트지만 샤오위에 대해 더 알고 싶어 할 때마다 그녀는 어느 샌가 사라져버린다.'
        });
        this.slideAry.push({
            image: imgAry[4],
            videoIndex: '4',
            title: '토이 스토리 3',
            ratingValue: '3.5',
            rating: '2010 • 전체 • 1시간 42분',
            synopsis: '어느 덧 앤디가 대학에 진학하고 집을 떠나게 되자 우디와 버즈를 비롯한 토이들은 불안에 떨게 되고, 그들은 앤디 엄마의 실수로 탁아소에 기증되는 신세가 된다.'
        });
        this.changeSlide(this.state.slideNum);
    }

    changeSlide(...num) {
        var slideImg = this.slideAry[num[0]].image;
        var title = this.slideAry[num[0]].title;
        var ratingValue = this.slideAry[num[0]].ratingValue;
        var rating = this.slideAry[num[0]].rating;
        var synopsis = this.slideAry[num[0]].synopsis;
        var videoIndex = this.slideAry[num[0]].videoIndex;
        $(function(){
            $(".slideArea").css("display","none");
            $(".slideArea").css("background", "url('img/"+slideImg+"') no-repeat right 50px/55%")
            $(".slideEle").find("h2").html(title);
            $(".slideEle").find(".ratingValue").html(ratingValue);
            $(".slideEle").find(".rating").html(rating);
            $(".slideEle").find(".synopsis").html(synopsis);
            $(".slideEle").find(".btnBox").find(".btnWish").attr('name', videoIndex);
            $(".slideArea").fadeIn("slow");
        });
    }

    btnPrev() {
        if(this.state.slideNum <= 0) {
            this.state.slideNum = 4;
        } else {
            this.state.slideNum--;
        }
        this.changeSlide(this.state.slideNum);
    }

    btnNext() {
        if(this.state.slideNum < 5) {
            if(this.state.slideNum === 4) {
                this.state.slideNum = 0;
            } else {
                this.state.slideNum++;
            }
            this.changeSlide(this.state.slideNum);
        } 
    }

    // 보고싶어요
    btnFavorite(e) {
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
    render() {
        return (
        <section className="slideArea">
            <div><img className="bgGradient" src={Bggradient} alt="overlay" /></div>
            <section className="slideEle">
                <div className="contentInfo ">
                    <h2></h2>
                    <p>
                        <span className="ratingLabel">예상 별점</span>
                        <span className="ratingValue"></span>
                        <span className="rating"></span>
                    </p>
                    <p className="synopsis"></p>
                    <div className="btnBox">
                        <button className="btnPlay"><i className="far fa-play-circle"></i>재생</button>
                        <button className="btnWish" onClick={this.btnFavorite}><i className="fas fa-plus"></i>보고싶어요</button>
                        <button className="nop"><i className="fas fa-ban"></i>관심없어요</button>
                    </div>
                </div>
            </section>
            <div className="slidePrev" onClick={this.btnPrev}>
                <i className="fas fa-chevron-left"></i>
            </div>
            <div className="slideNext" onClick={this.btnNext}>
                <i className="fas fa-chevron-right"></i>
            </div>
        </section>
        );
    }
    }

export default SlideArea;