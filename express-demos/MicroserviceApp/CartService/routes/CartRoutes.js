import express from "express"
import { GetCarts, GetCartById, AddCart, UpdateCart, DeleteCart } from "../controllers/CartController.js"

const router = express.Router()

router.get('/', GetCarts)
router.get('/:id', GetCartById)
router.post('/', AddCart)
router.put('/:id', UpdateCart)
router.delete('/:id', DeleteCart)

export default router
