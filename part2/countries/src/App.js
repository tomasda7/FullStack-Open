import { useState, useEffect } from 'react';
import axios from 'axios';

import Search from './components/Search';
import Countries from './components/Countries';

const API_KEY = process.env.REACT_APP_API_KEY;

const App = () => {

  const [countries, setCountries] = useState([]);
  const [search, setSearch] = useState('');
  const [capital, setCapital] = useState(null);
  const [forecast, setForecast] = useState({});

  useEffect(() => {
    axios.get('https://studies.cs.helsinki.fi/restcountries/api/all')
    .then(response => {
      const allCountries = response.data.map(country => ({
        id: country.cca2,
        name: country.name.common,
        capital: country.capital,
        area: country.area,
        languages: country.languages,
        flag: country.flags.png
      }));
      setCountries(allCountries);
      setCapital(allCountries[0].capital[0])
      console.log("Los paises han sido cargados correctamente");
    });
  },[search])

  useEffect(() => {
    if(capital) {
      console.log("fetching weather...")
      axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${capital}&appid=${API_KEY}`)
      .then(response => {
        const weather = response.data;
        console.log(weather);
        setForecast(weather);
      })
      .catch(error => {
        console.log(error);
      })
    }
    },[capital])

  const handleSearch = (event) => {
    setSearch(event.target.value)
  }

  const handleShow = (id) => {
    const country = countries.find(country => country.id === id);
    setCountries([country]);
    setCapital(country.capital[0])
  }

  const countriestoShow = search.length ?
  countries.filter(country => country.name.toLocaleLowerCase().includes(search.toLocaleLowerCase()))
  : [];

  return (
    <div>
      <Search search={search} handleSearch={handleSearch} />
      <Countries countries={countriestoShow} handleShow={handleShow} forecast={forecast} />
    </div>
  );
}

export default App;
