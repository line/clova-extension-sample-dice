const express = require('express');
const { clovaSkillHandler } = require('../clova');
const { json } = require('../http');
const router = express.Router();

router.post('/', clovaSkillHandler);

module.exports = router;
