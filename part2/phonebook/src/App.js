import { useState } from 'react';

const App = () => {

  const [persons, setPersons] = useState([
    { name: 'Leo Messi', id: 1, number: 3777181223 },
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
      id: persons.length + 1,
      number: newNumber
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
  persons.filter(person => person.name.toLocaleLowerCase().includes(filteredName.toLocaleLowerCase()));

  return (
    <div>
      <h1>Phonebook</h1>
      <h2>Add a new contact</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNumberChange} />
        </div>
        <div>
          <button type='submit'>Add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <div>
        Filter by name: <input value={filteredName} onChange={handleFilteredName}/>
      </div>
      {personsToShow.map(person => <h4 key={person.id}>{person.name} {person.number}</h4>)}
    </div>
  );
}

export default App;
