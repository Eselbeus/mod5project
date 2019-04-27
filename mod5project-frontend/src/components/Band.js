import React from 'react'
import Profile from './Profile'

class Band extends React.Component {
  render(){
    return (
      <div>
        <h3>{this.props.band.name}</h3>
        <Profile band={this.props.band}/>
      </div>
    )


  }

}

export default Band;
