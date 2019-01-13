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
      items: Array.from({ length: this.props.num })
    }
    this.tempAry = [];
    this.videoHovered = this.videoHovered.bind(this);
    this.fetchMoreData = this.fetchMoreData.bind(this);
    this.itemSet = this.itemSet.bind(this);
    this.aryInit = this.aryInit.bind(this);
  }

  aryInit() {
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
    //alert(this.state.items.length)
    if(this.state.items.length === 35) {
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

  videoHovered() {
    $(function(){
        if($(".infiniteVideo").hasClass("videoClickMode")) {
        } else {
    // video:eq(0)
    $(".videoHoverMode:eq(0)").hover(function(){
      for(var j=1;j<5;j++) {
          $(".videoHoverMode:eq("+j+")").css({
          "transform":"translate(80px, 0)", 
          "transition":"all 0.5s"})
      }
  }, function() {
      for(var i=1;i<5;i++) {
          $(".videoHoverMode:eq("+i+")").css({
              "transform": "none"
          });
      }
  });
    // video:eq(1)
        $(".videoHoverMode:eq(1)").hover(function(){
            $(".videoHoverMode:eq(0)").css({
                "transform":"translate(-80px, 0)",
                "transition":"all 0.5s"
            });
            for(var j=2;j<5;j++) {
                $(".videoHoverMode:eq("+j+")").css({
                "transform":"translate(80px, 0)", 
                "transition":"all 0.5s"})
            }
        }, function() {
            $(".videoHoverMode:eq(0)").css({
                "transform":"none",
                "transition":"all 0.5s"
            });
            for(var i=2;i<5;i++) {
                $(".videoHoverMode:eq("+i+")").css({
                    "transform": "none"
                });
            }
        });
    // video:eq(2)
        $(".videoHoverMode:eq(2)").hover(function(){
            for(var i=0;i<2;i++) {
                $(".videoHoverMode:eq("+i+")").css({
                    "transform":"translate(-80px, 0)",
                    "transition":"all 0.5s"
                });
            }
            for(var j=3;j<5;j++) {
                $(".videoHoverMode:eq("+j+")").css({
                "transform":"translate(80px, 0)", 
                "transition":"all 0.5s"})
            }
        }, function() {
            for(var i=0;i<2;i++) {
                $(".videoHoverMode:eq("+i+")").css({
                    "transform":"none",
                    "transition":"all 0.5s"
                });
            }
            for(var i=3;i<5;i++) {
                $(".videoHoverMode:eq("+i+")").css({
                    "transform": "none"
                });
            }
        });
    // video:eq(3)
        $(".videoHoverMode:eq(3)").hover(function(){
            for(var i=0;i<3;i++) {
                $(".videoHoverMode:eq("+i+")").css({
                    "transform":"translate(-80px, 0)",
                    "transition":"all 0.5s"
                });
            }
            $(".videoHoverMode:eq(4)").css({
                "transform":"translate(80px, 0)",
                "transition":"all 0.5s"
            });
        }, function() {
            for(var i=0;i<3;i++) {
                $(".videoHoverMode:eq("+i+")").css({
                    "transform":"none",
                    "transition":"all 0.5s"
                });
            }
            $(".videoHoverMode:eq(4)").css({
                "transform":"none",
                "transition":"all 0.5s"
            });
        });
    // video:eq(4)
        $(".videoHoverMode:eq(4)").hover(function(){
            for(var i=0;i<4;i++) {
                $(".videoHoverMode:eq("+i+")").css({
                    "transform":"translate(-80px, 0)",
                    "transition":"all 0.5s"
                });
            }
        }, function() {
            for(var i=0;i<4;i++) {
                $(".videoHoverMode:eq("+i+")").css({
                    "transform":"none",
                    "transition":"all 0.5s"
                });
            }
        });
    }
    });
 }
  render() {
    var newLocal = this;
        // videoHovered
        $(function() {
            $(".infiniteVideo").hover(function() {
                $(".video").removeClass("videoHoverMode");
                $(this).parent().find(".video").addClass("videoHoverMode");
                newLocal.videoHovered();
            });
        });
        // videoClickMode
        $(function() {
            $(".infiniteVideo").click(function(){
                if($(this).hasClass("videoClickMode")) {
                var idTemp = $(this).attr("id").valueOf();
                var indexTemp = idTemp.substring(idTemp.length-1, idTemp.length);
                newLocal.videoSelected(indexTemp);
                newLocal.viewMore(indexTemp);
                
            }
            });
        });
        //function end
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
                  <InfiniteVideo testIndex={index}/>
              ))}
            </InfiniteScroll>
        </div>
      </div>
    );
  }
}

export default infiniteScl;