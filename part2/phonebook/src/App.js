import { useState, useEffect } from 'react';
import axios from 'axios';

import PersonForm from './components/PersonForm';
import Persons from './components/Persons';
import Filter from './components/Filter';

const App = () => {

  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filteredName, setFilteredName] = useState('');

  useEffect(() => {
    console.log('effect');
    axios.get('http://localhost:3001/persons')
      .then(response => {
        console.log('Promise Fulfilled');
        setPersons(response.data)
    })
  }, [])
  console.log('render', persons.length, 'persons')

  const addPerson = (event) => {
    event.preventDefault();
    const personObj = {
      name: newName,
      number: newNumber
    }

    axios.post('http://localhost:3001/persons', personObj)
      .then(response => {
        setPersons(persons.concat(response.data));
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
      <Persons persons={personsToShow} />
    </div>
  );
}

export default App;
