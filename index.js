const express = require('express')
const { json } = require('body-parser');
const cors = require('cors');
const session = require('express-session');
const massive = require('massive');
const passport = require('passport');
require('dotenv').config();
const Auth0Strategy = require("passport-auth0");
const path = require('path');


// const { connectionString } = require('../config').massive;
// const { domain, clientID, clientSecret } = require('../config').auth0

const { create, 
        getInfo, 
        newJob, 
        getPosts, 
        editPost, 
        deletePost, 
        editJob, 
        openJobs, 
        acceptJob, 
        acceptedJobs, 
        posterInfo, 
        newComment, 
        getComments, 
        jobComplete, 
        postReview, 
        removeRunner } = require('./src/controllers/userController');

const logout = require('express-passport-logout');

const port = 3000;
const app = express();
app.use((req, res, next)=>{
    console.log(req.path)
    next()
})

//MASSIVE
massive(process.env.CONNECTION_STRING)
.then(db => app.set('db', db))
.catch(console.log);


app.use(json());
app.use(cors());


app.post('/api/noRunner', removeRunner)



//LISTENING
app.listen (port, ()=> {
    console.log(`Listening on port: ${port}`);
})