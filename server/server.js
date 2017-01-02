var express = require('express');
var bodyParser = require('body-parser');
var { ObjectID } = require('mongodb');

var { mongoose } = require('./db/mongoose');
var { Todo } = require('./models/todo');
var { User } = require('./models/user');


var app = express();
const port = process.env.PORT || 3000;

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
    
    // Don't do: res.send(todos) as you will get an array
    // and you can't attach any additional data if you want.
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
    // send it as object so that we can 
    // attach other info if desired
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


// if having problems when testing server with supertest:
// http://www.marcusoft.net/2015/10/eaddrinuse-when-watching-tests-with-mocha-and-supertest.html
if (!module.parent) {
  app.listen(port, () => {
    console.log(`Listening on port ${port}`);
  });
}

// app.listen(port, () => {
//   console.log(`Listening on port ${port}`);
// });

module.exports = {app};
