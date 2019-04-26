import React from 'react'
import {connect} from 'react-redux'
import {getUser} from '../redux/actions.js'
import {logoutUser} from '../redux/actions.js'

class Logout extends React.Component {

  render(){
    return <div><button onClick={this.props.logoutUser}>Logout</button></div>
  }

}

const mapDispatchToProps = (dispatch) => {
  return ({logoutUser: (user) => dispatch(logoutUser(user))})
}

export default connect(null, mapDispatchToProps)(Logout)
