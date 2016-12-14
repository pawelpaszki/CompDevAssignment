var Exerciseunit = require('../models/exerciseunit').Exerciseunit; 

exports.index = function(req, res) {
  Exerciseunit.find({'msession_id': req.params.msession_id}, function(err, docs) {
    if(!err) {
      res.json(200, { exerciseunits: docs });  
    } else {
      res.json(500, { message: err });
    }
  });
}

exports.show = function(req, res) {
  var id = req.params.id; 
  Exerciseunit.findById(id, function(err, doc) {
    if(!err && doc) {
      res.json(200, doc);
    } else if(err) {
      res.json(500, { message: "Error loading exercise unit." + err});
    } else {
      res.json(404, { message: "Exercise unit not found."});
    }
  });
}

exports.create = function(req, res) {

    var newExerciseunit = new Exerciseunit(); 
    newExerciseunit.name = req.body.name; 
    newExerciseunit.user_id = req.params.user_id;
    newExerciseunit.tsession_id = req.params.tsession_id;
    newExerciseunit.msession_id = req.params.msession_id;
    newExerciseunit.muscle_group = req.body.muscle_group;
    newExerciseunit.save(function(err) {
      if(!err) {
        res.json(201, newExerciseunit);    
      } else {
        res.json(500, {message: "Could not create exercise unit. Error: " + err});
      }
    });
}

exports.update = function(req, res) {
  
  var id = req.params.id;

  Exerciseunit.findById(id, function(err, doc) {
    if(!err && doc) {
      doc.weight = req.body.weight;
      doc.number_of_series = req.body.number_of_series;
      doc.number_of_reps = req.body.number_of_reps;
      doc.save(function(err) {
        if(!err) {
          res.json(200, {message: "Exercise unit updated: "});    
        } else {
          res.json(500, {message: "Could not update exercise unit. " + err});
        }  
      });
    } else if(!err) {
      res.json(404, { message: "Could not find exercise unit."});
    } else {
      res.json(500, { message: "Could not update exercise unit." + err});
    }
  }); 
}

exports.destroy = function(req, res) {

  var id = req.params.id; 
  Exerciseunit.findById(id, function(err, doc) {
    if(!err && doc) {
      doc.remove();
      res.json(200, { message: "Exercise unit removed."});
    } else if(!err) {
      res.json(404, { message: "Could not find exercise unit."});
    } else {
      res.json(403, {message: "Could not delete exercise unit. " + err });
    }
  });
}

exports.destroyall = function(req, res, next) {
  Exerciseunit.remove({}, function(err) {
    if (err) {
      res.json(500, {message: "Error: " + err});
    } else {
      res.end('all exercise units removed');
    }
  });
}