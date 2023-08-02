import anecServices from '../services/anecdotes'
import { createSlice } from '@reduxjs/toolkit'

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    updateAnecdote(state, action) {
      return state.map(anecdote => anecdote.id !== action.payload.id ? anecdote : action.payload)
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

export const voteAnecdote = (id) => {
  return async (dispatch) => {
    const anecdotes = await anecServices.getAll()

    const anecToVote = anecdotes.find(anecdote => anecdote.id === id)

    const anecUpd = {
      ...anecToVote,
      votes: anecToVote.votes + 1
    }

    const updatedObj = await anecServices.update(id, anecUpd)

    dispatch(updateAnecdote(updatedObj))
  }
}

export const { updateAnecdote, setAnecdotes, appendAnecdote } = anecdoteSlice.actions
export default anecdoteSlice.reducer
