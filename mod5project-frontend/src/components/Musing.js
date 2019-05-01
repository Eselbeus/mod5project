import React from 'react'
import '../App.css';
import {connect} from 'react-redux'

class Musing extends React.Component {

  deleteHandler = (id) => {
    console.log(id)
    fetch(`http://localhost:3000/api/v1/musings/${id}`, {
      method: "DELETE",
      headers: {
        'Content-Type': 'application/json',
        'Accepts': 'application/json',
         Authorization: `Bearer`
      }
    })
    .then(res => res.json())
    .then(res => {

    })
  }

  fanButton = () => {
    console.log("thank you for clicking the fan button; it's not operational yet")
  }

  render(){
    let button;
    if (!!this.props.currentUser.user){
      if (this.props.musing.user_id === this.props.currentUser.user.id){
        button = <button onClick={() => this.props.deleteHandler(this.props.musing.id)}>Delete</button>
      }
    }

    return (
      <div className='musing'>
        <p>{this.props.musing.body}</p>
        <div className="likes">
          <h5><b>Fanned: {this.props.musing.likes}</b></h5>
          <button onClick={this.fanButton}>Fan</button>
        </div>
        {button}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return state;
}

export default connect(mapStateToProps)(Musing);
