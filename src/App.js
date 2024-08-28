import React, { useState } from 'react';
import axios from 'axios';
import Weather from './Weather';
import './App.css';

function Header({ city, setCity, fetchData }) {
  const handleInputChange = (e) => {
    setCity(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchData();
  };

  return (
    <header className="header">
      <h1>Weather App</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Search city"
          value={city}
          onChange={handleInputChange}
          className="search-bar"
        />
        <button type="submit" className="search-button">Get Weather</button>
      </form>
    </header>
  );
}

function App() {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${process.env.REACT_APP_API_KEY}`
      );
      setWeatherData(response.data);
      console.log(response.data); 
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="App">
      <Header city={city} setCity={setCity} fetchData={fetchData} />
      <Weather weatherData={weatherData} />
    </div>
  );
}

export default App;