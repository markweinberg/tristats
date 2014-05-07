
var xxUserModel = require('../models/usermodel');
var xxAssert = require('assert');
//var xxPassport = require('passport');


exports.CreateAccount = function() {

   return function(req, res) {

      var user = new xxUserModel.User(
         req.body.username, 
         req.body.password, 
         req.body.firstName, 
         req.body.lastName, 
         req.body.email);

      user.save(function(err) {

         if (err) {
            return console.error(err);
         }

         console.log(user.username);
      });

      res.render('account', {'title' : 'Account'});
   }
}


exports.AccountPage = function() {

   return function(req, res) {

      res.render('account', { 'title' : 'Account' });
   }
}
