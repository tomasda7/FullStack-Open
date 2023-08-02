import { createSlice } from "@reduxjs/toolkit"

const initialState = 'this is a notification message'

const notificationSlice = createSlice({
    name: 'notifications',
    initialState,
    showMessage(state, action) {
        return state
    }
})

export const { showMessage } = notificationSlice.actions
export default notificationSlice.reducer
