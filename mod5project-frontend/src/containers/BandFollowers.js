import React from 'react'
import {connect} from 'react-redux'
import {loadUser} from '../redux/actions'
import {getBands} from '../redux/actions'
import Band from '../components/Band'
import User from '../components/User'
import ArticleContainer from './ArticleContainer'

class BandFollowers extends React.Component {
  state = {
    loop: 1,
    matches: [],
    displayUser: true,
    singleUser: {}
  }

  displayJustOneUser = (id) => {
    this.setState({displayUser: !this.state.displayUser})
    fetch(`http://localhost:3000/api/v1/users/${id}`)
    .then(res => res.json())
    .then(res => {
      this.setState({singleUser: res}, () => console.log("Does this work?!", this.state))
    })
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
            console.log(this.props, "props in band foll")
    }

  }

  componentWillUpdate() {
    if (this.state.loop < 2 && !!this.props.selectedBand) {
      fetch(`http://localhost:3000/api/v1/users/${this.props.selectedBand.id}/matches`)
      .then(res => res.json())
      .then(res => {
        this.setState({matches: res}, () => console.log(res, 'bandfollowers'))

      })
      this.setState({loop: 2})
    }
  }

  render(){
    let usersConnected

    if (!!this.props.selectedBand && this.state.matches.length > 0 && !!this.props.allUsers[0]) {
      let usersConnected2 = this.state.matches.filter(user => {
        return user.user_id === this.props.selectedBand.id
      })
      usersConnected = usersConnected2
      let usersConnectedIds = usersConnected.map(user => {
        return user.matched_user_id
      })
      let filteredUsers = this.props.allUsers[0].filter(user => {
        return usersConnectedIds.includes(user.id)
      })
      let mappedToComponents = filteredUsers.map(user => {
        return <User user={user} displayJustOneUser={this.displayJustOneUser} displayUser={this.state.displayUser}/>
      })
      usersConnected = mappedToComponents
    }

    if (this.state.displayUser){
      return (
        <React.Fragment>
          <div className='bandcontainer'>
            <div className="follower-grid">{usersConnected}</div>
            <ArticleContainer />
          </div>
        </React.Fragment>
      )
    }
    else {
      return (
        <React.Fragment>
          <div className='bandcontainerHidden'>
            <div className="follower-grid"><User user={this.state.singleUser} displayJustOneUser={this.displayJustOneUser} displayUser={this.state.displayUser}/></div>
            <ArticleContainer />
          </div>
        </React.Fragment>
      )
    }
  }

}

const mapStateToProps = (state) => {
  return state;
}

const mapDispatchToProps = (dispatch) => ({loadUser: (user) => dispatch(loadUser(user)), getBands: (user) => dispatch(getBands(user))})

export default connect(mapStateToProps, mapDispatchToProps)(BandFollowers)
