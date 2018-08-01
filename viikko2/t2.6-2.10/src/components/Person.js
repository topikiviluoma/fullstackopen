import React from 'react'

const Person = ({ person, deletePerson }) => {
    return (
        <table>
            <tbody>
                <tr>
                    <td>{person.name}</td>
                    <td>{person.number}</td>
                    <td><button class="delete" onClick={deletePerson}>Poista</button></td>
                </tr>
            </tbody>
        </table>
        

    )
}

export default Person