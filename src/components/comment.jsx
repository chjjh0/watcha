import React, { Component } from 'react';
import request from 'superagent';
// components
// css
import '../css/comment.css';
// jQuery
import $ from 'jquery';
window.$ = $;

class Comment extends Component {
    
    constructor(props) {
        super(props);
        this.resize = this.resize.bind(this);
    }

    resize() {
        console.log($(".commentInput").scrollTop());
        $(".commentInput").css({
            "height": 12+$(".commentInput").scrollTop()+"px"
        });
        //obj.style.height = "1px";
        //obj.style.height = (12+obj.scrollHeight)+"px";
        
    }
    render() {
        return (
            <div className="commentArea">
                <textarea 
                    className="commentInput" 
                    name="test" 
                    placeholder="댓글 달기..."
                    onKeyDown={this.resize}
                    onKeyUp={this.resize}
                >
                </textarea>
            {/* /commentArea */}
            </div>
        );
    }
}

export default Comment;
