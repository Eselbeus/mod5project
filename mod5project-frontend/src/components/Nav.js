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
    let token = localStorage.getItem('token')

    return (

      <nav>
        <NavLink className="nav-elem" to='/'>Rockmuser</NavLink>
        {!!token ?
        <React.Fragment>
        {isBand === false ?
        <NavLink className="nav-elem" to='/bands'>Bands</NavLink> : ""}
        <NavLink className="nav-elem" to='/fans'>Fans</NavLink>
        <NavLink className="nav-elem" onClick={this.props.logoutUser} to='/'>Logout</NavLink>
        </React.Fragment> : ''}
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
