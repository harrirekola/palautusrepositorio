const supertest = require('supertest')
const User = require("../models/user")
const app = require('../app')
const helper = require('./test_helper')
const api = supertest(app)

describe('No invalid users are created', () => {
    beforeEach(async () => {
        await User.deleteMany({})
        await User.insertMany(helper.initalUsers)
    })
    test('Username is less than 3 characters', async () => {

        const newUser = {
            "username": "ma",
            "name": "matti",
            "password": "123456"
        }

        await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
    })
    test('Username is not unique', async () => {

        const newUser = {
            "username": "dragonslayer1",
            "name": "matti",
            "password": "123456"
        }

        await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
    })
    test('Password is missing', async () => {

        const newUser = {
            "username": "man",
            "name": "matti",
            "password": null
        }

        await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
    })
    test('Password is less than 3 characters', async () => {

        const newUser = {
            "username": "man",
            "name": "matti",
            "password": "q1"
        }

        await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
    })
})