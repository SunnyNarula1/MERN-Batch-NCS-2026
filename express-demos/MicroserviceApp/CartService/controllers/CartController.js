import Cart from "../models/Cart.js"
import { v4 as uuidv4 } from 'uuid';
import { validationResult } from "express-validator";

async function GetCarts(req, res) {
    let carts = await Cart.find({})
    res.send(carts)
}

async function GetCartById(req, res) {
    let cart = await Cart.findOne({ cartId: req.params.id })
    res.send(cart)
}

async function AddCart(req, res) {
    const result = validationResult(req);
    if (result.isEmpty()) {
        let cart = new Cart({
            cartId: uuidv4(),
            userId: req.body.userId,
            items: req.body.items || []
        })
        await cart.save()
        res.status(201).send({ status: 201, message: 'Cart saved successfully' })
    } else {
        res.send({ errors: result.array() })
    }
}

async function DeleteCart(req, res) {
    await Cart.deleteOne({ cartId: req.params.id })
    res.send({ status: 200, message: "Cart Deleted Successfully" })
}

async function UpdateCart(req, res) {
    await Cart.updateOne({ cartId: req.params.id },
        {
            userId: req.body.userId,
            items: req.body.items
        }
    )
    res.send({ status: 200, message: "Cart Updated Successfully" })
}

export { GetCarts, GetCartById, AddCart, UpdateCart, DeleteCart }
