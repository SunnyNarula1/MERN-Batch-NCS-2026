import express from "express"
import { GetProducts, GetProductById, AddProduct, UpdateProduct, DeleteProduct } from "../controllers/ProductController.js"
import { body } from "express-validator"

const router = express.Router()

router.get('/', GetProducts)
router.get('/:id', GetProductById)
router.post('/', body("price").notEmpty().withMessage('Price is required').isInt({ min: 10, max: 100000 }).withMessage('Price must be between 10 and 1000'), AddProduct)
router.put('/:id', UpdateProduct)
router.delete('/:id', DeleteProduct)

export default router