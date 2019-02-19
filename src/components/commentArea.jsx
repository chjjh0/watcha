import React, { Component } from 'react';
import request from 'superagent';
// components
import CommentRead from './commentRead.jsx';
// css
import '../css/commentArea.css';
// jQuery
import $ from 'jquery';
window.$ = $;

class CommentArea extends Component {
    
    constructor(props) {
        super(props);
        // commentReady = DB에 댓글을 조회해오는 동안 렌더링을 지연시키기 위함
        // DB에 다녀올 동안 렌더링이 이미 되어버려 내용이 없는 빈칸이 발생
        this.state = {
            changed: false,
            commentReady: false
        }
        this.comment = []
        this.commentCount = 0
        this.changed = false
        this.submit = false;
        this.reading = false;
        this.commentInit = this.commentInit.bind(this);
        this.validationComment = this.validationComment.bind(this);
        this.createComment = this.createComment.bind(this);
        this.cancelComment = this.cancelComment.bind(this);
        this.readComment = this.readComment.bind(this);
        this.resizeCommentBox = this.resizeCommentBox.bind(this);
        this.moveLoginPage = this.moveLoginPage.bind(this);
        this.readComment();
    }

    commentInit() {
        // modal을 열 때마다 댓글 작성 내용 초기화
        $(".commentInput").val("")
    }

    validationComment() {
        // comment 페이지에 .commentInput이 1개여서 jquery로 잡아도 괜찮지만, 
        // 해당 객체에서 이벤트가 발생했을 때 해당객체의 값만 가져오게 변경하기
        var commentText = $(".commentInput").val();
        var commentTextCount = commentText.length;
        // 댓글 내용이 있다면 버튼 활성화
        if(commentText) {
            if(commentText.substr(0, 1) === " ") {
                // 댓글 첫 글자 공백 경고 안내 및 초기화
                alert('첫 글자는 공백을 사용할 수 없습니다.');
                $(".commentInput").val("");
            } else {
                $(".btnWriteArea").css({"display": "block"});
            }
        } else {
            $(".btnWriteArea").css({"display": "none"});
        }
        // 300자 이상 입력 방지
        if(commentTextCount > 300) {
            // 300자 이상이면 300자까지만 짤라서 val에 할당
            var maxText = $(".commentInput").val().substr(0, 300);
            alert("글자수가 너무 많습니다");
            $(".commentInput").val(maxText);
        } else {
            // 300자 이하이면 부가 작업 X
        }
    }

    cancelComment() {
        // 댓글 작성 취소
        $(".commentInput").val("");
        $(".btnWriteArea").css({"display": "none"});
    }

    createComment () {
        console.log('1 댓글 작성')
        // 댓글 작성
        var userId = sessionStorage.getItem('id');
        var title = this.props.title;
        var videoIndex = this.props.videoIndex;
        var commentText = $(".commentInput").val();
        request.post('/createComment')
        .send({
            userId: userId,
            videoIndex: videoIndex,
            title: title,
            comment: commentText
        })
        .end((err, res) => {
            if(err) {
                console.log('errror::: ',err)
                return;
            }
            // val 초기화 및 버튼 숨기기
            this.submit = true;
            $(".commentInput").val("");
            $(".btnWriteArea").css({"display": "none"});
            this.readComment();
        });
    }    

    readComment() {
        console.log('2 댓글 조회')
        // 댓글 조회
        request.get('/readComment')
        .query({
            videoIndex: this.props.videoIndex
        })
        .end((err, res) => {
            if(err) {
                console.log("err 발생",err)
                return;
            }
            this.reading = true;
            this.comment = res.body.comment
            this.commentCount = res.body.commentCount
            // 한번 더 조회
            this.setState({
                commentReady: true,
            })
            console.log('3 댓글 잘 들어감??', this.comment)
            if(this.submit === true) {
                // 댓글이 DB에 삽입되는 타이밍보다
                // DB 조회 타이밍이 빠르다 때문에
                // this.state.changed로 Rerendering을 하여 한번 더 조회해 
                // 전달해야 작성된 댓글까지 조회해오는 타이밍이 맞는다
                //this.changed = true
                this.setState({
                    changed: true
                })
                console.log('4 작성용 한번 더 조회')
            }
            // 여기에서 false를 줘야 영화별 댓글들이 갱신
            this.reading = false;
            this.submit = false;
            this.state.commentReady = false
            this.state.changed = false
        });
    }

    resizeCommentBox(e) {
        // 댓글 작성란 height 조절 
        var height = e.target.scrollHeight;
        $(e.target).css({"height": height + "px"});
    }

    moveLoginPage() {
        // onFocus로 진행 시 
        // alert or confirm 류가 수십 번 열리는 현상때문에 onClick으로 처리
        if(!sessionStorage.getItem('id')) {
            if(window.confirm('로그인이 필요합니다 로그인 페이지로 이동할까요?')) {
                window.location.href = '/login'
            } else {
                // login 페이지 이동 X
            }
        }
    }

    componentDidUpdate() {
        // this.reading의 용도 setState()로 인한 loop 방지용
        if(this.reading === false) {
            // 댓글 초기화 및 조회
            this.commentInit();
            this.readComment();
        }
    }

    render() {
        return (
            <div className="commentArea">
                <section className="commentWrite">
                    <div className="profile"></div>
                    <textarea 
                        onClick={this.moveLoginPage}
                        className="commentInput" 
                        placeholder="댓글 달기..."
                        onKeyDown={this.resizeCommentBox}
                        onKeyUp={this.resizeCommentBox}
                        onChange={this.validationComment}
                    >
                    </textarea>
                    <footer className="btnWriteArea">
                        <button type="submit" className="btnWriteComment" onClick={this.createComment}>댓글</button>
                        <button className="btnWriteCancel" onClick={this.cancelComment}>취소</button>
                    </footer>
                </section>
                    { this.state.commentReady === true ?
                        <CommentRead
                            commentCount = {this.commentCount}
                            comment = {this.comment}
                            videoIndex = {this.props.videoIndex}
                            changed = {this.state.changed}
                        /> : "" }
            </div>
        );
    }
}

export default CommentArea;
