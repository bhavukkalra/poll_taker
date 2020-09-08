require("dotenv").config();

const express = require("express");
const handle = require("./handlers");
const connectDB = require("./models/index");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();

const port = process.env.PORT;

connectDB();

// middle wares of bodyParser and cors
app.use(cors());
app.use(bodyParser.json());



app.get("/", (req, res) => {
  // client ? expects json type response
  res.json({ hello: "world" });
});


app.use(handle.notFound);

app.use(handle.errors);

app.listen(port, () =>
  console.log(`Server started at port ${300} http://localhost:3000`)
);
