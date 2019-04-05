// config will read your .env file, parse the contents, assign it to process.env, 
// and return an Object with a parsed key containing the loaded content or an error key if it failed.
require('dotenv').config()

// importing required packages
const express = require('express'),
    path = require('path'),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    cors = require('cors');

// importing required local files
const config = require('./config');

// global storing project path
global.appRoot = path.resolve(__dirname);

// Creates an Express application. The express() function is a top-level function exported by the express module.
const app = express()

// init/connect mongodb
require('./app/utils').db(mongoose);

// enable CORS 
app.use(cors())

// Parse incoming request bodies in a middleware before your handlers, available under the req.body property. Limited to 50mb for both form data and json
app.use(bodyParser.json({ limit: '50mb' }))
app.use(bodyParser.urlencoded({ limit: '50mb', extended: false }))

// Static files access
app.use(express.static('dist'));

// handles all api 
app.use('/api', require('./app/router/api'));

// all routes points to dist/index.html - this will also fix production page refresh issue
app.get('*', (req, res) => {
    console.log(path.resolve('dist/index.html'))
    res.sendFile(path.resolve('dist/index.html'))
})

// app listening to port 8080
app.listen(process.env.PORT || 8080, () => console.log(`Listening on port ${process.env.PORT || 8080}!`));
