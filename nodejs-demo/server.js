const http = require('http')
const fs = require('fs')
// const server = http.createServer((req, res)=>{
//     res.end('Welcome to NodeJS')
// })

const server = http.createServer((req, res)=>{
    fs.readFile('index.html', (err, data)=>{
        if(err == null){
            res.setHeader('Content-Type', 'text/html')
            res.end(data)
        }
    })
})

server.listen(9000, 'localhost', ()=>{
    console.log('Server is running on port 9000')
})