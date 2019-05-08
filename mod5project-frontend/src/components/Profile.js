import React from 'react'
import {connect} from 'react-redux'
import Musing from './Musing'
import {getUser} from '../redux/actions'
import {loadUser} from '../redux/actions'
import '../App.css';
import {withRouter} from 'react-router-dom'
import {selectBand} from '../redux/actions'

class Profile extends React.Component {
  state = {
    musings: []
  }

  componentDidMount(){
          console.log("band now?", this.props)
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
      console.log(this.props, "is this band?!")
      // this.props.selectBand(this.props.band)

    })
    // this.props.selectBand(this.props.band)
    console.log("band now?", this.props)
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

  followers = (e) => {
    console.log("clicked")
    this.props.history.push('/bandfollowers')
  }

  render(){
    console.log(this.props, "propsinprofile")
    this.props.selectBand(this.props.band)
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
      <React.Fragment >
        <section className="profile-and-musings">
        <div className="profile-info">
          <h1 className="headings">{this.props.band.name}</h1>
          <span>
            <img className="profile-pic" src={`http://localhost:3000${this.props.band.imageUrl}`}/>
          </span>
          <button onClick={this.followBand}>Follow {this.props.band.name}</button>
          <button onClick={this.followers}>Find fans of {this.props.band.name}</button>
          <h2>Username: @{this.props.band.username}</h2>
          <h4>Band/Musician</h4>
          {this.props.band.location ? <p>Location: {this.props.band.location}</p> : ''}
          {this.props.band.genre ? <p>Genre: {this.props.band.genre}</p> : ''}
          {this.props.band.members ? <p>Members: {this.props.band.members}</p> : ''}
          <p>Bio: {this.props.band.bio}</p>
        </div>
      <div>
        {this.props.band.is_band && !!this.props.band.valid_music_link ? <div><iframe width="696" height="522" src={this.props.band.valid_music_link} frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div> : ''}



        <div className="musings">
          <h2 className="headings">Musings</h2>
          {musings}
        </div>
      </div>
        </section>
      </React.Fragment>
    )
  }
}

const mapStateToProps = (state) => {
  return state;
}

const mapDispatchToProps = (dispatch) => ({getUser: (user) => dispatch(getUser(user)), loadUser: (user) => dispatch(loadUser(user)), selectBand: (band) => dispatch(selectBand(band))})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Profile));
