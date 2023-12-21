Project Title
A brief description of Ecommerce site for customers to order some products online.

Description
This project is a Node.js Express application integrating MongoDB with Mongoose. It is designed to handle user and order management. Users can be created, retrieved, updated, and deleted. Additionally, users can place orders, and the application supports fetching all orders for a specific user and calculating the total price of a user's orders.

Getting Started
Dependencies
Node.js
MongoDB
Express
Mongoose
bcrypt for password hashing
validator for data validation
Installing
Clone the repository to the local machine.

Navigate to the project directory.

Install the necessary node modules:

bash
Copy code
npm install
Ensure MongoDB is set up and running on the machine or use a cloud-based instance.

Configuring
Create a .env file in the root of the project and specify the environment variables:

env
Copy code
DB_URI=mongodb://theMongoDBUri
BCRYPT_SALT_ROUNDS=theBcryptSaltRounds
Replace theMongoDBUri with the MongoDB connection string.

Replace theBcryptSaltRounds with a suitable number for bcrypt salt rounds.

Running the Application
Start the application:

bash
Copy code
npm start
The application should now be running and connected to the MongoDB instance.

Usage
API Endpoints
User Management:

Create a new user:

POST /api/users
Body: { userId, username, password, fullName, age, email, isActive, hobbies, address }
post the json in following format:
{
"user":
{
"userId": 3,
"username": "threenirddto",
"password": "threeehve6om",
"fullName": {
"firstName": "ThreenhtuShn",
"lastName": "Threeoeurgshgu"
},
"age": 40,
"gender": "male",
"email": "threehn.ten@example.com",
"isActive": true,
"hobbies": ["reading", "traveling"],
"isDeleted": false,
"address": {
"street": "123 Main St",
"city": "Banglaville",
"country": "Bangland"
}

}
}
Retrieve a list of all users:

GET /api/users
Retrieve a specific user by ID:

GET /api/users/:userId (2,3)
Update user information:

PUT /api/users/:userId

{
"user":
{
"username": "finalchanging"
}
}

Body: { userId, username, password, fullName, age, email, isActive, hobbies, address }
Delete a user:

DELETE /api/users/:userId
Order Management:

Add a new product in order for a user:

PUT /api/users/:userId/orders
Body: { productName, price, quantity }

{
"order":{

    "productName": "second",
    "price": 12,
    "quantity": 5

}
}

Retrieve all orders for a specific user:

GET /api/users/:userId/orders
Calculate the total price of orders for a specific user:

GET /api/users/:userId/orders/total-price
Examples
To create a new user, send a POST request to /api/users with the user details in the request body.
To fetch all orders of a user with userId = 1, send a GET request to /api/users/1/orders.
Contributing
Contributions to this project are welcome. Please fork the repository and submit a pull request with the changes.

License
This project is licensed under the Anisuzzaman Shuvo License.
