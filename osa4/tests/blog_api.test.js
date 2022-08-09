const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')


beforeEach(async () => {
    await Blog.deleteMany({})
    for (let i = 0; i < helper.initialBlogs.length; i++) {
        let blogObject = new Blog(helper.initialBlogs[i])
        await blogObject.save()
    }
})

test('right amount of JSON-type blogs are returned', async () => {
    const response = await helper.notesInDb()
    expect(response).toHaveLength(helper.initialBlogs.length)
})

test('blog has id field', async () => {
    const blogs = await helper.notesInDb()
    blogs.forEach(blog => {
        expect(blog.id).toBeDefined()
    })
})

test('ability to post blogs', async () => {
    const newBlog = {
        _id: "5a422ba71b54a676234d17fb",
        title: "TDD harms architecture",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
        likes: 0,
    }

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

    const response = await helper.notesInDb()

    expect(response).toHaveLength(helper.initialBlogs.length + 1)
    expect(response[response.length - 1]).toEqual({
        id: "5a422ba71b54a676234d17fb",
        title: "TDD harms architecture",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
        likes: 0,
    })
})

test('if likes has no value set it to 0', async () => {
    const newBlog = {
        _id: "5a422ba71b54a676234d17fb",
        title: "TDD harms architecture",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
    }

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

    const response = await helper.notesInDb()

    expect(response[response.length - 1]).toEqual({
        id: "5a422ba71b54a676234d17fb",
        title: "TDD harms architecture",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
        likes: 0,
    })
})

test('if title and url is null', async () => {
    const newBlog = {
        _id: "5a422ba71b54a676234d17fb",
        author: "Robert C. Martin",
        likes: 0
    }
    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(400)
})

test('of blog deletion', async () => {
    const response = await helper.notesInDb()
    const blogToDelete = response[0].id

    await api
        .delete(`/api/blogs/${blogToDelete}`)
        .expect(204)

    const blogsAtEnd = await helper.notesInDb()

    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length - 1)
    expect(blogsAtEnd).not.toContain(blogToDelete)
})

test('blog update', async () => {
    const updated = {
        _id: "5a422b3a1b54a676234d17f9",
        title: "Canonical string reduction",
        author: "Edsger W. Dijkstra",
        url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
        likes: 50
    }

    await api
        .put(`/api/blogs/${updated._id}`)
        .send(updated)
        .expect(200)

    const response = await helper.notesInDb()
    expect(response).toEqual(
        expect.arrayContaining([
            expect.objectContaining({
                id: "5a422b3a1b54a676234d17f9",
                title: "Canonical string reduction",
                author: "Edsger W. Dijkstra",
                url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
                likes: 50
            })
        ])
    )
})

afterAll(() => {
    mongoose.connection.close
})