require("dotenv").config({ path: ".." + "/.env" });
const mongoose = require("mongoose");

//to use asynchronous javascript
mongoose.Promise = global.Promise;
// enable debugging realtime
mongoose.set("debug", true);

const URI = process.env.URI;

const connectDB = () => {
  mongoose
    .connect(URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    })
    .then(() => console.log("DB Connected!"))
    .catch((err) => {
      console.log(`DB Connection Error: ${err.message}`);
    });
};

module.exports = connectDB;
