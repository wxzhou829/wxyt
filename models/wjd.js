var mongoose = require('mongoose');
var Schema = mongoose.Schema;

	//未家动数量
var WjdSchema = new Schema(
{
	gxbh:{type: Schema.ObjectId, ref: 'Gxjbxx'},
	pzdd: Number,
	hbcf: Number,
	hydq: Number,
	kgjwc: Number,
	qt: Number,
	//设备故障是数组，数组里面是对象
	sbgz: [{
		reason: String,
		amount: Number,
		s_time: String,
		e_time: String, 
		banci: String
		}]
})

WjdSchema.virtual('url').get(function () {
  return '/sczc/wjd/' + this._id;
});

WjdSchema.virtual('wjdSum').get(function () {
	var sbgz = 0 ;
	var wjdSum = 0;
	for (let i = 0 ; i < this.sbgz.length ; i++){
		sbgz += this.sbgz[i].amount
	}
	wjdSum = sbgz + this.pzdd + this.hbcf + this.hydq + this.kgjwc + this.qt;	
  return wjdSum;
});

//Export model
module.exports = mongoose.model('Wjd', WjdSchema);

