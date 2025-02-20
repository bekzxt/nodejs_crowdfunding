const express = require('express');
const { donate, getDonations } = require('../controllers/donationController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/', authMiddleware, donate);
router.get('/', getDonations);

module.exports = router;
