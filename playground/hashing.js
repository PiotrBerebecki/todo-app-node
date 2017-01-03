const { SHA256 } = require('crypto-js');
const jwt = require('jsonwebtoken');

// JWT using jsonwebtoken package
var data = {
  id: 10
};

var token = jwt.sign(data, '123abc');
console.log('token', token);

var decoded = jwt.verify(token, '123abc');
console.log('decoded', decoded);



// Manual JWT
// var message = 'I am user number 3';
// var hash = SHA256(message).toString();

// console.log('message', message);
// console.log('hash', hash);

// var data = {
//   id: 4
// };

// // Token will be send to user.
// // Add secret for salting.
// var token = {
//   data: data,
//   hash: SHA256(JSON.stringify(data) + 'somesecret').toString()
// };

// // Attempt to manipulate data
// token.data.id = 5;
// token.hash = SHA256(JSON.stringify(token.data)).toString();

// var resultHash = SHA256(JSON.stringify(token.data) + 'somesecret').toString();

// if (resultHash === token.hash) {
//   console.log('Data was not changed');
// } else {
//   console.log('Data was changed. Do not trust');
// }
