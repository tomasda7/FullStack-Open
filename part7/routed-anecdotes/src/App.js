import { useState } from 'react'
import { Routes, Route, Link, useNavigate, useMatch } from 'react-router-dom'
import { useField } from './hooks'

const Menu = () => {
  const padding = {
    paddingRight: 5
  }

  return (
    <div>
      <Link style={padding} to={'/about'}>about</Link>
      <Link style={padding} to={'/create'}>create new</Link>
      <Link style={padding} to={'/'}>anecdotes</Link>
    </div>
  )
}

const AnecdoteList = ({ anecdotes }) => (
  <div>
    <h2>Anecdotes</h2>
    <ul>
      {anecdotes.map(anecdote =>
      <li key={anecdote.id}>
        <Link to={`/anecdotes/${anecdote.id}`}>{anecdote.content}</Link>
      </li>)}
    </ul>
  </div>
)

const Anecdote = ({ anecdote, handleVote }) => {
  return (
    <>
      <h2>{anecdote.content} by {anecdote.author}</h2>
      <div>has {anecdote.votes} votes</div>
      <button onClick={() => handleVote(anecdote.id)}>vote</button>
      <div>for more info visit <a href={`${anecdote.info}`}>{anecdote.info}</a></div>
    </>
  )
}

const About = () => (
  <div>
    <h2>About anecdote app</h2>
    <p>According to Wikipedia:</p>

    <em>An anecdote is a brief, revealing account of an individual person or an incident.
      Occasionally humorous, anecdotes differ from jokes because their primary purpose is not simply to provoke laughter but to reveal a truth more general than the brief tale itself,
      such as to characterize a person by delineating a specific quirk or trait, to communicate an abstract idea about a person, place, or thing through the concrete details of a short narrative.
      An anecdote is "a story with a point."</em>

    <p>Software engineering is full of excellent anecdotes, at this app you can find the best and add more.</p>
  </div>
)

const Footer = () => {
  const padding = {
    paddingTop: 5
  }

  return (
    <div style={padding}>
      Anecdote app for <a href='https://fullstackopen.com/'>Full Stack Open</a>.

      See <a href='https://github.com/fullstack-hy2020/routed-anecdotes/blob/master/src/App.js'>https://github.com/fullstack-hy2020/routed-anecdotes/blob/master/src/App.js</a> for the source code.
    </div>
  )
}

const CreateNew = ({ addNew }) => {
  const { reset: resetContent, ...content } = useField('text')
  const { reset: resetAuthor, ...author } = useField('text')
  const { reset: resetInfo, ...info } = useField('text')
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    addNew({
      content: content.value,
      author: author.value,
      info: info.value,
      votes: 0
    })
    navigate('/')
  }

  const handleReset = () => {
    resetContent()
    resetAuthor()
    resetInfo()
  }

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input { ...content } />
        </div>
        <div>
          author
          <input { ...author } />
        </div>
        <div>
          url for more info
          <input { ...info } />
        </div>
        <button type='submit'>create</button>
        <button type='button' onClick={() => handleReset()}>reset</button>
      </form>
    </div>
  )
}

const App = () => {
  const [anecdotes, setAnecdotes] = useState([
    {
      content: 'If it hurts, do it more often',
      author: 'Jez Humble',
      info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
      votes: 0,
      id: 1
    },
    {
      content: 'Premature optimization is the root of all evil',
      author: 'Donald Knuth',
      info: 'http://wiki.c2.com/?PrematureOptimization',
      votes: 0,
      id: 2
    }
  ])

  const [notification, setNotification] = useState('')

  const addNew = (anecdote) => {
    anecdote.id = Math.round(Math.random() * 10000)

    setAnecdotes(anecdotes.concat(anecdote))

    setNotification(`"${anecdote.content}" by ${anecdote.author} was added.`)

    setTimeout(() => {
      setNotification('')
    },5000)
  }

  const anecdoteById = (id) =>
    anecdotes.find(a => a.id === id)

  const vote = (id) => {
    const anecdote = anecdoteById(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    }

    setAnecdotes(anecdotes.map(a => a.id === id ? voted : a))
  }

  const match = useMatch('/anecdotes/:id')

  const anecdote = match
  ? anecdotes.find(a => a.id === Number(match.params.id))
  : null

  return (
    <div>
      <div>
        <h1>Software anecdotes</h1>
        <Menu />
        <h4>{notification}</h4>
      </div>

      <Routes>
        <Route path='/anecdotes/:id' element={ <Anecdote anecdote={anecdote} handleVote={vote} /> }/>
        <Route path='/about' element={ <About /> }/>
        <Route path='/create' element={ <CreateNew addNew={addNew}/> }/>
        <Route path='/' element={ <AnecdoteList anecdotes={anecdotes} /> }/>
      </Routes>

      <Footer />
    </div>
  )
}

export default App
