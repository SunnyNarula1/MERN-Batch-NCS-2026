import mongoose from "mongoose";

const cartItemSchema = new mongoose.Schema({
    productId: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    quantity: {
        type: Number,
        required: true,
        min: 1
    }
})

const cartSchema = new mongoose.Schema({
    cartId: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        required: true
    },
    items: [cartItemSchema]
})

export default mongoose.model('Cart', cartSchema, 'Carts')
