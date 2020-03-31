import React from 'react';
import ReactDOM from 'react-dom';

const Header = (props) => {
  return (
    <h2>{props.course}</h2>
    )
};  

const Part = (props) => {
  return (
    <p>{props.part} {props.exercises}</p>
  )
}

const Content = ({ parts }) => {
  return (
    <div>
      {parts.map((part) => 
        <Part part={part.name} exercises={part.exercises} />
      )}
    </div>
  );
};
    
const Total = (props) => {
  return (
    <h3>Number of exercises {props.exercises}</h3>
  )
};

const Course = ({ course }) => {
  const total = course.parts.reduce((acc, part) => acc + part.exercises, 0);

  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total exercises={total}/>
    </div>
  )
}

const App = () => {
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10,
          id: 1
        },
        {
          name: 'Using props to pass data',
          exercises: 7,
          id: 2
        },
        {
          name: 'State of a component',
          exercises: 14,
          id: 3
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    }, 
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ];

  return (
    <div>
      <h1>Web development curriculum</h1>
      {courses.map((course) => 
        <Course course={course} />
      )}
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));