import React, { Component } from 'react';
import { Route } from 'react-router-dom';

// css
import './css/style.css';
// components
//import Header from './components/header.jsx';
import Nav from './components/nav.jsx';
import SlideArea from './components/slideArea.jsx';
import VideoList from './components/videoList.jsx';
import MarvelArea from './components/marvel.jsx';
import Footer from './components/footer.jsx';
// pages
import LoginPage from './pages/login.jsx';
import JoinPage from './pages/join.jsx';
import CategoryPage from './pages/category.jsx';
import EvaluatePage from './pages/evaluate.jsx';
import FavoritePage from './pages/favorite.jsx';
// jQuery
import Jquery from 'jquery';

class App extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <section className="wrap">
                <Route exact path="/*" component={Nav} /> {/* header */}
                <main id="main">
                  <Route exact path="/" component={SlideArea} />
                  <Route exact path="/" component={VideoList} />
                  <Route exact path="/" component={MarvelArea} />
                  <Route exact path="/login" component={LoginPage} />
                  <Route exact path="/join" component={JoinPage} />
                  <Route exact path="/category" component={CategoryPage} />
                  <Route exact path="/evaluate" component={EvaluatePage} />
                  <Route exact path="/favorite" component={FavoritePage} />
                </main>
                <Footer />
            </section>
        );
    }
}

export default App;
