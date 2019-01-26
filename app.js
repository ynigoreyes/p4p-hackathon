// Retrieve
var MongoClient = require('mongodb').MongoClient;
const express = require('express');
const bodyParser = require('body-parser');
// initialize our express app
const app = express();



// Set up mongoose connection
const mongoose = require('mongoose');
let dev_db_url = 'mongodb://Omar:dash1234@ds247670.mlab.com:47670/bauthql';
mongoose.connect(dev_db_url);
mongoose.Promise = global.Promise;
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
// db.on('success', console.log(console, 'MongoDB connection success:'));


// function swipeRight (User user){
//   //add an object in the 'likes' field of the current user
//
//   //find the user in the 'likes' field of the swiped user
// }
