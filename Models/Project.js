var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
var crypto = require('crypto');
var jwt = require('jsonwebtoken');
var secret = require('../config/secret.js');

var ProjectSchema = new mongoose.Schema({
    email: {type: String, unique: true, required: [true, "cannot be empty."], lowercase: true, index: true},
    salt: String,
    hash: String,
    profession: String,
    interests: String,
    strengths: String,
    dislikes: String,
    location: String,
    profileProgress: String,
}, {timestamps: true});

ProjectSchema.plugin(uniqueValidator, {message: "is already taken."});

ProjectSchema.methods.setPassword = function(password){
    this.salt = crypto.randomBytes(16).toString('hex');
    this.hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
};

ProjectSchema.methods.validPassword = function(password){
    var hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
    return this.hash === hash;
};

ProjectSchema.methods.generateJWT = function(){
    var today = new Date();
    var exp = new Date(today);
    exp.setDate(today.getDate()+60);
    return jwt.sign({
        id: this._id,
        username: this.username,
        exp: parseInt(exp.getTime()/1000)
    }, secret)
};

ProjectSchema.methods.toAuthJSON = function(){
    return {
        email: this.email,
        token: this.generateJWT(),
        profession: this.profession,
        interests: this.interests,
        strengths: this.strengths,
        dislikes: this.dislikes,
        location: this.location,
        profileProgress: this.profileProgress,
    };
};

mongoose.model('Project', ProjectSchema);
