import express from "express"
import { GetProducts, GetProductById, AddProduct, UpdateProduct, DeleteProduct } from "../controllers/ProductController.js"
import { body } from "express-validator"

const router = express.Router()

router.get('/products', GetProducts)
router.get('/products/:id', GetProductById)
router.post('/products', body("price").notEmpty().withMessage('Price is required').isInt({ min: 10, max: 100000 }).withMessage('Price must be between 10 and 1000'), AddProduct)
router.put('/product/:id', UpdateProduct)
router.delete('/product/:id', DeleteProduct)

export default router