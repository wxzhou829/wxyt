'use strict'
var Gxjbxx = require('../models/gxjbxx');
var Wjd = require('../models/wjd');
var Pline = require('../models/pline');
var Blgs = require('../models/blgs');
var async = require('async');

var dt_s = Date.parse('2017-09-01');
var dt_e = Date.parse('2017-10-01');
var pli = 'PD2'
var mo  =  (new Date(dt_s)).getMonth()

exports.query_list = function(req, res, next) {
	 res.render("query/list", {title: ' 查询列表 ' } );
};


exports.query_month = function(req, res, next) {

	//查询 基本数据
	Gxjbxx.find({date: {$gte : dt_s , $lt: dt_e}}).populate('pline').sort({date:1}).exec(function(err, gxjb){
		if (err) next(err);
		var ar = [];
		var gx =[];
		for (var i=0; i < gxjb.length; i++) {
			if (gxjb[i].pline.name === pli){
				ar.push(gxjb[i]._id);
				gx.push(gxjb[i]);
			}
		}
		//查询 未稼动 数据
		Wjd.find( {gxbh : ar}).exec(function(err, wjd){
			if (err) next(err);
			for (var j=0; j < wjd.length; j++) {
				for (var k=0; k < gxjb.length; k++) {
					if ( wjd[j].gxbh.toString() === gxjb[k]._id.toString()){
						gxjb[k].sjgs = gxjb[k].yygs - wjd[j].wjdSum;
					}
				}
			}
			//查询不良数据
			Blgs.find( {gxbh : ar}).exec(function(err, blgs){
				if (err) next(err);
				for (var m=0; m < blgs.length; m++) {
					for (var n=0; n < gxjb.length; n++) {
						if ( blgs[m].gxbh.toString() === gxjb[n]._id.toString()){
							gxjb[n].blgs =  blgs[m].blSum;
						}
					}
				}				
				//这个就是邪恶的金字塔 ，可以考虑用async
				//查询是异步，渲染必须放置在最里面
				 res.render("query/month", {title: (mo+1) +' 月数据查询 ' + pli , gxjb: gx } );
			});
		});
	} );
	
};
