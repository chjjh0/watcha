import React, { Component } from 'react';
// css
import '../css/login.css';
// img
import Logo from '../img/logo.png';
import LegoBack from '../img/login.jpg'
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
        <div className="backgroundImg">
          <img src={LegoBack} alt=""/>
        </div>
        <div className="login-container">
            <h1>
              <img src={Logo} alt="logoImage"></img>
            </h1>
            <input type="text" placeholder="e-mail" className="inputTest"/>
            <input type="password" placeholder="Password" className="inputTest"/>
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
