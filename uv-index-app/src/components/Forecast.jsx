import React from 'react'
import { formatToLocalTime, iconUrlFromCode, getFormattedWeatherData, convertTimeToHoursMinutes} from '../services/weatherService';

function Forecast({title}) {

    // window.formattedCurrentUV?.uv_max.toFixed(1)
    //TODO: create a randomizer function in here based on current uv index
    
    const currentUV = parseFloat(window.formattedCurrentUV?.uv_max.toFixed(1));
    const UVrandom = () => { 
        return parseFloat(Math.floor(Math.random() * 4) - 3); //generates a random integer between -3 and 0
    };
  
return (
    
  <div>

    <div className='flex items-center justify-start mt-6'>
        <p className='text-white font-medium uppercase'>{title}</p>
    </div>
    <hr className='my-2' />

    <div className='flex flex-row items-center justify-between text-white'>

        <div className='flex flex-col items-center justify-center'>
            <p className='font-light text-sm'>
                03:00 PM
            </p>
            <img src="https://openweathermap.org/img/wn/01d@2x.png"
            className='w-12 my-1' alt=""/>

            <p className='font-medium'>{currentUV + UVrandom()}</p>

        </div>

        <div className='flex flex-col items-center justify-center'>
            <p className='font-light text-sm'>
                04:00 PM
            </p>
            <img src="https://openweathermap.org/img/wn/01d@2x.png"
            className='w-12 my-1' alt=""/>

            <p className='font-medium'>{currentUV + UVrandom()}</p>

        </div>

        <div className='flex flex-col items-center justify-center'>
            <p className='font-light text-sm'>
                05:00 PM
            </p>
            <img src="https://openweathermap.org/img/wn/01d@2x.png"
            className='w-12 my-1' alt=""/>

            <p className='font-medium'>{currentUV + UVrandom()}</p>

        </div>

        <div className='flex flex-col items-center justify-center'>
            <p className='font-light text-sm'>
                06:00 PM
            </p>
            <img src="https://openweathermap.org/img/wn/01d@2x.png"
            className='w-12 my-1' alt=""/>

            <p className='font-medium'>{currentUV + UVrandom()}</p>

        </div>

        <div className='flex flex-col items-center justify-center'>
            <p className='font-light text-sm'>
                07:00 PM
            </p>
            <img src="https://openweathermap.org/img/wn/01d@2x.png"
            className='w-12 my-1' alt=""/>

            <p className='font-medium'>{currentUV + UVrandom()}</p>

        </div>

    </div>
    <hr className='my-5' />
    
  
  </div>
  
  );

}

export default Forecast