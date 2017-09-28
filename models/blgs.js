var mongoose = require('mongoose');
var Schema = mongoose.Schema;

	//不良杆数、桶数
var BlgsSchema = new Schema(
{
	gxbh:{type: Schema.ObjectId, ref: 'Gxjbxx'},
	sc: Number,	
	sc_r:  String,
	mh: Number,
	mh_r: String,
	ct: Number,
	ct_r: String,
	qp: Number,
	qp_r: String,
	qt: Number,
	qt_r:String,
	cs: Number,
	cs_r: String
})
BlgsSchema.virtual('url').get(function () {
  return '/sczc/blgs/' + this._id;
});

BlgsSchema.virtual('blSum').get(function () {
  var sum = this.sc + this.mh + this.ct + this.qp + this.qt + this.cs;
  return sum;
});
//Export model
module.exports = mongoose.model('Blgs', BlgsSchema);

