import { createSlice } from '@reduxjs/toolkit'

const initialState = ''

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    byContent(state, action) {
      const text = action.payload
      state = text
      return state
    }
  }
})

export const { byContent } = filterSlice.actions
export default filterSlice.reducer
