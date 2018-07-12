const express = require('express')
const { json } = require('body-parser');
const cors = require('cors');
const massive = require('massive');

const {
    getPeople,
    addPerson,
    deletePerson
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

app.post('/api/addPerson/:name/:pass', addPerson)
app.delete('/api/deletePerson/:name/:pass', deletePerson)



//LISTENING
app.listen (port, ()=> {
    console.log(`Listening on port: ${port}`);
})