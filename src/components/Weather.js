// src/components/Weather.js

import React, { useState } from 'react';
import axios from 'axios';

const Weather = () => {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);

  const getWeather = async (city) => {
    const apiKey = '7eb5d654851deebb3b5d072f81c12047';
        const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {
      const response = await axios.get(url);
      setWeather(response.data);
    } catch (error) {
      console.error("There was an error fetching the weather data!", error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
        getWeather(city);
  };

  return (
    <div>
      <h1>Weather App</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city"
        />
        <button type="submit">Get Weather</button>
      </form>
      {weather && (
        <div>
          <h2>{weather.name}</h2>
          <p>Temperature: {weather.main.temp} °C</p>
          <p>Weather: {weather.weather[0].description}</p>
        </div>
      )}
    </div>
  );
};

export default Weather;
