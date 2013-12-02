
var xxMongoose = require('mongoose');

exports.race = function(db) {

   return function(req, res) {

//      res.send({name : req.params.name});

      res.render('race', {name : req.params.name});
   }
}
