import { useDispatch } from "react-redux"
import { createAnecdote } from "../reducers/anecdoteReducer"
import { showMessage, hideMessage } from "../reducers/notificationReducer"
import anecServices from "../services/anecdotes"

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const addAnecdote = async (e) => {
      e.preventDefault()
      const content = e.target.anecdote.value
      e.target.anecdote.value = ''
      const newAnecdote = await anecServices.createNew(content)
      dispatch(createAnecdote(newAnecdote))
      dispatch(showMessage(`"${content}" created successfully!`))
      setTimeout(() => {
        dispatch(hideMessage())
      }, 5000)
    }

  return (
    <>
      <h2>create new</h2>
        <form onSubmit={addAnecdote}>
        <div><input name='anecdote'/></div>
        <button type='submit'>create</button>
      </form>
    </>
  )
}

export default AnecdoteForm
