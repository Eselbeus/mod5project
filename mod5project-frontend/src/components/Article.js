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
        {this.state.articleOpen ? <div><h2>{this.props.article.headline} by {this.props.author}</h2>
        <p>{this.props.article.body}</p>
        <button onClick={this.openArticle}>Close</button></div>: <div><h2>{this.props.article.headline} by {this.props.author}</h2><button className="read-button" onClick={this.openArticle}>Read</button></div>}

      </div>
    )
  }

}

export default Article;
