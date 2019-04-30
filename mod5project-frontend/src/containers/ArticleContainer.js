import React from 'react'
import {getBands} from '../redux/actions'
import ArticleForm from '../components/ArticleForm'
import {connect} from 'react-redux'
import '../App.css';

// import Article from './components/Article'

class ArticleContainer extends React.Component {
  state = {
    articles: [],
    articleForm: false
  }

  componentDidMount(){
    this.props.getBands()
    fetch(`http://localhost:3000/api/v1/articles`)
    .then(res => res.json())
    .then(res => {
        this.setState({articles: res}, () => console.log(this.state.articles))
    })
  }

  submitArtHandler = (e) => {
    e.preventDefault()
    console.log("inside submitHandler")
    let articleBody = e.target.body.value
    let articleHeadline = e.target.headline.value
    let userId = this.props.currentUser.user.id
    console.log(articleBody, userId)
    let config = {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        "Accept": 'application/json',
        Authorization: 'Bearer'
      },
      body: JSON.stringify({
        headline: articleHeadline,
        body: articleBody,
        user_id: userId,
        likes: 0
      })
    }
    console.log(config, "config obj for post")
    fetch(`http://localhost:3000/api/v1/users/${userId}/articles`, config)
    .then(res => res.json())
    .then(res => {
        this.setState({articles: [...this.state.articles, res]}, () => console.log(this.state.articles, "after fetch2articles"))
    })
  }

  renderArticleForm = () => {
    this.setState({articleForm: true})
  }

  render() {
    let users = this.props.allUsers[0]
    let bands;
    let bandComponents;
    !!users ? bands = users.filter(band => {
      return band.is_band
    })
    : console.log(users, "USERS")

    console.log(this.props, "props in render")
    let allArticles;
    let author;
    if (!!this.state.articles && this.props.allUsers[0]){
      allArticles = this.state.articles.map(article => {
        author = this.props.allUsers[0].find(user => {
          return user.id === article.user_id})
        console.log(author, "author", article.user_id)
        return (
          <div>
            <h3>{article.headline} by {author.name}</h3>
          </div>
        )
      })
    }
    return (
      <div className='articles'>
      <button onClick={this.renderArticleForm}>Write new Article</button>
      {this.state.articleForm ? <ArticleForm submitArtHandler={this.submitArtHandler}/> : ""}
        <h2>Daily Articles</h2>
        {allArticles}

      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return state
}

const mapDispatchToProps = (dispatch) => {
  return ({getBands: () => dispatch(getBands())})
}

export default connect(mapStateToProps, mapDispatchToProps)(ArticleContainer);
