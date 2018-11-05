import React from 'react';


class App extends React.Component {


  voteUp = (e) => () => {
    this.props.store.dispatch({type: 'vote', anecdote: e})
  }

  addAnecdote = (event) => {
    event.preventDefault()
    this.props.store.dispatch({
      type: 'addNew',
      data: {
        content: event.target.anecdote.value,
        votes: 0
      }
    })
    event.target.anecdote.value = ''
  }
  render() {
    const anecdotes = this.props.store.getState().sort((a, b) => {
      return b.votes - a.votes
    })
    return (
      <div>
        <h2>Anecdotes</h2>
        {anecdotes.map(anecdote=>
          <div key={anecdote.id}>
            <div>
              {anecdote.content} 
            </div>
            <div>
              has {anecdote.votes}
              <button onClick={this.voteUp(anecdote)}>vote</button>
            </div>
          </div>
        )}
        <h2>create new</h2>
        <form onSubmit={this.addAnecdote}>
          <div><input name="anecdote" /></div>
          <button type="submit">create</button> 
        </form>
      </div>
    )
  }
}

export default App