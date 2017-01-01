const { ObjectID } = require('mongodb');
const { mongoose } = require('./../server/db/mongoose');
const { Todo } = require('./../server/models/todo');
const { User } = require('./../server/models/user');


// Remove multiple, note it requires empty object
// as opposed to find
// remove() does not return the removed docs
// but only a number of how many were removed
// Todo.remove({}).then(result => {
//   console.log(result);
// });


// findOneAndRemove and findByIdAndRemove 
// return the removed doc
// Todo.findOneAndRemove({_id: '586990c2391c678d18953b38'}).then(todo => {
//   console.log(todo);
// });

Todo.findByIdAndRemove('586990c2391c678d18953b38').then(todo => {
  console.log(todo);
});
