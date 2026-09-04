import express from "express"
import {
    GetCustomerById, GetCustomers, AddCustomer, UpdateCustomer, DeleteCustomer
} from "../Controllers/CustomerController.js"

const router = express.Router()

router.get('/customers', GetCustomers)
router.get('/customers/:id', GetCustomerById)
router.post('/customers', AddCustomer)
router.put('/customers/:id', UpdateCustomer)
router.delete('/customers/:id', DeleteCustomer)

export default router