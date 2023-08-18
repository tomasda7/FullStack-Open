import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

export const setToken = (newToken) => {
  token = `Bearer ${newToken}`
}

export const getAll = async () => {
  const request = await axios.get(baseUrl)
  return request.data
}

export const create = async (newObj) => {
  const config = {
    headers: { Authorization: token }
  }

  const response = await axios.post(baseUrl, newObj, config)
  return response.data
}

export const update = async (id, newObj) => {
  const response = await axios.put(`${baseUrl}/${id}`, newObj)
  return response.data
}

export const addComment = async (id, content) => {
  const response = await axios.post(`${baseUrl}/${id}/comments`, content)
  return response.data
}

export const remove = async (id) => {
  const config = {
    headers: { Authorization: token }
  }

  const response = await axios.delete(`${baseUrl}/${id}`, config)
  return response.data
}
