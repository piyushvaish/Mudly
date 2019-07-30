const config = require('config');
const morgan = require('morgan');
const express = require('express');
const http = require('http');
const app = express(); // app is a top level function in express.

app.use(express.json()); // Takes incoming request and parses into JSON Objects.

app.use(express.urlencoded({extended:true}));

if (app.get('env') === 'development'){
    app.use(morgan('tiny'));
}

console.log(`AppName:${config.get('name')}`);
console.log(`Mail:${config.get('mail.host')}`);

// Configuring the Environments - To set the envir - export NODE_ENV=production in Terminal
console.log(`NODE_ENV:${process.env.NODE_ENV}`);
console.log(`NODE_ENV:${app.get('env')}`);

const genres = [
    {id:1,name:'House'},
    {id:2,name:'Techno'},
    {id:3,name:'EDM'},
    {id:4,name:'Trance'},
    {id:5,name:'Psy Trance'},
    {id:6,name:'Dubstep'},
    {id:7,name:'Trap'},
    {id:8,name:'Punjabi'},
    {id:9,name:'Bollywood'},
    {id:10,name:'Acoustic'},
];

let logger = function(req,res,next){
    console.log('Logged');
    next();
}

//app.use(logger) // Introducing a middleware. Each time a request is sent to the server, logger comes in between the request response cycle.
// Request -> Logger -> Recsponse

app.get('/genres',(req,res)=>{
    res.send(genres);
});

// Now we' ll make use of a middleware function to add something to the response object
// Declaring a middleware function

// let dummyMiddlewareFunction = function(req,res,next){
//     req.requestTime = Date.now();
//     next();
// }

//app.use(dummyMiddlewareFunction);

// Now we'll use this middleware function to append to the server response
// app.get('/genres',(req,res)=>{
//     res.send(`The time is ${req.dummyMiddlewareFunction} and genres are ${genres}`);
// });


app.get('/genres/:id',(req,res)=>{
    const genre = genres.find(c => c.id === parseInt(req.params.id));
    if (genre){
        res.send(genre.name);
        return;
    }
    res.status(404).send('Genre Not Found !');
    
});

app.post('/genres',(req,res)=>{
    const genre = {
        id : genres.length + 1,
        name : req.body.name
    };
    genres.push(genre);
    res.send(genres);
});

app.put('/genres/:id',(req,res)=>{
    const genre = genres.find(c => c.id === parseInt(req.params.id));
    if (genre){
        genre.name = req.body.name;
        res.send(genres);
        return;
    }
    res.status(404).send('Genre Not Found !');
});

app.delete('/genres/:id',(req,res)=>{
    const genre = genres.find(c => c.id === parseInt(req.params.id));
    if (genre){
        genres.splice(genre,1);
        res.send(genres);
        return;
    }
    res.status(404).send('Genre Not Found !');
})

const port = process.env.port || 3000;
app.listen(port,()=>{
    console.log(`Listening on Port${port}`);
})