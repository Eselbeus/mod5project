import React from 'react'
import {connect} from 'react-redux'

class Profile extends React.Component {
  render(){
    console.log(this.props, "profile props")
    return (
      <div>
        <div>
        <h1>{this.props.band.name}</h1>
        <p>{this.props.band.bio}</p>
        <p>{this.props.band.musings}</p>
        </div>
      </div>
    )
  }
}

export default Profile;
