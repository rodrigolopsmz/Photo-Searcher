const { Router } = require('express');
const getPhoto = require('./get-photo.js');

const router = Router();
router.use('/getPhoto', getPhoto);
module.exports = router;