import React from 'react'

const Statistics = ({stats}) => {
  
    if (stats.length === 0) {
      return (
        <div>
          <h2>Statistiikka</h2>
          <div>ei yhtään palautetta annettu</div>
        </div>
      )
    }
  const total = stats.good + stats.bad + stats.ok
  const positive = (stats.good / total) * 100
    return (
      <div>
        <h2>Statistiikka</h2>
        <table>
          <tbody>
            <tr>
              <td>hyvä</td>
              <td>{stats.good}</td>
            </tr>
            <tr>
              <td>neutraali</td>
              <td>{stats.ok}</td>
            </tr>
            <tr>
              <td>huono</td>
              <td>{stats.bad}</td>
            </tr>
            <tr>
              <td>hyviä</td>
              <td>{positive} %</td>
            </tr>
          </tbody>
        </table>
  
        <button>nollaa tilasto</button>
      </div >
    )
  }
  export default Statistics