import { GetAllProducts, GetProduct, AddProduct, DeleteProduct, updateProduct } from "../controllers/productController.js"
import express from "express"
const router = express.Router()

router.get('/', GetAllProducts)
router.get('/:id', GetProduct)
router.post('/', AddProduct)
router.delete('/:id', DeleteProduct)
router.put('/:id', updateProduct)

export default router
