var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var msessionSchema = new Schema({
    _id  : Schema.Types.ObjectId,
    user_id  : { type: String, required: true},
    tsession_id  : { type: String, required: true},
    // parameterize later:
    muscle_group  : { type: String, required: true , trim: true, enum: [ 'biceps', 'calf', 'chest', 'leg', 'back', 'triceps', 'shoulders' ]},
    // parameterize later:
    name  : { type: String, required: true, trim: true, enum: [ 'barbell flat bench press', 'barbell incline bench press', 'barbell decline bench press', 'concentration curls', 'alternate hammer curl', 'standing calf raise', 'sitting calf raise', 'barbell full squat', 'leg press', 'leg extensions', 'lying leg curls', 'cable two arms extensions', 'weighted bench dip', 'reverse grip triceps pushdown', 'standing military press', 'power partials', 'front dumbbell raise', 'deadlift', 'reverse grip bent-over rows', 't-bar row' ]},
});

var msession = mongoose.model('msession', msessionSchema);

module.exports = {
  Msession: msession
};