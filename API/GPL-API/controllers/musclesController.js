var Muscle = require('../models/muscle').Muscle;

exports.index = function(req, res) {
  Muscle.find({}, function(err, docs) {
    if(!err) {
      res.json(200, { muscles: docs });  
    } else {
      res.json(500, { message: err });
    }
  });
}

exports.show = function(req, res) {
  var id = req.params.id; 
  Muscle.findById(id, function(err, doc) {
    if(!err && doc) {
      res.json(200, doc);
    } else if(err) {
      res.json(500, { message: "Error loading muscle." + err});
    } else {
      res.json(404, { message: "Muscle not found."});
    }
  });
}

exports.create = function(req, res) {

    var newMuscle = new Muscle(); 
    if(!req.body.constant) {
      newMuscle.constant = false;
    } else {
      newMuscle.constant = true;
    }
    newMuscle.name = req.body.name;
    newMuscle.save(function(err) {
      if(!err) {
        res.json(201, newMuscle);    
      } else {
        res.json(500, {message: "Could not create muscle. Error: " + err});
      }
    });
}

exports.update = function(req, res) {
  
  var id = req.params.id;

  Muscle.findById(id, function(err, doc) {
    if(!err && doc) {
      if(doc.constant == false) {
        doc.name = req.body.name;
        doc.save(function(err) {
          if(!err) {
            res.json(200, {message: "Muscle unit updated: "});    
          } else {
            res.json(500, {message: "Could not update muscle. " + err});
          }  
        });
      } else {
        res.json(403, { message: "Forbidden to update constant."}); 
      }
    } else if(!err) {
      res.json(404, { message: "Could not find muscle."});
    } else {
      res.json(500, { message: "Could not update muscle." + err});
    }
  }); 
}

exports.destroy = function(req, res) {

  var id = req.params.id; 
  Muscle.findById(id, function(err, doc) {
    if(!err && doc) {
      if(!doc.constant) {
        doc.remove();
        res.json(200, { message: "Muscle removed."});
      } else {
        res.json(403, { message: "Forbidden to remove constant."}); 
      }
    } else if(!err) {
      res.json(404, { message: "Could not find muscle."});
    } else {
      res.json(403, {message: "Could not delete muscle. " + err });
    }
  });
}
