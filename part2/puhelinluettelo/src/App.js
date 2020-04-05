import React, { useState, useEffect } from 'react';
import personService from './services/persons';

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
      personService.addPerson(newPerson)
        .then((addedPerson) => {
          setPersons(persons.concat(addedPerson));
          setNewName(''); 
          setNewNumber(''); 
      });
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

const Persons = ({ persons, filter, setPersons }) => {
  const onClickDelete = (deletedPerson) => {

    if (!window.confirm(`delete ${deletedPerson.name}?`)) {
      return;
    }

    personService.deletePerson(deletedPerson.id);
    setPersons(persons.filter((person) => {
      return person.id !== deletedPerson.id;
    }));
  };

  return (
    <div>
      <ul>
        {persons.map((person) => {
          if (filter === '' || person.name.toLowerCase().includes(filter.toLowerCase())) {
            return (
              <li key={person.id}>{person.name} {person.number}
              <button onClick={() => onClickDelete(person)}>delete</button>
              </li>
            );  
          } 
          return false;
        })}
      </ul>
    </div>
  );
}

const App = () => {
  const [persons, setPersons] = useState([]);

  useEffect(() => {
    personService.getAll()
      .then((persons) => {
        setPersons(persons);
      })
  }, []);
  
  const [ filter, setFilter ] = useState('');

  return (
    <div>
      <h2>Phonebook</h2>
      <PersonForm persons={persons} setPersons={setPersons} />
      <h2>Numbers</h2>
      <Filter filter={filter} setFilter={setFilter} />
      <Persons persons={persons} filter={filter} setPersons={setPersons} />
    </div>
  )
}

export default App;