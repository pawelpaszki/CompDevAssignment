exerciseunits = require('../controllers/exerciseunitsController'),

module.exports = function(app){

  app.get('/api/users/:user_id/tsessions/:tsession_id/msessions/:msession_id/exerciseunits', exerciseunits.index);
  app.get('/api/users/:user_id/tsessions/:tsession_id/msessions/:msession_id/exerciseunits/:id', exerciseunits.show);
  app.get('/api/users/:user_id/exerciseunits', exerciseunits.showusersexercises);
  app.post('/api/users/:user_id/tsessions/:tsession_id/msessions/:msession_id/exerciseunits', exerciseunits.create);
  app.put('/api/users/:user_id/tsessions/:tsession_id/msessions/:msession_id/exerciseunits/:id', exerciseunits.update);
  app.del('/api/users/:user_id/tsessions/:tsession_id/msessions/:msession_id/exerciseunits/:id', exerciseunits.destroy);
  app.del('/api/users/:user_id/tsessions/:tsession_id/msessions/:msession_id/exerciseunits', exerciseunits.destroyall);
}

