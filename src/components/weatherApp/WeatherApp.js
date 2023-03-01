import './weatherApp.css'
import SearchBar from "../searchBar/SearchBar";
import { TiWeatherStormy } from "react-icons/ti";
import MainBody from '../mainBody/MainBody';
import DetailContainer from '../detailContainer/DetailContainer';

function WeatherApp() {
  return (
    <div className="WeatherApp">
<div className="mainHeading"><TiWeatherStormy/>Weather App</div>
    {/* <SearchBar/> */}
    {/* <MainBody/> */}
    <DetailContainer/>
 <div style={{margin: '10px'}}>developing date: 01/02/2023</div>
    </div>
  );
}

export default WeatherApp;
