const express = require('express');


const secure = require('../user/secure');
const response = require('../../../network/response');
const controller = require('./');


const router = express.Router();

// Routes
router.get('/all', secure('session'), globalList);
router.get('/', secure('session'), list);
router.get('/top/:n', secure('session'), topList);
router.post('/', secure('session'), upsert);

// Internal functions
async function globalList(req, res, next) {
    try {
        const pageNumber = req.query.pageNumber ? req.query.pageNumber : null;
        const pageSize = req.query.pageSize ? req.query.pageSize : null;
        const order = req.query.order ? req.query.order : null;
        const userAuth = req.user ? req.user : null;

        const dataList = await controller.globalList(pageNumber, pageSize, order, userAuth);

        response.success(req, res, dataList, 200);
    } catch(err) {
        next(err);
    }
}

async function list(req, res, next) {
    try {
        const userAuth = req.user ? req.user : null;
        const dataList = await controller.list(userAuth);
        response.success(req, res, dataList, 200);
    } catch(err) {
        next(err);
    }
}

async function topList(req, res, next) {
    try {
        const userAuth = req.user ? req.user : null;
        const order = req.query.order ? req.query.order : null;
        const dataList = await controller.topList(req.params.n,order,userAuth);
        response.success(req, res, dataList, 200);
    } catch(err) {
        next(err);
    }
}

async function upsert(req, res, next) {
    try {
        const userAuth = req.user;
        const result = await controller.upsert(req.body, userAuth)
        response.success(req, res, result, 201);
    } catch(err) {
        next(err);
    }
}

module.exports = router;