import React, { useState, useEffect } from 'react';
import './App.css';
import StatsBox from './StatsBox';
import {
  MenuItem,
  FormControl,
  Select,
  Card,
  CardContent,
} from "@material-ui/core";
import Map from './Map';
import Table from './Table';
//https://disease.sh/v3​/covid-19​/countries
//useeffect: rumns a piece of code based on a given condition


function App() {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState("worldwide");
  const [countryInfo, setCountryInfo]=useState({});
  const [tableData, setTableData]=useState([]);

  useEffect(()=>{
    fetch("https://disease.sh/v3/covid-19/all")
    .then(response=>response.json())
    .then(data=>{
      setCountryInfo(data);
    })
  },[]);

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
          setTableData(data);
          setCountries(countries);
        })
    }
    getCountryInfo();
  }, []);

  /*change country from dropdown */
  const onCountryChange = async (event) => {
    const countryCode = event.target.value;
    

    const url = countryCode === 'worldwide' 
    ? 'https://disease.sh/v3/covid-19/all' 
    :  `https://disease.sh/v3/covid-19/countries/${countryCode}`;

    await fetch(url)
    .then(response=>response.json())
    .then(data=>{
      setCountry(countryCode);
      setCountryInfo(data);
    })
  }
  return (
    <div className="app">
      <div className="app-left">
        {/* Header: Title+select input dropdown field */}
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

        <div className="app-stats">
          {/* StatsBox : Covid cases */}
          <StatsBox title="COVID Cases" 
          total={countryInfo.cases} 
          cases={countryInfo.todayCases}></StatsBox>

          {/* StatsBox : Covid recoveries */}
          <StatsBox title="Recovered" 
          total={countryInfo.recovered} 
          cases={countryInfo.todayRecovered}></StatsBox>

          {/* StatsBox : Covid Deaths */}
          <StatsBox title="Deaths" 
          total={countryInfo.deaths} 
          cases={countryInfo.todayDeaths}></StatsBox>

        </div>

        {/* Map */}
        <Map></Map>





      </div>
      <Card className="app-right">
        <CardContent>
        <h3>Live Cases by Country</h3>
          {/* Table */}
          <Table countries={tableData}></Table>
          
          {/* Graph */}
          <h3>Worldwide Live Cases</h3>
        </CardContent>
      </Card>
    </div>
  );
}

export default App;
