const express = require('express');
const MongoClient = require('mongodb').MongoClient;
require('dotenv').config();

const dbUrl = process.env.DB_URL;
const port = process.env.CONNECTION_PORT;

MongoClient.connect(dbUrl, {
    // better data structure
    useUnifiedTopology: true
}, (err, db)=>{
    if(err) return console.log(err);
    console.log('Connected to database'); // connection string works
});

const app = express();

app.get('/', (request, response) => {
    response.send('¡Hola mundo!')
})

app.get('/quotes', (request, response) => {
    response.json({data: 'ok'})
})

app.post('/quotes', (request, response) => {
    // se modifica DB
    response.json({data: 'post'})
})

app.put('/quotes', (request, response) => {
    // se modifica DB
    response.json({data: 'put'})
})

app.listen(port, ()=> {
    console.log('servidor funcionando en http://localhost:'+port);
})


// variables de entorno
// 