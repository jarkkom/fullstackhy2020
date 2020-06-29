require('dotenv').config;

let PORT = process.env.PORT || 3003;
let MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/bloglist';

module.exports = {
  PORT,
  MONGODB_URI,
};
