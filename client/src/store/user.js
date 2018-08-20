import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_USER = 'GET_USER'
const REMOVE_USER = 'REMOVE_USER'
const USER_ADVENTURES = 'USER_ADVENTURES'
const ADD_ADVENTURE ='ADD_ADVENTURE'
const UPDATE_ADVENTURE ='UPDATE_ADVENTURE'

/**
 * INITIAL STATE
 */
const initialState = {
  firstName: '',
  lastName: '',
  phone: '',
  email: '',
  address: '',
  image: '',
  adventures: []
}

/**
 * ACTION CREATORS
 */
const getUser = user => ({type: GET_USER, user})
const removeUser = () => ({type: REMOVE_USER})
const userAdventures = adventures => ({type: USER_ADVENTURES, adventures})
const addAdventure = adventure => ({type: ADD_ADVENTURE, adventure})
export const updateAdventure = id => ({type: UPDATE_ADVENTURE, id})

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

export const authSignUp = (userInfo) => async dispatch => {
  let res
  try {
    res = await axios.post('/auth/signup', userInfo)
  } catch (authError) {
    return dispatch(getUser({error: authError}))
  }
  try {
    dispatch(getUser(res.data))
    history.push('/users/profile')
  } catch(dispatchOrHistoryErr) {
    console.error(dispatchOrHistoryErr)
  }
}

export const authLogin = (userInfo) => async dispatch => {
  let res
  try {
    res = await axios.post('/auth/login', userInfo)
  } catch (authError) {
    return dispatch(getUser({error: authError}))
  }
  try {
    dispatch(getUser(res.data))
    history.push('/userhome')
  } catch (dispatchOrHistoryErr) {
    console.error(dispatchOrHistoryErr)
  }
}

export const logOut = () => async dispatch => {
  try {
    await axios.post('/auth/logout')
    dispatch(removeUser())
    history.push('/login')
  } catch (err) {
    console.error(err)
  }
}

export const createProfile = (profileInfo, userId) => async dispatch => {
  try {
    const res = await axios.put(`/auth/profile/${userId}`, profileInfo)
    dispatch(getUser(res.data))
  }catch (err) {
    console.error(err)
  }
}

export const getUserPods = userId => async dispatch => {
  try {
    const pods = await axios.get(`/api/user/pods/${userId}`)
  } catch (err) {
    console.error(err)
  }
}

export const getUserAdventuresThunk = (id) => {
  return async (dispatch) => {
    const user = await axios.get(`/api/users/${id}`)
    let adventures = []
    const pods = user.data.pods
    pods.forEach(pod => {
      adventures = adventures.concat(pod.adventures)
    })
    dispatch(userAdventures(adventures))
  }
}

export const createAdventure = (adventure, history) => {
  return async (dispatch) => {
    try {
      const {data} = await axios.post('/api/adventures', adventure)
      dispatch(addAdventure(data))
      console.log('history', history)
      history.push(`/adventures/${data.id}`)
    } catch (err) {
      console.log(err)
    }
  }
}


/**
 * REDUCER
 */
export default function(state = initialState, action) {
  switch (action.type) {
    case GET_USER:
      return {...state, ...action.user}
    case REMOVE_USER:
      return {}
    case USER_ADVENTURES:
      return {...state, adventures: action.adventures}
    case ADD_ADVENTURE:
      return {...state, adventures: [...state.adventures, action.adventure]}
    case UPDATE_ADVENTURE:
      return {...state, adventures: state.adventures.map(adventure=> adventure.id===action.id ? {...adventure, counter: adventure.counter+1}: adventure)}
    default:
      return state
  }
}
