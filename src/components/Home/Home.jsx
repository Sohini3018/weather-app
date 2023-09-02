import React, { useState } from 'react';
import axios from 'axios';
import AddIcon from '@mui/icons-material/Add';
import './home.css';

const Home = () => {
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [cities, setCities] = useState([]); // State for storing weather data for multiple cities

  const fetchWeather = async (cityName) => {
    try {
      const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=21e57ebc5301756748f197b6ebc58bde&units=metric`; // Replace with your API key
      const response = await axios.get(apiUrl);
      return {
        cityName: response.data.name,
        celcius: response.data.main.temp,
        humidity: response.data.main.humidity,
        speed: response.data.wind.speed,
        image: getImagePath(response.data.weather[0].main),
      };
    } catch (err) {
      if (err.response && err.response.status === 404) {
        setError("Invalid City");
      } else {
        setError("");
      }
      console.error(err);
      return null;
    }
  };

  const getImagePath = (weatherMain) => {
    // Define your image paths based on weather conditions
    switch (weatherMain) {
      case 'Clouds':
        return '/assets/cloud.png';
      case 'Clear':
        return '/assets/clear.png';
      case 'Drizzle':
        return '/assets/drizzle.png';
      case 'Rain':
        return '/assets/rain.png';
      case 'Snow':
        return '/assets/snow.png';
      default:
        return '/assets/cloud.png';
    }
  };

  const addCity = async () => {
    if (name !== '') {
      const weatherData = await fetchWeather(name);
      if (weatherData) {
        setCities([...cities, weatherData]);
        setError("");
        setName("");
      }
    }
  };

  const deleteCity = (cityName) => {
    const updatedCities = cities.filter((city) => city.cityName !== cityName);
    setCities(updatedCities);
  };

  const refreshCityWeather = (cityName) => {
    if (cityName !== '') {
      fetchWeather(cityName).then((weatherData) => {
        if (weatherData) {
          setCities((prevCities) =>
            prevCities.map((city) =>
              city.cityName === cityName ? weatherData : city
            )
          );
          setError("");
        }
      });
    }
};


  return (
    <div className='container'>
      <div className='weather'>
        <div className='search-box'>
          <input
            type='text'
            placeholder='Enter a City'
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
          <button onClick={addCity}>
            <AddIcon />
          </button>
        </div>
        <div className='error'>
          <p>{error}</p>
        </div>
        <div className='info'>
          {cities.map((cityData) => (
            <div key={cityData.cityName} className='weather-card'>
              <img src={cityData.image} alt='' />
              <h1>{cityData.celcius}°C</h1>
              <h2>{cityData.cityName}</h2>
              <div className='details'>
                <div className='col'>
                  <img src='/assets/humidity.png' alt='' />
                  <div className='humidity'>
                    <p>{cityData.humidity}%</p>
                    <p>Humidity</p>
                  </div>
                </div>
                <div className='col'>
                  <img src='/assets/wind.png' alt='' />
                  <div className='wind'>
                    <p>{cityData.speed} km/h</p>
                    <p>Wind</p>
                  </div>
                </div>
              </div>
              <button onClick={() => deleteCity(cityData.cityName)}>
                Delete
              </button>
              <button onClick={() => refreshCityWeather(cityData.cityName)}>
                Refresh
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
