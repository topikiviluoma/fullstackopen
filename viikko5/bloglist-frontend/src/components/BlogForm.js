import React from 'react'
import PropTypes from 'prop-types'

const BlogForm = ({ handleSubmit, handleChange}) => {

    BlogForm.propTypes = {
        handleChange: PropTypes.func.isRequired,
        handleSubmit: PropTypes.func.isRequired
    }

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