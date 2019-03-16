import React, { Component } from 'react';
import { Link } from 'react-router-dom';

// components
import ModalPayment from './modalPayment.jsx';
import request from 'superagent';

// css
import '../css/nav.css';
// img

// jQuery
import $ from 'jquery';
import { ServerResponse } from 'http';
window.$ = $;


class Nav extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLogged: false,
            loginId: ''
        }
        this.loggingIn = false;
        this.btnCategory = this.btnCategory.bind(this);
        this.scrollFunction = this.scrollFunction.bind(this);
        this.isloged = this.isloged.bind(this);
        this.btnLogout = this.btnLogout.bind(this);
        this.modalPaymentOn = this.modalPaymentOn.bind(this);
        this.isloged();
    }

    btnCategory(cateName) {
        $(".category-container > li").removeClass("active");
        $(".category-container > li > ul").css("display", "none");
        $("."+cateName).addClass("active");
        $("."+cateName+" > ul").css("display", "block");
      }
        
    scrollFunction() {
        // 상단 nav 영역 배경색 변경
        if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
            // $(".gnb")[0].style.background = "rgba(0,0,0,0.8)";
            $(".gnb").css({"background":"rgba(0,0,0,0.8)"});
        } else {
            // $(".gnb")[0].style.background = "transparent";
            $(".gnb").css({"background":"transparent"});
        }
    }

    isloged() {
        // 로그인 여부 확인 요청
        console.log('로그인 여부 확인 =========')
        var isLoggedId = sessionStorage.getItem('id');
        if(isLoggedId) {
            // sessionStorage에 값이 존재할때만 서버와 통신
            request.get('/isLogin')
            .query({
                id: isLoggedId
            })
            .end((err, res) => {
                if(err) {
                    console.log('err: '+err.message)
                    console.log('res.body: '+res.body)
                    alert(res.body)
                    return;
                }
                // 한 번 대조 요청을 처리할 동안 재요청 처리 방지
                this.loggingIn = true;
                if(res.body.message) {
                    // id 대조 결과 cookie와 다름
                    // before login message를 출력 후
                    // sessionStorage에만 남아있는 값을 지움
                    console.log(res.body.message)
                    sessionStorage.removeItem('id')
                } else {
                    // id 대조 결과 일치
                    // 로그인 상태로 전환
                    this.setState({
                        isLogged: true
                    })
                    // sessionStorage setting
                    sessionStorage.setItem('id', res.body.user[0].id)
                }
            });
        }
        // 작업이 끝나면 요청이 들어올 수 있게 false로 전환
        this.loggingIn = false;
    }

    btnLogout() {
        // 서버의 쿠키를 지우기 위한 요청
        request.get('/logout')
        .end((err, res) => {
            if(err) {
                console.log('err: '+err.message)
                console.log('res.body: '+res.body)
                alert(res.body)
                return;
            }
            // 로그아웃 상태로 전환
            this.setState({
                isLogged: false
            })
            // remove sessionStorage 
            sessionStorage.removeItem('id')
            // redirect home
            window.location.href = '/';
        });
    }

    modalPaymentOn() {
        // open paymentModal
        $(".modalPayment").css({"display":"block"});
    }

    componentWillUpdate() {
        console.log('nav===========')
        if(this.loggingIn === false) {
            this.isloged()
        }
    }

    componentDidMount() {
        var $this = this;
        // prevent
        $(document).on('click', "a[href='#']", function(event) {
            event.preventDefault();
        });

        // Scrolling change gnb 
        window.onscroll = function() {
            $this.scrollFunction();
        };

        // search
        $(function(){
            $(".search-container i").click(function(){   
                $(".rightNav i").css({"display": "none", "transition": "all 0.1s"});
                $(".searchBar").css({"opacity": "1", "width": "200px"});
            });
        });
    }

    render() {
        return (
        <header id="header" className="nav">
            <ModalPayment />
            <div className="lnb">
                <p>EVENT
                    <span>첫 1개월 무료체험 이벤트! 모든작품, 무제한 감상하세요. 마음에 들지 않으면 클릭 1번으로 언제든 해지할 수 있어요.</span>
                </p>
                <div className="paymentBox">
                    <a href="#" alt="이용권 구매" className="payment-bar" onClick={this.modalPaymentOn}>이용권 구매</a>
                    <a href="#" alt="쿠폰 등록" className="payment-coupon">쿠폰 등록</a>
                </div>
            </div>
            <div className="gnb">
                <div className="gnbInner">
                    <ul className="leftNav">
                        <h1><a href="/" alt="logo" className="logo">로고</a></h1>
                        <li className="btnCategory">
                            <Link to="/category">
                                <a href="/category" alt="카테고리">카테고리</a>
                            </Link>
                        </li>
                        <li className="evaluation">
                            <Link to="/evaluate">
                                <a href="/evaluate" alt="평가하기">평가하기</a>
                            </Link>
                        </li>
                        </ul>
                        <div className="rightNav">
                            <a href="#" className="search-container">
                                <i className="fas fa-search"> 검색</i>
                                <input className="searchBar" type="text" placeholder="&#61442; 제목,감독,배우로 검색" />
                            </a>
                                                
                        {
                            // 로그인 유무에 따른 '보고싶어요' Button 처리
                            this.state.isLogged === true ? 
                            <Link to="/favorite">
                                <a href="localhost:8000/favorite">보고싶어요</a>
                            </Link> : ''
                        }
                        {
                            // 로그인 여부에 따른 '로그인/로그아웃' Button 처리
                            this.state.isLogged === true ?
                            <a href="#" alt="로그아웃" onClick={this.btnLogout}>{this.state.loginId}로그아웃</a>
                            : 
                            <Link to="/login">
                                <a href="localhost:8000/favorite">로그인</a>
                            </Link>
                        }   
                        </div>
                </div>
            </div> 
        </header> 
    );
}
}

export default Nav;
