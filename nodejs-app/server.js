const http = require('http')
const fs = require('fs')
const path = require('path')

const PORT = 3000
const PUBLIC_DIR = path.join(__dirname, 'public')

const server = http.createServer((req, res) => {

    const url = new URL(req.url, `http://${req.headers.host}`)
    const pathname = url.pathname
    const query = url.searchParams

    // Routes
    if (pathname == "/") {
        return sendFile(res, path.join(PUBLIC_DIR, 'index.html'))
    }

    if (pathname == "/about") {
        return sendFile(res, path.join(PUBLIC_DIR, 'about.html'))
    }

    if (pathname == '/api/search') {
        res.setHeader('Content-Type', 'application/json')
        return res.end(JSON.stringify({name: 'John', email: 'John@gmail.com', age: 25}))
    }

    if (pathname == '/greet') {
        const name = query.get('name') || 'Guest'

        res.setHeader('Content-Type', 'text/html')
        return res.end(`<h1>Hello ${name}</h1>`)
    }


    if (pathname.startsWith('/static/')) {
        const relative = pathname.slice('/static/'.length)
        const filepath = path.join(PUBLIC_DIR, relative)
        if (!filepath.startsWith(PUBLIC_DIR)) return notFound(res)

        return sendFile(res, filepath)
    }

})

function sendFile(res, filePath) {
    fs.readFile(filePath, (err, data) => {
        if (err) notFound(res)
        const ext = path.extname(filePath)
        const type = ext == '.html'? 'text/html': 'text/css'
        res.setHeader('Content-Type', type)
        res.end(data)
    })
}
function notFound(res) {
    res.statusCode = 404
    res.setHeader('Content-Type', 'text/html')
    res.end('<h1>404 - Not Found</h1>')
}

server.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`)
})