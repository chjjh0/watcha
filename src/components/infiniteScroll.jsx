import React, { Component } from "react";
// components
import InfiniteScroll from "react-infinite-scroll-component";
import InfiniteVideo from './infiniteVideo.jsx';
import Progress from './progress.jsx';
// css
import '../css/infiniteScroll.css';
// jquery
import $ from 'jquery';
window.$ = $;
class infiniteScl extends Component {
    constructor(props) {
        super(props);
        this.state = {
            totalLength: 5 ,
            descIndex: 0,
            descMax: 5,
            items: Array.from({ length: this.props.num })
        }
        this.descAry = [];
        this.fetchMoreData = this.fetchMoreData.bind(this);
        this.itemSet = this.itemSet.bind(this);
        this.aryInit = this.aryInit.bind(this);
        this.aryInit();
    }
    aryInit() {
        console.log('====aryInit')
    }
    itemSet(num) {
        if(num >= 0) {
        return num;
        }
        return 1;
    }
    fetchMoreData() {
        // a fake async api call like which sends
        // 20 more records in 1.5 secs
        alert(this.state.items.length)
        if(this.state.items.length >= this.props.num) {
            alert('더 이상 자료가 없습니다')
        $(function() {
            $(".progress").css({"display":"none"})
        })
        } else {
        setTimeout(() => {
        
        this.setState({
            items: this.state.items.concat(Array.from({ length: this.state.totalLength }))
        });
        }, 1500)
    }
    };

  
    render() {
        console.log('=======infiniteScroll')
        console.log('전달확인 1: '+this.props.videoDesc)
        console.log('전달확인 1: '+this.props.num)
        return (
        <div className="categoryArea">
            <div className="categoryList">
                <InfiniteScroll
                    dataLength={this.state.items.length}
                    next={this.fetchMoreData}
                    hasMore={true}
                    scrollableTarget="scrollableDiv"
                    loader={<div className="progress"><Progress /></div>}
                >
                {this.state.items.map((i, index) => (
                    <InfiniteVideo 
                        videoDesc={this.props.videoDesc} 
                        index={index}
                    />
                ))}
                </InfiniteScroll>
            </div>
        </div>
        );
    }
}

export default infiniteScl;