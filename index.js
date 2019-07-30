const express = require('express');
const http = require('http');
const app = express();
app.use(express.json());

app.use(express.urlencoded({extended:true}));
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

app.use(logger) // Introducing a middleware. Each time a request is sent to the server, logger comes in between the request response cycle.
// Request -> Logger -> Response

app.get('/genres',(req,res)=>{
    res.send(genres);
});

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