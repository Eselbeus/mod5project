import React from 'react'
import {getBands} from '../redux/actions.js'
import {loadUser} from '../redux/actions.js'
import {connect} from 'react-redux'
import Band from '../components/Band.js'
import ArticleContainer from './ArticleContainer'

class BandsContainer extends React.Component {
  state = {
    displayBand: true,
    singleBand: {}
  }

  displayJustOneBand = (id) => {
    this.setState({displayBand: !this.state.displayBand})
    fetch(`http://localhost:3000/api/v1/users/${id}`)
    .then(res => res.json())
    .then(res => {
      this.setState({singleBand: res}, () => console.log("Does this work?!", this.state))
    })
  }

  componentDidMount(){
    this.props.getBands()
  }

  render(){

    let users = this.props.allUsers[0]

    let bands;
    let bandComponents;
    !!users ? bands = users.filter(band => {
      return band.is_band
    })
    : console.log()

    !!users ? bandComponents = bands.map(band => {
      return <Band band={band} displayJustOneBand={this.displayJustOneBand} displayBand={this.state.displayBand}/>
    }) : console.log()

    if (this.state.displayBand){

    return (
      <div className='bandcontainer'>
        <div className="band-grid">{bandComponents}</div>
        <ArticleContainer />
      </div>
    )
    }
    else {
      return (
        <div className='bandcontainerHidden'>
          <div className="band-grid">{<Band band={this.state.singleBand} displayJustOneBand={this.displayJustOneBand} displayBand={this.state.displayBand} />}</div>
          <ArticleContainer />
        </div>
      )
    }
  }
}

const mapDispatchToProps = (dispatch) => {
  return ({getBands: () => dispatch(getBands()), loadUser: (user) => dispatch(loadUser(user))})
}

const mapStateToProps = (state) => {
  return state;
}

export default connect(mapStateToProps, mapDispatchToProps)(BandsContainer)
