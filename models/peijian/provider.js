'use strict'
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


//供应商模型
var ProviderSchema = new Schema (
{
	name: {type:String, unique: true},
	address: String,
	contact: String,
	scope: String,
});

// Virtual for Provider's URL
ProviderSchema.virtual('url').get(function () {
  return '/peijian/provider/' + this._id;
});

//Export model
module.exports = mongoose.model('Provider', ProviderSchema);