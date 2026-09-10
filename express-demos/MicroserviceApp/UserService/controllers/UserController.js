import UserModel from "../models/UserModel.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import dotenv from "dotenv"

dotenv.config()

const SECRET_KEY = process.env.SECRET_KEY

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

async function login(req, res) {
    const user = await UserModel.findOne({ email: req.body.email })
    if (!user) {
        res.status(401).send({ status: 401, message: 'Incorrect Email' })
    }
    if (!bcrypt.compareSync(req.body.password, user.password)) {
        res.status(401).send({ status: 401, message: 'Incorrect Password' })
    }
    res.status(200).send({username: user.firstname, token: GenerateToken(user.toJSON()) })
}

async function register(req, res) {
    const user = await UserModel.findOne({ email: req.body.email })
    if (user) {
        res.status(409).send({ status: 409, message: 'User with specified email already exists' })
    } else if (!user) {
        const user = new UserModel({
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password)
        })
        await user.save()
        res.status(201).send({ message: 'User registered successfully' })
    } else {
        res.send(err)
    }
}

function isAuthenticated(req, res) {
    res.send({ isAuthenticated: VerifyToken(req.headers.authorization) })
}

export { login, register, isAuthenticated }