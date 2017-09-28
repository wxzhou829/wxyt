var Cld = require('../models/shebei/cailiao');
var Counter = require('../models/shebei/counter');
var Gzyy = require('../models/shebei/reson');
var Sbwx = require('../models/shebei/sbwxjl');
var Shebei = require('../models/shebei/shebei');
var Staff = require('../models/shebei/staff');
var Pline = require('../models/pline');
var Peijian = require('../models/peijian/peijian');
var async = require('async');
var moment = require('moment');


// Display list of unfinish Sbwxs
exports.sbwx_list = function(req, res, next) {
	Sbwx.find().where('finish').equals(false)
	.sort({_id : -1}).limit(30).populate('pline').populate('sbbh')
		.exec(function(err, sbwx){
		if (err) {next(err) }
		res.render("sbwx/sbwx_list", {title:'未完成维修单', sbwxs:sbwx} )
	} )
};

// Display list of finish Sbwxs
exports.sbwx_finish_list = function(req, res, next) {
	Sbwx.find().where('finish').equals(true)
	.sort({_id : -1}).limit(30).populate('pline').populate('sbbh')
		.exec(function(err, sbwx){
		if (err) {next(err) }
		res.render("sbwx/sbwx_finish_list", {title:'已经完成维修单', sbwxs:sbwx} )
	} )
};

// Display detail page for a specific Sbwx
exports.sbwx_detail = function(req, res, next) {
	Sbwx.findById(req.params.id).where('finish').equals(false)
	.populate('pline').populate('sbbh').populate('staff').populate('gzyy')
	.exec(function(err, sbwx){
		if (err) {next(err) }
		res.render('sbwx/sbwx_detail', { title: '维修单明细', sbwx: sbwx});
	} )	
};

// Display detail page for a specific Sbwx
exports.sbwx_detail_f = function(req, res, next) {
	Sbwx.findById(req.params.id)
	.populate('pline').populate('sbbh').populate('staff').populate('gzyy')
	.exec(function(err, sbwx){
		if (err) {next(err) }
		//console.log(sbwx.cld)
		res.render('sbwx/sbwx_detail_f', { title: '维修单完善明细', sbwx: sbwx});
	} )	
};

// Display Sbwx create form on GET
exports.sbwx_create_get = function(req, res, next) {
	async.parallel({
		shebei: function(callback) {     
			Shebei.find().exec(callback);
		},
		pline: function(callback) {
			Pline.find().sort({name:1}).exec(callback);
		},
    }, function(err, results) {
		if (err) { return next(err); }
		//Successful, so render
		var date = new Date();
		var yesterday = moment(date.setDate(date.getDate() - 1)).format('YYYY-MM-DD');
		res.render('sbwx/sbwx_form', { title: '维修单输入', shebeis:results.shebei,
			plines: results.pline,  day: yesterday});
	});
};

// Handle Sbwx create on POST
exports.sbwx_create_post = function(req, res, next) {

		//编号自动增长
	Counter.where({ _id: 'wxid' }).update({ $inc: { value: 1 }}).exec(function(err, result){
		if(err) {return next(err)}	
		Counter.where({ _id: 'wxid' }).findOne(function(err, count){
			if(err) {return next(err)}	
				var sbwx = new Sbwx({ 
				    _id:　count.value,
					pline: req.body.pline,
					sbbh: req.body.shebei,
					fsrq:  req.body.fs_date,	
					gzms:  req.body.gzms,	
					finish: false	
				});
			sbwx.save(function(err){
				if(err) {return next(err)}					
				res.redirect(sbwx.url);
			})
			//console.log(count.value)
		})		
	})   
};

// Display Sbwx delete form on GET
exports.sbwx_delete_get = function(req, res, next) {
	Sbwx.findById(req.params.id).where('finish').equals(false)
	.populate('pline').populate('sbbh').populate('staff').populate('gzyy')
	.exec(function(err, sbwx){
		if (err) {next(err) }
		res.render('sbwx/sbwx_delete', { title: '维修单删除', sbwx: sbwx});
	} )	
};

// Handle Sbwx delete on POST
exports.sbwx_delete_post = function(req, res, next) {
    Sbwx.findByIdAndRemove(req.body.sbwxid, function (err) {
        if (err) { return next(err); }
        //Success -
         res.redirect('/sbwx/sbwx');
    });
};

// Display Sbwx update form on GET
exports.sbwx_update_get = function(req, res, next) {
	async.parallel({
		shebei: function(callback) {     
			Shebei.find().exec(callback);
		},
		pline: function(callback) {
			Pline.find().sort({name:1}).exec(callback);
		},
		sbwx: function(callback) {
			Sbwx.findById(req.params.id).exec(callback);
		}
    }, function(err, results) {
		if (err) { return next(err); }
		//Successful, so render
		res.render('sbwx/sbwx_form', { title: '维修单信息修改', shebeis:results.shebei,
			plines: results.pline , sbwx: results.sbwx});
	});	

};

// Handle Sbwx update on POST
exports.sbwx_update_post = function(req, res, next) {
	var sbwx = new Sbwx({ 
	    _id:　req.params.id,
		pline: req.body.pline,
		sbbh: req.body.shebei,
		fsrq:  req.body.fs_date,	
		gzms:  req.body.gzms,	
	});
    Sbwx.findByIdAndUpdate(req.params.id, sbwx, {}, function (err , thesb) {
        if (err) { return next(err); }
            //Genre saved. Redirect to sbwx list
            res.redirect(thesb.url);
    });
};


