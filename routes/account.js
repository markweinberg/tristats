
var xxUserModel = require('../models/usermodel');
var xxAssert = require('assert');
//var xxPassport = require('passport');


exports.CreateAccount = function() {

   return function(req, res) {

      var user = new xxUserModel.User({
         sid : 1000,
         username : req.body.username, 
         password : req.body.password,
         firstName : req.body.firstName,
         lastName : req.body.lastName,
         email : req.body.email
      });

console.log('before user.save');
console.log('username = ' + user.username);

      user.save(function(err) {

console.log('after user.save');

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
