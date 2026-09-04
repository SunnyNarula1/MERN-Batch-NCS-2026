import UserModel from "../models/UserModel.js"
import bcrypt from "bcryptjs"

function home(req, res) {
    res.render('home')
}

function login(req, res) {
    res.render('login')
}

function register(req, res) {
    res.render('register')
}

function profile(req, res) {
    res.render('profile')
}

async function registerUser(req, res) {
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

function logout(req, res) {
    req.logout((err) => {
        if (!err) {
            res.redirect('/login')
        }
    })
}

// async function loginUser(req, res) {
//     const user = await UserModel.findOne({ email: req.body.email })
//     if (user == null) {
//         res.status(401).send({ err: 'Invalid Credentials' })
//     }
//     if (user && bcrypt.compareSync(req.body.password, user.password)) {
//         res.redirect('/profile')
//     } else {
//         res.status(401).send({ err: 'Invalid Credentials' })
//     }
// }

export { home, login, register, profile, registerUser, logout }