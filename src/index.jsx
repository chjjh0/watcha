import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import * as serviceWorker from './serviceWorker';

// redux
import { createStore } from 'redux';
import reducers from './reducers/index';
import { Provider } from 'react-redux';

// css
import './index.css';
// components
import App from './App.jsx';



class MainPage extends Component {
 
    render() {
        const store = createStore(reducers);
        return (
            <Provider store={store}>
                <BrowserRouter>
                    <div>
                        <App />
                    </div>
                </BrowserRouter>
            </Provider>
        )
    }
 
} 
ReactDOM.render(<MainPage />, document.getElementById('root'));


serviceWorker.unregister();
