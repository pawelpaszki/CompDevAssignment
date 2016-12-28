msessions = require('../controllers/msessionsController'),

module.exports = function(app){

  app.get('/api/users/:user_id/tsessions/:tsession_id/msessions', msessions.index);
  app.get('/api/users/:user_id/tsessions/:tsession_id/msessions/:id', msessions.show);
  app.get('/api/users/:user_id/msessions', msessions.showusersmsessions);
  app.post('/api/users/:user_id/tsessions/:tsession_id/msessions', msessions.create);
  app.del('/api/users/:user_id/tsessions/:tsession_id/msessions/:id', msessions.destroy);

}

