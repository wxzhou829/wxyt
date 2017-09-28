var express = require('express');
var router = express.Router();

// Require controller modules
var query_controller = require('../controllers/queryController');

/* GET sczc home page. */
router.get('/', query_controller.query_list);


router.get('/month', query_controller.query_month);

module.exports = router;