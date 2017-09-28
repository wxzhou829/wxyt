var Shebei = require('../models/shebei/shebei');

// Display list of all Shebeis
exports.shebei_list = function(req, res, next) {
    Shebei.find(function(err, shebei){
		if (err) {next(err) }
		res.render("sbwx/shebei_list", {title:'设备列表', shebeis:shebei} )
	} )
};


// Display Shebei create form on GET
exports.shebei_create_get = function(req, res, next) {
    res.render('sbwx/shebei_form', { title: '增加设备' });
};

// Handle Shebei create on POST
exports.shebei_create_post = function(req, res, next) {
    var shebei = new Shebei({ 
		name: req.body.name ,
		description: req.body.description
	});
    shebei.save(function (err) {
        if (err) { return next(err); }
            //Genre saved. Redirect to shebei list
            res.redirect('/sbwx/shebei');
    });
};

// Display Shebei delete form on GET
exports.shebei_delete_get = function(req, res, next) {
    Shebei.findById(req.params.id).exec(function(err, shebei) {
		 if (err) { return next(err); }
		 res.render('sbwx/shebei_delete', { title: '设备信息删除', shebei: shebei});
	 })
};

// Handle Shebei delete on POST
exports.shebei_delete_post = function(req, res, next) {
    Shebei.findByIdAndRemove(req.body.shebeiid, function (err) {
        if (err) { return next(err); }
        //Success -
         res.redirect('/sbwx/shebei');
    });
};

// Display Shebei update form on GET
exports.shebei_update_get = function(req, res, next) {
	Shebei.findById(req.params.id).exec(function(err, shebei) {
		 if (err) { return next(err); }
		 res.render('sbwx/shebei_form', { title: '设备信息修改', shebei: shebei});
	 })
};

// Handle Shebei update on POST
exports.shebei_update_post = function(req, res, next) {
    var shebei = new Shebei({ 
		name: req.body.name ,
		description: req.body.description,
		_id: req.params.id
	});
    Shebei.findByIdAndUpdate(req.params.id, shebei, {}, function (err , theshe) {
        if (err) { return next(err); }
            //Genre saved. Redirect to shebei list
            res.redirect('/sbwx/shebei');
    });
};