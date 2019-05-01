import React from 'react'

class User extends React.Component {

  render(){
    console.log(this.props, "user comp!")
    return (
      <div>{this.props.user.name}</div>
    )
  }


}

export default User;
