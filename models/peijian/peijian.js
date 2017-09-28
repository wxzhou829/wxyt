'use strict'
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


//设备表模型
var PeijianSchema = new Schema (
{
	bh: {type:String, unique: true},
	name: String,
	standard: String,
	type: String,
	stock: Number,
	safe_num: Number,
	image: String
});

// Virtual for Peijian's URL
PeijianSchema.virtual('url').get(function () {
  return '/peijian/peijian/' + this._id;
});

//Export model
module.exports = mongoose.model('Peijian', PeijianSchema);