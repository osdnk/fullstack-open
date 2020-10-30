import React from "react";

const Header = ({ course }) => <h1>{course}</h1>;

const Part = ({ name, exercises }) => (
  <p>
    {name}: {exercises}
  </p>
);

const Content = ({ parts }) => (
  <div>
    {parts.map(({ exercises, id, name }) => (
      <Part key={id} name={name} exercises={exercises} />
    ))}
  </div>
);


const Total = ({ parts }) => (
  <p>
    Total of {parts.map(({ exercises }) => exercises).reduce((a, b) => a + b)} exercises
  </p>
);

const Course = ({ course }) => {
  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  );
};


export default Course
