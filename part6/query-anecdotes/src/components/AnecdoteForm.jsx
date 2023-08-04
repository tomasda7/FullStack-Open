import { useMutation, useQueryClient } from "react-query"
import { createNew } from "../request"
import { useContext } from "react"
import AnecdotesContext from "../AnecdotesContext"

const AnecdoteForm = () => {
  const [message, messageDispatch] = useContext(AnecdotesContext)

  const queryClient = useQueryClient()

  const newAnecdoteMutation = useMutation(createNew, {
    onSuccess: () => {
      queryClient.invalidateQueries('anecdotes')
    }
  })

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    newAnecdoteMutation.mutate({
      content: content,
      votes: 0
    })

    messageDispatch({ type: 'SHOW', payload: `"${content}" created successfully!` })
    console.log(message)
    setTimeout(() => {
      messageDispatch({ type: 'HIDE' })
    }, 5000)
  }

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
