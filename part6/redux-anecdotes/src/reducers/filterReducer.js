const filterReducer = (state = '', action) => {
  console.log('ACTION ', action)
  switch (action.type) {
    case 'CHANGE':
      state = action.payload
      return state
    default:
      return state
  }
}

export const filterChange = (text) => {
  return {
    type: 'CHANGE',
    payload: text
  }
}

export default filterReducer
