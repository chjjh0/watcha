import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';

import './index.css';
import App from './App.jsx';
import * as serviceWorker from './serviceWorker';

class MainPage extends Component {
 
    render() {
        return (
            <BrowserRouter>
            <div>
                <App />
            </div>
            </BrowserRouter>
        )
    }
 
} 
ReactDOM.render(<MainPage />, document.getElementById('root'));


serviceWorker.unregister();
