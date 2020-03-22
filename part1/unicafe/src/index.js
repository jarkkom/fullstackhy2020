import React, { useState } from 'react'
import ReactDOM from 'react-dom';
import './index.css';

const Statistics = (props) => {
  const { good, neutral, bad } = props;
  console.log(props);
  return (
    <>
      <div>good {good}</div>
      <div>neutral {neutral}</div>
      <div>bad {bad}</div>
      <div>all {good + neutral + bad}</div>
      <div>average {(good * 1 + bad * -1) / (good + neutral + bad)}</div>
      <div>positive {good / (good + neutral + bad)}</div>
    </>
  )
}

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <div>
        <h1>give feedback</h1>
        <button onClick={() => { setGood(good + 1); }}>good</button>
        <button onClick={() => { setNeutral(neutral + 1); }}>neutral</button>
        <button onClick={() => { setBad(bad + 1); }}>bad</button>
        <h1>statistics</h1>
        <Statistics good={good} bad={bad} neutral={neutral} />
    </div>
  );
};

ReactDOM.render(<App />, 
  document.getElementById('root'),
)
