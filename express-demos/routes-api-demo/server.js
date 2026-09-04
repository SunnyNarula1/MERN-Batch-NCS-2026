import express from "express"
import router from "./routes/productRoutes.js"
const app = express()

app.use(express.json())
app.use('/api/products', router)


app.listen(9000, () => {
    console.log('Server is running at port 9000')
})