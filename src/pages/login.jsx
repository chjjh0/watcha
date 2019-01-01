import React, { Component } from 'react';
// css
import './css/login.css';
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
        <div>
            <h1>
                <img src="../img/logo.PNG" alt="logoImage"></img>
            </h1>
        </div>
    </section>
    );
  }
}

export default Login;
