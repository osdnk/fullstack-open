import React, { useState, useEffect } from 'react'
import ReactDOM from "react-dom";
import { getAll, create, remove, update } from "./phonebookService";
import Message from "./Message";

const Person = ({ person, deleteItem, setMessage }) => {
  const removeItem = () => remove(person.id).then(deleteItem(person.id)).catch(() => {
    setMessage({ message: "Didn't manage to remove number", positive: false })
  })
  return (
    <p>
      Name: {person.name} -- Number: {person.number}
      <button onClick={removeItem} >DELETE</button>
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


const Persons = ({ persons, filter, deleteItem, setMessage }) => (
  <>
    <h2>Numbers</h2>
    {persons
      .filter(({ name }) => name.toLowerCase().startsWith(filter.toLowerCase()))
      .map((person) =>
        <Person person={person} key={person.name} deleteItem={deleteItem} setMessage={setMessage} />
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
  const [ message, setMessage ] = useState({ massage: '', positive: true });

  const onNameChange = (event) => {
    setNewName(event.target.value);
  };

  const onNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const onFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const deleteItem = id => setPersons(prev => prev.filter(p => p.id !== id))


  const onSubmit = (event) => {
    event.preventDefault();
    const person = { name: newName, number: newNumber };
    const foundItem = persons.find(({ name }) => name === newName)
    if (foundItem) {
      if (window.confirm(`${newName} is already added to phonebook. Update?`)) {
        update(foundItem.id, person).then((data) => {
          setMessage({ message: "Number changed", positive: true })
          setPersons(prev => [...prev.filter(p => p.id !== foundItem.id), data])
        })
      }
      return;
    }
    create(person).then((data) => {
      setMessage({ message: "Number added", positive: true })
      setPersons(prev => [...prev, data])
    }).catch(() => alert("Error"))
    setNewName("")
    setNewNumber("")
  }

  const fetchPersons = () => {
    getAll().then((data) => {
      setMessage({ message: "fetched all", positive: true })
      setPersons(data)
    }).catch(() => alert("Error"))
  };


  useEffect(fetchPersons, []);

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        Filter: <input onChange={onFilterChange} value={filter} />
      </div>
      <Message {...message} />

      <Form {...{ onSubmit, onNameChange, newName, onNumberChange, newNumber }}/>
      <Persons {...{ persons, filter, deleteItem, setMessage }} />

    </div>
  )
}


ReactDOM.render(<App />, document.getElementById("root"));
