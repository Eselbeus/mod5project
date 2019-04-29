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
        this.setState({musings: res}, () => console.log(res))
      }
    })
    }
  }

  renderMusingForm = () => {
    this.setState({musingForm: true})
  }

  render(){
    console.log(this.state)
    let allMusings = this.state.musings.map(musing => {
      return <Musing musing={musing}/>
    })
    return (
      <div>
          {!!this.props.currentUser.user ?
          <div>
          <h1>{this.props.currentUser.user.name}</h1>
          <p>Username: @{this.props.currentUser.user.username}</p>
            <div className='musings'>
          <h2>Musings</h2>
          <button onClick={this.renderMusingForm}>Post new musing</button>
          {this.state.musingForm ? <MusingForm /> : ""}
          <div>{allMusings.reverse()}</div>
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
