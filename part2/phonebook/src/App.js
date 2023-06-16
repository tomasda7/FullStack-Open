import { useState, useEffect } from 'react';
import personService from './services/persons';

import PersonForm from './components/PersonForm';
import Persons from './components/Persons';
import Filter from './components/Filter';
import Notification from './components/Notification';

const App = () => {

  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filteredName, setFilteredName] = useState('');
  const [message, setMessage] = useState(null);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    personService.getAll()
    .then(initialPersons => setPersons(initialPersons))
  }, [])

  const addPerson = (event) => {
    event.preventDefault();
    const personObj = {
      name: newName,
      number: newNumber
    }

    const existPerson = persons.find(person =>
      person.name.toLocaleLowerCase() === newName.toLocaleLowerCase()
    );

    const changedPerson = {
      ...existPerson,
      number: newNumber
    }

    if(existPerson) {
      if(window.confirm(`${existPerson.name} is already on the phonebook, do you want to update their number?`)) {
        personService.update(existPerson.id, changedPerson)
          .then(returnedPerson => {
            setPersons(persons.map(person =>
              person.id !== existPerson.id ? person : returnedPerson));
            setNewName('');
            setNewNumber('');
            setMessage(`${existPerson.name}'s number was updated correctly!`)
            setTimeout(() => {
              setMessage(null)
            }, 5000)
        }).catch(error => {
          console.log(error);
          setIsError(true);
          setMessage(`${existPerson.name} was already deleted from server.`)
          setPersons(persons.filter(person => person.id !== existPerson.id));
          setNewName('');
          setNewNumber('');
          setTimeout(() => {
            setIsError(false);
            setMessage(null)
          }, 5000)
        })
      }
    } else {
      personService.create(personObj)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson));
          setNewName('');
          setNewNumber('');
          setMessage(`${personObj.name} was added successfully!`)
          setTimeout(() => {
            setMessage(null)
          }, 5000)
      });
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  }

  const handleFilteredName = (event) => {
    setFilteredName(event.target.value);
  }

  const deletePerson = (id) => {
    const confirmPerson = persons.find(person => person.id === id);
    if(window.confirm(`Are you sure to delete ${confirmPerson.name}?`)) {
      personService.remove(id)
      .then(response => {
        setPersons(persons.filter(person => person.id !== id));
        setMessage(`${confirmPerson.name} was deleted successfully!`)
        setTimeout(() => {
          setMessage(null)
        }, 5000)
      })
    }
  }

  const personsToShow = !filteredName.length ?
    persons :
    persons.filter(person =>
      person.name.toLocaleLowerCase().includes(filteredName.toLocaleLowerCase())
  );

  return (
    <div>
      <h1>Phonebook</h1>
      <Notification message={message} style={isError ? "error" : "success"}/>
      <h2>Add a new contact</h2>
      <PersonForm
      addPerson={addPerson}
      newName={newName}
      handleNameChange={handleNameChange}
      newNumber={newNumber}
      handleNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      <Filter filteredName={filteredName} handleFilteredName={handleFilteredName} />
      <Persons persons={personsToShow}
      deleteHandler={deletePerson} />
    </div>
  );
}

export default App;
