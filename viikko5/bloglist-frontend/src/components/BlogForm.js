import React, { Component } from 'react'
import blogService from '../services/blogs'

class BlogForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            title: '',
            author: '',
            url: ''
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
            title: '',
            author: '',
            url: ''
        })
        console.log(result)
    }

    render() {
        return (
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
        )
    }
}
export default BlogForm 