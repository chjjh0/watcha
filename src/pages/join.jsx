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
        password: '',
        email: '',
        jump: ''
    }
    this.btnJoin = this.btnJoin.bind(this);
    this.loadedJSON = this.loadedJSON.bind(this);
  }
  btnJoin() {
      console.log('===btnJoin')
      console.log('email: '+this.state.email)
      console.log('id: '+this.state.id)
      console.log('password: '+this.state.password)
      // 유효성 체크
      // 공백 체크
      if($(".emailInput").val().search(/\s/) !== -1) {
        alert('email 입력란에 공백이 포함되어 있습니다')
        $(".emailInput").focus()
        return;
      } else if($(".idInput").val().search(/\s/) !== -1) {
        alert('id 입력란에 공백이 포함되어 있습니다')
        $(".idInput").focus()
        return;
      } else if($(".passwordInput").val().search(/\s/) !== -1) {
        alert('password 입력란에 공백이 포함되어 있습니다')
        $(".passwordInput").focus()
        return;
      }
      // email 형식 체크
      // id, password 특수문자 포함 체크
      console.log('email 형식 체크')
      var ppp =  /[~!@#$%^&*()\-=+_']/gi;
      console.log('ppp 선언 완료')
      if($(".emailInput").val().includes('@') === false) {
        alert('email에 "@"가 없습니다')
        $(".emailInput").focus()
        return;
      } else if(ppp.test($('.idInput').val())) {
        alert('id에 특수문자가 포함되어 있습니다')
        return;
      } 
      // id, password 자릿수 체크
      if($('.idInput').val().length < 5) {
        alert('id는 다섯자리 이상 작성해주세요')
        return;
      } else if($('.passwordInput').val().length < 8) {
        alert('password는 여덟자리 이상 작성해주세요')
        return;
      }
      // 빈칸 체크
      if(!this.state.id || !this.state.password || !this.state.email) {
            if(!$(".emailInput").val()) {
              alert('email을 입력해주세요')
              $(".emailInput").focus()
            } else if(!$(".idInput").val()) {
              alert('ID를 입력해주세요')
              $(".idInput").focus()
            } else if(!$(".passwordInput").val()) {
              alert('password를 입력해주세요')
              $(".passwordInput").focus()
            }
          return;
      } else {
          var email = this.state.email;
          var userid = this.state.id;
          var password = this.state.password;
          
          alert('유효성 체크 완료')
          alert('btnJoin');
          request.post('/join')
          .send(
            {
              email: email,
              userId: userid,
              password: password
            }
          )
          .end((err, res) => {
            this.loadedJSON(err, res);
          })
      }
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
                <input type="email" placeholder="email" onChange={val => changed('email', val)} className="emailInput" name="email"/>
                <input type="text" placeholder="id" onChange={val => changed('id', val)} className="idInput" name="userId"/>
                <input type="password" placeholder="Password" onChange={val => changed('password', val)} className="passwordInput" name="password"/>
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
