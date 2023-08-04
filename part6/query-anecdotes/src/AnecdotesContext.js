import { createContext, useContext, useReducer } from "react"

const notificationReducer = (state, action) => {
  switch (action.type) {
      case 'SHOW':
        state = action.payload
        return state
      case 'HIDE':
        state = null
        return state
      default:
        return state
    }
}

const AnecdotesContext = createContext()

export const AnecdotesContextProvider = (props) => {
  const [message, messageDispatch] = useReducer(notificationReducer, null)

  return (
    <AnecdotesContext.Provider value={ [message, messageDispatch] }>
      {props.children}
    </AnecdotesContext.Provider>
    )
}

export const useNotificationValue = () => {
    const messageAndDispatch = useContext(AnecdotesContext)
    return messageAndDispatch[0]
}

export const useNotificationDispatch = () => {
    const messageAndDispatch = useContext(AnecdotesContext)
    return messageAndDispatch[1]
}

export default AnecdotesContext
