import React from 'react'

const CountryDetails = ({ country }) => {
    console.log(country)
    console.log(country.name)
    return (
        <div>
            <h3>{country.name}</h3>
            <p>capital: {country.capital}</p>
            <p>population: {country.population}</p>
            <img src={country.flag} alt='lol' height='150' width='200' />
        </div>
    )
}

export default CountryDetails