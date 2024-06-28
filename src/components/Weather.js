// src/components/Weather.js

import React, { useState } from 'react';
import axios from 'axios';

const Weather = () => {
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [country, setCountry] = useState('');
  const [weather, setWeather] = useState(null);

  const apiKey = '7eb5d654851deebb3b5d072f81c12047';

  const getCoordinates = async (city, state, country) => {
    const location = `${city},${state},${country}`;
    const url = `http://api.openweathermap.org/geo/1.0/direct?q=${location}&appid=${apiKey}`;

    try {
      const response = await axios.get(url);
      if (response.data.length > 0) {
        const { lat, lon } = response.data[0];
        return { lat, lon };
      } else {
        throw new Error('Location not found');
      }
    } catch (error) {
      console.error("There was an error fetching the coordinates!", error);
      return null;
    }
  };

  const getWeather = async (lat, lon) => {
    const url = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

    try {
      const response = await axios.get(url);
      setWeather(response.data);
    } catch (error) {
      console.error("There was an error fetching the weather data!", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const coordinates = await getCoordinates(city, state, country);
    if (coordinates) {
      getWeather(coordinates.lat, coordinates.lon);
    }
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
        <input
          type="text"
          value={state}
          onChange={(e) => setState(e.target.value)}
          placeholder="Enter state"
        />
        <input
          type="text"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          placeholder="Enter country"
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
