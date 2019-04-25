import React from 'react';
import Signup from './components/Signup.js'
import Login from './components/Login.js'
import './App.css';

class App extends React.Component {

  state = {
    current_user: ''
  }

  render(){
    return (
      <div className="App">
        <h1>hello muser!</h1>
        <Signup />
        <Login />
      </div>
    );
  }
}


export default App;
