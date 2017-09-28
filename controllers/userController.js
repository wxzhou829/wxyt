'use strict'
var User = require('../models/user.model.js');
const crypto = require('crypto');

function cryptoHash(secret){
	return  crypto.createHmac('sha256', secret).update('cupcakes').digest('hex');
}

//用户列表
exports.user_list = function(req, res, next) {
	User.find(function(err, user){
		if (err) {next(err) }
		res.render("user/user_list", {title:'用户列表', users:user} )
	} )
};

//登出
exports.user_signout_get = function(req, res) {
	// 清空 session 中用户信息
    req.session.user = null;
	//跳转到查询页
	res.redirect("/")
};

//登录页面
exports.user_signin_get = function(req, res,next) {
	res.render("user/signin")
};

// POST /signin 用户登录
exports.user_signin_post = function(req, res, next) {
	var message = '';
	User.findOne({ 'username': req.body.name }).exec( function(err, user) {
		if (err) { return next(err); }
                 
        if (!user) { 
            //User 不存在，返回
			message='用户不存在' ;
			res.render("user/signin", {message :message , name: req.body.name } )
            return;
		}
		// 检查密码是否匹配
	    const hash = cryptoHash(req.body.password)
		if (hash !== user.password) {
			message = '用户名或密码错误';
			res.render("user/signin", {message :message , name: req.body.name } )
			return ;
		}
		// 用户信息写入 session
		delete user.password;
        req.session.user = user;
		//console.log(req.session.user )
        // 跳转到主页
        res.redirect('/sczc');
	});	
}

// Display User create form on GET
exports.user_create_get = function(req, res, next) {
     res.render('user/user_form', { title: '增加用户' });
};
	username:String,
	
// Handle User create on POST
exports.user_create_post = function(req, res, next) {
	
	var message = [];
	if (!(req.body.name.length >= 1 && req.body.name.length <= 10)) {
		message.push('名字请限制在 1-10 个字符') ;
	}
	if (req.body.password.length < 6) {
		message.push('密码至少 6 个字符');
    }
	
	if (message[0]){
		res.render('user/user_form', { title: '增加用户', user: user, messages: message});
		return;
	}
   
   const hash = cryptoHash(req.body.password)

    var user = new User({ 
		username: req.body.name ,
		password: hash
	});	
	//Check if user with same name already exists
	User.findOne({ 'username': req.body.name }).exec( function(err, found_user) {
		if (err) { return next(err); }
                 
        if (found_user) { 
            //User exists, return
			message.push('已存在该用户');
			res.render('user/user_form', { title: '增加用户', user: user, messages: message});
            return;
            }
        else {
            user.save(function (err) {
                if (err) { return next(err); }
                    //Genre saved. Redirect to user list
                    res.redirect('/users');
                });
        }
	});
};

// Display User delete form on GET
exports.user_delete_get = function(req, res, next) {
    User.findById(req.params.id).exec(function(err, user) {
		 if (err) { return next(err); }
		 res.render('user/user_delete', { title: '用户信息删除', user: user});
	 })
};

// Handle User delete on POST
exports.user_delete_post = function(req, res) {
    // Delete object and redirect to the list of gxjb.
    User.findByIdAndRemove(req.body.userid, function (err) {
        if (err) { return next(err); }
        //Success -
         res.redirect('/users/');
    });
};

// Display 修改密码 form on GET
exports.user_update_get = function(req, res) {
	User.findById(req.params.id).exec(function(err, user) {
		 if (err) { return next(err); }
		 res.render('user/user_form_u', { title: '重置密码', user: user});
	 })

};

// Handle User update on POST
exports.user_update_post = function(req, res) {
	
	const hash = cryptoHash(req.body.password)
    var user = new User({ 
		username: req.body.name ,
		password: hash,
		_id: req.params.id
	});	
	
    User.findByIdAndUpdate(req.params.id, user, {}, function (err , theuser) {
        if (err) { return next(err); }
        //User saved. Redirect to user list
        res.redirect('/users');
    });
};
