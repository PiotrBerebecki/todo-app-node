var env = process.env.NODE_ENV || 'development';


if (env == 'development' || env == 'test') {
  // if you require json, it will be automatically
  // parsed to JS object
  var config = require('./config.json');
  var envConfig = config[env];
  
  Object.keys(envConfig).forEach(key => {
    process.env[key] = envConfig[key];
  });
}


// the config.json file is gitignored, but it looks like this:
// {
//   "test": {
//     "port": 3000,
//     "MONGODB_URI": "mongodb://localhost:27017/TodoApp",
//     "JWT_SECRET": "fophpnconocrepo8548534"
//   },
//   "development": {
//     "port": 3000,
//     "MONGODB_URI": "mongodb://localhost:27017/TodoApp",
//     "JWT_SECRET": "fiospfiopfjiwimweiop39"
//   }
// }

