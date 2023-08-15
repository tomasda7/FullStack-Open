import { createSlice } from '@reduxjs/toolkit'
import { setToken } from '../services/blogs'
import { login } from '../services/login'

const userSlice = createSlice({
  name: 'user',
  initialState: null,
  reducers: {
    setUser(state, action) {
      state = action.payload
      return state
    }
  }
})

export const getLoggedUser = () => {
  return async (dispatch) => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(setUser(user))
    }
  }
}

export const logIn = (username, password) => {
  return async (dispatch) => {
    const user = await login({
      username,
      password
    })

    setToken(user.token)

    window.localStorage.setItem('loggedUser', JSON.stringify(user))

    dispatch(setUser(user))
  }
}

export const { setUser } = userSlice.actions
export default userSlice.reducer
