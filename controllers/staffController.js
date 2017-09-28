'use strict'
var Staff = require('../models/shebei/staff');

var async = require('async');

exports.staff_list = function(req, res, next) {
	Staff.find(function(err, staff){
		if (err) {next(err) }
		res.render("sbwx/staff_list", {title:'员工列表', staffs:staff} )
	} )
};

// Display Staff create form on GET
exports.staff_create_get = function(req, res, next) {
     res.render('sbwx/staff_form', { title: '增加员工' });
};

// Handle Staff create on POST
exports.staff_create_post = function(req, res, next) {
    var staff = new Staff({ 
		name: req.body.name ,
		phone: req.body.phone,
		other: req.body.other
	});
	//Check if staff with same name already exists
	Staff.findOne({ 'name': req.body.name }).exec( function(err, found_staff) {
		if (err) { return next(err); }
                 
        if (found_staff) { 
            //Staff exists, return
			res.render('sbwx/staff_form', { title: '增加员工', staff: staff, error: '已存在该员工'});
            return;
            }
        else {
            staff.save(function (err) {
                if (err) { return next(err); }
                    //Genre saved. Redirect to staff list
                    res.redirect('/sbwx/staff');
                });
        }
	});
};

// Display Staff delete form on GET
exports.staff_delete_get = function(req, res, next) {
    Staff.findById(req.params.id).exec(function(err, staff) {
		 if (err) { return next(err); }
		 res.render('sbwx/staff_delete', { title: '员工信息删除', staff: staff});
	 })
};

// Handle Staff delete on POST
exports.staff_delete_post = function(req, res) {
    // Delete object and redirect to the list of gxjb.
    Staff.findByIdAndRemove(req.body.staffid, function (err) {
        if (err) { return next(err); }
        //Success -
         res.redirect('/sbwx/staff');
    });
};

// Display Staff update form on GET
exports.staff_update_get = function(req, res) {
	Staff.findById(req.params.id).exec(function(err, staff) {
		 if (err) { return next(err); }
		 res.render('sbwx/staff_form', { title: '员工信息修改', staff: staff});
	 })

};

// Handle Staff update on POST
exports.staff_update_post = function(req, res) {
    var staff = new Staff({ 
		name: req.body.name ,
		phone: req.body.phone,
		other: req.body.other,
		_id: req.params.id
	});
	
	
    Staff.findByIdAndUpdate(req.params.id, staff, {}, function (err , thestaff) {
        if (err) { return next(err); }
        //Staff saved. Redirect to staff list
        res.redirect('/sbwx/staff');
    });
};
