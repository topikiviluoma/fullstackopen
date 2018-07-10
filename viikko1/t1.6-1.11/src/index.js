import React from 'react';
import ReactDOM from 'react-dom';

class App extends React.Component {
    constructor() {
        super()
        this.state = {
            hyva: 0,
            neutraali: 0,
            huono: 0,
            yhteensa: 0

        }
    }
    click = (button) => {
        if (button === 1) {
            return () => {
                this.setState({
                    hyva: this.state.hyva + 1,
                    yhteensa: this.state.yhteensa + 1
                })
            }
        }

        if (button === 2) {
            return () => {
                this.setState({
                    neutraali: this.state.neutraali + 1,
                    yhteensa: this.state.yhteensa + 1
                })
            }
        }

        if (button === 3) {
            return () => {
                this.setState({
                    huono: this.state.huono + 1,
                    yhteensa: this.state.yhteensa + 1
                })
            }
        }

    }

    render() {
        return (
            <div>
                <h1>anna palautetta</h1>
                <Button handleClick={this.click(1)} text="Hyvä" />
                <Button handleClick={this.click(2)} text="Neutraali" />
                <Button handleClick={this.click(3)} text="Huono" />
                <Statistics hyva={this.state.hyva} neutraali={this.state.neutraali} huono={this.state.huono} total={this.state.yhteensa} />
            </div>
        )
    }
}
const Button = ({ handleClick, text }) => {
    return (
        <button onClick={handleClick}>{text}</button>
    )
}
const Statistics = (props) => {
    if (props.total === 0) {
        return (
            <div>
                <h2>Statistiikka</h2>
                <em>ei yhtään palautetta annettu</em>
            </div>
        )
    }
    const Keskiarvo = () => (props.hyva - props.huono) / (props.total)
    const Positiivisia = () => (props.hyva) / props.total * 100
    return (
        <div>
            <h2>Statistiikka</h2>
            <table>
                <tbody>
                    <Statistic name="Hyvä" value={props.hyva} />
                    <Statistic name="Neutraali" value={props.neutraali} />
                    <Statistic name="Huono" value={props.huono} />
                    <Statistic name="Keskiarvo" value={<Keskiarvo />} />
                    <Statistic name="Positiivisia" value={<Positiivisia />} unit="%" />
                </tbody>
            </table>
        </div>
    )
}
const Statistic = (props) => {
    return (
        <tr>
            <td>{props.name}</td>
            <td>{props.value}</td>
            <td>{props.unit}</td>
        </tr>

    )
}

const Otsikko = (props) => {
    return (
        <div>
            <h1>anna palautetta</h1>
        </div>

    )
}


ReactDOM.render(
    <App />,
    document.getElementById('root')
)
