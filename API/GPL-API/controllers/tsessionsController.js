var Tsession = require('../models/tsession').Tsession;
var Msession = require('../models/msession').Msession;
var Exerciseunit = require('../models/exerciseunit').Exerciseunit;  

exports.index = function(req, res) {
  Tsession.find({'user_id': req.params.user_id}, function(err, docs) {
    if(!err) {
      res.json(200, { tsessions: docs });  
    } else {
      res.json(500, { message: err });
    }
  });
}

exports.show = function(req, res) {
  var id = req.params.id; 
  Tsession.find({'user_id': req.params.user_id, '_id': req.params.id}, function(err, doc) {
    if(!err && doc) {
      res.json(200, doc);
    } else if(err) {
      res.json(500, { message: "Error loading training session." + err});
    } else {
      res.json(404, { message: "Training session not found."});
    }
  });
}

exports.create = function(req, res) {

    var newTsession = new Tsession(); 
    newTsession.date = req.body.date; 
    newTsession.user_id = req.params.user_id;
    newTsession.save(function(err) {
      if(!err) {
        res.json(201, newTsession);    
      } else {
        res.json(500, {message: "Could not create training session. Error: " + err});
      }
    });
}

exports.update = function(req, res) {
  
  var id = req.params.id; 
  console.log(id);
  Tsession.findById(id, function(err, doc) {
    if(!err && doc) {
      doc.date = req.body.date; 
      console.log(doc.date);
      doc.save(function(err) {
        if(!err) {
          res.json(200, {message: "Training session updated: " + date});    
        } else {
          res.json(500, {message: "Could not update training session. " + err});
        }  
      });
    } else if(!err) {
      res.json(404, { message: "Could not find training session."});
    } else {
      res.json(500, { message: "Could not update training session." + err});
    }
  }); 
}

exports.destroy = function(req, res) {

  var id = req.params.id; 
  Tsession.findById(id, function(err, doc) {
    if(!err && doc) {
      doc.remove();
      Exerciseunit.remove({tsession_id: id}, function(err) {
        if (err) {
          res.json(500, {message: "Error: " + err});
        } else {
          res.end('all exercise units removed');
        }
      });
      Msession.remove({tsession_id: id}, function(err) {
        if (err) {
          res.json(500, {message: "Error: " + err});
        } else {
          res.end('all muscle group sessions removed');
        }
      });
      res.json(200, { message: "Training session removed."});
    } else if(!err) {
      res.json(404, { message: "Could not find training session."});
    } else {
      res.json(403, {message: "Could not delete training session. " + err });
    }
  });
}
