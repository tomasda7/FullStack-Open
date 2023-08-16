import { createSlice } from '@reduxjs/toolkit'
import { getAllUsers } from '../services/users'

const usersSlice = createSlice({
  name: 'users',
  initialState: [],
  reducers: {
    setUsers(state, action) {
      state = action.payload
      return state
    }
  }
})

export const getUsers = () => {
  return async (dispatch) => {
    const users = await getAllUsers()

    dispatch(setUsers(users))
  }
}

export const { setUsers } = usersSlice.actions
export default usersSlice.reducer
