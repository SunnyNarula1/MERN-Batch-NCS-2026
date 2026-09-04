const { Kafka } = require('kafkajs')

const kafka = new Kafka({
    clientId: 'payment-service',
    brokers: ['localhost:9092']
})

const consumer = kafka.consumer({ groupId: 'payment-service-group' })

async function startPaymentService() {
    await consumer.connect()
    await consumer.subscribe({ topic: 'order-events', fromBeginning: true })

    await consumer.run({
        eachMessage: async ({ message }) => {
            const orderEvent = JSON.parse(message.value.toString())
            console.log('Payment Service: Received event -> ', orderEvent)
            console.log('Payment Service: Charging Amount', orderEvent.amount, 'for order', orderEvent.orderId)
        }
    })
}

startPaymentService()