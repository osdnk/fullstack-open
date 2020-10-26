import React, { useState } from "react";
import ReactDOM from "react-dom";

import "./index.css";


const Statistics = ({ good, neutral, bad }) => {
  if (good === 0 && bad === 0 && neutral === 0) {
    return (
      <div>
        <h1>Statistics</h1>
        No feedback given.
      </div>
    );
  }

  const total = good + neutral + bad;

  return (
    <div>
      <h1>Statistics</h1>
      <table>
        <tbody>
        <Statistic value={good} text="good" />
        <Statistic value={neutral} text="neutral" />
        <Statistic value={bad} text="bad" />
        <Statistic value={total} text="all" />
        <Statistic value={(good - bad) / total} text="average" />
        <Statistic
          value={`${((good / total) * 100)}%`}
          text="positive"
        />
        </tbody>
      </table>
    </div>
  );
};

const Statistic = ({ text, value }) => (
  <tr>
    <td>{text}</td>
    <td>
      <strong>{value}</strong>
    </td>
  </tr>
);

const Button = ({ title, onClick }) => (
  <button onClick={onClick}>{title}</button>
);

const inc = prev => prev + 1

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <div>
      <h1>Give Feedback</h1>
      <Button title="Good" onClick={() => setGood(inc)} />
      <Button title="Neutral" onClick={() => setNeutral(inc)} />
      <Button title="Bad" onClick={() => setBad(inc)} />
      <Statistics {...{ good, bad, neutral }} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
