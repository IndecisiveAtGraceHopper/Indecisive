import {connect} from 'react-redux'
import React, { Component } from 'react';
import {submitPollThunk} from '../store/poll'
import axios from 'axios'
import key from './secrets'
import {PollMap} from './index'

class Poll extends Component {
  constructor(){
     super()
     this.state = {
      priceRange: 2,
      activityLevel: 2,
      artsyLevel: 2,
      hungerLevel: 2,
      drinkLevel: 2,
      showMap: false
    }
    this.renderMap = this.renderMap.bind(this)
  }


  handleChange = (evt) => {
   this.setState({
      [evt.target.name]: evt.target.value
    })
  }

  getGeocode = async(evt) => {
    const location= evt.split().join("+")
    const {data} = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${location}&key=${key}`)
    const latitude = data.results[0].geometry.location.lat
    const longitude = data.results[0].geometry.location.lng
      return {latitude, longitude}
  }

  handleSubmit = async (evt) => {
    evt.preventDefault()
    const {priceRange, activityLevel, artsyLevel, hungerLevel, drinkLevel} = this.state
    const {latitude, longitude} = await this.getGeocode(this.state.location)
    this.props.submitPollThunk({latitude,longitude, priceRange, activityLevel, artsyLevel, hungerLevel, drinkLevel, adventureId:2})
  }

  renderMap(evt) {
    evt.preventDefault()
    this.setState({showMap: !this.state.showMap})
  }

  render() {
    return (
      <div className="container">
        <h1>This is the Poll</h1>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group form-check">
            <div>
              <label htmlFor="name" />
              <input type="text" name="location" onChange={this.handleChange} className="form-control" id="nameInput" aria-describedby="name" placeholder="Enter location" />
              <small id="location" className="form-text text-muted" />
            </div>
            <div>
              {this.state.showMap ? 
                <div>
                  <button onClick={this.renderMap}>Hide Map</button>
                  <PollMap />
                </div> 
                : 
                <button onClick={this.renderMap}>Show Map</button>}
            </div>
            <div>
              <label htmlFor="priceRange">priceRange</label>
              <input type="range" name="priceRange" onChange={this.handleChange} min="1" max="4" defaultValue="2" className="form-control-range" id="formControlRange" />
              <small id="priceRange" className="form-text text-muted" />
            </div>
            <div>
              <label htmlFor="activityLevel">activityLevel</label>
              <input type="range" name="activityLevel" onChange={this.handleChange} min="1" max="4" defaultValue="2" className="form-control-range" id="formControlRange" />
              <small id="activityLevel" className="form-text text-muted" />
            </div>
            <div>
              <label htmlFor="artsyLevel">artsyLevel</label>
              <input type="range" name="artsyLevel" onChange={this.handleChange} min="1" max="4" defaultValue="2" className="form-control-range" id="formControlRange" />
              <small id="artsyLevel" className="form-text text-muted" />
            </div>
            <div>
              <label htmlFor="hungerLevel">hungerLevel</label>
              <input type="range" name="hungerLevel" onChange={this.handleChange} min="1" max="4" defaultValue="2" className="form-control-range" id="formControlRange" />
              <small id="hungerLevel" className="form-text text-muted" />
            </div>
            <div>
              <label htmlFor="drinkLevel">drinkLevel</label>
              <input type="range" name="drinkLevel" onChange={this.handleChange} min="1" max="4" defaultValue="2" className="form-control-range" id="formControlRange" />
              <small id="drinkLevel" className="form-text text-muted" />
          </div>
           <span>
              <button type='submit'>Submit</button>
           </span>
         </div>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    submitPollThunk: poll => dispatch(submitPollThunk(poll))
  }
}

export default connect(null, mapDispatchToProps)(Poll)
