import React from 'react'
import {connect} from 'react-redux'
import {getUser} from '../redux/actions.js'

class Logout extends React.Component {
  render(){
    return <div><button>Logout</button></div>
  }

}


export default connect()(Logout)
