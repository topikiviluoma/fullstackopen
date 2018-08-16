const http = require ('http')

const app = http.createServer((req, res) => {
    res.writeHead(200, {'Content-Type' : 'application/json'})
    res.end('Hello world')
})

const port = 3001
app.listen(port)
console.log(`Server running on port ${port}`)