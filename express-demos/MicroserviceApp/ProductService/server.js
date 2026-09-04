import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"
import routes from "./routes/ProductRoutes.js"
import morgan from "morgan"
import ConsulConfiguration from "./ConsulConfig.js"

dotenv.config()

const app = express()
ConsulConfiguration(app)
app.use(morgan('dev'))
app.use(express.json())
app.use('/api/v1', routes)

mongoose.connect(process.env.DB_URL)
mongoose.connection.once("open", () => {
    console.log("Connected to Database")
}).on("error", (err) => {
    console.log(err)
})

app.listen(5000, () => {
    console.log("Server is running on port 5000")
})