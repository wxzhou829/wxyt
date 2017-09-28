var Gxjbxx = require('../models/gxjbxx');
var Gxyscl = require('../models/gxyscl');
var Pline = require('../models/pline');
var Yaoshui = require('../models/yaoshui');
var async = require('async');

// Display detail page for a specific gxys
exports.gxys_detail = function(req, res, next) {
	
	var gxys={} ;
	//嵌套 查询一下
    Gxyscl.findById(req.params.id).populate('yao.ysbh')
    .exec(function (err, ys) {
      if (err) { return next(err); }    
	  gxys = ys;
	  Gxjbxx.findById(ys.gxbh).populate('pline').exec(function(err, gxjb){
		  if (err) { return next(err); };
			 //console.log(gxys);
			// console.log(gxjb);
			res.render('gxys_detail', {  gxys: gxys , gxjb:gxjb});
	  } ) ;
    });
 };


// Display gxjbxx create form on GET
exports.gxys_get = function(req, res, next) {
	
	var yao = [];
	
	async.parallel({
		gxjb: function(callback) {     
			 Gxjbxx.findById(req.params.id).exec(callback);
		},
		yaoshui: function(callback) {
			Yaoshui.find().exec(callback);
		},
		gxys: function(callback) {
			Gxyscl.findOne({gxbh : req.params.id}).exec(callback);
		},
    }, function(err, results) {
		if (err) { return next(err); }	
			
		//药水的长度
		for (i = 0; i < results.yaoshui.length; i++) {
			// 每个药水中，是否含有pline
			if (results.yaoshui[i].pline.indexOf(results.gxjb.pline) > -1 )
				yao.push(results.yaoshui[i]);			
		}		
		//Successful, so render
		//console.log(yao);
		//如果有记录，跳转到该记录
		if (results.gxys ){
			res.redirect(results.gxys.url);
		}else{
			res.render('gxys_form', { title: '各线药水信息', yaoshui: yao});
		}
		
	});

};

exports.gxys_post = function(req, res, next) {
	
		//获得 数组的长度
	var leng = Object.keys(req.body).length  / 5 ;
	var yaoArr =[];
	var yaoObj ={};

	//数据验证省略，通过chrome客户端验证
	for ( i = 0; i < leng ; i++ ){
		yaoObj = {
			ysbh: req.body['yaoid_'+i],
			clmj: req.body['clmj_'+i],
			clsl: req.body['clsl_'+i],
			clts: req.body['clts_'+i],
			ljmj: req.body['ljmj_'+i]
		};
		yaoArr.push(yaoObj);
	}	

	var gxys = new Gxyscl({
		gxbh: req.params.id,
		yao: yaoArr
	} )
	//console.log(gxys);
	gxys.save(function(err){
		if(err) {return next(err)}					
		//res.redirect(gxjbxx.url);
		res.redirect(gxys.url);
	})
};

// Display Gxys update form on GET
exports.gxys_update_get = function(req, res, next) {

	Gxyscl.findById(req.params.id).populate('yao.ysbh').exec(function(err, gxys) {
		if (err) { return next(err); };
		res.render('gxys_form', { title: '药水信息修改', gxys: gxys});
	})
};

// Handle Gxjbxx update on POST
exports.gxys_update_post = function(req, res, next) {

		//获得 数组的长度
	var leng = Object.keys(req.body).length  / 5 ;
	var yaoArr =[];
	var yaoObj ={};

	//数据验证省略，通过chrome客户端验证
	for ( i = 0; i < leng ; i++ ){
		yaoObj = {
			ysbh: req.body['yaoid_'+i],
			clmj: req.body['clmj_'+i],
			clsl: req.body['clsl_'+i],
			clts: req.body['clts_'+i],
			ljmj: req.body['ljmj_'+i]
		};
		yaoArr.push(yaoObj);
	}	

	var gxys = new Gxyscl({
		_id:req.params.id, //This is required, or a new ID will be assigned!
		yao: yaoArr
	} )
	
    Gxyscl.findByIdAndUpdate(req.params.id, gxys, function (err, ys) {
        if (err) { return next(err); }
        //successful - redirect to book detail page.
        res.redirect(ys.url);
    });	

};

// Display Gxys update form on GET
exports.gxys_delete_get = function(req, res, next) {
	var gxys={} ;
	//嵌套 查询一下
    Gxyscl.findById(req.params.id).populate('yao.ysbh')
    .exec(function (err, ys) {
      if (err) { return next(err); }    
	  gxys = ys;
	  Gxjbxx.findById(ys.gxbh).populate('pline').exec(function(err, gxjb){
		  if (err) { return next(err); };
			 //console.log(gxys);
			// console.log(gxjb);
			res.render('gxys_delete', { title: '药水信息删除', gxys: gxys , gxjb:gxjb});
	  } ) ;
    });
};

exports.gxys_delete_post = function(req, res, next) {

    // Delete object and redirect to the list of gxjb.
    Gxyscl.findByIdAndRemove(req.body.gxysid, function (err) {
        if (err) { return next(err); }
        //Success -
        res.redirect('/');
    });
};