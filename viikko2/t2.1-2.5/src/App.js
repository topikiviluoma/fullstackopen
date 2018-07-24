import React from 'react'
import Kurssi from './component/Kurssi'

const App = () => {
    const kurssi = {
      nimi: 'Half Stack -sovelluskehitys',
      osat: [
        {
          nimi: 'Reactin perusteet',
          tehtavia: 10,
          id: 1
        },
        {
          nimi: 'Tiedonvälitys propseilla',
          tehtavia: 7,
          id: 2
        },
        {
          nimi: 'Komponenttien tila',
          tehtavia: 14,
          id: 3
        }
      ]
    }
    const result = kurssi.osat.map(osa => osa.nimi)
    console.log(result)
  
    return (
      <div>
        <Kurssi kurssi={kurssi} />
      </div>
    )
  }

  export default App