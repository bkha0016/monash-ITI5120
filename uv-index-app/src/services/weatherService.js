import { DateTime } from "luxon";

const API_KEY = 'd513cf5e193056513ad03bb9ae8d2598';
const BASE_URL = "https://api.openweathermap.org/data/2.5";

// https://api.openweathermap.org/data/2.5/weather?q=jakarta&appid=d513cf5e193056513ad03bb9ae8d2598

const getWeatherData = (infoType, searchParams) => {
    const url = new URL(BASE_URL + '/' + infoType);
    url.search = new URLSearchParams({...searchParams, appid:API_KEY});

    return fetch(url)
    .then((res) => res.json());

};


const formatCurrentWeather = (data) => {
    const {
        coord: {lat, lon},
        main: {temp, feels_like, temp_min, temp_max, humidity},
        name, 
        dt,
        sys: {country, sunrise, sunset},
        weather,
        wind: {speed}
    } = data

    const {main: details, icon} = weather[0]

    return {lat, lon, temp, feels_like, temp_min, temp_max, humidity, name, dt, country, sunrise, 
        sunset, details, icon, speed};

};

/*
// not going to use it because the forecast doesnt work in the free plan
const formatForecastWeather = (data) => {
    let { timezone, daily, hourly} = data;
    daily = daily.slice(1,6).map(d => {
        return {
            title: formatToLocalTime(d.dt, timezone, 'ccc'),
            temp: d.temp.day,
            icon: d.weather[0].icon
        }
    });

    hourly = hourly.slice(1,6).map(d => {
        return {
            title: formatToLocalTime(d.dt, timezone, 'hh:mm a'),
            temp: d.temp.day,
            icon: d.weather[0].icon
        }
    });

    return {timezone, daily, hourly}
};
*/

const getFormattedWeatherData = async (searchParams) => {
    // TO DO: check the error of the formattedCurrentWeather alot of error in this piece of crap!
    // It does work only for the formattedCurrentWeather or the weather data, the onecall doesnt work
    // forecast required payments or subscription
    
    const formattedCurrentWeather = await getWeatherData('weather', searchParams).then(formatCurrentWeather);

    
    const {lat, lon} = formattedCurrentWeather;
    
    /*
    const formattedForecastWeather = await getWeatherData('forecast', {
        lat, lon, exclude:'current,minutely,alerts', 
        units: searchParams.units,
    }).then(formatForecastWeather);
    */

    return formattedCurrentWeather;
};

const formatToLocalTime = (secs, zone, format = "cccc, dd LLL yyyy' | Local time: 'hh:mm a") => DateTime.fromSeconds(secs).setZone(zone).toFormat(format);

const iconUrlFromCode = (code) => `https://openweathermap.org/img/wn/${code}@2x.png`;


export default getFormattedWeatherData;

export {formatToLocalTime, iconUrlFromCode};


