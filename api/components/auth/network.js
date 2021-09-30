const express = require('express');

const response = require('../../../network/response');
const controller = require('./');

const router = express.Router();

router.post('/login',login);

async function login(req, res, next) {
    console.log('req.body: ', req.body);
    try {
        const token = await controller.login(req.body.username, req.body.password);
        response.success(req, res, token, 200);
    } catch(err) {
        next(err);
    }
}

module.exports = router;