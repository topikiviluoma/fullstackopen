import React from 'react'

const Kurssi = ({ kurssi }) => {
    const osat = () => kurssi.osat.map(osa => <p key={osa.id}> {osa.nimi} {osa.tehtavia} </p>)
    
    var yhteensa = kurssi.osat.reduce(function (sum, osa) {
        return sum + osa.tehtavia
    }, 0)
    
    return (
        <div>
            <h1>{kurssi.nimi}</h1>
            {osat()}
            <p>yhteensä {yhteensa} tehtävää</p>
        </div>
    )
}

export default Kurssi