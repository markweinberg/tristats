
var xxMongoose = require('mongoose');

exports.race = function(db) {

   return function(req, res) {

      res.send({name : req.params.name});
   }
}
