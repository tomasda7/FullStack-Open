import { useState } from 'react';

const Header = ({title}) => {
  return (
    <>
      <h1>{title}</h1>
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

const Statistics = ({good, neutral, bad, score, total}) => {

  if(good !== 0 || neutral !== 0 || bad !== 0) {
    return (
      <>
        <h3>goods: {good}</h3>
        <h3>neutrals: {neutral}</h3>
        <h3>bads: {bad}</h3>
        <h3>all: {total}</h3>
        <h3>average: {score / total}</h3>
        <h3>positive: {(good / total) * 100}</h3>
      </>
    )
  } else {
    return (
      <h2>No feedback given</h2>
    )
  }
}

const App = () => {

  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const [score, SetScore] = useState(0);
  let total = good + neutral + bad;

  const handleGood = () => {
    setGood(good + 1);
    SetScore(score + 1);
  };
  const handleNeutral = () => {
    setNeutral(neutral + 1);
  };
  const handleBad = () => {
    setBad(bad + 1);
    SetScore(score - 1);
  };

  return (
    <div>
      <Header title={'Give Feedback'} />
      <Button handleClick={handleGood} text={'good'} />
      <Button handleClick={handleNeutral} text={'neutral'} />
      <Button handleClick={handleBad} text={'bad'} />
      <Header title={'statistics'} />
      <Statistics
        good={good}
        neutral={neutral}
        bad={bad}
        score={score}
        total={total}
      />
    </div>
  );
}

export default App;
