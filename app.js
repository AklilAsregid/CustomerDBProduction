const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const path = require('path')
const mysql = require('mysql')
let config = require('./config.js')
//configuring dotenv for using process.env
dotenv.config()

const app = express()

//connection to database mysql
let connection = mysql.createConnection(config)

//connect to the database
connection.connect(function(err) {
    if (err) {
      return console.error('error: ' + err.message);
    }
    console.log('Connected to the MySQL server.');
  });

//enabling cors
app.use(cors())

app.use(express.urlencoded({extended:false}))
app.use(express.json())

app.use('/api/index',require('./routes/api/index.js'))

//for using json webtoken
// //handle Productin
//     //static folder
//     app.use(express.static(__dirname + '/server/public/'))

//     //handle SPA
//     app.get(/.*/, (req, res) => res.sendFile(__dirname + '/server/public/index.html'))
const port = process.env.PORT || 5000  
app.listen(port,()=> console.log(`server is runnning on Port ${port} `))