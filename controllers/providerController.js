'use strict'
var Provider = require('../models/peijian/provider');

exports.provider_list = function(req, res, next) {
	Provider.find(function(err, provider){
		if (err) {next(err) }
		res.render("peijian/provider_list", {title:'供应商列表', providers:provider} )
	} )
};


exports.provider_detail = function(req, res, next) {
	Provider.findById(req.params.id).exec(function(err, provider){
		if (err) {next(err) }
		res.render("peijian/provider_detail", {title:'供应商明细', provider:provider} )
	} )
};

// Display Provider create form on GET
exports.provider_create_get = function(req, res, next) {
     res.render('peijian/provider_form', { title: '增加供应商' });
};

// Handle Provider create on POST
exports.provider_create_post = function(req, res, next) {
    var provider = new Provider({ 
		name: req.body.name ,
		address: req.body.addr,
		contact: req.body.contact,
		scope: req.body.scope
	});

    provider.save(function (err) {
        if (err) { return next(err); }
            //Genre saved. Redirect to provider list
            res.redirect('/peijian/provider');
    });
};

// Display Provider delete form on GET
exports.provider_delete_get = function(req, res, next) {
    Provider.findById(req.params.id).exec(function(err, provider) {
		 if (err) { return next(err); }
		 res.render('peijian/provider_delete', { title: '供应商信息删除', provider: provider});
	 })
};

// Handle Provider delete on POST
exports.provider_delete_post = function(req, res) {
    // Delete object and redirect to the list of gxjb.
    Provider.findByIdAndRemove(req.body.providerid, function (err) {
        if (err) { return next(err); }
        //Success -
         res.redirect('/peijian/provider');
    });
};

// Display Provider update form on GET
exports.provider_update_get = function(req, res) {
	Provider.findById(req.params.id).exec(function(err, provider) {
		 if (err) { return next(err); }
		 res.render('peijian/provider_form', { title: '供应商信息修改', provider: provider});
	 })

};

// Handle Provider update on POST
exports.provider_update_post = function(req, res) {
    var provider = new Provider({ 
		name: req.body.name ,
		address: req.body.addr,
		contact: req.body.contact,
		scope: req.body.scope,
		_id: req.params.id
	});

    Provider.findByIdAndUpdate(req.params.id, provider, {}, function (err , theprovider) {
        if (err) { return next(err); }
        //Provider saved. Redirect to provider list
        res.redirect(theprovider.url);
    });
};
