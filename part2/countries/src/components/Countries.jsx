import Country from "./Country";
import Detail from "./Detail";

const Countries = ({ countries, handleShow, forecast }) => {

    if(countries.length > 10) {
        return <h4>too many results, specify another filter</h4>
    } else if (countries.length === 1) {
        return <Detail country={countries[0]} forecast={forecast} />
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
