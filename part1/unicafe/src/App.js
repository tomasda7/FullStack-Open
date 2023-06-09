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

const StatisticLine = ({text, value}) => {
  return (
    <tbody>
      <tr>
        <th>{text}</th>
        <td>{value}</td>
      </tr>
    </tbody>
  )
}

const Statistics = ({good, neutral, bad, score, total}) => {

  if(good !== 0 || neutral !== 0 || bad !== 0) {
    return (
      <>
        <table>
          <StatisticLine text='good' value={good}/>
          <StatisticLine text='neutral' value={neutral}/>
          <StatisticLine text='bad' value={bad}/>
          <StatisticLine text='all' value={total}/>
          <StatisticLine text='average' value={score / total}/>
          <StatisticLine text='positive' value={(good / total) * 100 + ' %'}/>
        </table>
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
      <Header title={'Statistics'} />
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
