var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

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