import React from 'react'

class Signup extends React.Component {
  state = {
    name: '',
    username: '',
    password: '',
    is_band: false
  }

  changeHandler = (e) => {
    this.setState({[e.target.name]: e.target.value}, () => console.log(this.state))
  }

  accountTypeHandler = (e) => {
    this.setState({[e.target.name]: !this.state.is_band}, () => console.log(this.state))
  }

  submitHandler = (e) => {
    e.preventDefault()
    if (e.target.password.value === e.target.confirmPassword.value){
      console.log("passwords match")
      this.props.submitHandler(this.state)
    }
    else {
      console.log("passwords do not match")
      alert("passwords do not match")
    }
    console.log(this.state)
  }

  render(){
    return (
      <div className="login-form">
      <h2>Sign up</h2>
        <form onSubmit={this.submitHandler}>
          <label>Your name or your band/artist name:</label>
          <input type="text" name="name" placeholder="name" value={this.state.name} onChange={this.changeHandler}/>
          <br />
          <label>Username:</label>
          <input type="text" name="username" placeholder="username" value={this.state.username} onChange={this.changeHandler}/>
          <br />
          <label>Password:</label>
          <input type="password" name="password" placeholder="password" value={this.state.password} onChange={this.changeHandler}/>
          <br />
          <label>Confirm Password:</label>
          <input type="password" name="confirmPassword" placeholder="confirm password" />
          <br />
          <label>Is this a fan account or musician account?</label>
          <select name="is_band" onChange={this.accountTypeHandler}>
            <option value={false}>Fan</option>
            <option value={true}>Band/Musician</option>
          </select>
          <br />
          <input type="submit" value="Sign up" />
        </form>
      </div>
    )
  }
}

export default Signup
