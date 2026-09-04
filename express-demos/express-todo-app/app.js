import express from "express"
import morgan from "morgan"
import ejs from "ejs"
import router from "./routes/todoRoutes.js"

const app = express()
app.engine('html', ejs.renderFile)
app.set('view engine', 'html')

app.use(express.urlencoded({extended: true}))

app.use('/', router)

app.listen(9000, () => {
    console.log('Server running on port 9000')
})