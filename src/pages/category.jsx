import React, { Component } from 'react';
import request from 'superagent';
// components
import Infinite from '../components/infiniteScroll.jsx';
import ModalYoutube from '../components/modalYoutube.jsx';

// css
import '../css/categoryPage.css';


// img
import Logo from '../img/logo.png';
import LegoBack from '../img/login.jpg'
// jQuery
import $ from 'jquery';
window.$ = $;


class Category extends Component {
    // videoDescBasic = ajax 통신 후 얻은 기본값 배열, sort등으로 인한 수정되지 않은 original 배열
    // videoDescSorting = sort 작업에 사용되는 배열
    // videoDescResult = infiniteScroll component로 기본 배열/sort 결과물을 넘겨주기 위한 배열
    constructor(props) {
        super(props);
        this.state = {
            num: 1,
            lodingComplete: false,
            videoDescBasic: [],
            videoDescSorting: [],
            videoDescResult: [],
            changeNum: 1,
            genre: false
        }
        this.pageInit = this.pageInit.bind(this);
        this.changeGenre = this.changeGenre.bind(this);
        this.changeAlign = this.changeAlign.bind(this);
        this.pageInit();
    }

    pageInit() {
        request.get('/category/init')
        .query({test:"test"})
        .end((err, res) => {
            if(err) {
                console.log('error 발생::: ', err)
                return;
            }
            var videoTemp = res.body.video;
            // 모든 장르 선택 상황을 대비한 초기화
            this.state.videoDescBasic = [];
            for(var i=0;i<videoTemp.length;i++) {
                this.state.videoDescBasic.push(videoTemp[i])
            }
            this.setState({
                videoDescResult: this.state.videoDescBasic.slice(0),
                totalIndex: res.body.videoLength,
                lodingComplete: true,
            });
        })
    }

    changeGenre(value) {
        // 장르에 따른 ajax 처리
        // 모든 장르 선택 시 /category/init 재활용
        var selectedGenre = value.target.value;
        console.log(selectedGenre)
        if(selectedGenre === 'all') {
            this.pageInit();
        } else {
            request.get('/category/genre')
            .query({genre: selectedGenre})
            .end((err, res) => {
                if(err) {
                    console.log('error 발생::: ', err)
                    return;
                }
                var videoTemp = res.body.video;
                console.log('videoTemp::: ',videoTemp)
                // 초기화
                this.state.videoDescBasic = [];
                for(var i=0;i<videoTemp.length;i++) {
                    this.state.videoDescBasic.push(videoTemp[i])
                }
                this.setState({
                    videoDescResult: this.state.videoDescBasic.slice(0),
                    totalIndex: res.body.videoLength,
                    lodingComplete: true,
                    genre: true
                });
                console.log("새로운 배열::: ",this.state.videoDescBasic)
            });
        }
    }



    changeAlign(value) {
        var newLocal = this;
        // selected = recommendation, starpoint, new, runningtime
        var selected = value.target.value;
        // 정렬로 인해 항상 동일한 결과물을 얻기 위해 
        // basic 배열을 slice 함수를 통해 deep copy
        this.setState({
            videoDescSorting: this.state.videoDescBasic.slice(0)
        });
        //this.state.videoDescSorting = this.state.videoDescBasic;
        switch(selected) {
            case "starpoint":
                console.log('별점 순');
                break;
            case "new":
                // 최신 개봉 순
                $(function() {
                    newLocal.setState({
                        videoDescResult: newLocal.state.videoDescSorting.sort(function(a, b) {
                            return a.releaseYear > b.releaseYear ? -1 : a.releaseYear > b.releaseYear ? 1 : 0;
                        }),
                        changeNum: 3
                    });
                });
                break;
            case "runningtime":
                // 상영시간 긴 순
                $(function() {
                    newLocal.setState({
                        videoDescResult: newLocal.state.videoDescSorting.sort(function(a, b) {
                            // runningtime 짧은 순서 '<' 긴 순서 '>'
                            return a.runningtime > b.runningtime ? -1 : a.runningtime > b.runningtime ? 1 : 0;
                        }),
                        changeNum: 4
                    });
                });
                break;
            default:
        }
    }
    
    render() {
        return (
            <section className="categoryPage">
                <div className="selectArea">
                    <h2 className="categoryTitle">보고싶은 작품을 찾아보세요</h2>
                    <select className="genre" onChange={this.changeGenre}>
                        <option value="all">모든 장르</option>
                        <option value="drama">TV 드라마</option>
                        <option value="documentary">다큐멘터리</option>
                        <option value="animation">애니메이션</option>
                        <option value="adventure">모험</option>
                        <option value="fantasy">판타지</option>
                        <option value="action">액션</option>
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
                    <select className="alignment" onChange={this.changeAlign}>
                        <option value="starpoint">평균별점 순</option>
                        <option value="new">최신작품 순</option>
                        <option value="runningtime">러닝타임 순</option>
                    </select>
                </div>
                    {
                        this.state.lodingComplete === true ?
                        <Infinite 
                            videoDesc={this.state.videoDescResult}
                            totalIndex={this.state.totalIndex}
                            changeNum={this.state.changeNum}
                            genre={this.state.genre}
                         /> 
                        : <h2>비디오 컨텐츠가 없습니다</h2>
                    }
                {/* <ModalYoutube /> */}
            </section>
        );
    }
}

export default Category;
