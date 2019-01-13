import React, { Component } from 'react';
import request from 'superagent';
// components
import Infinite from '../components/infiniteScroll.jsx';

// css
import '../css/category.css';


// img
import Logo from '../img/logo.png';
import LegoBack from '../img/login.jpg'
// jQuery
import $ from 'jquery';
window.$ = $;


class Category extends Component {
    constructor(props) {
        super(props);
        this.state = {
        id: '',
        password: '',
        jump: ''
        }
    }

    render() {
        return (
            <section className="categoryPage">
                <div className="selectArea">
                    <h2 className="categoryTitle">보고싶은 작품을 찾아보세요</h2>
                    <select className="genre">
                        <option>모든 장르</option>
                        <option>TV 드라마</option>
                        <option>다큐멘터리</option>
                        <option>애니메이션</option>
                        <option>모험</option>
                        <option>판타지</option>
                        <option>액션</option>
                    </select>
                    <select className="nation">
                        <option>모든 국가</option>
                        <option>한국</option>
                        <option>미국</option>
                        <option>일본</option>
                        <option>영국</option>
                        <option>중국</option>
                    </select>
                    <select className="character">
                        <option>모든 특징</option>
                        <option>블록버스터</option>
                        <option>연기력</option>
                        <option>배신</option>
                        <option>중세배경</option>
                        <option>닌자</option>
                    </select>
                    <select className="alignment">
                        <option>추천 순</option>
                        <option>평균별점 순</option>
                        <option>최신작품 순</option>
                        <option>러닝타임 순</option>
                    </select>
                </div>
                <Infinite num={1}/>
            </section>
        );
    }
}

export default Category;
