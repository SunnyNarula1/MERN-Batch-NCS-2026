const http = require('http')
const fs = require('fs')
const formidable = require('formidable')
const SendEmail = require('./mailservice')

const server = http.createServer((req, res) => {
    if (req.url == "/") {
        fs.readFile('index.html', (err, data) => {
            if (!err) {
                res.setHeader('Content-Type', 'text/html')
                res.end(data.toString())
            }
        })
    }
    if (req.url == '/api/sendemail' && req.method == 'POST') {
        const form = formidable({ multiples: true })
        form.parse(req, async (err, fields, files) => {
            if (err) {
                res.writeHead(err.httpCode || 400, { 'Content-Type': 'text/plain' })
                res.end(String(err))
            }
            res.writeHead(200, { 'Content-Type': 'application/json' })
            // Send email code will go here
            let url = await SendEmail(fields.to, fields.subject, fields.messageBody, files.fileInput)
            res.end(`Email sent successfully! You can preview you email here - ${url}`)
        })
    }
})

server.listen(9000, () => {
    console.log('Server is running on port 9000')
})