//Set up mongoose connection
var mongoose = require('mongoose');
//var mongoDB = 'insert_your_database_url_here';
var mongoDB = 'mongodb://localhost/wxxgt';
mongoose.connect(mongoDB);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

var Gxjb = require('./models/gxjbxx');
var Gxys = require('./models/gxyscl');
var Pline = require('./models/pline');

var dt = Date.parse('2017-09-02');

Gxjb.find({date : {$gt : dt}}).exec(function(err, rs){
	if (err) console.error(err);
	var ar = [];
	for (var i=0; i < rs.length; i++) {
		ar.push(rs[i]._id)
	}
	Gxys.find( {gxbh : ar}).exec(function(err, r){
		console.log(r)
	});
	
});	

	