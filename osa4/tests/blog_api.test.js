const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const User = require('../models/user')


beforeEach(async () => {
    await Blog.deleteMany({})
    await User.deleteMany({})
    await Blog.insertMany(helper.initialBlogs)
})

test('right amount of JSON-type blogs are returned', async () => {
    const response = await helper.blogsInDb()
    expect(response).toHaveLength(helper.initialBlogs.length)
})

test('blog has id field', async () => {
    const blogs = await helper.blogsInDb()
    blogs.forEach(blog => {
        expect(blog.id).toBeDefined()
    })
})

test('ability to post blogs', async () => {

    await api
        .post('/api/users')
        .send({
            username: "root",
            name: "root",
            password: "root"
        })

    const a = await api
        .post('/api/login')
        .send({
            username: "root",
            password: "root"
        })
        .set('Accept', 'application/json')

    const users = await helper.usersInDb()
    const existingUser = users[0]
    const newBlog = {
        title: "TDD harms architecture",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
        likes: 0,
        user: existingUser.id
    }

    await api
        .post('/api/blogs')
        .set({ 'Authorization': `bearer ${a.body.token}` })
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

    const response = await helper.blogsInDb()

    expect(response).toHaveLength(helper.initialBlogs.length + 1)
})

test('if likes has no value set it to 0', async () => {

    await api
        .post('/api/users')
        .send({
            username: "root",
            name: "root",
            password: "root"
        })

    const a = await api
        .post('/api/login')
        .send({
            username: "root",
            password: "root"
        })
        .set('Accept', 'application/json')

    const users = await helper.usersInDb()
    const existingUser = users[0]

    const newBlog = {
        title: "TDD harms architecture",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
        user: existingUser.id
    }

    await api
        .post('/api/blogs')
        .set({ 'Authorization': `bearer ${a.body.token}` })
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

    const response = await helper.blogsInDb()

    expect(response[response.length - 1].likes).toEqual(0)
})

test('if title and url is null', async () => {

    await api
        .post('/api/users')
        .send({
            username: "root",
            name: "root",
            password: "root"
        })

    const a = await api
        .post('/api/login')
        .send({
            username: "root",
            password: "root"
        })
        .set('Accept', 'application/json')

    const users = await helper.usersInDb()
    const existingUser = users[0]

    const newBlog = {
        author: "Robert C. Martin",
        likes: 0,
        user: existingUser.id
    }

    await api
        .post('/api/blogs')
        .set({ 'Authorization': `bearer ${a.body.token}` })
        .send(newBlog)
        .expect(400)
})

test('of blog deletion', async () => {

    await api
        .post('/api/users')
        .send({
            username: "root",
            name: "root",
            password: "root"
        })

    const a = await api
        .post('/api/login')
        .send({
            username: "root",
            password: "root"
        })
        .set('Accept', 'application/json')

    const users = await helper.usersInDb()
    const existingUser = users[0]

    const newBlog = {
        title: "TDD harms architecture",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
        user: existingUser.id
    }

    await api
        .post('/api/blogs')
        .set({ 'Authorization': `bearer ${a.body.token}` })
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)
    const response = await helper.blogsInDb()
    const blogToDelete = response[response.length - 1].id

    await api
        .delete(`/api/blogs/${blogToDelete}`)
        .set({ 'Authorization': `bearer ${a.body.token}` })
        .expect(204)

    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
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

    const response = await helper.blogsInDb()
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

test('posting without token returns 401', async () => {

    await api
        .post('/api/users')
        .send({
            username: "root",
            name: "root",
            password: "root"
        })

    const users = await helper.usersInDb()
    const existingUser = users[0]

    const newBlog = {
        title: "TDD harms architecture",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
        likes: 0,
        user: existingUser.id
    }

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(401)

})

afterAll(() => {
    mongoose.connection.close
})