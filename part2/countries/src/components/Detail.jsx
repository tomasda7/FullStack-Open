
const Detail = ({ country, forecast }) => {

    const langs = Object.values(country.languages);

    return (
        <>
            <h2>{country.name}</h2>
            <p><strong>Capital:</strong> {country.capital[0]}</p>
            <p><strong>Area:</strong> {country.area}</p>
            <h3>Languages:</h3>
            <ul>
                {langs.map((lang, i) => <li key={i}>{lang}</li>)}
            </ul>
            <img src={country.flag} alt="flag" />
            <h3>Weather in {country.capital[0]}</h3>
            <p><strong>Temperature:</strong> {forecast.main.temp} Celcius</p>
            <img src={`https://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png`} alt="icon" />
            <p>Wind: {forecast.wind.speed} m/s</p>
        </>
    )
};

export default Detail
