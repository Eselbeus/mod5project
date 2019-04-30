import React from 'react'
import '../App.css';


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
    
    return (
      <div className='musing'>
        <p>{this.props.musing.body}</p>
        <div className="likes">
          <h5><b>Fanned: {this.props.musing.likes}</b></h5>
        </div>
        <button onClick={() => this.deleteHandler(this.props.musing.id)}>Delete</button>
      </div>
    )
  }
}

export default Musing;
