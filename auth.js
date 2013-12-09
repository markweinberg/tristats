
exports.Auth = function() {

    console.log("xxAuth::LoginUser");

    var isAuthorized = true;

    return function(req, res, next) {

       if (isAuthorized) {
          next();
       }
       else {
          res.end("Not Authorized");
       }
   }
}

