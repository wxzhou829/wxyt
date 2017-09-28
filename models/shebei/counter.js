'use strict'
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


//MongoDB 自动增长 储存的数字
var CounterSchema = new Schema (
{
	_id: String,
	value: Number
});

//Export model
module.exports = mongoose.model('Counter', CounterSchema);