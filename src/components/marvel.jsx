import React, { Component } from 'react';
// components
import Youtube from './youtube.jsx';
// css
import '../css/marvel.css';
// jQuery
import $ from 'jquery';
window.$ = $;


class MarvelArea extends Component {
    constructor(props) {
        super(props);
        this.state = {
            marvelvideoId: 'hA6hldpSTF8'
          }
          this.marvelAry = [
            //  avengers
            {
                image:'avengers_1',
                youtubeId: 'eOrNdBpGMv8'
            },
            {
                image:'avengers_2',
                youtubeId: 'FiTHHZ8A3SU'
            },
            {
                image:'avengers_3',
                youtubeId: '6ZfuNTqbHE8'
            },
            //  ironman
            {
                image:'ironman_1',
                youtubeId: '8hYlB38asDY'
            },
            {
                image:'ironman_2',
                youtubeId: 'WmwNvc-0tH0'
            },
            {
                image:'ironman_3',
                youtubeId: 'f_h95mEd4TI'
            },
            //  captian america
            {
                image:'captainAmerica_1',
                youtubeId: '8Pcj-Ww5fG4'
            },
            {
                image:'captainAmerica_2',
                youtubeId: '7SlILk2WMTI'
            },
            {
                image:'captainAmerica_3',
                youtubeId: 'dKrVegVI0Us'
            },
            //  thor
            {
                image:'thor_1',
                youtubeId: 'JOddp-nlNvQ'
            },
            {
                image:'thor_2',
                youtubeId: 'npvJ9FTgZbM'
            },
            {
                image:'thor_3',
                youtubeId: 'ue80QwXMRHg'
            },
          ]
          
          this.btnMarvelPreview = this.btnMarvelPreview.bind(this);
          this.btnMarvelMenu = this.btnMarvelMenu.bind(this);
     }
    // marvel
    btnMarvelPreview(vId) {
         this.setState({
             marvelvideoId: vId
         });
    }

    btnMarvelMenu(marvelTitle) {
        var marvelTemp = this.marvelAry;
        var youtubeTemp = [];
        var imgTemp = [];
        var count = 0;
        for(var i=0;i<marvelTemp.length;i++) {
             if(marvelTemp[i].image.includes(marvelTitle)) {
                count++;
                youtubeTemp.push(marvelTemp[i].youtubeId);
                imgTemp.push(marvelTemp[i].image);
             }
        }
        
        var marvelVideoArea = $(".marvelVideoArea");
        $(function() {
            $(".marvelPreview").remove();
            for(var j=0;j<count;j++) {
                marvelVideoArea.append("<div></div>");
                $(".marvelVideoArea div").addClass("marvelPreview");
                $(".marvelPreview:eq("+j+")").append("<i class='far fa-play-circle'></i>");
                $(".marvelPreview:eq("+j+")").attr("id","marvelPreview"+j);
                $(".marvelPreview:eq("+j+")").attr("name", youtubeTemp[j]);
                $(".marvelPreview:eq("+j+")").css({"background":"url('../imgp/marvel/"+imgTemp[j]+".jpg') no-repeat center/cover"});
                $(".marvelPreview").css({"display":"block"});
            }
            // $(".marvelPreview").fadeIn();
            
            $(".menuImg").css({
            "display":"none",
            "background":"url('../imgp/marvel/"+imgTemp[0]+".png') no-repeat center/cover"
            });
            $(".menuImg").fadeIn("slow");
            $(".marvelMenu").css({"background":"#001118"});
        });
    }
    

    render() {
            var newLocal = this;
            $(function(){
                $(document).on("click", ".marvelPreview", function(){
                    var youtubeId = $(this).attr("name").valueOf();
                    $(".marvelPreview").css({
                        "border":"4px solid transparent",
                        "transition":"all 0.5s"
                    });
                    $(this).css({
                        "border":"4px solid white",
                        "transition":"all 0.5s"
                    });
                    newLocal.btnMarvelPreview(youtubeId);
                });
            });
        return (
        <div className="marvelArea">
            <div className="marvelImg"></div>
            <div className="youtubeOverlay"></div>
            <div className="youtubeArea">
                <Youtube video={this.state.marvelvideoId} autoplay="1" rel="1" modest="1" />
            </div>
            <div className="marvelVideoArea">
            {/*
                Dynamic Create Elements
                ex) <div id="marvelPreview[index]" className="marvelPreview" name="youtubeId">
                        <i class='far fa-play-circle'></i>
                    </div>
            */}
            {/* //marvelVideArea */}
            </div>
            <div className="marvelMenubar">
                {/* menuLeft */}
                <div className="menuLeft">
                    <div className="marvelMenu avengers" onClick={() => this.btnMarvelMenu('avengers')}>avengers</div>
                    <div className="marvelMenu ironman" onClick={() => this.btnMarvelMenu('ironman')}>iron man</div>
                    <div className="marvelMenu captian" onClick={() => this.btnMarvelMenu('captainAmerica')}>captain america</div>
                    <div className="marvelMenu thor" onClick={() => this.btnMarvelMenu('thor')}>thor</div>
                </div>
                {/* menuImg */}
                <div className="menuImg"></div>
                {/* menuRight */}
                <div className="menuRight">
                <div className="marvelMenu">guardians</div>
                <div className="marvelMenu">ant man</div>
                <div className="marvelMenu">doctor strange</div>
                <div className="marvelMenu">black panther</div>
                </div>
            {/* //marvelMenubar */}
            </div>
        {/* //marvelArea */}
        </div>
        );
    }
}

export default MarvelArea;
