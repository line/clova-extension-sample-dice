const Clova = require('@line/clova-cek-sdk-nodejs');
const express = require('express');
const clova = require('../clova');
const router = express.Router();

if (process.env.APPLICATION_ID) {
    const clovaMiddleware = Clova.Middleware({ applicationId: process.env.APPLICATION_ID });
    router.post(`/clova`, clovaMiddleware, clova);
} else {
    router.post(`/clova`, clova);
}

module.exports = router;
