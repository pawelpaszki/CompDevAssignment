var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var exerciseunitSchema = new Schema({
    _id  : Schema.Types.ObjectId,
    user_id  : { type: String, required: true},
    tsession_id  : { type: String, required: true},
    msession_id  : { type: String, required: true},
    muscle_group  : { type: String, required: true , trim: true, enum: [ 'biceps', 'calf', 'chest', 'leg', 'back', 'triceps', 'shoulders' ]},
    name : { type: String, required: true, trim: true, enum: [ 'barbell flat bench press', 'barbell incline bench press', 'barbell decline bench press', 'barbell curl', 'concentration curls', 'alternate hammer curl', 'standing calf raise', 'sitting calf raise', 'barbell full squat', 'leg press', 'leg extensions', 'lying leg curls', 'cable two arms extensions', 'weighted bench dip', 'reverse grip triceps pushdown', 'standing military press', 'power partials', 'front dumbbell raise', 'deadlift', 'reverse grip bent-over rows', 't-bar row' ]},
    weight : {type: Number, default: 0, min: 0, max: 800 },
    number_of_series : {type: Number, default: 0 },
    number_of_reps : {type: Number, default: 0 }
});

var exerciseunit = mongoose.model('exerciseunit', exerciseunitSchema);

module.exports = {
  Exerciseunit: exerciseunit
};