import React, { Component } from 'react';
// css
import './App.css';
import './css/style.css';
// components
import SlideArea from './components/slideArea.jsx';
import VideoList from './components/videoList.jsx';
import $ from 'jquery';
window.$ = $;


class App extends Component {
  constructor(props) {
    super(props);
    this.btnCategory = this.btnCategory.bind(this);
    this.initialize = this.initialize.bind(this);
  }

  
  initialize() {
    
  }
  
  btnCategory(cateName) {
    $(".category-container > li").removeClass("active");
    $(".category-container > li > ul").css("display", "none");
    $("."+cateName).addClass("active");
    $("."+cateName+" > ul").css("display", "block");
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
      // initialize
      $(".btnCategory").hover(function(){
        $(".category-container > li").removeClass("active");
        $(".category-container > li > ul").css("display", "none");
        $(".category-container > .genre").addClass("active");
        $(".category-container > .genre > ul").css("display", "block");
      })

       });
    }
    return (
      <section className="wrap">
      <header>
        <div className="nav">
          <div className="lnb">
            <p>EVENT</p>
            <p>첫 1개월 무료체험 이벤트! 모든작품, 무제한 감상하세요. 마음에 들지 않으면 클릭 1번으로 언제든 해지할 수 있어요.</p>
            <div className="paymentBox">
              <div className="payment-bar">이용권 구매</div>
              <div className="payment-coupon">쿠폰 등록</div>
            </div>
            {/* paymentModal */}
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
            </div> {/* //btn-payment */}
          </div> 
          {/* //lnb */}
          <div className="gnb">
          <div className="gnbInner">
            
            {/* <a href="#"><img src={Logo} alt="logo" className="logo" /></a> */}
            <ul className="leftNav">
            <h1><div className="logo"></div></h1>
              <li className="btnCategory">
                <a href="#">카테고리</a>
                <ul className="category-container">
                  <li className="genre" onClick={() => this.btnCategory("genre")}>장르
                    <ul>
                      <li>로맨스</li>
                      <li>코메디</li>
                      <li>스릴러</li>
                      <li>공포</li>
                      <li>음악</li>
                    </ul>
                  </li>
                  <li className="nation" onClick={() => this.btnCategory("nation")}>국가
                    <ul>
                      <li>프랑스</li>
                      <li>이탈리아</li>
                      <li>일본</li>
                      <li>스페인</li>
                      <li>대만</li>
                    </ul>
                  </li>
                  <li className="hash" onClick={() => this.btnCategory("hash")}>해쉬태그
                    <ul>
                      <li>성장</li>
                      <li>경찰</li>
                      <li>영상미</li>
                      <li>실종</li>
                      <li>독립영화</li>
                    </ul>
                  </li>
                </ul>
              </li>
              <li className="evaluation"><a href="#">평가하기</a></li>
            </ul>
            <div className="rightNav">
              <a href="#" className="search-container">
                <i className="fas fa-search"> 검색</i>
                <input className="searchBar" type="text" placeholder="&#xf02b; 제목,감독,배우로 검색" />
              </a>
              <a href="#">보고싶어요</a>
              <a href="#">ID</a>
            </div>
          </div>
        </div> {/* gnb */}
      </div> {/* //nav */}
      <SlideArea />
    </header>
    <VideoList/>
  </section>
    );
  }
}

export default App;
