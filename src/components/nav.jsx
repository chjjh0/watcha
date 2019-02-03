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
        this.btnCategory = this.btnCategory.bind(this);
        this.scrollFunction = this.scrollFunction.bind(this);
        this.isloged = this.isloged.bind(this);
        this.btnLogout = this.btnLogout.bind(this);
        this.isloged();
    }

    btnCategory(cateName) {
        $(".category-container > li").removeClass("active");
        $(".category-container > li > ul").css("display", "none");
        $("."+cateName).addClass("active");
        $("."+cateName+" > ul").css("display", "block");
      }
        
    scrollFunction() {
        if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
            // $(".gnb")[0].style.background = "rgba(0,0,0,0.8)";
            $(".gnb").css({"background":"rgba(0,0,0,0.8)"});
        } else {
            // $(".gnb")[0].style.background = "transparent";
            $(".gnb").css({"background":"transparent"});
        }
    }

    isloged() {
        console.log('isLogged::: ', this.state.isLogged)
        request.get('/isLogin')
        .end((err, res) => {
            if(err) {
                console.log('err: '+err.message)
                console.log('res.body: '+res.body)
                alert(res.body)
                return;
            }
            if(res.body.message) {
                // 로그인 전
                console.log(res.body.message)
            } else {
                console.log(res.body.user[0].id+'님이 로그인 중입니다')
                this.setState({
                    isLogged: true,
                })
                // sessionStorage
                sessionStorage.setItem('id', res.body.user[0].id)
            }
        });
    }

    btnLogout() {
        request.get('/logout')
        .end((err, res) => {
            if(err) {
                console.log('err: '+err.message)
                console.log('res.body: '+res.body)
                alert(res.body)
                return;
            }
            this.setState({
                isLogged: false,
            })
            // remove sessionStorage 
            sessionStorage.removeItem('id')
            console.log('logout sessionStorage::: ',sessionStorage.getItem('id'))
            // redirect home
            window.location.href = '/';
        });
    }
    
    render() {
        var newLocal = this;
        if(this.state.isloged === false) {
            console.log(this.state.isLogged)
        }
        // prevent
        $(document).on('click', "a[href='#']", function(event) {
            event.preventDefault();
        });

        
        // Scrolling change gnb 
        window.onscroll = function() {
            newLocal.scrollFunction();
        };
        // search
        $(function(){
            $(".search-container i").click(function(){   
                console.log('여기 어때')
                $(".rightNav i").css({"display": "none", "transition": "all 0.1s"});
                $(".searchBar").css({"opacity": "1", "width": "200px"});
            });
        });

        return (
        <div className="nav">
            <ModalPayment />
            <div className="lnb">
                <p>EVENT
                    <span>첫 1개월 무료체험 이벤트! 모든작품, 무제한 감상하세요. 마음에 들지 않으면 클릭 1번으로 언제든 해지할 수 있어요.</span>
                </p>
                <div className="paymentBox">
                    <a href="#" alt="이용권 구매" className="payment-bar">이용권 구매</a>
                    <a href="#" alt="쿠폰 등록" className="payment-coupon">쿠폰 등록</a>
                {/* //paymentBox */}
                </div>
            {/* //lnb */}                
            </div>
            <div className="gnb">
                <div className="gnbInner">
                    <ul className="leftNav">
                        <h1><a href="/" alt="logo" className="logo">로고</a></h1>
                        <li className="btnCategory">
                            <Link to="/category">
                                <a href="/category" alt="카테고리">카테고리</a>
                            </Link>
                        {/* //btnCategory */}
                        </li>
                        <li className="evaluation">
                            <Link to="/evaluate">
                                <a href="/evaluate" alt="평가하기">평가하기</a>
                            </Link>
                        </li>
                        {/* //leftNav */}
                        </ul>
                        <div className="rightNav">
                            <a href="#" className="search-container">
                                <i className="fas fa-search"> 검색</i>
                                <input className="searchBar" type="text" placeholder="&#61442; 제목,감독,배우로 검색" />
                            </a>
                                                
                        {
                            this.state.isLogged === true ? 
                            <Link to="/favorite">
                                <a href="http://127.0.0.1:3001/favorite">보고싶어요</a>
                            </Link> : ''
                        }
                        
                        {
                            this.state.isLogged === true ?
                            <button onClick={this.btnLogout}>{this.state.loginId}로그아웃</button>
                            : 
                            <Link to="/login">
                                <a href="http://127.0.0.1:3001/login">
                                로그인
                                </a>
                            </Link>
                        }   
                            
                        {/* //rightNav */}
                        </div>
                {/* //gnbInner */}
                </div>
            {/* //gnb */}
            </div> 
        {/* //nav */}
        </div> 
    );
}
}

export default Nav;
