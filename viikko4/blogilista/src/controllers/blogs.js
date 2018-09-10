const blogsRouter = require('express').Router()
const Blog = require('../models/Blog')
const User = require('../models/user')

blogsRouter.get('/', async (request, response) => {
  try {
    const blogs = await Blog
      .find({})
      .populate('user', { username: 1, name: 1 })
    response.json(blogs.map(Blog.format))
  } catch (e) {
    console.log(e)
    response.status(404)
  }


})

blogsRouter.post('/', async (request, response) => {
  try {
    const body = request.body

    if (body.likes === undefined) {
      body.likes = 0
    }

    if (body.title === undefined || body.author === undefined) {
      return response.status(401).json({ error: 'title of author missing' })
    }

    const user = await User.findById(body.userId)

    const blog = new Blog({
      title: body.title,
      author: body.autor,
      url: body.url,
      likes: body.likes,
      user: user
    })

    const result = await blog.save()
    if (user !== null) {
      user.blogs = user.blogs.concat(result._id)
      await user.save()
    }
    response.status(201).json(Blog.format(result))

  } catch (e) {
    console.log(e)
  }


})

module.exports = blogsRouter