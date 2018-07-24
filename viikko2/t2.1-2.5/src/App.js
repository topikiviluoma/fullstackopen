import React from 'react'
import Kurssi from './component/Kurssi'

const App = ({kurssit}) => {
  
    const kaikki = kurssit.map(kurssi => < Kurssi kurssi={kurssi} />)
    console.log(kaikki)
  
    return (
      <div>
        <h1>Opetusohjelma</h1>
        {kaikki}
      </div>
    )
  }

  export default App