import React from 'react'
import {connect} from 'react-redux'
import MusingForm from './MusingForm'
import Musing from './Musing'
import '../App.css';
import {getMusings} from '../redux/actions.js'
import {postMusing} from '../redux/actions.js'
import {removeMusing} from '../redux/actions.js'

class CurrentUserProfile extends React.Component {
  state = {
    musingForm: false,
    articleForm: false,
    editForm: false,
    bio: '',
    location: '',
    genre: '',
    age: null,
    members: '',
    gender: '',
    photoFile: null,
    profilePhotoButton: true,
    profileVideoButton: true,
    videoUrl: ''
  }


  componentDidUpdate(){
    // this.props.getMusings()

    if (this.props.currentUser.user !== undefined && this.props.musings.length === 0){
      this.props.getMusings(this.props.currentUser.user.id)
    }
  }
//moving this get fetch to actions getMusings

  submitHandler = (e) => {
    e.preventDefault()

    let musingBody = e.target.body.value
    let userId = this.props.currentUser.user.id
    console.log(musingBody, userId)
    let config = {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        "Accept": 'application/json',
        Authorization: 'Bearer'
      },
      body: JSON.stringify({
        body: musingBody,
        user_id: userId,
        likes: 0
      })
    }
    console.log(config, "config prior to action")
    this.props.postMusing(this.props.currentUser.user.id, config)
    this.setState({musingForm: false})
  }
