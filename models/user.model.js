/** 
 * 用户表
 */
'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
	username:String,
	password:  String, 
	role: {
		type : String ,
		default : 'user'
	},
	created: {
		type: Date,
		default: Date.now
	}
});

// Virtual for Storage's URL
UserSchema.virtual('url').get(function () {
  return '/users/' + this._id;
});

//Export model
module.exports = mongoose.model('User', UserSchema);

