const supertest = require('supertest')
const { app, server } = require('../src/index')
const api = supertest(app)
const User = require('../src/models/user')
const { formatUser, initialBlogs, nonExistingId, blogsInDb, usersInDb } = require('../tests/test_helper')

describe.only('when there is initially one user at db', async () => {
    beforeAll(async () => {
        await User.remove({})
        const user = new User({ username: 'root', password: 'sekret' })
        await user.save()
    })

    test('POST /api/users succeeds with a fresh username', async () => {
        const usersBeforeOperation = await usersInDb()

        const newUser = {
            username: 'tester',
            name: 'Testi Testersön',
            password: 'salainen'
        }

        await api
            .post('/api/users')
            .send(newUser)
            .expect(200)
            .expect('Content-Type', /application\/json/)

        const usersAfterOperation = await usersInDb()
        expect(usersAfterOperation.length).toBe(usersBeforeOperation.length + 1)
        const usernames = usersAfterOperation.map(u => u.username)
        expect(usernames).toContain(newUser.username)
    })

    test('POST /api/users fails with user that already exists', async () => {
        const newUser = {
            username: 'root',
            name: 'rootname',
            password: 'sekret'
        }
        await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect({error: 'username must be unique'})
    })

    test('POST /api/users fails when password is too short', async () => {
        const newUser = {
            username: 'tester1',
            name: 'test',
            password: 's'
        }
        await api
        .post('/api/users')
        .send(newUser)
        .expect(400)
        .expect({error: 'password must be at least 3 characters long'})
    })
})

afterAll(() => {
    server.close()
})
