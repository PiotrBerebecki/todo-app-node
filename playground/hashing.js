const { SHA256 } = require('crypto-js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');


// Hashing
var password = '123abc!';

// Generate salt
// bcrypt.genSalt(10, (err, salt) => {
//   bcrypt.hash(password, salt, (err, hash) => {
//     console.log(hash);
//   });
// });

var hashedPassword = '$2a$10$tt03wjCfdMk28CtNZ7GjieyGGQuar/nDQOaS.HLk6AHkrR3syO7rS';

bcrypt.compare(password, hashedPassword, (err, res) => {
  console.log(res);  // true if hashedPassword matches password
});



// JWT using jsonwebtoken package
// var data = {
//   id: 10
// };

// var token = jwt.sign(data, '123abc');
// console.log('token', token);

// var decoded = jwt.verify(token, '123abc');
// console.log('decoded', decoded);



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
