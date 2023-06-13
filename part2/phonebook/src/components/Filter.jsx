
const Filter = ({ filteredName, handleFilteredName }) => {
    return (
        <>
            Filter by name: <input value={filteredName} onChange={handleFilteredName}/>
        </>
    )
};

export default Filter
