var Cld = require('../models/shebei/cailiao');

var async = require('async');

// exports.cld_list = function(req, res, next) {
	// Cld.find(function(err, cld){
		// if(err) {return next(err)}
		// res.render('/sbwx/cld_list', {title:'材料单列表'} )
	// } )
// };

// Display detail page for a specific Cld
exports.cld_detail = function(req, res) {
    res.send('NOT IMPLEMENTED: Cld detail: ' + req.params.id);
};

// Display Cld create form on GET
exports.cld_create_get = function(req, res) {
    res.send('NOT IMPLEMENTED: Cld create GET');
};

// Handle Cld create on POST
exports.cld_create_post = function(req, res) {
    res.send('NOT IMPLEMENTED: Cld create POST');
};

// Display Cld delete form on GET
exports.cld_delete_get = function(req, res) {
    res.send('NOT IMPLEMENTED: Cld delete GET');
};

// Handle Cld delete on POST
exports.cld_delete_post = function(req, res) {
    res.send('NOT IMPLEMENTED: Cld delete POST');
};

// Display Cld update form on GET
exports.cld_update_get = function(req, res) {
    res.send('NOT IMPLEMENTED: Cld update GET');
};

// Handle Cld update on POST
exports.cld_update_post = function(req, res) {
    res.send('NOT IMPLEMENTED: Cld update POST');
};