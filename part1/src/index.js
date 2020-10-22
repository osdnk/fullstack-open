import React from "react";
import ReactDOM from "react-dom";

import "./index.css";

const Header = ({ course }) => <h1>{course}</h1>;

const Part = ({ title, noe }) => (
  <p>
    {title}: {noe}
  </p>
);

const Content = ({ parts }) => (
  <div>
    {parts.map(({ noe, title }) => (
      <Part title={title} noe={noe} />
    ))}
  </div>
);


const Total = ({ parts }) => (
  <p>
    Number of exercises {parts.map(({ noe }) => noe).reduce((a, b) => a + b)}
  </p>
);

const course = 'Half Stack application development'
const parts = [
  {
    title: "Fundamentals of React",
    noe: 10,
  },
  {
    title: "Using props to pass data",
    noe: 7,
  },
  {
    title: "State of a component",
    noe: 14,
  },
]

const App = () => {

  return (
    <div>
      <Header course={course} />
      <Content parts={parts} />
      <Total parts={parts} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));