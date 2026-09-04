import express from "express";
import mongoose from "mongoose";
import session from "express-session"
import ejs from "ejs"
import morgan from "morgan";
import dotenv from "dotenv"
import routes from "./routes/UserRoutes.js"
import passport from "passport";
import UserModel from "./models/UserModel.js"

dotenv.config()

const app = express()

app.use(morgan('dev'))
app.engine('html', ejs.renderFile)
app.set('view engine', 'html')

const store = session.MemoryStore()
app.use(express.urlencoded({ extended: true }))
app.use(session({
    secret: 'this is my secret key for session',
    saveUninitialized: false,
    cookie: {
        maxAge: 60000
    },
    store: store,
    resave: false
}))

passport.serializeUser(function (user, done) {
    done(null, user._id)
})

passport.deserializeUser (async function (id, done) {
    const user = await UserModel.findById(id)
    done(null, user)
})

app.use(passport.initialize())
app.use(passport.session())

app.use('/', routes)

mongoose.connect(process.env.DB_URI)
mongoose.connection.once("open", (err) => {
    if (!err)
        console.log('Connected to MongoDB')
})

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`)
})