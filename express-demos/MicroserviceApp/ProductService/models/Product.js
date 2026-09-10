import mongoose, { Types } from "mongoose";

const productSchema = new mongoose.Schema({
    productId: {
        type: String,
        required: true
    },
    thumbnail: {
        type: String
    },
    name: {
        type: String,
        required: true,
        minLength: 5
    },
    brand: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true,
    },
    price: {
        type: Number,
        required: true
    },
})



export default mongoose.model('Product', productSchema, 'Products')