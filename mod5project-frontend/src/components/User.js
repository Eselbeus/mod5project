import React from 'react'
import UserProfile from './UserProfile'

class User extends React.Component {

  profileLoad = () => {
    console.log("clicked it!", this.props.user.id)
    this.props.displayJustOneUser(this.props.user.id)
  }

  render(){

    return (
      <div>
      {!this.props.displayUser ? <div><UserProfile user={this.props.user}/></div>: <div className="browse-background" onClick={this.profileLoad}><h3 className="bandname">{this.props.user.name}</h3><img className="profile-thumbnail" src={`http://localhost:3000${this.props.user.imageUrl}`}/></div>}
      </div>
    )
  }


}

export default User;
