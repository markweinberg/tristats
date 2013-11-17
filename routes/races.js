
var xxMongoose = require('mongoose');

/*
 * GET races list
 */

exports.races = function(db) {

     // Open the Races database

console.log("before once");
     db.once('open', function callback() {
console.log("after once");

    });

  // Route handlers always return a function(req, res)

  return function(req, res) {

        var raceSchema = xxMongoose.Schema({
            name : String,
            location_city : String,
            location_state : String,
            location_country : String});

        var races = xxMongoose.model('races', raceSchema);
/*
var test = new races({"name" : "foo_name", "location_city" : "foo_city", "location_state" : "foo_state", "location_country" : "foo_country"});
test.save(function(err, test) {});
*/
        races.find(function(err, data) {
console.log(JSON.stringify(data));
           res.render('races', {"races" : data});
        });
     }
   }
