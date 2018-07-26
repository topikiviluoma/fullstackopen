import React, { Component } from 'react';
import axios from 'axios';
import Country from './components/Country'
import CountryDetails from './components/CountryDetails'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      countries: [],
      filter: ''
    }
  }

  handleFilter = (event) => {
    event.preventDefault()
    this.setState({
      filter: event.target.value
    })
  }


  componentDidMount() {
    console.log('did mount')
    let url = 'https://restcountries.eu/rest/v2/'
    url = url.concat('all')
    console.log(url)
    axios.get(url).then(response => {
      this.setState({ countries: response.data })
    })
  }

  render() {
    const countriesToDisplay = this.state.countries.filter(country =>
      country.name.toLowerCase().includes(this.state.filter.toLowerCase()))

    const limitResults = countriesToDisplay.length > 10 ?
      'Too many matches, specify' :
      countriesToDisplay.map(country =>
        <Country key={country.name} country={country} />)

    const showDetails = countriesToDisplay.map(country => <CountryDetails key={country.name} country={country}/>)
      
    return (
      <div>
        Find countries:
        <input
          value={this.state.filter}
          onChange={this.handleFilter}
        />
        <h2>Countries:</h2>
        {limitResults.length === 1 ? showDetails : limitResults}
      </div>
    );
  }
}

export default App;
