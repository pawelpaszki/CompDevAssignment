var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var muscleSchema = new Schema({
    _id  : Schema.Types.ObjectId,
    name  : { type: String, required: true, trim: true, unique: true },
    constant  : { type: Boolean, default: false }
});

var muscle = mongoose.model('muscle', muscleSchema);

module.exports = {
  Muscle: muscle
};