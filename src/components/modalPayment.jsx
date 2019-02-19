import React, { Component } from 'react';
// css
import '../css/modalPayment.css';
// jQuery
import $ from 'jquery';
window.$ = $;


class ModalPayment extends Component {
    constructor(props) {
        super(props);
     }


    render() {
        // paymentModal
        $(function(){
            $(".payment-bar").click(function(){
                $(".modalPayment").css({"display":"block"});
            });
        });
        // closeModal
        $(function() {
            $("#btnCloseModal").click(function(){
                $(".modalPayment").css({"display":"none"});
            });
          });
        return (
        <div className="modalPayment">
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
            {/* //modalContent */}
            </div>
        {/* //paymentModal */}
        </div> 
        );
    }
    }

export default ModalPayment;
