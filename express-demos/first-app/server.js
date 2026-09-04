import express from "express"
import ejs from "ejs"
// const express = require("express")

const app = express()

app.use(express.static('public'))

app.engine('html', ejs.renderFile)
app.set('view engine', 'html')

app.get("/", (req, res) => {
    res.send("Welcome to ExpressJS")
})

app.get('/product', (req, res) => {
    res.send("This is product route")
})

const countries = ['India', 'China', 'Russia', 'Japan', 'England']

app.get('/home', (req, res) => {
    res.render('index', {username: 'Dhiraj', countryList: countries})
})

app.listen(9000, () => {
    console.log("Server is running on port 9000")
})