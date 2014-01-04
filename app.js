
var express = require('express');
var passport = require('passport');
var routes = require('./routes');
var user = require('./routes/user');
var xxRaces = require('./routes/races');
var xxRace = require('./routes/race');
var http = require('http');
var path = require('path');
var xxLogin = require('./routes/login');
var xxAuth = require('./auth');

//var mongo = require('mongodb');
//var mongoose = require('mongoose');
//var monk = require('monk');
//var db = monk('localhost:27017/tristats');

//var server = new mongo.Server('localhost', 27017, {auto_reconnect: true});
//var db = new mongo.Db('races', server);

//mongoose.connect('mongodb://localhost/races');
//var xxDB = require('./db');
//var db = mongoose.connection;
//var db = xxDB.RacesDB;

//db.on('error', console.error.bind(console, 'database connection error'));

// Setup shutdown handlers

process.on('SIGINT', function() {

   var xxUserModel = require('./models/usermodel');
   var xxRaceModel = require('./models/racemodel');

   xxUserModel.Shutdown();
   xxRaceModel.Shutdown();

   process.exit(0);
});

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
//app.set('view engine', 'jade');
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.cookieParser('your secret here'));
app.use(express.session());
app.use(express.bodyParser());

app.use(passport.initialize());
app.use(passport.session());

xxAuth.ConfigureLocal();


// If you want to build a site (ala Sharefile) that restricts access to all URL's
// then you would put the app.use call here rather than on each individual URL

//app.use(xxLogin.IsLoggedIn());

// For passport, this would be:
//
// app.use(xxAuth.Authenticate(null));


app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

// If you only want to restrict certain URL's to logged in users, rather than checking that 
// above, i.e. app.use(xxLogin.IsLoggedIn()), you would add that "middleware" to the app.get
// below. Example:
//
// app.get('/someURL', xxLogin.Authenticate(), xxSomeURLRoute);

app.get('/', routes.index);
app.get('/users', user.list);
app.get('/races', xxAuth.Authenticate(), xxRaces.races()); //, xxRaces.races(db));
app.get('/races/:name', xxRace.race()); //xxRace.race(db));

app.get('/login', xxLogin.LoginPage());
app.post('/login', xxAuth.Authenticate('/'));

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
