var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var moment = require('moment');

//各线基本信息
var GxjbxxSchema = new Schema (
{
	pline: {type: Schema.ObjectId, ref: 'Pline'},
	date: Date,
	kjcs: Number,
	yctrl: Number,
	zclmj:Number,
	scss: Number,
	yygs: Number,
	shui: Number,
	dian: Number,
	apxsj:Number,
	bad: Number
});

// Virtual for gxjbxx's URL
GxjbxxSchema.virtual('url').get(function () {
  return '/sczc/gxjb/' + this._id;
});

GxjbxxSchema.virtual('f_date').get(function () {
  return moment(this.date).format('YYYY-MM-DD');
});
//Export model
module.exports = mongoose.model('Gxjbxx', GxjbxxSchema);