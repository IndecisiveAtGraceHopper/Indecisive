import React, { Component } from 'react'
import { connect } from 'react-redux'
import {createAdventure} from '../store/user'

class CreateAdventure extends Component {
  constructor(){
    super()
    let date = Date.now()
    this.state = {
      name: '',
      date: ''
    }
  }

  handleChange = (evt) => {
    this.setState({[evt.target.name]: evt.target.value})

  }

  onClick = (evt) => {
    evt.preventDefault()
    console.log('here')
    this.props.submit({...this.state, podId: +this.props.match.params.id})

  }

  render() {
    if (this.props.user) {console.log('here', this.props.user)}
    return(
        <div>
        <form className="input-group mb-2 mr-sm-2">
          <label>Name:</label>
          <input className="form-control mb-2 mr-sm-2" value= {this.state.name} name='name' onChange={this.handleChange}/>
          <label>Date:</label>
          <input className="form-control mb-2 mr-sm-2" type ='date' value = {this.state.date} name='date' onChange={this.handleChange}/>
          <br/>
        </form>
        <button type='submit' className="btn btn-secondary btn-lg btn-block" onClick={this.onClick}>Start your adventure!</button>
       </div>
    )
  }
}

const mapDispatch = (dispatch, {history})=> {
  return {
    submit: (adventure)=> dispatch(createAdventure(adventure, history))
  }
}




export default connect(null, mapDispatch)(CreateAdventure);
