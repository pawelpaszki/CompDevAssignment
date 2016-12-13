users = require('../routes/users'),

module.exports = function(app){

  app.get('/users', users.index);
  app.get('/users/:id', users.show);
  app.post('/users', users.create);
  app.put('/users/:id', users.update);
  app.del('/users/:id', users.destroy);

}