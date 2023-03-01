import { FaTemperatureHigh } from 'react-icons/fa';
import { SiWindicss } from 'react-icons/si';
import { WiHumidity,WiMoonAltWaningCrescent1 } from 'react-icons/wi';
import { MdVisibility } from 'react-icons/md';
import { BsArrowsCollapse, BsFillDropletFill,BsFillSunFill } from 'react-icons/bs';
import './detailContainer.css';
import MainBody from '../mainBody/MainBody';
import {React,useState,useEffect} from 'react';
import { round } from 'mathjs';
import { floor } from 'mathjs';

function DetailContainer() {
  const [selectedCity, setSelectedCity] = useState('KARACHI');

  const [weatherData, setWeatherData] = useState(null);


  function handleCitySelect(city) {
    setSelectedCity(city.toUpperCase());
    console.log(city)
  }

  useEffect(() => {
    if (!selectedCity) return; // check if selectedCity is not empty
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${selectedCity}&appid=612a57f2f17bbd660397aca66b064e91`)
      .then(response => response.json())
      .then(data => setWeatherData(data));
  }, [selectedCity]); // add selectedCity as a dependency

  return (
    <>
    <MainBody className="mainBody" onCitySelect={handleCitySelect}/>
    <div className="DetailContainer">
    <div className='heading' >WEATHER DETAIL</div>
    <div className='tempFeel'>Temperature Feel Like: <b>{round(weatherData?.main?.feels_like-273.15)}°C</b>  </div>
    <div className='detailBox'>
    <div className='box'><BsFillSunFill className='icon'/>Description: <span className='value'>{weatherData?.weather[0].description}</span> </div>
<div className='box'><FaTemperatureHigh className='icon'/>High / Low: <span className='value'>{round(weatherData?.main?.temp_max-273.15)}°/{round(weatherData?.main?.temp_min-273.15)}°C</span>  </div>
<div className='box'><SiWindicss className='icon'/>Wind: <span className='value'>5mph</span> </div>
<div className='box'><WiHumidity className='icon'/>Humidity: <span className='value'>{weatherData?.main?.humidity}%</span> </div>
<div className='box'><BsArrowsCollapse className='icon'/>Pressure: <span className='value'>{weatherData?.main?.pressure} mb</span> </div>
<div className='box'><BsFillDropletFill className='icon'/>Visibility <span className='value'>{round(weatherData?.visibility/1000)} KM</span> </div>
<div className='box'><WiMoonAltWaningCrescent1 className='icon'/>Sun Rise: <span className='value'>{floor(weatherData?.sys?.sunrise/360000000).toFixed(2)} AM</span> </div>
<div className='box'><WiMoonAltWaningCrescent1 className='icon'/>Sun Set: <span className='value'>{(weatherData?.sys?.sunset/360000000).toFixed(2)} PM</span> </div>
    </div>
    </div>
    </>
  );
}

export default DetailContainer;
