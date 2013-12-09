
var xxMongoose = require('mongoose');

var raceSchema = xxMongoose.Schema({
   name : String,
   location_city : String,
   location_state : String,
   location_country : String});

var raceDB = xxMongoose.createConnection('localhost', 'races');


raceDB.on('error', function(err) {
   console.log('raceDB error: ' + err);
});

raceDB.on('connected', function() {
   console.log('raceDB opened');
});

raceDB.on('disconnected', function() {
   console.log('raceDB disconnected');
});

process.on('SIGINT', function() {
   raceDB.close(function() {
      console.log('raceDB closed thru app termination');
      process.exit(0);
   });
});


exports.GetRaces = function(callback) {

   var races = raceDB.model('races', raceSchema);

   races.find(callback);
}
