const blogsRouter = require('express').Router()
const Blog = require('../models/Blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

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

const getTokenFrom = (request) => {
  const authorization = request.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    return authorization.substring(7)
  }
  return null
}

blogsRouter.post('/', async (request, response) => {
  try {
    const body = request.body

    const token = getTokenFrom(request)
    const decodedToken = jwt.verify(token, process.env.SECRET)

    if (!token || !decodedToken.id) {
      return response.status(401).json({ error: 'token missing or invalid' })
    }

    if (body.likes === undefined) {
      body.likes = 0
    }

    if (body.title === undefined) {
      return response.status(401).json({ error: 'title missing' })
    }

    if (body.author === undefined) {
      return response.status(401).json({ error: 'author missing' })
    }

    console.log('body', body)

    const user = await User.findById(decodedToken.id)

    const blog = new Blog({
      title: body.title,
      author: body.author,
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

blogsRouter.put('/:id', async (request, response) => {
  try {
    const blog = request.body
    console.log('body', blog, 'id', request.params.id)
    

    const result = await Blog
      .findByIdAndUpdate(request.params.id, blog, { new: true })

    response.status(201).json(Blog.format(result))

  } catch (e) {
    console.log(e)
  }
})

module.exports = blogsRouter