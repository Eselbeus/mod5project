import React from 'react'
import Profile from './Profile'
import { BrowserRouter as Link, NavLink, Router } from 'react-router-dom'

class Band extends React.Component {

  profileLoad = () => {
    this.props.displayJustOneBand(this.props.band.id)
  }

  render(){

    return (
      <div>
        <div>
          {!this.props.displayBand ? <Profile band={this.props.band}/> : <h3 className="bandname" onClick={this.profileLoad}>{this.props.band.name}</h3>}
        </div>
      </div>
    )
  }
}

export default Band;
