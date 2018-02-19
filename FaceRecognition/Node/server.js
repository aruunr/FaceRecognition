const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({extended: false}))


app.get('/', (req, res) => {
  res.send('hello world')
})

app.post('/',  (req, res) => {
    console.log(req.body);
  res.send('Got a POST request')
})

app.listen(3000);