const { MongoClient, ObjectID } = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
  if (err) {
    return console.log('Unable to connect to MongoDB server');
  }
  console.log('Connected to MongoDB server');
  
  
  // deleteMany
  // db.collection('Todos').deleteMany({text: 'Get better'}).then(result => {
  //   console.log(result);
  // });
  
  
  // deleteOne - deletes only the first one
  // db.collection('Todos').deleteOne({text: 'Eat lunch'}).then(result => {
  //   console.log(result);
  // });
  
  
  // findOneAndDelete - shows what has been deleted
  // db.collection('Todos').findOneAndDelete({completed: false}).then(result => {
  //   console.log(result);
  // });
  
  
  // You don't have to check the result
  // db.collection('Todos').deleteMany({text: 'Get better'});
  
  
  // Delete particular ID - need to use ObjectID constructor
  db.collection('Users').findOneAndDelete({
    _id: new ObjectID('58670b66f7a902e3cd117546')
  }).then(result => {
    console.log(result);
  });
  
  
  db.close();
});
