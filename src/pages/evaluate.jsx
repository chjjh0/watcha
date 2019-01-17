import React, { Component } from 'react';
import request from 'superagent';
// components
import EvaluateScroll from '../components/evaluateScroll.jsx';
import ModalYoutube from '../components/modalYoutube.jsx';
// css
import '../css/evaluatePage.css';
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
            ping: false
        }
        this.videoDesc = [];
        this.pageInit = this.pageInit.bind(this);
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
                console.log('err.message: '+err.message)
                console.log('res.body: '+res.body)
                return;
            }
            var vd = res.body.video
            console.log('vd: '+vd)
            console.log('vdLength: '+vd.length)
            for(var i=0;i<vd.length;i++) {
                this.videoDesc.push(vd[i])
            }
            console.log('vd: '+vd[0].title)
            console.log('vd: '+vd[1].title)
            console.log('videoDescLength: '+this.videoDesc.length)
            console.log('videoDesc 전체: '+this.videoDesc)
            console.log('videoDesc: '+this.videoDesc[0].title)
            console.log('videoDesc: '+this.videoDesc[1].title)
            console.log('youtubeId: '+this.videoDesc[1].youtubeId)

            this.setState({
                videoDescNum: vd.length,
                totalIndex: res.body.videoLength,
                ping: true,
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
                        this.state.ping === true ?
                        <EvaluateScroll 
                            videoDesc={this.videoDesc}
                            videoDescNum={this.state.videoDescNum}
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
