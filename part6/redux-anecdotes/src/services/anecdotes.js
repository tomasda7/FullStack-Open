import axios from 'axios'

const baseURL = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await axios.get(baseURL)
  return response.data
}

const createNew = async (content) => {
  const anecObj = { content: content, votes: 0 }
  const response = await axios.post(baseURL, anecObj)
  return response.data
}

const update = async (id, obj) => {
  const response = await axios.put(`${baseURL}/${id}`, obj)
  return response.data
}

const anecServices = { getAll, createNew, update }

export default anecServices
