import React from 'react'
import {connect} from 'react-redux'
import Musing from './Musing'

class Profile extends React.Component {
  state = {
    musings: []
  }

  componentDidMount(){
    fetch(`http://localhost:3000/api/v1/users/${this.props.band.id}/musings`)
    .then(res => res.json())
    .then(res => {
      if (this.state.musings.length !== res.length){
        this.setState({musings: res})
      }
    })
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
        <p>{this.props.band.bio}</p>
        <div>{musings}</div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return state;
}

export default connect(mapStateToProps)(Profile);
