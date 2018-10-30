import React, { Component } from 'react'
import blogService from '../services/blogs'

class Blog extends Component {
  constructor(props) {
    super(props)
    this.state = {
      visible: false
    }
  }

  handleClick = () => {
    this.setState({ visible: !this.state.visible })
  }

  handleLike = () => {
    console.log(this.props.blog)
    const newObject = this.props.blog
    newObject.likes = newObject.likes + 1
    blogService.update(newObject)
  }

  handleRemove = () => {
    if (window.confirm('Delete blog?')) {
      blogService.remove(this.props.blog)
    }
    
  }

  render() {
    const blogStyle = {
      paddingTop: 10,
      paddingLeft: 2,
      border: 'solid',
      borderWidth: 1,
      marginBottom: 5
    }


    return (
      <div onClick={this.handleClick} style={blogStyle} className="wrapper">
        {this.state.visible ?
          <div className="content">
            {this.props.blog.title} {this.props.blog.author}
            <br></br>
            {this.props.blog.url}
            <br></br>
            {this.props.blog.likes} likes <button onClick={this.handleLike}>like</button>
            <br></br>
            added by {this.props.blog.user.name}
            <br></br>
            <button onClick={this.handleRemove}>delete</button>
          </div> :
          <div className="content">
            {this.props.blog.title} {this.props.blog.author}
          </div>}
      </div>
    )
  }
}

export default Blog