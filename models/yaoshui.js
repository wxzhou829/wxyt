var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var YaoshuiSchema = new Schema(
{
	name:{type: String, required: true},
	pline: [{type: Schema.ObjectId, ref: 'Pline'}]
})


// Virtual for Yaoshui's URL
YaoshuiSchema.virtual('url').get(function () {
  return '/sczc/gxys/' + this._id;
});

//Export model
module.exports = mongoose.model('Yaoshui', YaoshuiSchema);