// Display Sbwx finish form on GET
exports.sbwx_finish_update_get = function(req, res, next) {

	function fingBh(id, cb ){
		Peijian.findById(id).exec(function(err, r ){
			if (err){
				cb(err, null);
				return
			}
			//console.log(id,  r)
			cb(null, r);
		})	
	}
	
	Sbwx.findById(req.params.id)
	.populate('pline').populate('sbbh')
	.exec(function(err, sbwx){
		if (err) {next(err) }
		async.parallel([
			function(callback) {  
				if (sbwx.cld[0]){
					fingBh(sbwx.cld[0].peijian , callback)
				}else {
					callback(null)
				}
			},
			function(callback) {  
				if (sbwx.cld[1]){
					fingBh(sbwx.cld[1].peijian , callback)
				}else {
					callback(null)
				}
			},		
			function(callback) {  
				if (sbwx.cld[2]){
					fingBh(sbwx.cld[2].peijian , callback)
				}else {
					callback(null)
				}
			},
			function(callback) {     
				Gzyy.find().exec(callback);
			},
			function(callback) {     
				Staff.find().exec(callback);
			}
		], function(err, results) {
			if (err) { return next(err); }
			//Successful, so render
			console.log(sbwx)
			res.render('sbwx/sbwx_finish_form', { title: '修改完成的修善单', sbwx: sbwx, peijian: results,
				gzyys: results[3],  staffs: results[4]});
		});			
	})	
};

// Display Sbwx finish form on GET
exports.sbwx_finish_get = function(req, res, next) {
	async.parallel({
		gzyy: function(callback) {     
			Gzyy.find().exec(callback);
		},
		staff: function(callback) {     
			Staff.find().exec(callback);
		},
		sbwx: function(callback) {
			Sbwx.findById(req.params.id)
			.populate('pline').populate('sbbh').populate('staff').populate('gzyy')
			.exec(callback);
		}
    }, function(err, results) {
		if (err) { return next(err); }
		//Successful, so render
		res.render('sbwx/sbwx_finish_form', { title: '完成修善单', sbwx: results.sbwx,
			gzyys: results.gzyy,  staffs: results.staff});
	});
};

// Handle Sbwx finish on POST
exports.sbwx_finish_post = function(req, res, next) {
	//获得 数组的长度
	var leng = 3 ;
	var wxclArr =[];
	var cldObj ={};

	//数据验证省略，通过chrome客户端验证
	for ( let i = 0; i < leng ; i++ ){
		if (req.body['amount'+i] > 0){
			cldObj = {
				peijian: req.body['pjid'+i],
				shuliang: req.body['amount'+i],
				danjia: req.body['price'+i]
			};
			wxclArr.push(cldObj);
		}
	}	

	var sbwx = new Sbwx({ 
	    _id:　req.params.id,
		gzyy:  req.body.gzyy,	
		staff: req.body.staff,	
		wxff: req.body.wxff,
		xfrq: req.body.xf_date,
		whrq:  req.body.wh_date,
		cld: wxclArr,
		finish: true
	});

	function subStock(id, amont, cb){
		Peijian.update({_id : id},
		{$inc :{stock : -(amont)}})
		.exec(function(err, r ){
			if (err){
				cb(err, null);
				return
			}
			console.log(id, amont, r)
			cb(null);
		})	
	}

	//先把减掉的数量加回去
function  addPeijian(cb){
	Sbwx.findById(req.params.id).exec(function (err , theR) {
		if (err) { return next(err); }
		if ( theR.cld){
			async.parallel([
				function(callback) {  
					if (theR.cld[0] ){
						subStock(theR.cld[0].peijian, -(theR.cld[0].shuliang), callback)
					}else{
						callback(null);
					}			
				},
				function(callback) {  
					if (theR.cld[1] ){
						subStock(theR.cld[1].peijian, -(theR.cld[1].shuliang), callback)
					}else{
						callback(null);
					}
				},
				function(callback) {  
					if (theR.cld[2] ){
						subStock(theR.cld[2].peijian, -(theR.cld[2].shuliang), callback)
					}else{
						callback(null);
					}
				}
			], 
			// optional callback
			cb);			
		}else {
			cb(null);
		}

	})
}	
	
	//在配件表中 减掉相应的数量
function subPeijian(cb){
	async.parallel([
		function(callback) {  
			if (wxclArr[0] ){
				subStock(wxclArr[0].peijian, wxclArr[0].shuliang, callback)
			}else{
				callback(null);
			}			
		},
		function(callback) {  
			if (wxclArr[1] ){
				subStock(wxclArr[1].peijian, wxclArr[1].shuliang, callback)
			}else{
				callback(null);
			}
		},
		function(callback) {  
			if (wxclArr[2] ){
				subStock(wxclArr[2].peijian, wxclArr[2].shuliang, callback)
			}else{
				callback(null);
			}
		},
		function(callback) {  
				Sbwx.findByIdAndUpdate(req.params.id, sbwx, {}, function (err , thesb) {
					if (err) {		
						callback(err, null);
						return
					}
					callback( null , thesb);
				});	
		}
	], 
	// optional callback
	cb);			
}
	async.series([
		addPeijian,
		subPeijian		
	],
	// optional callback
	function(err, results) {
		if (err) {next(err)} 
		//console.log(results);
		//res.send(results);
		res.redirect(results[1][3].url + '/fni');
	})      
};

