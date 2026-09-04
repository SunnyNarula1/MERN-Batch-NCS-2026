import express from "express"
import { login, register, isAuthenticated } from "../controllers/UserController.js"

const router = express.Router()

router.post('/login', login)
router.post('/register', register)
router.post('/isauthenticated', isAuthenticated)

export default router