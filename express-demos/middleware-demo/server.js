import express from "express"
import morgan from "morgan"

const app = express()

function logger(req, res, next) {
    console.log(`${req.method} ${new Date().toISOString()} ${req.url}`)
    next()
}

// app.use(logger)
app.use(morgan('dev'))
app.use((err, req, res, next) => {
    console.error(err.message)
    res.status(500).json({ error: err.message })
    next()
})

app.get('/', (req, res) => {
    res.send('Welcome Home')
})

app.get('/products', (req, res) => {
    res.send('This is products')
})

app.get('/error', (req, res)=>{
    throw new Error('Somthing went wrong')
})

app.listen(9000, () => {
    console.log('server is running on port 9000')
})