import React, { Component } from 'react';
// css
import '../css/login.css';
import Logo from '../img/logo.png';
// components
// jQuery
import $ from 'jquery';
window.$ = $;


class Login extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
    <section className="login">
        <div className="overlay-login"></div>
        <div className="login-container">
            <h1>
              <img src={Logo} alt="logoImage"></img>
            </h1>
            <div className="signin">로그인</div>
            <hr/>
            <div className="signup">이메일로 가입</div>
        {/* //login-container */}
        </div>
    </section>
    );
  }
}

export default Login;
