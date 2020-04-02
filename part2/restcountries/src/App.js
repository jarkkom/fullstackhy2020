import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Search({ search, setSearch }) {
  const onChangeSearch = (event) => {
    setSearch(event.target.value);
  };

  return (
    <div>find countries <input onChange={onChangeSearch}></input></div>
  );
}

function Country({ country }) {
  return (
    <div>
      <h1>{country.name}</h1>
      <div>capital {country.capital}</div>
      <div>population {country.population}</div>
      <h2>Languages</h2>
      <ul>
        {country.languages.map((language) => (
          <li key={language.iso639_1}>{language.name}</li>
        ))}
      </ul>
      <img src={country.flag} width={100} alt="flag" />
    </div>
  )
}

function Countries({ countries, search }) {

  if (search === '') {
    return (
      <></>
    );
  }

  const results = countries.filter((country) => {
    return country.name.toLowerCase().includes(search.toLowerCase());
  });

  if (results.length === 1) {
    return (
      <Country country={results[0]} />
    );
  }

  if (results.length < 10) {
    return (
      <ul>
        {results.map((country) => {
          return (
            <li key={country.alpha3Code}>{country.name}</li>
          )
        })}
      </ul>
    );
  } else {
    return (
      <div>Too many matches, specify another filter</div>
    )
  }
}

function App() {
  const [ countries, setCountries ] = useState([]);
  const [ search, setSearch ] = useState('');

  useEffect(() => {
    axios.get('https://restcountries.eu/rest/v2/all')
      .then((resp) => {
        setCountries(resp.data);
      });
  }, []);

  return (
    <div>
      <Search search={search} setSearch={setSearch} />
      <Countries countries={countries} search={search} />
    </div>
  );
}

export default App;
