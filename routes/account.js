
var xxUserModel = require('../models/usermodel');
var xxAssert = require('assert');
//var xxPassport = require('passport');


exports.CreateAccount = function() {

   return function(req, res) {

      console.log("username = " + req.body.username);
      console.log("first name = " + req.body.firstName);
      console.log("last name = " + req.body.lastName);

      var user = new xxUserModel.User({
         username : req.body.username, 
         firstName : req.body.firstName,
         lastName : req.body.lastName
      });

      user.save(function(err, data) {

         if (err) {
            return console.error(err);
         }
         else {
            console.dir(data);
         }
      });

      res.render('account', {'title' : 'Account'});
   }
}


exports.AccountPage = function() {

   return function(req, res) {

      res.render('account', { 'title' : 'Account' });
   }
}
