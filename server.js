var express = require("express");
var app = express();
var bodyParser = require("body-parser");
const mongoose = require('mongoose');
const UserModel = require('./Models/User')(mongoose);
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
router.post("/register", function(req, res) {
  res.setHeader('Content-Type', 'application/json');
  UserModel.findOne({email: req.email}).exec(function(err, user){
    if(err){
      res.status(409);
      res.send("The user already exists");
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

  // if(User.findOne(email)){            //make sure the user doesn't already exist. resolve
  //   res.status(409);
  //   res.send("The user already exists");
  // }
  // else{
  //   User user = new User();
  //   user.signUpUser(req.body);          //make the user
  //   user.save();
  //   res.status(200);
  //   res.send("User created succesfully");
  // }


//used for sign in
router.post("/user", function(req, res){
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



app.use("/api", router);

app.listen(port);
console.log("I'll be right by your side till " + port);
