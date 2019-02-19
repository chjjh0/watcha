import React, { Component } from 'react';
import request from 'superagent';
// components
import CommentDyn from './commentDyn.jsx';
// css
import '../css/commentRead.css';
// jQuery
import $ from 'jquery';
window.$ = $;


$(function() {
    $(window).on('click', ".btnDelete", function() {
        console.log('삭제 몇번????')
    });
})

class CommentRead extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            commentDyn: [],
            commentUpdate: false
        }
        this.commentIndex = 0;
        // 댓글 수정 버튼이 한번만 클릭 되게 하는 용도
        this.updating = false;
        this.commentBox = '';
        this.updateValidationComment = this.updateValidationComment.bind(this);
        this.updateResizeCommentBox = this.updateResizeCommentBox.bind(this);
    }

    updateValidationComment() {
        // comment 페이지에 .commentInput이 1개여서 jquery로 잡아도 괜찮지만, 
        // 해당 객체에서 이벤트가 발생했을 때 해당객체의 값만 가져오게 변경하기
        var commentText = $(".updateInput").val();
        var commentTextCount = commentText.length();
        console.log('updateInput=====')
        console.log('댓글 내용::: ', commentText)
        // 댓글 내용이 있다면 버튼 활성화
        if(commentText) {
            if(commentText.substr(0, 1) === " ") {
                // 댓글 첫 글자 공백 경고 안내 및 초기화
                alert('첫 글자는 공백을 사용할 수 없습니다.');
                $(".updateInput").val("");
            } else {
                $(".btnWriteArea").css({"display": "block"});
            }
        } else {
            $(".btnWriteArea").css({"display": "none"});
        }
        // 300자 이상 입력 방지
        if(commentTextCount > 300) {
            // 300자 이상이면 300자까지만 짤라서 val에 할당
            var maxText = $(".updateInput").val().substr(0, 300);
            alert("글자수가 너무 많습니다");
            $(".updateInput").val(maxText);
        } else {
            // 300자 이하이면 부가 작업 X
        }
    }

    updateResizeCommentBox(e) {
        // 댓글 수정란 height 조절 
        var height = e.scrollHeight;
        $(e).css({"height": height + "px"});
    }
    // 댓글 수정
    // btnUpdate(e) {
    //     console.log('댓글 수정 몇 번 진입???')
    //     this.updating = true;
    //     // $(e) = .btnUPdate
    //     // $(e).parent().parent() = p
    //     // $(e).parent().parent().next() = .commentContent
    //     // $(e).parent().parent().parent() = .commentBox
    //     var userId = $(e).parent().parent().find(".commentWriter").html()
    //     var comment = $(e).parent().parent().next().html();
    //     var commentBoxTemp = $(e).parent().parent().parent();
    //     // .commentContent 제거
    //     this.commentBox = $(e).parent().parent().parent()
    //     $(e).parent().parent().next().remove();
    //     // 댓글 수정에 필요한 textarea tag 생성
    //     $(commentBoxTemp).append(
    //         '<textarea class="updateInput" placeholder="댓글 달기...">' +
    //             comment +
    //         '</textarea>' +
    //         '<a class="btnUpdateSubmit" data-userId="' + userId + '" name="' + e.name + '" href="#" alt="수정 적용">확인</a>'
    //     )
    // }
    // // 댓글 수정사항 서버 전송
    // updateComment(commentIndex, userId, comment) {
    //     console.log('2 수정 request 진입')
    //     request.post('/updateComment')
    //     .send({
    //         commentIndex: commentIndex,
    //         writer: userId,
    //         comment: comment
    //     })
    //     .end((err, res) => {
    //         if(err) {
    //             console.log('errror::: ',err)
    //             return;
    //         }
    //         console.log('3 수정 request 완료')
    //         if(res.body.message) {
    //             //alert(res.body.message)
    //             this.updateSuccess(comment)
    //         } 
    //     });
    // }
    // // 수정완료 후 처리
    // updateSuccess(comment) {
    //     console.log('4 수정 마무리')
    //     this.updating = false;
    //     // 댓글 수정란, 수정 확인버튼 삭제
    //     $(".updateInput").remove();
    //     $(".btnUpdate").remove();
    //     $(this.commentBox).find(".optionBox").removeClass("on");
    //     // 서버 통신하지 않고 수정 완료한 댓글 내용을 같이 삽입
    //     $(this.commentBox).append(
    //         '<div class="commentContent">' + comment + '</div>'
    //     )
    // }
    // // 댓글 삭제
    // btnDelete(commentIndex, writer, btnDelete) {
    //     this.updating = true;
    //     this.commentBox = $(btnDelete).parent().parent().parent();
    //     request.post('/deleteComment')
    //     .send({
    //         commentIndex: commentIndex,
    //         writer: writer
    //     })
    //     .end((err, res) => {
    //         if(err) {
    //             console.log('errror::: ',err)
    //             return;
    //         }
    //         if(res.body.message) {
    //             //alert(res.body.message)
    //             $(this.commentBox).remove()
    //             this.updating = false;
    //         } 
    //     })
    // }

    componentWillMount() {
        for(var i=0; i < this.props.commentCount; i++) {
            this.state.commentDyn.push(
                <CommentDyn
                    commentIndex = {this.commentIndex} 
                    writer = {this.props.comment[this.commentIndex].writer}
                    writeDate = {this.props.comment[this.commentIndex].writeDate}
                    commentIndex = {this.props.comment[this.commentIndex].commentIndex}
                    comment = {this.props.comment[this.commentIndex].comment}
                />
            )
            this.commentIndex++;
        }
    }

    componentWillUpdate() {
        // 댓글이 작성되면 리렌더링 되어짐에 따라 렌더링 전에
        // 기존의 배열을 작성된 댓글까지 포함된 배열로 바꿔 렌더링
        // 기존 배열, commentIndex 초기화
        this.state.commentDyn = []
        this.commentIndex = 0
        for(var i=0; i < this.props.commentCount; i++) {
            this.state.commentDyn.push(
                <CommentDyn
                    commentIndex = {this.commentIndex} 
                    writer = {this.props.comment[this.commentIndex].writer}
                    writeDate = {this.props.comment[this.commentIndex].writeDate}
                    commentIndex = {this.props.comment[this.commentIndex].commentIndex}
                    comment = {this.props.comment[this.commentIndex].comment}
                />
            )
            this.commentIndex++;
        }
    }
    
    componentDidUpdate() {
    }

    render() {
        return (
            <section className="commentReadArea">
                {this.state.commentDyn}
            </section>
        );
    }
}

export default CommentRead;
