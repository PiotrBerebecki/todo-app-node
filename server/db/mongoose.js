var mongoose = require('mongoose');

// Tell mongoose to use the in-built Promise object
mongoose.Promise = global.Promise;

// mongoose moves on to the following lines
// only after resoling connection on the next line
mongoose.connect('mongodb://localhost:27017/TodoApp');

module.exports = {mongoose};
