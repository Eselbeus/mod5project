import React from 'react'
import '../App.css';
import {connect} from 'react-redux'
import fan from '../images/icons8-fan-24.png'

class Musing extends React.Component {
  state = {
    fanButtonClicked: false
  }

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

  fanButton = (musing) => {
    this.setState({fanButtonClicked: true})
    fetch(`http://localhost:3000/api/v1/users/${musing.user_id}/musings/${musing.id}`, {
      method: "PATCH",
      headers: {
        'Content-Type': 'application/json',
        'Accepts': 'application/json',
         Authorization: `Bearer`
      },
      body: JSON.stringify({
        likes: Number(musing.likes) + 1
      })
    })
    .then(res => res.json())
    .then(res => {
      this.props.updateMusings()
    })
  }

  render(){
    console.log(this.props, 'the props that beak')
    if (!this.props.currentUser.user){
      return <div></div>
    }
    return (
      <div className='musing'>
        <p>{this.props.musing.body}</p>
        <div className="likes">
          <h5 className="fan-number">Fanned: {this.props.musing.likes}</h5>
          {this.state.fanButtonClicked || (this.props.musing.user_id === this.props.currentUser.user.id) ? '' : <button className="fan-button" onClick={() => this.fanButton(this.props.musing)}><img src={fan}/></button>}
          {(this.props.musing.user_id === this.props.currentUser.user.id) ? <button className="delete" onClick={() => this.props.deleteHandler(this.props.musing.id)}>Delete</button> : ''}
        </div>

      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return state;
}


export default connect(mapStateToProps)(Musing);
