import React from 'react'
import {connect} from 'react-redux'

class MusingForm extends React.Component {
  state = {
    body: ''
  }

  changeHandler = (e) => {
    this.setState({[e.target.name]: e.target.value})
  }

  render(){
    console.log(this.props.submitHandler, "inside form render")
    return (
      <div>
        <form onSubmit={this.props.submitHandler}>
          <input type='text' name='body' value={this.state.body} onChange={this.changeHandler}/>
          <input type='submit' value="Post!"/>
        </form>
      </div>
    )

  }

}

const mapStateToProps = (state) => {
  return state;
}

export default connect(mapStateToProps)(MusingForm);
