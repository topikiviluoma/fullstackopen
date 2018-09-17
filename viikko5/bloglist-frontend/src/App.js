import React from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import Notification from './components/Notification'
import loginService from './services/login'
import BlogForm from './components/BlogForm'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      blogs: [],
      user: null,
      username: '',
      password: '',
      error: ''
    }
  }

  componentDidMount() {
    blogService.getAll().then(blogs =>
      this.setState({ blogs })
    )

    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      this.setState({user})
      blogService.setToken(user.token)
    }
  }

  login = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username: this.state.username,
        password: this.state.password
      })
      window.localStorage.setItem('loggedUser', JSON.stringify(user))
      blogService.setToken(user.token)
      this.setState({ username: '', password: '', user: user })
    } catch (e) {
      console.log(e)
      this.setState({
        error: 'wrong username of password',
      })
      setTimeout(() => {
        this.setState({ error: null })
      }, 5000)
    }
  }

  handleLoginFieldChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }



  render() {
    const loginForm = () => {
      return (
        <div>
          <h2>Log into application</h2>
          <form onSubmit={this.login}>
            <label htmlFor="username">
              username:
        <input
                id="username"
                type="text"
                name="username"
                value={this.state.username}
                onChange={this.handleLoginFieldChange}
              />
            </label>
            <label htmlFor="password">
              password
          <input
                id="password"
                type="password"
                name="password"
                value={this.state.password}
                onChange={this.handleLoginFieldChange}
              />
            </label>
            <button type="submit">kirjaudu</button>
          </form>
        </div>
      )

    }
    if (this.state.user == null) {
      return (
        <div>
          <Notification message={this.state.error} />
          {loginForm()}
        </div>
      )
    }
    return (
      <div>
        <Notification message={this.state.error} />
        <div>
          <p>{this.state.user.name} logged in <button onClick={window.localStorage.removeItem('loggedUser')}> logout </button></p>
          <BlogForm />
          <h2>blogs</h2>
          {this.state.blogs.map(blog =>
            <Blog key={blog._id} blog={blog} />
          )}
        </div>

      </div>
    )
  }
}

export default App;
