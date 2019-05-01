import React from 'react'
import {connect} from 'react-redux'
import {loadUser} from '../redux/actions'
import {getBands} from '../redux/actions'
import Band from '../components/Band'
import User from '../components/User'

class ProfileContainer extends React.Component {
  state = {
    loop: 1,
    matches: []
  }



  componentDidMount() {
    this.props.getBands()
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
    console.log("yooooo")

    // let current = this.props.currentUser.user.id
    // console.log(current, "currentid")
  }

  componentWillUpdate() {
    if (this.state.loop < 2 && !!this.props.currentUser.user) {
      fetch(`http://localhost:3000/api/v1/users/${this.props.currentUser.user.id}/matches`)
      .then(res => res.json())
      .then(res => {
        this.setState({matches: res}, () => console.log(this.state))
        console.log('fetched whoooo', res)
      })
      this.setState({loop: 2})
    }
  }

  render(){
    let usersConnected
    console.log(this.state.matches, "matches in render")
    console.log(this.props.currentUser, "current user in render")
    console.log(this.props.allUsers[0], "bands???")
    if (!!this.props.currentUser.user && this.state.matches.length > 0){
      let usersConnected2 = this.state.matches.filter(user => {
        return user.user_id === this.props.currentUser.user.id
      })
      usersConnected = usersConnected2
      console.log(usersConnected)
      let usersConnectedIds = usersConnected.map(user => {
        return user.matched_user_id
      })
      console.log(usersConnectedIds, "the ids!!!")
      let filteredUsers = this.props.allUsers[0].filter(user => {
        return usersConnectedIds.includes(user.id)
      })
      console.log(filteredUsers, "filteredUsers!!!")
      let mappedToComponents = filteredUsers.map(user => {
        return <User user={user} />
      })
      usersConnected = mappedToComponents
    }

    console.log(usersConnected, "u")
    return (
      <div>{usersConnected}</div>
    )
  }
}

const mapStateToProps = (state) => {
  return state;
}

const mapDispatchToProps = (dispatch) => ({loadUser: (user) => dispatch(loadUser(user)), getBands: (user) => dispatch(getBands(user))})

export default connect(mapStateToProps, mapDispatchToProps)(ProfileContainer)
