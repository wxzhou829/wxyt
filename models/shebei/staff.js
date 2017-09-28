'use strict'
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


//员工表模型
var StaffSchema = new Schema (
{
	name: String,
	phone: String,
	other: String
});

// Virtual for Staff's URL
StaffSchema.virtual('url').get(function () {
  return '/sbwx/staff/' + this._id;
});

//Export model
module.exports = mongoose.model('Staff', StaffSchema);