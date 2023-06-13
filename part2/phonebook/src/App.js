import { useState } from 'react';

import PersonForm from './components/PersonForm';
import Persons from './components/Persons';
import Filter from './components/Filter';

const App = () => {

  const [persons, setPersons] = useState([
    { name: 'Leo Messi', number: 3777181223, id: 1 },
    { name: 'Gonzalo Montiel', number: 2040123456, id: 2 },
    { name: 'Rodrigo De Paul', number: 39445323523, id: 3 },
    { name: 'Gio Lo Celso', number: 1243234345, id: 4 },
    { name: 'Paulo Dybala', number: 39236423122, id: 5 },
    { name: 'Cristian Romero', number: 273255667, id: 6 }
  ]);

  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filteredName, setFilteredName] = useState('');

  const addPerson = (event) => {
    event.preventDefault();
    const personObj = {
      name: newName,
      number: newNumber,
      id: persons.length + 1,
    }

    persons.forEach(person => {
      if(person.name.includes(newName)) {
        setPersons(persons);
        return alert(`${newName} is already added to phonebook!`);
      } else {
        setPersons(persons.concat(personObj));
        setNewName('');
        setNewNumber('');
      }
    })
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
