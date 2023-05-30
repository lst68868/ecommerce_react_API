# Project Proposal

My project makes use of https://fakestoreapi.com/ in order to build a basic online store with CRUD functionality.

## Project name and description

My project is called Ecommerce React API, as I will be building an ecommerce API that I hope to render using react.

## Routes and models

1. **GET /seed**: This endpoint fetches data from an external API (`https://fakestoreapi.com/products`) and seeds the MongoDB database with the received products.

2. **GET /**: This is the home route, and it returns a simple welcome message.

3. **GET /products**: This endpoint fetches all products from the database and returns them as a JSON response.

4. **GET /products/:id**: This endpoint fetches a specific product based on the provided ID and returns it as a JSON response.

5. **GET /products/category/:category**: This endpoint fetches products based on the provided category and returns them as a JSON response.

6. **POST /products**: This endpoint adds a new product to the database. It expects a JSON payload containing the product details (title, price, description, category, and image) and returns the created product as a JSON response.

7. **DELETE /products/:id**: This endpoint deletes a specific product from the database based on the provided ID. It returns a JSON response indicating the success or failure of the deletion.

8. **PUT /products/:id**: This endpoint updates/edit a specific product in the database based on the provided ID. It expects a JSON payload containing the updated product details (title, price) and returns the updated product as a JSON response.

9. **POST /user**: This endpoint creates a new user in the database. It expects a JSON payload containing the user details (firstName, lastName, email, password). The password is hashed using bcrypt before storing it in the database. It returns a JSON response indicating the success or failure of the user creation.

10. **POST /login**: This endpoint performs user login authentication. It expects a JSON payload containing the user's email and password. It compares the provided password with the hashed password stored in the database using bcrypt and returns a JSON response indicating the success or failure of the login.

11. **DELETE /user/:email**: This endpoint deletes a specific user from the database based on the provided email. It returns a JSON response indicating the success or failure of the deletion.

These routes provide basic CRUD operations (Create, Read, Update, Delete) for products and user management functionality.

## User Stories

- As a user, I should be able to view all products available in the database.
- As a user, I should be able to search for a specific product by its ID.
- As a user, I should be able to filter products by category.
- As a user, I should be able to add a new product to the database by providing the necessary details.
- As a user, I should be able to delete a specific product from the database by its ID.
- As a user, I should be able to update/edit the details of a specific product.
- As a user, I should be able to create a new account by providing my personal details (first name, last name, email, password).
- As a user, I should be able to log in to my account using my email and password.
- As a user, I should be able to delete my account by providing my email.

#### MVP Goals

My API will be able to get all products, get a specific product by its id, edit any product's title and price, delete any product, and create a new product.

#### Stretch Goals

My main stretch goal is to render the entire frontend in React.
My second "stretch goal" is to include my API's user authentication functionality in the frontend.
