var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CompanySchema = new Schema(
{
	name:{type: String, required: true},
	add: String,
})

//Export model
module.exports = mongoose.model('Company', CompanySchema);

// var schema = new Schema(
// {
  // name: String,
  // binary: Buffer,
  // living: Boolean,
  // updated: { type: Date, default: Date.now },
  // age: { type: Number, min: 18, max: 65, required: true },
  // mixed: Schema.Types.Mixed,
  // _someId: Schema.Types.ObjectId,
  // array: [],
  // ofString: [String], // You can also have an array of each of the other types too.
  // nested: { stuff: { type: String, lowercase: true, trim: true } }
// })