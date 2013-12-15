
var xxUserModel = require('../models/usermodel');
var xxAssert = require('assert');

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

console.log('LoginUser, before assert');

      xxAssert.ok(req.body != null);
      xxAssert.ok(req.body.user != null);
console.log('LoginUser, after asserts');

      // See if this is a valid username and password. If so, get the token.

      var userToken = GetUserToken(req.body.user.name, req.body.user.password);
        
      xxAssert.ok(userToken != _noLogin);

      if (userToken == _invalidPassword) {
         res.render('login', { 'invalidUsername' : false, 'invalidPassword' : true });
      }
      else if (userToken == _invalidUsername) {
         res.render('login', { 'invalidUsername' : true, 'invalidPassword' : false });
      }
      else {
         _isLoggedIn = true;
         res.redirect('/');
      }
   }
}


exports.LoginPage = function() {

   return function(req, res) {

      var userToken = _noLogin;

      if (req.params && req.params.token) {
          userToken = req.params.token;
      }

      res.render('login', { 'token' : userToken });
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

/*
Things to track down
 - Why doesn't script get called from the button click handler in login.jade?
 - How do you use Jade "if" statements? Want to add if isValidUser to that page
 - Should the token be part of the userModel schema? If so, does it need to be a field in the DB too?
 - How do I create a Shutdown event so that all DB's can be closed properly?
*/


