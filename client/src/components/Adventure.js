import React, { Component } from 'react'
import Activity from './Activity'
import {fetchActivities} from '../store/activity'
import {getPoll} from '../store/poll'
import {connect} from 'react-redux'
import {Map, Poll} from './index'
import {getAdventure} from '../store/adventure'
import {PinBoard} from './index'

class Adventure extends Component {

  async componentDidMount() {
    await this.props.getPoll(this.props.match.params.id, this.props.userId)
    await this.props.fetch(this.props.match.params.id)
    await this.props.getAdventures(this.props.userId)
    console.log('this.props.adventure', this.props.adventure)
    const activities = this.props.activities
    const locations = activities.map(activity => {
      return {coords: activity.address, title: activity.name}
    })
    this.setState({locations})
  }

  render() {
    if (this.props.activities.length) {
      console.log(
        'rendering'
      )
      const locations = this.props.activities.map(activity => {
        return {coords: activity.address, title: activity.name}
      })
      return (
        <div id='adventure-page'>
          <h3>Adventure</h3>
          <div id='activities-container'>
            {this.props.activities.map((activity) =>
              <Activity activity={activity} isCoord={true} key={activity.id}/>
            )}
          </div>
          <div id='adventure-map-container'>
              <Map interactive={false} coords={locations} />
          </div>
          <div id='pinboard-container'>
            <PinBoard />
          </div>
        </div>
      )
    }
    else if (Object.keys(this.props.poll).length === 0) {
      return (<Poll adventureId={this.props.match.params.id} />)
    }
    else if ((Object.keys(this.props.adventure).length > 0) && (this.props.adventure.counter < this.props.adventure.totalCount)) {
      const {adventure} = this.props

      return (<div className='page-body'><h1>{`${adventure.counter} out of ${adventure.totalCount} of your polls are in`}</h1></div>)
    }
    else {
      return (
        <div className='page-body'><h1>Loading</h1></div>
      )
    }
  }
}

const mapState = (state) => {
  return {
    adventure: state.adventure,
    activities: state.activity,
    userId: state.user.id,
    poll: state.poll.poll
  }
}

const mapDispatch = (dispatch) => {
  return {
    fetch: (id) => dispatch(fetchActivities(id)),
    getPoll: (AdventureId, userId) => dispatch(getPoll(AdventureId, userId)),
    getThisAdventure: (id) => dispatch(getAdventure(id))
  }
}

export default connect(mapState, mapDispatch)(Adventure)
