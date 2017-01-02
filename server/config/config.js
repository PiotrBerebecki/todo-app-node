var env = process.env.NODE_ENV || 'development';

// This does not affect heroku and env will be 'production'
if (env === 'development') {
  process.env.PORT = 3000;
  process.env.MONGODB_URI = 'mongodb://localhost:27017/TodoApp';
} else if (env === 'test') {
  process.env.PORT = 3000;
  // different database to prevent
  // clearing the actual database
  process.env.MONGODB_URI = 'mongodb://localhost:27017/TodoAppTest';
}
