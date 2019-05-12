import React, { Component } from 'react';
import request from 'superagent';
import 'babel-polyfill';
// components
import Infinite from '../components/infiniteScroll.jsx';
import ModalYoutube from '../components/modalYoutube.jsx';

// css
import '../css/categoryPage.css';


// img
import LegoBack from '../img/login.jpg'
// jQuery
import $ from 'jquery';
window.$ = $;


class Category extends Component {
    // videoDescBasic = ajax 통신 후 얻은 배열, sort등으로 인한 수정되지 않은 '기본배열'
    // videoDescSorting = sort 작업에 사용되는 배열
    // videoDescResult = '기본배열' or sort 결과물을 넘겨주기 위한 배열
    // loadingComplete = infiniteScroll component에 데이터 전달 전 정상처리 여부를 확인하는 용도
    constructor(props) {
        super(props);
        this.state = {
            num: 1,
            loadingComplete: false,
            videoDescBasic: [],
            videoDescSorting: [],
            videoDescResult: [],
            totalIndex: 0,
            changeNum: 1,
            genre: false
        }
        // 댓글처럼 변수들을 state에 두지 말고
        // 밖에 두어 props 전달용으로 사용
        // 하위에서 WillUpdate에서 정상 타이밍에 제대로 받는지 확인해보기
        this.pageInit = this.pageInit.bind(this);
        this.changeGenre = this.changeGenre.bind(this);
        this.changeAlign = this.changeAlign.bind(this);
        this.pageInit();
    }

    pageInit() {
        // console.log('1 pageINit')
        var $this = this;
        var aRes
        test();
        async function test() {
            try {
                aRes = await request.get('/category/init')
                // console.log('2 await 성공적',aRes.body.message);
                // console.log('2 await 성공적',aRes.body.video);
                // console.log('2 await 성공적',aRes.body.videoLength);
            } catch {
                console.log('await 에러 발생!!!!!')
            }
            //console.log('3 순차적으로 진행???')
            $this.state.videoDescBasic = aRes.body.video
            $this.setState({
                videoDescResult: $this.state.videoDescBasic.slice(0),
                totalIndex: aRes.body.videoLength,
                loadingComplete: true
            })
        }
        
        
    }

    // request.get('/category/init')
    //             .query({test:"test"})
    //             .end((err, res) => {
    //                 if(err) {
    //                     console.log('error 발생::: ', err)
    //                     return;
    //                 }
    //                 // '모든 장르' 선택 상황을 대비한 sort에 변질되지 않을 배열
    //                 this.state.videoDescBasic = res.body.video;
    //                 this.setState({
    //                     videoDescResult: this.state.videoDescBasic.slice(0),
    //                     totalIndex: res.body.videoLength,
    //                     loadingComplete: true,
    //                 });
    //             })

    changeGenre(e) {
        // 장르에 따른 ajax 처리
        // 모든 장르 선택 시 /category/init 재활용
        var selectedGenre = e.target.value;
        var $this = this;
        var aRes
        // 부모에서 setState를 통해 Unmount > 자식에서 Didmount 처리 패턴
        this.setState({
            loadingComplete: false
        })
        // this.state.loadingComplete = false
        
        // '모든 장르' 선택 시 this.state.videoDescBasic을 통해 초기화
        if(selectedGenre === 'all') {
            this.pageInit();
        } else {
            test();
            async function test() {
                aRes = await request.get('/category/genre').query({genre: selectedGenre})
                console.log('장르 성공적', aRes)
                $this.state.videoDescBasic = aRes.body.video
                $this.setState({
                    genre: true,
                    totalIndex: aRes.body.videoLength,
                    videoDescResult: $this.state.videoDescBasic.slice(0),
                    loadingComplete: true
                })
            }

            // request.get('/category/genre')
            // .query({genre: selectedGenre})
            // .end((err, res) => {
            //     if(err) {
            //         console.log('error 발생::: ', err)
            //         return;
            //     }
            //     var videoTemp = res.body.video;
            //     // 초기화
            //     this.state.videoDescBasic = [];
            //     for(var i=0;i<videoTemp.length;i++) {
            //         this.state.videoDescBasic.push(videoTemp[i])
            //     }
            //     // 갱신
            //     this.setState({
            //         genre: true,
            //         totalIndex: res.body.videoLength,
            //         videoDescResult: this.state.videoDescBasic.slice(0),
            //         loadingComplete: true
            //     });
            // });
        }
    }
    
    changeAlign(value) {
        var $this = this;
        // selected = recommendation, starpoint, new, runningtime
        var selected = value.target.value;
        // #1
        // 정렬로 인해 항상 동일한 결과물을 얻기 위해 
        // basic 배열을 slice 함수를 통해 deep copy
        // #2
        // loadingComplete로 비워줌으로 infiniteScroll 컴포넌트를 Unmount 시킨다
        // 그 이후 요청에 대한 처리가 끝나고 setState로 props 값을 넘기면 DidMount에서 처리가 가능하다
        this.setState({
            videoDescSorting: this.state.videoDescBasic.slice(0),
            loadingComplete: false
        });
        switch(selected) {
            case "new":
                // 최신 개봉 순
                $(function() {
                    $this.setState({
                        loadingComplete: true,
                        videoDescResult: $this.state.videoDescSorting.sort(function(a, b) {
                            return a.releaseYear > b.releaseYear ? -1 : a.releaseYear > b.releaseYear ? 1 : 0;
                        }),
                        changeNum: 3
                    });
                });
                break;
            case "runningtime":
                // 상영시간 긴 순
                $(function() {
                    $this.setState({
                        loadingComplete: true,
                        videoDescResult: $this.state.videoDescSorting.sort(function(a, b) {
                            // runningtime 짧은 순서 '<' 긴 순서 '>'
                            return a.runningtime > b.runningtime ? -1 : a.runningtime > b.runningtime ? 1 : 0;
                        }),
                        changeNum: 4
                    });
                });
                break;
            case "starpoint":
                console.log('별점 순');
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
                        this.state.loadingComplete === true ?
                            <Infinite 
                                videoDesc={this.state.videoDescResult}
                                totalIndex={this.state.totalIndex}
                                alignNum={this.state.changeNum}
                                genre={this.state.genre}
                            /> 
                        : <h2>비디오 컨텐츠가 없습니다</h2>
                    }
            </section>
        );
    }
}

export default Category;