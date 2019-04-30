import React from 'react'
import {getBands} from '../redux/actions.js'
import {connect} from 'react-redux'
import Band from '../components/Band.js'
import ArticleContainer from './ArticleContainer'

class BandsContainer extends React.Component {
  state = {
    displayBand: true,
    singleBand: {}
  }

  displayJustOneBand = () => {
    this.setState({displayBand: !this.state.displayBand})
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
      return <Band band={band} displayJustOneBand={this.displayJustOneBand}/>
    }) : console.log()


    return (
      <div>
        {this.state.displayBand ? bandComponents : ''}
        <ArticleContainer />
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return ({getBands: () => dispatch(getBands())})
}

const mapStateToProps = (state) => {
  return state;
}

export default connect(mapStateToProps, mapDispatchToProps)(BandsContainer)
