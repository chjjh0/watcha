import React, { Component } from 'react';
// css
import './css/style.css';
// components
import Nav from './components/nav.jsx';
import SlideArea from './components/slideArea.jsx';
import VideoList from './components/videoList.jsx';
import MarvelArea from './components/marvel.jsx';
// jQuery
import $ from 'jquery';
window.$ = $;


class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
    <section className="wrap">
      <header>
        <Nav />  
        <SlideArea />
      </header>
      <VideoList />
      <MarvelArea />
    </section>
    );
  }
}

export default App;
