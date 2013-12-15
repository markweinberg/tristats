
var xxUserModel = require('../models/usermodel');

var _isLoggedIn = false;

exports.LoginUser = function() {

   return function(req, res) {

      if (req.body && req.body.user) {
      
         // Attempt to log the user in

         // if successfully logged in

         if (req.body.user.name == "mark") {
            _isLoggedIn = true;
            res.redirect('/');
         }
      }

      if (!_isLoggedIn) {
         // Stay on the login page but throw an error. Not sure yet how to do this???
         res.redirect('back');
      }
   }
}


exports.LoginPage = function() {

   return function(req, res) {

//      console.log(req.params.username);
/*
      if (req.params.count == 0) {
         res.render('login');
      }
      else {

         // Were the params passed via the login page or in the URL

         if (req.params.fromURL) {
             // Should we allow this?
         }
         else {
            // These were params passed via the login page

            // Validate the parameters (i.e. non null, no invalid characters, etc.

            var user = xxUserModel.GetUser(req.params.username, req.params.password);

            // Did we get a valid user

            if (user.token > 0) {

               _isLoggedIn = true;

               // Go to the Home page

               res.redirect('/');
            }
            else {

               // Need to stay on the login page, but the user should be prompted
               // with an "invalid login"
               //
               // How do we do this? Can you pass parameters in res.render? would you do /login/:invalid
               // Then Jade could know that this was an invalid user
               // 
               // res.render('login', { isValidUser : false });
               //
               // Need to use Jade ~if login like
               //
               // ~if isInvalidUser
               //     p Invalid User
            }
         }
      }

     
      res.render('login');
*/
res.render('login', { isValidUser : true });
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


