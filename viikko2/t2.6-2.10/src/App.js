import React from 'react';
import Person from './components/Person'
import FilterForm from './components/FilterForm';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      persons: [
        { name: 'Arto Hellas', number: '040-123456' },
        { name: 'Martti Tienari', number: '040-123456' },
        { name: 'Arto Järvinen', number: '040-123456' },
        { name: 'Lea Kutvonen', number: '040-123456' }
      ],
      newName: '',
      newNumber: '',
      filter: '',
    }
  }

  handleNewName = (event) => {
    event.preventDefault()
    console.log(event.target.value)
    this.setState({ newName: event.target.value })
  }

  handleNewNumber = (event) => {
    event.preventDefault()
    this.setState({newNumber: event.target.value})
  }

  addEntry = (event) => {
    event.preventDefault()
    const entryObject = {
      name: this.state.newName,
      number: this.state.newNumber
    }
    const persons = this.state.persons.concat(entryObject)
    if (!this.state.persons.some(e => e.name === this.state.newName)) {
      this.setState({
        persons: persons,
        newName: '',
        newNumber: '',
      })
    } else {
      alert('Nimi löytyy jo')
    }
  }

  filterHandler = (event) => {
    event.preventDefault()
    this.setState({
      filter: event.target.value,
    })
    console.log(this.state.filter)
    
  }

  FilteredList(term) {
    return function(x) {
      return x.name.toLowerCase().includes(term.toLowerCase()) || !term;
    }
  }

  render() {
    return (
      <div>
        <h2>Puhelinluettelo</h2>
       <FilterForm filter={this.filterHandler} />
        <h2>Lisää uusi</h2>
        <form onSubmit={this.addEntry}>
          <div>
            nimi:  
            <input
              value={this.state.newName}
              onChange={this.handleNewName}
            />
          </div>
          <div>
            numero:
          <input 
            value = {this.state.newNumber}
            onChange={this.handleNewNumber}
            />
          </div>
          <div>
            <button type="submit">lisää</button>
          </div>
        </form>
        <h2>Numerot</h2>
          {this.state.persons.filter(this.FilteredList(this.state.filter)).map(
            person => <Person key={person.name} person={person} />)}
      </div>

    )
  }
}
export default App
