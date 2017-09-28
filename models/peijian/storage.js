'use strict'
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var moment = require('moment');

//入库表模型
var StorageSchema = new Schema (
{
	peijian: {type: Schema.ObjectId, ref: 'Peijian'},
	provider: {type: Schema.ObjectId, ref: 'Provider'},
	date_in: Date,
	price: Number,
	amount: Number
});

// Virtual for Storage's URL
StorageSchema.virtual('url').get(function () {
  return '/peijian/storage/' + this._id;
});

StorageSchema.virtual('f_date_in').get(function () {
  return moment(this.date_in).format('YYYY-MM-DD');
});

StorageSchema.virtual('total').get(function () {
  return (this.price * this.amount).toFixed(2);
});
//Export model
module.exports = mongoose.model('Storage', StorageSchema);