//moving this post fetch to actions postMusing

  renderProfilePhotoForm = () => {
    this.setState({profilePhotoButton: !this.state.profilePhotoButton})
  }

  handlePhotoFile = (e) => {
    this.setState({photoFile: e.target.files[0]})
  }

  submitProfilePhoto = (e) => {
    e.preventDefault()
    const formData = new FormData();
    formData.append('user[image]', this.state.photoFile)
    let config = {
      method: "PATCH",
      body: formData
    }
    fetch(`http://localhost:3000/api/v1/users/${this.props.currentUser.user.id}`, config)
    .then(res => res.json())
    .then(res => {
      this.setState({profilePhotoButton: true})
    })
  }

  renderMusingForm = () => {
    this.setState({musingForm: true})
  }

  renderArticleForm = () => {
    this.setState({articleForm: true})
  }

  showEditForm = () => {
    this.setState({editForm: !this.state.editForm})
  }

  editProfile = (e) => {
    this.setState({[e.target.name]: e.target.value}, () => console.log(this.state))
  }

  submitProfileInfo = (e, id) => {
    e.preventDefault()
    let config;
    console.log(this.props.currentUser.user.is_band)
    if (!!this.props.currentUser.user.is_band){
      config = {
        method: "PATCH",
        headers: {'Content-Type': 'application/json',
        "Accept": 'application/json',
        Authorization: 'Bearer'
        },
        body: JSON.stringify({
          bio: e.target.bio.value,
          location: e.target.location.value,
          members: e.target.members.value,
          genre: e.target.genre.value
        })
      }
    }
    else {
      config = {
        method: "PATCH",
        headers: {'Content-Type': 'application/json',
        "Accept": 'application/json',
        Authorization: 'Bearer'
        },
        body: JSON.stringify({
          bio: e.target.bio.value,
          location: e.target.location.value,
          age: e.target.age.value,
          gender: e.target.gender.value
        })
      }
    }
    fetch(`http://localhost:3000/api/v1/users/${id}`, config)
    .then(res => res.json())
    .then(res => {
      console.log(res.bio, "here's the response")
      this.setState({editForm: false}, console.log(this.props, "props here...looking for loaduser"))
      this.props.logUser(res)
    })
  }

  deleteHandler = (id) => {
    console.log(id)
    this.props.removeMusing(id)
    fetch(`http://localhost:3000/api/v1/musings/${id}`, {
      method: "DELETE",
      headers: {
        'Content-Type': 'application/json',
        'Accepts': 'application/json',
      }
    })
  }

  editProfileVideo = () => {
    this.setState({profileVideoButton: false})
  }

  videoHandler = (e) => {
    console.log(e.target.videoUrl)
    this.setState({[e.target.name]: e.target.value})
  }

  submitVideo = (e) => {
    e.preventDefault()
    console.log(this.state.videoUrl, "url")
    let videoUrl = this.state.videoUrl
    if (videoUrl.includes("watch?v=")){
      let splitUrl = videoUrl.split("watch?v=")
      videoUrl = splitUrl.join("embed/")
    }
    console.log(videoUrl)
    fetch(`http://localhost:3000/api/v1/users/${this.props.currentUser.user.id}`, {
      method: "PATCH",
      headers: {
        'Content-Type': 'application/json',
        'Accepts': 'application/json'
      },
      body: JSON.stringify({
        valid_music_link: videoUrl
      })
    })
  }

  render(){
    let allMusings
    if (!!this.props.musings[0]) {
    let allMusingsFiltered = this.props.musings[0].filter(musing => {
        return musing.user_id === this.props.currentUser.user.id
      })
    allMusingsFiltered = allMusingsFiltered.sort((a, b) => a.id - b.id)
    allMusings = allMusingsFiltered.map(musing => {
      return <Musing musing={musing} deleteHandler={this.deleteHandler}/>
    })
    allMusings = allMusings.reverse()
  }
  console.log(this.props, "hello")
    return (
      <React.Fragment className="profile-and-musings">
        {!!this.props.currentUser.user ?
          <div className="profile-info">
            <h1 className="headings">{this.props.currentUser.user.name}</h1>

            <span>
              <img className="profile-pic" src={`http://localhost:3000${this.props.currentUser.user.imageUrl}`}/>
            </span>

            <p>Username: @{this.props.currentUser.user.username}</p>

            {!!this.props.currentUser.user.location ? <p>Location: {this.props.currentUser.user.location}</p> : ''}
            {!!this.props.currentUser.user.genre ? <p>Genre: {this.props.currentUser.user.genre}</p> : ''}
            {!!this.props.currentUser.user.age ? <p>Age: {this.props.currentUser.user.age}</p> : ''}
            {!!this.props.currentUser.user.members ? <p>Members: {this.props.currentUser.user.members}</p> : ''}
            {!!this.props.currentUser.user.gender ? <p>Gender: {this.props.currentUser.user.gender}</p> : ''}
            {!!this.props.currentUser.user.bio ? <p>Bio: {this.props.currentUser.user.bio}</p> : ''}

            <span>
              {this.state.profilePhotoButton ? <button className="edit-button" onClick={this.renderProfilePhotoForm}>Edit Profile Picture</button> : <form onSubmit={this.submitProfilePhoto}>
                  <input className="edit-button" type="file" onChange={this.handlePhotoFile}/>
                  <input className="edit-button" type="submit" value="Upload Photo"/>
                </form>}
            </span>
            <span>
              {this.state.editForm ? <form onSubmit={(e) => this.submitProfileInfo(e, this.props.currentUser.user.id)}>
                <label>Location: </label>
                <input type='text' name="location" onChange={this.editProfile} value={this.state.location} />
                <br/>
                {this.props.currentUser.user.is_band ? <label>Genre: </label> : <label>Age</label>}
                {this.props.currentUser.user.is_band ? <input type='text' name="genre" onChange={this.editProfile} value={this.state.genre} /> : <input type='text' name="age" onChange={this.editProfile} value={this.state.age} />}
                <br/>
                {this.props.currentUser.user.is_band ? <label>Members: </label> : <label>Gender</label>}
                {this.props.currentUser.user.is_band ? <input type='text' name="members" onChange={this.editProfile} value={this.state.members} /> : <input type='text' name="gender" onChange={this.editProfile} value={this.state.gender} />}
                <br/>
                <label>Bio: </label>
                <input type='text' name="bio" onChange={this.editProfile} value={this.state.bio} />
                <br/>
                <input className="edit-button" type='submit' value="Update Profile" />
                </form> : <button className="edit-button" onClick={this.showEditForm}>Edit Profile</button>}
            </span>




            {this.props.currentUser.user.is_band ? <div className="video">
              <button onClick={this.editProfileVideo}>Edit Profile Video</button>
            </div> : ''}
            {!!this.state.profileVideoButton ? '' : <form onSubmit={this.submitVideo}><label>Paste YouTube Video URL here:</label><input name="videoUrl" type="text" onChange={this.videoHandler} value={this.state.videoUrl}/><input type="submit" value="Submit"/></form>}

            {this.props.currentUser.user.is_band && !!this.props.currentUser.user.valid_music_link ? <div><iframe width="696" height="522" src={this.props.currentUser.user.valid_music_link} frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
          </div> : ''}

        </div>

        : ''}

          <div className='musings'>
            <h2 className="headings">Musings</h2>
            <button className='musings-button' onClick={this.renderMusingForm}>Post new musing</button>
            {this.state.musingForm ? <MusingForm submitHandler={this.submitHandler}/> : ""}
            <div>{allMusings}</div>
          </div>



      </React.Fragment>
    )
  }
}

const mapStateToProps = (state) => {

  return state
}

const mapDispatchToProps = (dispatch) => ({getMusings: (user) => dispatch(getMusings(user)), removeMusing: (id) => dispatch(removeMusing(id)), postMusing: ((id, musing) => dispatch(postMusing(id, musing)))})

export default connect(mapStateToProps, mapDispatchToProps)(CurrentUserProfile);
