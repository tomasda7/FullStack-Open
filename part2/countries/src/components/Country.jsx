
const Country = ({ name, handleClick, id }) => {
    return (
        <>
            <h4>{name}</h4>
            <button key={id} onClick={() => handleClick(id)}>show</button>
        </>
    )
};

export default Country
