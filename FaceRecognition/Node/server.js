const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcrypt');
const knex = require('knex')

const pg = knex({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'arun',
    password : '',
    database : 'arun'
  }
});



const app = express();
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
app.use(cors())



         
app.listen(3000, () => {   
});

//return users
//Image Entries(Rank)--------------

         
//Profile get------------   
app.get('/profile/:id', (req, res) => {

  
   res.send('hello world');
})

//Image Entries(Rank)--------------
app.put('/image',  (req, res) => {
pg('users')
.where('id', '=', req.body.id)
.increment('entries',1)
.returning('entries')
.then(entries => res.json(entries))
})

//Signin--------------
app.post('/signin',  (req, res) => {
    

  
})

//Register--------------
app.post('/register',  (req, res) => {
    console.log('In register');
    pg('users')
        .returning('*')
        .insert({
        email: req.body.email,
        name : req.body.name,
        joined : new Date()
    }).then(user => {
        
        res.json(user[0]);
    }).catch(err =>
     res.status(400).json('Error in registering')
    );
    
})

         
