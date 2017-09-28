'use strict'
var Storage = require('../models/peijian/storage');
var Provider = require('../models/peijian/provider');
var Peijian = require('../models/peijian/peijian');
var async = require('async');
var moment = require('moment');

exports.storage_list = function(req, res, next) {
	Storage.find().populate('peijian').limit(30).exec(function(err, storage){
		if (err) {next(err) }
		res.render("peijian/storage_list", {title:'入库单列表', storages:storage} )
	} )
};


exports.storage_detail = function(req, res, next) {
	Storage.findById(req.params.id).populate('peijian').populate('provider')
	.exec(function(err, storage){
		if (err) {next(err) }
		res.render("peijian/storage_detail", {title:'入库单明细', storage:storage} )
	} )
};

// Display Storage create form on GET
exports.storage_create_get = function(req, res, next) {
	async.parallel({
		peijian: function(callback) {     
			Peijian.find().exec(callback);
		},
		provider: function(callback) {
			Provider.find().exec(callback);
		},
    }, function(err, results) {
		if (err) { return next(err); }
		//Successful, so render
			var date = new Date();
			var today = moment(date).format('YYYY-MM-DD');
			res.render('peijian/storage_form', { title: '增加入库单' , day: today , 
				peijians: results.peijian, providers: results.provider});
	});	

};

// Handle Storage create on POST
exports.storage_create_post = function(req, res, next) {
	async.parallel({
		peijian: function(callback) {     
			Peijian.findOne({bh : req.body.bh}).exec(callback);
		},
		provider: function(callback) {
			Provider.findOne({name : req.body.provider}).exec(callback);
		},
    }, function(err, results) {
		if (err) { return next(err); }
		//Successful, so render
		if (results.peijian && results.provider ){
			var storage = new Storage({ 
				peijian: results.peijian._id,
				provider: results.provider._id,
				date_in: req.body.date_in,
				price: req.body.price,
				amount: req.body.amount
			});
			//更改 配件 库存
			results.peijian.stock = +results.peijian.stock + +req.body.amount;

			//保存入库表
			storage.save(function (err) {
				if (err) { return next(err); }
					//保存配件表
					results.peijian.save(function(err){
						if (err) { return next(err); }
						res.redirect(storage.url);
					} );					
			});
		}else{
			res.send('数据错误')
		}		
	});		
};

// Display Storage delete form on GET
exports.storage_delete_get = function(req, res, next) {
    Storage.findById(req.params.id).exec(function(err, storage) {
		 if (err) { return next(err); }
		 res.render('peijian/storage_delete', { title: '入库单信息删除', storage: storage});
	 })
};

// Handle Storage delete on POST
exports.storage_delete_post = function(req, res) {
	Storage.findById(req.params.id).populate('peijian')
	.exec(function(err, storage){
		//更改 库存
		storage.peijian.stock = +storage.peijian.stock - storage.amount;
		//保存 配件表
		storage.peijian.save(function(err){
			if (err) { return next(err); }
			//删除 入库单
			storage.remove(function(err){
				if (err) { return next(err); }
				res.redirect('/peijian/storage');
			} )
		} )

	} );
};

// Display Storage update form on GET
exports.storage_update_get = function(req, res) {
	async.parallel({
		peijian: function(callback) {     
			Peijian.find().exec(callback);
		},
		provider: function(callback) {
			Provider.find().exec(callback);
		},
		storage: function(callback) {
			Storage.findById(req.params.id).populate('peijian').populate('provider')
			.exec(callback);
		}
    }, function(err, results) {
		if (err) { return next(err); }
		//Successful, so render

			res.render('peijian/storage_form', { title: '入库单信息修改', storage: results.storage,
				peijians: results.peijian, providers: results.provider});
	});		
};

// Handle Storage update on POST
exports.storage_update_post = function(req, res) {
	async.parallel({
		peijian: function(callback) {     
			Peijian.findOne({bh : req.body.bh}).exec(callback);
		},
		provider: function(callback) {
			Provider.findOne({name : req.body.provider}).exec(callback);
		},
		stor: function(callback) {
			Storage.findById(req.params.id).populate('peijian').populate('provider')
			.exec(callback);
		}
    }, function(err, results) {
		if (err) { return next(err); }
		//Successful, so render
		if (results.peijian && results.provider ){
			var storage = new Storage({ 
				peijian: results.peijian._id,
				provider: results.provider._id,
				date_in: req.body.date_in,
				price: req.body.price,
				amount: req.body.amount,
				_id: req.params.id
			});
			//更改 配件 库存
			results.peijian.stock = +results.peijian.stock + +req.body.amount - +results.stor.amount;
			//修改 入库单
			Storage.findByIdAndUpdate(req.params.id, storage, {}, function (err , thestorage) {
				if (err) { return next(err); }
				//保存配件表
				results.peijian.save(function(err){
					if (err) { return next(err); }
					res.redirect(thestorage.url);
				} );	
			});			
		}else{
			res.send('数据错误')
		}

	});		
};
