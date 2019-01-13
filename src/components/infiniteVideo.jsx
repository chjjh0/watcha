import React, { Component } from 'react';
// components
// css
import '../css/infiniteVideo.css'
// jquery
import $ from 'jquery';
window.$ = $;


class Video extends Component {
    constructor(props) {
        super(props);
        this.videoDataAry = [];
        this.videoImgAry = [];
        this.defaultVideoSet = this.defaultVideoSet.bind(this);
        this.defaultVideoSet();
    }

    defaultVideoSet() {
        var newLocal = this;
        // videoImgAry
        this.videoImgAry.push("lostnight.jpg");
        this.videoImgAry.push('Carribian.jpg');
        this.videoImgAry.push('starwars_7.jpg');
        this.videoImgAry.push('starwars_7.jpg');
        this.videoImgAry.push('starwars_7.jpg');
        this.videoImgAry.push('starwars_7.jpg');
        this.videoImgAry.push('starwars_7.jpg');
        this.videoImgAry.push('starwars_7.jpg');
        this.videoImgAry.push('starwars_7.jpg');
        this.videoImgAry.push('starwars_7.jpg');
        this.videoImgAry.push('starwars_7.jpg');
        this.videoImgAry.push('starwars_7.jpg');
        this.videoImgAry.push('starwars_7.jpg');
        this.videoImgAry.push('starwars_7.jpg');
        this.videoImgAry.push('starwars_7.jpg');
        this.videoImgAry.push('starwars_7.jpg');
        this.videoImgAry.push('starwars_7.jpg');
        this.videoImgAry.push('starwars_7.jpg');
        this.videoImgAry.push('starwars_7.jpg');
        this.videoImgAry.push('starwars_7.jpg');
        this.videoImgAry.push('starwars_7.jpg');
        this.videoImgAry.push('starwars_7.jpg');
        this.videoImgAry.push('starwars_7.jpg');
        this.videoImgAry.push('starwars_7.jpg');
        this.videoImgAry.push('starwars_7.jpg');
        this.videoImgAry.push('starwars_7.jpg');
        // videoDataAry
        // 0-4
        this.videoDataAry.push({
            image: this.videoImgAry[0],
            title: '사라진 밤',
            releaseYear: '2018',
            ratingAge: '15세',
            runningTime: '1시간 41분',
            synopsis: '아내 설희를 살해하고 완전범죄를 계획한 진한. 그런데 몇 시간 후, 국과수 사체 보관실에서 설희의 시체가 흔적도 없이 사라지고 진한에게는 문자 한 통이 도착한다.',
        });
        this.videoDataAry.push({
            image: this.videoImgAry[1],
            title: '캐리비안의 해적',
            releaseYear: '2007',
            ratingAge: '12세',
            runningTime: '2시간 48분',
            synopsis: '플라잉 더치맨 호와 데비 존스를 이용하여 해적을 소탕하고 다니는 동인도 회사에 맞서, 윌 터너와 엘리자베스 스완, 바르보사 선장은 해적 연맹을 소집한다.',
        });
        this.videoDataAry.push({
            image: this.videoImgAry[2],
            title: '스타 워즈 에피소드 7',
            releaseYear: '2015',
            ratingAge: '12세',
            runningTime: '2시간 18분',
            synopsis: '다스 베이더가 사망한 지 약 30년 후, 마지막 제다이인 루크 스카이워커가 사라진다. 저항군의 파일럿 포는 루크가 있는 곳의 지도를 얻지만, 스톰트루퍼들에게 붙잡히고 만다.',
        });
        this.videoDataAry.push({
            image: this.videoImgAry[2],
            title: '스타 워즈 에피소드 7',
            releaseYear: '2015',
            ratingAge: '12세',
            runningTime: '2시간 18분',
            synopsis: '다스 베이더가 사망한 지 약 30년 후, 마지막 제다이인 루크 스카이워커가 사라진다. 저항군의 파일럿 포는 루크가 있는 곳의 지도를 얻지만, 스톰트루퍼들에게 붙잡히고 만다.',
        });
        this.videoDataAry.push({
            image: this.videoImgAry[2],
            title: '스타 워즈 에피소드 7',
            releaseYear: '2015',
            ratingAge: '12세',
            runningTime: '2시간 18분',
            synopsis: '다스 베이더가 사망한 지 약 30년 후, 마지막 제다이인 루크 스카이워커가 사라진다. 저항군의 파일럿 포는 루크가 있는 곳의 지도를 얻지만, 스톰트루퍼들에게 붙잡히고 만다.',
        });
        // 5-9
        this.videoDataAry.push({
            image: this.videoImgAry[2],
            title: '스타 워즈 에피소드 7',
            releaseYear: '2015',
            ratingAge: '12세',
            runningTime: '2시간 18분',
            synopsis: '다스 베이더가 사망한 지 약 30년 후, 마지막 제다이인 루크 스카이워커가 사라진다. 저항군의 파일럿 포는 루크가 있는 곳의 지도를 얻지만, 스톰트루퍼들에게 붙잡히고 만다.',
        });
        this.videoDataAry.push({
            image: this.videoImgAry[2],
            title: '스타 워즈 에피소드 7',
            releaseYear: '2015',
            ratingAge: '12세',
            runningTime: '2시간 18분',
            synopsis: '다스 베이더가 사망한 지 약 30년 후, 마지막 제다이인 루크 스카이워커가 사라진다. 저항군의 파일럿 포는 루크가 있는 곳의 지도를 얻지만, 스톰트루퍼들에게 붙잡히고 만다.',
        });
        this.videoDataAry.push({
            image: this.videoImgAry[2],
            title: '스타 워즈 에피소드 7',
            releaseYear: '2015',
            ratingAge: '12세',
            runningTime: '2시간 18분',
            synopsis: '다스 베이더가 사망한 지 약 30년 후, 마지막 제다이인 루크 스카이워커가 사라진다. 저항군의 파일럿 포는 루크가 있는 곳의 지도를 얻지만, 스톰트루퍼들에게 붙잡히고 만다.',
        });
        this.videoDataAry.push({
            image: this.videoImgAry[2],
            title: '스타 워즈 에피소드 7',
            releaseYear: '2015',
            ratingAge: '12세',
            runningTime: '2시간 18분',
            synopsis: '다스 베이더가 사망한 지 약 30년 후, 마지막 제다이인 루크 스카이워커가 사라진다. 저항군의 파일럿 포는 루크가 있는 곳의 지도를 얻지만, 스톰트루퍼들에게 붙잡히고 만다.',
        });
        this.videoDataAry.push({
            image: this.videoImgAry[2],
            title: '스타 워즈 에피소드 7',
            releaseYear: '2015',
            ratingAge: '12세',
            runningTime: '2시간 18분',
            synopsis: '다스 베이더가 사망한 지 약 30년 후, 마지막 제다이인 루크 스카이워커가 사라진다. 저항군의 파일럿 포는 루크가 있는 곳의 지도를 얻지만, 스톰트루퍼들에게 붙잡히고 만다.',
        });
        // 10-14
        this.videoDataAry.push({
            image: this.videoImgAry[2],
            title: '스타 워즈 에피소드 7',
            releaseYear: '2015',
            ratingAge: '12세',
            runningTime: '2시간 18분',
            synopsis: '다스 베이더가 사망한 지 약 30년 후, 마지막 제다이인 루크 스카이워커가 사라진다. 저항군의 파일럿 포는 루크가 있는 곳의 지도를 얻지만, 스톰트루퍼들에게 붙잡히고 만다.',
        });
        this.videoDataAry.push({
            image: this.videoImgAry[2],
            title: '스타 워즈 에피소드 7',
            releaseYear: '2015',
            ratingAge: '12세',
            runningTime: '2시간 18분',
            synopsis: '다스 베이더가 사망한 지 약 30년 후, 마지막 제다이인 루크 스카이워커가 사라진다. 저항군의 파일럿 포는 루크가 있는 곳의 지도를 얻지만, 스톰트루퍼들에게 붙잡히고 만다.',
        });
        this.videoDataAry.push({
            image: this.videoImgAry[2],
            title: '스타 워즈 에피소드 7',
            releaseYear: '2015',
            ratingAge: '12세',
            runningTime: '2시간 18분',
            synopsis: '다스 베이더가 사망한 지 약 30년 후, 마지막 제다이인 루크 스카이워커가 사라진다. 저항군의 파일럿 포는 루크가 있는 곳의 지도를 얻지만, 스톰트루퍼들에게 붙잡히고 만다.',
        });
        this.videoDataAry.push({
            image: this.videoImgAry[2],
            title: '스타 워즈 에피소드 7',
            releaseYear: '2015',
            ratingAge: '12세',
            runningTime: '2시간 18분',
            synopsis: '다스 베이더가 사망한 지 약 30년 후, 마지막 제다이인 루크 스카이워커가 사라진다. 저항군의 파일럿 포는 루크가 있는 곳의 지도를 얻지만, 스톰트루퍼들에게 붙잡히고 만다.',
        });
        this.videoDataAry.push({
            image: this.videoImgAry[2],
            title: '스타 워즈 에피소드 7',
            releaseYear: '2015',
            ratingAge: '12세',
            runningTime: '2시간 18분',
            synopsis: '다스 베이더가 사망한 지 약 30년 후, 마지막 제다이인 루크 스카이워커가 사라진다. 저항군의 파일럿 포는 루크가 있는 곳의 지도를 얻지만, 스톰트루퍼들에게 붙잡히고 만다.',
        });
        // 15-19
        this.videoDataAry.push({
            image: this.videoImgAry[2],
            title: '스타 워즈 에피소드 7',
            releaseYear: '2015',
            ratingAge: '12세',
            runningTime: '2시간 18분',
            synopsis: '다스 베이더가 사망한 지 약 30년 후, 마지막 제다이인 루크 스카이워커가 사라진다. 저항군의 파일럿 포는 루크가 있는 곳의 지도를 얻지만, 스톰트루퍼들에게 붙잡히고 만다.',
        });
        this.videoDataAry.push({
            image: this.videoImgAry[2],
            title: '스타 워즈 에피소드 7',
            releaseYear: '2015',
            ratingAge: '12세',
            runningTime: '2시간 18분',
            synopsis: '다스 베이더가 사망한 지 약 30년 후, 마지막 제다이인 루크 스카이워커가 사라진다. 저항군의 파일럿 포는 루크가 있는 곳의 지도를 얻지만, 스톰트루퍼들에게 붙잡히고 만다.',
        });
        this.videoDataAry.push({
            image: this.videoImgAry[2],
            title: '스타 워즈 에피소드 7',
            releaseYear: '2015',
            ratingAge: '12세',
            runningTime: '2시간 18분',
            synopsis: '다스 베이더가 사망한 지 약 30년 후, 마지막 제다이인 루크 스카이워커가 사라진다. 저항군의 파일럿 포는 루크가 있는 곳의 지도를 얻지만, 스톰트루퍼들에게 붙잡히고 만다.',
        });
        this.videoDataAry.push({
            image: this.videoImgAry[2],
            title: '스타 워즈 에피소드 7',
            releaseYear: '2015',
            ratingAge: '12세',
            runningTime: '2시간 18분',
            synopsis: '다스 베이더가 사망한 지 약 30년 후, 마지막 제다이인 루크 스카이워커가 사라진다. 저항군의 파일럿 포는 루크가 있는 곳의 지도를 얻지만, 스톰트루퍼들에게 붙잡히고 만다.',
        });
        this.videoDataAry.push({
            image: this.videoImgAry[2],
            title: '스타 워즈 에피소드 7',
            releaseYear: '2015',
            ratingAge: '12세',
            runningTime: '2시간 18분',
            synopsis: '다스 베이더가 사망한 지 약 30년 후, 마지막 제다이인 루크 스카이워커가 사라진다. 저항군의 파일럿 포는 루크가 있는 곳의 지도를 얻지만, 스톰트루퍼들에게 붙잡히고 만다.',
        });
        // 20-24
        this.videoDataAry.push({
            image: this.videoImgAry[2],
            title: '스타 워즈 에피소드 7',
            releaseYear: '2015',
            ratingAge: '12세',
            runningTime: '2시간 18분',
            synopsis: '다스 베이더가 사망한 지 약 30년 후, 마지막 제다이인 루크 스카이워커가 사라진다. 저항군의 파일럿 포는 루크가 있는 곳의 지도를 얻지만, 스톰트루퍼들에게 붙잡히고 만다.',
        });
        this.videoDataAry.push({
            image: this.videoImgAry[2],
            title: '스타 워즈 에피소드 7',
            releaseYear: '2015',
            ratingAge: '12세',
            runningTime: '2시간 18분',
            synopsis: '다스 베이더가 사망한 지 약 30년 후, 마지막 제다이인 루크 스카이워커가 사라진다. 저항군의 파일럿 포는 루크가 있는 곳의 지도를 얻지만, 스톰트루퍼들에게 붙잡히고 만다.',
        });
        this.videoDataAry.push({
            image: this.videoImgAry[2],
            title: '스타 워즈 에피소드 7',
            releaseYear: '2015',
            ratingAge: '12세',
            runningTime: '2시간 18분',
            synopsis: '다스 베이더가 사망한 지 약 30년 후, 마지막 제다이인 루크 스카이워커가 사라진다. 저항군의 파일럿 포는 루크가 있는 곳의 지도를 얻지만, 스톰트루퍼들에게 붙잡히고 만다.',
        });
        this.videoDataAry.push({
            image: this.videoImgAry[2],
            title: '스타 워즈 에피소드 7',
            releaseYear: '2015',
            ratingAge: '12세',
            runningTime: '2시간 18분',
            synopsis: '다스 베이더가 사망한 지 약 30년 후, 마지막 제다이인 루크 스카이워커가 사라진다. 저항군의 파일럿 포는 루크가 있는 곳의 지도를 얻지만, 스톰트루퍼들에게 붙잡히고 만다.',
        });
        this.videoDataAry.push({
            image: this.videoImgAry[2],
            title: '스타 워즈 에피소드 7',
            releaseYear: '2015',
            ratingAge: '12세',
            runningTime: '2시간 18분',
            synopsis: '다스 베이더가 사망한 지 약 30년 후, 마지막 제다이인 루크 스카이워커가 사라진다. 저항군의 파일럿 포는 루크가 있는 곳의 지도를 얻지만, 스톰트루퍼들에게 붙잡히고 만다.',
        });
        // 25-29
        this.videoDataAry.push({
            image: this.videoImgAry[2],
            title: '스타 워즈 에피소드 7',
            releaseYear: '2015',
            ratingAge: '12세',
            runningTime: '2시간 18분',
            synopsis: '다스 베이더가 사망한 지 약 30년 후, 마지막 제다이인 루크 스카이워커가 사라진다. 저항군의 파일럿 포는 루크가 있는 곳의 지도를 얻지만, 스톰트루퍼들에게 붙잡히고 만다.',
        });
        this.videoDataAry.push({
            image: this.videoImgAry[2],
            title: '스타 워즈 에피소드 7',
            releaseYear: '2015',
            ratingAge: '12세',
            runningTime: '2시간 18분',
            synopsis: '다스 베이더가 사망한 지 약 30년 후, 마지막 제다이인 루크 스카이워커가 사라진다. 저항군의 파일럿 포는 루크가 있는 곳의 지도를 얻지만, 스톰트루퍼들에게 붙잡히고 만다.',
        });
        this.videoDataAry.push({
            image: this.videoImgAry[2],
            title: '스타 워즈 에피소드 7',
            releaseYear: '2015',
            ratingAge: '12세',
            runningTime: '2시간 18분',
            synopsis: '다스 베이더가 사망한 지 약 30년 후, 마지막 제다이인 루크 스카이워커가 사라진다. 저항군의 파일럿 포는 루크가 있는 곳의 지도를 얻지만, 스톰트루퍼들에게 붙잡히고 만다.',
        });
        this.videoDataAry.push({
            image: this.videoImgAry[2],
            title: '스타 워즈 에피소드 7',
            releaseYear: '2015',
            ratingAge: '12세',
            runningTime: '2시간 18분',
            synopsis: '다스 베이더가 사망한 지 약 30년 후, 마지막 제다이인 루크 스카이워커가 사라진다. 저항군의 파일럿 포는 루크가 있는 곳의 지도를 얻지만, 스톰트루퍼들에게 붙잡히고 만다.',
        });
        this.videoDataAry.push({
            image: this.videoImgAry[2],
            title: '스타 워즈 에피소드 7',
            releaseYear: '2015',
            ratingAge: '12세',
            runningTime: '2시간 18분',
            synopsis: '다스 베이더가 사망한 지 약 30년 후, 마지막 제다이인 루크 스카이워커가 사라진다. 저항군의 파일럿 포는 루크가 있는 곳의 지도를 얻지만, 스톰트루퍼들에게 붙잡히고 만다.',
        });
        // 30-34
        this.videoDataAry.push({
            image: this.videoImgAry[2],
            title: '스타 워즈 에피소드 7',
            releaseYear: '2015',
            ratingAge: '12세',
            runningTime: '2시간 18분',
            synopsis: '다스 베이더가 사망한 지 약 30년 후, 마지막 제다이인 루크 스카이워커가 사라진다. 저항군의 파일럿 포는 루크가 있는 곳의 지도를 얻지만, 스톰트루퍼들에게 붙잡히고 만다.',
        });
        this.videoDataAry.push({
            image: this.videoImgAry[2],
            title: '스타 워즈 에피소드 7',
            releaseYear: '2015',
            ratingAge: '12세',
            runningTime: '2시간 18분',
            synopsis: '다스 베이더가 사망한 지 약 30년 후, 마지막 제다이인 루크 스카이워커가 사라진다. 저항군의 파일럿 포는 루크가 있는 곳의 지도를 얻지만, 스톰트루퍼들에게 붙잡히고 만다.',
        });
        this.videoDataAry.push({
            image: this.videoImgAry[2],
            title: '스타 워즈 에피소드 7',
            releaseYear: '2015',
            ratingAge: '12세',
            runningTime: '2시간 18분',
            synopsis: '다스 베이더가 사망한 지 약 30년 후, 마지막 제다이인 루크 스카이워커가 사라진다. 저항군의 파일럿 포는 루크가 있는 곳의 지도를 얻지만, 스톰트루퍼들에게 붙잡히고 만다.',
        });
        this.videoDataAry.push({
            image: this.videoImgAry[2],
            title: '스타 워즈 에피소드 7',
            releaseYear: '2015',
            ratingAge: '12세',
            runningTime: '2시간 18분',
            synopsis: '다스 베이더가 사망한 지 약 30년 후, 마지막 제다이인 루크 스카이워커가 사라진다. 저항군의 파일럿 포는 루크가 있는 곳의 지도를 얻지만, 스톰트루퍼들에게 붙잡히고 만다.',
        });
        this.videoDataAry.push({
            image: this.videoImgAry[2],
            title: '스타 워즈 에피소드 7',
            releaseYear: '2015',
            ratingAge: '12세',
            runningTime: '2시간 18분',
            synopsis: '다스 베이더가 사망한 지 약 30년 후, 마지막 제다이인 루크 스카이워커가 사라진다. 저항군의 파일럿 포는 루크가 있는 곳의 지도를 얻지만, 스톰트루퍼들에게 붙잡히고 만다.',
        });

        $(function() {
            // var imgTemp = this.videoDataAry[0].image
            //alert(newLocal.videoDataAry[newLocal.props.testIndex].image);
            //alert("#videoIndex"+newLocal.props.testIndex)
            $("#infiniteVideoIndex"+newLocal.props.testIndex).css({
                "background":
                "url('/img/"+newLocal.videoDataAry[newLocal.props.testIndex].image+"') no-repeat center/cover"});
        });
    }

    

