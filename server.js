const express = require('express');
const bodyParser = require('body-parser');
const { connectRabbitMQ, QUEUE } = require('./rabbitmq-config');
const mysql = require('mysql2/promise');
const Knex = require('knex');
const knexConfig = require('./knexfile');
const knex = Knex(knexConfig);

const app = express();
app.use(bodyParser.json({ limit: '50mb' })); // Ensure large JSON payloads are handled

// API to publish messages to RabbitMQ
app.post('/publish', async (req, res) => {
  const records = req.body.messages; // Adjusted to access the 'messages' array from the body
  if (!Array.isArray(records)) {
    return res.status(400).send('Expected an array of records');
  }

  try {
    const { conn, channel } = await connectRabbitMQ();
    await channel.assertQueue(QUEUE);

    records.forEach(record => {
      channel.sendToQueue(QUEUE, Buffer.from(JSON.stringify(record)));
    });

    await channel.close();
    await conn.close();
    res.send('Messages sent to RabbitMQ');
  } catch (error) {
    console.error('Error in /publish:', error);
    res.status(500).send('Error processing request');
  }
});

// API to consume messages from RabbitMQ and insert them into MySQL
// app.post('/consume', async (req, res) => {
//   try {
//     const { conn, channel } = await connectRabbitMQ();
//     const dbConfig = {
//       host: "127.0.0.1", // Use IP address instead of 'localhost'
//       user: "root",
//       password: "zane@123",
//       database: "excel_data",
//       port: "3307" // Ensure this is the correct port
//     };
//     const db = await mysql.createConnection(dbConfig);

//     channel.consume(QUEUE, async msg => {
//       if (msg !== null) {
//         const record = JSON.parse(msg.content.toString());
//         await db.execute(
//           'INSERT INTO data (firstName, lastName, mobilePhone) VALUES (?, ?, ?)',
//           [record.firstName, record.lastName, record.mobilePhone]
//         );
//         channel.ack(msg);
//       }
//     }, { noAck: false });

//     res.send('Consumer is running and messages are being processed');
//   } catch (error) {
//     console.error('Error in /consume:', error);
//     res.status(500).send('Error processing request');
//   }
// });

app.get('/consume', async (req, res) => {
    try {
        const { conn, channel } = await connectRabbitMQ();

        channel.consume(QUEUE, async msg => {
            if (msg !== null) {
                const record = JSON.parse(msg.content.toString());
                // Insert data using Knex
                await knex('data').insert({
                    firstName: record.firstName,
                    lastName: record.lastName,
                    mobilePhone: record.mobilePhone
                });
                channel.ack(msg);
            }
        }, { noAck: false });

        res.send('Consumer is running and messages are being processed');
    } catch (error) {
        console.error('Error in /consume:', error);
        res.status(500).send('Error processing request');
    }
});

app.listen(3000, () => console.log('Server running on port 3000'));