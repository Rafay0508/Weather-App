import './mainBody.css';
import { useEffect, useState } from 'react';
import { TiWeatherSunny } from 'react-icons/ti';
import SearchBar from '../searchBar/SearchBar';
import { round } from 'mathjs';

function MainBody(props) {
  const date = new Date();
  const time = date.getHours();

  const [selectedCity, setSelectedCity] = useState('KARACHI');

  const [weatherData, setWeatherData] = useState(null);
  
  const [backgroundImage, setBackgroundImage] = useState('');

  const [cityNotFound, setCityNotFound] = useState(false);

  function handleCitySelect(city) {
    setSelectedCity(city.toUpperCase());
    console.log(city)

  }

  useEffect(() => {
    if (!selectedCity) return; // check if selectedCity is not empty
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${selectedCity}&appid=612a57f2f17bbd660397aca66b064e91`)
    .then(response => {
      if (response.ok) {
      setCityNotFound(false); // city found, set error state to false
      return response.json();
      } else {
      setCityNotFound(true); // city not found, set error state to true
      alert("city not found")
      window.location.reload();
      }
      })
      .then(data => {
        setWeatherData(data);
        setWeatherBackground(data.weather[0].main);
      });
  }, [selectedCity]); // add selectedCity as a dependency


  function setWeatherBackground(weather) {
    switch (weather) {
      case 'Smoke':
        setBackgroundImage('smoke.jpg');
        break;
      case 'Rain':
        setBackgroundImage('rain.jpg');
        break;
      case 'Snow':
        setBackgroundImage('snow.jpg');
        break;
      case 'Clouds':
        setBackgroundImage('cloud.jpg');
        break;
      case 'Mist':
        setBackgroundImage('mist.jpg');
        break;
      case 'Clear':
        setBackgroundImage('clear.jpg');
        break;
      case 'Haze':
        setBackgroundImage('haz.jpg');
        break;
      default:
        setBackgroundImage('cloud');
        break;
    }
  }

  if (weatherData !== null) {
    props.onCitySelect(selectedCity);
    const country = weatherData.sys.country;
    console.log(country);
  }




  
  return (
    <>
      <SearchBar onCitySelect={handleCitySelect} />
       <div className="MainBody"       
       style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        zIndex: -1
        // backgroundPosition: 'center',
      }}
>
        <h2 
        >TODAY'S WEATHER INFO</h2>
        <div className='weatherDetail'>
          <div className='cityName'>{selectedCity}, {weatherData?.sys?.country} ( longitude: {weatherData?.coord?.lon}°, longitude: {weatherData?.coord?.lat}°)</div>
          <div className='todayDetail'>
            <span className='todayWeather'>
              <ul>
                <li className='todayTemp'>{round(weatherData?.main?.temp - 273.15)}°C</li>
                <li className='todayCloud'>{weatherData?.weather[0]?.main}</li>
                <li className='tempDayNight'>Day 25°C .Night 14°C</li>
              </ul>

            </span>
            <span className='tempIcon'>
              <TiWeatherSunny />
            </span>
          </div>
        </div>
      </div>
    </>
  );
}

export default MainBody;
