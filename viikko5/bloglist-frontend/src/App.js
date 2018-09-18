import React from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import Notification from './components/Notification'
import loginService from './services/login'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      blogs: [],
      user: null,
      username: '',
      password: '',
      title: '',
      author: '',
      url: '',
      message: null,
      messageType: '',
      loginVisible: false
    }
  }

  componentDidMount = async () => {
    const blogs = await blogService.getAll()
    this.setState({ blogs })


    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      this.setState({ user })
      blogService.setToken(user.token)
    }
    console.log(loggedUserJSON)
  }

  login = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username: this.state.username,
        password: this.state.password
      })
      console.log('login user', user)

      window.localStorage.setItem('loggedUser', JSON.stringify(user))
      console.log('localStorage', window.localStorage.getItem('loggedUser'))
      blogService.setToken(user.token)
      this.setState({ username: '', password: '', user: user })
    } catch (e) {
      console.log(e)
      this.setState({
        message: 'wrong username of password',
        messageType: 'error'
      })
      setTimeout(() => {
        this.setState({ error: null })
      }, 5000)
    }
  }

  handleLoginFieldChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }

  logout = (event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedUser')
    window.location.reload()
  }

  addBlog = async (event) => {
    event.preventDefault()
    if (this.state.title === '' || this.state.author === '' || this.state.url === '') {
      this.setState({
        message: 'Please fill all fields',
        messageType: 'error'
      })
      setTimeout(() => {
        this.setState({ message: null })
      }, 5000)

    } else {
      
      const result = await blogService.create({
        title: this.state.title,
        author: this.state.author,
        url: this.state.url
      })
      this.setState({
        message: `a new blog '${this.state.title}' by ${this.state.author} added`,
        messageType: 'notification'
      })
      setTimeout(() => {
        this.setState({ message: null })
      }, 5000)
      this.setState({
        title: '',
        author: '',
        url: ''
      })
    }

  }



  render() {

    const loginForm = () => {
      const hideWhenVisible = { display: this.state.loginVisible ? 'none' : '' }
      const showWhenVisible = { display: this.state.loginVisible ? '' : 'none' }

      return (
        <div>
          <div style={hideWhenVisible}>
            <button onClick={e => this.setState({ loginVisible: true })}>log in</button>
          </div>
          <div style={showWhenVisible}>
            <LoginForm
              username={this.state.username}
              password={this.state.password}
              handleChange={this.handleLoginFieldChange}
              handleSubmit={this.login}
            />
            <button onClick={e => this.setState({ loginVisible: false })}>cancel</button>
          </div>
        </div>
      )
    }

    if (this.state.user == null) {
      return (
        <div>
          <Notification type={this.state.messageType} message={this.state.message} />

          {loginForm()}

        </div>
      )
    }
    return (
      <div>
        <Notification type={this.state.messageType} message={this.state.message} />

        <div>
          <p>{this.state.user.name} logged in <button onClick={this.logout}> logout </button></p>
          <BlogForm handleSubmit={this.addBlog}
            handleChange={this.handleLoginFieldChange}
            author={this.state.author}
            title={this.state.title}
            url={this.state.url}
          />
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
