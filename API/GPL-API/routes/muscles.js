muscles = require('../controllers/musclesController'),

module.exports = function(app){

  app.get('/api/muscles', muscles.index);
  app.get('/api/muscles/:id', muscles.show);
  app.post('/api/muscles', muscles.create);
  app.put('/api/muscles/:id', muscles.update);
  app.del('/api/muscles/:id', muscles.destroy);

}

