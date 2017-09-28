var mongoose = require('mongoose');
var Schema = mongoose.Schema;
//各线药水处理
var GxysclSchema = new Schema(
{
	gxbh:{type: Schema.ObjectId, ref: 'Gxjbxx'},
	yao:[{
		ysbh: {type: Schema.ObjectId, ref: 'Yaoshui'},
	    clmj: Number,
	    clsl: Number,
	    clts: Number,
	    ljmj: Number
	}]
})

// Virtual for gxys's URL
GxysclSchema.virtual('url').get(function () {
  return '/sczc/gxys/' + this._id;
});

//Export model
module.exports = mongoose.model('Gxyscl', GxysclSchema);
