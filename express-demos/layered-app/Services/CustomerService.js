import repo from "../Repository/CustomerRepository.js"

async function GetCustomers() {
    return await repo.GetCustomers()
}

async function GetCustomerById(id) {
    const res = await repo.GetCustomerById(id)
    console.log(res)
    if (res == null) {
        throw Error(`Customer with customer id: ${id} does not exists`)
    } else {
        return res
    }
}

async function AddCustomer(customer) {
    const res = await repo.GetCustomerById(customer.customerid)
    if (res != null) {
        throw Error(`Customer with customer id: ${customer.customerid} already exists`)
    } else {
        await repo.AddCustomer(customer)
    }
}

async function DeleteCustomer(id) {
    const res = await repo.GetCustomerById(id)
    if (res == null) {
        throw Error(`Customer with customer id: ${id} does not exists`)
    } else {
        await repo.DeleteCustomer(id)
    }
}

async function UpdateCustomer(id, customer) {
    const res = await repo.GetCustomerById(id)
    if (res == null) {
        throw Error(`Customer with customer id: ${id} does not exists`)
    } else {
        await repo.UpdateCustomer(id, customer)
    }
}
const service = { GetCustomers, GetCustomerById, AddCustomer, UpdateCustomer, DeleteCustomer }
export default service