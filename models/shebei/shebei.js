'use strict'
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


//设备表模型
var ShebeiSchema = new Schema (
{
	name: String,
	description: String
});

// Virtual for Shebei's URL
ShebeiSchema.virtual('url').get(function () {
  return '/sbwx/shebei/' + this._id;
});

//Export model
module.exports = mongoose.model('Shebei', ShebeiSchema);