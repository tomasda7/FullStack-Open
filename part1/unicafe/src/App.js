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


const App = () => {

  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const handleGood = () => setGood(good + 1);
  const handleNeutral = () => setNeutral(neutral + 1);
  const handleBad = () => setBad(bad + 1);


  return (
    <div>
      <Header title={'Give Feedback'} />
      <Button handleClick={handleGood} text={'good'} />
      <Button handleClick={handleNeutral} text={'neutral'} />
      <Button handleClick={handleBad} text={'bad'} />

      <Header title={'statistics'} />
      <h3>goods: {good}</h3>
      <h3>neutrals: {neutral}</h3>
      <h3>bads: {bad}</h3>
    </div>
  );
}

export default App;
