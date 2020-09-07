const express = require('express');
const handle = require('./handlers')

const app = express();
const port = 3000;



//NOTE app.get(route, (handler function))

app.get('/', (req, res) => {
    // client ? expects json type response
    res.json({hello: 'world'})
  });






// NOTE app.use((handler function))
app.use(handle.notFound);

app.use(handle.errors);



app.listen(port, () => console.log(`Server started at port ${300} http://localhost:3000`));