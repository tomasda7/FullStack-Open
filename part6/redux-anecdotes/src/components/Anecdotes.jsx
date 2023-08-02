import { useDispatch, useSelector } from "react-redux"
import { voteAnecdote } from "../reducers/anecdoteReducer"
import { showMessage, hideMessage } from "../reducers/notificationReducer"

const Anecdote = ({ anecdote, handleVote }) => {
  return (
    <li>
      <div>
        {anecdote.content}
      </div>
      <div>
        has {anecdote.votes}
        <button onClick={() => handleVote(anecdote.id, anecdote.content)}>vote</button>
      </div>
    </li>
  )
}

const Anecdotes = () => {
  const dispatch = useDispatch()

  const anecdotes = useSelector(({ anecdotes, filter }) => {
    return anecdotes.filter(anecdote =>
      anecdote.content.toLocaleLowerCase().includes(filter.toLocaleLowerCase())
    )
  })

  const sortedAnecdotes = anecdotes.sort((a,b) => b.votes - a.votes)

  const style =  {
    listStyleType: 'none'
  }

  const handleVote = (id, content) => {
    dispatch(voteAnecdote(id))
    dispatch(showMessage(`you voted "${content}"`))
    setTimeout(() => {
      dispatch(hideMessage())
    }, 5000)
  }

  return (
    <>
      <ul style={style}>
        {sortedAnecdotes.map(anecdote =>
          <Anecdote
          key={anecdote.id}
          anecdote={anecdote}
          handleVote={handleVote}
          />
        )}
      </ul>
    </>
  )
}

export default Anecdotes
