const blogsRouter = require('express').Router()
const Blog = require('../models/Blog')

blogsRouter.get('/', async (request, response) => {
  try {
    const blogs = await Blog.find({})
    response.json(blogs.map(Blog.format))
  } catch (e) {
    console.log(e)
    response.status(404)
  }


})

blogsRouter.post('/', async (request, response) => {
  const blog = new Blog(request.body)
  console.log(blog)
  if (blog.likes === undefined) {
    blog.likes = 0
  }
  if (blog.title === undefined || blog.author === undefined) {
    return response.status(401).json({error: 'wut'})
  }
  console.log('helloouuu')
  const result = await blog.save()
  response.status(201).json(Blog.format(result))


})

module.exports = blogsRouter