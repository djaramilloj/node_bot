const express = require('express');
const MongoClient = require('mongodb').MongoClient;
require('dotenv').config();
const bodyparser = require('body-parser');

const dbUrl = process.env.DB_URL;
const port = process.env.CONNECTION_PORT;
let db;




MongoClient.connect(dbUrl, {
    // better data structure
    useUnifiedTopology: true
}, (err, database)=>{
    if(err) return console.log(err);
    console.log('Connected to database'); // connection string works
    db = database;
});


const app = express();
app.use(bodyparser.json());


app.get('/', (request, response) => {
    response.json({data: 'ok'})
})


app.get('/quotes1', (request, response) => {
    const data = db.db('sample_airbnb');
    data.collection('quotes').find().toArray()
        .then(result => {
            response.json(result);
        })
        .catch(err => console.log(err));  
})


app.post('/quotes', (request, response) => {
    // se modifica DB
    const data = db.db('sample_airbnb');
    data.collection('quotes').insertOne(request.body)
        .then(result => {
            response.json(result);
        })
        .catch(err => console.log(err))
})


app.put('/quotes', (request, response) => {
    // se modifica DB
    const data = db.db('sample_airbnb');
    data.collection('quotes').findOneAndUpdate({
        "_id": ObjectId(request.body._id)
    },{
        $set: {
            name: request.body.name,
            quote: request.body.quote
        }
    },{
        upsert: true
    }).then(result => {
        response.json(result)
    }).catch(err => console.log(err))
})


app.listen(port, ()=> {
    console.log('servidor funcionando en http://localhost:'+port);
})


// variables de entorno
// 