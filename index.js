const express = require('express');
const app = express() ; 
const port = 3000 ; 
const  bodyParser = require('body-parser') ; 


app.use(bodyParser.json());
const author = require('./routes/author.routes');

app.use('/api/v1/author',author) ; 

app.listen(port , ()=>{
    console.log("server up on ", port);
})