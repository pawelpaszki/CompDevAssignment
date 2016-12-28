var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var exerciseSchema = new Schema({
    _id  : Schema.Types.ObjectId,
    muscle_id  : { type: String, required: true},
    group  : { type: String, required: true , trim: true },
    constant  : { type: Boolean, default: false },
    name : { type: String, required: true, trim: true, unique: true},
    descriptions: Schema.Types.Mixed,
    pictures: Schema.Types.Mixed
});

var exercise = mongoose.model('exercise', exerciseSchema);

module.exports = {
  Exercise: exercise
};