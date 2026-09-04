import express from "express"

const app = express()

app.use(express.static('public'))
app.use(express.urlencoded({extended: true}))

app.get("/", (req, res) => {
    res.send('Welcome to Express')
})

app.post('/login', (req, res)=>{
    res.send(`${req.body.username} ${req.body.password}`)
})

app.listen(9000, () => {
    console.log('Server running on port 9000')
})