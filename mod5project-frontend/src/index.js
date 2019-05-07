import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { BrowserRouter as Router, Route} from "react-router-dom"
import Profile from './components/Profile'

import Nav from './components/Nav'

import thunk from 'redux-thunk'
import reducer from './redux/reducer.js'
import './index.css';
import App from './App';
import BandFollowers from './containers/BandFollowers';
import BandsContainer from './containers/BandsContainer';
import ProfileContainer from './containers/ProfileContainer'
import {Provider} from 'react-redux'
import * as serviceWorker from './serviceWorker';

const store = createStore(reducer, applyMiddleware(thunk))

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <Nav />
      <Route exact path='/fans' component={ProfileContainer}/>
      <Route exact path="/profile" component={Profile} />
      <Route exact path="/" component={App} />
      <Route exact path="/bands" component={BandsContainer} />
      <Route exact path="/bandfollowers" component={BandFollowers} />
    </Router>
  </Provider>
  , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
