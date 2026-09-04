import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"
import routes from "./routes/ProductRoutes.js"
import morgan from "morgan"
import session from "express-session"
import passport from "passport"
import { PassportLocalAuth } from "./auth/UserAuth.js"
import UserModel from "./models/UserModel.js"

dotenv.config()

const store = session.MemoryStore()

const app = express()
app.use(morgan('dev'))
app.use(express.json())
app.use(session({
    secret: 'this is my secret key for session',
    saveUninitialized: false,
    cookie: {
        maxAge: 60000
    },
    store: store,
    resave: false
}))

app.use(passport.initialize())
app.use(passport.session())

passport.serializeUser(function (user, done) {
    done(null, user._id)
})

passport.deserializeUser (async function (id, done) {
    const user = await UserModel.findById(id)
    done(null, user)
})
passport.use(PassportLocalAuth())

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