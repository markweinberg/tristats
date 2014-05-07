
var xxBCrypt = require('bcrypt-nodejs');

var SALT_WORK_FACTOR = 10;


// ******************************************************
// Mongo specific code
// ******************************************************

var xxMongoose = require('mongoose');

var _userSchema = xxMongoose.Schema({
   sid : { type : Number }, 
   username : { type : String, required : true, index : { unique : true } },
   password : { type : String, required : true },
   firstName : { type : String},
   lastName : { type : String},
   email : { type : String }
});


// Create a connection to the database

var _userDB = xxMongoose.createConnection('localhost', 'users');


_userDB.on('error', function(err) {
   console.log('userDB error: ' + err);
});


_userDB.on('connected', function() {
   console.log('userDB opened');
});


_userDB.on('disconnected', function() {
   console.log('userDB disconnected');
});

/*
_userSchema.pre('save', function(next) {

   var user = this;

   // Only hash the password if it has been modified (or is new)

   if (!user.isModified('password')) {
      return next();
   }

   // Generate a salt

   bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {

      if (err) {
         return next(err);
      }

      // Hash the password using our new salt

      xxBCrypt.hash(user.password, salt, function(err, hash) {

         if (err) {
            return next(err);
         }

         // Override the cleartext password with the hashed one

         user.password = hash;

         next();
      });
   });
});
*/

_userSchema.methods.ComparePassword = function(candidatePassword, cb) {

   xxBCrypt.compare(candidatePassword, this.password, function(err, isMatch) {

      if (err) {
         return cb(err);
      }

      cb(null, isMatch);
   });
};


// User Type

function _User(username, password, firstName, lastName, email) {

   // Raw class members

   this.username = username;
   this.password = password;
   this.firstName = firstName;
   this.lastName = lastName;
   this.email = email;

   // ******************************************************
   // Mongo specific code
   // ******************************************************

   // Attach the schema to the 'users' DB

   this.mongoModel = _userDB.model('users', _userSchema);

   // Create the mongo doc object

   this.mongoDoc = new this.mongoModel({
      "username" : username, 
      "password" : password,
      "firstName" : firstName,
      "lastName" : lastName,
      "email" : email
   });
}

_User.prototype.save = function(cb) {

   // ******************************************************
   // Mongo specific code
   // ******************************************************

   return this.mongoDoc.save(cb);
}


//exports.User = _userDB.model('users', _userSchema);
exports.User = _User;


exports.Shutdown = function() {

   _userDB.close(function() {
      console.log('userDB closed thru app termination');
   });
}


