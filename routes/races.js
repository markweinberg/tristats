
var xxRaceModel = require('../models/racemodel');

exports.races = function() {

   // Route handlers always return a function(req, res)

   return function(req, res) {

      xxRaceModel.GetRaces(function(err, data) {
           res.render('races', {"races" : data});
      });
   }
}
