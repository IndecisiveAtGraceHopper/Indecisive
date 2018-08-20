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
      date: '',
      time: '',
      podId: '',
      pollId: '',
      name: '',
      notes: [],
      userId: '',
      showMap: false,
      locations: []
    }
  }

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
    if (this.props.activities.length){
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
    else if (!Object.keys(this.props.poll).length){
      return (<Poll adventureId={this.props.match.params.id} />)
    }
    else if (this.props.adventure) {
      const {adventure} = this.props
      console.log('adventure', adventure)
      return (<h1> {`${adventure[0].counter} out of ${adventure[0].totalCount} of your polls are in`} </h1>)
      }
    else {
      return (
        <div className='page-body'><h1>Loading</h1></div>
      )
    }
  }
}

const mapState= (state, {match})=> {
  return {
    activities: state.activity,
    userId: state.user.id,
    poll: state.poll.poll,
    adventure: (state.user.adventures && state.user.adventures.filter(el => el.id === +match.params.id))
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
