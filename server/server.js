require('./config/config');

const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
const { ObjectID } = require('mongodb');

var { mongoose } = require('./db/mongoose');
var { Todo } = require('./models/todo');
var { User } = require('./models/user');


var app = express();
const port = process.env.PORT;

// thanks to this we can send json to our Express app
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
    
    // If you do: res.send(todos) you will get an array
    // and you won't be able to attach any additional data.
    // Instead create an object
    res.send({todos});
  }, err => {
    res.status(400).send(err);
  });
});


// GET /todos/12345
app.get('/todos/:id', (req, res) => {
  var id = req.params.id;
  
  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }
  
  Todo.findById(id).then(todo => {
    if (!todo) {
      return res.status(404).send();
    }

    res.send({todo});
  }).catch(err => res.status(400).send());
});


app.delete('/todos/:id', (req, res) => {
  var id = req.params.id;
  
  if(!ObjectID.isValid(id)) {
    return res.status(404).send();
  }
  
  Todo.findByIdAndRemove(id).then(todo => {
    if (!todo) {
      return res.status(404).send();
    }
    
    res.send({todo});
  }).catch(err => res.status(400).send());
});


app.patch('/todos/:id', (req, res) => {
  var id = req.params.id;
  var body = _.pick(req.body, ['text', 'completed']);
  
  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }
  
  if (_.isBoolean(body.completed) && body.completed) {
    body.completedAt = new Date().getTime();
  } else {
    body.completed = false;
    body.completedAt = null;
  }
  
  Todo.findByIdAndUpdate(id, {$set:body}, {new: true, runValidators: true}).then(todo => {
    if (!todo) {
      return res.status(404).send();
    }
    
    res.send({todo});
  }).catch(err => res.status(400).send());
});


app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});


module.exports = {app};
