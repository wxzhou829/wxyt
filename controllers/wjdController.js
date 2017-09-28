'use strict'
var Gxjbxx = require('../models/gxjbxx');
var Wjd = require('../models/wjd');
var Pline = require('../models/pline');
var async = require('async');

// Display detail page for a specific wjd
exports.wjd_detail = function(req, res, next) {	
	//嵌套 查询一下
    Wjd.findById(req.params.id).exec(function (err, wjd) {
      if (err) { return next(err); }    
	  Gxjbxx.findById(wjd.gxbh).populate('pline').exec(function(err, gxjb){
		  if (err) { return next(err); };
			// console.log(gxjb);
			res.render('wjd_detail', {  wjd: wjd , gxjb:gxjb});
	  } ) ;
    });
 };

// Display wjd create form on GET
exports.wjd_create_get = function(req, res, next) {
	async.parallel({
		gxjb: function(callback) {     
			 Gxjbxx.findById(req.params.id).populate('pline').exec(callback);
		},
		wjd: function(callback) {
			Wjd.findOne({gxbh : req.params.id}).exec(callback);
		},
    }, function(err, results) {
		if (err) { return next(err); }	
		//如果有记录，跳转到该记录
		if (results.wjd ){
			res.redirect(results.wjd.url);			
		}else{
			res.render('wjd_form', { title: '未稼动填写', gxjb: results.gxjb});
		}
	});
};

exports.wjd_create_post = function(req, res, next) {
			//获得 数组的长度
	var leng = 4 ;
	var sbgzArr =[];
	var sbgzObj ={};

	//数据验证省略，通过chrome客户端验证
	for ( let i = 0; i < leng ; i++ ){
		if (req.body['gzsl'+i] > 0){
			sbgzObj = {
				reason: req.body['gzyy'+i],
				amount: req.body['gzsl'+i],
				s_time: req.body['fssj'+i],
				e_time: req.body['xfsj'+i],
				banci:  req.body['bc'+i]
			};
			sbgzArr.push(sbgzObj);
		}
	}	

	var wjd = new Wjd({
		gxbh:  req.params.id,
		pzdd:  req.body.pzdd,
		hbcf:  req.body.hbcf,
		hydq:  req.body.hydq,
		kgjwc: req.body.kgj,
		qt:    req.body.qt,
		sbgz:  sbgzArr
	})

	wjd.save(function(err){
		if(err) {return next(err)};
		//res.send("success")
		res.redirect(wjd.url);		
	})
};

// Display wjd update form on GET
exports.wjd_update_get = function(req, res, next) {
	//嵌套 查询一下
	Wjd.findById(req.params.id).exec(function(err, wjd) {
		if (err) { return next(err); };
		Gxjbxx.findById(wjd.gxbh).populate('pline').exec(function(err, gxjb){
		  if (err) { return next(err); };
		res.render('wjd_form', { title: '未稼动修改', wjd: wjd, gxjb: gxjb});
		});
	});
};

// Handle wjd update on POST
exports.wjd_update_post = function(req, res, next) {

	var leng = 4 ;
	var sbgzArr =[];
	var sbgzObj ={};

	//数据验证省略，通过chrome客户端验证
	for ( let i = 0; i < leng ; i++ ){
		if (req.body['gzsl'+i] > 0){
			sbgzObj = {
				reason: req.body['gzyy'+i],
				amount: req.body['gzsl'+i],
				s_time: req.body['fssj'+i],
				e_time: req.body['xfsj'+i],
				banci:  req.body['bc'+i]
			};
			sbgzArr.push(sbgzObj);
		}
	}	

	var wjd = new Wjd({
		_id:   req.params.id, //This is required, or a new ID will be assigned!
		pzdd:  req.body.pzdd,
		hbcf:  req.body.hbcf,
		hydq:  req.body.hydq,
		kgjwc: req.body.kgj,
		qt:    req.body.qt,
		sbgz:  sbgzArr
	})
	
    Wjd.findByIdAndUpdate(req.params.id, wjd, function (err, thewjd) {
        if (err) { return next(err); }
        //successful - redirect to book detail page.
        res.redirect(thewjd.url);
    });	

};

// Display wjd update form on GET
exports.wjd_delete_get = function(req, res, next) {
	//嵌套 查询一下
    Wjd.findById(req.params.id).exec(function (err, wjd) {
      if (err) { return next(err); }    
	  Gxjbxx.findById(wjd.gxbh).populate('pline').exec(function(err, gxjb){
		  if (err) { return next(err); };
			// console.log(gxjb);
			res.render('wjd_delete', { title: '未稼动删除', wjd: wjd , gxjb:gxjb});
	  } ) ;
    });
};

exports.wjd_delete_post = function(req, res, next) {

    // Delete object and redirect to the list of gxjb.
    Wjd.findByIdAndRemove(req.body.wjdid, function (err) {
        if (err) { return next(err); }
        //Success -
        res.redirect('/');
    });
};