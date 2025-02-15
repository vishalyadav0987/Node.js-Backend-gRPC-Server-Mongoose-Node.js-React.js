const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes');
require('dotenv').config();
const cors = require('cors');


const app = express();
app.use(
    cors({
      origin: ['http://localhost:4000'], // Allow multiple origins
      methods: ['GET', 'POST', 'DELETE','PUT'], // Restrict to specific HTTP methods
    })
  );
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.use('/api', routes);

app.get('/send',(req,res)=>{
    res.send('Hello from server');
})


app.listen(3000, () => {
    console.log('Server listing on port 3000');
});
