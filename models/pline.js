var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PlineSchema = new Schema(
{
	name:{type: String, required: true}
})

//Export model
module.exports = mongoose.model('Pline', PlineSchema);