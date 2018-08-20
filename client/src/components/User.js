import React, { Component } from 'react'
import { connect } from 'react-redux'
import {getUserPodsThunk} from '../store'
import {Link} from 'react-router-dom'

class Pod extends Component {
  constructor() {
    super()
    this.state = {
      pods: null,
      users:null
    }
  }

	componentDidMount () {
	    this.props.getAllUsersPod(this.props.id)
	}

  render() {
      if(this.props.pods){
        return (
          <div>
            <h3 className="text-center font-weight-normal">Current pods:</h3>
             <div>
              {
                this.props.pods.map(pod => (
                  <div id="pod" key={pod.id} className="text-center">
                      <Link to={`/pods/${pod.id}`}>
                        <h5>{pod.name}</h5>
                      </Link>

                    {
                      // pod.adventures.map(adventure => (
                      //   <div key={`adventure-${adventure.id}`}> --{adventure.name} </div>
                      //   )
                      // )
                    }

                  </div>
                )
              )}
              </div>
          </div>
        );
      }
      return <h1>You have no pods yet. Create one so you can plan an adventure with your friends!</h1>
      }
    }

const mapStateToProps = state => {
  return {
    pods: state.pod.pods,
    users: state.pod.users,
  }
}


const mapDispatchToProps = dispatch => {
  return {
    getAllUsersPod: (id) => dispatch(getUserPodsThunk(id))
  }
}


export default connect(mapStateToProps,mapDispatchToProps)(Pod)
