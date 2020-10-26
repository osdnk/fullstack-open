import React from "react";
import ReactDOM from "react-dom";

import "./index.css";

const Header = ({ course }) => <h1>{course}</h1>;

const Part = ({ name, exercises }) => (
  <p>
    {name}: {exercises}
  </p>
);

const Content = ({ parts }) => (
  <div>
    {parts.map(({ exercises, name }) => (
      <Part name={name} exercises={exercises} />
    ))}
  </div>
);


const Total = ({ parts }) => (
  <p>
    Number of exercises {parts.map(({ exercises }) => exercises).reduce((a, b) => a + b)}
  </p>
);

const course = {
  name: 'Half Stack application development',
  parts: [
    {
      name: 'Fundamentals of React',
      exercises: 10
    },
    {
      name: 'Using props to pass data',
      exercises: 7
    },
    {
      name: 'State of a component',
      exercises: 14
    }
  ]
}


const App = () => {

  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));