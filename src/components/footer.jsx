import React, { Component } from 'react';
// css
import '../css/footer.css';

class Footer extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return(
            <footer className="footer">
                <div className="footerArea">
                    <p className="footerLinkArea">
                        <span>왓챠 서비스 이용약관</span>
                        <span>개인 정보 취급방침</span>
                        <span>왓챠플레이 서비스 이용약관</span>
                        <span>고객센터</span>
                        <span>채용정보</span>
                    </p>
                    <div className="footerContactArea">
                        <p>
                            <span>고객센터(이용 및 결제 문의)</span>
                            <span>cs@watchaplay.net / 02-515-9985 (유료)</span>
                        </p>
                        <p>
                            <span>제휴 및 대외 협력</span>
                            <span>contact@watcha.com / 070-7554-9696 (유료)</span>
                        </p>
                    </div>
                    <div className="snsIcon">
                        <i class="fab fa-facebook-f"></i>
                        <i class="fab fa-twitter"></i>
                        <i class="fab fa-instagram"></i>
                    </div>
                </div>
            </footer>
        );
    }
}

export default Footer;