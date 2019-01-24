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
    constructor(props) {
        super(props);
        this.state = {
            videoDescNum: 0,
            num: 1,
            ping: false,
            videoDesc: [],
            videoDescBasic: [],
            changeNum: 1
        }
        this.pageInit = this.pageInit.bind(this);
        this.alignChange = this.alignChange.bind(this);
        this.pageInit();
    }

    pageInit() {
        request.get('/category/init')
        .send(
            {
                categoryState: "test"
            }
        )
        .end((err, res) => {
            if(err) {
                return;
            }
            var vd = res.body.video
            for(var i=0;i<vd.length;i++) {
                this.state.videoDesc.push(vd[i])
            }

            this.setState({
                videoDescNum: vd.length,
                totalIndex: res.body.videoLength,
                ping: true,
            })
        })
    }

    alignChange(value) {
        var newLocal = this;
        var selected = value.target.value;
        switch(selected) {
            case "recommendation":
                console.log('추천 순');
                break;
            case "starpoint":
                console.log('별점 순');
                break;
            case "new":
                // 최신 순
                // newLocal.setState({
                //     videoDesc: newLocal.state.videoDescBasic,
                //     changeNum: 3
                // })
                break;
            case "runningtime":
                // runningtime 긴 순
                $(function() {
                    var temp =
                    newLocal.state.videoDesc.sort(function(a, b) {
                        // runningtime 짧은 순서 '<' 긴 순서 '>'
                        return a.runningtime > b.runningtime ? -1 : a.runningtime > b.runningtime ? 1 : 0;
                    });
                    newLocal.setState({
                        videoDesc: temp,
                        changeNum: 4
                    });
                });
                
                break;
            default:
        }
        console.log('1 지금 배열 상태::: ', this.state.videoDescBasic[0].title )
        console.log('2 지금 배열 상태::: ', this.state.videoDesc[0].title )
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
                    <select className="alignment" onChange={this.alignChange}>
                        <option value="recommendation">추천 순</option>
                        <option value="starpoint">평균별점 순</option>
                        <option value="new">최신작품 순</option>
                        <option value="runningtime">러닝타임 순</option>
                    </select>
                </div>
                    {
                        this.state.ping === true ?
                        <Infinite 
                            videoDesc={this.state.videoDesc}
                            videoDescNum={this.state.videoDescNum}
                            totalIndex={this.state.totalIndex}
                            changeNum={this.state.changeNum}
                         /> 
                        : <h2>비디오 컨텐츠가 없습니다</h2>
                    }
                {/* <ModalYoutube /> */}
            </section>
        );
    }
}

export default Category;
