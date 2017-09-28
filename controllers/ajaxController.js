'use strict'
var Peijian = require('../models/peijian/peijian');
var Storage = require('../models/peijian/storage');
var async = require('async');

exports.sbwx_finish_get = function(req, res, next) {
	Peijian.findOne({bh : req.query.bh}).exec(function(err, peijian){
		if (err) {next(err) }
		if (peijian){
			Storage.find({peijian:　peijian._id}).sort({_id : -1}).limit(1).populate('peijian')
			.exec(function(err, results){
				if (err) {next(err) }
				res.json(results[0]);
			})
		}else{
			res.json('');
		}

	})
};
