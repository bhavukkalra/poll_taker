const dotenv = require("dotenv").config({path: __dirname+  '/./../.env'});
const mongoose = require("mongoose");

//to use asynchronous javascript
mongoose.Promise = global.Promise;
// enable debugging realtime
mongoose.set("debug", true);

const URI = process.env.URI;

async function connectDB() {
  try{
    const connect = await mongoose.connect(URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true,
    });
    console.log('Connected')

  } catch (error) {
    console.log(`DB Connection Error: ${error.message}`)
  }
};

module.exports = connectDB;

// CRUX
module.exports.User = require('./user');
module.exports.Poll = require('./poll');

// It allows us to use db variable in our application
// ie const db = require('./models') as
// db.User and db.Poll