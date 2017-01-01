var express = require('express');
var bodyParser = require('body-parser');

var { mongoose } = require('./db/mongoose');
var { Todo } = require('./models/todo');
var { User } = require('./models/user');


var app = express();

// Thanks to this we can send json to our Express app
app.use(bodyParser.json());

app.post('/todos', (req, res) => {
  // create an instance of a mongoose model
  var todo = new Todo({
    text: req.body.text
  });
  
  todo.save().then(doc => {
    res.send(doc);
  }, err => {
    res.status(400).send(err);
  });
  
  // now test the above in postman
  
});


app.get('/todos', (req, res) => {
  Todo.find().then(todos => {
    
    // don't do: res.send(todos) as you will get an array
    // and you can attach any additional data if you want
    // instad create an object
    res.send({todos});
  }, err => {
    res.status(400).send(err);
  });
});


app.listen(3000, () => {
  console.log('Listening on port 3000');
});

module.exports = {app};
