# Todo App - Node

Rest API todo app

## Tech stack
* Node
* MongoDB
* MongoDB Node.js driver (node-mongodb-native)
* Mongoose
* Express
* body-parser - Node.js body parsing middleware

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

3. Connect to database (in Windows use Command Prompts and backslashes)
mongodb playground/mongodb-connect.js
```
