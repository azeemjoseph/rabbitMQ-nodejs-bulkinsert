const amqp = require('amqplib');

const RABBITMQ_URL = 'amqp://localhost';
const QUEUE = 'testQueue';

async function connectRabbitMQ() {
    const conn = await amqp.connect(RABBITMQ_URL);
    const channel = await conn.createChannel();
    await channel.assertQueue(QUEUE);
    return { conn, channel };
}

module.exports = { connectRabbitMQ, QUEUE };