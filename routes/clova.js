const express = require('express');
const cekRequest = require('../clova');
const { json } = require('../http');
const router = express.Router();

router.post('/', json(cekRequest));

module.exports = router;
