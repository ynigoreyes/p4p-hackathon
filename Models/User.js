var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
var crypto = require('crypto');
var jwt = require('jsonwebtoken');
var secret = require('../config/secret.js');

var UserSchema = new mongoose.Schema({
    email: {type: String, unique: true, required: [true, "cannot be empty."], lowercase: true, index: true},
    salt: String,
    hash: String,
    name: String,
    school: String,
    dob: Date,
    interests: String[],
    strengths: String[],
    dislikes: String[],
    reputation: String[],
    location: String
}, {timestamps: true});

UserSchema.plugin(uniqueValidator, {message: "is already taken."});

UserSchema.methods.setPassword = function(password){
    this.salt = crypto.randomBytes(16).toString('hex');
    this.hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
};

UserSchema.methods.signUpUser(JSONObject user){
  this.email = user.email;
  this.name = user.name;
  this.dob = user.dob;
  this.pasword = this.setPassword(user.password);
};

UserSchema.methods.validPassword = function(password){
    var hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
    return this.hash === hash;
};

UserSchema.methods.generateJWT = function(){
    var today = new Date();
    var exp = new Date(today);
    exp.setDate(today.getDate()+60);
    return jwt.sign({
        id: this._id,
        username: this.username,
        exp: parseInt(exp.getTime()/1000)
    }, secret)
};

UserSchema.methods.toAuthJSON = function(){
    return {
        email: this.email,
        token: this.generateJWT()
    };
};

mongoose.model('User', UserSchema);
