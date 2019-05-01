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
    let now = new Date();
    let nowYear = now.toString().slice(11, 15)
    let nowMonth = now.toString().slice(4, 7)
    let nowDay = now.toString().slice(8, 10)
    // switch (nowMonth) {
    //   case "Jan":
    //     return "01"
    //   case "Feb":
    //     return "02"
    //   case "Mar":
    //     return "03"
    //   case "Apr":
    //     return "04"
    //   case "May":
    //     return "05"
    //   case "Jun":
    //     return "06"
    //   case "Jul":
    //     return "07"
    //   case "Aug":
    //     return "08"
    //   case "Sep":
    //     return "09"
    //   case "Oct":
    //     return "10"
    //   case "Nov":
    //     return "11"
    //   case "Dec":
    //     return "12"
    //   default:
    //     return null
    // }
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
