import { useState } from 'react';

const App = () => {

  const [persons, setPersons] = useState([
    { name: 'Leo Messi', id: 1 }
  ]);
  const [newName, setNewName] = useState('');

  const addPerson = (event) => {
    event.preventDefault();
    const person = {
      name: newName,
      id: persons.length + 1
    }

    setPersons(persons.concat(person));
    setNewName('');
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input
          value={newName}
          onChange={handleNameChange}
          />
        </div>
        <div>
          <button type='submit'>Add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map(person => <h4 key={person.id}>{person.name}</h4>)}
    </div>
  );
}

export default App;
