import React from 'react'
import {connect} from 'react-redux'
import Musing from './Musing'
import {getUser} from '../redux/actions'

class Profile extends React.Component {
  state = {
    musings: []
  }

  componentDidMount(){
    // this.props.getUser()
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
    console.log(bandId)
    if (!!this.props.currentUser.user){
      let userId = this.props.currentUser.user.id
      //WHY DO I NEVER HAVE A USER WHEN I'M LOGGED IN!!!
    }

    console.log(this.props)
  }

  render(){
    console.log(this.props.band.id, "what are the band profile props", this.state.musings)
    let musings;
    if (this.state.musings.length > 0) {
      console.log('ta da')
    musings = this.state.musings.filter(musing => {
      return this.props.band.id === musing.user_id
    })
    console.log(musings)
    let musingsFiltered = musings.map(musing => {
      return <Musing musing={musing}/>
    })
    musings = musingsFiltered
    console.log(musingsFiltered)
  }
    return (
      <div>
        <div>
        <h1>{this.props.band.name}</h1>
        <h4>Band/Musician</h4>
        <button onClick={this.followBand}>Follow {this.props.band.name}</button>
        <button>Find fans of {this.props.band.name}</button>
        <p>{this.props.band.bio}Bio</p>
        <div>{musings}</div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return state;
}

const mapDispatchToProps = (dispatch) => ({getUser: (user) => dispatch(getUser(user))})

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
