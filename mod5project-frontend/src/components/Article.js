import React from 'react'
import '../App.css';

class Article extends React.Component {
  state = {
    articleOpen: false
  }

  openArticle = () => {
    this.setState({articleOpen: !this.state.articleOpen})
  }


  render(){
    return (
      <div className='article'>
        {this.state.articleOpen ? <div><h2>{this.props.article.headline}</h2><h5> by {this.props.author}</h5>
        <p>{this.props.article.body}</p>
        <button className="close-button" onClick={this.openArticle}>Close</button></div>: <div><h2>{this.props.article.headline}</h2><h5> by {this.props.author}</h5><button className="read-button" onClick={this.openArticle}>Read</button></div>}

      </div>
    )
  }

}

export default Article;
