import { useQuery } from 'react-query'
import { getAll } from './request'

import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'

const App = () => {

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
            <button>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
