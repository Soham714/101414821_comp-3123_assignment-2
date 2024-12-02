COMP3123 Assignment2 API with Node.js, Express, and MongoDB
This repository contains a backend application using Node.js, Express, and MongoDB for user and employee management. The application implements RESTful API endpoints to perform CRUD operations, user authentication, and employee management.

Table of Contents
Project Overview
Technologies Used
Prerequisites
Installation
API Endpoints
Testing API Endpoints with Postman
Project Structure
License
Contact
Project Overview
This project demonstrates how to implement a backend RESTful API using Node.js, Express, and MongoDB Atlas. The API supports:

User management: Signup and Login.
Employee management: Creating, retrieving, updating, and deleting employee records.
Technologies Used
Node.js
Express.js
MongoDB (MongoDB Atlas)
Mongoose (for MongoDB object modeling)
Postman (for API testing)
GitHub (for version control)
Prerequisites
Before running this project, make sure you have the following installed:

Node.js
MongoDB Atlas Account
Postman
Installation
Step 1: Clone the repository
git clone https://github.com/Soham714/101414821_comp-3123_assignment-2.git
Navigate to the project folder
cd 101414821_COMP3123_Assignment2

Step 2: Install dependencies
Run the following command to install all required dependencies:

npm install
Step 3: Configure MongoDB Atlas
Sign up for a MongoDB Atlas account.
Create a new cluster.
Get your MongoDB connection string (replace , , and with your details).
Create a .env file in the root directory and add your MongoDB connection string:
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/<dbname>?retryWrites=true&w=majority
Step 4: Start the server
To start the server, run the following command:

node server.js
The server will run on http://localhost:3000.

API ENDPOINTS
User Management
Method Endpoint Description Response Code POST /api/v1/user/signup Create a new user account 201 POST /api/v1/user/login Login user 200

Employee Management
Method Endpoint Description Response Code GET /api/v1/emp/employees Get list of all employees 200 POST /api/v1/emp/employees Create a new employee 201 GET /api/v1/emp/employees/{eid} Get employee details by ID 200 PUT /api/v1/emp/employees/{eid} Update employee details 200 DELETE /api/v1/emp/employees?eid=xxx Delete employee by ID 204

Testing API Endpoints with Postman
Open Postman.
Create a new request for each endpoint following the API Endpoints table above.
For POST requests, use the Body tab in Postman to send the necessary JSON data.
Capture screenshots of the responses to demonstrate the functionality.
Project Structure
. ├── models │ ├── UserModel.js │ ├── EmployeeModel.js ├── routes │ ├── UserRoutes.js │ ├── EmployeeRoutes.js ├── server.js ├── package.json ├── .env

Contact
If you have any questions or issues, feel free to contact me: GitHub: karmpatels [https://github.com/Soham714