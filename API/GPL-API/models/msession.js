var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var _ = require('lodash');
var Muscle = require('../models/muscle').Muscle;

var muscles = [];
Muscle.find({}, function(err, docs) {
  if(!err) {
    muscles: docs;
  }
});
if(muscles.length > 0) {
  var musclenames = _.map(muscles, 'name');
}
    
var msessionSchema = new Schema({
    _id  : Schema.Types.ObjectId,
    user_id  : { type: String, required: true},
    tsession_id  : { type: String, required: true},
    // parameterize later:
    name : { type: String, required: true , trim: true, enum: [ 'biceps', 'calf', 'chest', 'leg', 'back', 'triceps', 'shoulders' ]}
});

var msession = mongoose.model('msession', msessionSchema);

module.exports = {
  Msession: msession
};