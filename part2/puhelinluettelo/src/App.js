import React, { useState } from 'react'

const Filter = ({ filter, setFilter }) => {
  const onChangeFilter = (event) => {
    setFilter(event.target.value);
  }

  return (
    <div>
      <input value={filter} onChange={onChangeFilter} />
    </div>
  );
};

const PersonForm = ({ persons, setPersons }) => {
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
  );
};

const Persons = ({ persons, filter}) => {
  return (
    <div>
      <ul>
        {persons.map((person) => {
          if (filter === '' || person.name.toLowerCase().includes(filter.toLowerCase())) {
            return (
              <li key={person.name}>{person.name} {person.number}</li>
            );  
          } 
          return false;
        })}
      </ul>
    </div>
  );
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ]);
  
  const [ filter, setFilter ] = useState('');


  return (
    <div>
      <h2>Phonebook</h2>
      <PersonForm persons={persons} setPersons={setPersons} />
      <h2>Numbers</h2>
      <Filter filter={filter} setFilter={setFilter} />
      <Persons persons={persons} filter={filter} />
    </div>
  )
}

export default App;