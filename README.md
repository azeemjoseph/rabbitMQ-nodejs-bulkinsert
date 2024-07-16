
# bulkInsertRabbitMQ

<!-- ⚠️ This README has been generated from the file(s) "blueprint.md" ⚠️-->

Welcome to WJIKS! This is version 0.1.2!

[![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/colored.png)](#BulkRead-backend)

# ➤ bulkInsertRabbitMQ

Welcome to the BulkRead backend repository! This project serves as the backend for the BulkRead application using RabbitMQ.

[![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/colored.png)](#table-of-contents)

## ➤ Table of Contents

1. [Introduction](#introduction)
2. [Features](#features)
3. [Project Technologies](#project-technologies)
4. [Code Structure](#code-structure)
5. [Installation](#installation)
6. [Usage](#usage)
7. [API Endpoints](#api-endpoints)
8. [Testing with Large Dataset](#testing-with-large-dataset)

[![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/colored.png)](#introduction)

## ➤ Introduction

BulkInsertRabbitMQ is an application designed to help users upload bulk data using RabbitMQ.

[![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/colored.png)](#features)

## ➤ Features

- **BulkDataRead:** Using Node.js, Knex.js, and Objection.js.
- **Data Caching and Insertion:** Efficiently cache and insert large datasets.

[![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/colored.png)](#project-technologies)

## ➤ Project Technologies

- **Node.js:** A JavaScript runtime for building scalable network applications.
- **Express.js:** A web application framework for Node.js.
- **Knex.js:** A SQL query builder for Node.js.
- **RabbitMQ:** A message broker for handling the queueing of tasks.

[![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/colored.png)](#code-structure)

## ➤ Code Structure

The BulkRead backend project follows a structured organization to maintain clarity and scalability. Here's an overview of the code structure:

```
.
├── knexfile.js
│── rabbitmq-config.js    
│ 
├── server.js
└── README.md
```

[![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/colored.png)](#installation)

## ➤ Installation

To run the BulkRead backend locally, follow these steps:

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/azeemjoseph/rabbitMQ-nodejs-bulkinsert.git
   ```

2. **Navigate to the Project Directory:**

   ```bash
   cd rabbitMQ-nodejs-bulkinsert
   ```

3. **Install Dependencies:**
   ```bash
   npm install
   ```

[![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/colored.png)](#usage)

## ➤ Usage

Once the dependencies are installed, you can start the development server:

```bash
node server.js
```

[![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/colored.png)](#api-endpoints)

## ➤ API Endpoints

### 1. **Publish Data**

**Endpoint:** `/publish`

**Method:** `POST`

**Description:** Cache data to RabbitMQ.

**Request Body:**

```json
{
  "queue": "testQueue",
  "messages": [
    {
      "firstName": "FirstName0",
      "lastName": "LastName0",
      "mobilePhone": "614869910000"
    },
    ...
  ]
}
```

**Response:**

```json
{
  "message": "Messages sent to RabbitMQ."
}
```

### 2. **Consume Data**

**Endpoint:** `/consume`

**Method:** `GET`

**Description:** Consume data from RabbitMQ and insert into MySQL.

**Response:**

```json
{
  "message": "Consumer is running and messages are being processed"
}
```

[![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/colored.png)](#testing-with-large-dataset)

## ➤ Testing with Large Dataset

To test the application with a large dataset, follow these steps:

1. **Prepare a JSON File:**

    JSON file (Added in repo., `recordJson.json`) with a large amount of data structured copy it and send it as payload in POST API.

2. **Use a Tool like Postman or cURL:**

   Use Postman or cURL to send a POST request to the `/publish` endpoint with the large dataset.

   Example cURL command:

   ```bash
   curl -X POST http://localhost:3000/publish    -H "Content-Type: application/json"    
   ```

3. **Consume the Data:**

   Send a GET request to the `/consume` endpoint to insert the cached data into MySQL.

   Example cURL command:

   ```bash
   curl -X GET http://localhost:3000/consume
   ```

This will help you test the application with a large dataset and ensure the bulk data upload functionality works as expected.
