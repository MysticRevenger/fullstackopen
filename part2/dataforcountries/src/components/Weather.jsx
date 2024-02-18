import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Weather = ({ capital }) => {
    const apiKey = import.meta.env.VITE_APIKEY
    const [weather, setWeather] = useState([])
    console.log(`http://api.openweathermap.org/geo/1.0/direct?q=${capital}&limit=5&appid=${apiKey}`);

    useEffect(() => {
        axios
            .get(
                `http://api.openweathermap.org/geo/1.0/direct?q=${capital}&limit=5&appid=${apiKey}`
            )
            .then(response => console.log(response))
    }, [])
    return (
        <div>
            <h2>Weather in {capital}</h2>
            {/* <p>
                <strong>temperature:</strong> {weather.temperature} Celcius
            </p>
            <img src={weather.weather_icons} alt="weather icon" />
            <p>
                <strong>wind:</strong> {weather.wind_speed} km/h direction{" "}
                {weather.wind_dir}
            </p> */}
        </div>
    )
}

export default Weather