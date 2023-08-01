import { useDispatch, useSelector } from "react-redux"
import { voteAnecdote } from "../reducers/anecdoteReducer"

const Anecdote = ({ anecdote, handleVote }) => {
  return (
    <li>
      <div>
        {anecdote.content}
      </div>
      <div>
        has {anecdote.votes}
        <button onClick={handleVote}>vote</button>
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

  return (
    <>
      <ul style={style}>
        {sortedAnecdotes.map(anecdote =>
          <Anecdote
          key={anecdote.id}
          anecdote={anecdote}
          handleVote={() => dispatch(voteAnecdote(anecdote.id))}
          />
        )}
      </ul>
    </>
  )
}

export default Anecdotes
