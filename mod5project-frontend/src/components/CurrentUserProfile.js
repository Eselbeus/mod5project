import React from 'react'
import {connect} from 'react-redux'
import MusingForm from './MusingForm'
import Musing from './Musing'
import '../App.css';

class CurrentUserProfile extends React.Component {
  state = {
    musingForm: false,
    musings: []
  }


  componentDidUpdate(){
    if (this.props.currentUser.user !== undefined){
    fetch(`http://localhost:3000/api/v1/users/${this.props.currentUser.user.id}/musings`)
    .then(res => res.json())
    .then(res => {
      if (this.state.musings.length !== res.length){
        this.setState({musings: res}, () => console.log(res, "after state update"))
      }
    })
    }
  }

  submitHandler = (e) => {
    e.preventDefault()
    console.log("inside submitHandler")
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
    console.log(config, "config obj for post")
    fetch(`http://localhost:3000/api/v1/users/${userId}/musings`, config)
    .then(res => res.json())
    .then(res => {

        this.setState({musings: [...this.state.musings, res]}, () => console.log(res, "after fetch2"))
    })
  }

  renderMusingForm = () => {
    this.setState({musingForm: true})
  }

  render(){
    let allMusings
    if (!!this.state.musings) {
    let allMusings2 = this.state.musings.map(musing => {
      return <Musing musing={musing}/>
    })
    allMusings = allMusings2.reverse()
  }
    return (
      <div>
          {!!this.props.currentUser.user ?
          <div>
          <h1>{this.props.currentUser.user.name}</h1>
          <p>Username: @{this.props.currentUser.user.username}</p>
            <div className='musings'>
          <h2>Musings</h2>
          <button onClick={this.renderMusingForm}>Post new musing</button>
          {this.state.musingForm ? <MusingForm submitHandler={this.submitHandler}/> : ""}
          <div>{allMusings}</div>
            </div>
          </div> : ''}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return state
}

export default connect(mapStateToProps)(CurrentUserProfile);
