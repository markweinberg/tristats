
//var xxUserModel = require('../models/usermodel');
var xxAssert = require('assert');
//var xxPassport = require('passport');

var _isLoggedIn = false;
var _noLogin = 0;
var _invalidPassword = -1;
var _invalidUsername = -2;


function GetUserToken(username, password) {

   // Try to find the username and password in the DB

   if ((username == "mark") && (password == "mark")) {
      return 1234;
   }

   // Can we validate the username?

   if (username == "mark") {
      return _invalidPassword;
   }
   else {
      return _invalidUsername;
   }
}


exports.LoginUser = function() {

   return function(req, res) {

//      xxPassport.authenticate('local', { successRedirect : '/', failureRedirect : '/login' });
   }
}


exports.LoginPage = function() {

   return function(req, res) {

      var userToken = _noLogin;

      if (req.params && req.params.token) {
          userToken = req.params.token;
      }

      res.render('login', { 'title' : 'Login', 'token' : userToken });
   }
}

exports.IsLoggedIn = function() {

    console.log("Login::IsLoggedIn");

    return function(req, res, next) {

       if (_isLoggedIn) {
          next();
       }
       else {
          res.redirect('/login');
//          res.end("Not Authorized");
       }
   }
}
