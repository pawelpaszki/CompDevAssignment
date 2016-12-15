var Msession = require('../models/msession').Msession;
var Exerciseunit = require('../models/exerciseunit').Exerciseunit; 

exports.index = function(req, res) {
  Msession.find({'tsession_id': req.params.tsession_id}, function(err, docs) {
    if(!err) {
      res.json(200, { msessions: docs });  
    } else {
      res.json(500, { message: err });
    }
  });
}

exports.show = function(req, res) {
  var id = req.params.id; 
  Msession.findById(id, function(err, doc) {
    if(!err && doc) {
      res.json(200, doc);
    } else if(err) {
      res.json(500, { message: "Error loading muscle group session." + err});
    } else {
      res.json(404, { message: "Muscle group session not found."});
    }
  });
}

exports.create = function(req, res) {

  var newMsession = new Msession(); 
  newMsession.name = req.body.name; 
  newMsession.user_id = req.params.user_id;
  newMsession.tsession_id = req.params.tsession_id;
  newMsession.save(function(err) {
    if(!err) {
      res.json(201, newMsession);    
    } else {
      res.json(500, {message: "Could not create muscle group session. Error: " + err});
    }
  });
  
}

exports.update = function(req, res) {
  // not required
}

exports.destroy = function(req, res) {

  var id = req.params.id; 
  Msession.findById(id, function(err, doc) {
    if(!err && doc) {
      doc.remove();
      Exerciseunit.remove({msession_id: id}, function(err) {
        if (err) {
          res.json(500, {message: "Error: " + err});
        } else {
          res.end('all exercise units removed');
        }
      });
      res.json(200, { message: "Muscle group session removed."});
    } else if(!err) {
      res.json(404, { message: "Could not find muscle group session."});
    } else {
      res.json(403, {message: "Could not delete muscle group session. " + err });
    }
  });
}
