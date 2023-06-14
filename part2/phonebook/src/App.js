import { useState, useEffect } from 'react';
import personService from './services/persons';

import PersonForm from './components/PersonForm';
import Persons from './components/Persons';
import Filter from './components/Filter';

const App = () => {

  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filteredName, setFilteredName] = useState('');

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

    personService.create(personObj)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson));
        setNewName('');
        setNewNumber('');
    });
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
        console.log('deleted successfully!')
        setPersons(persons.filter(person => person.id !== id))
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
