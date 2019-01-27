var express = require("express");
var app = express();
var bodyParser = require("body-parser");
require('./models/User');
require('./config/passport');

const mongoose = require('mongoose');
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

router.post("/users", function(req, res) {

});

router.post("/edit-project", function(req, res) {

});

app.use("/api", router);

app.listen(port);
console.log("I'll be right by your side till " + port);
