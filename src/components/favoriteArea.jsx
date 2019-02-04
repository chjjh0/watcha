import React, { Component } from 'react';
import request from 'superagent';
// components
// css
import '../css/favoriteArea.css';
// jQuery
import $ from 'jquery';
window.$ = $;

class FavoriteVideoArea extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            favVideo: []
        }
        this.videoIndex = 0;
        this.appendMachine = this.appendMachine.bind(this);
        this.btnHeart = this.btnHeart.bind(this);
    }

    appendMachine() {
        $(".favoriteVideoArea").append(
            '<div class="favVideo">' +
                '<div class="videoInfo">' +
                    '<h2 class="title">' + this.props.favVideo[this.videoIndex].title + '</h2>' +
                    '<div class="releaseYear">' + this.props.favVideo[this.videoIndex].releaseYear + '</div>' +
                '</div>' +
                '<div class="favPoster"></div>' +
                '<div class="heartIcon" name="' + this.props.favVideo[this.videoIndex].videoIndex + '"></div>' +
            '</div>'
        );
        $(".favVideo:eq(" + this.videoIndex + ")").find(".favPoster").css({
            "background": "url('/img/" + this.props.favVideo[this.videoIndex].image + "') #888 no-repeat center/cover"
        });
        this.videoIndex++;
    }

    btnHeart(e) {
        $(e).toggleClass("noHeart");
        var userId = sessionStorage.getItem('id');
        var videoIndex = $(e).attr("name");
        if($(e).hasClass("noHeart")) {
            request.post('/deleteFavorite')
            .send({
                userId: userId,
                videoIndex: videoIndex
            })
            .end((err, res) => {
                if(err) {
                    console.log('err: '+err.message)
                    console.log('res.body: '+res.body)
                    alert(res.body)
                    return;
                }
                if(res.body.message) {
                    alert(res.body.message)
                }
            })
        } else {
            // slideArea component와 동일하게 진행하지만
            // 차이점은 sessionStorage 확인이 이미 진행 후
            // 보고싶어요 페이지에 왔기 때문에 추가 인증 작업 X
            request.post('/addFavorite')
            .send({
                userId: userId,
                videoIndex: videoIndex
            })
            .end((err, res) => {
                if(err) {
                    console.log('err: '+err.message)
                    console.log('res.body: '+res.body)
                    alert(res.body)
                    return;
                }
                // 보고싶어요 페이지에서 다시 보고싶어요 추가 시
                // 등록 완료 메세지는 띄우지 않음
            })
            }
        }

    componentDidMount() {
        var newLocal = this;
        for(var i=0; i<this.props.totalIndex; i++) {
            newLocal.appendMachine();
        }
    }

    render() {
        var newLocal = this;
        $(function() {
            $(".heartIcon").click(function() {
                newLocal.btnHeart($(this));
            })
        })
        return (
            <div className="favoriteVideoArea">
            {/* /commentArea */}
            </div>
        );
    }
}

export default FavoriteVideoArea;
