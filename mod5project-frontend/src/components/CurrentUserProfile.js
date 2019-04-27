import React from 'react'
import {connect} from 'react-redux'
import MusingForm from './MusingForm'

class CurrentUserProfile extends React.Component {
  state = {
    musingForm: false
  }

  renderMusingForm = () => {
    this.setState({musingForm: true})
  }

  render(){
    console.log(this.props, "profile props")

    return (
      <div>
          {!!this.props.currentUser.user ?
          <div>
          <h1>{this.props.currentUser.user.name}</h1>
          <p>Username: @{this.props.currentUser.user.username}</p>
          <p>{this.props.currentUser.user.musings}</p>
          <h2>Musings</h2>
          <button onClick={this.renderMusingForm}>Post new musing</button>
          </div> : ''}
          {this.state.musingForm ? <MusingForm /> : ""}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return state
}

export default connect(mapStateToProps)(CurrentUserProfile);
