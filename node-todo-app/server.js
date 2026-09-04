const http = require('http')
const fs = require('fs')
const path = require('path')
const uuid = require('uuid')
const logger = require('./logger')

const PORT = 3000
const PUBLIC_DIR = path.join(__dirname, 'public')
const DATA_FILE = path.join(__dirname, 'data.json')

// MIME - Multipurpose Internet Mail Extensions
const MIME = { '.html': 'text/html', '.css': 'text/css', '.js': 'text/javascript' }

// General purpose function for reading and writing the file for data layer (data.json file)
function readTasks() {
    if (!fs.existsSync(DATA_FILE)) return []
    return JSON.parse(fs.readFileSync(DATA_FILE, 'utf-8')).tasks
}

function writeTasks(tasks) {
    fs.writeFileSync(DATA_FILE, JSON.stringify({ tasks }, null, 2))
}

// HTTP Server
const server = http.createServer((req, res) => {

    // logger.info(`${req.method} ${req.url}`)
    logger.log('INFO', `${req.method} ${req.url}`)

    // http://www.xyz.com?category=electronics
    const pathname = req.url.split('?')[0]

    // GET /api/tasks -> gets all data
    if (pathname == '/api/tasks' && req.method == 'GET') {
        return sendJSON(res, 200, readTasks())
    }

    if (pathname == '/error' && req.method == 'GET'){
        // logger.error('Something went wrong')
        logger.log('ERROR', 'Something went wrong')
        return sendJSON(res, 500, {error: 'Something went wrong'})
    }

    // POST /api/tasks -> creating new data
    if (pathname == '/api/tasks' && req.method == 'POST') {
        return getBody(req, (body) => {
            if (!body || !body.title)
                return sendJSON(res, 400, { error: 'Body data or title not present' })
            const tasks = readTasks()
            const task = { id: uuid.v4(), title: body.title, done: false }
            tasks.push(task)
            writeTasks(tasks)
            sendJSON(res, 201, task)
        })
    }

    // DELETE /api/tasks/:id - Delete data from data.json
    // http://localhost:3000/api/tasks/c6986911-bdf7-4df1-9719-3a593a5489be
    if (pathname.startsWith('/api/tasks') && req.method == 'DELETE') {
        const id = pathname.split('/')[3]
        const tasks = readTasks()
        const index = tasks.findIndex(t => t.id == id)

        if (index == -1)
            return sendJSON(res, 404, { error: `Task with id - ${id} not found` })

        const removedItem = tasks.splice(index, 1)
        writeTasks(tasks)
        return sendJSON(res, 200, removedItem)
    }

    // For static files
    if (pathname == "/") return sendFile(res, path.join(PUBLIC_DIR, 'index.html'))

    const filepath = path.join(PUBLIC_DIR, pathname)
    if(!filepath.startsWith(PUBLIC_DIR)) return notFound(res)

    sendFile(res, filepath)
})

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})

// ----helper function----
function sendJSON(res, status, data) {
    res.statusCode = status
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify(data))
}

function sendFile(res, filePath) {
    fs.readFile(filePath, (err, data) => {
        if(err) return notFound(res)

        res.setHeader('Content-Type', MIME[path.extname(filePath)])
        res.end(data)
    })
}

function getBody(req, callback) {
    let body = ''
    req.on('data', chunk => body += chunk)
    req.on('end', () => {
        try { callback(JSON.parse(body)) }
        catch { callback(null) }
    })
}

function notFound(res) {
    res.statusCode = 404
    res.setHeader('Content-Type', 'text/html')
    res.end('<h1>404 - Not Found</h1>')
}