import React, { Component } from 'react';
import request from 'superagent';
import {Redirect, Link} from 'react-router-dom';
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
    this.state = {
      id: '',
      password: '',
      jump: ''
    }
  }
  btnLogin() {
    alert('btnLogin');
    request.post('/login')
    .send(
      {
        id: this.state.id,
        password: this.state.password
      }
    )
    .end((err, res) => {
      this.loadedJSON(err, res);
    })
  }

  loadedJSON(err, res) {
    if(err) return;
    if(res.body.errMsg) {
      alert(res.body.errMsg)
      return;
    }
    console.log(res.body.id)
    console.log(res.body.passwd)
    console.log(res.body.email)
    window.sessionStorage.setItem("isLoged",res.body.id)
    alert('login success')
    alert(window.sessionStorage.getItem("isLoged"))
    this.setState({jump: '/'})
  }

  render() {
    if (this.state.jump) {
      return <Redirect to={this.state.jump} />
    }
    const changed = (name, val) => this.setState({[name]:val.target.value})
    return (
    <section className="login">
        <div className="overlay-login"></div>
        <div className="backgroundImg">
          <img src={LegoBack} alt=""/>
        </div>
        <div className="login-container">
            <h1>
              <a href="http://127.0.0.1:3001">
                <img src={Logo} alt="logoImage"></img>
              </a>
            </h1>
            <input type="text" placeholder="id" value={this.state.id} onChange={val => changed('id', val)} className="idInput"/>
            <input type="password" placeholder="Password" value={this.state.password} onChange={val => changed('password', val)} className="passwordInput"/>
            <div className="signin" onClick={e => this.btnLogin()}>로그인</div>
            <hr/>
            <Link to="/join">
              <div className="signup">회원 가입</div>
            </Link>
        {/* //login-container */}
        </div>
    </section>
    );
  }
}

export default Login;
