var express = require('express');
var router = express.Router();

// Require controller modules
var gxjb_controller = require('../controllers/gxjbController');
var gxys_controller = require('../controllers/gxysController');
var blgs_controller = require('../controllers/blgsController');
var wjd_controller = require('../controllers/wjdController');

/* GET sczc home page. */
router.get('/', gxjb_controller.index);

//查询 gxjb 
router.post('/', gxjb_controller.query);

/* GET request for creating a Book. NOTE This must come before routes that display Book (uses id) */
router.get('/gxjb/create', gxjb_controller.gxjb_create_get);

/* POST request for creating Book. */
router.post('/gxjb/create', gxjb_controller.gxjb_create_post);

//GET request for update gxjb
router.get('/gxjb/:id/update', gxjb_controller.gxjb_update_get);

//POST request for update gxjb
router.post('/gxjb/:id/update', gxjb_controller.gxjb_update_post);

//GET request for delete gxjb
router.get('/gxjb/:id/delete', gxjb_controller.gxjb_delete_get);

//POST request for delete gxjb
router.post('/gxjb/:id/delete', gxjb_controller.gxjb_delete_post);

/* GET request for one gxjb. */
router.get('/gxjb/:id', gxjb_controller.gxjb_detail);

//GET 药水明细 create
router.get('/gxjb/:id/gxys', gxys_controller.gxys_get);

//POST 药水明细 create
router.post('/gxjb/:id/gxys', gxys_controller.gxys_post);

//GET 不良杆数 create
router.get('/gxjb/:id/blgs', blgs_controller.blgs_create_get);

//POST 不良杆数 create
router.post('/gxjb/:id/blgs', blgs_controller.blgs_create_post);

//GET 药水列表
//router.get('/gxys', gxys_controller.gxys_list);

/* GET request for one gxys. */
router.get('/gxys/:id', gxys_controller.gxys_detail);

//GET request for update gxys
router.get('/gxys/:id/update', gxys_controller.gxys_update_get);

//POST request for update gxys
router.post('/gxys/:id/update', gxys_controller.gxys_update_post);

/* GET request to delete gxys. */
router.get('/gxys/:id/delete', gxys_controller.gxys_delete_get);

// POST request to delete gxys
router.post('/gxys/:id/delete', gxys_controller.gxys_delete_post);

/* GET request for 不良详情. */
router.get('/blgs/:id', blgs_controller.blgs_detail);

//GET request for update blgs
router.get('/blgs/:id/update', blgs_controller.blgs_update_get);

//POST request for update blgs
router.post('/blgs/:id/update', blgs_controller.blgs_update_post);

/* GET request to delete blgs. */
router.get('/blgs/:id/delete', blgs_controller.blgs_delete_get);

// POST request to delete blgs
router.post('/blgs/:id/delete', blgs_controller.blgs_delete_post);


//GET 未稼动 create
router.get('/gxjb/:id/wjd', wjd_controller.wjd_create_get);

//POST 未稼动 create
router.post('/gxjb/:id/wjd', wjd_controller.wjd_create_post);

/* GET request for 未稼动. */
router.get('/wjd/:id', wjd_controller.wjd_detail);

//GET request for update wjd
router.get('/wjd/:id/update', wjd_controller.wjd_update_get);

//POST request for update wjd
router.post('/wjd/:id/update', wjd_controller.wjd_update_post);

/* GET request to delete wjd. */
router.get('/wjd/:id/delete', wjd_controller.wjd_delete_get);

// POST request to delete wjd
router.post('/wjd/:id/delete', wjd_controller.wjd_delete_post);

module.exports = router;