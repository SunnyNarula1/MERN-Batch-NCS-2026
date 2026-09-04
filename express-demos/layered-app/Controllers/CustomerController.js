import service from "../Services/CustomerService.js"

async function GetCustomers(req, res) {
    res.status(200).send(await service.GetCustomers())
}

async function GetCustomerById(req, res) {
    try {
        const result = await service.GetCustomerById(req.params.id)
        res.status(200).send(result)
    } catch (err) {
        res.status(404).send({ status: 404, message: err.message })
    }
}

async function AddCustomer(req, res) {
    try {
        await service.AddCustomer(req.body)
        res.status(201).send({ status: 200, message: 'Customer details saved successfully' })
    } catch (err) {
        res.status(409).send({ status: 409, message: err.message })
    }
}

async function DeleteCustomer(req, res) {
    try {
        await service.DeleteCustomer(req.params.id)
        res.status(200).send({ status: 200, message: 'Customer Deleted successfully' })
    } catch (err) {
        res.status(404).send({ status: 404, message: err.message })
    }
}


async function UpdateCustomer(req, res) {
    try {
        await service.UpdateCustomer(req.params.id, req.body)
        res.status(200).send({ status: 200, message: 'Customer Updated successfully' })
    } catch (err) {
        res.status(404).send({ status: 404, message: err.message })
    }
}

export { GetCustomers, GetCustomerById, AddCustomer, UpdateCustomer, DeleteCustomer }