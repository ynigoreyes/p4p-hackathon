var express = require("express");
var app = express();
const axios = require('axios')
var bodyParser = require("body-parser");
const mongoose = require('mongoose');
const UserModel = require('./Models/User')(mongoose);
const Chatkit = require('@pusher/chatkit-server');
require('./config/passport');

const CHATKIT_INSTANCE_LOCATOR = 'v1:us1:863f1f81-128b-4435-a173-c7749ff56b99';
const fakeData = [
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
]

const chatkit = new Chatkit.default({
  instanceLocator: CHATKIT_INSTANCE_LOCATOR,
  key: '8a1202d8-333b-43b4-aa2b-448635b07683:1lmY5xvtiYRDetXp0VzuqZRPtC+2wOfG45WdYjQVUKA=',
})

UserModel.deleteMany({}).exec(() => {
  for (let { name, email } of fakeData) {
    const newUser = new UserModel()
    newUser.signUpUser(email, name, new Date, email)
    newUser.save()
    chatkit.createUser({
      id: email,
      name: email,
    }).catch(() => ({}))
  }
})


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
  chatkit.createUser({
    id: req.body.email,
    name: req.body.email,
  }).then(() => {
    UserModel.findOne({email: req.body.email}).exec(function(err, user){
      if(err || user != null){
        console.error('Something went wrong')
        res.status(409);
        res.send();
      }
      else{
        var newUser = new UserModel();
        console.log(req.body.password)
        newUser.signUpUser(req.body["email"], req.body["name"], req.body["dob"], req.body["password"]);          //make the user
        newUser.save();
        res.status(200);
        res.send();
      }
    })
  }).catch((err) => {
    console.error(err)
    res.status(500).send()
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
router.put("/like", function(req, res){
  console.log("swiped_right");
  res.setHeader('Content-Type', 'application/json');

    //add user2 to user1.likes
    var user1 = new Promise(function(resolve, reject){
      UserModel.findOne({email: req.body["email1"]}, function(err, results){
        if(err) res.status(404);         //error, need both emails
        else{
          resolve(results);
        }
      })
    });
    user1.then(function(val){
      val.likes.push(req.body["email2"]);
      //chck if user2 had previosuly liked user1
      var user2 = new Promise(function(resolve, reject){
        UserModel.findOne({email: req.body["email2"]}, function(err, results){
          if(err) res.status(404);         //error, need both emails
          else{
            resolve(results);
          }
        })
      });
      val.save();
      user2.then(function(val) {
        if(val.likes.includes(req.body["email1"])){          //match
          res.send({
            match: true
          });
        }
        else {
          res.send({
            match: false
          })
        }
      });
    });

});

//quick api to server random projects. give an array of 10
router.get("/projects", function (req, res) {
  res.setHeader('Content-Type', 'application/json');
  //name, description, owner
  res.send(fakeData)
})

app.use("/api", router);

app.listen(port);
console.log("I'll be right by your side till " + port);
