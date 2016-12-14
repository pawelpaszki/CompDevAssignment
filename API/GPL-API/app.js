

var express = require('express'),
  routes = require('./routes'),
  http = require('http'),
  
  mongoose = require('mongoose');

// MongoDB Connection 
mongoose.connect('mongodb://localhost/gym_progress_logger');
var app = express();

app.configure(function(){
  app.set('port', process.env.PORT || 3001);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

app.get('/', routes.index);

require('./routes/users')(app);
require('./routes/tsessions')(app);

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port %s",  app.get('port'));
});
