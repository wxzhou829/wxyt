'use strict'
//var Counter = require('../../models/shebei/counter');
var Sbwx = require('../../models/shebei/sbwxjl');
var Gzyy = require('../../models/shebei/reson');
var Shebei = require('../../models/shebei/shebei');
var Staff = require('../../models/shebei/staff');

var async = require('async');



exports.test = function(req, res, next) {
	//编号自动增长
	Counter.where({ _id: 'wxid' }).update({ $inc: { value: 1 }}).exec(function(err, result){
		if(err) {return next(err)}	
		Counter.where({ _id: 'wxid' }).findOne(function(err, count){
			if(err) {return next(err)}	
			var sbwx = new Sbwx({
　　　　　　	_id:　count.value,
				gzms: 'test',
　　　　　　});
			sbwx.save(function(err){
				if(err) {return next(err)}					
				res.send('ok');		
			})
			//console.log(count.value)
		})		
	})   
};

exports.add = function(req, res, next) {	
	// var arr = [
		// { name: '徐浩' }, 
	    // { name: '董正徐' },
    // ];
	// Staff.insertMany(arr, function(error, docs) {
		// if(error) {return next(error)}
		// res.send('ok');		
	// });
};

