import React, { useState } from 'react'
import ReactDOM from 'react-dom';
import './index.css';

const StatisticsLine = (props) => {
  const { text, value } = props;
  return (
    <div>{text} {value}</div>
  );
} 

const Statistics = (props) => {
  const { good, neutral, bad } = props;
  if (!(good || bad || neutral)) {
    return (
      <StatisticsLine text="No feedback given" />
    );
  }
  return (
    <>
      <StatisticsLine text="good" value={good}/>
      <StatisticsLine text="neutral" value={neutral}/>
      <StatisticsLine text="bad" value={bad}/>
      <StatisticsLine text="all" value={good + neutral + bad}/>
      <StatisticsLine text="average" value={(good * 1 + bad * -1) / (good + neutral + bad)}/>
      <StatisticsLine text="positive" value={good / (good + neutral + bad)}/>
    </>
  )
}

const Button = (props) => {
  const { value, setValue, label } = props;
  return (
    <button onClick={() => { setValue(value + 1); }}>{label}</button>
  ); 
};

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <div>
        <h1>give feedback</h1>
        <Button label="good" value={good} setValue={setGood}/>
        <Button label="neutral" value={neutral} setValue={setNeutral}/>
        <Button label="bad" value={bad} setValue={setBad}/>
        <h1>statistics</h1>
        <Statistics good={good} bad={bad} neutral={neutral} />
    </div>
  );
};

ReactDOM.render(<App />, 
  document.getElementById('root'),
)
