var express = require('express');
var router = express.Router();

// Require controller modules
var ajax_controller = require('../controllers/ajaxController');

/* GET sczc home page. */
router.get('/sbwx_finish', ajax_controller.sbwx_finish_get);

module.exports = router;