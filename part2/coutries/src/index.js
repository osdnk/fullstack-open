import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import axios from 'axios'

const Preview = ({ country }) => {
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    axios.get(
      `http://api.weatherstack.com/current?access_key=${process.env.REACT_APP_API_KEY}&query=${country.capital}`
    ).then(({ data: { current } }) =>
      setWeather(current)
    );
  }, []);

  console.log(country)
  return (
    <div>
      <h2>{country.name}</h2>
      <div>capital {country.capital}</div>
      <div>population {country.population}</div>
      <h4>Languages</h4>
      <ul>
        {country.languages.map((language) => (
          <li key={language.iso639_1}>{language.name}</li>
        ))}
      </ul>
      <img alt="flag" src={country.flag} width="100" height="100"  />
      {weather !== null && (
        <>
          <h3>Weather in {country.capital}</h3>
          <div>
            temperature: {weather.temperature}
          </div>
          {weather.weather_icons?.length > 0 && (
              <img alt="weather icon" src={weather.weather_icons[0]} />
          )}
          <div>
            wind:{weather.wind_speed} mph direction{" "}
            {weather.wind_dir}
          </div>
        </>
      )}
    </div>
  );
};

const App = () => {
  const [countries, setCountries] = useState([]);
  const [search, setSearch] = useState('');
  const matchingCounties = countries.filter(({ name }) =>
    name.toLocaleLowerCase().match(search.toLocaleLowerCase())
  );

  useEffect(() => {
    axios.get("https://restcountries.eu/rest/v2/all").then(({ data }) => {
      setCountries(data);
    });
  }, []);


  return (
    <div>
      <input value={search} onChange={({ target: { value } }) => setSearch(value)} />
      {matchingCounties.length === 1 && (
        <Preview country={matchingCounties[0]} />
      )}

      {matchingCounties.length === 0 && (
        <div>No matching.</div>
      )}

      {matchingCounties.length > 10 && (
        <div>Too many matches. Specify different filter.</div>
      )}

      {matchingCounties.length <= 10 && matchingCounties.length >1 &&
        matchingCounties.map(({ name }) => (
          <div key={name}>
            {name}{" "}<button onClick={() => setSearch(name)}>show</button>
          </div>
        ))
      }
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
