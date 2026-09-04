import Customer from "../Models/Customer.js"

async function GetCustomers() {
    return await Customer.find({})
}

async function GetCustomerById(id) {
    return await Customer.findOne({ customerid: id })
}

async function AddCustomer(customer) {
    let cust = new Customer({
        customerid: customer.customerid,
        firstname: customer.firstname,
        lastname: customer.lastname,
        email: customer.email,
        address: customer.address,
        age: customer.age
    })
    // const cust = new Customer()
    // cust.customerid = customer.customerid
    // cust.address.city = customer.address.city
    return await cust.save()
}

async function DeleteCustomer(id) {
    await Customer.deleteOne({ customerid: id })
}

async function UpdateCustomer(id, customer) {
    await Customer.updateOne({ customerid: id },
        {
            firstname: customer.firstname,
            lastname: customer.lastname,
            email: customer.email,
            address: customer.address,
            age: customer.age
        }
    )
}
const repo = {GetCustomers, GetCustomerById, AddCustomer, UpdateCustomer, DeleteCustomer}
export default repo