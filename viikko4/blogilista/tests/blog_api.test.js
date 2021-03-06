const supertest = require('supertest')
const { app, server } = require('../src/index')
const api = supertest(app)
const Blog = require('../src/models/Blog')
const { formatBlog, initialBlogs, nonExistingId, blogsInDb } = require('../tests/test_helper')

describe('when there is initially some blogs saved', async () => {
    beforeAll(async () => {
        await Blog.remove({})

        const blogObjects = initialBlogs.map(b => new Blog(b))
        await Promise.all(blogObjects.map(b => b.save()))
    })

    test('blogs are returned as json', async () => {
        const blogsInDatabase = await blogsInDb()

        const response = await api
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/)

        expect(response.body.length).toBe(blogsInDatabase.length)

        const returnedContents = response.body.map(b => b.title)
        blogsInDatabase.forEach(blog => {
            expect(returnedContents).toContain(blog.title)
        })
    })
})

test('there are five blogs', async () => {
    const response = await api
        .get('/api/blogs')

    expect(response.body.length).toBe(6)
})

test('the first blog is about React', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body[0].title).toBe('React patterns')
})

describe('adding of new blog', async () => {
   

    test('POST /api/blogs succeeds with valid data', async () => {
        const blogsAtStart = await blogsInDb()
        const newBlog = {
            title: "Test testersön",
            author: "Peter Parker",
            url: "http://www.google.com",
            likes: 5
        }
        await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

        const blogsAfter = await blogsInDb()
        
        expect(blogsAfter.length).toBe(blogsAtStart.length + 1)
    })

    test('POST /api/blogs without likes defaults to 0', async () => {
        const newBlog = {
            title: "Test title",
            author: "Peter Parker",
            url: "www.google.com"
        }
        await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

        const allBlogs = await blogsInDb()
        const addedBlog = allBlogs[allBlogs.length - 1]
        expect(addedBlog.likes).toBe(0)
    })

    test('POST /api/blogs fails without title or author', async () => {
        const newBlog = {
            url: "www.google.com",
            likes: 1
        }

        await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(401)
    })
})

afterAll(() => {
    server.close()
})
