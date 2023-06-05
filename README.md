# Welcome to Our E-Commerce Admin Portal Project

Frontend GitHub Repository: [https://github.com/lst68868/ecommerce_react_frontend](https://github.com/lst68868/ecommerce_react_frontend)

Netlify Deployment: [https://develop--astounding-alfajores-dbc634.netlify.app/](https://develop--astounding-alfajores-dbc634.netlify.app/)

Heroku Deployment: [https://ecommerce-react-api.herokuapp.com/](https://ecommerce-react-api.herokuapp.com/)

API Documentation: [FakeStoreAPI Documentation](https://fakestoreapi.com/docs)

Greetings! We're excited to present our e-commerce admin portal project. This project is a deep dive into modern web development, designed to give a business owner complete control over their online store. The project showcases the interplay of several cutting-edge technologies including React.js, Express.js, and MongoDB.

## Overview

Our application is neatly split into front and back ends. The front end, built with React.js, handles the user interface and user interactions. It communicates with the back end through API calls, turning user inputs into actions. In this document, we will exclusively discuss the backend part of the project.

## Backend: Express.js and MongoDB

The backend of our application is built using Express.js and MongoDB. Express.js is a powerful and flexible web application framework for Node.js, while MongoDB is a NoSQL database known for its high performance and scalability.

### File Structure

The file structure of our backend project is organized as follows:

- `backend/`: All server-side code is kept in this directory.
  - `models/`: This directory contains the Mongoose data schemas.
  - `controllers/`: Here, we define the functions that handle API requests.
  - `routes/`: This directory maps our API endpoints to the appropriate controller functions.

### Mongoose Schemas

Our backend revolves around two primary data entities: Users and Products. For each of these entities, we've defined Mongoose schemas, which structure the data in MongoDB.

**Product Schema:**

```javascript
import mongoose from "mongoose";

const productSchema = mongoose.Schema({
  title: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  image: { type: String, required: true },
});

const Product = mongoose.model("Product", productSchema);

export default Product;
```

**User Schema:**

```javascript
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const User = mongoose.model("User", userSchema);

export default User;
```

### Seeding Products: External API Integration

An exciting feature we've built into our project is the ability to seed our MongoDB database with products from `fakestoreapi.com`. This feature not only serves as a great demonstration of integrating external APIs into your own project but also presents a practical solution to the initial data setup for the application.

### RESTful API Endpoints

We've set up several RESTful API endpoints on our Express server to perform CRUD (Create, Read, Update, Delete) operations on both User and Product data. These endpoints are a great way to understand how to structure and implement a REST API and how it can facilitate the communication between the front end and the database.

#### User API

- `GET /api/users`: Fetches all users.
- `POST

/api/users`: Creates a new user.

- `GET /api/users/:id`: Fetches a single user by ID.
- `PUT /api/users/:id`: Updates a user by ID.
- `DELETE /api/users/:id`: Deletes a user by ID.

#### Product API

- `GET /api/products`: Fetches all products.
- `POST /api/products`: Creates a new product.
- `GET /api/products/:id`: Fetches a single product by ID.
- `PUT /api/products/:id`: Updates a product by ID.
- `DELETE /api/products/:id`: Deletes a product by ID.

## User Authentication

User authentication in our application is handled through a combination of the `bcrypt` library and React's `useContext` hook. We ensure security by hashing user passwords and storing only the hashed version in our MongoDB database.

### Bcrypt and Salt

In the `backend/controllers/userController.js` file, we utilize the `bcrypt` library for password hashing. When creating a new user (`POST /api/users`), we use `bcrypt` to hash the user's password. Bcrypt automatically handles the creation of a salt (random data used as an additional input to a one-way function that hashes data) and combines it with the hash. This process, known as "salting," adds an extra layer of security by protecting against rainbow table attacks.

Here's a simplified example:

```javascript
const bcrypt = require("bcrypt");

// ...inside user creation function
const saltRounds = 10;
const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);

const user = new User({
  username: req.body.username,
  password: hashedPassword,
  // other fields...
});

await user.save();
```

When a user attempts to log in (`POST /api/users/login`), we use `bcrypt` again to compare the entered password with the hashed password stored in the database:

```javascript
const user = await User.findOne({ username: req.body.username });
const validPassword = await bcrypt.compare(req.body.password, user.password);

if (!validPassword) {
  // Handle invalid password...
}

// Continue with user login...
```

### API Documentation

The backend of our project follows RESTful API principles. For detailed documentation on each API endpoint, including request methods and response formats, please refer to the [FakeStoreAPI Documentation](https://fakestoreapi.com/docs). The documentation provides a comprehensive overview of how to interact with the backend API.

## Deployment

The backend of our application is deployed on Heroku and can be accessed via the following link: [Heroku Deployment](https://ecommerce-react-api.herokuapp.com/).

Please note that the frontend and backend are separate entities hosted in different repositories. The frontend repository, including its own README, can be found here: [Frontend GitHub Repository](https://github.com/lst68868/ecommerce_react_frontend).

We hope you find this project insightful and inspiring! If you have any questions or need further clarification, please don't hesitate to reach out.
