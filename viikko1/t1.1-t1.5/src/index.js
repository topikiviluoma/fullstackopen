import React from 'react'
import ReactDOM from 'react-dom'

// Tehtävät 1.1-1.5

const Otsikko = (props) => {
return (
    <div>
        <h1>{props.nimi}</h1>
    </div>
)
}

const Osa = (props) => {
    return(
        <div>
        <p>{props.section} {props.amount}</p>
        </div>
    )
}

const Sisalto = (props) => {

return (
    <div>
        <Osa section={props.osat[0].nimi} amount={props.osat[0].tehtavia}/>
        <Osa section={props.osat[1].nimi} amount={props.osat[1].tehtavia}/>
        <Osa section={props.osat[2].nimi} amount={props.osat[2].tehtavia}/>
    </div>
)
}

const Yhteensa = (props) => {
    return (
        <div>
            <p>yhteensä {props.osat[0].tehtavia + props.osat[1].tehtavia + props.osat[2].tehtavia} tehtävää</p>
        </div>
    )
}

const App = () => {
    const kurssi = {
        nimi: 'Half Stack -sovelluskehitys',
        osat: [
          {
            nimi: 'Reactin perusteet',
            tehtavia: 10
          },
          {
            nimi: 'Tiedonvälitys propseilla',
            tehtavia: 7
          },
          {
            nimi: 'Komponenttien tila',
            tehtavia: 14
          }
        ]
      }

  return (
    <div>
      <Otsikko nimi={kurssi.nimi}/>
      <Sisalto osat={kurssi.osat}/>
      <Yhteensa osat={kurssi.osat}/>
    </div>
  )
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)