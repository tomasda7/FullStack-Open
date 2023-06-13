import { useState } from 'react';

const App = () => {

  const [persons, setPersons] = useState([
    { name: 'Leo Messi', id: 1, number: 3777181223 }
  ]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');

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

  return (
    <div>
      <h2>Phonebook</h2>
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
      {persons.map(person => <h4 key={person.id}>{person.name} {person.number}</h4>)}
    </div>
  );
}

export default App;
