var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var moment = require('moment');

//设备维修记录 模型
var SbwxSchema = new Schema (
{
	_id: Number,
	pline: {type: Schema.ObjectId, ref: 'Pline'},
	sbbh: {type: Schema.ObjectId, ref: 'Shebei'},
	fsrq: Date,
	gzms: String,
	gzyy: {type: Schema.ObjectId, ref: 'Gzyy'},
	staff: {type: Schema.ObjectId, ref: 'Staff'},
	wxff: String,
	xfrq: Date,
	whrq: Date,
	cld: [{
	   peijian : {type: Schema.ObjectId, ref: 'Peijian'},
	   danjia : Number,
	   shuliang: Number
    }],
	finish: Boolean,
});

// Virtual for sbwx's URL
SbwxSchema.virtual('url').get(function () {
  return '/sbwx/sbwx/' + this._id;
});

SbwxSchema.virtual('total').get(function () {
	var total = 0;
	if (this.cld){
		for (i =0 ; i < this.cld.length ; i ++){
			total += (this.cld[i].danjia * this.cld[i].shuliang)
		}
	}
  return total;
});

SbwxSchema.virtual('fs_date').get(function () {
  return moment(this.fsrq).format('YYYY-MM-DD');
});

SbwxSchema.virtual('xf_date').get(function () {
  return moment(this.xfrq).format('YYYY-MM-DD');
});

SbwxSchema.virtual('wh_date').get(function () {
	if(this.whrq){
		 return moment(this.whrq).format('YYYY-MM-DD');
	}else{
		return null;
	}
 
});

//Export model
module.exports = mongoose.model('Sbwx', SbwxSchema);