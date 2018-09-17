import React, { Component } from 'react'
import blogService from '../services/blogs'
import Notification from '../components/Notification'

class BlogForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            title: '',
            author: '',
            url: '',
            message: null
        }
    }

    handleFieldChange = (event) => {
        this.setState({ [event.target.name]: event.target.value })
    }

    handleFormSend = async (event) => {
        event.preventDefault()
        const result = await blogService.create({
            title: this.state.title,
            author: this.state.author,
            url: this.state.url
        })
        this.setState({
            message: `a new blog '${this.state.title}' by ${this.state.author} added`
        })
        setTimeout(() => {
            this.setState({ error: null })
        }, 5000)
        this.setState({
            title: '',
            author: '',
            url: ''
        })

        console.log(result)
    }

    render() {
        return (
            <div>
                <Notification type="notification" message={this.state.message} />

                <form onSubmit={this.handleFormSend}>
                    <div>
                        title
                    <input type="text" onChange={this.handleFieldChange} name="title" />
                    </div>
                    <div>
                        author
                    <input type="text" onChange={this.handleFieldChange} name="author" />
                    </div>
                    <div>
                        url
                    <input type="text" onChange={this.handleFieldChange} name="url" />
                    </div>
                    <button type="submit">create</button>
                </form>
            </div>
        )
    }
}
export default BlogForm 