
const Country = ({ name, handleClick, id }) => {
    return (
        <>
            <h4>{name}</h4>
            <button key={id} onClick={() => handleClick(id)}>show</button>
        </>
    )
};

const Detail = ({ country }) => {
    const langs = Object.values(country.languages);

    return (
        <>
            <h2>{country.name}</h2>
            <p><strong>Capital:</strong> {country.capital[0]}</p>
            <p><strong>Area:</strong> {country.area}</p>
            <h3>languages:</h3>
            <ul>
                {langs.map((lang, i) => <li key={i}>{lang}</li>)}
            </ul>
            <img src={country.flag} alt="flag" />
        </>
    )
}

const Countries = ({ countries, handleShow }) => {
    if(countries.length > 10) {
        return <h4>too many results, specify another filter</h4>
    } else if (countries.length === 1) {
        return <Detail country={countries[0]} />
    }

    return (
        <>
            {countries.map(country => <Country
                key={country.id}
                name={country.name}
                handleClick={() => handleShow(country.id)}
            />)}
        </>
    )
};

export default Countries
