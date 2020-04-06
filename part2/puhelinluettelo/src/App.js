import React, { useState, useEffect } from 'react';
import personService from './services/persons';

const Notification = ({message}) => {
  if (!message) {
    return (<></>);
  }
  return (
    <div className='notification'>{message}</div>
  )
};

const Error = ({message}) => {
  if (!message) {
    return (<></>);
  }
  return (
    <div className='error'>{message}</div>
  )
};

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

const PersonForm = ({ persons, setPersons, setMessage }) => {
  const [ newName, setNewName ] = useState('');
  const [ newNumber, setNewNumber ] = useState('');

  const addPerson = (event) => {
    event.preventDefault();

    const newPerson = {
      name: newName,
      number: newNumber,
    };

    const existingPerson = persons.find(p => p.name === newName);
    if (!existingPerson) {
      personService.addPerson(newPerson)
        .then((addedPerson) => {
          setPersons(persons.concat(addedPerson));
          setNewName(''); 
          setNewNumber(''); 
          setMessage(`Added ${addedPerson.name}`);
          setTimeout(() => {
            setMessage(null);
          }, 5000);
        });
    } else {
      if (!window.confirm(`${existingPerson.name} is already in phonebook, replace the phonenumber?`)) {
        return;
      };

      const changedPerson = {
        ...existingPerson,
        ...newPerson,
      };

      personService.changePerson(changedPerson)
        .then((changedPerson) => {
          setPersons(persons.map((p) => {
            return p.id !== changedPerson.id ? p : changedPerson;
          }));

          setNewName(''); 
          setNewNumber(''); 
        });
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

const Persons = ({ persons, filter, setPersons, setMessage, setError }) => {
  const onClickDelete = (deletedPerson) => {

    if (!window.confirm(`delete ${deletedPerson.name}?`)) {
      return;
    }

    personService.deletePerson(deletedPerson.id)
      .then(() => {
        setMessage(`Removed ${deletedPerson.name}`);
        setTimeout(() => {
          setMessage(null);
        }, 5000);
    
        setPersons(persons.filter((person) => {
          return person.id !== deletedPerson.id;
        }));
      })
      .catch((err) => {
        setError(`${deletedPerson.name} has already been deleted`);
        setTimeout(() => {
          setError(null);
        }, 5000);
      });
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
  const [ message, setMessage ] = useState(null);
  const [ error, setError ] = useState(null);

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} />
      <Error message={error} />
      <PersonForm persons={persons} setPersons={setPersons} setMessage={setMessage}/>
      <h2>Numbers</h2>
      <Filter filter={filter} setFilter={setFilter} />
      <Persons persons={persons} filter={filter} setPersons={setPersons} setMessage={setMessage} setError={setError}/>
    </div>
  )
}

export default App;