import React from 'react'
import {connect} from 'react-redux'

class MusingForm extends React.Component {
  state = {
    body: ''
  }

  changeHandler = (e) => {
    this.setState({[e.target.name]: e.target.value}, console.log(this.state))
  }

  submitHandler = (e) => {
    e.preventDefault()
    let musingBody = e.target.body.value
    let userId = this.props.currentUser.user.id
    console.log(musingBody, userId)
    let config = {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        "Accept": 'application/json',
        Authorization: 'Bearer'
      },
      body: JSON.stringify({
        body: musingBody,
        user_id: userId,
        likes: 0
      })
    }
    console.log(config)
    fetch(`http://localhost:3000/api/v1/users/${userId}/musings`, config)
  }

  render(){
    return (
      <div>
        <form onSubmit={this.submitHandler}>
          <input type='text' name='body' value={this.state.body} onChange={this.changeHandler}/>
          <input type='submit' value="Post!"/>
        </form>
      </div>
    )

  }

}

const mapStateToProps = (state) => {
  return state;
}

export default connect(mapStateToProps)(MusingForm);
