import Consul from "consul"
import dotenv from "dotenv"

dotenv.config()

const address = process.env.ADDRESS
const port = process.env.PORT

console.log(`${address}:${port}/health`)

function ConsulConfiguration(app) {
    const consul = new Consul()
    consul.agent.service.register({
        name: "CartService",
        address: "http://localhost",
        port: 5001,
        check: {
            http: "http://localhost:5001/health",
            interval: "10s",
            timeout: "5s"
        }
    })

    app.get('/health', async (req, res) => {
        const result = await consul.catalog.service.nodes("CartService")
            .catch((err) => {
                res.status(500).send({ message: "Error occured while processing request" })
                return
            })
        const serviceNode = result[0]
        const serviceUrl = `${serviceNode.ServiceAddress}:${serviceNode.ServicePort}`
        res.send(`Service discovered at ${serviceUrl}`)
    })
}

export default ConsulConfiguration