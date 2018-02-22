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

const database = {
    users: [
     {
        id: '1',
        name: 'Arun',
        email : 'a@g.com',
        password : 'q1',
         entries : 0,
        joined : new Date()
     }  , {
         id: '2',
        name: 'hitman',
        email : 'hitman@gmail.com',
        password : 'zaq123',
         entries : 0,
        joined : new Date()  
     } 
    ]
}

         
app.listen(3000, () => {   
});

//return users
//Image Entries(Rank)--------------

         
//Profile get------------   
app.get('/profile/:id', (req, res) => {
   const {id} = req.params;  
  database.users.filter((user) => {
       if (user.id === id){
           return res.json(user);
       } 
   })
  
   res.send('hello world');
})

//Image Entries(Rank)--------------
app.put('/image',  (req, res) => {
    console.log(req.body)
      database.users.forEach(user => {
    if (user.id === req.body.id) {
      user.entries++
      console.log(user.entries)
      res.json(user.entries)
    }
  });
})

//Signin--------------
app.post('/signin',  (req, res) => {
    
  if (req.body.email === database.users[0].email && req.body.password === database.users[0].password){
    
      res.json(database.users[0])
  }   else {
      res.status(400).json('Login Error');
  } 
  
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
    database.users.push();
})

         
