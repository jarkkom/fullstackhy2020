import React from 'react';

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


export default Course;