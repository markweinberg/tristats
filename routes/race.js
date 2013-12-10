
exports.race = function() {

   return function(req, res) {

      res.render('race', {name : req.params.name});
   }
}