    render() {
        
        return (
            <div className="infiniteVideoArea">
            {/* categoryTitle */}
            <div className="infiniteVideoList">
                    <div id="infiniteVideoIndex0" className="infiniteVideo videoHoverMode">
                        <h2>Title</h2>
                        <div className="videoDesc">
                            <h2>DescTitle</h2>
                            <p><span></span></p>
                            <p>줄거리</p>
                            <div className="viewMore" onClick={() => this.viewMore(0)}>
                                <i className="fas fa-chevron-right"></i>
                            </div>
                        {/* videoDesc */}
                        </div>
                    {/* //video */}
                    </div>
                    <div id="infiniteVideoIndex1" className="infiniteVideo videoHoverMode">
                        <h2>Title</h2>
                        <div className="videoDesc">
                            <div className="preview"></div>
                            <h2>DescTitle</h2>
                            <p>2018 <span>15세</span> 1시간 41분</p>
                            <p>줄거리</p>
                            <div className="viewMore" onClick={() => this.viewMore(1)}>
                                <i className="fas fa-chevron-right"></i>
                            </div>
                        {/* videoDesc */}
                        </div>
                    {/* //video */}
                    </div>
                    <div id="infiniteVideoIndex2" className="infiniteVideo videoHoverMode">
                        <h2>Title</h2>
                        <div className="videoDesc">
                            <div className="preview"></div>
                            <h2>DescTitle</h2>
                            <p>2018 <span>15세</span> 1시간 41분</p>
                            <p>줄거리</p>
                            <div className="viewMore" onClick={() => this.viewMore(2)}>
                                <i className="fas fa-chevron-right"></i>
                            </div>
                        {/* videoDesc */}
                        </div>
                    {/* //video */}
                    </div>
                    <div id="infiniteVideoIndex3" className="infiniteVideo videoHoverMode">
                        <h2>Title</h2>
                        <div className="videoDesc">
                            <div className="preview"></div>
                            <h2>DescTitle</h2>
                            <p>2018 <span>15세</span> 1시간 41분</p>
                            <p>줄거리</p>
                            <div className="viewMore" onClick={() => this.viewMore(3)}>
                                <i className="fas fa-chevron-right"></i>
                            </div>
                        {/* videoDesc */}
                        </div>
                    {/* //video */}
                    </div>
                    <div id="infiniteVideoIndex4" className="infiniteVideo videoHoverMode">
                        <h2>Title</h2>
                        <div className="videoDesc">
                            <div className="preview"></div>
                            <h2>DescTitle</h2>
                            <p>2018 <span>15세</span> 1시간 41분</p>
                            <p>줄거리</p>
                            <div className="viewMore" onClick={() => this.viewMore(4)}>
                                <i className="fas fa-chevron-right"></i>
                            </div>
                        {/* videoDesc */}
                        </div>
                    {/* //video */}
                    </div>
            {/* //videoList */}
            </div>
            <div className="videoDetail-container">
                    <div className="videoDetail-bgGradient"></div>
                    <div className="videoDetail-contentInfo">
                        <h2></h2>
                        <p>
                            <span className="videoDetail-ratingLabel">예상 별점</span>
                            <span className="videoDetail-ratingValue">2.5</span>
                            <span className="videoDetail-rating">1</span>
                        </p>
                        <p className="videoDetail-synopsis">
                        </p>
                    {/* //contentInfo */}
                    </div> 
                         <i id="videoDetail-btnClose" onClick={this.closeVideoDetail} className="fas fa-times videoDetail-btnClose"></i>
                    {/* //videoDetail */}
                    </div>
            </div> 
        );
    }
}

export default Video;
