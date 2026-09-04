import express from "express"
import logger from "morgan"
import mongoose from "mongoose"
import dotenv from "dotenv"
import routes from "./Routes/CustomerRoutes.js"

dotenv.config()

const app = express()

app.use(logger("dev"))
app.use(express.json())
app.use('/api/v1', routes)

mongoose.connect(process.env.MONGODB_URL)
mongoose.connection.once("open", () => {
    console.log("Connected to MongoDB")
}).on("error", (err) => {
    console.log(err)
})

// mongoose.disconnect()

// mongoose.connection.on("disconnected", ()=>{
//     console.log('Mongoose lost connection to the database')
// })

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`)
})