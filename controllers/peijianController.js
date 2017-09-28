'use strict'
var Peijian = require('../models/peijian/peijian');

exports.peijian_list = function(req, res, next) {
	Peijian.find(function(err, peijian){
		if (err) {next(err) }
		res.render("peijian/peijian_list", {title:'配件列表', peijians:peijian} )
	} )
};


exports.peijian_detail = function(req, res, next) {
	Peijian.findById(req.params.id).exec(function(err, peijian){
		if (err) {next(err) }
		res.render("peijian/peijian_detail", {title:'配件明细', peijian:peijian} )
	} )
};

// Display Peijian create form on GET
exports.peijian_create_get = function(req, res, next) {
     res.render('peijian/peijian_form', { title: '增加配件' });
};

// Handle Peijian create on POST
exports.peijian_create_post = function(req, res, next) {
    var peijian = new Peijian({ 
		bh: req.body.bh,
		name: req.body.name ,
		standard: req.body.standard,
		type: req.body.type,
		stock: req.body.stock,
		safe_num: req.body.safe_num,
		image: ''
	});

    peijian.save(function (err) {
        if (err) { return next(err); }
            //Genre saved. Redirect to peijian list
            res.redirect(peijian.url);
    });
};

// Display Peijian delete form on GET
exports.peijian_delete_get = function(req, res, next) {
    Peijian.findById(req.params.id).exec(function(err, peijian) {
		 if (err) { return next(err); }
		 res.render('peijian/peijian_delete', { title: '配件信息删除', peijian: peijian});
	 })
};

// Handle Peijian delete on POST
exports.peijian_delete_post = function(req, res) {
    // Delete object and redirect to the list of gxjb.
    Peijian.findByIdAndRemove(req.body.peijianid, function (err) {
        if (err) { return next(err); }
        //Success -
         res.redirect('/peijian/peijian');
    });
};

// Display Peijian update form on GET
exports.peijian_update_get = function(req, res) {
	Peijian.findById(req.params.id).exec(function(err, peijian) {
		 if (err) { return next(err); }
		 res.render('peijian/peijian_form', { title: '配件信息修改', peijian: peijian});
	 })

};

// Handle Peijian update on POST
exports.peijian_update_post = function(req, res) {
    var peijian = new Peijian({ 
		_id: req.params.id,
		bh: req.body.bh,
		name: req.body.name ,
		standard: req.body.standard,
		type: req.body.type,
		stock: req.body.stock,
		safe_num: req.body.safe_num,
		image: ''
	});
    Peijian.findByIdAndUpdate(req.params.id, peijian, {}, function (err , thepeijian) {
        if (err) { return next(err); }
        //Peijian saved. Redirect to peijian list
        res.redirect(thepeijian.url);
    });
};
