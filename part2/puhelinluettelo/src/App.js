import React, { useState } from 'react'

const App = () => {
  const [ persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]);
  const [ newName, setNewName ] = useState('');
  const [ newNumber, setNewNumber ] = useState('');

  const addPerson = (event) => {
    event.preventDefault();

    const newPerson = {
      name: newName,
      number: newNumber,
    };
    if (!persons.some((person) => { 
      return person.name === newName;
    })) {
      setPersons(persons.concat(newPerson));
      setNewName(''); 
      setNewNumber(''); 
    } else {
      alert(`${newName} is already in phonebook`);
    }
  }

  const onChangeNewName = (event) => {
    setNewName(event.target.value);
  }
  const onChangeNewNumber = (event) => {
    setNewNumber(event.target.value);
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={onChangeNewName}/>
        </div>
        <div>
          number: <input value={newNumber} onChange={onChangeNewNumber}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
        <ul>
          {persons.map((person) => {
            return (
              <li key={person.name}>{person.name} {person.number}</li>
            );
          })}
        </ul>
    </div>
  )
}

export default App;