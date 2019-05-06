import React from 'react'
import Profile from './Profile'
import { BrowserRouter as Link, NavLink, Router } from 'react-router-dom'

class Band extends React.Component {

  profileLoad = () => {
    this.props.displayJustOneBand(this.props.band.id)
  }

  render(){
    console.log(this.props.band, "band props")
    return (
      <div>
        <div>
          {!this.props.displayBand ? <Profile band={this.props.band}/> : <div className="browse-background" onClick={this.profileLoad}><h3 className="bandname">{this.props.band.name}</h3><img className="profile-thumbnail" src={`http://localhost:3000${this.props.band.imageUrl}`}/></div>}
        </div>
      </div>
    )
  }
}

export default Band;
