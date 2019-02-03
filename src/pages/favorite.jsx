import React, { Component } from 'react';
import request from 'superagent';
// components
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
            videoIndex: '1'
        }
    }
    
    componentDidMount() {
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
                alert(res.body.message)
                var favoriteTemp = res.body.favoriteVideo;
                console.log(favoriteTemp.length);
                this.setState({
                    videoIndex: res.body.favoriteVideo[0].title
                })

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
                <div className="favoriteVideoArea">
                    <div className="favoriteVideo">
                        {this.state.videoIndex} 번 비디오입니다.
                    </div>
                </div>
            {/* /favoritePage */}
            </section>
        );
    }
}

export default FavoritePage;
