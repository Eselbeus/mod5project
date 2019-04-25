import React from 'react'

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
    this.props.submitHandler(this.state)
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

export default Login
