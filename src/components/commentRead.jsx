import React, { Component } from 'react';
import request from 'superagent';
// components
// css
import '../css/commentRead.css';
// jQuery
import $ from 'jquery';
window.$ = $;

class CommentRead extends Component {
    
    constructor(props) {
        super(props);
        this.commentIndex = 0;
        this.optionToggle = false;
        this.appendComment = this.appendComment.bind(this);
    }

    appendComment() {
        if($("#infiniteIndex"+this.videoIndex).hasClass("infiniteVideoImgArea")) {
            // 이미 있는 경우 추가 생성 오작동 방지
        } else {
            console.log('appendComment')
            console.log('commentIndex::: ',this.commentIndex)
            $(".commentReadArea").append(
                '<section class="commentBox">' +
                    '<div class="profile"></div>' +
                    '<p>' + this.props.comment[this.commentIndex].writer + 
                        '<span>' + this.props.comment[this.commentIndex].writeDate + '</span>' + 
                        '<span class="btnOption"><i class="fas fa-ellipsis-v"></i></span>' + 
                        '<span class="optionBox">' +
                            '<a href="#" alt="수정">수정</a>' +
                            '<a href="#" alt="삭제">삭제</a>' + 
                        '</span>' +
                    '</p>' +
                    '<div class="commentContent">' + this.props.comment[this.commentIndex].comment + '</div>' +
                '</section>'
            );
            // $(".profile").css({
            //     "background": "url('/img/') #888 no-repeat center/cover"
            // });
            this.commentIndex++;
        }
    }

    componentDidMount() {
        for(var i=0; i < this.props.commentCount; i++) {
            this.appendComment();
        }
    }

    render() {
        var newLocal = this;
        console.log("commentRead====")
        console.log("1 total 확인::: ",this.props.comment)
        console.log("2 댓글 수 확인::: ",this.props.commentCount)
        if(this.props.changeComment === true) {
            this.commentIndex = 0;
            $(function() {
                $(".commentBox").remove();
                console.log('3 function inside')
                for(var i=0; i < newLocal.props.commentCount; i++) {
                    console.log('4 for inside')
                    newLocal.appendComment();
                }
            });
        }
        // click btnOption
        $(function() {
            $(document).on('click', 'a[href="#"]', function(e) {
                e.preventDefault();
            });
            $(".btnOption").click(function() {
                console.log('btnOption click 몇 번됨??????')
                console.log($(this))
                // 로그인 시에만 수정 가능하며, 아니라면 신고버튼으로 관리자에게 메일
                // 로그인 시를 통해 자기 것만 수정버튼 활성화
                // if (newLocal.optionToggle === false) {
                //     console.log('option false')
                //     $(this).next().css({"display": "block"});
                //     newLocal.optionToggle = true;
                // } else {
                //     console.log('option true')
                //     $(".optionBox").css({"display": "none"});
                //     newLocal.optionToggle = false;
                // }
            });
        });
        
        return (
            <section className="commentReadArea">
                
            </section>
        );
    }
}

export default CommentRead;
