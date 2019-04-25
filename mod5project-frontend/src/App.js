import React from 'react';
import Signup from './components/Signup.js'
import Login from './components/Login.js'
import Profile from './components/Profile.js'
import './App.css';
import {connect} from 'react-redux'
import {getCurrentUser} from './redux/actions.js'
import { Route, Switch, withRouter } from "react-router-dom";
class App extends React.Component {

  componentDidMount() {
    let token = localStorage.getItem('token')
    if (token) {
      this.props.history.push("/login")
    }
    else {
      this.props.history.push("/signup")
    }
  }

  render(){
    console.log(localStorage.getItem('token'))
    return (
      <div className="App">
        <h1>Hello Muser!</h1>
        <Switch >
          <Route path="/signup" render={() => <Signup />}/>
          <Route path="/login" render={() => <Login />}/>
        </Switch >

      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return state
}
const mapDispatchToProps = (dipatch) => ({getCurrentUser})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
