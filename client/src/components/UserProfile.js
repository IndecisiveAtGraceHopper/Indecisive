import React, { Component } from 'react'
import {createProfile, me} from '../store'
import {connect} from 'react-redux'

class UserProfile extends Component {
  constructor(){
    super()
    this.state = {
      user: {
        firstName: '',
        lastName: '',
        phone: '',
        email: '',
        address: '',
        image: ''
      },
      currentImage: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  async componentDidMount(){
    await this.setState({user: this.props.user})
    await this.setState({currentImage: this.state.user.image})
  }

  handleChange(evt) {
    evt.preventDefault()
    this.setState({user: {...this.state.user, [evt.target.name]: evt.target.value}})
  }

  handleSubmit(evt) {
    evt.preventDefault()
    if (this.state.user.image.length > 3) {
      this.setState({currentImage: this.state.user.image})
    }
    this.props.updateProfile({firstName: this.state.user.firstName, lastName: this.state.user.lastName, phone: this.state.user.phone, email: this.state.user.email, address: this.state.user.address, image: this.state.user.image}, this.props.user.id)
  }

  render() {
    return (
      <div id='user-profile'>
        <h3>Welcome, {this.props.user.email}</h3>
        <form id='userProfile' onSubmit={this.handleSubmit}>
          <div>
            <label htmlFor='firstName'>First Name</label>
            <input name='firstName' type='string' onChange={this.handleChange} value={this.state.user.firstName} />
          </div>
          <div>
            <label htmlFor='lastName'>Last Name</label>
            <input name='lastName' type='string' onChange={this.handleChange} value={this.state.user.lastName} />
          </div>
          <div>
            <label htmlFor='phone'>Phone Number</label>
            <input name='phone' type='string' onChange={this.handleChange} value={this.state.user.phone} />
          </div>
          <div>
            <label htmlFor='address'>Address</label>
            <input name='address' type='string' onChange={this.handleChange} value={this.state.user.address} />
          </div>
          <div>
            <label htmlFor='image'>Profile Photo URL</label>
            <input name='image' type='string' onChange={this.handleChange} value={this.state.user.image} />
          </div>
          <div>
            <img src={this.state.currentImage} width='200px' height='200px' />
          </div>
          <div>
            <button type='submit'>Submit</button>
          </div>
        </form>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateProfile: (profileInfo, userId) => dispatch(createProfile(profileInfo, userId)),
    getUser: () => dispatch(me())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserProfile)
