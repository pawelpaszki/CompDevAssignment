users = require('../controllers/usersController'),

module.exports = function(app){

  app.get('/api/users', users.index);
  app.get('/api/users/:id', users.show);
  app.post('/api/users', users.create);
  app.put('/api/users/:id', users.update);
  app.del('/api/users/:id', users.destroy);

}

