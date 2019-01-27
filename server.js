var express = require("express");
var app = express();
var bodyParser = require("body-parser");
const mongoose = require('mongoose');
const UserModel = require('./Models/User')(mongoose);
const myChat = require('./messaging/MyChat.jsx');
require('./config/passport');

let dev_db_url = 'mongodb://Omar:dash1234@ds247670.mlab.com:47670/bauthql';
mongoose.connect(dev_db_url);
mongoose.Promise = global.Promise;
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 3005;

var router = express.Router();
router.get("/", function(req, res) {
  res.json({ message: "Test GET" });
});

//used to add a new user (sign-up)
router.post("/users", function(req, res) {
  res.setHeader('Content-Type', 'application/json');
  UserModel.findOne({email: req.body.email}).exec(function(err, user){
    if(err || user != null){
      res.status(409);
      res.send();
    }
    else{
      var newUser = new UserModel();
      newUser.signUpUser(req.body["email"], req.body["name"], req.body["dob"], req.body["password"]);          //make the user
      newUser.save();
      res.status(200);
      res.send();
    }
  })
});


//used for sign in
router.post("/user", function(req, res){
  console.log(req.body);
  res.setHeader('Content-Type', 'application/json');
  UserModel.findOne({email: req.body["email"]}, function(err, results){
    if(err) res.status(404);
    console.log(results.name);
    if(results != null){
      if(results.validPassword(req.body["password"])){
        res.status(200);
      }
      else{
        res.status(404);
      }
    }
    res.send();
  });
});

//swipe right.
//front-end gives me 2 users in the request body.
//user1 has liked user2
router.put("/user", function(req, res){
  console.log("swiped_right");
  res.setHeader('Content-Type', 'application/json');
  //add user2 to user1.likes
  var user1 = UserModel.findOne({email: req.body["email1"]}, function(err, results){
    if(err) res.status(404);         //error, need both emails
    else{
      resolve(results);
    }
  });
  user1.likes.push(email2);
  //check if user2 had previosuly liked user1
  var user2 = UserModel.findOne({email: req.body["email2"]}, function(err, results){
    if(err) res.status(404);         //error, need both emails
    resolve(results);
  });
  if(user2.likes.includes(req.body["email1"])){          //match
    res.send({
      email1: ""
      user1.name: ""
    });
  };
});


//quick api to server random projects. give an array of 10
router.get("/projects", function (req, res) {
  res.setHeader('Content-Type', 'application/json');
  //name, description, owner
  res.send([
    {
      name: "Bauthminder",
      description: "bop",
      owner: "Ohmar",
      email: "omar14@gmail.com"
    },
    {
      name: "Powertruck",
      description: "charge your slatebaord as you ride",
      owner: "Ulises",
      email: "ulises14@gmail.com"
    },
    {
      name: "Fly catcher",
      description: "kill flies",
      owner: "Josh",
      email: "josh14@gmail.com"
    },
    {
      name: "Venus fly trapper",
      description: "trap venus flies",
      owner: "Miggy",
      email: "miggy14@gmail.com"
    },
    {
      name: "Mars",
      description: "i made a planet",
      owner: "Ohmar",
      email: "mars154@gmail.com"
    },
    {
      name: "Bauthminder2",
      description: "qdwfeghr",
      owner: "Ohmar",
      email: "omar17@gmail.com"
    },
    {
      name: "Bauthminder3",
      description: "bop",
      owner: "Ohmar",
      email: "omar19@gmail.com"
    },
    {
      name: "Bauthminder4",
      description: "bop",
      owner: "Ohmar",
      email: "ramo10@gmail.com"
    },
    {
      name: "Bauthminder5",
      description: "bop",
      owner: "Ohmar",
      email: "sojh14@gmail.com"
    },
    {
      name: "Bauthminder6",
      description: "bop",
      owner: "Ohmar",
      email: "yggim14@gmail.com"
    }
  ]);
})

app.use("/api", router);

app.listen(port);
console.log("I'll be right by your side till " + port);
