const express = require('express');
const clova = require('../clova');
const router = express.Router();

router.post(`/clova`, clova);

module.exports = router;
