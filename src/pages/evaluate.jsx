import React, { Component } from 'react';
import request from 'superagent';
// components
import EvaluateScroll from '../components/evaluateScroll.jsx';
// css
import '../css/evaluatePage.css';
// img
// jQuery
import $ from 'jquery';
window.$ = $;


class Category extends Component {
    constructor(props) {
        super(props);
        // videoDesc = ajax 통신 후 얻은 배열, sort등으로 인한 수정되지 않은 '기본배열'
        // loadingComplete = infiniteScroll component에 데이터 전달 전 정상처리 여부를 확인하는 용도
        this.state = {
            videoDesc: [],
            totalIndex: 0,
            loadingComplete: false,
        }
        this.pageInit = this.pageInit.bind(this);
        this.pageInit();
    }

    pageInit() {
        request.get('/category/init')
        .end((err, res) => {
            if(err) {
                console.log('err.message: '+err.message)
                console.log('res.body: '+res.body)
                return;
            }
            this.state.videoDesc = res.body.video
            this.setState({
                totalIndex: this.state.videoDesc.length,
                loadingComplete: true,
            })
        })
    }
    
    render() {
        return (
            <section className="evaluatePage">
                <div className="evaluateScoreArea">
                    <h2 className="evaluateCounte">총 <span>483</span>개의 영상을 평가했습니다!</h2>
                    <p>그래요. 기왕 이렇게 된 거 500개 갑시다!</p>
                </div>
                    {
                        this.state.loadingComplete === true ?
                        <EvaluateScroll 
                            videoDesc={this.state.videoDesc}
                            totalIndex={this.state.totalIndex}
                         /> 
                        : <h2>비디오 컨텐츠가 없습니다</h2>
                    }
                {/* <ModalYoutube /> */}
            </section>
        );
    }
}

export default Category;