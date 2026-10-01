const express = require('express');
const auth=require('../middleware/auth');
const { createRide, getRides, completeRide } = require('../controllers/ridesController');
const router = express.Router();
router.use(auth);

router.post('/create',createRide);
router.get('/',getRides);
router.get('/mine',getRides);
router.post('/join/',completeRide);

module.exports = router;