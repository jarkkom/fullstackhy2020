import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const Anecdote = (props) => {
  const { anecdotes, points, index} = props;
  return (
    <>
      <div>{anecdotes[index]}</div>
      <div>has {points[index]} votes</div>
    </>
  );
}

const MostVotes = (props) => {
  const { anecdotes, points } = props;
  const sorted = [...points];
  sorted.sort();
  const highest = points.indexOf(sorted.pop());
  return (
    <Anecdote index={highest} points={points} anecdotes={anecdotes} />
  );
};

const Vote = (props) => {
  const { points, setPoints, selected } = props;
  return (
    <button onClick={() => { 
      const newPoints = [...points];
      newPoints[selected] += 1;
      setPoints(newPoints);
    }}>vote</button>
  );
};

const App = (props) => {
  const [selected, setSelected] = useState(0);
  const [points, setPoints] = useState(new Array(props.anecdotes.length).fill(0));

  const { anecdotes } = props;

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <Anecdote index={selected} points={points} anecdotes={anecdotes} />
      <div>
        <Vote points={points} setPoints={setPoints} selected={selected}/>
        <button onClick={() => { setSelected(Math.floor(Math.random() * anecdotes.length)); }}>next anecdote</button>
      </div>
      <h1>Anecdote with most votes</h1>
      <MostVotes points={points} anecdotes={anecdotes} />
    </div>    
  );
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
];

ReactDOM.render(
  <App anecdotes={anecdotes}/>,
  document.getElementById('root')
);