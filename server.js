var express = require("express");
var app = express();
var bodyParser = require("body-parser");
require('./models/User');
require('./config/passport');


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 3005;

var router = express.Router();

router.get("/", function(req, res) {
  res.json({ message: "Test GET" });
});

router.post("/users", function(req, res) {

});

app.use("/api", router);

app.listen(port);
console.log("I'll be right by your side till " + port);
