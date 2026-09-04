## Microservice Architecture Case Study

### Assignment Title
Building a Secure Microservices-based RESTful API with Express.js, JSON Web Token (JWT), and Consul for Service Discovery

### Assignment Description
Develop a secure microservices-based RESTful API for a blogging platform named "Blogify". The API will consist of two microservices (Auth Service and Blogs Service) with an API Gateway for request routing and Consul for service discovery.

### Microservices Overview

#### 1. Auth Service
**Model: User**
- Fields: username, email, password (hashed), other relevant information.

**Endpoints:**
- `POST /register`: Register a new user.
- `POST /login`: Authenticate a user and generate a JWT.
- `GET /user`: Retrieve user information (protected route, requires JWT).

#### 2. Blogs Service
**Model: Blog**
- Fields: title, content, author (reference to user), other relevant information.

**Endpoints:**
- `GET /blogs`: Retrieve all blogs (public route).
- `GET /blogs/:id`: Retrieve a specific blog by ID (public route).
- `POST /blogs`: Create a new blog (protected route, requires JWT).
- `PUT /blogs/:id`: Update an existing blog (protected route, requires JWT, author must match).
- `DELETE /blogs/:id`: Delete a blog (protected route, requires JWT, author must match).

### API Gateway (using HTTP Proxy)
- Routes incoming requests to the appropriate microservice.
- Ensures proper request forwarding and response handling.

**Endpoints:**
- `/auth/*`: Routes to Auth Service.
- `/blogs/*`: Routes to Blogs Service.

### Service Discovery (using Consul)
- Each microservice registers itself with Consul.
- The API Gateway uses Consul to discover service instances dynamically.

**Consul Configuration:**
- Register Auth Service and Blogs Service.
- API Gateway queries Consul to route requests to available service instances.