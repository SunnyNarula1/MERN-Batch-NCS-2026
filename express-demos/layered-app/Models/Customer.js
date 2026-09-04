import mongoose from "mongoose"

const customerSchema = new mongoose.Schema({
    customerid: {
        type: String,
        requied: true
    },
    firstname: {
        type: String,
        requied: true
    },
    lastname: {
        type: String,
        requied: true
    },
    address: {
        city: {
            type: String,
            requied: true
        },
        street: String,
        pincode: Number
    },
    email: {
        type: String,
        requied: true
    },

    age: {
        type: Number,
        requied: true
    },
})

export default mongoose.model("Customer", customerSchema, "Customers")