

var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var errorHandler = require('errorhandler');
var morgan = require('morgan');
var mongoose = require('mongoose');

// MongoDB Connection 
mongoose.connect('mongodb://localhost/gym_progress_logger');
var app = express();
  app.use(function (req, res, next) {

      // Website you wish to allow to connect
      res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

      // Request methods you wish to allow
      res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

      // Request headers you wish to allow
      res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

      // Set to true if you need the website to include cookies in the requests sent
      // to the API (e.g. in case you use sessions)
      res.setHeader('Access-Control-Allow-Credentials', true);

      // Pass to next layer of middleware
      next();
});
app.configure(function(){
  app.set('port', process.env.PORT || 3001);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

var routes = require('./routes'),
  http = require('http');
  app.configure('development', function(){
  app.use(express.errorHandler());
});

app.get('/', routes.index);

require('./routes/users')(app);
require('./routes/tsessions')(app);
require('./routes/msessions')(app);
require('./routes/exerciseunits')(app);
require('./routes/muscles')(app);
require('./routes/exercises')(app);

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port %s",  app.get('port'));
});
