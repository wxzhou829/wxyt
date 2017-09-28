var Gzyy = require('../models/shebei/reson');

// Display list of all Gzyys
exports.gzyy_list = function(req, res, next) {
	Gzyy.find(function(err, gzyy){
		if (err) {next(err) }
		res.render("sbwx/gzyy_list", {title:'故障原因列表', gzyys:gzyy} )
	} )
};


// Display Gzyy create form on GET
exports.gzyy_create_get = function(req, res, next) {
     res.render('sbwx/gzyy_form', { title: '故障原因新增' });
};

// Handle Gzyy create on POST
exports.gzyy_create_post = function(req, res, next) {
    var gzyy = new Gzyy({ 
		name: req.body.name ,
		description: req.body.description
	});
    gzyy.save(function (err) {
        if (err) { return next(err); }
            //Genre saved. Redirect to gzyy list
            res.redirect('/sbwx/gzyy');
    });
};

// Display Gzyy delete form on GET
exports.gzyy_delete_get = function(req, res, next) {
    Gzyy.findById(req.params.id).exec(function(err, gzyy) {
		 if (err) { return next(err); }
		 res.render('sbwx/gzyy_delete', { title: '设备信息删除', gzyy: gzyy});
	 })
};

// Handle Gzyy delete on POST
exports.gzyy_delete_post = function(req, res, next) {
    Gzyy.findByIdAndRemove(req.body.gzyyid, function (err) {
        if (err) { return next(err); }
        //Success -
         res.redirect('/sbwx/gzyy');
    });
};

// Display Gzyy update form on GET
exports.gzyy_update_get = function(req, res, next) {
	Gzyy.findById(req.params.id).exec(function(err, gzyy) {
		 if (err) { return next(err); }
		 res.render('sbwx/gzyy_form', { title: '设备信息修改', gzyy: gzyy});
	 })
};

// Handle Gzyy update on POST
exports.gzyy_update_post = function(req, res, next) {
    var gzyy = new Gzyy({ 
		name: req.body.name ,
		description: req.body.description,
		_id: req.params.id
	});
    Gzyy.findByIdAndUpdate(req.params.id, gzyy, {}, function (err , thegz) {
        if (err) { return next(err); }
            //Genre saved. Redirect to gzyy list
            res.redirect('/sbwx/gzyy');
    });
};