import React, { Component } from 'react';
import request from 'superagent';
import {Redirect} from 'react-router-dom';
// css
import '../css/join.css';
// img
import Logo from '../img/logo.png';
import LegoBack from '../img/login.jpg'
// jQuery
import $ from 'jquery';
window.$ = $;


class Join extends Component {
  constructor(props) {
    super(props);
    this.state = {
        email: '',
        id: '',
        passwd: '',
        jump: ''
    }
    this.btnJoin = this.btnJoin.bind(this);
    this.loadedJSON = this.loadedJSON.bind(this);
  }
  btnJoin() {
    var uId = '';
    var passwd = '';
    uId = document.getElementsByName("userId")[0].value;
    passwd = document.getElementsByName("password")[0].value;
    alert('btnJoin');
    request.post('/join')
    .send(
      {
        userId: this.state.id,
        password: this.state.passwd
      }
    )
    .end((err, res) => {
      this.loadedJSON(err, res);
    })
  }

  loadedJSON(err, res) {
    if(err) return;
    console.log('join success')
    //console.log('err: '+err)
    //console.log('res.body1: '+res.body.id)
    //console.log('res.body2: '+res.body.message)
    window.location.href='http://127.0.0.1:3001/login';
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
            <h2>회원 가입</h2>
            {/* <form action="/join" method="post"> */}
                <input type="text" placeholder="id" value={this.state.id} onChange={val => changed('id', val)} className="idInput" name="userId"/>
                <input type="password" placeholder="Password" value={this.state.passwd} onChange={val => changed('passwd', val)} className="passwordInput" name="password"/>
                {/* <input type="submit" /> */}
            {/* </form> */}
            <button onClick={this.btnJoin} className="btnJoin">가입하기</button>
                
        {/* //login-container */}
        </div>
    </section>
    );
  }
}

export default Join;
