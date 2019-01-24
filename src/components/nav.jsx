import React, { Component } from 'react';
import { Link } from 'react-router-dom';

// components
import ModalPayment from './modalPayment.jsx';
// css
import '../css/nav.css';
// img

// jQuery
import $ from 'jquery';
window.$ = $;


class Nav extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: '로그인'
        }
        this.btnCategory = this.btnCategory.bind(this);
        this.scrollFunction = this.scrollFunction.bind(this);
        this.isloged = this.isloged.bind(this);
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

    isloged(logedUser) {
        console.log('Client isloged')
        this.setState({
            user: "로그인 성공"
        })
    }
    
    render() {
        var newLocal = this;
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
                // $(document).onClick = function(event) {
                //     console.log('event::: ', event)
                //     console.log('target::: ', event.target)
                //     if (!event.target.matches('.searchBar')) {
                //         $(".searchBar").css({"opacity": "0", "width": "0"});
                //         $(".rightNav i").css({"display": "inline", "transition": "all 0.9s"});
                //         $(".payment-bar").removeClass("paymentModal");
                //     }
                // };
        // //function
        });

        // check login
        // $(function() {
        //     if(window.sessionStorage.getItem("isLoged")) {
        //         alert('islogged')
        //         var logedUser = window.sessionStorage.getItem("isloged");
        //         alert(window.sessionStorage.getItem("isloged"))
        //         newLocal.isloged(logedUser)
        //     }
        // })
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
                        <a href="#">보고싶어요</a>
                        {

                        }
                        {/* mypage */}
                        {
                            sessionStorage.getItem("isLoged") != null ?
                            <a href="http://127.0.0.1:3001/mypage"> "mypage" </a>
                            : ""
                        }
                        
                        {
                            sessionStorage.getItem("isLoged") != null ?
                            <button onClick={() => {
                                sessionStorage.removeItem("isLoged")
                                window.location.href = "http://127.0.0.1:3001/"
                            }}>로그아웃</button>
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
