import React, { Component } from 'react';
// components
//css
import '../css/modal.css';
//img
import $ from 'jquery';
window.$ = $;


class modal extends Component {
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
        this.slideInit();
     }

    slideInit(){
        var imgAry = [
            'GameOfThrone.jpg',
            'ironman.jpg',
            'ifonly.jpg',
            'secret.jpg',
            'toystory3.jpg'
        ]
        this.slideAry.push({
            image: imgAry[0],
            title: '왕좌의 게임 시즌 1',
            ratingValue: '4.1',
            rating: '2011 • 청불 • 에피소드 10개',
            synopsis: '웨스테로스 대륙의 연맹 국가인 칠 왕국이 통치권과 철 왕좌를 차지하기 위한 싸움을 벌이는 가운데, 장벽 너머에 전설 속의 적이 부활했다는 소문이 모두를 위협한다.'
        });
        this.slideAry.push({
            image: 'ironman.jpg',
            title: '아이언 맨',
            ratingValue: '3.9',
            rating: '2008 • 12세 • 2시간 5분',
            synopsis: '억만장자 CEO이자 천재 발명가인 토니 스타크는 아프가니스탄에서 납치되어 무기를 만들 것을 강요당하지만, 독창적인 철갑 무장 슈트를 만들어 탈출한 뒤 악에 맞서 싸우기로 다짐한다.'
        });
        this.slideAry.push({
            image: 'ifonly.jpg',
            title: '이프 온리',
            ratingValue: '3.7',
            rating: '2004 • 15세 • 1시간 35분',
            synopsis: '눈앞에서 사랑하는 여인 사만다를 잃은 이안. 다음 날 아침, 이안은 자신의 옆에서 아무 일 없다는 듯 자고 있는 사만다를 보고 소스라치게 놀란다. '
        });
        this.slideAry.push({
            image: 'secret.jpg',
            title: '말할 수 없는 비밀',
            ratingValue: '4.2',
            rating: '2007 • 12세 • 1시간 41분',
            synopsis: '예술학교로 전학 온 상륜은 옛 음악실에서 샤오위라는 소녀를 만난다. 가까워질수록 애틋한 마음이 싹트지만 샤오위에 대해 더 알고 싶어 할 때마다 그녀는 어느 샌가 사라져버린다.'
        });
        this.slideAry.push({
            image: 'toystory3.jpg',
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
        $(function(){
            $(".slideArea").css("display","none");
            $(".slideArea").css("background", "url('../imgp/"+slideImg+"') no-repeat right/55%")
            $(".slideEle").find("h2").html(title);
            $(".slideEle").find(".ratingValue").html(ratingValue);
            $(".slideEle").find(".rating").html(rating);
            $(".slideEle").find(".synopsis").html(synopsis);
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


    render() {
        return (
            <div className="paymentModal">
                <div className="modalContent">
                    <h2>왓챠플레이 이용권 구매</h2>
                    <p>첫달 무료 무제한 Full-HD 스트리밍</p>
                    <hr></hr>
                    <p>
                        <i className="fas fa-tv"></i> Full-HD의 선명한 화질
                    </p>
                    <p>
                        <i className="fas fa-star"></i> 4억개의 평가 데이터에 기반한 추천 엔진
                    </p>
                    <p>
                        <i className="far fa-play-circle"></i> 모든 영화, 드라마, 다큐 애니 무제한 감상
                    </p>
                    <p>
                        <i className="fas fa-mobile-alt"></i> &quot;다양한 기기에서 끊김없이&quot;
                    </p>
                    <p>
                    <i className="fas fa-exclamation-circle"></i> 설정 메뉴에서 위약금 없이 언제든 해지 가능
                    </p>
                    <h3>이용권 선택</h3>
                    <div className="basicTicket">
                        <p>기본 이용권</p>
                        <p>기본 기기에서 합리적으로</p>
                        <p><strong>지원기기</strong> 모바일/테블릿, PC, 맥</p>
                        <p>첫달 무료</p>
                        <p>이후 월 4,900원</p>
                    </div>
                    <div className="highTicket">
                    <p>TV 지원 이용권</p>
                        <p>TV, 크롭캐스트 등 더 큰 화면에서도</p>
                        <p><strong>지원기기</strong> 모바일/테블릿, PC, 맥, 크롬캐스트, 스마트 TV</p>
                        <p>첫달 무료</p>
                        <p>이후 월 7,900원</p>
                    </div>
                    <i id="btnCloseModal" className="fas fa-times"></i>    
                </div> {/* //modalContent */}
          </div> 
        );
    }
    }

export default modal;
