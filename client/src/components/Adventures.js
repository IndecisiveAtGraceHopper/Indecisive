import React, { Component } from 'react'
import { connect } from 'react-redux'
import {getUserAdventuresThunk} from '../store'
import {Link} from 'react-router-dom'

class Adventures extends Component {
    constructor() {
        super()
        this.state = {
            adventures: []
        }
    }

    async componentDidMount () {
        await this.props.getAllUsersAdventures(this.props.user.id)
        await this.setState({adventures: this.props.adventures})
    }

    render() {
        const allAdventures = this.state.adventures
        const futureAdventures = allAdventures.filter(adventure => {
            const date = new Date(adventure.date)
            return Date.parse(date) >= Date.now()
        })
        const pastAdventures = allAdventures.filter(adventure => {
            const date = new Date(adventure.date)
            return Date.parse(date) < Date.now()
        })
        return (
            <div>
                <h2>Upcoming Adventures</h2>
                <div>
                {
                    futureAdventures.map(adventure => (
                        <div id="adventure" key={adventure.id}>
                            <h4><Link to={`/adventures/${adventure.id}`}>{adventure.name}</Link></h4>
                        </div>
                    ))
                }
                </div>
                <h2>Past Adventures</h2>
                <div>
                {
                    pastAdventures.map(adventure => (
                        <div id="adventure" key={adventure.id}>
                            <h4><Link to={`/adventures/${adventure.id}`}>{adventure.name}</Link></h4>
                        </div>
                    ))
                }
                </div>
                <div>

                   <a href="/pods">
                    <button className="btn btn-dark">Create a new adventure</button>
                   </a>

                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        adventures: state.user.adventures,
        users: state.pod.users,
        user: state.user
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getAllUsersAdventures: (id) => dispatch(getUserAdventuresThunk(id))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Adventures)
