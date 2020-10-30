import React, { useState } from 'react'
import ReactDOM from "react-dom";

const Person = ({ person }) => {
  // const onClick = async () => {
  //   if (!window.confirm(`Delete ${person.name}?`)) {
  //     return;
  //   }
  //
  //   try {
  //     await api.delete(person.id).then(() => onDelete());
  //   } catch (error) {
  //     setError(
  //       `Information about ${person.name} doesn't exist on the server (already?).`
  //     );
  //   }
  // };

  return (
    <p>
      Name: {person.name} -- Number: {person.number}
    </p>
  );
};


const Form = ({ onSubmit, onNameChange, newName, onNumberChange, newNumber }) => (
  <>
    <h2>Add </h2>
    <form onSubmit={onSubmit}>
      <div>
        name: <input onChange={onNameChange} value={newName} />
      </div>
      <div>
        number: <input onChange={onNumberChange} value={newNumber} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  </>
)


const Persons = ({ persons, filter }) => (
  <>
    <h2>Numbers</h2>
    {persons
      .filter(({ name }) => name.toLowerCase().startsWith(filter.toLowerCase()))
      .map((person) =>
        <Person person={person} key={person.name} />
      )}
  </>
)


const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas', number: "1231234" }
  ])

  const [ filter, setFilter ] = useState('');
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('');

  const onNameChange = (event) => {
    setNewName(event.target.value);
  };

  const onNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const onFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    const person = { name: newName, number: newNumber };
    if (persons.findIndex(({ name }) => name === newName) !== -1) {
      alert(`${newName} is already added to phonebook`)
      return;
    }
    setPersons(prev => [...prev, person])
    setNewName("")
    setNewNumber("")
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        Filter: <input onChange={onFilterChange} value={filter} />
      </div>

      <Form {...{ onSubmit, onNameChange, newName, onNumberChange, newNumber }}/>
      <Persons {...{ persons, filter }} />

    </div>
  )
}


ReactDOM.render(<App />, document.getElementById("root"));
