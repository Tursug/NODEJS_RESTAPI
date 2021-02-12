const bodyParser = require('body-parser');
const express = require ('express');
const app = express();
const mongoose = require('mongoose');

app.use(bodyParser.json());

//IMPORT ROUTES
const postsRoute = require('./routes/posts');

app.use('/posts', postsRoute);

//MIDDLEWARES
/*
app.use('/posts', ()=>{
    console.log('This is a middleware running');
});
*/

//ROUTES
app.get('/', (req, res) =>{
    res.send('We are on Home');
});

app.get('/posts', (req, res) => {
    res.send('We are on Posts');
});

//CONNECT TO DATABASE
mongoose.connect('mongodb://localhost:27017/CrudDB', 
{useNewUrlParser:true, useUnifiedTopology:true, useCreateIndex: true}, (err) => {
    if (!err) {
        console.log("MobgoDB connection succeeded. ");
    }else {
        console.log("Error in DB connection : " + JSON.stringify(err, undefined, 2));
    }
});

// How to start listening to the server
app.listen(3000);