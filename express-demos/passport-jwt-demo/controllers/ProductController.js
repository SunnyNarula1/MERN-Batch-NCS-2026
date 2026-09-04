import Product from "../models/Product.js"
import UserModel from "../models/UserModel.js";
import { v4 as uuidv4 } from 'uuid';
import { validationResult } from "express-validator";
import { GenerateToken, VerifyToken } from "../auth/UserAuth.js";
import bcrypt from "bcryptjs";

async function GetProducts(req, res) {
    let products = await Product.find({})
    res.send(products)
}

async function GetProductById(req, res) {
    let product = await Product.findOne({ productId: req.params.id })
    res.send(product)
}

// async function AddProduct(req, res) {
//     try {
//         let prd = new Product({
//             productId: uuidv4(),
//             name: req.body.name,
//             brand: req.body.brand,
//             quantity: req.body.quantity,
//             price: req.body.price,
//         })
//         await prd.save()
//     } catch (e) {
//         res.status(500).send({error: e.message})
//         return
//     }

//     res.status(201).send({ status: 201, message: 'Product saved successfully' })
// }
async function AddProduct(req, res) {
    const result = validationResult(req);
    if (result.isEmpty()) {
        let prd = new Product({
            productId: uuidv4(),
            name: req.body.name,
            brand: req.body.brand,
            quantity: req.body.quantity,
            price: req.body.price,
        })
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
            price: req.body.price
        }
    )
    res.send({ status: 200, message: "Product Updated Successfully" })
}

async function register(req, res) {
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

async function login(req, res) {
    res.send({token: GenerateToken(req.session.passport)})
}

function isAuthenticated(req, res) {
    res.send({isAuthenticated: VerifyToken(req.headers.authorization)})
}

export { GetProducts, GetProductById, AddProduct, DeleteProduct, UpdateProduct, register, login, isAuthenticated }