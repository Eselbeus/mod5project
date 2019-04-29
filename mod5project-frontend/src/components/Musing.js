import React from 'react'
import '../App.css';


class Musing extends React.Component {


  render(){
    console.log(this.props.musing.body, "musing")
    return (
      <div className='musing'>
        <p>{this.props.musing.body}</p>
        <div className="likes">
          <h5><b>Fanned: {this.props.musing.likes}</b></h5>
        </div>
      </div>
    )
  }
}

export default Musing;
