var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var tsessionSchema = new Schema({
  _id  : Schema.Types.ObjectId,
  user_id  : { type: String, required: true},
  date  : { type: Date, required: true , trim: true}
});

var tsession = mongoose.model('tsession', tsessionSchema);

module.exports = {
  Tsession: tsession
};