require("dotenv").config();
const port = process.env.PORT || 4000;

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();

const handle = require("./handlers");
const routes = require('./routes')
const connectDB = require("./models/index");


connectDB();

// middle wares of bodyParser and cors
app.use(cors());
app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));



app.get("/", (req, res) => {
  // client ? expects json type response
  res.json({ hello: "world" });
});

app.use('/api/auth', routes.auth)
app.use('/api/polls', routes.poll);


app.use(handle.notFound);

app.use(handle.errors);

app.listen(port, () =>
  console.log(`Server started at port ${port} http://localhost:${port}`)
);
