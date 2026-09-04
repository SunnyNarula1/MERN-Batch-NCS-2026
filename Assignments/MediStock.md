# Assignment Title: MediStock
Building a Layered REST API with Express.js, Mongoose, and MongoDB

## Problem Statement:
In this assignment, you will demonstrate your ability to build a well-structured RESTful API using Node.js, Express.js, Mongoose, and MongoDB. Unlike a simple single-file API, this application must follow a **layered architecture** with clear separation of concerns — routes, controllers, services, and repositories — so that each layer has one responsibility and can be changed without rewriting the others.

## Scenario:
"MediStock" is a chain of neighbourhood pharmacies. Their counter staff currently track medicine stock in spreadsheets, which leads to expired medicines being sold and popular items running out unnoticed. The company is building a new internal system, and you have been hired to develop the backend API for the **inventory service**. The API must let their client applications list and search medicines, register newly received stock, record dispensing, update details, and remove discontinued items — while enforcing the pharmacy's business rules on the server.

## Assignment Objectives:
1. Implement full CRUD operations for managing medicines in the inventory.
2. Design and implement RESTful endpoints for:
    - Retrieving all medicines, with filtering, searching, and pagination
    - Retrieving a single medicine by its id
    - Adding a new medicine
    - Updating an existing medicine
    - Adjusting stock when medicines are received or dispensed
    - Deleting a medicine
3. Use Mongoose to define the medicine schema and interact with MongoDB.
4. Organise the application into distinct layers, each in its own folder, with dependencies flowing in one direction only: **route → controller → service → repository → model**.
5. Enforce the pharmacy's business rules in the **service layer**, not in the controller or the repository.
6. Validate incoming data at two points: inside the controller before calling the service, and through Mongoose schema validation before saving.
7. Handle errors with `try...catch` in every controller function and return appropriate HTTP status codes with consistent response bodies.
8. Keep configuration (MongoDB connection string, port) outside the code using environment variables.

## Layer Responsibilities:
| Layer | Responsibility | Must NOT do |
|---|---|---|
| **Routes** | Map HTTP methods and paths to controller functions | Contain any logic |
| **Controllers** | Read `req` (params, query, body), check the input, call a service, catch errors, send the response with a status code | Query the database or hold business rules |
| **Services** | Apply business rules, orchestrate calls to repositories, throw meaningful errors | Touch `req` or `res` |
| **Repositories** | Perform all Mongoose queries and return plain data | Contain business rules |
| **Models** | Define the Mongoose schema, field validation, and indexes | Contain query helpers used by controllers |

## API Endpoints:
| Method | Endpoint | Purpose |
|---|---|---|
| GET | `/api/medicines` | List medicines; supports `?category=`, `?search=`, `?lowStock=true`, `?page=`, `?limit=` |
| GET | `/api/medicines/expiring` | List medicines expiring within the next 30 days |
| GET | `/api/medicines/:id` | Retrieve a single medicine |
| POST | `/api/medicines` | Add a new medicine |
| PUT | `/api/medicines/:id` | Update an existing medicine |
| PATCH | `/api/medicines/:id/stock` | Adjust stock — body carries `{ "change": 25 }` or `{ "change": -3 }` |
| DELETE | `/api/medicines/:id` | Remove a medicine |

Note the order of the first three routes carefully — `/expiring` must be registered before `/:id`.

## Data Model:
For the medicine schema in MongoDB, consider including the following properties:
- **name**: A string representing the brand name of the medicine.
- **genericName**: A string representing the salt or generic composition.
- **sku**: A string uniquely identifying the product in the catalogue.
- **manufacturer**: A string representing the manufacturing company.
- **category**: A string representing the type — Tablet, Syrup, Injection, Ointment, or Other.
- **price**: A number representing the price per unit.
- **quantityInStock**: A number representing units currently available.
- **reorderLevel**: A number below which the item counts as low stock.
- **batchNumber**: A string representing the batch identifier.
- **expiryDate**: A date representing when the batch expires.
- **prescriptionRequired**: A boolean indicating whether a prescription is needed.

## Business Rules (implement in the service layer):
1. `sku` must be unique — adding a medicine with an existing SKU is rejected with `409 Conflict`.
2. `expiryDate` must be in the future when a medicine is created.
3. Stock can never go below zero — dispensing more units than available is rejected with a clear error.
4. An expired medicine cannot be dispensed, even if stock is available.
5. `price` and `quantityInStock` must not be negative.
6. A medicine with stock remaining cannot be deleted; the request must be rejected with an explanatory message.
7. `lowStock=true` returns medicines where `quantityInStock` is at or below `reorderLevel`.

## Suggested Project Structure:
```
medistock/
├── src/
│   ├── app.js
│   ├── server.js
│   ├── config/
│   │   └── db.js
│   ├── routes/
│   │   └── medicine.routes.js
│   ├── controllers/
│   │   └── medicine.controller.js
│   ├── services/
│   │   └── medicine.service.js
│   ├── repositories/
│   │   └── medicine.repository.js
│   └── models/
│       └── medicine.model.js
├── .env
└── package.json
```

## Requirements:
1. Use Node.js and Express.js to build the API server, and Mongoose for data modelling and interaction with MongoDB.
2. Every layer must live in its own file. A controller must never import a Mongoose model, and a repository must never import `express`.
3. `app.js` sets up JSON body parsing with `express.json()` and mounts the router; `server.js` connects to MongoDB and starts listening. The server must not start if the database connection fails.
4. Input checks belong inside the controller function itself. Do not build a validation layer that sits between the route and the controller.
5. Every controller function must wrap its work in `try...catch` and send the error response itself. Do not add a global error handler.
6. Services should throw errors that carry enough information — a message and a status code — for the controller to translate into a response.
7. Return correct status codes: `200` for successful reads and updates, `201` for creation, `200` or `204` for deletion, `400` for invalid input, `404` for a missing resource, `409` for a conflict, and `500` for unexpected failures.
8. Keep response shapes consistent, for example `{ "success": true, "data": ... }` and `{ "success": false, "message": "..." }`.
9. Use `.env` for `MONGODB_URI` and `PORT`, and do not commit real values.
10. Follow best practices for RESTful API design: plural nouns for collections, no verbs in URLs, and correct use of HTTP methods.
11. Test every endpoint using Postman or Thunder Client and include a short list of sample requests in your README.