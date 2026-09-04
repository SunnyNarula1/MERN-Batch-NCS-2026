import jwt from "jsonwebtoken"
import LocalStrategy from "passport-local"
import UserModel from "../models/UserModel.js"
import bcrypt from "bcryptjs"
import dotenv from "dotenv"

dotenv.config()

const SECRET_KEY = process.env.SECRET_KEY

function PassportLocalAuth() {
    return new LocalStrategy({ usernameField: "email", passwordField: "password" }, async function (username, password, done) {
        const user = await UserModel.findOne({ email: username })
        if (!user) {
            return done(null, false, { message: 'Incorrect Email' })
        }
        if (!bcrypt.compareSync(password, user.password)) {
            return done(null, false, { message: 'Incorrect Password' })
        }
        return done(null, user)
    })
}

function GenerateToken(user) {
    return jwt.sign(user, SECRET_KEY, { expiresIn: '1h' })
}

function VerifyToken(token) {
    const res = jwt.verify(token, SECRET_KEY, (err, decode) => decode !== undefined ? decode : err)
    if (res instanceof Error) {
        return false
    } else {
        return true
    }
}

function VerifyTokenMiddleware(req, res, next) {
    if(VerifyToken(req.headers.authorization)===true) {
        next()
    } else {
        res.status(401).send({status: 401, message: "You are not authorized"})
    }
}

export { GenerateToken, PassportLocalAuth, VerifyToken, VerifyTokenMiddleware }