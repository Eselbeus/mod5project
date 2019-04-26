import React from 'react';
import Signup from './components/Signup.js'
import Login from './components/Login.js'
import Logout from './components/Logout.js'
import Profile from './components/Profile.js'
import './App.css';
import {connect} from 'react-redux'
import {getCurrentUser} from './redux/actions.js'
import {getUser} from './redux/actions.js'
import {loadUser} from './redux/actions.js'
import { Route, Switch, withRouter } from "react-router-dom";

class App extends React.Component {

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
            console.log(res, "what is this!?")
            this.props.loadingUser(res)})

      // : this.props.history.push("/signup")
    }
    else {
      // this.props.history.push("/signup")
    }
  }

  render(){
    let token = localStorage.getItem('token')
    // console.log(this.props.currentUser.user.name)
    console.log(localStorage.getItem('token'))
    return (
      <div className="App">
        <h1>{this.props.currentUser.user != undefined ? `Hello ${this.props.currentUser.user.name}` : "Hello Muser!"}</h1>
        <Login />
        <Signup />
        <Logout />

      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return state
}
const mapDispatchToProps = (dispatch) => ({loadingUser: (user) => dispatch(loadUser(user))})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
