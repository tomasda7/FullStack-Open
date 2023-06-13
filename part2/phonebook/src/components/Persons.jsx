
const Persons = ({ persons }) => {
    return (
        <>
            {persons.map(person => <h4 key={person.id}>{person.name} {person.number}</h4>)}
        </>
    )
};

export default Persons
