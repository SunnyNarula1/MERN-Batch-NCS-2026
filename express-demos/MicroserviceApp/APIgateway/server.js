import express from "express"
import { createProxyMiddleware } from "http-proxy-middleware"
import rateLimit from "express-rate-limit"
import Consul from "consul"
import cors from "cors"

const app = express()
app.use(cors())

const productlimiter = rateLimit({
    windowMs: 6000,
    max: 100
})

const userlimiter = rateLimit({
    windowMs: 6000,
    max: 100
})

// app.use(limiter)
async function consulServiceUrl(name) {
    const consul = new Consul()
    const result = await consul.catalog.service.nodes(name)
        .catch((err) => {
            res.status(500).send({ message: "Error occured while processing request" })
            return
        })
    const serviceNode = result[0]
    const serviceUrl = `${serviceNode.ServiceAddress}:${serviceNode.ServicePort}`
    return serviceUrl
}

app.use('/products', productlimiter, createProxyMiddleware({
    target: await consulServiceUrl("ProductService"),
    changeOrigin: true
}))

app.use('/users', userlimiter, createProxyMiddleware({
    target: await consulServiceUrl("UserService"),
    changeOrigin: true
}))

app.use('/cart', userlimiter, createProxyMiddleware({
    target: await consulServiceUrl("CartService"),
    changeOrigin: true
}))


app.listen(3000, () => {
    console.log('API gateway running on port 3000')
})