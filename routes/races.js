
var xxMongoose = require('mongoose');

/*
 * GET races list
 */

exports.races = function(db) {

   // Route handlers always return a function(req, res)

   return function(req, res) {

      var raceSchema = xxMongoose.Schema({
            name : String,
            location_city : String,
            location_state : String,
            location_country : String});

//      var races = xxMongoose.model('races', raceSchema);
      var races = db.model('races', raceSchema);

        races.find(function(err, data) {
           res.render('races', {"races" : data});
        });
   }
}
