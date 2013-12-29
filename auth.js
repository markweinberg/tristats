//var xxUser = require('./models/usermodel');
var xxAssert = require('assert');
var xxPassport = require('passport');
var xxLocalStrategy = require('passport-local').Strategy;


var users = [{'id' : -1, 'username' : 'markwei', 'password' : 'password', 'email' : 'markwei@outlook.com'},
             {'id' : -1, 'username' : 'aeengstrom', 'password' : 'password', 'email' : 'aeengstrom@hotmail.com'}];


function FindUser(username, ValidatePasswordFn) {

   // TODO: replace this with a mongo lookup

   for (i=0; i < users.length; i++) {
      if (username == users[i].username) {
         return ValidatePasswordFn(null, users[i]);
      }
   }

   return ValidatePasswordFn(null, null);
}


function FindUserByID(id, done) {

   for (i=0; i < users.length; i++) {
      if (id == users[i].id) {
         return done(null, users[i]);
      }
   }

   return done(null, null);
}


exports.ConfigureLocal = function() {

   // Setup session support

   xxPassport.serializeUser(function(user, done) {

      done(null, user.id);
   });

   xxPassport.deserializeUser(function(id, done) {

      FindUserByID(id, function(err, user) {
         done(err, user);
      });
   });

   // NOTE NOTE NOTE: passport-local requires the name of the username HTML field to be
   // a single term (e.g. username). You can't use user.name because the passport-local
   // source won't allow it. You can set the name to be whatever you want (with the usernameField
   // option). But it has to be a single term. Same goes for the password field.

   xxPassport.use(

      new xxLocalStrategy(

         function(username, password, done) {

            FindUser(username, 

               function(err, user) {

                  if (err) {
                     return done(err);
                  }

                  if (user == null) {
                     return done(null, false, { message : 'Unknown User' });
                  }

                  if (password != user.password) {
                     return done(null, false, { message : 'Invalid Password' });
                  }

                  return done(null, user);
               }
            );
         }
      )
   );
}


exports.Authenticate = function(successRedirectURI) {

   if (successRedirectURI) {
      return xxPassport.authenticate('local', { 'successRedirect' : successRedirectURI, 'failureRedirect' : '/login' });
   }
   else {
      return xxPassport.authenticate('local', { 'failureRedirect' : '/login' });
   }
}
