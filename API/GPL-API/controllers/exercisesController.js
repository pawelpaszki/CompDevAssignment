var Exercise = require('../models/exercise').Exercise;

exports.index = function(req, res) {
  Exercise.find({'muscle_id': req.params.muscle_id}, function(err, docs) {
    if(!err) {
      res.json(200, { exercises: docs });  
    } else {
      res.json(500, { message: err });
    }
  });
}

exports.show = function(req, res) {
  var id = req.params.id; 
  Exercise.findById(id, function(err, doc) {
    if(!err && doc) {
      res.json(200, doc);
    } else if(err) {
      res.json(500, { message: "Error loading exercise." + err});
    } else {
      res.json(404, { message: "Exercise not found."});
    }
  });
}

exports.create = function(req, res) {

    var newExercise = new Exercise(); 
    if(!req.body.constant) {
      newExercise.constant = false;
    } else {
      newExercise.constant = true;
    }
    newExercise.name = req.body.name;
    newExercise.group = req.body.group;
    newExercise.descriptions = req.body.descriptions;
    newExercise.pictures = req.body.pictures;
    newExercise.muscle_id = req.params.muscle_id;
    newExercise.save(function(err) {
      if(!err) {
        res.json(201, newExercise);    
      } else {
        res.json(500, {message: "Could not create exercise. Error: " + err});
      }
    });
}

exports.update = function(req, res) {
  
  var id = req.params.id;
  Exercise.findById(id, function(err, doc) {
    if(!err && doc) {
      if(doc.constant == false) {
        doc.name = req.body.name;
        doc.save(function(err) {
          if(!err) {
            res.json(200, {message: "Exercise updated: "});    
          } else {
            res.json(500, {message: "Could not update exercise. " + err});
          }  
        });
      } else {
        res.json(403, { message: "Forbidden to update constant."}); 
      }
    } else if(!err) {
      res.json(404, { message: "Could not find exercise."});
    } else {
      res.json(500, { message: "Could not update exercise." + err});
    }
  }); 
}

exports.destroy = function(req, res) {
  var id = req.params.id; 
  Exercise.findById(id, function(err, doc) {
    if(!err && doc) {
      if(!doc.constant) {
        doc.remove();
        res.json(200, { message: "Exercise removed."});
      } else {
        res.json(403, { message: "Forbidden to remove constant."}); 
      }
    } else if(!err) {
      res.json(404, { message: "Could not find exercise."});
    } else {
      res.json(403, {message: "Could not delete exercise. " + err });
    }
  });
}
