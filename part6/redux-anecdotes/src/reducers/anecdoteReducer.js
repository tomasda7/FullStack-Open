import { createSlice } from '@reduxjs/toolkit'

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    voteAnecdote(state, action) {
      const anecToVote = state.find(anecdote => anecdote.id === action.payload)
      const anecUpd = {
        ...anecToVote,
        votes: anecToVote.votes + 1
      }

      return state.map(anecdote => anecdote.id !== anecToVote.id ? anecdote : anecUpd)
    },
    createAnecdote(state, action) {
      const newAnecdote = action.payload

      return [...state, newAnecdote]
    },
    setAnecdotes(state, action) {
      return action.payload
    }
  }
})

export const { voteAnecdote, createAnecdote, setAnecdotes } = anecdoteSlice.actions
export default anecdoteSlice.reducer
