# Todo App - Node

Rest API todo app with user authentication.

Fetch all todos in json format: https://afternoon-plateau-33516.herokuapp.com/todos

Fetch one todo in json format based on id: https://afternoon-plateau-33516.herokuapp.com/todos/5869264558f9aa0011de8c84

## Tech stack
* Node
* MongoDB
* MongoDB Node.js driver (node-mongodb-native)
* Mongoose
* Express
* body-parser - Node.js body parsing middleware
* Postman
* Robomongo
* Mocha
* Expect
* Supertest - HTTP assertions
* Heroku
* jsonwebtoken - JWT
* Validator - Email address validation
* bcryptjs - Hashing passwords and salting

## Getting started

```sh
git clone https://github.com/PiotrBerebecki/todo-app-node.git
cd todo-app-node
npm install

# 1. Create folder for database
mkdir mongo-data

# 2. a) In Mac / Linux you can start the MongoDB server simply by running
mongod

# 2. a) In Windows start the server by running
"C:/Program Files/MongoDB/Server/3.2/bin/mongod.exe" --dbpath C:/Users/USERNAME/Desktop/todo-app-node/mongo-data

# 2. b) If environmental variable for mongod exists you can start the server by running
mongod --dbpath C:/Users/USERNAME/Desktop/todo-app-node/mongo-data

3. Start the localhost server
npm start
# or
node server/server.js

4. You can interact with the database using Postman
```
