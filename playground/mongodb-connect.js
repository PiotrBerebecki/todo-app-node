const { MongoClient, ObjectID } = require('mongodb');

// ObjectID function can be used to generate
// unique IDs
// var obj = new ObjectID();
// console.log(obj);

// In production example the first link could
// for example be AWS or Heroku url
// Also, note that we are free to put any name for the database.
// The database with this name (here 'TodoApp') will be created
// as soon as we start adding data to it. 
MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
  if (err) {
    return console.log('Unable to connect to MongoDB server');
  }
  console.log('Connected to MongoDB server');
  
  
  db.collection('Todos').insertMany([
    { text: 'Get better', completed: false },
    { text: 'Get better', completed: false },
    { text: 'Get better', completed: false }
    ], (err, result) => {
    if (err) {
      return console.log('Unable to insert todo', err);
    }
    
    console.log(JSON.stringify(result.ops, undefined, 2));
  });
  
  
  // db.collection('Users').insertOne({
  //   name: 'Pete3',
  //   age: 25,
  //   location: 'Bangkok'
  // }, (err, result) => {
  //   if (err) {
  //     return console.log('Unable to insert user', err);
  //   }
    
  //   console.log(result.ops[0]._id.getTimestamp());
  // });
  
  db.close();
});
