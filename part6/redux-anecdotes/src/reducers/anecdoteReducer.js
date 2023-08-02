import anecServices from '../services/anecdotes'
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
    appendAnecdote(state, action) {
      return [...state, action.payload]
    },
    setAnecdotes(state, action) {
      return action.payload
    }
  }
})

export const initalizeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecServices.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdote = (content) => {
  return async (dispatch) => {
    const newAnecdote = await anecServices.createNew(content)
    dispatch(appendAnecdote(newAnecdote))
  }
}

export const { voteAnecdote, setAnecdotes, appendAnecdote } = anecdoteSlice.actions
export default anecdoteSlice.reducer
