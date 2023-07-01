import './App.css';
import UilReact from '@iconscout/react-unicons/icons/uil-react'
import TopButtons from './components/TopButtons';
import Inputs from './components/Inputs';
import TimeAndLocation from './components/TimeAndLocation';
import TemperatureAndDetails from './components/TemperatureAndDetails';
import Forecast from './components/Forecast';
import getFormattedWeatherData from './services/weatherService';
import { useEffect, useState } from 'react';
import Map from './components/Map';
import { data } from 'autoprefixer';

function App() {

  const [query, setQuery] = useState({q: 'berlin'})
  const [units, setUnits] = useState('metric')
  const [weather, setWeather] = useState(null)

  useEffect(() => {
    const fetchWeather = async () => {
      await getFormattedWeatherData({...query, units}).then(
        (data) => {
          setWeather(data);
        });
    };

    fetchWeather();
  },[query, units]);
  
  //TODO: change the background based on the UV index color

  const formatBackground = () => {
    const uvMax = window.formattedCurrentUV?.uv_max.toFixed(1);
    if (uvMax < 3) {
      return 'from-green-400 to-green-900';
    } else if (uvMax >= 3 && uvMax < 6) {
      return 'from-yellow-300 to-yellow-800';
    } else if (uvMax >= 6 && uvMax < 8) {
      return 'from-orange-300 to-orange-800';
    } else if (uvMax >= 8 && uvMax < 11) {
      return 'from-red-400 to-red-900';
    } else {
      return 'from-purple-400 to-purple-900';    }

  }

  return (
    // creating the screen with shadow top
    // TODO: add dynamic map features below daily forecast
    <div className={`mx-auto max-w-screen-md mt-4 py-5 px-32 
    bg-gradient-to-br h-fit shadow-xl shadow-gray-400 ${formatBackground()}`}>

      <TopButtons setQuery={setQuery}/>
      <Inputs setQuery={setQuery} units={units} setUnits={setUnits}/>

      {weather && (
      <div>
        <TimeAndLocation weather={weather}/> 
        <TemperatureAndDetails weather={weather}/>

        <Forecast title="hourly forecast"/>

        <Map />
        
      </div>
      )}
     </div>

    
  );
}

export default App;
