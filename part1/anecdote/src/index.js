import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const incrementPoints = (idx, setPoints) => setPoints(prev => ({ ...prev, [idx]: (prev[idx] || 0) + 1 }))

const TopAnecdote = ({ points }) => {
  const top = Object.entries(points).sort((a, b) => b[1] - a[1])[0]
  return top === undefined ? null : anecdotes[top[0]]
}

const App = (props) => {
  const [selected, setSelected] = useState(randAnIdx)
  const [points, setPoints] = useState({})

  return (
    <div>
      <table>
        <tbody>
        <tr>
          <td>
            <h2>Anecdote of the day</h2>
          </td>
        </tr>
        <tr>
          <td>
            {props.anecdotes[selected]}
          </td>
        </tr>
          <tr>
            <td>
              <button onClick={() => setSelected(randAnIdx())}> Next </button>
            </td>
            <td>
              <button onClick={() => incrementPoints(selected, setPoints)}> Vote </button>
            </td>
          </tr>
          <tr>
            <td>
              Has {points[selected] || 0} votes
            </td>
          </tr>
          <tr>
            <td>
              <h2>Anecdote with the most votes</h2>
            </td>
          </tr>
          <tr>
            <td>
              <TopAnecdote points={points}/>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

const randAnIdx = () => Math.floor(Math.random() * anecdotes.length)

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)
