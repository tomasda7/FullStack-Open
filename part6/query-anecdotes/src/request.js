import axios from 'axios'

const baseURL = 'http://localhost:3001/anecdotes'

export const getAll = async () => {
  const response = await axios.get(baseURL)
  return response.data
}

export const createNew = async (newAnecdote) => {
  const response = await axios.post(baseURL, newAnecdote)
  return response.data
}

export const voteAnec = async (anecdote) => {
  const response = await axios.put(`${baseURL}/${anecdote.id}`, anecdote)
  return response.data
}
