var Gxjbxx = require('../models/gxjbxx');
var Gxys = require('../models/gxyscl');
var Blgs = require('../models/blgs');
var Wjd = require('../models/wjd');
var Company = require('../models/company');
var Pline = require('../models/pline');
var async = require('async');
var moment = require('moment');


exports.index = function(req, res, next) {
	async.parallel({
		gxjb: function(callback) {     
			Gxjbxx.find().populate('pline').sort({date:-1})
				.limit(50).exec(callback);
		},
		pline: function(callback) {
			Pline.find().sort({name:1}).exec(callback);
		},
    }, function(err, results) {
		if (err) { return next(err); }
		//console.log(res.locals.session_user)
		//Successful, so render
		res.render('gxjb_index', { title: '各线基本信息', plines: results.pline ,
			gxjbs: results.gxjb});
	});
};

//查询 gxjb
exports.query = function(req, res, next){
	var s_date = Date.parse(req.body.s_date);
	
		//查找是否有 
	Gxjbxx.findOne({pline: req.body.pline, date: s_date } )
		.exec(function(err, found_xx){
			if(err) {return next(err)}
			
			if(found_xx){
				//找到就跳转到该地址				
				res.redirect(found_xx.url);
			}else{
				//未找到就跳转回去
				res.redirect('/');
			}
				
		} );
	
};

// Display list of all gxjbxxs
exports.gxjb_list = function(req, res) {
    res.send('NOT IMPLEMENTED: gxjbxx list');
};

// Display detail page for a specific gxjbxx
exports.gxjb_detail = function(req, res, next) {
    Gxjbxx.findById(req.params.id).populate('pline')
    .exec(function (err, gxjb) {
      if (err) { return next(err); }
      //Successful, so render
      res.render('gxjb_detail', {  gxjb: gxjb });
    });
};

// Display gxjbxx create form on GET
exports.gxjb_create_get = function(req, res, next) {
	async.parallel({
		company: function(callback) {     
			Company.find().exec(callback);
		},
		pline: function(callback) {
			Pline.find().sort({name:1}).exec(callback);
		},
    }, function(err, results) {
		if (err) { return next(err); }
		//Successful, so render
		var date = new Date();
		var yesterday = moment(date.setDate(date.getDate() - 1)).format('YYYY-MM-DD');
		res.render('gxjb_form', { title: '各线基本信息录入', companies: results.company, 
			plines: results.pline , day: yesterday});
	});
};

// Handle Gxjbxx create on POST
exports.gxjb_create_post = function(req, res, next) {

	var s_date = Date.parse(req.body.s_date);
	
	//数据验证省略，通过chrome客户端验证
	var gxjbxx = new Gxjbxx({
		pline: req.body.pline,
		date: s_date,
		kjcs: req.body.kjcs,
		yctrl: req.body.yctrl,
		zclmj:req.body.zclmj,
		scss: req.body.scss,
		yygs: req.body.yygs,
		shui: req.body.shui,
		dian: req.body.dian,
		apxsj: req.body.apxsj,
		bad: req.body.bad
	} )
	
	//查找是否有 相同的pline 和date	
	Gxjbxx.findOne({pline: req.body.pline, date: s_date } )
		.exec(function(err, found_xx){
			if(err) {return next(err)}
			
			if(found_xx){
				//找到就跳转到该地址				
				res.redirect(found_xx.url);
			}else{
				//未找到就保存，跳转到当前保存地址
				gxjbxx.save(function(err){
					if(err) {return next(err)}					
					res.redirect(gxjbxx.url);
				} )
			}
				
		} );
};

// Display gxjbxx delete form on GET
exports.gxjb_delete_get = function(req, res) {
    async.parallel({
		gxjb: function(callback) {     
			Gxjbxx.findById(req.params.id).populate('pline').exec(callback);
		},
		gxys: function(callback) {
			Gxys.find({gxbh:　req.params.id}).exec(callback);
		},
		blgs: function(callback) {
			Blgs.find({gxbh:　req.params.id}).exec(callback);
		},		
		wjd: function(callback) {
			Wjd.find({gxbh:　req.params.id}).exec(callback);
		},		
    }, function(err, results) {
		if (err) { return next(err); }
		//Successful, so render
		console.log(results);
		res.render('gxjb_delete', { title: '基本信息删除', gxjb: results.gxjb, 
			results: results });
	});
};

// Handle Gxjbxx delete on POST
exports.gxjb_delete_post = function(req, res) {
    // Delete object and redirect to the list of gxjb.
    Gxjbxx.findByIdAndRemove(req.body.gxjbid, function (err) {
        if (err) { return next(err); }
        //Success -
        res.redirect('/');
    });
};

// Display Gxjbxx update form on GET
exports.gxjb_update_get = function(req, res, next) {
	async.parallel({
		gxjb: function(callback) {     
			Gxjbxx.findById(req.params.id).populate('pline').exec(callback);
		},
		pline: function(callback) {
			Pline.find().sort({name:1}).exec(callback);
		},
    }, function(err, results) {
		if (err) { return next(err); }
		//Successful, so render
		res.render('gxjb_form', { title: '基本信息修改', gxjb: results.gxjb, 
			plines: results.pline });
	});
};

// Handle Gxjbxx update on POST
exports.gxjb_update_post = function(req, res, next) {

	//var s_date = Date.parse(req.body.s_date);
	//数据验证省略，通过chrome客户端验证
	var gxjbxx = new Gxjbxx({
		pline: req.body.pline,
		date: req.body.s_date,
		kjcs: req.body.kjcs,
		yctrl: req.body.yctrl,
		zclmj:req.body.zclmj,
		scss: req.body.scss,
		yygs: req.body.yygs,
		shui: req.body.shui,
		dian: req.body.dian,
		apxsj: req.body.apxsj,
		bad: req.body.bad,
		_id:req.params.id //This is required, or a new ID will be assigned!
	} )
	
	//console.log(gxjbxx);
        // Data from form is valid. Update the record.
        Gxjbxx.findByIdAndUpdate(req.params.id, gxjbxx, function (err, gxjb) {
            if (err) { return next(err); }
            //successful - redirect to book detail page.
            res.redirect(gxjb.url);
        });
};