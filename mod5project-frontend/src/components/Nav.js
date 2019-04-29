import React from 'react'
import { BrowserRouter as Link, NavLink, Router } from 'react-router-dom'
import {connect} from 'react-redux'
import {getUser} from '../redux/actions.js'
import {logoutUser} from '../redux/actions.js'

const Nav = (props) => {

  return (
    <nav>
      <NavLink to='/'>Home</NavLink>
      <NavLink to='/bands'>Bands</NavLink>
      <NavLink onClick={props.logoutUser} to='/'>Logout</NavLink>
    </nav>

  )

}

const mapDispatchToProps = (dispatch) => {
  return ({logoutUser: (user) => dispatch(logoutUser(user))})
}

export default connect(null, mapDispatchToProps)(Nav);
