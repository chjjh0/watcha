import React, { Component } from 'react';
import { Route } from 'react-router-dom';

// css
import './css/style.css';
// components
import Nav from './components/nav.jsx';
import SlideArea from './components/slideArea.jsx';
import VideoList from './components/videoList.jsx';
import MarvelArea from './components/marvel.jsx';
// pages
import LoginPage from './pages/login.jsx';
// jQuery
import Jquery from 'jquery';


class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
    <section className="wrap">
      {/* 
        header를 유지할 경우 다른 페이지에서 공간을 가지고 있음 
        header 변경해야함
      */}
      {/* <header>  */}
        <Route exact path="/" component={Nav} />  
        <Route exact path="/" component={SlideArea} />
      {/* </header> */}
      <Route exact path="/" component={VideoList} />
      <Route exact path="/" component={MarvelArea} />
      <Route exact path="/login" component={LoginPage} />
    </section>
    );
  }
}

export default App;
