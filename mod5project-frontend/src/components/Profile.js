import React from 'react'
import {connect} from 'react-redux'
import Musing from './Musing'
import {getUser} from '../redux/actions'
import {loadUser} from '../redux/actions'
import '../App.css';

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

  updateMusings = () => {
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
        this.setState({musings: res})
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
    let embedUrl;
    if (this.state.musings.length > 0) {
    musings = this.state.musings.filter(musing => {
      return this.props.band.id === musing.user_id
    })
    musings = musings.sort((a, b) => b.id - a.id)
    let musingsFiltered = musings.map(musing => {
      return <Musing musing={musing} updateMusings={this.updateMusings}/>
    })
    musings = musingsFiltered

    }
    if (!!this.props.band.valid_music_link){
    let splitUrl = this.props.band.valid_music_link.split("watch?v=")
      embedUrl = splitUrl.join("embed/")
    }
    return (
      <div>
        <div className="profile-info">
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
          <img className="profile-pic" src={`http://localhost:3000${this.props.band.imageUrl}`}/>
        </div>

        {this.props.band.is_band && !!embedUrl ? <div><iframe width="696" height="522" src={embedUrl} frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div> : ''}



        <div className="musings">
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
