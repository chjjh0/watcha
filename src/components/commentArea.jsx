import React, { Component } from 'react';
import request from 'superagent';
// components
import CommentRead from './commentRead.jsx';
// css
import '../css/comment.css';
// jQuery
import $ from 'jquery';
window.$ = $;

class CommentArea extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            changed: false
        }
        this.totalComment = [];
        this.commentCount = 0;
        this.resizeTextArea = this.resizeTextArea.bind(this);
        this.commentInit = this.commentInit.bind(this);
        this.validationComment = this.validationComment.bind(this);
        this.submitComment = this.submitComment.bind(this);
        this.cancelComment = this.cancelComment.bind(this);
        this.readComment = this.readComment.bind(this);
    }

    commentInit() {
        // 댓글내용 초기화
        $(".commentInput").val("")
    }

    resizeTextArea() {
        console.log($(".commentInput").scrollTop());
        $(".commentInput").css({
            "height": 40+$(".commentInput").scrollTop()+"px"
        });
        //obj.style.height = "1px";
        //obj.style.height = (12+obj.scrollHeight)+"px";
        
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
            console.log('comment 유효성 체크 완료')
        }
    }

    submitComment() {
        var id = 'testId'
        var commentText = $(".commentInput").val()
        console.log('댓글 서버 전송 전::: ',commentText);
        request.post('/comment/write')
        .send({
            id: id,
            comment: commentText
        })
        .end((err, res) => {
            if(err) {
                console.log('errror::: ',err)
                return;
            }
            alert(res.body.message)
            // val 초기화 및 버튼 숨기기
            $(".commentInput").val("");
            $(".btnWriteArea").css({"display": "none"});
            
            console.log('바로 호출하냐???')
            this.readComment();
        });
    }

    cancelComment() {
        // 댓글 작성 취소
        $(".commentInput").val("");
        $(".btnWriteArea").css({"display": "none"});
    }

    readComment() {
        // 댓글 조회
        request.get('/comment/read')
        .end((err, res) => {
            if(err) {
                console.log("err 발생",err)
                return;
            }
            console.log('댓글수::: ',res.body.commentCount)
            this.totalComment = res.body.totalComment;
            this.commentCount = res.body.commentCount;
            // 댓글 새로 조회해오기
            this.setState({
                changed: true
            });
        });
    }

    componentDidMount() {
        this.readComment();
    }

    render() {
        // modal이 실행 될 때마다 호출
        // this.setState() 사용 시 자동 재 렌더링으로 인해 
        // 변화가 생길 때마다 render 영역에 있는 것들이 
        // 계속 호출되어 setState() 사용은 하지 않음
        console.log('1 호출됨')
        this.commentInit();
        return (
            <div className="commentArea">
                <section className="commentWrite">
                    <div className="profile"></div>
                    <textarea 
                        className="commentInput" 
                        name="test" 
                        placeholder="댓글 달기..."
                        onKeyDown={this.resizeTextarea}
                        onKeyUp={this.resizeTextarea}
                        onChange={this.validationComment}
                    >
                    </textarea>
                    <footer className="btnWriteArea">
                        <button type="submit" className="btnWriteComment" onClick={this.submitComment}>댓글</button>
                        <button className="btnWriteCancel" onClick={this.cancelComment}>취소</button>
                    </footer>
                </section>
                { 
                    // 댓글이 0개면 아무것도 보이지 않기
                    this.commentCount === 0 ? "" :
                    <CommentRead 
                        commentCount={this.commentCount} 
                        comment={this.totalComment}
                        changeComment={this.state.changed}
                    />
                }
            {/* /commentArea */}
            </div>
        );
    }
}

export default CommentArea;
