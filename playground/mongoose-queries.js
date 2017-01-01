const { ObjectID } = require('mongodb');
const { mongoose } = require('./../server/db/mongoose');
const { Todo } = require('./../server/models/todo');
const { User } = require('./../server/models/user');

var id = '5868ea46134a9931fcee70cb';

if (!ObjectID.isValid(id)) {
  console.log('Id not valid');
}

// mongoose can query based on id string
// so no need to use an object constructor
Todo.find({
  _id: id
}).then(todos => {
  console.log('Todos', todos);
});

Todo.findOne({
  _id: id
}).then(todo => {
  console.log('Todo', todo);
});

Todo.findById(id).then(todo => {
  if (!todo) {
    return console.log('Id not found');
  }
  console.log('Todo By Id', todo);
}).catch(err => console.log(err));


var idUser = '58677536ee75a40672de18c0';

User.findById(idUser).then(user => {
  if (!user) {
    return console.log('Id not found');
  }
  console.log('User by Id', user);
}).catch(err => console.log(err));
