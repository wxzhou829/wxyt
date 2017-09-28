'use strict'
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


//故障原因模型
var GzyySchema = new Schema (
{
	name: String,
	description: String
});

// Virtual for Gzyy's URL
GzyySchema.virtual('url').get(function () {
  return '/sbwx/gzyy/' + this._id;
});
//Export model
module.exports = mongoose.model('Gzyy', GzyySchema);