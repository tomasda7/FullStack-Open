
const Person = ({ name, number, id, deleteHandler }) => {
    return (
        <>
            <h4>{name} {number}</h4>
            <button key={id} onClick={() => deleteHandler(id)}>
                delete
            </button>
        </>
    )
}


const Persons = ({ persons, deleteHandler }) => {
    return (
        <>
            {persons.map(person =>
                <Person
                key={person.id}
                name={person.name}
                number={person.number}
                deleteHandler={() => deleteHandler(person.id)}
                />
            )}
        </>
    )
};

export default Persons
