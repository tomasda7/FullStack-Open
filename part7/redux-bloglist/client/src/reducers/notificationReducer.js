import { createSlice } from '@reduxjs/toolkit'

const initialState = {}

const notificationSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    showMessage(state, action) {
      console.log(action.payload)
      state = action.payload
      return state
    },
    hideMessage(state) {
      state = initialState
      return state
    }
  }
})

export const setNotification = (text, style, time) => {
  return async (dispatch) => {
    dispatch(showMessage({ text, style }))

    setTimeout(() => {
      dispatch(hideMessage())
    }, time * 1000)
  }
}

export const { hideMessage, showMessage } = notificationSlice.actions
export default notificationSlice.reducer
