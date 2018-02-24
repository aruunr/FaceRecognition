const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcrypt');
const knex = require('knex')
const saltRounds = 10;
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
    pg.select('email','hash')
        .from('login')
    .where('email', '=',req.body.email)
        .then(data => {
          const isLoginSuccess = 
               bcrypt.compareSync(req.body.password, data[0].hash);
    if(isLoginSuccess){
    return pg.select('*').from('users')
        .where('email','=',req.body.email).then(user => {
            res.json(user[0])
        })
        .catch(err => res.json.status(400).json('Thereis an error'))
    }else{
        res.status(400).json('Wrong password')
    }
    }).catch(err => res.status(400).json('Check signin credentials'))

  
})

//Register--------------
app.post('/register',  (req, res) => {
    console.log('In register');
    var hash = bcrypt.hashSync(req.body.password, saltRounds);
    
    pg.transaction(trx => {
        trx.insert({
            hash: hash,
            email : req.body.email
        })
        .into('login')
        .returning('email')
        .then(loginEmail => {              
            trx('users')
                .returning('*')
                .insert({
                email: loginEmail[0],
                name : req.body.name,
                joined : new Date()
            }).then(user => {

                res.json(user[0]);
            })
            .then(trx.commit)
            .catch(trx.rollback)
            .catch(err =>
             res.status(400).json('Error in registering')
            );
        })
    })

    
})

         
