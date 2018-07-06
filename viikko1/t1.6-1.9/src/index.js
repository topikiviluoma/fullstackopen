import React from 'react';
import ReactDOM from 'react-dom';

class App extends React.Component {
    constructor() {
        super()
        this.state = {
            hyva: 0,
            neutraali: 0,
            huono: 0,
            
        }
    }
    clickHyva = () => {
        this.setState({
            hyva: this.state.hyva + 1
        })
    }
    clickNeutraali = () => {
        this.setState({
            neutraali: this.state.neutraali + 1
        })
    }
    clickHuono = () => {
        this.setState({
            huono: this.state.huono + 1
        })
    }


    render() {
        let yhteensa = this.state.hyva + this.state.neutraali + this.state.huono
        return(
            <div>
                <h1>anna palautetta</h1>
                <Button handleClick={this.clickHyva} text="Hyvä" />
                <Button handleClick={this.clickNeutraali} text="Neutraali" />
                <Button handleClick={this.clickHuono} text ="Huono"/>
                <Statistics hyva = {this.state.hyva} neutraali = {this.state.neutraali} huono = {this.state.huono} total = {yhteensa}/>
            </div>
        )
    }
}
const Button = ({ handleClick, text}) => {
    return(
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
    const Keskiarvo = () => (props.hyva - props.huono)/(props.total)
    const Positiivisia = () => (props.hyva)/props.total * 100
    return (
        <div>
            <h2>Statistiikka</h2>
            <Statistic name="Hyvä" value={props.hyva} />
            <Statistic name="Neutraali" value={props.neutraali} />
            <Statistic name="Huono" value={props.huono} />
            <Statistic name="Keskiarvo" value={<Keskiarvo />} />
            <Statistic name="Positiivisia" value={<Positiivisia />} unit="%" />
        </div>
    )
}
const Statistic = (props) => {
    return (
        <p>{props.name} {props.value} {props.unit}</p>
    )
}

const Otsikko = (props) => {
    return(
        <div>
            <h1>anna palautetta</h1>
        </div>

    )
}


ReactDOM.render(
    <App />,
    document.getElementById('root')
  )
