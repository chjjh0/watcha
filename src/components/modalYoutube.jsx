import React, { Component } from 'react';
// components
import Youtube from './youtube.jsx';
// css
import '../css/modalYoutube.css';
// jQuery
import $ from 'jquery';
window.$ = $;


class ModalYoutube extends Component {
    constructor(props) {
        super(props);
     }

    render() {
        // closeModal
        $(function() {
            $("#btnCloseYoutube").click(function(){
                $(".modalYoutube").css({"display":"none"});
                $("iframe")[0].contentWindow.postMessage('{"event":"command","func":"' + 'stopVideo' + '","args":""}', '*');
                console.log('btncloseyoutebe');
            });
        });
        return (
        <div className="modalYoutube">
            <div className="modalYoutubeContent">
                <Youtube
                    video="Vq-0l2EU8IM" 
                    width="100%"
                    height="100%"
                    autoplay="0"
                    mute="0"  
                    rel="1" 
                    modest="0" />
            <i id="btnCloseYoutube" className="fas fa-times"></i>    
            {/* //modalContent */}
            </div>
        {/* //paymentModal */}
        </div> 
        );
    }
    }

export default ModalYoutube;
