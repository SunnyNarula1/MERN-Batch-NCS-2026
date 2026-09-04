const { Kafka, logLevel } = require('kafkajs')

const kafka = new Kafka({
    clientId: 'notification-service',
    brokers: ['localhost:9092'],
})

const consumer = kafka.consumer({ groupId: 'notification-service-group' })

async function startNotificationService() {
    await consumer.connect()
    await consumer.subscribe({ topic: 'order-events', fromBeginning: true })

    await consumer.run({
        eachMessage: async ({ message }) => {
            const orderEvent = JSON.parse(message.value.toString())
            console.log('Notification Service: Received event -> ', orderEvent)
            console.log('Notification Service: Sending SMS confirmation for order', orderEvent.orderId)
        }
    })
}

startNotificationService()