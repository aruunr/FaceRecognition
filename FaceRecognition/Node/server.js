const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcrypt');


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
app.post('/image',  (req, res) => {
    
})

//Signin--------------
app.post('/signin',  (req, res) => {
    
  if (req.body.email === database.users[0].email && req.body.password === database.users[0].password){
    
      res.json('success')
  }   else {
      res.status(400).json('Login Error');
  } 
  
})

//Register--------------
app.post('/register',  (req, res) => {
    console.log('Hi');
    database.users.push();
})

         
