var mongoose = require('mongoose')
  , Schema = mongoose.Schema;

var userSchema = new Schema({
    _id  : Schema.Types.ObjectId,
    first_name  : { type: String, required: true, trim: true },
    surname  : { type: String, required: true, trim: true },
    dob  : { type: Date, required: true , trim: true},
    body_weight : { type: Number, min: 40, max: 300, required: true, trim: true },
    height : { type: Number, min: 120, max: 250, required: true, trim: true },
    picture : { type: String, required: true, trim: true },
    training_from : { type: Date, required: true, trim: true } 
});

var user = mongoose.model('user', userSchema);

module.exports = {
  User: user
};