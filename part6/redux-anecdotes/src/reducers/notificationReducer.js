import { createSlice } from "@reduxjs/toolkit"

const initialState = null

const notificationSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    showMessage(state, action) {
      state = action.payload
      return state
    },
    hideMessage(state, action) {
      state = null
      return state
    }
  }
})

export const setNotification = (text, time) => {
  return async (dispatch) => {
    dispatch(showMessage(text))

    setTimeout(() => {
      dispatch(hideMessage())
    }, time * 1000)
  }
}

export const { showMessage, hideMessage } = notificationSlice.actions
export default notificationSlice.reducer
