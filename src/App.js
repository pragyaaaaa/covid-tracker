import React, { useState, useEffect } from 'react';
import './App.css';
import {
  MenuItem,
  FormControl,
  Select,
} from "@material-ui/core";

//https://disease.sh/v3​/covid-19​/countries
//useeffect: rumns a piece of code based on a given condition


function App() {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState("worldwide");

  useEffect(() => {
    const getCountryInfo = async () => {
      await fetch("https://disease.sh/v3/covid-19/countries")
        .then((response) => response.json())
        .then((data) => {
          const countries = data.map((country) => (
            {
              name: country.country,
              value: country.countryInfo.iso2
            }
          ));
          setCountries(countries);
        })
    }
    getCountryInfo();
  }, []);

  /*change country from dropdown */
  const onCountryChange = (event) => {
    const countryCode = event.target.value;
    setCountry(countryCode);
  }
  return (
    <div className="app">
      <div className="app-header">
        <h1>COVID Tracker</h1>
        {/* dropdown using material UI */}
        <FormControl className="app-dropdown">
          <Select
            variant="outlined"
            onChange={onCountryChange}
            value={country}>
            <MenuItem value="worldwide">Worldwide</MenuItem>
            {
              countries.map(country => (
                <MenuItem value={country.value}>{country.name}</MenuItem>
              ))
            }
            {/* <MenuItem value="worldwide">Worldwide</MenuItem>
            <MenuItem value="worldwide">A</MenuItem>
            <MenuItem value="worldwide">B</MenuItem>
            <MenuItem value="worldwide">C</MenuItem>
            <MenuItem value="worldwide">D</MenuItem> */}
          </Select>
        </FormControl>
      </div>


      {/* Header: Title+select input dropdown field */}
      {/* InfoBox x 3 */}
      {/* Table */}
      {/* Graph */}
      {/* Map */}
    </div>
  );
}

export default App;
