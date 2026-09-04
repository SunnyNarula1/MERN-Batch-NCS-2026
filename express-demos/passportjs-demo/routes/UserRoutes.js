import express from "express"
import {
    home, login, register, profile, registerUser, logout
} from "../controllers/UserController.js"
import passport from "passport"
import isLoggedIn from "../middlewares/PassportConfig.js"

const router = express.Router()

router.get('/', home)
router.get('/login', login)
router.get('/register', register)
router.get('/profile', isLoggedIn, profile)
router.post('/register', registerUser)
router.post('/login', passport.authenticate('local', { failureRedirect: '/login' }), (req, res) => {
    res.redirect('/profile')
})
router.post('/logout', logout)

export default router