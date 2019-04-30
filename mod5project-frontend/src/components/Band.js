import React from 'react'
import Profile from './Profile'

class Band extends React.Component {
  state = {
    bandProfile: false
  }

  profileLoad = () => {
    this.setState({bandProfile: true})
  }

  render(){
    console.log(this.props, "the band props")
    return (
      <div>
        {this.state.bandProfile ? <Profile band={this.props.band}/> : <h3 className="bandname" onClick={this.profileLoad}>{this.props.band.name}</h3>}
      </div>
    )


  }

}

export default Band;
