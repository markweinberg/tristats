
//var xxUserModel = require('../models/usermodel');
var xxAssert = require('assert');
//var xxPassport = require('passport');


exports.CreateAccount = function() {

   return function(req, res) {

      console.log("username = " + req.body.username);
      console.log("first name = " + req.body.firstName);
      console.log("last name = " + req.body.lastName);
   }
}


exports.AccountPage = function() {

   return function(req, res) {

      res.render('account', { 'title' : 'Account' });
   }
}
