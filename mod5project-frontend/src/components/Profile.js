import React from 'react'
import {connect} from 'react-redux'
import Musing from './Musing'
import {getUser} from '../redux/actions'
import {loadUser} from '../redux/actions'

class Profile extends React.Component {
  state = {
    musings: []
  }

  componentDidMount(){
    let token = localStorage.getItem('token')
    if (token) {
      fetch("http://localhost:3000/api/v1/login", {
          method: "GET",
          headers: {
            "content-type": "application/json",
            accepts: "application/json",
            Authorization: `${token}`
          }
        })
          .then(resp => resp.json())
          .then(res => {
            this.props.loadUser(res)})
    }
    fetch(`http://localhost:3000/api/v1/users/${this.props.band.id}/musings`)
    .then(res => res.json())
    .then(res => {
      if (this.state.musings.length !== res.length){
        this.setState({musings: res})
      }
    })
  }

  followBand = () => {
    let bandId = this.props.band.id
    console.log(bandId, "band id")
    let userId = this.props.currentUser.user.id
    console.log(userId, "user id")

    let config = {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        "Accept": 'application/json',
        Authorization: 'Bearer'
      },
      body: JSON.stringify({
        user_id: userId,
        matched_user_id: bandId
      })
    }
    console.log(config, "config")
    fetch(`http://localhost:3000/api/v1/matches`, config)
    console.log(this.props, "props")
  }

  render(){
    let musings;
    if (this.state.musings.length > 0) {
    musings = this.state.musings.filter(musing => {
      return this.props.band.id === musing.user_id
    })
    let musingsFiltered = musings.map(musing => {
      return <Musing musing={musing}/>
    })
    musings = musingsFiltered
  }
    return (
      <div>
        <div>
        <h1>{this.props.band.name}</h1>
        <h2>@{this.props.band.username}</h2>
        <h4>Band/Musician</h4>
        <button onClick={this.followBand}>Follow {this.props.band.name}</button>
        <button>Find fans of {this.props.band.name}</button>
        {this.props.band.location ? <p>Location: {this.props.band.location}</p> : ''}
        {this.props.band.genre ? <p>Genre: {this.props.band.genre}</p> : ''}
        {this.props.band.members ? <p>Members: {this.props.band.members}</p> : ''}
        <p>Bio: {this.props.band.bio}</p>
        <div>
        <h2>Musings</h2>
        {musings}
        </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return state;
}

const mapDispatchToProps = (dispatch) => ({getUser: (user) => dispatch(getUser(user)), loadUser: (user) => dispatch(loadUser(user))})

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
