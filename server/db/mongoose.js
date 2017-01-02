var mongoose = require('mongoose');

// Tell mongoose to use the in-built Promise object
mongoose.Promise = global.Promise;

// mongoose moves on to the following lines
// only after resoling connection on the next line
mongoose.connect(process.env.MONGODB_URI);

module.exports = {mongoose};
