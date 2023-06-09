import { useState } from 'react';

const Header = ({title}) => {
  return (
    <>
      <h2>{title}</h2>
    </>
  )
}

const Button = ({handleClick, text}) => {
  return (
    <>
      <button onClick={handleClick}>
        {text}
      </button>
    </>
  )
}

const Anecdote = ({anecdotes, selected, points}) => {
  return (
    <>
      <p>{anecdotes[selected]}</p>
      <p>has {points[selected]} votes</p>
    </>
  )
}

const App = () => {

  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]


  const [selected, Setselected] = useState(0);
  const [points, setPoints] = useState(new Uint8Array(anecdotes.length))

  let mostVoted = points.indexOf(Math.max(...points));


  const handleSelected = () => {
    const random = Math.floor(Math.random() * anecdotes.length);
    Setselected(random);
  }

  const handleVote = () => {
    const copy = [...points];
    copy[selected] += 1;
    setPoints(copy);
  }


  return (
    <div>
      <Header title='Anecdote of the day'/>
      <Anecdote anecdotes={anecdotes} selected={selected} points={points}/>
      <Button text='next anecdote' handleClick={handleSelected} />
      <Button text='vote' handleClick={handleVote} />
      <Header title='Most voted anecdote'/>
      <p>{anecdotes.filter((anec,i) => i === mostVoted)}</p>
      <p>has {Math.max(...points)} votes</p>
    </div>
  );
}

export default App;
