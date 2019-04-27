import React from 'react'
import {getBands} from '../redux/actions.js'
import {connect} from 'react-redux'
import Band from '../components/Band.js'

class BandsContainer extends React.Component {

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
      return <Band band={band}/>
    }) : console.log()


    return (
      <div>
        {bandComponents}
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
