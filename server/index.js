const express = require('express')
const { json } = require('body-parser');
const cors = require('cors');
const massive = require('massive');
const axios = require('axios')

const {
    getPeople,
    addPerson,
    deletePerson,
    editName,
} = require('./controllers/mainController')

require('dotenv').config();


const port = 3000;
const app = express();
app.use((req, res, next)=>{
    console.log(req.path)
    next()
})

massive(process.env.CONNECTION_STRING)
.then(db => app.set('db', db))
.catch(console.log);


app.use(json());
app.use(cors());


app.get('/api/getPeople', getPeople)

app.put('/api/addPerson/:name/:pass', addPerson)
app.delete('/api/deletePerson/:name/:pass', deletePerson)

app.post('/api/editName', editName)

app.get('/api/getPokemon', (req, res, next) => {
    let pokenum = Math.floor(Math.random() * 301)
    console.log('serverHit', pokenum)
    axios.get(`http://pokeapi.co/api/v2/pokemon/${pokenum}`).then(response => {
        console.log(response, 'guy')
        return res.status(200).json(response.data)
    })
    .catch(console.log)
})




//LISTENING
app.listen (port, ()=> {
    console.log(`Listening on port: ${port}`);
})