import React from 'react'

const People = ({ people, deletePerson }) => {
    return (
        <table>
            <tbody>
                {
                    people.map(person =>
                        <tr key={person.id}>
                        <td>{person.name}</td>
                        <td>{person.number}</td>
                        <td><button className="delete" onClick={deletePerson}>Poista</button></td>
                        </tr>
                    )
                }
               
            </tbody>
        </table>
        

    )
}

export default People