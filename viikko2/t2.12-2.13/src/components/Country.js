import React from 'react';
import CountryDetails from './CountryDetails'

const Click = (country) => {
    return () => {
        <CountryDetails country={country} />
    }
}

const Country = ({ country }) => {
    return (
        <div onClick={Click(country)}> {country.name}</div>
    )
}

export default Country