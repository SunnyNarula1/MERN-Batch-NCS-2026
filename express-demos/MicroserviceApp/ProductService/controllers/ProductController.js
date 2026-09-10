import Product from "../models/Product.js"
import { v4 as uuidv4 } from 'uuid';
import { validationResult } from "express-validator";

async function GetProducts(req, res) {
    let products = await Product.find({})
    res.send(products)
}

async function GetProductById(req, res) {
    let product = await Product.findOne({ productId: req.params.id })
    res.send(product)
}

async function AddProduct(req, res) {
    const result = validationResult(req);
    if (result.isEmpty()) {
        let prd = new Product({
            productId: uuidv4(),
            name: req.body.name,
            thumbnail: req.body.thumbnail,
            brand: req.body.brand,
            quantity: req.body.quantity,
            price: req.body.price,
        })
        console.log(req.body)
        await prd.save()
        res.status(201).send({ status: 201, message: 'Product saved successfully' })
    } else {
        res.send({ errors: result.array() })
    }

}

async function DeleteProduct(req, res) {
    await Product.deleteOne({ productId: req.params.id })
    res.send({ status: 200, message: "Product Deleted Successfully" })
}

async function UpdateProduct(req, res) {
    await Product.updateOne({ productId: req.params.id },
        {
            name: req.body.name,
            brand: req.body.brand,
            quantity: req.body.quantity,
            thumbnail: req.body.thumbnail,
            price: req.body.price
        }
    )
    res.send({ status: 200, message: "Product Updated Successfully" })
}

export { GetProducts, GetProductById, AddProduct, DeleteProduct, UpdateProduct }