import React, { Component } from 'react';
import request from 'superagent';

// css
import '../css/footer.css';

class CommentUpdateSubmit extends Component {
    constructor(props) {
        super(props);
        this.btnUpdateSubmit = this.btnUpdateSubmit.bind(this)
    }

    // 수정 완료 버튼
    btnUpdateSubmit(e) {
        console.log('수정 완료했는가???')
        console.log($(".updateInput").val())
        console.log($(e.target).attr("name"))
        console.log($(e.target).attr("data-userId"))
        console.log(this.props.commentContent[0])
        var writer = $(e.target).attr("data-userId")
        var commentIndex = $(e.target).attr("name")
        var commentText = $(".updateInput").val()
        var commentContent = this.props.commentContent[0]
        request.post('/updateComment')
        .send({
            writer: writer,
            commentIndex: commentIndex,
            comment: commentText
        })
        .end((err, res) => {
            if(err) {
                console.log('errror::: ',err)
                return;
            }
            if (res.body.message) {
                $(".updateInput").remove()
                $(".btnUpdateSubmit").remove()
                // 수정 중 2/20
                // 수정 완료버튼을 누르면 개발자도구에서는 보이는 것처럼 보이나
                // 누른 직후에는 

                console.log('댓글 내용 뭐야???::',commentContent)
                $(commentContent).find(".commentContent").html(commentText)
            }

        });        
    }

    componentWillUpdate() {
        console.log('submit 왔나요??')
        console.log(this.props.userId)
        console.log(this.props.comment)
        console.log(this.props.commentIndex)
        console.log(this.props.commentContent)
    }

    render() {
        return(
            <div className="commentContent">
                <textarea class="updateInput" placeholder="댓글 달기..." >
                    {this.props.comment}
                </textarea>
                <a class="btnUpdateSubmit" 
                    onClick={this.btnUpdateSubmit} 
                    data-userId={this.props.userId}
                    name={this.props.commentIndex} 
                    href="#" 
                    alt="수정 적용">확인
                </a>
            </div>
        );
    }
}

export default CommentUpdateSubmit;