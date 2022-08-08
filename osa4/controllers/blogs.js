const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({})
    response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
    try {
        const blog = new Blog(request.body)
        const savedBlog = await blog.save()
        response.status(201).json(savedBlog)
    } catch (error) {
        response.status(400).end()
    }
})

blogsRouter.delete('/:id', async (request, response, next) => {
    try {
        await Blog.findByIdAndRemove(request.params.id)
        response.status(204).end()
    } catch(exception) {
        next(exception)
    }
})

blogsRouter.put('/:id', async (request, response,next) => {
    const body = request.body

    const blog = {
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes,
        id: body._id
    }
    try {
        await Blog.findByIdAndUpdate(blog.id, blog, { new: true })
        response.status(200).end()
    } catch(exception) {
        next(exception)
    }
})

module.exports = blogsRouter