import React, { Component } from 'react';
import request from 'superagent';

// components
import CommentUpdateSubmit from './commentUpdateSubmit.jsx';

// css
import $ from 'jquery';
window.$ = $;

class commentDyn extends Component {
    constructor(props) {
        super(props);
        this.state = {
            updating: false,
            updateToggle: false,
            userId: '',
            comment: '',
            commentIndex: '',
            commentContent: ''
        }
        this.btnOption = this.btnOption.bind(this)
        this.btnUpdate = this.btnUpdate.bind(this)
        this.btnDelete = this.btnDelete.bind(this)
        this.btnCancel = this.btnCancel.bind(this)
    }

    btnOption(e) {
        var writerNow = $(e.target).parent().parent().find(".commentWriter").html();
        console.log(e)
        console.log(e.target)
        console.log(writerNow)
        if(!sessionStorage.getItem('id')) {
            // 로그인 전이라면 로그인 페이지로 안내
            if(window.confirm('로그인이 필요합니다 로그인 페이지로 이동할까요?')) {
                window.location.href = '/login'
            } else {
                // login 페이지 이동 X    
            }
        } else {
            // 로그인 중이라면 작성자와 로그인한 id가 같은지 확인                
            if(writerNow === sessionStorage.getItem('id')) {
                // 로그인 중이라면 수정/삭제 버튼 toggle
                // toggle
                if($(e.target).parent().next().hasClass("on")) {
                    $(e.target).parent().next().removeClass("on")
                } else {
                    $(e.target).parent().next().addClass("on")
                }
            } else {
                // issue: category 변경 시 복수 활성화 수정 중
                //alert('수정 권한이 없습니다')
            }
        }
    }
    // 수정 버튼
    btnUpdate(e) {
            this.state.updateToggle = false
            // e.target = btnUpdate
            // 수정 버튼을 누르면 수행 중에는 다시 진입이 불가하게 display: none 처리
            $(e.target).css({"display": "none"})
            var userId = $(e.target).parent().parent().find(".commentWriter").html() 
            var comment = $(e.target).parent().parent().next().html()
            var commentIndex = e.target.name
            var commentContent = $(e.target).parent().parent().parent()
            this.setState({
                updateToggle: true,
                userId: userId,
                comment: comment,
                commentIndex: commentIndex,
                commentContent: commentContent
            })
    }

    btnDelete(e) {
        var commentBoxNow = $(e.target).parent().parent().parent()
        var writer = $(e.target).parent().parent().find(".commentWriter").html() 
        var commentIndex = e.target.name
        request.post('/deleteComment')
        .send({
            commentIndex: commentIndex,
            writer: writer
        })
        .end((err, res) => {
            if (err) {
                console.log('err::: ', err)
            }
            if (res.body.message) {
                console.log(res.body.message)
                $(commentBoxNow).remove()
            }
        })
        
    }
    

    btnCancel(e) {
        console.log('취소 누름요')
        $(e.target).parent().find(".btnUpdate").css({"display": "inline"})
        if($(e.target).parent().hasClass("on")) {
            $(e.target).parent().removeClass("on")
        }
        // 수정 중 2/20
        // 수정완료한 상태에서 취소 버튼을 누른다면 commentArea컴포넌트에서 조회후 받아오지 않아 수정 전 내용이 보임
        // 리덕스를 모르는 상태에서는 여기서 조회를 한 번 더 해주고 false로 바꿔야 제대로 될 듯
        this.setState({
            updateToggle: false
        })
    }

    render() {
        return(
            <section id={"commentIndex" + this.props.commentIndex} className="commentBox">
                <div className="profile"></div>
                <p> 
                    <span className="commentWriter">{this.props.writer}</span>
                    <span className="commentDate">{this.props.writeDate}</span>
                    <span className="btnOption"><i className="fas fa-ellipsis-v" onClick={this.btnOption}></i></span>
                    <span className="optionBox">
                        <a className="btnUpdate" onClick={this.btnUpdate} href="#" alt="수정" name={this.props.commentIndex}>수정</a>
                        <a className="btnDelete" onClick={this.btnDelete} href="#" alt="삭제" name={this.props.commentIndex}>삭제</a> 
                        <a className="btnCancel" onClick={this.btnCancel} href="#" alt="취소" name={this.props.commentIndex}>취소</a> 
                    </span>
                </p>
                {this.state.updateToggle === false ? <div className="commentContent">{this.props.comment}</div> 
                : 
                <CommentUpdateSubmit 
                        userId = {this.state.userId} 
                        comment = {this.state.comment} 
                        commentIndex = {this.state.commentIndex} 
                        commentContent = {this.state.commentContent}
                />}
            </section>
        );
    }
}

export default commentDyn;