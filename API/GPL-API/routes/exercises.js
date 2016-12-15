exercises = require('../controllers/exercisesController'),

module.exports = function(app){

  app.get('/api/muscles/:muscle_id/exercises', exercises.index);
  app.get('/api/muscles/:muscle_id/exercises/:id', exercises.show);
  app.post('/api/muscles/:muscle_id/exercises', exercises.create);
  app.put('/api/muscles/:muscle_id/exercises/:id', exercises.update);
  app.del('/api/muscles/:muscle_id/exercises/:id', exercises.destroy);

}

