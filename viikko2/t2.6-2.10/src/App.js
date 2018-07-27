import React from 'react';
import Person from './components/Person'
import FilterForm from './components/FilterForm';
import peopleService from './services/people/peopleService'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      people: [
      ],
      newName: '',
      newNumber: '',
      filter: ''
    }
  }

  handleNewName = (event) => {
    event.preventDefault()
    console.log(event.target.value)
    this.setState({ newName: event.target.value })
  }

  handleNewNumber = (event) => {
    event.preventDefault()
    this.setState({ newNumber: event.target.value })
  }

  addEntry = (event) => {
    event.preventDefault()
    const entryObject = {
      name: this.state.newName,
      number: this.state.newNumber
    }
    if (!this.state.people.some(e => e.name === this.state.newName)) {
      peopleService.create(entryObject)
        .then(response => {
          this.setState({
            people: this.state.people.concat(response.data),
            newName: '',
            newNumber: '',
          })
        })
    } else {
      if (window.confirm('nimi löytyy jo, päivitetäänkö numero?')) {
        const person = this.state.people.find(p => p.name === this.state.newName)
        peopleService.update(person.id, entryObject).then(response => {
          this.setState({
            newName: '',
            newNumber: '',
            people: this.state.people.map(p => p.id !== person.id ? p : response.data)
          })
        })
      }
    }
  }

  deleteEntry = (id) => {
    return () => {
      if (window.confirm('Oletko varma?')) {

        peopleService.deletePerson(id).then(response =>
          this.setState({
            people: this.state.people.filter(
              person => person.id !== id
            )
          })
        )
      }
    }
  }

  filterHandler = (event) => {
    event.preventDefault()
    this.setState({
      filter: event.target.value,
    })
    console.log(this.state.filter)

  }

  componentDidMount() {
    console.log('did mount')
    peopleService.getAll()
      .then(response => {
        this.setState({ people: response.data })
      })
  }

  render() {
    const peopletoShow = this.state.people.filter(person =>
      person.name.toLowerCase().includes(this.state.filter.toLocaleLowerCase())
    )

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
              value={this.state.newNumber}
              onChange={this.handleNewNumber}
            />
          </div>
          <div>
            <button type="submit">lisää</button>
          </div>
        </form>
        <h2>Numerot</h2>
        {peopletoShow.map(
          person =>
            <Person key={person.id}
              person={person}
              deletePerson={this.deleteEntry(person.id)} />)}
      </div>

    )
  }
}
export default App
