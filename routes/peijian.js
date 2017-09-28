'use strict'
var express = require('express');
var router = express.Router();

// Require controller modules
var provider_controller = require('../controllers/providerController');
var peijian_controller = require('../controllers/peijianController');
var storage_controller = require('../controllers/storageController');

//供应商
router.get('/provider/', provider_controller.provider_list);

/* GET request for creating a provider. NOTE This must come before routes that display provider (uses id) */
router.get('/provider/create', provider_controller.provider_create_get);

/* POST request for creating provider. */
router.post('/provider/create', provider_controller.provider_create_post);

//GET request for update provider
router.get('/provider/:id/update', provider_controller.provider_update_get);

//POST request for update provider
router.post('/provider/:id/update', provider_controller.provider_update_post);

//GET request for delete provider
router.get('/provider/:id/delete', provider_controller.provider_delete_get);

//POST request for delete provider
router.post('/provider/:id/delete', provider_controller.provider_delete_post);

/* GET request for one provider. */
router.get('/provider/:id', provider_controller.provider_detail);

//配件
router.get('/peijian/', peijian_controller.peijian_list);

/* GET request for creating a peijian. NOTE This must come before routes that display peijian (uses id) */
router.get('/peijian/create', peijian_controller.peijian_create_get);

/* POST request for creating peijian. */
router.post('/peijian/create', peijian_controller.peijian_create_post);

//GET request for update peijian
router.get('/peijian/:id/update', peijian_controller.peijian_update_get);

//POST request for update peijian
router.post('/peijian/:id/update', peijian_controller.peijian_update_post);

//GET request for delete peijian
router.get('/peijian/:id/delete', peijian_controller.peijian_delete_get);

//POST request for delete peijian
router.post('/peijian/:id/delete', peijian_controller.peijian_delete_post);

/* GET request for one peijian. */
router.get('/peijian/:id', peijian_controller.peijian_detail);

//入库单
router.get('/storage/', storage_controller.storage_list);

/* GET request for creating a storage. NOTE This must come before routes that display storage (uses id) */
router.get('/storage/create', storage_controller.storage_create_get);

/* POST request for creating storage. */
router.post('/storage/create', storage_controller.storage_create_post);

//GET request for update storage
router.get('/storage/:id/update', storage_controller.storage_update_get);

//POST request for update storage
router.post('/storage/:id/update', storage_controller.storage_update_post);

//GET request for delete storage
router.get('/storage/:id/delete', storage_controller.storage_delete_get);

//POST request for delete storage
router.post('/storage/:id/delete', storage_controller.storage_delete_post);

/* GET request for one storage. */
router.get('/storage/:id', storage_controller.storage_detail);

module.exports = router;