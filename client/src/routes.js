import React, {Component} from 'react'
import {Route, Switch, withRouter} from 'react-router-dom'
import {Pods, UserProfile, Signup, Logout, Login, Home, Adventure, Adventures, Pod, Search, CreateAdventure, SendText} from './components'
import { me } from './store'
import {connect} from 'react-redux'

 /**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData()
  }

  render() {
    const {isLoggedIn, isProfileComplete} = this.props
    return (
      <Switch>
        {/*components visible to all*/}
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/signup" component={Signup} />
        {/*components visible to logged in users*/}
        {isLoggedIn && (
          <Switch>
            <Route exact path="/profile" component={UserProfile} />
            <Route exact path="/logout" component={Logout} />
            {/*components visible to logged in users with complete profiles*/}
            {isProfileComplete && (
              <Switch>
                <Route exact path="/pods" component={Pods} />
                <Route exact path="/search" component={Search} />
                <Route exact path="/pods/:id" component={Pod} />
                <Route exact path="/pods/:id/CreateAdventure" component={CreateAdventure} />
                <Route exact path="/users/:id/text" component={SendText} />
                <Route exact path="/adventures" component={Adventures} />
                <Route exact path="/adventures/:id/" component={Adventure} />
                <Route exact path="/users/:id" component={SendText} />
              </Switch>
            )}
            <Route component={UserProfile} />
          </Switch>
        )}
        <Route component={Login} />
      </Switch>
    );
  }
}


const mapState = state => {
  return {
    isLoggedIn: !!state.user.id,
    isProfileComplete: state.user.phone && state.user.firstName && state.user.lastName && state.user.address
  }
}

const mapDispatch = dispatch => {
  return {
    loadInitialData: () => dispatch(me())
  }
}

export default withRouter(connect(mapState, mapDispatch)(Routes))
