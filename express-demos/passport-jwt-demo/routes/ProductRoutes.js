import express from "express"
import { GetProducts, GetProductById, AddProduct, UpdateProduct, DeleteProduct, register, login, isAuthenticated } from "../controllers/ProductController.js"
import { VerifyTokenMiddleware } from "../auth/UserAuth.js"
import { body } from "express-validator"
import passport from "passport"

const router = express.Router()

router.get('/products', VerifyTokenMiddleware, GetProducts)
router.get('/products/:id', GetProductById)
router.post('/products', body("price").notEmpty().withMessage('Price is required').isInt({ min: 10, max: 1000 }).withMessage('Price must be between 10 and 1000'), AddProduct)
router.put('/product/:id', UpdateProduct)
router.delete('/product/:id', DeleteProduct)
router.post('/auth/register', register)
router.post('/auth/login', passport.authenticate('local'), login)
router.post('/isauthenticated', isAuthenticated)

export default router