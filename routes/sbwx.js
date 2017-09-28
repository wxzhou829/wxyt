'use strict'
var express = require('express');
var router = express.Router();

// Require controller modules
var sbwx_controller = require('../controllers/sbwxController');
var cld_controller = require('../controllers/cldController');
var staff_controller = require('../controllers/staffController');
var shebei_controller = require('../controllers/shebeiController');
var gzyy_controller = require('../controllers/gzyyController');

/* GET 员工列表 */
router.get('/staff', staff_controller.staff_list);

/* GET request for creating a staff. NOTE This must come before routes that display staff (uses id) */
router.get('/staff/create', staff_controller.staff_create_get);

/* POST request for creating staff. */
router.post('/staff/create', staff_controller.staff_create_post);

//GET request for update staff
router.get('/staff/:id/update', staff_controller.staff_update_get);

//POST request for update staff
router.post('/staff/:id/update', staff_controller.staff_update_post);

//GET request for delete staff
router.get('/staff/:id/delete', staff_controller.staff_delete_get);

//POST request for delete staff
router.post('/staff/:id/delete', staff_controller.staff_delete_post);


/* GET 设备列表 */
router.get('/shebei', shebei_controller.shebei_list);

/* GET request for creating a shebei. NOTE This must come before routes that display shebei (uses id) */
router.get('/shebei/create', shebei_controller.shebei_create_get);

/* POST request for creating shebei. */
router.post('/shebei/create', shebei_controller.shebei_create_post);

//GET request for update shebei
router.get('/shebei/:id/update', shebei_controller.shebei_update_get);

//POST request for update shebei
router.post('/shebei/:id/update', shebei_controller.shebei_update_post);

//GET request for delete shebei
router.get('/shebei/:id/delete', shebei_controller.shebei_delete_get);

//POST request for delete shebei
router.post('/shebei/:id/delete', shebei_controller.shebei_delete_post);

/* GET request for one shebei. */
//router.get('/shebei/:id', shebei_controller.shebei_detail);

//设备 维修材料单

/* GET request for creating a cld. NOTE This must come before routes that display cld (uses id) */
router.get('/cld/create', cld_controller.cld_create_get);

/* POST request for creating cld. */
router.post('/cld/create', cld_controller.cld_create_post);

//GET request for update cld
router.get('/cld/:id/update', cld_controller.cld_update_get);

//POST request for update cld
router.post('/cld/:id/update', cld_controller.cld_update_post);

//GET request for delete cld
router.get('/cld/:id/delete', cld_controller.cld_delete_get);

//POST request for delete cld
router.post('/cld/:id/delete', cld_controller.cld_delete_post);

/* GET request for one cld. */
router.get('/cld/:id', cld_controller.cld_detail);

/* GET 故障原因列表 */
router.get('/gzyy', gzyy_controller.gzyy_list);

/* GET request for creating a gzyy. NOTE This must come before routes that display gzyy (uses id) */
router.get('/gzyy/create', gzyy_controller.gzyy_create_get);

/* POST request for creating gzyy. */
router.post('/gzyy/create', gzyy_controller.gzyy_create_post);

//GET request for update gzyy
router.get('/gzyy/:id/update', gzyy_controller.gzyy_update_get);

//POST request for update gzyy
router.post('/gzyy/:id/update', gzyy_controller.gzyy_update_post);

//GET request for delete gzyy
router.get('/gzyy/:id/delete', gzyy_controller.gzyy_delete_get);

//POST request for delete gzyy
router.post('/gzyy/:id/delete', gzyy_controller.gzyy_delete_post);

/* GET request for one gzyy. */
//router.get('/gzyy/:id', gzyy_controller.gzyy_detail);

/* GET 维修单列表 */
router.get('/sbwx', sbwx_controller.sbwx_list);

/* GET finish 维修单列表 */
router.get('/sbwx/finish', sbwx_controller.sbwx_finish_list);

/* GET request for creating a sbwx. NOTE This must come before routes that display sbwx (uses id) */
router.get('/sbwx/create', sbwx_controller.sbwx_create_get);

/* POST request for creating sbwx. */
router.post('/sbwx/create', sbwx_controller.sbwx_create_post);

//GET request for update sbwx
router.get('/sbwx/:id/update', sbwx_controller.sbwx_update_get);

//POST request for update sbwx
router.post('/sbwx/:id/update', sbwx_controller.sbwx_update_post);


//GET request for finish update sbwx
router.get('/sbwx/:id/finish_u', sbwx_controller.sbwx_finish_update_get);

//POST request for finish update sbwx 指向同一个地方 sbwx_finish_post
router.post('/sbwx/:id/finish_u', sbwx_controller.sbwx_finish_post);

//GET request for finish sbwx
router.get('/sbwx/:id/finish', sbwx_controller.sbwx_finish_get);

//POST request for finish sbwx
router.post('/sbwx/:id/finish', sbwx_controller.sbwx_finish_post);

//GET request for delete sbwx
router.get('/sbwx/:id/delete', sbwx_controller.sbwx_delete_get);

//POST request for delete sbwx
router.post('/sbwx/:id/delete', sbwx_controller.sbwx_delete_post);

/* GET request for one sbwx. */
router.get('/sbwx/:id', sbwx_controller.sbwx_detail);

/* GET request for  sbwx finish detail. */
router.get('/sbwx/:id/fni', sbwx_controller.sbwx_detail_f);

module.exports = router;