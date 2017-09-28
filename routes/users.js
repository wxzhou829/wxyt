'use strict'
var express = require('express');
var router = express.Router();

// Require controller modules
var user_controller = require('../controllers/userController');
var checkNotLogin = require('../middlewares/check').checkNotLogin;
var checkLogin = require('../middlewares/check').checkLogin;
var hasRole = require('../middlewares/check').hasRole;

//用户列表
router.get('/', user_controller.user_list);

//登录页面
router.get('/signin',  checkNotLogin, user_controller.user_signin_get);
router.post('/signin',  checkNotLogin, user_controller.user_signin_post);

//登出
router.get('/signout', checkLogin, user_controller.user_signout_get) 

/* GET request for creating a user. NOTE This must come before routes that display user (uses id) */
router.get('/create', checkLogin, user_controller.user_create_get);

/* POST request for creating user. */
router.post('/create', user_controller.user_create_post);

//GET request for update user
router.get('/:id/update',  hasRole, user_controller.user_update_get);

//POST request for update user
router.post('/:id/update', user_controller.user_update_post);

//GET request for delete user
router.get('/:id/delete',  hasRole, user_controller.user_delete_get);

//POST request for delete user
router.post('/:id/delete', user_controller.user_delete_post);


module.exports = router;