const { Kafka } = require('kafkajs')

const kafka = new Kafka({
    clientId: 'order-service',
    brokers: ['localhost:9092']
})

const producer = kafka.producer()

async function placeOrder(orderId, amount) {
    await producer.connect()

    const orderEvent = {
        eventType: 'OrderPlaced',
        orderId: orderId,
        amount: amount
    }

    await producer.send({
        topic: 'order-events',
        messages: [
            { value: JSON.stringify(orderEvent) }
        ]
    })

    console.log('Odrer Service: Published event -> ', orderEvent)

    await producer.disconnect()
}

placeOrder(101, 500)