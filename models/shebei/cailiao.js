'use strict'
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


//材料单模型
var CldSchema = new Schema (
{
	name: String,
	shu: Number,
	price: Number,
});

//Export model
module.exports = mongoose.model('Cld', CldSchema);