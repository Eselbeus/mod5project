import React from 'react'
import {connect} from 'react-redux'
import {getCurrentUser} from '../redux/actions.js'

class Signup extends React.Component {
  state = {
    name: '',
    username: '',
    email: '',
    password: '',
    is_band: false
  }

  changeHandler = (e) => {
    this.setState({[e.target.name]: e.target.value})
  }

  accountTypeHandler = (e) => {
    this.setState({[e.target.name]: !this.state.is_band})
  }

  submitHandler = (e) => {
    e.preventDefault()
    if (e.target.password.value === e.target.confirmPassword.value){

      this.props.getCurrentUser(this.state)
    }
    else {

      alert("passwords do not match")
    }
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
          <label>Email:</label>
          <input type="text" name="email" placeholder="email" value={this.state.email} onChange={this.changeHandler}/>
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

const mapDispatchToProps = (dispatch) => {
  return ({getCurrentUser: (user) => dispatch(getCurrentUser(user))})
}

export default connect(null, mapDispatchToProps)(Signup)
