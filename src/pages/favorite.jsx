import React, { Component } from 'react';
import request from 'superagent';
// components
import FavoriteVideoArea from '../components/favoriteArea.jsx';
// css
import '../css/favoritePage.css';
// img
// jQuery
import $ from 'jquery';
window.$ = $;


class FavoritePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            totalIndex: 0,
            favoriteVideo: [],
            loadingComplete: false
        }
        this.pageInit = this.pageInit.bind(this);
        this.pageInit();
    }

    pageInit() {
        var userId = sessionStorage.getItem('id');
        request.get('/readFavorite')
        .query({userId: userId})
        .end((err, res) => {
            if(err) {
                console.log('err: '+err.message)
                console.log('res.body: '+res.body)
                alert(res.body)
                return;
            }
            if(res.body.message) {
                this.state.favoriteVideo = res.body.favoriteVideo;
                this.setState({
                    totalIndex: this.state.favoriteVideo.length,
                    loadingComplete: true
                });
            } else {
                console.log('readFavorite 없어')
            }
            
        });
    }
    
    render() {
        return (
            <section className="favoritePage">
                <div className="welcomeArea">
                    <h2 className="welcomeMsg">
                        {sessionStorage.getItem('id') ? 
                            sessionStorage.getItem('id') + '님이 보고싶어요한 작품' 
                            : '로그인 정보가 없습니다.'
                        }
                    </h2>
                {/* /welcomeArea */}
                </div>
                { this.state.loadingComplete === true ?
                    <FavoriteVideoArea 
                        totalIndex={this.state.totalIndex}
                        favVideo={this.state.favoriteVideo}
                    /> : '정상적으로 처리되지 않았습니다'
                }
            {/* /favoritePage */}
            </section>
        );
    }
}

export default FavoritePage;