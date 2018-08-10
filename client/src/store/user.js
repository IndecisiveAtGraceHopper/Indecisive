import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_USER = 'GET_USER'
const REMOVE_USER = 'REMOVE_USER'

/**
 * INITIAL STATE
 */
const initialState = {
  loggedInUser: {}
}

/**
 * ACTION CREATORS
 */
const getUser = user => ({type: GET_USER, user})
const removeUser = () => ({type: REMOVE_USER})

/**
 * THUNK CREATORS
 */
export const me = () => async dispatch => {
  try {
    const res = await axios.get('/auth/me')
    dispatch(getUser(res.data || initialState.loggedInUser))
  } catch (err) {
    console.error(err)
  }
}

export const logout = () => async dispatch => {
  try {
    await axios.post('/auth/logout')
    dispatch(removeUser())
    history.push('/login')
  } catch (err) {
    console.error(err)
  }
}

export const getLoggedInUser = () => async dispatch => {
  try {
    let myData = await axios.get('/auth/me')
    const moreData = await axios.get(`api/users/${myData.data.id}/me`)
    myData.data.name = moreData.data.display_name
    myData.data.spotifyUrl = moreData.data.external_urls.spotify
    const updatedUser = await axios.put(`/api/users/${myData.data.id}/me`, myData.data)
    dispatch(getUser(updatedUser.data))
  } catch(err) {
    console.error(err)
  } 
}



/**
 * REDUCER
 */
export default function(state = initialState, action) {
  switch (action.type) {
    case GET_USER:
      return {...state, loggedInUser: action.user}
    case REMOVE_USER:
      return {...state, loggedInUser: {}}
    default:
      return state
  }
}