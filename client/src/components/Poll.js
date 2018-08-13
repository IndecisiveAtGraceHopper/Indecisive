import {connect} from 'react-redux'
import React, { Component } from 'react';
import {submitPollThunk} from '../store/poll'
import axios from 'axios'
import key from './secrets'

class Poll extends Component {
  constructor(){
     super()
     this.state = { poll: [] }
  }


  handleChange = (evt) => {
   //const value = evt.target.name === 'location' ? JSON.parse(evt.target.value) : evt.target.value;
   this.setState({
      [evt.target.name]: evt.target.value
    })
  }

  getGeocode = async(evt) => {
    console.log('KEY',process.env.GOOGLE_MAPS_KEY)
    const location= evt.split().join("+")
    const {data} = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${location}&key=${key}`)
    console.log("DATA", data)
    const geocodedLat = data.results[0].geometry.location.lat
    const geocodedLng = data.results[0].geometry.location.lng
    console.log ('GEOCODED',geocodedLat, geocodedLng)
    return geocodedLat, geocodedLng
  }

  handleSubmit = (evt) => {
    evt.preventDefault()
    const {location, priceRange, activityLevel, artsyLevel, hungerLevel, drinkLevel} = this.state
    this.props.submitPollThunk({geocodedLocation, priceRange, activityLevel, artsyLevel, hungerLevel, drinkLevel})
    const geocodedLocation= this.getGeocode(this.state.location)

  }

  render() {
    return (
      <div className="container">
        <h1>This is the Poll</h1>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group form-check">
            <div>
              <label htmlFor="name" />
              <input type="text" name="location"  onChange={this.handleChange}
              className="form-control" id="nameInput" aria-describedby="name" placeholder="Enter location" />
              <small id="location" className="form-text text-muted" />
            </div>
            <div>
              <label htmlFor="priceRange">priceRange</label>
              <input type="text" name="priceRange"  onChange={this.handleChange}
              type="range" min="1" max="4" defaultValue="2" className="form-control-range" id="formControlRange" />
              <small id="priceRange" className="form-text text-muted" />
            </div>
            <div>
              <label htmlFor="activityLevel">activityLevel</label>
              <input type="text" name="activityLevel"  onChange={this.handleChange}
              type="range" min="1" max="4" defaultValue="2" className="form-control-range" id="formControlRange" />
              <small id="activityLevel" className="form-text text-muted" />
            </div>
            <div>
              <label htmlFor="artsyLevel">artsyLevel</label>
              <input type="text" name="artsyLevel"  onChange={this.handleChange}
              type="range" min="1" max="4" defaultValue="2" className="form-control-range" id="formControlRange" />
              <small id="artsyLevel" className="form-text text-muted" />
            </div>
            <div>
              <label htmlFor="hungerLevel">hungerLevel</label>
              <input type="text" name="hungerLevel"  onChange={this.handleChange}
              type="range" min="1" max="4" defaultValue="2" className="form-control-range" id="formControlRange" />
              <small id="hungerLevel" className="form-text text-muted" />
            </div>
            <div>
              <label htmlFor="drinkLevel">drinkLevel</label>
              <input type="text" name="drinkLevel"  onChange={this.handleChange}
              type="range" min="1" max="4" defaultValue="2" className="form-control-range" id="formControlRange" />
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

