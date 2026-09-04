import mongoose, { Types } from "mongoose";

// const reviewSchema = new mongoose.Schema({
//     user: {
//         type: String,
//         required: true,

//     },
//     rating: {
//         type: Number,
//         required: true
//     },
//     comment: {
//         type: String,
//         required: true
//     },
//     createdAt: {
//         type: String,
//         default: Date.now
//     },

// })

const productSchema = new mongoose.Schema({
    productId: {
        type: String,
        required: true
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
    // reviews: [reviewSchema]
    // reviews : {
    //     type: mongoose.Schema.Types.Mixed // anything can go in this field
    // }
})



export default mongoose.model('Product', productSchema, 'Products')