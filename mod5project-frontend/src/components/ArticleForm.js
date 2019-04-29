import React from 'react'
import {connect} from 'react-redux'

class ArticleForm extends React.Component {
  state = {
    headline: '',
    body: ''
  }

  changeHandler = (e) => {
    this.setState({[e.target.name]: e.target.value})
  }

  render(){
    console.log(this.props.submitArtHandler, "inside form article render")
    return (
      <div>
        <form onSubmit={this.props.submitArtHandler}>
          <label>Headline: </label>
          <input type='text' name='headline' value={this.state.headline} onChange={this.changeHandler}/><br/>
          <label>Article: </label>
          <input type='text' name='body' value={this.state.body} onChange={this.changeHandler}/>
          <input type='submit' value="Post!"/>
        </form>
      </div>
    )

  }
}


export default ArticleForm;
