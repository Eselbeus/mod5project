import React from 'react'
import {connect} from 'react-redux'
import {getUser} from '../redux/actions.js'

class Login extends React.Component {
  state = {
    username: '',
    password: ''
  }

  changeHandler = (e) => {
    this.setState({[e.target.name]: e.target.value})
  }

  submitHandler = (e) => {
    e.preventDefault()
    this.props.getUser(this.state)
  }

  render(){
    return (
      <div className="login-form">
      <h2>Log in</h2>
      <form onSubmit={this.submitHandler}>
        <label>Username:</label>
        <input type="text" name="username" placeholder="username" value={this.state.username} onChange={this.changeHandler}/>
        <br />
        <label>Password:</label>
        <input type="password" name="password" placeholder="password" value={this.state.password} onChange={this.changeHandler}/>
        <br />
        <input type="submit" value="Log in" />
      </form>
      </div>
    )
  }

}

const mapDispatchToProps = (dispatch) => {
  return ({getUser: (user) => dispatch(getUser(user))})
}

export default connect(null, mapDispatchToProps)(Login)
