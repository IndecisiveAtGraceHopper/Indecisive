import React, { Component } from 'react'
import Activity from './Activity'
import {fetchActivities} from '../store/activity'
import {getPoll} from '../store/poll'
import {connect} from 'react-redux'
import {Map, Poll} from './index'
import {getUserAdventuresThunk} from '../store/user'
import {PinBoard} from './index'


class Adventure extends Component {
  constructor() {
    super()
    this.state = {
      adventure: {
        date: '',
        time: '',
        podId: '',
        pollId: '',
        name: '',
        notes: [],
        userId: '',
        activities: []
      },
      locations: [],
      poll: {}
    }
  }

  async componentDidMount() {
    await this.props.getPoll(this.props.match.params.id, this.props.userId)
    await this.props.fetch(this.props.match.params.id)
    await this.props.getAdventures(this.props.userId)
    const adventure = this.props.adventures.filter(adventure => {
      return adventure.id === +this.props.match.params.id
    })[0]
    const activities = this.props.activities
    const locations = activities.map(activity => {
      return {coords: activity.address, title: activity.name}
    })
    const poll = this.props.poll
    this.setState({adventure: {...adventure, activities}, locations, poll})
    console.log('this.state', this.state)
  }

  render() {
    console.log('this.props', this.props)
    if (this.state.adventure.activities.length) {
      console.log(
        'rendering'
      )
      return (
        <div id='adventure-page'>
          <h3>Adventure</h3>
          <div id='activities-container'>
            {this.props.activities.map((activity) =>
              <Activity activity={activity} isCoord={true} key={activity.id}/>
            )}
          </div>
          <div id='adventure-map-container'>
            {this.state.locations.length &&
              <Map interactive={false} coords={this.state.locations} />
            }
          </div>
          <div id='pinboard-container'>
            <PinBoard />
          </div>
        </div>
      )
    }
    else if (!Object.keys(this.props.poll).length) {
      return (<Poll adventureId={this.props.match.params.id} />)
    }
    else if (this.props.adventure) {
      const {adventure} = this.props
      console.log('adventure', adventure)
      return (<div className='page-body'><h1>{`${adventure[0].counter} out of ${adventure[0].totalCount} of your polls are in`}</h1></div>)
    }
    else {
      return (
        <div className='page-body'><h1>Loading</h1></div>
      )
    }
  }
}

const mapState = (state) => {
  console.log('state', state)
  return {
    activities: state.activity,
    userId: state.user.id,
    poll: state.poll.poll,
    adventures: state.user.adventures
  }
}

const mapDispatch = (dispatch) => {
  return {
    fetch: (id) => dispatch(fetchActivities(id)),
    getPoll: (AdventureId, userId) => dispatch(getPoll(AdventureId, userId)),
    getAdventures: (id)=> dispatch(getUserAdventuresThunk(id))
  }
}

export default connect(mapState, mapDispatch)(Adventure)
