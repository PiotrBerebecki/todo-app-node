const { MongoClient, ObjectID } = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
  if (err) {
    return console.log('Unable to connect to MongoDB server');
  }
  console.log('Connected to MongoDB server');
  
  
  // findOneAndUpdate
  // db.collection('Todos').findOneAndUpdate(
  //   {_id: new ObjectID('5867564937ddcea91d50a147')},
  //   {$set: {
  //     completed: true
  //   }},
  //   {returnOriginal: false}
  // ).then(res => {
  //   console.log(res);
  // });
  
  
  // findOneAndUpdate - two operations at once:
  // change name and increase age by 1
  db.collection('Users').findOneAndUpdate(
    {name: 'Peter1'},
    {$set:
      {name: 'Pete'},
     $inc:
      {age: 1},
     },
    {returnOriginal: false}
  ).then(res => {
    console.log(res);
  });
  
  
  // db.close();
});
