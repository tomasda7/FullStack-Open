import { useState, useEffect } from 'react';
import axios from 'axios';

import Countries from './components/Countries';

const App = () => {

  const [countries, setCountries] = useState([]);
  const [search, setSearch] = useState('');

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
      console.log("Los paises han sido cargados correctamente");
    })
  },[search])

  const handleSearch = (event) => {
    setSearch(event.target.value)
  }

  const handleShow = (id) => {
    const country = countries.find(country => country.id === id);
    setCountries([country]);
  }

  const countriestoShow = search.length ?
  countries.filter(country => country.name.toLocaleLowerCase().includes(search.toLocaleLowerCase()))
  : [];

  return (
    <div>
      <div>
        find countries: <input value={search} onChange={handleSearch} />
      </div>
      <Countries countries={countriestoShow} handleShow={handleShow}/>
    </div>
  );
}

export default App;
