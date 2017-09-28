'use strict'
var Gxjbxx = require('../models/gxjbxx');
var Blgs = require('../models/blgs');
var Pline = require('../models/pline');
var async = require('async');

// Display detail page for 不良杆数
exports.blgs_detail = function(req, res, next) {
	var blgs={} ;
	//嵌套 查询一下
    Blgs.findById(req.params.id)
    .exec(function (err, bl) {
      if (err) { return next(err); }    
	  blgs = bl;
	  Gxjbxx.findById(bl.gxbh).populate('pline').exec(function(err, gxjb){
		  if (err) { return next(err); };
			// console.log(gxjb);
			res.render('blgs_detail', {  blgs: blgs , gxjb:gxjb});
	  } ) ;
    });
 };

// Display blgs create form on GET
exports.blgs_create_get = function(req, res, next) {
	async.parallel({
		gxjb: function(callback) {     
			 Gxjbxx.findById(req.params.id).populate('pline').exec(callback);
		},
		blgs: function(callback) {
			Blgs.findOne({gxbh : req.params.id}).exec(callback);
		},
    }, function(err, results) {
		if (err) { return next(err); }	
		//如果有记录，跳转到该记录
		if (results.blgs ){
			res.redirect(results.blgs.url);			
		}else{
			res.render('blgs_form', { title: '不良杆数填写', gxjb: results.gxjb});
		}
	});
};

exports.blgs_create_post = function(req, res, next) {

	var blgs = new Blgs({
		gxbh: req.params.id,
		sc: req.body.sc,	
		sc_r:  req.body.scyy,
		mh: req.body.mh,
		mh_r: req.body.mhyy,
		ct: req.body.ct,
		ct_r: req.body.ctyy,
		qp: req.body.qp,
		qp_r: req.body.qpyy,
		qt: req.body.qt,
		qt_r: req.body.qtyy,
		cs: req.body.cs,
		cs_r: req.body.csyy
	})
	blgs.save(function(err){
		if(err) {return next(err)}					
		res.redirect(blgs.url);		
	})
};

// Display 不良杆数 update form on GET
exports.blgs_update_get = function(req, res, next) {
	//嵌套 查询一下
    Blgs.findById(req.params.id).exec(function (err, blgs) {
      if (err) { return next(err); }    
	  Gxjbxx.findById(blgs.gxbh).populate('pline').exec(function(err, gxjb){
		  if (err) { return next(err); };
			// console.log(gxjb);
			res.render('blgs_form', { title: '不良杆数修改', blgs: blgs , gxjb:gxjb});
	  } ) ;
    });
};

// Handle blgs update on POST
exports.blgs_update_post = function(req, res, next) {
	var blgs = new Blgs({
		sc: req.body.sc,	
		sc_r:  req.body.scyy,
		mh: req.body.mh,
		mh_r: req.body.mhyy,
		ct: req.body.ct,
		ct_r: req.body.ctyy,
		qp: req.body.qp,
		qp_r: req.body.qpyy,
		qt: req.body.qt,
		qt_r: req.body.qtyy,
		cs: req.body.cs,
		cs_r: req.body.csyy,
		_id: req.params.id
	})

    Blgs.findByIdAndUpdate(req.params.id, blgs, function (err, bl) {
        if (err) { return next(err); }
        //successful - redirect to book detail page.
        res.redirect(bl.url);
    });	

};

// Display blgs update form on GET
exports.blgs_delete_get = function(req, res, next) {
	var blgs={} ;
	//嵌套 查询一下
    Blgs.findById(req.params.id)
    .exec(function (err, bl) {
      if (err) { return next(err); }    
	  blgs = bl;
	  Gxjbxx.findById(bl.gxbh).populate('pline').exec(function(err, gxjb){
		  if (err) { return next(err); };
			// console.log(gxjb);
			res.render('blgs_delete', { title: '不良杆数删除', blgs: blgs , gxjb:gxjb});
	  } ) ;
    });
};

exports.blgs_delete_post = function(req, res, next) {

    // Delete object and redirect to the list of gxjb.
    Blgs.findByIdAndRemove(req.body.blgsid, function (err) {
        if (err) { return next(err); }
        //Success -
        res.redirect('/');
    });
};