import React from 'react'
import { BrowserRouter as Link, NavLink, Router } from 'react-router-dom'
import {connect} from 'react-redux'
import {getUser} from '../redux/actions.js'
import {logoutUser} from '../redux/actions.js'
import '../App.css';

class Nav extends React.Component {

  render(){
    let isBand;
    if (this.props.currentUser.user){
      isBand = this.props.currentUser.user.is_band
    }

    return (
      <nav>
        <NavLink to='/'>Home</NavLink>
        {isBand === false ?
        <NavLink to='/bands'>Bands</NavLink> : ""}
        <NavLink to='/followers'>Followers</NavLink>
        <NavLink onClick={this.props.logoutUser} to='/'>Logout</NavLink>
      </nav>

    )
  }
}

const mapStateToProps = (state) => {
  return state;
}

const mapDispatchToProps = (dispatch) => {
  return ({logoutUser: (user) => dispatch(logoutUser(user))})
}

export default connect(mapStateToProps, mapDispatchToProps)(Nav);
