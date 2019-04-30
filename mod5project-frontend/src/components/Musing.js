import React from 'react'
import '../App.css';
import {connect} from 'react-redux'

class Musing extends React.Component {

  deleteHandler = (id) => {
    console.log(id)
    fetch(`http://localhost:3000/musings/${id}`, {
      method: "DELETE",
      headers: {
        'Content-Type': 'application/json',
        'Accepts': 'application/json',
         Authorization: `Bearer`
      }
    })
  }

  render(){
    let button;
    if (!!this.props.currentUser.user){
      if (this.props.musing.user_id === this.props.currentUser.user.id){
        button = <button onClick={() => this.deleteHandler(this.props.musing.id)}>Delete</button>
      }
    }

    return (
      <div className='musing'>
        <p>{this.props.musing.body}</p>
        <div className="likes">
          <h5><b>Fanned: {this.props.musing.likes}</b></h5>
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
