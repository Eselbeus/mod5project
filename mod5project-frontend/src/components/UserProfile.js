import React from 'react'
import {connect} from 'react-redux'
import Musing from './Musing'
import {getUser} from '../redux/actions'
import {loadUser} from '../redux/actions'
import '../App.css';

class UserProfile extends React.Component {
  state = {
    musings: [],
    followButton: true
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
    if (this.props.user){
      fetch(`http://localhost:3000/api/v1/users/${this.props.user.id}/musings`)
      .then(res => res.json())
      .then(res => {
        if (this.state.musings.length !== res.length){
          this.setState({musings: res})
        }
      })
    }
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
    fetch(`http://localhost:3000/api/v1/users/${this.props.user.id}/musings`)
    .then(res => res.json())
    .then(res => {
        this.setState({musings: res})
    })
  }

  followUser = () => {
    let otherUserId = this.props.user.id
    // console.log(userId, "user id")
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
        matched_user_id: otherUserId
      })
    }
    console.log(config, "config")
    fetch(`http://localhost:3000/api/v1/matches`, config)
    console.log(this.props, "props")
    this.setState({followButton: false})
  }

  render(){
    console.log('render from u prof', this.props)
    let musings;
    let embedUrl;
    if (this.state.musings.length > 0) {
    musings = this.state.musings.filter(musing => {
      return this.props.user.id === musing.user_id
    })
    musings = musings.sort((a, b) => b.id - a.id)
    let musingsFiltered = musings.map(musing => {
      return <Musing musing={musing} updateMusings={this.updateMusings}/>
    })
    musings = musingsFiltered

    }
    if (!!this.props.user.valid_music_link){
    let splitUrl = this.props.user.valid_music_link.split("watch?v=")
      embedUrl = splitUrl.join("embed/")
    }
    return (
      <React.Fragment>
        <section className="profile-and-musings">
        <div className="profile-info">{!!this.props.user ? <div>
          <h1 className="headings">{this.props.user.name}</h1>
          <span>
            <img className="profile-pic" src={`http://localhost:3000${this.props.user.imageUrl}`}/>
          </span>
          <div className="user-details">
          {!!this.state.followButton ? <button className="follow" onClick={this.followUser}>Follow {this.props.user.name}</button> : <h5>Now following!</h5>}
          {this.props.user.is_band ? <button className="find">Find fans of {this.props.user.name}</button> : ''}
          <h3>@{this.props.user.username}</h3>
          {this.props.user.location ? <p>Location: {this.props.user.location}</p> : ''}
          {this.props.user.age ? <p>Age: {this.props.user.age}</p> : ''}
          {this.props.user.gender ? <p>Gender: {this.props.user.gender}</p> : ''}
          <p>Bio: {this.props.user.bio}</p>
          </div>




        </div> : ''}
      </div>

      <div>
{this.props.user.is_band && !!this.props.user.valid_music_link ? <div><iframe width="696" height="522" src={this.props.user.valid_music_link} frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
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

const mapDispatchToProps = (dispatch) => ({getUser: (user) => dispatch(getUser(user)), loadUser: (user) => dispatch(loadUser(user))})

export default connect(mapStateToProps, mapDispatchToProps)(UserProfile);
