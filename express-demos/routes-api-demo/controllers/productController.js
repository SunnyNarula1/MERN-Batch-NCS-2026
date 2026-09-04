import {v4 as uuidv4} from "uuid"
let products = [
    {
        id: uuidv4(),
        name: 'Laptop',
        brand: 'Dell',
        price: 65000
    },
    {
        id: uuidv4(),
        name: 'Mobile Phone',
        brand: 'Samsung',
        price: 87000
    }
]

const GetAllProducts = (req, res) => {
    res.send(products)
}

const GetProduct = (req, res) => {
    res.send(products.find(x => x.id == req.params.id))
}

const AddProduct = (req, res) => {
    console.log(req.body)
    products.push({...req.body, id: uuidv4() })
    res.status(201).send({message: 'Product Added Successfully'})
}

const DeleteProduct = (req, res) => {
    let index = products.indexOf(products.find(x => x.id == req.params.id))
    products.splice(index, 1)
    res.status(200).send({message: 'Product deleted successfully'})
}

const updateProduct = (req, res) => {
    let index = products.indexOf(products.find(x => x.id == req.params.id))
    products[index] = {...req.body, id: req.params.id};
    res.status(200).send({message: 'Product updated successfully'})
}

export { GetAllProducts, GetProduct, AddProduct, DeleteProduct, updateProduct }