import React from 'react'
import Weather from './Weather'

const CountryInfo = ({ country }) => {
    return (
        <div>
            <h1>{country.name.common}</h1>
            <p>capital: {country.capital}</p>
            <p>area: {country.area}</p>
            <p>population: {country.population}</p>
            <h2>languages:</h2>
            <ul>
                {Object.entries(country.languages).map(([key, value]) => (
                    <li key={key}>
                        {value}
                    </li>
                ))}
            </ul>
            <img src={country.flags.png} alt={country.flags.alt} width="33%" height="33%" />
            <Weather capital={country.capital} />
        </div>
    )
}

export default CountryInfo