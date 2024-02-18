import React from 'react';
import Country from './Country';
import CountryInfo from './CountryInfo';

const Countries = ({ countries, filteredValue }) => {
    let filtered = [];

    if (filteredValue.length > 0) {
        filtered = countries.filter((country) =>
            country.name.common.toLowerCase().includes(filteredValue.toLowerCase())
        );
    } else {
        filtered = countries;
    }

    if (filtered.length > 10) {
        return <h3>too many matches, need specified filter</h3>;
    } else if (filtered.length === 1) {
        return <CountryInfo country={filtered[0]} />;
    }

    return (
        <div>
            <ul>
                {filtered.map((country) => {
                    return <Country key={country.name.common} country={country} />;
                })}
            </ul>
        </div>
    );
};

export default Countries;