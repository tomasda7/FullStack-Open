import { useQuery, useMutation, useQueryClient } from 'react-query'
import { getAll, voteAnec } from './request'
import AnecdotesContext from './AnecdotesContext'
import { useContext } from 'react'

import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'

const App = () => {
  const [message, messageDispatch] = useContext(AnecdotesContext)

  const queryClient = useQueryClient()

  const updateMutation = useMutation(voteAnec, {
    onSuccess: () => {
      queryClient.invalidateQueries('anecdotes')
    }
  })

  const handleVote = (anecdote) => {
    updateMutation.mutate({ ...anecdote, votes: anecdote.votes + 1 })

    messageDispatch({ type: 'SHOW', payload: `you voted "${anecdote.content}"` })
    console.log(message)

    setTimeout(() => {
      messageDispatch({ type: 'HIDE' })
    }, 5000)
  }

  const { isLoading, isError, data, error } = useQuery('anecdotes', getAll, { retry: 1 })

  console.log(data)

  if(isLoading) {
    return <div>Loading...</div>
  }

  if(isError) {
    return <div>Error: {error.message}</div>
  }

  const anecdotes = data

  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification />
      <AnecdoteForm />

      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
