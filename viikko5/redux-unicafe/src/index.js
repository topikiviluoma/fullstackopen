import React from 'react'
import ReactDOM from 'react-dom'
import Statistics from './components/Statistics'
import counterReducer from './reducer/reducer'
import { createStore } from 'redux'

const store = createStore(counterReducer);

class App extends React.Component {
    klik = (nappi) => () => {
        store.dispatch({ type: nappi })
    }

    render() {
        const stats = store.getState()
        return (
            <div>
                <h2>anna palautetta</h2>
                <button onClick={this.klik('GOOD')}>hyvä</button>
                <button onClick={this.klik('OK')}>neutraali</button>
                <button onClick={this.klik('BAD')}>huono</button>
                <Statistics stats = {stats}/>
            </div>
        )
    }
}
const renderApp = () => {
    ReactDOM.render(<App />, document.getElementById('root'))
}

renderApp()
store.subscribe(renderApp)