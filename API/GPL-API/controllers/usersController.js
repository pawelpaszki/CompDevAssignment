var User = require('../models/user').User; 

/*
 * Users Routes
 */
exports.index = function(req, res) {
  User.find({}, function(err, docs) {
    if(!err) {
      res.json(200, { users: docs });  
    } else {
      res.json(500, { message: err });
    }
  });
}

exports.show = function(req, res) {
  var id = req.params.id; 
  User.findById(id, function(err, doc) {
    if(!err && doc) {
      res.json(200, doc);
    } else if(err) {
      res.json(500, { message: "Error loading user." + err});
    } else {
      res.json(404, { message: "User not found."});
    }
  });
}

exports.create = function(req, res) {

    var newUser = new User(); 

    newUser.first_name = req.body.first_name; 
    newUser.surname = req.body.surname;
    newUser.dob = req.body.dob;
    newUser.body_weight = req.body.body_weight;
    newUser.height = req.body.height;
    newUser.picture = req.body.picture;
    newUser.training_from = req.body.training_from;
 
    newUser.save(function(err) {
      if(!err) {
        res.json(201, newUser);    
      } else {
        res.json(500, {message: "Could not create user. Error: " + err});
      }
    });
}

exports.update = function(req, res) {
  
  var id = req.params.id; 
  var first_name = req.body.first_name; 
  var surname = req.body.surname;
  var dob = req.body.dob;
  var body_weight = req.body.body_weight;
  var height = req.body.height;
  var picture = req.body.picture;
  var training_from = req.body.training_from;

  User.findById(id, function(err, doc) {
    if(!err && doc) {
      doc.first_name = req.body.first_name; 
      doc.surname = req.body.surname;
      doc.dob = req.body.dob;
      doc.body_weight = req.body.body_weight;
      doc.height = req.body.height;
      doc.picture = req.body.picture;
      doc.training_from = req.body.training_from; 
      doc.save(function(err) {
        if(!err) {
          res.json(200, {message: "User updated: " + surname});    
        } else {
          res.json(500, {message: "Could not update user. " + err});
        }  
      });
    } else if(!err) {
      res.json(404, { message: "Could not find user."});
    } else {
      res.json(500, { message: "Could not update user." + err});
    }
  }); 
}

exports.destroy = function(req, res) {

  var id = req.params.id; 
  User.findById(id, function(err, doc) {
    if(!err && doc) {
      doc.remove();
      res.json(200, { message: "User removed."});
    } else if(!err) {
      res.json(404, { message: "Could not find user."});
    } else {
      res.json(403, {message: "Could not delete user. " + err });
    }
  });
}