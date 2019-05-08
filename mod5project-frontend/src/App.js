import React from 'react';
import Signup from './components/Signup.js'
import Login from './components/Login.js'
import Profile from './components/Profile.js'
import BandsContainer from './containers/BandsContainer.js'
import CurrentUserProfile from './components/CurrentUserProfile.js'
import ArticleContainer from './containers/ArticleContainer.js'
import './App.css';
import {connect} from 'react-redux'
import {getCurrentUser} from './redux/actions.js'
import {getUser} from './redux/actions.js'
import {loadUser} from './redux/actions.js'
import { Route, Switch, withRouter } from "react-router-dom";

class App extends React.Component {
  state = {
    signup: true,
    login: false
  }

  componentDidMount() {

    let token = localStorage.getItem('token')
    if (token) {
      fetch("http://localhost:3000/api/v1/login", {
          method: "GET",
          headers: {
            "content-type": "application/json",
            accepts: "application/json",
            Authorization: `${token}`
          }
        })
          .then(resp => resp.json())
          .then(res => {

            this.props.loadingUser(res)})
      // : this.props.history.push("/signup")
    }
    else {
      // this.props.history.push("/signup")
    }
  }

  logUser = () => {
    let token = localStorage.getItem('token')
    if (token) {
      fetch("http://localhost:3000/api/v1/login", {
          method: "GET",
          headers: {
            "content-type": "application/json",
            accepts: "application/json",
            Authorization: `${token}`
          }
        })
          .then(resp => resp.json())
          .then(res => {

            this.props.loadingUser(res)})
      // : this.props.history.push("/signup")
    }
    else {
      // this.props.history.push("/signup")
    }
  }

  loginButton = () => {
    this.setState({login: !this.state.login})
    this.setState({signup: !this.state.signup})
  }

  signupButton = () => {
    this.setState({signup: !this.state.signup})
    this.setState({login: !this.state.login})
  }

  render(){
    let token = localStorage.getItem('token')
    // console.log(this.props.currentUser.user.name)
    console.log(localStorage.getItem('token'))
    return (
      <div className="App">
        <header link rel="stylesheet"
      href="https://fonts.googleapis.com/css?family=Font+Name"></header>
        <h1 className="headings">{this.props.currentUser.user != undefined ? `` : "Hello Muser!"}</h1>
        {!token ?
        <React.Fragment>
          {!this.state.signup ? <button className="signup-button" onClick={this.signupButton}>Signup</button> : <Signup />}
          {!this.state.login ? <button className="login-button" onClick={this.loginButton}>Login for returning users</button> : <Login />}
        </React.Fragment> :
        ''}
        <div className="flex-container">
          {token ?
            <React.Fragment>
            <CurrentUserProfile logUser={this.logUser}/>
            <ArticleContainer />
            </React.Fragment> : ''}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return state
}
const mapDispatchToProps = (dispatch) => ({loadingUser: (user) => dispatch(loadUser(user))})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
