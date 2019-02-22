import React, { Component } from 'react';
// css
import '../css/infiniteVideoList.css';

class InfiniteVideoList extends Component {
    constructor(props) {
        super(props);
        this.backgroundImg = this.backgroundImg.bind(this)
    }

    backgroundImg() {
        $("#infiniteIndex" + this.props.videoIndex).css({"background": "red" })

        $("#infiniteIndex" + this.props.videoIndex).css({
            "background": "url('/img/" + this.props.image + "') #888 no-repeat center/cover"
        })
    }

    componentDidMount() {
        this.backgroundImg()
    }

    componentWillUpdate() {
        this.backgroundImg()
    }

    render() {
        return(
            <div 
                className="infiniteVideo" 
                data-videoIndex={this.props.videoIndex} 
                name={this.props.youtubeId}>
                <div id={"infiniteIndex" + this.props.videoIndex} className="infiniteVideoImgArea">
                        <i className="fab fa-youtube"></i>
                        <input className="DBvideoIndex" 
                            type="hidden" 
                            value={this.props.DBvideoIndex}></input>
                </div>
                <h2 className="infiniteVideoTitle">{this.props.title}</h2>
            </div>
        );
    }
}

export default InfiniteVideoList;