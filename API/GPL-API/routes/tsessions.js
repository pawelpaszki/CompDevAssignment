tsessions = require('../controllers/tsessionsController'),

module.exports = function(app){

  app.get('/api/users/:user_id/tsessions', tsessions.index);
  app.get('/api/users/:user_id/tsessions/:id', tsessions.show);
  app.post('/api/users/:user_id/tsessions', tsessions.create);
  app.put('/api/users/:user_id/tsessions/:id', tsessions.update);
  app.del('/api/users/:user_id/tsessions/:id', tsessions.destroy);

}

