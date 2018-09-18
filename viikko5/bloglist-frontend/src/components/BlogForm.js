import React, { Component } from 'react'

const BlogForm = ({ handleSubmit, handleChange}) => {

    return (
        <div>

            <form onSubmit={handleSubmit}>
                <div>
                    title
                    <input type="text" onChange={handleChange} name="title" />
                </div>
                <div>
                    author
                    <input type="text" onChange={handleChange} name="author" />
                </div>
                <div>
                    url
                    <input type="text" onChange={handleChange} name="url" />
                </div>
                <button type="submit">create</button>
            </form>
        </div>
    )
}






export default BlogForm 