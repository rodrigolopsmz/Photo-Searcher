const { Router } = require('express');
const axios = require ('axios');
const getPhoto = require('./get-photo.js');

const router = Router();
router.use('/getPhoto', getPhoto);
module.exports = router;